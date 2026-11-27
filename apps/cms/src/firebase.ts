import { initializeApp, getApps } from "firebase/app";
import {
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const tokenKey = "omusiki_cms_token";

export const firebaseReady = Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);

export function firebaseAuth() {
  const app = getApps().find((item) => item.name === "cms") ?? initializeApp(config, "cms");
  return getAuth(app);
}

export async function remember(user: User) {
  const token = await user.getIdToken();
  localStorage.setItem(tokenKey, token);
  return token;
}

export async function signInWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(firebaseAuth(), email, password);
  return remember(result.user);
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  const result = await createUserWithEmailAndPassword(firebaseAuth(), email, password);
  if (name) await updateProfile(result.user, { displayName: name });
  return remember(result.user);
}

export async function signInWithGoogle() {
  const result = await signInWithPopup(firebaseAuth(), new GoogleAuthProvider());
  return remember(result.user);
}

export async function signInWithApple() {
  const provider = new OAuthProvider("apple.com");
  provider.addScope("email");
  provider.addScope("name");
  const result = await signInWithPopup(firebaseAuth(), provider);
  return remember(result.user);
}

export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(firebaseAuth(), email);
}

export async function signOutFirebase() {
  if (firebaseReady) await signOut(firebaseAuth());
  localStorage.removeItem(tokenKey);
}
