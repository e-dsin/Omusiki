export function canPlayFull(input) {
  if (input.access === "FREE") return true;
  if (input.access === "SUBSCRIPTION") return input.hasActiveSubscription;
  return input.hasTitlePurchase;
}
