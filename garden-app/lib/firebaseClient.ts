import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyCIp4i0vStF98RgdpHAG8OdwQWV7n7OA8Q",
  authDomain: "garden-perks.firebaseapp.com",
  projectId: "garden-perks",
  storageBucket: "garden-perks.firebasestorage.app",
  messagingSenderId: "504278844216",
  appId: "1:504278844216:web:5f62e98a97c494da1eb7cd",
  measurementId: "G-KN4VHD1CHL"
};

let db: Firestore | null = null;

export function getFirebaseDb(): Firestore | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    if (!db) {
      db = getFirestore(app);
    }
    return db;
  } catch (err) {
    console.warn('Firebase initialization notice:', err);
    return null;
  }
}
