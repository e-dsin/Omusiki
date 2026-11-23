import { useEffect, useState, type FormEvent } from "react";

const base = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  const token = localStorage.getItem("omusiki_cms_token");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((body as { message?: string }).message || "Request failed");
  return body as T;
}

interface Viewer { name: string; email: string; role: string }
interface Title { id: string; name: string; genre: string; status: string; access: string }
interface Tier { id: string; name: string; amountCents: number }

export function App() {
  const [token, setToken] = useState(localStorage.getItem("omusiki_cms_token"));
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [titles, setTitles] = useState<Title[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [message, setMessage] = useState("");

  async function refresh() {
    const [me, studio, priceTiers] = await Promise.all([
      api<Viewer>("/api/me"),
      api<Title[]>("/api/studio/titles"),
      api<Tier[]>("/api/price-tiers"),
    ]);
    setViewer(me);
    setTitles(studio);
    setTiers(priceTiers);
  }

  useEffect(() => {
    if (token) refresh().catch((error) => setMessage(error.message));
  }, [token]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const session = await api<{ token: string }>("/api/auth/dev-session", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        name: form.get("name"),
        role: form.get("role"),
      }),
    });
    localStorage.setItem("omusiki_cms_token", session.token);
    setToken(session.token);
  }

  async function createTitle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = await api<Title>("/api/studio/titles", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        genre: form.get("genre"),
        country: form.get("country"),
        access: form.get("access"),
        priceTierId: form.get("priceTierId") || null,
      }),
    });
    await uploadKind(title.id, "trailer", form.get("trailer") as File);
    await uploadKind(title.id, "full", form.get("full") as File);
    await api(`/api/studio/titles/${title.id}/submit`, { method: "POST" });
    setMessage(`« ${title.name} » soumis.`);
    await refresh();
  }

  async function uploadKind(titleId: string, kind: "trailer" | "full", file: File | null) {
    if (!file || !file.size) return;
    const upload = await api<{ uploadUrl: string | null }>(`/api/studio/titles/${titleId}/uploads`, {
      method: "POST",
      body: JSON.stringify({ kind }),
    });
    if (upload.uploadUrl) {
      await fetch(upload.uploadUrl, { method: "PUT", body: file });
    }
  }

  async function decide(id: string, status: "APPROVED" | "REFUSED") {
    await api(`/api/admin/titles/${id}/decision`, { method: "POST", body: JSON.stringify({ status }) });
    await refresh();
  }

  async function createTier(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await api("/api/admin/price-tiers", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        amountCents: Number(form.get("amountCents")),
        stripePriceId: form.get("stripePriceId"),
        appleProductId: form.get("appleProductId"),
        googleProductId: form.get("googleProductId"),
      }),
    });
    await refresh();
  }

  if (!token) {
    return (
      <main style={{ fontFamily: "sans-serif", maxWidth: 720, margin: "0 auto", padding: 24 }}>
        <h1>Backoffice Ô musiki</h1>
        <form onSubmit={signIn}>
          <input name="name" placeholder="Nom" required />
          <input name="email" type="email" placeholder="Email" required />
          <select name="role" defaultValue="ARTIST">
            <option value="ARTIST">Artiste</option>
            <option value="ADMIN">Administrateur</option>
          </select>
          <button type="submit">Entrer</button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1>Backoffice</h1>
      <p>{viewer?.name} · {viewer?.role}</p>
      {message && <p>{message}</p>}
      {viewer?.role === "ARTIST" && (
        <form onSubmit={createTitle}>
          <h2>Déposer un titre</h2>
          <input name="name" placeholder="Titre" required />
          <input name="genre" placeholder="Genre" defaultValue="Makossa" />
          <input name="country" placeholder="Pays" />
          <select name="access" defaultValue="SUBSCRIPTION">
            <option value="FREE">Gratuit</option>
            <option value="SUBSCRIPTION">Abonnement</option>
            <option value="PURCHASE">Achat du titre</option>
          </select>
          <select name="priceTierId">
            <option value="">Sans palier</option>
            {tiers.map((tier) => (
              <option key={tier.id} value={tier.id}>{tier.name}</option>
            ))}
          </select>
          <label>Bande-annonce <input name="trailer" type="file" accept="audio/*,video/*" /></label>
          <label>Contenu complet <input name="full" type="file" accept="audio/*,video/*" /></label>
          <button type="submit">Soumettre</button>
        </form>
      )}
      <h2>Titres</h2>
      {titles.map((title) => (
        <p key={title.id}>
          {title.name} · {title.status} · {title.access}
          {viewer?.role === "ADMIN" && title.status === "SUBMITTED" && (
            <>
              <button onClick={() => decide(title.id, "APPROVED")}>Valider</button>
              <button onClick={() => decide(title.id, "REFUSED")}>Refuser</button>
            </>
          )}
        </p>
      ))}
      {viewer?.role === "ADMIN" && (
        <form onSubmit={createTier}>
          <h2>Palier de prix</h2>
          <input name="name" placeholder="Nom" required />
          <input name="amountCents" type="number" placeholder="Centimes" required />
          <input name="stripePriceId" placeholder="Stripe price id" required />
          <input name="appleProductId" placeholder="App Store product id" required />
          <input name="googleProductId" placeholder="Play product id" required />
          <button type="submit">Créer le palier</button>
        </form>
      )}
    </main>
  );
}
