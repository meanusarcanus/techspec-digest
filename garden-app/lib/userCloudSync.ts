import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirebaseDb } from './firebaseClient';
import { GardenUser } from './gardenAuthEngine';

const USERS_COLLECTION = 'botanist_users';

/**
 * Normalizes username for Firestore document ID.
 */
function sanitizeUsername(username: string): string {
  return (username || 'botanist')
    .toLowerCase()
    .trim()
    .replace(/^@/, '')
    .replace(/[^a-z0-9_-]/g, '_')
    .slice(0, 60);
}

/**
 * Saves or updates a botanist profile in Firestore.
 */
export async function saveUserToCloud(user: GardenUser): Promise<boolean> {
  const db = getFirebaseDb();
  if (!db || !user || !user.username) return false;

  try {
    const docId = sanitizeUsername(user.username);
    const docRef = doc(db, USERS_COLLECTION, docId);

    const existingSnap = await getDoc(docRef);
    let joinedAt = user.joinedAt || new Date().toISOString();
    let highestContributions = user.contributionsCount || 0;

    if (existingSnap.exists()) {
      const data = existingSnap.data() as Partial<GardenUser>;
      if (data.joinedAt) joinedAt = data.joinedAt;
      if (typeof data.contributionsCount === 'number') {
        highestContributions = Math.max(highestContributions, data.contributionsCount);
      }
    }

    const payload: GardenUser = {
      ...user,
      joinedAt,
      contributionsCount: highestContributions
    };

    await setDoc(docRef, payload, { merge: true });
    return true;
  } catch (err) {
    console.warn('Could not save user to cloud:', err);
    return false;
  }
}

/**
 * Fetches a botanist profile from Firestore by username or email.
 */
export async function fetchUserFromCloud(usernameOrEmail: string): Promise<GardenUser | null> {
  const db = getFirebaseDb();
  if (!db || !usernameOrEmail) return null;

  try {
    const cleanHandle = sanitizeUsername(usernameOrEmail.includes('@') ? usernameOrEmail.split('@')[0] : usernameOrEmail);
    const docRef = doc(db, USERS_COLLECTION, cleanHandle);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return snap.data() as GardenUser;
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch user from cloud:', err);
    return null;
  }
}
