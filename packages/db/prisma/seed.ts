import { prisma } from "../src/index.ts";

const artistUser = await prisma.user.upsert({
  where: { email: "artiste@omusiki.test" },
  update: {},
  create: {
    providerUserId: "dev-artist",
    email: "artiste@omusiki.test",
    name: "Artiste pilote",
    role: "ARTIST",
  },
});

const artist = await prisma.artist.upsert({
  where: { userId: artistUser.id },
  update: {},
  create: { userId: artistUser.id, verificationStatus: "verified" },
});

await prisma.user.upsert({
  where: { email: "admin@omusiki.test" },
  update: {},
  create: {
    providerUserId: "dev-admin",
    email: "admin@omusiki.test",
    name: "Administrateur",
    role: "ADMIN",
  },
});

const tier = await prisma.priceTier.upsert({
  where: { id: "tier-standard" },
  update: {},
  create: {
    id: "tier-standard",
    name: "Titre standard",
    amountCents: 199,
    currency: "eur",
    stripePriceId: "price_title_standard",
    appleProductId: "fr.omusiki.title.standard",
    googleProductId: "title_standard",
  },
});

await prisma.plan.upsert({
  where: { id: "plan-premium" },
  update: {},
  create: {
    id: "plan-premium",
    name: "Premium",
    amountCents: 999,
    currency: "eur",
    interval: "month",
    stripePriceId: "price_premium_month",
    appleProductId: "fr.omusiki.premium.month",
    googleProductId: "premium_month",
  },
});

await prisma.title.upsert({
  where: { id: "title-diba" },
  update: {},
  create: {
    id: "title-diba",
    artistId: artist.id,
    name: "Diba la Bobe",
    genre: "Makossa",
    country: "Cameroon",
    description: "Titre libre avec bande-annonce.",
    status: "APPROVED",
    access: "FREE",
  },
});

await prisma.title.upsert({
  where: { id: "title-lagos" },
  update: {},
  create: {
    id: "title-lagos",
    artistId: artist.id,
    name: "Lagos Nights",
    genre: "Afrobeat",
    country: "Nigeria",
    description: "Le contenu complet demande un abonnement. La bande-annonce reste libre.",
    status: "APPROVED",
    access: "SUBSCRIPTION",
  },
});

await prisma.title.upsert({
  where: { id: "title-single" },
  update: {},
  create: {
    id: "title-single",
    artistId: artist.id,
    name: "Lion Indomptable",
    genre: "Afropop",
    country: "Cameroon",
    status: "APPROVED",
    access: "PURCHASE",
    priceTierId: tier.id,
  },
});

await prisma.$disconnect();
