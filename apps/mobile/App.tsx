import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

const base = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

interface Title {
  id: string;
  name: string;
  artistName: string;
  genre: string;
  access: string;
  hasTrailer: boolean;
}

async function call<T>(path: string, token: string | null, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((body as { message?: string }).message || "Request failed");
  return body as T;
}

export function App() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [titles, setTitles] = useState<Title[]>([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [downloads, setDownloads] = useState<string[]>([]);

  useEffect(() => {
    if (!token) return;
    call<Title[]>("/api/titles", token).then(setTitles).catch((error) => setMessage(error.message));
    registerForNotifications(token).catch(() => undefined);
  }, [token]);

  async function signIn() {
    const session = await call<{ token: string }>("/api/auth/dev-session", null, {
      method: "POST",
      body: JSON.stringify({ email, name, role: "SUBSCRIBER" }),
    });
    setToken(session.token);
  }

  async function search() {
    setTitles(await call<Title[]>(`/api/search?q=${encodeURIComponent(query)}`, token));
  }

  async function preview(title: Title) {
    try {
      const playback = await call<{ hlsUrl: string | null }>(`/api/titles/${title.id}/playback?kind=trailer`, token);
      setMessage(playback.hlsUrl ? `Bande-annonce prête : ${title.name}` : "Bande-annonce pas encore disponible");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Lecture impossible");
    }
  }

  async function buy(title: Title) {
    const productId = Platform.OS === "ios" ? "fr.omusiki.title.standard" : "title_standard";
    let transactionId = "";
    try {
      const iap = await import("react-native-iap");
      await iap.initConnection();
      const purchase = await iap.requestPurchase({ sku: productId });
      const first = Array.isArray(purchase) ? purchase[0] : purchase;
      transactionId = first?.transactionId || "";
    } catch {
      setMessage("L'achat store se fait dans un build Apple ou Android.");
      return;
    }
    const path = Platform.OS === "ios" ? "/api/billing/apple" : "/api/billing/google";
    await call(path, token, {
      method: "POST",
      body: JSON.stringify({ productId, transactionId, purchaseToken: transactionId }),
    });
    setMessage("Accès enregistré.");
  }

  async function download(title: Title) {
    const grant = await call<{ url: string }>(`/api/titles/${title.id}/download`, token);
    setDownloads((current) => [...current, `${title.name} · ${grant.url}`]);
  }

  async function saveAccount() {
    await call("/api/me", token, { method: "PATCH", body: JSON.stringify({ name }) });
    setMessage("Compte mis à jour.");
  }

  if (!token) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Ô musiki</Text>
        <Text style={styles.muted}>Email, Google et Apple. En local, l'email ouvre une session de développement.</Text>
        <TextInput style={styles.input} placeholder="Nom" placeholderTextColor="#b7a8cc" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#b7a8cc" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Pressable style={styles.button} onPress={signIn}><Text style={styles.buttonText}>Entrer</Text></Pressable>
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Catalogue</Text>
      {message ? <Text style={styles.muted}>{message}</Text> : null}
      <View style={styles.row}>
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="Recherche" placeholderTextColor="#b7a8cc" value={query} onChangeText={setQuery} />
        <Pressable style={styles.button} onPress={search}><Text style={styles.buttonText}>OK</Text></Pressable>
      </View>
      <FlatList
        data={titles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.muted}>{item.artistName} · {item.genre}</Text>
            <View style={styles.row}>
              <Pressable style={styles.button} onPress={() => preview(item)}><Text style={styles.buttonText}>Aperçu</Text></Pressable>
              <Pressable style={styles.button} onPress={() => buy(item)}><Text style={styles.buttonText}>Acheter</Text></Pressable>
              <Pressable style={styles.button} onPress={() => download(item)}><Text style={styles.buttonText}>Hors ligne</Text></Pressable>
            </View>
          </View>
        )}
      />
      <Text style={styles.cardTitle}>Compte</Text>
      <View style={styles.row}>
        <TextInput style={[styles.input, { flex: 1 }]} value={name} onChangeText={setName} />
        <Pressable style={styles.button} onPress={saveAccount}><Text style={styles.buttonText}>Sauver</Text></Pressable>
      </View>
      {downloads.map((line) => <Text key={line} style={styles.muted}>{line}</Text>)}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

async function registerForNotifications(token: string) {
  const Notifications = await import("expo-notifications");
  const permission = await Notifications.requestPermissionsAsync();
  if (permission.status !== "granted") return;
  const push = await Notifications.getExpoPushTokenAsync();
  await call("/api/me/device-token", token, {
    method: "POST",
    body: JSON.stringify({ token: push.data, platform: Platform.OS }),
  });
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0e0a16", padding: 16 },
  title: { color: "white", fontSize: 28, fontWeight: "700", marginBottom: 8 },
  muted: { color: "#b7a8cc", marginBottom: 8 },
  input: { backgroundColor: "#1c1428", color: "white", borderRadius: 10, padding: 12, marginBottom: 8 },
  button: { backgroundColor: "#8b5cf6", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginRight: 8 },
  buttonText: { color: "white" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  card: { backgroundColor: "#1a1224", borderRadius: 16, padding: 12, marginBottom: 12 },
  cardTitle: { color: "white", fontSize: 18 },
});
