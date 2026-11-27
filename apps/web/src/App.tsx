import { useEffect, useState, type FormEvent } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { api } from "./api";
import {
  firebaseAuth,
  firebaseReady,
  remember,
  signInWithApple,
  signInWithEmail,
  signInWithGoogle,
  signOutFirebase,
  signUpWithEmail,
} from "./firebase";

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
  const [token, setToken] = useState(firebaseReady ? null : localStorage.getItem("omusiki_token"));
  const [creating, setCreating] = useState(false);
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [titles, setTitles] = useState<Title[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Title | null>(null);
  const [playback, setPlayback] = useState<Playback | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!firebaseReady) return;
    return onAuthStateChanged(firebaseAuth(), async (user) => {
      setToken(user ? await remember(user) : null);
    });
  }, []);

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
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const displayName = String(form.get("name") || "");
    try {
      if (firebaseReady) {
        setToken(
          creating
            ? await signUpWithEmail(email, password, displayName)
            : await signInWithEmail(email, password)
        );
        return;
      }
      const session = await api<{ token: string }>("/api/auth/dev-session", {
        method: "POST",
        body: JSON.stringify({ email, name: displayName || email, role: "SUBSCRIBER" }),
      });
      localStorage.setItem("omusiki_token", session.token);
      setToken(session.token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Connexion impossible");
    }
  }

  async function social(kind: "google" | "apple") {
    try {
      setToken(kind === "google" ? await signInWithGoogle() : await signInWithApple());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Connexion impossible");
    }
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
      <main className="gate">
        <section className="gate-card">
          <span className="mark" aria-hidden="true">Ô</span>
          <div>
            <p className="eyebrow">Streaming africain</p>
            <h1>Ô musiki</h1>
          </div>
          <p className="lede">Makossa, Afrobeat, Rumba et les sons du continent. Entrez pour écouter.</p>
          {message && <p className="banner">{message}</p>}
          <form onSubmit={signIn}>
            {creating && (
              <label>
                Nom
                <input name="name" placeholder="Votre nom" required={creating} />
              </label>
            )}
            <label>
              Email
              <input name="email" type="email" placeholder="vous@exemple.com" required />
            </label>
            {firebaseReady && (
              <label>
                Mot de passe
                <input name="password" type="password" placeholder="6 caractères minimum" required minLength={6} />
              </label>
            )}
            <button className="primary" type="submit">{creating ? "Créer un compte" : "Entrer"}</button>
            {firebaseReady && (
              <button className="ghost" type="button" onClick={() => setCreating((value) => !value)}>
                {creating ? "J'ai déjà un compte" : "Créer un compte"}
              </button>
            )}
          </form>
          {firebaseReady && (
            <div className="social">
              <button className="ghost" type="button" onClick={() => social("google")}>Continuer avec Google</button>
              <button className="ghost" type="button" onClick={() => social("apple")}>Continuer avec Apple</button>
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="mark" aria-hidden="true">Ô</span>
          <div>
            <strong>Ô musiki</strong>
            <span>Catalogue</span>
          </div>
        </div>
        <form className="search" onSubmit={search}>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Titre, artiste, genre" aria-label="Recherche" />
          <button className="primary" type="submit">Rechercher</button>
        </form>
        <div className="account-chip">
          <span>{viewer?.name || viewer?.email}</span>
          <button
            className="ghost"
            type="button"
            onClick={() => {
              signOutFirebase().finally(() => setToken(null));
            }}
          >
            Sortir
          </button>
        </div>
      </header>
      <main className="page">
        {message && <p className="banner">{message}</p>}
        <section className="hero">
          <p className="eyebrow">À écouter</p>
          <h1>Les titres du continent</h1>
          <p className="lede">Les bandes-annonces sont ouvertes. Le contenu complet suit votre accès.</p>
        </section>
        <section className="grid">
          {titles.length === 0 && <p className="empty">Aucun titre pour cette recherche.</p>}
          {titles.map((title) => (
            <article className="card" key={title.id}>
              <span className="pill">{accessLabel(title.access)}</span>
              <h3>{title.name}</h3>
              <p className="muted">{title.artistName} · {title.genre}</p>
              <div className="actions">
                <button className="ghost" type="button" onClick={() => openTitle(title, "trailer")}>Bande-annonce</button>
                <button className="primary" type="button" onClick={() => openTitle(title, "full")}>Écouter</button>
              </div>
            </article>
          ))}
        </section>
        {selected && playback?.hlsUrl && (
          <section className="player">
            <p className="eyebrow">Lecture</p>
            <h2>{selected.name}</h2>
            <p className="muted">{selected.artistName}</p>
            {playback.hlsUrl.includes(".m3u8") ? (
              <video src={playback.hlsUrl} controls />
            ) : (
              <audio src={playback.hlsUrl} controls />
            )}
          </section>
        )}
        <section className="plans">
          <h2>Abonnement</h2>
          <div className="plan-grid">
            {plans.length === 0 && <p className="empty">Aucun forfait publié.</p>}
            {plans.map((plan) => (
              <button className="plan" key={plan.id} type="button" onClick={() => checkout(plan.id)}>
                <span>{plan.name}</span>
                <strong>{(plan.amountCents / 100).toFixed(2)} {plan.currency.toUpperCase()}</strong>
              </button>
            ))}
          </div>
        </section>
        <form className="account" onSubmit={saveProfile}>
          <h2>Compte</h2>
          <label>
            Nom
            <input value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <button className="primary" type="submit">Enregistrer</button>
        </form>
      </main>
    </div>
  );
}

function accessLabel(access: string) {
  if (access === "FREE") return "Gratuit";
  if (access === "PURCHASE") return "Achat";
  return "Abonnement";
}
