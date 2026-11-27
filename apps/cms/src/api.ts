import { firebaseAuth, firebaseReady } from "./firebase";

const base = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (firebaseReady && firebaseAuth().currentUser) {
    localStorage.setItem("omusiki_cms_token", await firebaseAuth().currentUser!.getIdToken());
  }
  const token = localStorage.getItem("omusiki_cms_token");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${base}${path}`, { ...init, headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((body as { message?: string }).message || "Request failed");
  return body as T;
}

export interface Viewer { name: string; email: string; role: string; bio?: string }
export interface Title { id: string; name: string; genre: string; status: string; access: string; artistName?: string }
export interface Tier { id: string; name: string; amountCents: number }
export interface ArtistAccount { id: string; name: string; email: string; titles: number }

export function roleLabel(role: string | undefined) {
  if (role === "ADMIN") return "Administrateur";
  if (role === "ARTIST") return "Artiste";
  return role || "";
}

export function statusLabel(status: string) {
  if (status === "SUBMITTED") return "Soumis";
  if (status === "APPROVED") return "Validé";
  if (status === "REFUSED") return "Refusé";
  return "Brouillon";
}

export function accessLabel(access: string) {
  if (access === "FREE") return "Gratuit";
  if (access === "PURCHASE") return "Achat";
  return "Abonnement";
}
