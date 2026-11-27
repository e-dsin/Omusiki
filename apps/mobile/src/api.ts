const base = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

export interface Viewer {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface StorePrice {
  amountCents: number;
  currency: string;
  appleProductId: string;
  googleProductId: string;
}

export interface Title {
  id: string;
  name: string;
  artistName: string;
  genre: string;
  country: string | null;
  access: string;
  hasTrailer: boolean;
  description?: string;
  price?: StorePrice | null;
}

export interface Plan extends StorePrice {
  id: string;
  name: string;
  interval: string;
}

export interface Playback {
  hlsUrl: string | null;
}

export async function api<T>(path: string, token: string | null, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${base}${path}`, { ...init, headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((body as { message?: string }).message || "Request failed");
  return body as T;
}

export function explain(error: unknown) {
  const message = error instanceof Error ? error.message : "Une erreur est survenue";
  if (message.includes("Subscription or title purchase")) return "Un abonnement ou l'achat du titre est nécessaire.";
  if (message.includes("No offline file")) return "Ce titre n'a pas encore de fichier hors ligne.";
  if (message === "Request failed") return "La requête a échoué.";
  if (message === "Not found") return "Introuvable.";
  return message;
}

export function accessLabel(access: string) {
  if (access === "FREE") return "Gratuit";
  if (access === "PURCHASE") return "Achat";
  return "Abonnement";
}

export function money(cents: number, currency: string) {
  return `${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`;
}
