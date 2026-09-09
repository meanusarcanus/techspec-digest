import { PLANT_CARE_GUIDES, PlantCareGuide } from '../data/plantCareGuides';

export function getDailyFeaturedPlant(targetDate?: Date): {
  plant: PlantCareGuide;
  dayIndex: number;
  formattedDate: string;
  totalGuidesCount: number;
} {
  const date = targetDate || new Date();
  
  // Deterministic Day of Year Calculation
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = Math.abs(dayOfYear) % PLANT_CARE_GUIDES.length;
  const plant = PLANT_CARE_GUIDES[index] || PLANT_CARE_GUIDES[0];

  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return {
    plant,
    dayIndex: index,
    formattedDate,
    totalGuidesCount: PLANT_CARE_GUIDES.length
  };
}

export const STORAGE_KEY_CUSTOM_CATALOG = 'garden_perks_custom_catalog';

/**
 * Retrieves custom plants discovered and saved by Google Vision AI in the browser.
 */
export function getCustomCatalogPlants(): PlantCareGuide[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_CATALOG);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load custom plants from localStorage:', e);
    return [];
  }
}

/**
 * Saves or updates a discovered plant in the local custom catalog and notifies listeners.
 */
export function saveCustomPlantToCatalog(plant: PlantCareGuide): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCustomCatalogPlants();
    // Check if plant with same slug or id already exists
    const index = existing.findIndex(p => p.id === plant.id || p.slug === plant.slug || p.commonName.toLowerCase() === plant.commonName.toLowerCase());
    
    let updated: PlantCareGuide[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = { ...existing[index], ...plant };
    } else {
      updated = [plant, ...existing];
    }
    
    localStorage.setItem(STORAGE_KEY_CUSTOM_CATALOG, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('garden_catalog_updated', { detail: plant }));
  } catch (e) {
    console.error('Failed to save custom plant to localStorage:', e);
  }
}

/**
 * Removes a custom plant from local catalog.
 */
export function removeCustomPlantFromCatalog(idOrSlug: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCustomCatalogPlants();
    const updated = existing.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug);
    localStorage.setItem(STORAGE_KEY_CUSTOM_CATALOG, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('garden_catalog_updated'));
  } catch (e) {
    console.error('Failed to remove custom plant from localStorage:', e);
  }
}

export function getAllPlantGuides(): PlantCareGuide[] {
  const custom = getCustomCatalogPlants();
  if (custom.length === 0) return PLANT_CARE_GUIDES;
  return [...custom, ...PLANT_CARE_GUIDES];
}

export function getPlantGuideBySlug(slug: string): PlantCareGuide | undefined {
  const all = getAllPlantGuides();
  return all.find(p => p.slug === slug || p.id === slug);
}

