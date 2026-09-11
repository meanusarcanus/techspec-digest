import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseDb } from './firebaseClient';
import type { GardenUser } from './gardenAuthEngine';

const NEWSLETTER_COLLECTION = 'newsletter_subscribers';

export interface NewsletterSubscriptionOptions {
  email: string;
  username?: string;
  source?: string;
  preferences?: {
    indoor?: boolean;
    edible?: boolean;
    pests?: boolean;
  };
  user?: GardenUser | null;
}

/**
 * Saves subscriber to Firestore and triggers real welcome email via Hostinger PHP mailer
 */
export async function syncNewsletterSubscriptionToCloud(
  options: NewsletterSubscriptionOptions
): Promise<{ success: boolean; emailDispatched: boolean; error?: string }> {
  const cleanEmail = (options.email || '').trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, emailDispatched: false, error: 'Invalid email' };
  }

  const username = options.username || (options.user?.username) || cleanEmail.split('@')[0];
  const badge = options.user?.badge || '🌿 Botanical Scout';
  const tier = options.user?.badgeTier || 'Novice Botanist';

  // 1. Save to Firebase Firestore
  let firestoreSaved = false;
  try {
    const db = getFirebaseDb();
    if (db) {
      const docId = cleanEmail.replace(/[^a-z0-9_.-]/g, '_');
      const docRef = doc(db, NEWSLETTER_COLLECTION, docId);
      await setDoc(
        docRef,
        {
          email: cleanEmail,
          username,
          badge,
          tier,
          subscribedAt: serverTimestamp(),
          source: options.source || 'garden.theodisius.com',
          status: 'active',
          preferences: options.preferences || { indoor: true, edible: true, pests: true }
        },
        { merge: true }
      );
      firestoreSaved = true;
    }
  } catch (err) {
    console.warn('Firestore newsletter subscription sync warning:', err);
  }

  // 2. Dispatch real email via Hostinger PHP mailer
  let emailDispatched = false;
  try {
    if (typeof window !== 'undefined') {
      const isSubdomain = window.location.hostname.includes('garden.theodisius.com');
      // If running on garden.theodisius.com, use relative path; otherwise hit the live endpoint
      const endpoint = isSubdomain
        ? '/api/subscribe.php'
        : 'https://garden.theodisius.com/api/subscribe.php';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: cleanEmail,
          username,
          badge,
          tier,
          source: options.source || window.location.hostname
        })
      });

      if (response.ok) {
        const result = await response.json().catch(() => ({}));
        emailDispatched = !!result.success;
      }
    }
  } catch (err) {
    console.warn('Hostinger email dispatch warning:', err);
  }

  return {
    success: true,
    emailDispatched
  };
}
