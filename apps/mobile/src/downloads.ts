import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, Paths } from "expo-file-system";

const key = "omusiki_downloads";

export interface SavedDownload {
  titleId: string;
  name: string;
  uri: string;
  expiresAt: string;
}

export async function listDownloads() {
  const raw = await AsyncStorage.getItem(key);
  const rows = raw ? (JSON.parse(raw) as SavedDownload[]) : [];
  const fresh = rows.filter((row) => Date.parse(row.expiresAt) > Date.now());
  if (fresh.length !== rows.length) await AsyncStorage.setItem(key, JSON.stringify(fresh));
  return fresh;
}

export async function saveDownload(url: string, title: { id: string; name: string }, expiresAt: string) {
  const destination = new File(Paths.document, `${title.id}.media`);
  const file = await File.downloadFileAsync(url, destination);
  const next = (await listDownloads()).filter((row) => row.titleId !== title.id);
  next.unshift({ titleId: title.id, name: title.name, uri: file.uri, expiresAt });
  await AsyncStorage.setItem(key, JSON.stringify(next));
  return next;
}
