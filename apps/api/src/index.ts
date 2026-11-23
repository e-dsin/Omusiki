import "dotenv/config";
import cors from "cors";
import express from "express";
import { prisma, upsertViewer, viewerCanPlay, grantEntitlement, playCount, indexTitle, trackEvent } from "@omusiki/db";
import type { AccessMode, Role } from "@omusiki/types";
import { optionalViewer, requireRole, requireViewer, signDevToken, type AuthedRequest } from "./auth.js";
import { cacheDel, cacheGet, cacheSet, createDirectUpload, playbackUrl, signedPlaybackToken, stripeClient } from "./services.js";

const app = express();
app.use(cors());
app.use(express.json());

const titleInclude = { artist: { include: { user: true } }, priceTier: true } as const;

function summarize(title: {
  id: string;
  name: string;
  genre: string;
  country: string | null;
  coverUrl: string | null;
  access: AccessMode;
  status: string;
  durationSeconds: number | null;
  trailerPlaybackId: string | null;
  artist: { user: { name: string } };
}) {
  return {
    id: title.id,
    name: title.name,
    artistName: title.artist.user.name,
    genre: title.genre,
    country: title.country,
    coverUrl: title.coverUrl,
    access: title.access,
    status: title.status,
    durationSeconds: title.durationSeconds,
    hasTrailer: Boolean(title.trailerPlaybackId),
  };
}

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/api/auth/dev-session", async (req, res) => {
  if (process.env.ALLOW_DEV_AUTH !== "true") {
    return res.status(404).json({ message: "Dev sign-in is disabled" });
  }
  const email = String(req.body.email || "");
  const name = String(req.body.name || email);
  const role = (req.body.role || "SUBSCRIBER") as Role;
  if (!email) return res.status(400).json({ message: "Email is required" });
  const user = await upsertViewer({
    providerUserId: `dev-${email}`,
    email,
    name,
    role,
  });
  const token = signDevToken({
    providerUserId: user.providerUserId,
    email: user.email,
    name: user.name,
    role: user.role,
  });
  res.json({ token, viewer: user });
});

app.get("/api/me", requireViewer, (req: AuthedRequest, res) => {
  res.json(req.viewer);
});

app.patch("/api/me", requireViewer, async (req: AuthedRequest, res) => {
  const name = typeof req.body.name === "string" ? req.body.name : req.viewer!.name;
  const user = await prisma.user.update({ where: { id: req.viewer!.id }, data: { name } });
  if (user.role === "ARTIST" && typeof req.body.bio === "string") {
    await prisma.artist.update({ where: { userId: user.id }, data: { bio: req.body.bio } });
  }
  res.json(user);
});

app.post("/api/me/device-token", requireViewer, async (req: AuthedRequest, res) => {
  const token = String(req.body.token || "");
  const platform = String(req.body.platform || "unknown");
  if (!token) return res.status(400).json({ message: "Token is required" });
  const row = await prisma.deviceToken.upsert({
    where: { token },
    update: { userId: req.viewer!.id, platform },
    create: { token, platform, userId: req.viewer!.id },
  });
  res.json(row);
});

app.get("/api/titles", optionalViewer, async (_req, res) => {
  const cached = await cacheGet("titles:approved");
  if (cached) return res.json(JSON.parse(cached));
  const titles = await prisma.title.findMany({
    where: { status: "APPROVED" },
    include: titleInclude,
    orderBy: { createdAt: "desc" },
  });
  const body = titles.map(summarize);
  await cacheSet("titles:approved", JSON.stringify(body), 30);
  res.json(body);
});

app.get("/api/titles/:id", optionalViewer, async (req, res) => {
  const title = await prisma.title.findUnique({ where: { id: req.params.id }, include: titleInclude });
  if (!title || title.status !== "APPROVED") return res.status(404).json({ message: "Not found" });
  const stats = await playCount(title.id);
  res.json({ ...summarize(title), description: title.description, stats });
});

app.get("/api/search", async (req, res) => {
  const q = String(req.query.q || "").trim();
  if (!q) return res.json([]);
  await trackEvent("search", { q });
  const host = process.env.MEILI_HOST;
  if (host) {
    const response = await fetch(`${host}/indexes/titles/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MEILI_MASTER_KEY ?? ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q, filter: 'status = "APPROVED"' }),
    });
    if (response.ok) {
      const data = (await response.json()) as { hits: Array<{ id: string }> };
      const ids = data.hits.map((hit) => hit.id);
      const titles = await prisma.title.findMany({ where: { id: { in: ids } }, include: titleInclude });
      return res.json(titles.map(summarize));
    }
  }
  const titles = await prisma.title.findMany({
    where: {
      status: "APPROVED",
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { genre: { contains: q, mode: "insensitive" } },
        { artist: { user: { name: { contains: q, mode: "insensitive" } } } },
      ],
    },
    include: titleInclude,
  });
  res.json(titles.map(summarize));
});

app.get("/api/titles/:id/playback", optionalViewer, async (req: AuthedRequest, res) => {
  const kind = req.query.kind === "full" ? "full" : "trailer";
  const title = await prisma.title.findUnique({ where: { id: req.params.id } });
  if (!title || title.status !== "APPROVED") return res.status(404).json({ message: "Not found" });
  if (kind === "trailer") {
    const playbackId = title.trailerPlaybackId;
    return res.json({ kind, hlsUrl: playbackUrl(playbackId), token: null });
  }
  const allowed = await viewerCanPlay(req.viewer?.id ?? null, title);
  if (!allowed) return res.status(402).json({ message: "Subscription or title purchase required" });
  const playbackId = title.fullPlaybackId;
  const token = playbackId ? await signedPlaybackToken(playbackId) : null;
  await trackEvent("full_play", { titleId: title.id, userId: req.viewer?.id });
  res.json({ kind, hlsUrl: playbackUrl(playbackId), token });
});

app.get("/api/titles/:id/download", requireViewer, async (req: AuthedRequest, res) => {
  const title = await prisma.title.findUnique({ where: { id: req.params.id } });
  if (!title || !title.offlineFileUrl) return res.status(404).json({ message: "No offline file" });
  const allowed = await viewerCanPlay(req.viewer!.id, title);
  if (!allowed) return res.status(402).json({ message: "Subscription or title purchase required" });
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  await cacheSet(`download:${req.viewer!.id}:${title.id}`, title.offlineFileUrl, 15 * 60);
  res.json({ url: title.offlineFileUrl, expiresAt });
});

app.post("/api/titles/:id/plays", requireViewer, async (req: AuthedRequest, res) => {
  const secondsHeard = Number(req.body.secondsHeard || 0);
  const play = await prisma.play.create({
    data: { userId: req.viewer!.id, titleId: req.params.id, secondsHeard },
  });
  res.status(201).json(play);
});

app.post("/api/studio/titles", requireViewer, requireRole("ARTIST"), async (req: AuthedRequest, res) => {
  const artist = await prisma.artist.findUnique({ where: { userId: req.viewer!.id } });
  if (!artist) return res.status(403).json({ message: "Artist profile missing" });
  const title = await prisma.title.create({
    data: {
      artistId: artist.id,
      name: String(req.body.name || "Sans titre"),
      genre: String(req.body.genre || "Makossa"),
      country: req.body.country ? String(req.body.country) : null,
      description: req.body.description ? String(req.body.description) : null,
      access: (req.body.access || "SUBSCRIPTION") as AccessMode,
      priceTierId: req.body.priceTierId ? String(req.body.priceTierId) : null,
      status: "DRAFT",
    },
  });
  res.status(201).json(title);
});

app.post("/api/studio/titles/:id/uploads", requireViewer, requireRole("ARTIST"), async (req: AuthedRequest, res) => {
  const kind = req.body.kind === "full" || req.body.kind === "cover" ? req.body.kind : "trailer";
  const title = await prisma.title.findUnique({ where: { id: req.params.id }, include: { artist: true } });
  if (!title || title.artist.userId !== req.viewer!.id) return res.status(404).json({ message: "Not found" });
  const upload = await createDirectUpload({ titleId: title.id, kind });
  res.json(upload);
});

app.post("/api/studio/titles/:id/submit", requireViewer, requireRole("ARTIST"), async (req: AuthedRequest, res) => {
  const existing = await prisma.title.findUnique({ where: { id: req.params.id }, include: { artist: true } });
  if (!existing || (req.viewer!.role !== "ADMIN" && existing.artist.userId !== req.viewer!.id)) {
    return res.status(404).json({ message: "Not found" });
  }
  const title = await prisma.title.update({
    where: { id: existing.id },
    data: { status: "SUBMITTED" },
  });
  res.json(title);
});

app.get("/api/studio/titles", requireViewer, requireRole("ARTIST"), async (req: AuthedRequest, res) => {
  const artist = await prisma.artist.findUnique({ where: { userId: req.viewer!.id } });
  const titles = await prisma.title.findMany({
    where: req.viewer!.role === "ADMIN" ? {} : { artistId: artist?.id },
    include: titleInclude,
    orderBy: { updatedAt: "desc" },
  });
  res.json(titles.map((title) => ({ ...summarize(title), description: title.description })));
});

app.post("/api/admin/titles/:id/decision", requireViewer, requireRole("ADMIN"), async (req, res) => {
  const status = req.body.status === "REFUSED" ? "REFUSED" : "APPROVED";
  const title = await prisma.title.update({
    where: { id: req.params.id },
    data: { status },
    include: titleInclude,
  });
  if (status === "APPROVED") {
    await cacheDel("titles:approved");
    await fetch(`${process.env.FUNCTIONS_URL || "http://localhost:3002"}/titles/${title.id}/approved`, {
      method: "POST",
    }).catch(() => undefined);
    await indexTitle({
      id: title.id,
      name: title.name,
      genre: title.genre,
      country: title.country,
      artistName: title.artist.user.name,
      status: title.status,
    });
  }
  res.json(summarize(title));
});

app.get("/api/plans", async (_req, res) => {
  res.json(await prisma.plan.findMany());
});

app.post("/api/admin/plans", requireViewer, requireRole("ADMIN"), async (req, res) => {
  const plan = await prisma.plan.create({
    data: {
      name: String(req.body.name),
      amountCents: Number(req.body.amountCents),
      currency: String(req.body.currency || "eur"),
      interval: String(req.body.interval || "month"),
      stripePriceId: String(req.body.stripePriceId),
      appleProductId: String(req.body.appleProductId),
      googleProductId: String(req.body.googleProductId),
    },
  });
  res.status(201).json(plan);
});

app.get("/api/price-tiers", async (_req, res) => {
  res.json(await prisma.priceTier.findMany());
});

app.post("/api/admin/price-tiers", requireViewer, requireRole("ADMIN"), async (req, res) => {
  const tier = await prisma.priceTier.create({
    data: {
      name: String(req.body.name),
      amountCents: Number(req.body.amountCents),
      currency: String(req.body.currency || "eur"),
      stripePriceId: String(req.body.stripePriceId),
      appleProductId: String(req.body.appleProductId),
      googleProductId: String(req.body.googleProductId),
    },
  });
  res.status(201).json(tier);
});

app.post("/api/checkout/stripe", requireViewer, async (req: AuthedRequest, res) => {
  const stripe = stripeClient();
  const plan = req.body.planId ? await prisma.plan.findUnique({ where: { id: String(req.body.planId) } }) : null;
  const title = req.body.titleId
    ? await prisma.title.findUnique({ where: { id: String(req.body.titleId) }, include: { priceTier: true } })
    : null;
  const price = plan?.stripePriceId || title?.priceTier?.stripePriceId;
  if (!price) return res.status(400).json({ message: "Choose a plan or a priced title" });
  if (!stripe) {
    return res.json({
      url: null,
      dev: true,
      message: "Stripe is not configured. Use the store purchase path or set STRIPE_SECRET_KEY.",
    });
  }
  const session = await stripe.checkout.sessions.create({
    mode: plan ? "subscription" : "payment",
    line_items: [{ price, quantity: 1 }],
    success_url: process.env.STRIPE_SUCCESS_URL || "http://localhost:5173/?checkout=success",
    cancel_url: process.env.STRIPE_CANCEL_URL || "http://localhost:5173/?checkout=cancel",
    client_reference_id: req.viewer!.id,
    metadata: {
      userId: req.viewer!.id,
      planId: plan?.id || "",
      titleId: title?.id || "",
    },
  });
  res.json({ url: session.url });
});

app.post("/api/checkout/aftawallet", requireViewer, async (req: AuthedRequest, res) => {
  const plan = await prisma.plan.findUnique({ where: { id: String(req.body.planId || "") } });
  if (!plan) return res.status(404).json({ message: "Plan not found" });
  res.json({
    url: process.env.AFTAWALLET_CHECKOUT_URL || null,
    reference: `afta-${req.viewer!.id}-${plan.id}`,
    amountCents: plan.amountCents,
    currency: "xaf",
  });
});

app.post("/api/billing/apple", requireViewer, async (req: AuthedRequest, res) => {
  await settleStorePurchase(req, res, "apple", String(req.body.productId || ""), String(req.body.transactionId || ""));
});

app.post("/api/billing/google", requireViewer, async (req: AuthedRequest, res) => {
  await settleStorePurchase(req, res, "google", String(req.body.productId || ""), String(req.body.purchaseToken || ""));
});

async function settleStorePurchase(
  req: AuthedRequest,
  res: express.Response,
  source: "apple" | "google",
  productId: string,
  externalId: string
) {
  if (!productId || !externalId) return res.status(400).json({ message: "Product and transaction are required" });
  const plan = await prisma.plan.findFirst({
    where: source === "apple" ? { appleProductId: productId } : { googleProductId: productId },
  });
  const tier = await prisma.priceTier.findFirst({
    where: source === "apple" ? { appleProductId: productId } : { googleProductId: productId },
  });
  const title = tier ? await prisma.title.findFirst({ where: { priceTierId: tier.id, status: "APPROVED" } }) : null;
  if (!plan && !title) return res.status(404).json({ message: "Unknown store product" });
  const entitlement = await grantEntitlement({
    userId: req.viewer!.id,
    source,
    planId: plan?.id,
    titleId: plan ? null : title?.id,
    externalId,
    expiresAt: plan ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null,
  });
  res.json(entitlement);
}

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: "Internal error" });
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
