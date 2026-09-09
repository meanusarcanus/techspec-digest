import { collection, doc, setDoc, updateDoc, increment, onSnapshot, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { getFirebaseDb } from './firebaseClient';
import { DoctorDiagnosis } from './botanicalDoctor';

export interface ClinicPost {
  id: string;
  author: string;
  avatarColor: string;
  plantName: string;
  question: string;
  timestamp: string;
  createdAtMs?: number;
  likesCount: number;
  doctorReply?: DoctorDiagnosis;
}

const CLINIC_COLLECTION = 'clinic_consultations';

/**
 * Saves a new Dr. Flora consultation question & answer to Firestore.
 */
export async function saveClinicPostToCloud(post: ClinicPost): Promise<boolean> {
  const db = getFirebaseDb();
  if (!db || !post || !post.id) return false;

  try {
    const docRef = doc(db, CLINIC_COLLECTION, post.id);
    const payload: ClinicPost = {
      ...post,
      createdAtMs: post.createdAtMs || Date.now()
    };
    await setDoc(docRef, payload, { merge: true });
    return true;
  } catch (err) {
    console.warn('Failed to save Dr. Flora consultation to cloud:', err);
    return false;
  }
}

/**
 * Increments the like count for a clinic consultation in Firestore.
 */
export async function likeClinicPostInCloud(postId: string): Promise<boolean> {
  const db = getFirebaseDb();
  if (!db || !postId) return false;

  try {
    const docRef = doc(db, CLINIC_COLLECTION, postId);
    await updateDoc(docRef, {
      likesCount: increment(1)
    });
    return true;
  } catch (err) {
    console.warn('Failed to update likes count in cloud:', err);
    return false;
  }
}

/**
 * Subscribes to community clinic consultations in real time.
 */
export function subscribeToClinicConsultations(
  onUpdate: (posts: ClinicPost[]) => void,
  fallbackPosts: ClinicPost[] = []
): () => void {
  if (typeof window === 'undefined') return () => {};
  const db = getFirebaseDb();
  if (!db) {
    onUpdate(fallbackPosts);
    return () => {};
  }

  try {
    const colRef = collection(db, CLINIC_COLLECTION);
    
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      if (snapshot.empty) {
        // If collection is empty on first setup, seed initial community posts
        if (fallbackPosts.length > 0) {
          fallbackPosts.forEach(p => {
            saveClinicPostToCloud(p).catch(() => {});
          });
          onUpdate(fallbackPosts);
        }
        return;
      }

      const cloudPosts: ClinicPost[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as ClinicPost;
        if (data && data.question && data.plantName) {
          cloudPosts.push({
            ...data,
            id: data.id || d.id,
            createdAtMs: data.createdAtMs || (data.id.startsWith('post-') ? parseInt(data.id.replace('post-', ''), 10) : 0)
          });
        }
      });

      // Sort by newest first
      cloudPosts.sort((a, b) => {
        const timeA = a.createdAtMs || 0;
        const timeB = b.createdAtMs || 0;
        return timeB - timeA;
      });

      // Cache to localStorage for instant offline load
      try {
        localStorage.setItem('garden_perks_clinic_posts', JSON.stringify(cloudPosts));
      } catch (storageErr) {}

      onUpdate(cloudPosts);
    }, (error) => {
      console.warn('Clinic cloud subscription notice:', error.message);
      onUpdate(fallbackPosts);
    });

    return unsubscribe;
  } catch (err) {
    console.warn('subscribeToClinicConsultations notice:', err);
    onUpdate(fallbackPosts);
    return () => {};
  }
}
