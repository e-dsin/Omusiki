export function canPlayFull(input: {
  access: "FREE" | "SUBSCRIPTION" | "PURCHASE";
  hasActiveSubscription: boolean;
  hasTitlePurchase: boolean;
}): boolean;
