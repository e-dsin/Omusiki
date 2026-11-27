import Stripe from "stripe";
import { grantEntitlement, indexTitle, prisma, pushNewContent } from "@omusiki/db";

export async function onMuxAssetReady(event: {
  type?: string;
  data?: {
    id?: string;
    duration?: number;
    passthrough?: string;
    playback_ids?: Array<{ id: string; policy: string }>;
  };
}) {
  if (event.type !== "video.asset.ready" || !event.data) return { ignored: true };
  const passthrough = event.data.passthrough ? JSON.parse(event.data.passthrough) : {};
  const playbackId = event.data.playback_ids?.[0]?.id ?? null;
  const data =
    passthrough.kind === "full"
      ? { fullMuxAssetId: event.data.id, fullPlaybackId: playbackId, durationSeconds: Math.round(event.data.duration || 0) }
      : { trailerMuxAssetId: event.data.id, trailerPlaybackId: playbackId };
  if (!passthrough.titleId) return { ignored: true };
  const title = await prisma.title.update({
    where: { id: passthrough.titleId },
    data,
    include: { artist: { include: { user: true } } },
  });
  return { titleId: title.id, playbackId };
}

export async function onStripeEvent(rawBody: Buffer | string, signature: string | undefined) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!secret || !key || !signature) return { ignored: true };
  const stripe = new Stripe(key);
  const event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  if (event.type !== "checkout.session.completed") return { ignored: true };
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.metadata?.userId || session.client_reference_id;
  if (!userId) return { ignored: true };
  await grantEntitlement({
    userId,
    source: "stripe",
    planId: session.metadata?.planId || null,
    titleId: session.metadata?.titleId || null,
    externalId: session.id,
    expiresAt: session.mode === "subscription" ? new Date(Date.now() + 32 * 24 * 60 * 60 * 1000) : null,
  });
  return { userId, sessionId: session.id };
}

export async function onStoreNotification(source: "apple" | "google", body: { externalId?: string; status?: string }) {
  if (!body.externalId) return { ignored: true };
  const row = await prisma.entitlement.findFirst({ where: { source, externalId: body.externalId } });
  if (!row) return { missing: true };
  const status = body.status === "expired" || body.status === "revoked" ? "inactive" : "active";
  await prisma.entitlement.update({ where: { id: row.id }, data: { status } });
  return { id: row.id, status };
}

export async function onTitleApproved(titleId: string) {
  const title = await prisma.title.findUnique({
    where: { id: titleId },
    include: { artist: { include: { user: true } } },
  });
  if (!title || title.status !== "APPROVED") return { ignored: true };
  await indexTitle({
    id: title.id,
    name: title.name,
    genre: title.genre,
    country: title.country,
    artistName: title.artist.user.name,
    status: title.status,
  });
  await pushNewContent(title.name);
  return { titleId: title.id };
}
