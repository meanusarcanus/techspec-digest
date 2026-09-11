import { collection, doc, getDoc, setDoc, onSnapshot, getDocs } from 'firebase/firestore';
import { getFirebaseDb } from './firebaseClient';
import { PlantCareGuide } from '../data/plantCareGuides';
import { getCustomCatalogPlants, deduplicatePlantGuides, STORAGE_KEY_CUSTOM_CATALOG } from './gardenDailyEngine';

const COMMUNITY_COLLECTION = 'community_plants';

/**
 * Sanitizes a plant slug for Firestore document ID.
 */
function sanitizeDocId(idOrSlug: string): string {
  return (idOrSlug || 'plant')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .slice(0, 80);
}

/**
 * Syncs a single plant care guide to the community Firestore database.
 * Preserves the original discoverer/contributor (addedBy) if the plant already exists.
 */
export async function syncPlantToCloud(plant: PlantCareGuide): Promise<boolean> {
  const db = getFirebaseDb();
  if (!db) return false;

  try {
    const docId = sanitizeDocId(plant.slug || plant.id);
    const docRef = doc(db, COMMUNITY_COLLECTION, docId);
    
    // Check if doc exists to protect author attribution
    const existingSnap = await getDoc(docRef);
    let finalAddedBy = plant.addedBy;
    let finalAliases = plant.aliases || [];

    if (existingSnap.exists()) {
      const existingData = existingSnap.data() as Partial<PlantCareGuide>;
      finalAddedBy = existingData.addedBy || plant.addedBy;
      finalAliases = Array.from(new Set([
        ...(existingData.aliases || []),
        ...(plant.aliases || [])
      ]));
    }

    const payload: PlantCareGuide = {
      ...plant,
      aliases: finalAliases,
      ...(finalAddedBy ? { addedBy: finalAddedBy } : {})
    };

    await setDoc(docRef, payload, { merge: true });
    return true;
  } catch (err) {
    console.warn('Could not sync plant to Firestore:', err);
    return false;
  }
}

let isSubscribed = false;

/**
 * Initializes a real-time listener for the community catalog.
 * When any user adds or updates a plant in Firestore, this listener updates localStorage
 * and notifies all components across the app to re-render in real-time.
 */
export function initCommunityCatalogSync(onUpdate?: (plants: PlantCareGuide[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const db = getFirebaseDb();
  if (!db) return () => {};

  try {
    const colRef = collection(db, COMMUNITY_COLLECTION);
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      if (snapshot.empty) return;

      const cloudPlants: PlantCareGuide[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as PlantCareGuide;
        if (data && (data.commonName || data.scientificName)) {
          const com = (data.commonName || '').toLowerCase();
          const sci = (data.scientificName || '').toLowerCase();
          let cleanAliases = data.aliases;
          if (cleanAliases && Array.isArray(cleanAliases)) {
            cleanAliases = cleanAliases.filter(a => {
              const lowerA = (a || '').trim().toLowerCase();
              if (lowerA === 'horse' && !com.includes('horse') && !sci.includes('horse')) return false;
              if (lowerA === 'tree' || lowerA === 'plant' || lowerA === 'flower') return false;
              return true;
            });
          }
          cloudPlants.push({ ...data, aliases: cleanAliases });
        }
      });

      if (cloudPlants.length === 0) return;

      // Merge cloud plants with existing local custom catalog
      const localCustom = getCustomCatalogPlants();
      const combined = deduplicatePlantGuides([...cloudPlants, ...localCustom]);

      try {
        localStorage.setItem(STORAGE_KEY_CUSTOM_CATALOG, JSON.stringify(combined));
        window.dispatchEvent(new CustomEvent('garden_catalog_updated'));
      } catch (storageErr) {
        console.warn('LocalStorage update warning:', storageErr);
      }

      if (onUpdate) {
        onUpdate(combined);
      }
    }, (error) => {
      console.warn('Firestore subscription notice (running offline/local mode):', error.message);
    });

    return unsubscribe;
  } catch (err) {
    console.warn('initCommunityCatalogSync notice:', err);
    return () => {};
  }
}
