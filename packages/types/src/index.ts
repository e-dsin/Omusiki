export { canPlayFull } from "./access.mjs";

export type AccessMode = "FREE" | "SUBSCRIPTION" | "PURCHASE";
export type Role = "SUBSCRIBER" | "ARTIST" | "ADMIN";
export type TitleStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "REFUSED";
export type EntitlementSource = "stripe" | "apple" | "google" | "aftawallet";

export interface Viewer {
  id: string;
  providerUserId: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string | null;
}

export interface TitleSummary {
  id: string;
  name: string;
  artistName: string;
  genre: string;
  country: string | null;
  coverUrl: string | null;
  access: AccessMode;
  status: TitleStatus;
  durationSeconds: number | null;
  hasTrailer: boolean;
}

export interface PlaybackGrant {
  kind: "trailer" | "full";
  hlsUrl: string | null;
  token: string | null;
}

export interface DownloadGrant {
  url: string;
  expiresAt: string;
}

export interface PlanSummary {
  id: string;
  name: string;
  amountCents: number;
  currency: string;
  interval: string;
  appleProductId: string;
  googleProductId: string;
}

export interface PriceTierSummary {
  id: string;
  name: string;
  amountCents: number;
  currency: string;
  appleProductId: string;
  googleProductId: string;
}
