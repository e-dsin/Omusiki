import { useEffect, useState, type FormEvent } from "react";
import { api } from "./api";

interface Title {
  id: string;
  name: string;
  artistName: string;
  genre: string;
  country: string | null;
  access: string;
  hasTrailer: boolean;
  description?: string;
}
interface Viewer {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface Plan {
  id: string;
  name: string;
  amountCents: number;
  currency: string;
}
interface Playback {
  hlsUrl: string | null;
  token: string | null;
}

export function App() {
  const [token, setToken] = useState(localStorage.getItem("omusiki_token"));
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [titles, setTitles] = useState<Title[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Title | null>(null);
  const [playback, setPlayback] = useState<Playback | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!token) return;
    api<Viewer>("/api/me").then((me) => {
      setViewer(me);
      setName(me.name);
    }).catch(() => setToken(null));
    api<Title[]>("/api/titles").then(setTitles).catch((error) => setMessage(error.message));
    api<Plan[]>("/api/plans").then(setPlans).catch(() => undefined);
  }, [token]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const session = await api<{ token: string }>("/api/auth/dev-session", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        name: form.get("name"),
        role: "SUBSCRIBER",
      }),
    });
    localStorage.setItem("omusiki_token", session.token);
    setToken(session.token);
  }

  async function search(event: FormEvent) {
    event.preventDefault();
    setTitles(await api<Title[]>(`/api/search?q=${encodeURIComponent(query)}`));
  }

  async function openTitle(title: Title, kind: "trailer" | "full") {
    setSelected(title);
    setMessage("");
    try {
      setPlayback(await api<Playback>(`/api/titles/${title.id}/playback?kind=${kind}`));
    } catch (error) {
      setPlayback(null);
      setMessage(error instanceof Error ? error.message : "Lecture impossible");
    }
  }

  async function checkout(planId: string) {
    const session = await api<{ url: string | null; message?: string }>("/api/checkout/stripe", {
      method: "POST",
      body: JSON.stringify({ planId }),
    });
    if (session.url) window.location.href = session.url;
    else setMessage(session.message || "Stripe n'est pas configuré");
  }

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    const updated = await api<Viewer>("/api/me", { method: "PATCH", body: JSON.stringify({ name }) });
    setViewer(updated);
  }

  if (!token) {
    return (
      <main>
        <h1>Ô musiki</h1>
        <p className="muted">Connexion par e-mail. Google et Apple passent par Clerk lorsque la clé est configurée.</p>
        <form className="card row" onSubmit={signIn}>
          <input name="name" placeholder="Nom" required />
          <input name="email" type="email" placeholder="Email" required />
          <button type="submit">Entrer</button>
        </form>
      </main>
    );
  }

  return (
    <main>
      <header className="row">
        <h1>Ô musiki</h1>
        <span className="muted">{viewer?.email}</span>
        <button
          onClick={() => {
            localStorage.removeItem("omusiki_token");
            setToken(null);
          }}
        >
          Sortir
        </button>
      </header>
      {message && <p>{message}</p>}
      <form className="row" onSubmit={search}>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Titre, artiste, genre" />
        <button type="submit">Rechercher</button>
      </form>
      {titles.map((title) => (
        <article className="card" key={title.id}>
          <strong>{title.name}</strong>
          <div className="muted">{title.artistName} · {title.genre} · {title.access}</div>
          <div className="row">
            <button onClick={() => openTitle(title, "trailer")}>Bande-annonce</button>
            <button onClick={() => openTitle(title, "full")}>Contenu complet</button>
          </div>
        </article>
      ))}
      {selected && playback?.hlsUrl && (
        <section className="card">
          <h2>{selected.name}</h2>
          {playback.hlsUrl.includes(".m3u8") ? (
            <video src={playback.hlsUrl} controls />
          ) : (
            <audio src={playback.hlsUrl} controls />
          )}
        </section>
      )}
      <section className="card">
        <h2>Abonnement</h2>
        <div className="row">
          {plans.map((plan) => (
            <button key={plan.id} onClick={() => checkout(plan.id)}>
              {plan.name} · {(plan.amountCents / 100).toFixed(2)} {plan.currency}
            </button>
          ))}
        </div>
      </section>
      <form className="card row" onSubmit={saveProfile}>
        <h2>Compte</h2>
        <input value={name} onChange={(event) => setName(event.target.value)} />
        <button type="submit">Enregistrer</button>
      </form>
    </main>
  );
}
