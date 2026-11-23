import { PrismaClient, type AccessMode, type EntitlementSource } from "@prisma/client";
import { canPlayFull } from "@omusiki/types";

export const prisma = new PrismaClient();
export { canPlayFull };

export async function upsertViewer(input: {
  providerUserId: string;
  email: string;
  name: string;
  role?: "SUBSCRIBER" | "ARTIST" | "ADMIN";
}) {
  const user = await prisma.user.upsert({
    where: { providerUserId: input.providerUserId },
    update: { email: input.email, name: input.name },
    create: {
      providerUserId: input.providerUserId,
      email: input.email,
      name: input.name,
      role: input.role ?? "SUBSCRIBER",
    },
  });
  if (user.role === "ARTIST") {
    await prisma.artist.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });
  }
  return user;
}

export async function viewerCanPlay(userId: string | null, title: { id: string; access: AccessMode }) {
  if (title.access === "FREE") return true;
  if (!userId) return false;
  const now = new Date();
  const rows = await prisma.entitlement.findMany({
    where: {
      userId,
      status: "active",
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
  });
  return canPlayFull({
    access: title.access,
    hasActiveSubscription: rows.some((row) => row.planId),
    hasTitlePurchase: rows.some((row) => row.titleId === title.id),
  });
}

export async function grantEntitlement(input: {
  userId: string;
  source: EntitlementSource;
  planId?: string | null;
  titleId?: string | null;
  externalId?: string | null;
  expiresAt?: Date | null;
}) {
  if (input.externalId) {
    const existing = await prisma.entitlement.findFirst({
      where: { externalId: input.externalId, source: input.source },
    });
    if (existing) {
      return prisma.entitlement.update({
        where: { id: existing.id },
        data: { status: "active", expiresAt: input.expiresAt ?? existing.expiresAt },
      });
    }
  }
  return prisma.entitlement.create({
    data: {
      userId: input.userId,
      source: input.source,
      planId: input.planId ?? null,
      titleId: input.titleId ?? null,
      externalId: input.externalId ?? null,
      expiresAt: input.expiresAt ?? null,
      status: "active",
    },
  });
}

export async function playCount(titleId: string) {
  const grouped = await prisma.play.aggregate({
    where: { titleId },
    _count: true,
    _sum: { secondsHeard: true },
  });
  return { plays: grouped._count, secondsHeard: grouped._sum.secondsHeard ?? 0 };
}

export async function indexTitle(title: {
  id: string;
  name: string;
  genre: string;
  country: string | null;
  artistName: string;
  status: string;
}) {
  const host = process.env.MEILI_HOST;
  if (!host || title.status !== "APPROVED") return;
  await fetch(`${host}/indexes/titles/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MEILI_MASTER_KEY ?? ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([title]),
  });
}

export async function pushNewContent(titleName: string) {
  const tokens = await prisma.deviceToken.findMany();
  if (!tokens.length) return;
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      tokens.map((row) => ({
        to: row.token,
        title: "Nouveau contenu",
        body: titleName,
      }))
    ),
  });
}

export async function trackEvent(name: string, properties: Record<string, unknown>) {
  const token = process.env.MIXPANEL_TOKEN;
  if (!token) return;
  const payload = Buffer.from(
    JSON.stringify({ event: name, properties: { token, ...properties } })
  ).toString("base64");
  await fetch(`https://api.mixpanel.com/track/?data=${payload}`);
}
