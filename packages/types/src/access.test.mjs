import assert from "node:assert/strict";
import test from "node:test";
import { canPlayFull } from "./access.mjs";

test("a free title plays without a purchase", () => {
  assert.equal(
    canPlayFull({ access: "FREE", hasActiveSubscription: false, hasTitlePurchase: false }),
    true
  );
});

test("a subscription title plays only with an active subscription", () => {
  assert.equal(
    canPlayFull({ access: "SUBSCRIPTION", hasActiveSubscription: false, hasTitlePurchase: true }),
    false
  );
  assert.equal(
    canPlayFull({ access: "SUBSCRIPTION", hasActiveSubscription: true, hasTitlePurchase: false }),
    true
  );
});

test("a priced title plays only after that title is purchased", () => {
  assert.equal(
    canPlayFull({ access: "PURCHASE", hasActiveSubscription: true, hasTitlePurchase: false }),
    false
  );
  assert.equal(
    canPlayFull({ access: "PURCHASE", hasActiveSubscription: false, hasTitlePurchase: true }),
    true
  );
});
