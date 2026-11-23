import "dotenv/config";
import express from "express";
import { onMuxAssetReady, onStoreNotification, onStripeEvent, onTitleApproved } from "./handlers.js";

const app = express();

app.post("/mux", express.json(), async (req, res) => {
  res.json(await onMuxAssetReady(req.body));
});

app.post("/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    res.json(await onStripeEvent(req.body, req.header("stripe-signature")));
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Invalid Stripe event" });
  }
});

app.post("/apple", express.json(), async (req, res) => {
  res.json(await onStoreNotification("apple", req.body));
});

app.post("/google", express.json(), async (req, res) => {
  res.json(await onStoreNotification("google", req.body));
});

app.post("/titles/:id/approved", async (req, res) => {
  res.json(await onTitleApproved(req.params.id));
});

const port = Number(process.env.FUNCTIONS_PORT || 3002);
app.listen(port, () => {
  console.log(`Functions listening on ${port}`);
});
