import { Platform } from "react-native";

type StorePurchase = { transactionId?: string };

export async function buyStoreProduct(sku: string, kind: "product" | "subscription" = "product") {
  if (Platform.OS === "web") {
    throw new Error("L'achat se fait dans un build Apple ou Android.");
  }
  const iap = await import("react-native-iap");
  await iap.initConnection();
  const purchase = await request(iap, sku, kind);
  const first = (Array.isArray(purchase) ? purchase[0] : purchase) as StorePurchase | undefined;
  const transactionId = first?.transactionId || "";
  if (!transactionId || !first) throw new Error("Achat sans identifiant de transaction");
  await iap.finishTransaction({ purchase: first as never, isConsumable: kind === "product" });
  return transactionId;
}

async function request(
  iap: typeof import("react-native-iap"),
  sku: string,
  kind: "product" | "subscription",
) {
  if (kind === "subscription" && Platform.OS === "android") {
    const listed = await iap.getSubscriptions({ skus: [sku] });
    const offerToken = listed[0] && "subscriptionOfferDetails" in listed[0]
      ? listed[0].subscriptionOfferDetails?.[0]?.offerToken
      : undefined;
    if (!offerToken) throw new Error("Offre Play Store introuvable pour cet abonnement");
    return iap.requestSubscription({ subscriptionOffers: [{ sku, offerToken }] });
  }
  if (kind === "subscription") return iap.requestSubscription({ sku });
  if (Platform.OS === "android") return iap.requestPurchase({ skus: [sku] });
  return iap.requestPurchase({ sku });
}
