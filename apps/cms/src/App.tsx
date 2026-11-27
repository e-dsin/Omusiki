import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  firebaseAuth,
  firebaseReady,
  remember,
  signInWithEmail,
  signOutFirebase,
  sendPasswordReset,
} from "./firebase";
import { accessLabel, api, roleLabel, statusLabel, type ArtistAccount, type Tier, type Title, type Viewer } from "./api";

export function App() {
  const [token, setToken] = useState(firebaseReady ? null : localStorage.getItem("omusiki_cms_token"));
  const [accountName, setAccountName] = useState("");
  const [bio, setBio] = useState("");
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [titles, setTitles] = useState<Title[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [artists, setArtists] = useState<ArtistAccount[]>([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(currentPage);

  async function refresh() {
    const me = await api<Viewer>("/api/me");
    const [studio, priceTiers, roster] = await Promise.all([
      api<Title[]>("/api/studio/titles"),
      api<Tier[]>("/api/price-tiers"),
      me.role === "ADMIN" ? api<ArtistAccount[]>("/api/admin/artists") : Promise.resolve([]),
    ]);
    setViewer(me);
    setAccountName(me.name);
    setBio(me.bio || "");
    setTitles(studio);
    setTiers(priceTiers);
    setArtists(roster);
  }

  useEffect(() => {
    if (!firebaseReady) return;
    return onAuthStateChanged(firebaseAuth(), async (user) => {
      setToken(user ? await remember(user) : null);
    });
  }, []);

  useEffect(() => {
    if (token) refresh().catch((error) => setMessage(error.message));
  }, [token]);

  useEffect(() => {
    const onHash = () => setPage(currentPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const displayName = String(form.get("name") || "");
    try {
      if (firebaseReady) {
        setToken(await signInWithEmail(email, password));
        return;
      }
      const session = await api<{ token: string }>("/api/auth/dev-session", {
        method: "POST",
        body: JSON.stringify({ email, name: displayName || email, role: form.get("role") }),
      });
      localStorage.setItem("omusiki_cms_token", session.token);
      setToken(session.token);
      location.hash = "#/";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Connexion impossible");
    }
  }

  async function createArtist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const created = await api<{ email: string; emailed: boolean; temporaryPassword?: string }>(
        "/api/admin/artists",
        { method: "POST", body: JSON.stringify({ name: form.get("name"), email: form.get("email") }) },
      );
      setMessage(
        created.emailed
          ? `Invitation envoyée à ${created.email}`
          : `Compte créé pour ${created.email}. Mot de passe temporaire : ${created.temporaryPassword}`,
      );
      event.currentTarget.reset();
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Création impossible");
    }
  }

  async function saveAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await api("/api/me", { method: "PATCH", body: JSON.stringify({ name: accountName, bio }) });
      setMessage("Compte mis à jour");
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Enregistrement impossible");
    }
  }

  async function createTitle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
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
      event.currentTarget.reset();
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Dépôt impossible");
    }
  }

  async function uploadKind(titleId: string, kind: "trailer" | "full", file: File | null) {
    if (!file || !file.size) return;
    const upload = await api<{ uploadUrl: string | null }>(`/api/studio/titles/${titleId}/uploads`, {
      method: "POST",
      body: JSON.stringify({ kind }),
    });
    if (upload.uploadUrl) await fetch(upload.uploadUrl, { method: "PUT", body: file });
  }

  async function decide(id: string, status: "APPROVED" | "REFUSED") {
    try {
      await api(`/api/admin/titles/${id}/decision`, { method: "POST", body: JSON.stringify({ status }) });
      setMessage(status === "APPROVED" ? "Titre validé" : "Titre refusé");
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Décision impossible");
    }
  }

  async function createTier(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
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
      setMessage("Palier créé");
      event.currentTarget.reset();
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Création impossible");
    }
  }

  if (!token) {
    return (
      <main className="gate">
        <section className="gate-card">
          <span className="mark" aria-hidden="true">Ô</span>
          <div>
            <p className="eyebrow">Backoffice</p>
            <h1>Ô musiki</h1>
          </div>
          <p className="lede">Connectez-vous avec le mot de passe choisi après l'invitation reçue par email.</p>
          {message && <p className="notice">{message}</p>}
          <form id="cms-sign-in" className="form" onSubmit={signIn}>
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
            {!firebaseReady && (
              <>
                <label>
                  Nom
                  <input name="name" placeholder="Votre nom" />
                </label>
                <label>
                  Rôle
                  <select name="role" defaultValue="ADMIN">
                    <option value="ADMIN">Administrateur</option>
                    <option value="ARTIST">Artiste</option>
                  </select>
                </label>
              </>
            )}
            <button className="primary" type="submit">Entrer</button>
            {firebaseReady && (
              <button
                className="ghost"
                type="button"
                onClick={async () => {
                  const email = String(new FormData(document.getElementById("cms-sign-in") as HTMLFormElement).get("email") || "");
                  if (!email) return setMessage("Indiquez votre email pour recevoir le lien");
                  try {
                    await sendPasswordReset(email);
                    setMessage("Lien de réinitialisation envoyé");
                  } catch (error) {
                    setMessage(error instanceof Error ? error.message : "Envoi impossible");
                  }
                }}
              >
                Mot de passe oublié
              </button>
            )}
          </form>
        </section>
      </main>
    );
  }

  const admin = viewer?.role === "ADMIN";
  const nav = admin
    ? [
        ["/", "Tableau de bord"],
        ["/titles", "Titres"],
        ["/artists", "Artistes"],
        ["/prices", "Paliers"],
      ]
    : [
        ["/", "Tableau de bord"],
        ["/titles", "Titres"],
        ["/deposit", "Déposer"],
        ["/account", "Compte"],
      ];
  useEffect(() => {
    if (!viewer) return;
    const allowed = admin ? ["/", "/titles", "/artists", "/prices"] : ["/", "/titles", "/deposit", "/account"];
    if (!allowed.includes(page)) location.hash = "#/";
  }, [viewer, admin, page]);

  const submitted = titles.filter((title) => title.status === "SUBMITTED").length;
  const approved = titles.filter((title) => title.status === "APPROVED").length;

  let content: ReactNode = null;
  const pending = titles.filter((title) => title.status === "SUBMITTED");
  if (page === "/titles") {
    content = (
      <Page title="Titres" lede={admin ? "Le catalogue complet, avec les dépôts qui attendent une décision." : "Les titres que vous avez déposés."}>
        <TitleTable titles={titles} admin={admin} onDecide={decide} />
      </Page>
    );
  } else if (page === "/artists" && admin) {
    content = (
      <Page title="Artistes" lede="Invitez un artiste, puis suivez les comptes déjà ouverts.">
        <form className="panel form" onSubmit={createArtist}>
          <label>Nom<input name="name" placeholder="Nom de l'artiste" required /></label>
          <label>Email<input name="email" type="email" placeholder="artiste@exemple.com" required /></label>
          <button className="primary" type="submit">Créer et envoyer l'invitation</button>
        </form>
        <ArtistTable artists={artists} />
      </Page>
    );
  } else if (page === "/prices" && admin) {
    content = (
      <Page title="Paliers de prix" lede="Chaque palier est un prix enregistré chez Stripe, Apple et Google.">
        <form className="panel form" onSubmit={createTier}>
          <label>Nom<input name="name" placeholder="Titre standard" required /></label>
          <label>Montant en centimes<input name="amountCents" type="number" placeholder="199" required /></label>
          <label>Stripe price id<input name="stripePriceId" placeholder="price_..." required /></label>
          <label>App Store product id<input name="appleProductId" placeholder="fr.omusiki..." required /></label>
          <label>Play product id<input name="googleProductId" placeholder="title_..." required /></label>
          <button className="primary" type="submit">Créer le palier</button>
        </form>
        <TierTable tiers={tiers} />
      </Page>
    );
  } else if (page === "/deposit" && !admin) {
    content = (
      <Page title="Déposer un titre" lede="Ajoutez la bande-annonce et le contenu complet, puis soumettez-le.">
        <form className="panel form" onSubmit={createTitle}>
          <label>Titre<input name="name" placeholder="Nom du titre" required /></label>
          <label>Genre<input name="genre" defaultValue="Makossa" /></label>
          <label>Pays<input name="country" placeholder="Cameroun" /></label>
          <label>
            Accès
            <select name="access" defaultValue="SUBSCRIPTION">
              <option value="FREE">Gratuit</option>
              <option value="SUBSCRIPTION">Abonnement</option>
              <option value="PURCHASE">Achat du titre</option>
            </select>
          </label>
          <label>
            Palier
            <select name="priceTierId">
              <option value="">Sans palier</option>
              {tiers.map((tier) => <option key={tier.id} value={tier.id}>{tier.name}</option>)}
            </select>
          </label>
          <label>Bande-annonce<input name="trailer" type="file" accept="audio/*,video/*" /></label>
          <label>Contenu complet<input name="full" type="file" accept="audio/*,video/*" /></label>
          <button className="primary" type="submit">Soumettre</button>
        </form>
      </Page>
    );
  } else if (page === "/account" && !admin) {
    content = (
      <Page title="Compte" lede="Le nom et la biographie visibles sur votre profil.">
        <form className="panel form" onSubmit={saveAccount}>
          <label>Nom<input value={accountName} onChange={(event) => setAccountName(event.target.value)} /></label>
          <label>Biographie<textarea value={bio} onChange={(event) => setBio(event.target.value)} placeholder="Quelques lignes sur votre musique" /></label>
          <button className="primary" type="submit">Enregistrer</button>
        </form>
      </Page>
    );
  } else {
    content = (
      <Page
        title="Tableau de bord"
        lede={admin ? "L'état du catalogue et les dépôts qui attendent une décision." : "Votre activité dans le studio."}
      >
        <section className="stats">
          <Stat label="Titres" value={titles.length} />
          <Stat label="À valider" value={submitted} />
          <Stat label="Validés" value={approved} />
          <Stat label={admin ? "Artistes" : "Brouillons"} value={admin ? artists.length : titles.filter((title) => title.status === "DRAFT").length} />
        </section>
        {admin && pending.length > 0 && (
          <Block title="À valider">
            <TitleTable titles={pending} admin onDecide={decide} />
          </Block>
        )}
        <Block title={admin ? "Catalogue récent" : "Vos titres"}>
          <TitleTable titles={titles.slice(0, 8)} admin={admin} onDecide={decide} />
        </Block>
      </Page>
    );
  }

  return (
    <div className="app">
      <aside className="side">
        <a className="brand" href="#/">
          <span className="mark" aria-hidden="true">Ô</span>
          <span>
            <strong>Ô musiki</strong>
            <small>Backoffice</small>
          </span>
        </a>
        <nav>
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={page === id ? "active" : undefined}>{label}</a>
          ))}
        </nav>
        <div className="who">
          <strong>{viewer?.name}</strong>
          <small>{roleLabel(viewer?.role)}</small>
          <button
            className="ghost"
            type="button"
            onClick={() => {
              signOutFirebase().finally(() => {
                localStorage.removeItem("omusiki_cms_token");
                setToken(null);
              });
            }}
          >
            Sortir
          </button>
        </div>
      </aside>
      <div className="main">
        {message && <p className="notice">{message}</p>}
        {content}
      </div>
    </div>
  );
}

function currentPage() {
  const hash = location.hash.replace(/^#/, "");
  return hash.startsWith("/") ? hash : "/";
}

function Page({ title, lede, children }: { title: string; lede: string; children: ReactNode }) {
  return (
    <section className="view">
      <header className="view-head">
        <h1>{title}</h1>
        <p>{lede}</p>
      </header>
      {children}
    </section>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="block">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <article className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function TitleTable({ titles, admin, onDecide }: { titles: Title[]; admin: boolean; onDecide: (id: string, status: "APPROVED" | "REFUSED") => void }) {
  if (titles.length === 0) return <p className="empty">Aucun titre dans cette vue.</p>;
  const decidable = admin && titles.some((title) => title.status === "SUBMITTED");
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            {admin && <th>Artiste</th>}
            <th>Genre</th>
            <th>Accès</th>
            <th>Statut</th>
            {decidable && <th></th>}
          </tr>
        </thead>
        <tbody>
          {titles.map((title) => (
            <tr key={title.id}>
              <td>{title.name}</td>
              {admin && <td>{title.artistName}</td>}
              <td>{title.genre}</td>
              <td>{accessLabel(title.access)}</td>
              <td><span className={`badge ${title.status.toLowerCase()}`}>{statusLabel(title.status)}</span></td>
              {decidable && (
                <td className="actions">
                  {title.status === "SUBMITTED" && (
                    <>
                      <button className="primary" type="button" onClick={() => onDecide(title.id, "APPROVED")}>Valider</button>
                      <button className="ghost" type="button" onClick={() => onDecide(title.id, "REFUSED")}>Refuser</button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArtistTable({ artists }: { artists: ArtistAccount[] }) {
  if (artists.length === 0) return <p className="empty">Aucun artiste pour le moment.</p>;
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Nom</th><th>Email</th><th>Titres</th></tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td>{artist.name}</td>
              <td>{artist.email}</td>
              <td>{artist.titles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TierTable({ tiers }: { tiers: Tier[] }) {
  if (tiers.length === 0) return <p className="empty">Aucun palier pour le moment.</p>;
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Nom</th><th>Prix</th></tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier.id}>
              <td>{tier.name}</td>
              <td>{(tier.amountCents / 100).toFixed(2)} EUR</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
