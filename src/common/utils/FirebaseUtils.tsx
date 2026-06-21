import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User as FirebaseUser } from "firebase/auth";
import {
  
} from "firebase/auth";
import type { User } from "../../types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() : Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const firebaseUser = result.user;
  return {
    name: firebaseUser.displayName || "User",
    email: firebaseUser.email || "",
    photo: firebaseUser.photoURL || "",
  };
}

export async function logoutUser() {
  await signOut(auth);
}

export function subscribeToAuthState(
  callback: (user: FirebaseUser | null) => void
) {
  return onAuthStateChanged(auth, callback);
}

export async function getFirebaseIdToken(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    // onAuthStateChanged fires immediately with the current user (or null).
    // Using it here ensures we wait for Firebase to finish restoring the session
    // from persistence before fetching a token — auth.currentUser can be null
    // on page load even when the user is logged in.
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe();
      if (!user) return resolve(null);
      try {
        resolve(await user.getIdToken());
      } catch (err) {
        reject(err);
      }
    });
  });
}