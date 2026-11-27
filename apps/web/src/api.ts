import { firebaseAuth, firebaseReady } from "./firebase";

const base = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function bearer() {
  if (firebaseReady) {
    const user = firebaseAuth().currentUser;
    if (user) {
      const fresh = await user.getIdToken();
      localStorage.setItem("omusiki_token", fresh);
      return fresh;
    }
  }
  return localStorage.getItem("omusiki_token");
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  const token = await bearer();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || "Request failed");
  return body as T;
}
