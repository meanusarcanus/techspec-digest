'use client';

import { PlantCareGuide } from '../data/plantCareGuides';
import { createDynamicPlantGuide, getGoogleVisionApiKey } from './plantScannerEngine';
import { saveCustomPlantToCatalog, findMatchingPlantInCatalog, addAliasToExistingPlant } from './gardenDailyEngine';

export interface BotanicalWebResult {
  commonName: string;
  scientificName: string;
  family: string;
  description: string;
  imageUrl: string;
  correctedFrom?: string;
  matchedTerm?: string;
  aliases?: string[];
  alreadyInCatalog?: boolean;
  existingPlant?: PlantCareGuide;
}

const BOTANICAL_TYPO_MAP: Record<string, string> = {
  'anturium': 'anthurium',
  'anturio': 'anthurium',
  'calatea': 'calathea',
  'monstara': 'monstera',
  'begona': 'begonia',
  'philodren': 'philodendron',
  'philodendrom': 'philodendron',
  'sanseveria': 'sansevieria',
  'spathipillum': 'spathiphyllum',
  'potos': 'pothos',
  'aglaonima': 'aglaonema',
  'dieffenbakia': 'dieffenbachia',
  'syngoneum': 'syngonium',
  'alocacia': 'alocasia',
  'colocacia': 'colocasia',
  'dracena': 'dracaena',
  'scheflera': 'schefflera',
  'peperomea': 'peperomia',
  'orchidea': 'orchid',
  'hawortia': 'haworthia',
  'bouganvillea': 'bougainvillea',
  'hibiskus': 'hibiscus',
  'ficus lirata': 'ficus lyrata'
};

import { getCurrentGardenUser, recordUserPlantContribution, GardenUser } from './gardenAuthEngine';

export function extractCommonNamesAndAliases(extract: string, title: string, rawQuery: string): { commonName: string; aliases: string[] } {
  const aliasesSet = new Set<string>();
  const cleanQuery = rawQuery.trim().toLowerCase();
  if (cleanQuery) {
    aliasesSet.add(cleanQuery);
  }
  aliasesSet.add(title.toLowerCase());

  let bestCommonName = '';

  // Match common names in text: commonly known as X, Y, or Z
  const match = extract?.match(/(?:commonly known as|common names? (?:are|include)|also called|known as|vernacularly called|local names? include)\s+([^.;\n]+)/i);
  if (match && match[1]) {
    const parts = match[1]
      .replace(/\bor\b/gi, ',')
      .replace(/\band\b/gi, ',')
      .split(',')
      .map(s => s.replace(/["'()]/g, '').trim())
      .filter(s => s.length > 1 && !s.toLowerCase().includes('species') && !s.toLowerCase().includes('family') && !s.toLowerCase().includes('genus'));

    for (const name of parts) {
      aliasesSet.add(name.toLowerCase());
      if (!bestCommonName && name.length >= 3) {
        bestCommonName = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      }
    }
  }

  const isBinomial = /^[A-Z][a-z]+\s+[a-z]+/.test(title);

  if (!bestCommonName) {
    if (!isBinomial) {
      bestCommonName = title;
    } else if (cleanQuery && cleanQuery !== title.toLowerCase()) {
      bestCommonName = cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1);
    } else {
      bestCommonName = title;
    }
  }

  // If query is an alias (e.g. "suamei") and not already in bestCommonName, combine it (e.g. "Water Jasmine (Suamei)")
  if (cleanQuery && !bestCommonName.toLowerCase().includes(cleanQuery) && cleanQuery !== title.toLowerCase()) {
    const formattedQuery = cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1);
    bestCommonName = `${bestCommonName} (${formattedQuery})`;
  }

  return {
    commonName: bestCommonName,
    aliases: Array.from(aliasesSet)
  };
}

/**
 * Searches Wikipedia and Wikimedia Commons API for authentic high-res botanical photography.
 * Features automated typo correction and Wikipedia search suggestions for misspelled plant names.
 */
export async function searchBotanicalWebImage(rawQuery: string): Promise<BotanicalWebResult | null> {
  const terms: string[] = [];
  const normalized = rawQuery.trim().toLowerCase();

  // Check known botanical typo substitutions first
  if (BOTANICAL_TYPO_MAP[normalized]) {
    terms.push(BOTANICAL_TYPO_MAP[normalized]);
  }

  // 1. Extract terms in parenthesis, e.g. "Water Jasmine (Wrightia religiosa)" -> "Wrightia religiosa"
  const parenMatches = rawQuery.match(/\(([^)]+)\)/g);
  if (parenMatches) {
    for (const m of parenMatches) {
      const clean = m.replace(/[()]/g, '').trim();
      if (clean && !terms.includes(clean)) terms.push(clean);
    }
  }

  // 2. Split on 'or', '/', ','
  const parts = rawQuery.split(/\bor\b|\/|,/i);
  for (const part of parts) {
    const clean = part.replace(/\(.*?\)/g, '').trim();
    if (clean && !terms.includes(clean)) {
      terms.push(clean);
    }
  }

  if (!terms.includes(rawQuery.trim())) {
    terms.push(rawQuery.trim());
  }

  // Specific botanical synonyms
  if (rawQuery.toLowerCase().includes('suamei') || rawQuery.toLowerCase().includes('shui mei')) {
    terms.unshift('Wrightia religiosa');
  }

  for (let i = 0; i < terms.length; i++) {
    const term = terms[i];
    try {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(term)}&format=json&origin=*`;
      const res = await fetch(searchUrl, {
        headers: { 
          'Accept': 'application/json',
          'Api-User-Agent': 'GardenPerksBotanicalApp/1.0'
        }
      });
      if (!res.ok) continue;
      const data = await res.json();
      
      // Auto-detect Wikipedia search spelling suggestions (e.g. "anturium" -> "anthurium")
      const suggestion = data?.query?.searchinfo?.suggestion;
      if (suggestion && !terms.includes(suggestion)) {
        terms.splice(i + 1, 0, suggestion);
      }

      let searchItems = data?.query?.search || [];

      // If no search items were found, try the suggestion or term + " plant"
      if (searchItems.length === 0 && suggestion) {
        const suggUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(suggestion)}&format=json&origin=*`;
        const suggRes = await fetch(suggUrl, {
          headers: { 'Accept': 'application/json', 'Api-User-Agent': 'GardenPerksBotanicalApp/1.0' }
        });
        if (suggRes.ok) {
          const suggData = await suggRes.json();
          searchItems = suggData?.query?.search || [];
        }
      }

      if (searchItems.length === 0 && !term.includes('plant')) {
        const plantUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(term + ' plant')}&format=json&origin=*`;
        const plantRes = await fetch(plantUrl, {
          headers: { 'Accept': 'application/json', 'Api-User-Agent': 'GardenPerksBotanicalApp/1.0' }
        });
        if (plantRes.ok) {
          const plantData = await plantRes.json();
          searchItems = plantData?.query?.search || [];
        }
      }

      for (const item of searchItems.slice(0, 4)) {
        const title = item.title;
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
        const sumRes = await fetch(summaryUrl, {
          headers: { 'Accept': 'application/json', 'Api-User-Agent': 'GardenPerksBotanicalApp/1.0' }
        });
        if (!sumRes.ok) continue;
        const sumData = await sumRes.json();
        const img = sumData.originalimage?.source || sumData.thumbnail?.source;

        if (img && /\.(jpg|jpeg|png|webp)/i.test(img)) {
          let family = 'Plantae';
          const familyMatch = sumData.extract?.match(/family\s+([A-Z][a-z]+aceae)/);
          if (familyMatch) {
            family = familyMatch[1];
          }

          const { commonName: resolvedCommonName, aliases } = extractCommonNamesAndAliases(sumData.extract || '', sumData.title, rawQuery);

          // Check if this plant is ALREADY in the catalogue!
          const existingPlant = findMatchingPlantInCatalog(sumData.title) || 
                                findMatchingPlantInCatalog(rawQuery) || 
                                findMatchingPlantInCatalog(resolvedCommonName);

          if (existingPlant) {
            // Automatically attach user search query as alias so future catalogue lookups match instantly
            addAliasToExistingPlant(existingPlant.id, rawQuery);
            return {
              commonName: existingPlant.commonName,
              scientificName: existingPlant.scientificName,
              family: existingPlant.family,
              description: existingPlant.overview || sumData.extract || `Specimen of ${existingPlant.commonName}.`,
              imageUrl: existingPlant.heroImage || img,
              aliases: Array.from(new Set([...(existingPlant.aliases || []), ...aliases])),
              alreadyInCatalog: true,
              existingPlant: existingPlant,
              matchedTerm: sumData.title
            };
          }

          const isTypoCorrection = term.toLowerCase() !== rawQuery.trim().toLowerCase() || !!suggestion;

          return {
            commonName: resolvedCommonName,
            scientificName: sumData.title,
            family,
            description: sumData.extract || sumData.description || `Botanical specimen of ${sumData.title}.`,
            imageUrl: img,
            correctedFrom: isTypoCorrection ? rawQuery.trim() : undefined,
            matchedTerm: sumData.title,
            aliases,
            alreadyInCatalog: false
          };
        }
      }
    } catch (e) {
      console.warn('Wikipedia search term failed:', term, e);
    }
  }

  return null;
}

/**
 * Builds a complete PlantCareGuide using Gemini AI combined with the fetched web photo.
 * If preloadedWebResult is passed, reuses it without re-querying the web.
 */
export async function createCareGuideForPlantName(
  plantName: string,
  preloadedWebResult?: BotanicalWebResult | null,
  currentUser?: GardenUser | null
): Promise<PlantCareGuide> {
  const webResult = preloadedWebResult !== undefined 
    ? preloadedWebResult 
    : await searchBotanicalWebImage(plantName);

  if (webResult?.alreadyInCatalog && webResult.existingPlant) {
    return webResult.existingPlant;
  }

  const common = webResult?.commonName || plantName.trim();
  const scientific = webResult?.scientificName || plantName.trim();
  const family = webResult?.family || 'Plantae';
  const heroImage = webResult?.imageUrl || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80';
  const aliases = webResult?.aliases || [plantName.trim().toLowerCase()];

  // Determine user attribution
  const activeUser = currentUser || getCurrentGardenUser();

  // Ask Gemini to generate tailored botanical care specifications
  const apiKey = getGoogleVisionApiKey();
  if (apiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const prompt = `You are Dr. Flora, master horticulturalist.
Generate a complete botanical care profile for the plant: "${common} (${scientific})".
Return JSON with:
{
  "category": "Indoor Houseplants" | "Ornamental & Flowering" | "Edible Gardens & Herbs" | "Succulents & Rare Tropicals",
  "difficulty": "Beginner-Friendly" | "Intermediate" | "Plant Connoisseur",
  "lightRequirement": "Low Light Tolerant" | "Bright Indirect" | "Direct Sunlight / Full Sun",
  "wateringNeed": "Dry Out Completely" | "Top 2 Inches Dry" | "Consistently Moist",
  "humidityRange": "30% - 50% (Standard)" | "50% - 70% (High)" | "70%+ (Greenhouse)",
  "petSafe": boolean,
  "shortHook": string,
  "overview": string,
  "likes": string[],
  "dislikes": string[],
  "soilRecipe": { "name": string, "ingredients": string[], "pHRange": string },
  "fertilizerProtocol": string
}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          const guide = createDynamicPlantGuide(
            common,
            scientific,
            family,
            heroImage,
            { ...parsed, aliases }
          );
          if (activeUser) {
            guide.addedBy = {
              username: activeUser.username,
              displayName: activeUser.displayName,
              avatarEmoji: activeUser.avatarEmoji,
              badge: activeUser.badge,
              addedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };
            recordUserPlantContribution();
          }
          saveCustomPlantToCatalog(guide);
          return guide;
        }
      }
    } catch (err) {
      console.warn('Gemini care guide generation fallback:', err);
    }
  }

  // Fallback if API fails or offline
  const fallbackGuide = createDynamicPlantGuide(
    common,
    scientific,
    family,
    heroImage,
    {
      overview: webResult?.description || `Specimen of ${common} (${scientific}).`,
      shortHook: `Verified botanical specimen: ${common}`,
      aliases
    }
  );
  if (activeUser) {
    fallbackGuide.addedBy = {
      username: activeUser.username,
      displayName: activeUser.displayName,
      avatarEmoji: activeUser.avatarEmoji,
      badge: activeUser.badge,
      addedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    recordUserPlantContribution();
  }
  saveCustomPlantToCatalog(fallbackGuide);
  return fallbackGuide;
}

/**
 * Convenience helper to confirm and persist a plant found on the web into the user's Greenhouse catalogue.
 */
export async function confirmAndSaveWebPlant(
  webResult: BotanicalWebResult,
  currentUser?: GardenUser | null
): Promise<PlantCareGuide> {
  return createCareGuideForPlantName(webResult.scientificName || webResult.commonName, webResult, currentUser);
}


