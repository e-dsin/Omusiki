import Mux from "@mux/mux-node";
import Stripe from "stripe";
import { createClient, type RedisClientType } from "redis";

let redis: RedisClientType | null = null;
const memory = new Map<string, { value: string; expiresAt: number }>();

export async function cacheGet(key: string) {
  if (process.env.REDIS_URL) {
    redis ||= createClient({ url: process.env.REDIS_URL });
    if (!redis.isOpen) await redis.connect();
    return redis.get(key);
  }
  const hit = memory.get(key);
  if (!hit || hit.expiresAt < Date.now()) return null;
  return hit.value;
}

export async function cacheDel(key: string) {
  if (process.env.REDIS_URL) {
    redis ||= createClient({ url: process.env.REDIS_URL });
    if (!redis.isOpen) await redis.connect();
    await redis.del(key);
    return;
  }
  memory.delete(key);
}

export async function cacheSet(key: string, value: string, seconds: number) {
  if (process.env.REDIS_URL) {
    redis ||= createClient({ url: process.env.REDIS_URL });
    if (!redis.isOpen) await redis.connect();
    await redis.set(key, value, { EX: seconds });
    return;
  }
  memory.set(key, { value, expiresAt: Date.now() + seconds * 1000 });
}

export function muxClient() {
  if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) return null;
  return new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
  });
}

export async function createDirectUpload(passthrough: Record<string, string>) {
  const mux = muxClient();
  if (!mux) {
    return { uploadId: `dev-${Date.now()}`, uploadUrl: null as string | null };
  }
  const upload = await mux.video.uploads.create({
    cors_origin: process.env.WEB_ORIGIN || "http://localhost:5173",
    new_asset_settings: {
      playback_policy: ["public"],
      passthrough: JSON.stringify(passthrough),
    },
  });
  return { uploadId: upload.id, uploadUrl: upload.url };
}

export function playbackUrl(playbackId: string | null) {
  if (!playbackId) return null;
  if (playbackId.startsWith("http")) return playbackId;
  return `https://stream.mux.com/${playbackId}.m3u8`;
}

export async function signedPlaybackToken(playbackId: string) {
  const key = process.env.MUX_SIGNING_KEY;
  const keyId = process.env.MUX_SIGNING_KEY_ID;
  if (!key || !keyId || playbackId.startsWith("http")) return null;
  const mux = muxClient();
  if (!mux) return null;
  return mux.jwt.signPlaybackId(playbackId, {
    keyId,
    keySecret: key,
    expiration: "2h",
    type: "video",
  });
}

export function stripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}
