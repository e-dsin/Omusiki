import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApps } from "firebase/app";
import * as FirebaseAuth from "firebase/auth";
import type { Auth, Persistence } from "firebase/auth";

const nativePersistence = (FirebaseAuth as typeof FirebaseAuth & {
  getReactNativePersistence?: (storage: typeof AsyncStorage) => Persistence;
}).getReactNativePersistence;

const config = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseReady = Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);

export function firebaseAuth(): Auth {
  const app = getApps()[0] ?? initializeApp(config);
  try {
    if (!nativePersistence) return FirebaseAuth.getAuth(app);
    return FirebaseAuth.initializeAuth(app, { persistence: nativePersistence(AsyncStorage) });
  } catch {
    return FirebaseAuth.getAuth(app);
  }
}

export async function signInWithEmail(email: string, password: string) {
  const result = await FirebaseAuth.signInWithEmailAndPassword(firebaseAuth(), email, password);
  return result.user.getIdToken();
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  const result = await FirebaseAuth.createUserWithEmailAndPassword(firebaseAuth(), email, password);
  if (name) await FirebaseAuth.updateProfile(result.user, { displayName: name });
  return result.user.getIdToken();
}

export function signOutFirebase() {
  return FirebaseAuth.signOut(firebaseAuth());
}
