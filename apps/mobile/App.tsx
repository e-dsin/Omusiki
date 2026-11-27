import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState, type ReactNode } from "react";
import { GoogleAuthProvider, OAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { accessLabel, api, explain, money, type Plan, type Playback, type Title, type Viewer } from "./src/api";
import { listDownloads, saveDownload, type SavedDownload } from "./src/downloads";
import { firebaseAuth, firebaseReady, signInWithEmail, signOutFirebase, signUpWithEmail } from "./firebase";
import { Player } from "./src/Player";
import { buyStoreProduct } from "./src/purchases";
import { colors, styles } from "./src/theme";

WebBrowser.maybeCompleteAuthSession();

const tokenKey = "omusiki_mobile_token";
type Tab = "catalog" | "plans" | "account";

export function App() {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("catalog");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!firebaseReady) {
      AsyncStorage.getItem(tokenKey).then((value) => {
        setToken(value);
        setReady(true);
      });
      return;
    }
    return onAuthStateChanged(firebaseAuth(), async (user) => {
      setToken(user ? await user.getIdToken() : null);
      setReady(true);
    });
  }, []);

  async function acceptToken(value: string) {
    if (!firebaseReady) await AsyncStorage.setItem(tokenKey, value);
    setToken(value);
  }

  async function signOut() {
    if (firebaseReady) await signOutFirebase().catch(() => undefined);
    await AsyncStorage.removeItem(tokenKey);
    setToken(null);
    setOpenId(null);
    setTab("catalog");
  }

  if (!ready) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.body}>
          <Text style={styles.title}>Ô musiki</Text>
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  if (!token) {
    return firebaseReady ? <FirebaseGate onToken={acceptToken} /> : <DevGate onToken={acceptToken} />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ flex: 1, minHeight: 0 }}>
        {openId ? (
          <TitleScreen token={token} id={openId} onBack={() => setOpenId(null)} />
        ) : tab === "catalog" ? (
          <Catalog token={token} onOpen={setOpenId} />
        ) : tab === "plans" ? (
          <Plans token={token} />
        ) : (
          <Account token={token} onSignOut={signOut} />
        )}
      </View>
      {!openId && (
        <View style={styles.tabs}>
          {(
            [
              ["catalog", "Catalogue"],
              ["plans", "Abonnement"],
              ["account", "Compte"],
            ] as const
          ).map(([id, label]) => (
            <Pressable key={id} style={styles.tab} onPress={() => setTab(id)}>
              <Text style={tab === id ? styles.tabOn : styles.tabOff}>{label}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

function DevGate({ onToken }: { onToken: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function submit() {
    setMessage("");
    try {
      const session = await api<{ token: string }>("/api/auth/dev-session", null, {
        method: "POST",
        body: JSON.stringify({ email, name: name || email, role: "SUBSCRIBER" }),
      });
      onToken(session.token);
    } catch (error) {
      setMessage(explain(error));
    }
  }

  return (
    <AuthShell message={message}>
      <Field label="Nom" value={name} onChangeText={setName} placeholder="Votre nom" />
      <Field label="Email" value={email} onChangeText={setEmail} placeholder="vous@exemple.com" keyboard="email-address" />
      <Pressable style={styles.primary} onPress={submit}>
        <Text style={styles.primaryText}>Entrer</Text>
      </Pressable>
    </AuthShell>
  );
}

function FirebaseGate({ onToken }: { onToken: (token: string) => void }) {
  const [creating, setCreating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "000000000000-placeholder.apps.googleusercontent.com";
  const googleConfigured = Boolean(process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID);
  const [googleRequest, googleResponse, promptGoogle] = Google.useAuthRequest({
    webClientId,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    const idToken =
      googleResponse?.type === "success"
        ? googleResponse.authentication?.idToken || googleResponse.params.id_token
        : undefined;
    if (!idToken) return;
    signInWithCredential(firebaseAuth(), GoogleAuthProvider.credential(idToken))
      .then(async (result) => onToken(await result.user.getIdToken()))
      .catch((error: Error) => setMessage(error.message));
  }, [googleResponse, onToken]);

  async function submit() {
    setMessage("");
    try {
      onToken(creating ? await signUpWithEmail(email, password, name) : await signInWithEmail(email, password));
    } catch (error) {
      setMessage(explain(error));
    }
  }

  async function apple() {
    const result = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    if (!result.identityToken) return;
    const provider = new OAuthProvider("apple.com");
    const credential = await signInWithCredential(
      firebaseAuth(),
      provider.credential({ idToken: result.identityToken }),
    );
    onToken(await credential.user.getIdToken());
  }

  return (
    <AuthShell message={message}>
      {creating && <Field label="Nom" value={name} onChangeText={setName} placeholder="Votre nom" />}
      <Field label="Email" value={email} onChangeText={setEmail} placeholder="vous@exemple.com" keyboard="email-address" />
      <Field label="Mot de passe" value={password} onChangeText={setPassword} placeholder="6 caractères minimum" secure />
      <Pressable style={styles.primary} onPress={submit}>
        <Text style={styles.primaryText}>{creating ? "Créer un compte" : "Entrer"}</Text>
      </Pressable>
      <Pressable style={styles.ghost} onPress={() => setCreating((value) => !value)}>
        <Text style={styles.ghostText}>{creating ? "J'ai déjà un compte" : "Créer un compte"}</Text>
      </Pressable>
      {googleConfigured && (
        <Pressable style={styles.ghost} disabled={!googleRequest} onPress={() => promptGoogle()}>
          <Text style={styles.ghostText}>Continuer avec Google</Text>
        </Pressable>
      )}
      {Platform.OS === "ios" && (
        <Pressable style={styles.ghost} onPress={() => apple().catch((error: Error) => setMessage(error.message))}>
          <Text style={styles.ghostText}>Continuer avec Apple</Text>
        </Pressable>
      )}
    </AuthShell>
  );
}

function AuthShell({ message, children }: { message: string; children: ReactNode }) {
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.brandRow}>
            <View style={styles.mark}><Text style={styles.markText}>Ô</Text></View>
            <Text style={styles.eyebrow}>Streaming africain</Text>
          </View>
          <Text style={styles.title}>Ô musiki</Text>
          <Text style={styles.lede}>Makossa, Afrobeat, Rumba et les sons du continent.</Text>
          {message ? <Text style={styles.notice}>{message}</Text> : null}
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  secure,
  keyboard,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secure?: boolean;
  keyboard?: "email-address" | "default";
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secure}
        autoCapitalize="none"
        keyboardType={keyboard || "default"}
      />
    </View>
  );
}

function Catalog({ token, onOpen }: { token: string; onOpen: (id: string) => void }) {
  const [titles, setTitles] = useState<Title[]>([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api<Title[]>("/api/titles", token).then(setTitles).catch((error) => setMessage(explain(error)));
    registerPush(token);
  }, [token]);

  async function search() {
    setMessage("");
    try {
      const path = query.trim() ? `/api/search?q=${encodeURIComponent(query.trim())}` : "/api/titles";
      setTitles(await api<Title[]>(path, token));
    } catch (error) {
      setMessage(explain(error));
    }
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      data={titles}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.body}
      ListHeaderComponent={
        <View style={{ gap: 12, marginBottom: 4 }}>
          <View style={styles.brandRow}>
            <View style={styles.mark}><Text style={styles.markText}>Ô</Text></View>
            <Text style={styles.brand}>Ô musiki</Text>
          </View>
          <Text style={styles.lede}>Les bandes-annonces sont ouvertes. Le titre complet suit votre accès.</Text>
          {message ? <Text style={styles.notice}>{message}</Text> : null}
          <Field label="Recherche" value={query} onChangeText={setQuery} placeholder="Titre, artiste, genre" />
          <Pressable style={styles.primary} onPress={search}>
            <Text style={styles.primaryText}>Rechercher</Text>
          </Pressable>
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={<Text style={styles.muted}>Aucun titre pour cette recherche.</Text>}
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => onOpen(item.id)}>
          <View style={styles.pill}><Text style={styles.pillText}>{accessLabel(item.access)}</Text></View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.muted}>{item.artistName} · {item.genre}</Text>
        </Pressable>
      )}
    />
  );
}

function TitleScreen({ token, id, onBack }: { token: string; id: string; onBack: () => void }) {
  const [title, setTitle] = useState<Title | null>(null);
  const [playback, setPlayback] = useState<Playback | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api<Title>(`/api/titles/${id}`, token).then(setTitle).catch((error) => setMessage(explain(error)));
  }, [id, token]);

  async function play(kind: "trailer" | "full") {
    setMessage("");
    setPlayback(null);
    try {
      const next = await api<Playback>(`/api/titles/${id}/playback?kind=${kind}`, token);
      setPlayback(next);
      if (!next.hlsUrl) setMessage(kind === "trailer" ? "Bande-annonce pas encore disponible." : "Le fichier n'est pas encore disponible.");
      if (kind === "full" && next.hlsUrl) {
        api(`/api/titles/${id}/plays`, token, { method: "POST", body: JSON.stringify({ secondsHeard: 0 }) }).catch(() => undefined);
      }
    } catch (error) {
      setMessage(explain(error));
    }
  }

  async function buy() {
    if (!title) return;
    const sku = Platform.OS === "ios"
      ? title.price?.appleProductId || "fr.omusiki.title.standard"
      : title.price?.googleProductId || "title_standard";
    try {
      const transactionId = await buyStoreProduct(sku);
      const path = Platform.OS === "ios" ? "/api/billing/apple" : "/api/billing/google";
      await api(path, token, {
        method: "POST",
        body: JSON.stringify({ productId: sku, transactionId, purchaseToken: transactionId }),
      });
      setMessage("Accès enregistré.");
    } catch (error) {
      setMessage(explain(error));
    }
  }

  async function download() {
    if (!title) return;
    try {
      const grant = await api<{ url: string; expiresAt: string }>(`/api/titles/${id}/download`, token);
      await saveDownload(grant.url, title, grant.expiresAt);
      setMessage("Titre enregistré sur l'appareil jusqu'à l'expiration de l'accès.");
    } catch (error) {
      setMessage(explain(error));
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Pressable onPress={onBack}><Text style={styles.ghostText}>Retour</Text></Pressable>
      {message ? <Text style={styles.notice}>{message}</Text> : null}
      {title && (
        <View style={{ gap: 12 }}>
          <View style={styles.pill}><Text style={styles.pillText}>{accessLabel(title.access)}</Text></View>
          <Text style={styles.title}>{title.name}</Text>
          <Text style={styles.lede}>{title.artistName} · {title.genre}{title.country ? ` · ${title.country}` : ""}</Text>
          {title.description ? <Text style={styles.muted}>{title.description}</Text> : null}
          {playback?.hlsUrl ? <Player uri={playback.hlsUrl} /> : null}
          <Pressable style={styles.ghost} onPress={() => play("trailer")}>
            <Text style={styles.ghostText}>Bande-annonce</Text>
          </Pressable>
          <Pressable style={styles.primary} onPress={() => play("full")}>
            <Text style={styles.primaryText}>Écouter</Text>
          </Pressable>
          {title.access === "PURCHASE" && (
            <Pressable style={styles.ghost} onPress={buy}>
              <Text style={styles.ghostText}>
                Acheter{title.price ? ` · ${money(title.price.amountCents, title.price.currency)}` : ""}
              </Text>
            </Pressable>
          )}
          <Pressable style={styles.ghost} onPress={download}>
            <Text style={styles.ghostText}>Télécharger hors ligne</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

function Plans({ token }: { token: string }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api<Plan[]>("/api/plans", token).then(setPlans).catch((error) => setMessage(explain(error)));
  }, [token]);

  async function subscribe(plan: Plan) {
    const sku = Platform.OS === "ios" ? plan.appleProductId : plan.googleProductId;
    try {
      const transactionId = await buyStoreProduct(sku, "subscription");
      const path = Platform.OS === "ios" ? "/api/billing/apple" : "/api/billing/google";
      await api(path, token, {
        method: "POST",
        body: JSON.stringify({ productId: sku, transactionId, purchaseToken: transactionId }),
      });
      setMessage("Abonnement enregistré pour 30 jours.");
    } catch (error) {
      setMessage(explain(error));
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Text style={styles.eyebrow}>Abonnement</Text>
      <Text style={styles.title}>Écouter sans limite</Text>
      <Text style={styles.lede}>L'abonnement se règle dans l'App Store ou le Play Store.</Text>
      {message ? <Text style={styles.notice}>{message}</Text> : null}
      {plans.length === 0 && <Text style={styles.muted}>Aucun forfait publié.</Text>}
      {plans.map((plan) => (
        <Pressable key={plan.id} style={styles.card} onPress={() => subscribe(plan)}>
          <Text style={styles.cardTitle}>{plan.name}</Text>
          <Text style={styles.lede}>{money(plan.amountCents, plan.currency)} / {plan.interval === "month" ? "mois" : plan.interval}</Text>
          <Text style={styles.ghostText}>S'abonner</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function Account({ token, onSignOut }: { token: string; onSignOut: () => void }) {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [name, setName] = useState("");
  const [downloads, setDownloads] = useState<SavedDownload[]>([]);
  const [playing, setPlaying] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api<Viewer>("/api/me", token).then((me) => {
      setViewer(me);
      setName(me.name);
    }).catch((error) => setMessage(explain(error)));
    listDownloads().then(setDownloads).catch(() => undefined);
  }, [token]);

  async function save() {
    try {
      const updated = await api<Viewer>("/api/me", token, { method: "PATCH", body: JSON.stringify({ name }) });
      setViewer(updated);
      setMessage("Compte mis à jour.");
    } catch (error) {
      setMessage(explain(error));
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.eyebrow}>Compte</Text>
        <Text style={styles.title}>{viewer?.name || "Profil"}</Text>
        <Text style={styles.muted}>{viewer?.email}</Text>
        {message ? <Text style={styles.notice}>{message}</Text> : null}
        <Field label="Nom" value={name} onChangeText={setName} />
        <Pressable style={styles.primary} onPress={save}>
          <Text style={styles.primaryText}>Enregistrer</Text>
        </Pressable>
        <Text style={styles.cardTitle}>Hors ligne</Text>
        {downloads.length === 0 && <Text style={styles.muted}>Aucun titre enregistré sur cet appareil.</Text>}
        {downloads.map((item) => (
          <Pressable key={item.titleId} style={styles.card} onPress={() => setPlaying(item.uri)}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.muted}>Disponible jusqu'au {new Date(item.expiresAt).toLocaleString("fr-FR")}</Text>
          </Pressable>
        ))}
        {playing ? <Player uri={playing} /> : null}
        <Pressable style={styles.ghost} onPress={onSignOut}>
          <Text style={styles.ghostText}>Sortir</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

async function registerPush(token: string) {
  if (Platform.OS === "web") return;
  try {
    const Notifications = await import("expo-notifications");
    const permission = await Notifications.requestPermissionsAsync();
    if (permission.status !== "granted") return;
    const push = await Notifications.getExpoPushTokenAsync();
    await api("/api/me/device-token", token, {
      method: "POST",
      body: JSON.stringify({ token: push.data, platform: Platform.OS }),
    });
  } catch {
    return;
  }
}
