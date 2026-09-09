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
 * Rigorously checks if two plant records refer to the same botanical organism.
 * Compares IDs, slugs, scientific names (accounting for author suffixes like 'Liebm.' or 'Blume'),
 * common names (accounting for parentheses / alternate names), and cross-referenced aliases.
 */
export function isSamePlant(a: PlantCareGuide, b: PlantCareGuide): boolean {
  if (!a || !b) return false;
  if (a.id && b.id && a.id === b.id) return true;
  if (a.slug && b.slug && a.slug === b.slug) return true;

  const getGenusSpecies = (sci: string) => 
    (sci || '').trim().toLowerCase().split(/\s+/).slice(0, 2).join(' ');

  const sciA = getGenusSpecies(a.scientificName);
  const sciB = getGenusSpecies(b.scientificName);
  if (sciA && sciB && sciA === sciB) return true;

  const normalizeCommon = (name: string) =>
    (name || '').toLowerCase()
      .replace(/\(.*?\)/g, '')
      .replace(/[^a-z0-9]/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');

  const normA = normalizeCommon(a.commonName);
  const normB = normalizeCommon(b.commonName);
  if (normA && normB) {
    if (normA === normB) return true;
    if (normA.includes(normB) || normB.includes(normA)) {
      const wordsA = normA.split(' ');
      const wordsB = normB.split(' ');
      const commonWords = wordsA.filter(w => wordsB.includes(w) && w.length >= 3);
      if (commonWords.length >= 2 || (wordsA.includes('orchid') && wordsB.includes('orchid'))) {
        return true;
      }
    }
  }

  // Cross-reference aliases
  const aliasesA = (a.aliases || []).map(x => x.toLowerCase().trim());
  const aliasesB = (b.aliases || []).map(x => x.toLowerCase().trim());
  if (normB && aliasesA.some(al => al === normB || al === sciB)) return true;
  if (normA && aliasesB.some(al => al === normA || al === sciA)) return true;

  return false;
}

/**
 * Consolidates an array of PlantCareGuide objects by merging duplicate records into a single canonical guide.
 * Merges aliases, keeps contributor attributions, and preserves the richest guide content.
 */
export function deduplicatePlantGuides(guides: PlantCareGuide[]): PlantCareGuide[] {
  const result: PlantCareGuide[] = [];

  for (const plant of guides) {
    if (!plant) continue;
    const existingIndex = result.findIndex(existing => isSamePlant(existing, plant));
    if (existingIndex >= 0) {
      const existing = result[existingIndex];
      const mergedAliases = Array.from(new Set([
        ...(existing.aliases || []),
        ...(plant.aliases || []),
        existing.commonName.toLowerCase(),
        plant.commonName.toLowerCase(),
        existing.scientificName.toLowerCase(),
        plant.scientificName.toLowerCase()
      ])).filter(Boolean);

      result[existingIndex] = {
        ...existing,
        ...plant,
        id: existing.id || plant.id,
        slug: existing.slug || plant.slug,
        commonName: (existing.commonName.length > plant.commonName.length) ? existing.commonName : plant.commonName,
        scientificName: (existing.scientificName.length > plant.scientificName.length) ? existing.scientificName : plant.scientificName,
        addedBy: plant.addedBy || existing.addedBy,
        heroImage: plant.heroImage || existing.heroImage,
        overview: (plant.overview && plant.overview.length > (existing.overview?.length || 0)) ? plant.overview : existing.overview,
        aliases: mergedAliases
      };
    } else {
      result.push(plant);
    }
  }

  return result;
}

/**
 * Purges all duplicate records from localStorage custom catalog and dispatches an update event.
 */
export function purgeDuplicateCatalogEntries(): { beforeCount: number; afterCount: number; purgedCount: number } {
  if (typeof window === 'undefined') return { beforeCount: 0, afterCount: 0, purgedCount: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_CATALOG);
    if (!raw) return { beforeCount: 0, afterCount: 0, purgedCount: 0 };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return { beforeCount: 0, afterCount: 0, purgedCount: 0 };

    const beforeCount = parsed.length;

    // Filter out any custom plant that is an identical or redundant copy of a core guide without unique custom additions
    const dedupedCustom = deduplicatePlantGuides(parsed).filter(customPlant => {
      const coreMatch = PLANT_CARE_GUIDES.find(core => isSamePlant(core, customPlant));
      if (coreMatch && !customPlant.addedBy) {
        return false;
      }
      return true;
    });

    const afterCount = dedupedCustom.length;
    const purgedCount = beforeCount - afterCount;

    if (purgedCount > 0 || beforeCount !== parsed.length) {
      localStorage.setItem(STORAGE_KEY_CUSTOM_CATALOG, JSON.stringify(dedupedCustom));
      window.dispatchEvent(new CustomEvent('garden_catalog_updated'));
    }

    return { beforeCount, afterCount, purgedCount };
  } catch (e) {
    console.error('Failed to purge duplicate catalog entries:', e);
    return { beforeCount: 0, afterCount: 0, purgedCount: 0 };
  }
}

/**
 * Retrieves custom plants discovered and saved by Google Vision AI in the browser,
 * automatically deduplicating them and saving the cleaned list back to localStorage.
 */
export function getCustomCatalogPlants(): PlantCareGuide[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_CATALOG);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const deduped = deduplicatePlantGuides(parsed);
    if (deduped.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY_CUSTOM_CATALOG, JSON.stringify(deduped));
    }
    return deduped;
  } catch (e) {
    console.error('Failed to load custom plants from localStorage:', e);
    return [];
  }
}

/**
 * Saves or updates a discovered plant in the local custom catalog and notifies listeners.
 * Prevents duplicates by matching scientificName, slug, id, or commonName using isSamePlant.
 */
export function saveCustomPlantToCatalog(plant: PlantCareGuide): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCustomCatalogPlants();
    const cleanScientific = plant.scientificName.trim().toLowerCase();
    const cleanCommon = plant.commonName.trim().toLowerCase();

    // Check if plant already exists in custom catalog using isSamePlant
    const index = existing.findIndex(p => isSamePlant(p, plant));
    
    let updated: PlantCareGuide[];
    if (index >= 0) {
      const prev = existing[index];
      const mergedAliases = Array.from(new Set([
        ...(prev.aliases || []),
        ...(plant.aliases || []),
        cleanCommon,
        cleanScientific
      ])).filter(Boolean);

      updated = [...existing];
      updated[index] = { 
        ...prev, 
        ...plant,
        aliases: mergedAliases
      };
    } else {
      const initialAliases = Array.from(new Set([
        ...(plant.aliases || []),
        cleanCommon,
        cleanScientific
      ])).filter(Boolean);

      updated = [{ ...plant, aliases: initialAliases }, ...existing];
    }
    
    const deduped = deduplicatePlantGuides(updated);
    localStorage.setItem(STORAGE_KEY_CUSTOM_CATALOG, JSON.stringify(deduped));
    window.dispatchEvent(new CustomEvent('garden_catalog_updated', { detail: plant }));
  } catch (e) {
    console.error('Failed to save custom plant to localStorage:', e);
  }
}

/**
 * Checks if a plant with the given query, scientific name, or common name already exists in the catalogue.
 */
export function findMatchingPlantInCatalog(queryOrScientific: string): PlantCareGuide | undefined {
  const all = getAllPlantGuides();
  const q = queryOrScientific.trim().toLowerCase();
  if (!q) return undefined;
  
  // 1. Exact match pass
  const exact = all.find(p => {
    if (p.scientificName && p.scientificName.trim().toLowerCase() === q) return true;
    if (p.commonName && p.commonName.trim().toLowerCase() === q) return true;
    if (p.slug && p.slug.trim().toLowerCase() === q) return true;
    if (p.id && p.id.trim().toLowerCase() === q) return true;
    if (p.aliases && p.aliases.some(a => a.trim().toLowerCase() === q)) return true;
    return false;
  });
  if (exact) return exact;

  // 2. Substring match pass (if query is at least 3 characters)
  if (q.length >= 3) {
    return all.find(p => {
      const commonLower = p.commonName.toLowerCase();
      const sciLower = p.scientificName.toLowerCase();
      if (commonLower.includes(q) || q.includes(commonLower)) return true;
      if (sciLower.includes(q) || q.includes(sciLower)) return true;
      if (p.aliases && p.aliases.some(a => a.toLowerCase().includes(q) || q.includes(a.toLowerCase()))) return true;
      return false;
    });
  }

  return undefined;
}

export interface PlantLocationGuide {
  plant: PlantCareGuide;
  title: string;
  foundName: string;
  category: string;
  searchTips: string[];
  explanation: string;
}

/**
 * Returns structured instructions telling the user exactly how to locate the pre-existing record in the catalogue.
 */
export function getPlantCatalogLocationGuide(plant: PlantCareGuide, queriedTerm?: string): PlantLocationGuide {
  const term = (queriedTerm || plant.commonName).trim();
  return {
    plant,
    title: `Pre-existing record found for "${plant.commonName}"`,
    foundName: `${plant.commonName} (${plant.scientificName})`,
    category: plant.category,
    searchTips: [
      `Type "${term}" or "${plant.commonName}" into the Explore All search bar`,
      `Switch to the "${plant.category}" category tab in the Greenhouse Archive`,
      `Look up by scientific name: "${plant.scientificName}"`
    ],
    explanation: `This plant is already registered in your Greenhouse encyclopedia filed under "${plant.category}". You can view its complete care guide immediately or find it using the search bar.`
  };
}

/**
 * Adds an alias / vernacular search term to an existing plant in the catalogue.
 */
export function addAliasToExistingPlant(plantIdOrScientific: string, newAlias: string): PlantCareGuide | null {
  if (typeof window === 'undefined') return null;
  const cleanAlias = newAlias.trim().toLowerCase();
  if (!cleanAlias) return null;

  try {
    const existing = getCustomCatalogPlants();
    const cleanTarget = plantIdOrScientific.trim().toLowerCase();
    const index = existing.findIndex(p => 
      p.id === plantIdOrScientific || 
      p.slug === plantIdOrScientific || 
      (p.scientificName && p.scientificName.trim().toLowerCase() === cleanTarget) ||
      (p.commonName && p.commonName.trim().toLowerCase() === cleanTarget)
    );

    if (index >= 0) {
      const plant = existing[index];
      const currentAliases = plant.aliases || [];
      if (!currentAliases.some(a => a.toLowerCase() === cleanAlias)) {
        const updatedPlant: PlantCareGuide = {
          ...plant,
          aliases: [...currentAliases, cleanAlias]
        };
        existing[index] = updatedPlant;
        localStorage.setItem(STORAGE_KEY_CUSTOM_CATALOG, JSON.stringify(existing));
        window.dispatchEvent(new CustomEvent('garden_catalog_updated', { detail: updatedPlant }));
        return updatedPlant;
      }
      return plant;
    } else {
      // If the plant is in core PLANT_CARE_GUIDES, copy it to custom catalog with the new alias
      const corePlant = PLANT_CARE_GUIDES.find(p => 
        p.id === plantIdOrScientific || 
        p.slug === plantIdOrScientific || 
        (p.scientificName && p.scientificName.trim().toLowerCase() === cleanTarget) ||
        (p.commonName && p.commonName.trim().toLowerCase() === cleanTarget)
      );
      if (corePlant) {
        const currentAliases = corePlant.aliases || [];
        const updatedPlant: PlantCareGuide = {
          ...corePlant,
          aliases: [...currentAliases, cleanAlias]
        };
        saveCustomPlantToCatalog(updatedPlant);
        return updatedPlant;
      }
    }
  } catch (e) {
    console.error('Error adding alias to plant:', e);
  }
  return null;
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
  return deduplicatePlantGuides([...custom, ...PLANT_CARE_GUIDES]);
}

export function getPlantGuideBySlug(slug: string): PlantCareGuide | undefined {
  const all = getAllPlantGuides();
  return all.find(p => p.slug === slug || p.id === slug);
}


