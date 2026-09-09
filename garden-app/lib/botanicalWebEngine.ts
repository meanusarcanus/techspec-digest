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
  isPlant?: boolean;
  nonPlantExplanation?: string;
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
  'bouganvilla': 'bougainvillea',
  'buganvilla': 'bougainvillea',
  'bunggangvilla': 'bougainvillea',
  'bungavilla': 'bougainvillea',
  'bungavilya': 'bougainvillea',
  'yukan plant': 'yucca',
  'yukan': 'yucca',
  'yuka': 'yucca',
  'yuca': 'yucca',
  'yukon plant': 'yucca',
  'yucca plant': 'yucca',
  'hibiskus': 'hibiscus',
  'ficus lirata': 'ficus lyrata'
};

import { getCurrentGardenUser, recordUserPlantContribution, GardenUser } from './gardenAuthEngine';

/**
 * Evaluates whether a Wikipedia article represents a living botanical plant organism.
 * Rigorously rejects archaeological sites, industrial power/manufacturing plants, places, products, media, and people.
 */
export function isBotanicalWikipediaArticle(title: string, description?: string, extract?: string): boolean {
  const combined = `${title} ${description || ''}`.toLowerCase();

  // Strict disqualifiers: non-botanical entities that might contain the word "plant" or match user queries
  const nonPlantDisqualifiers = [
    /\b(?:nuclear|power|chemical|industrial|manufacturing|assembly|processing|treatment|filtration|desalination|cement|sewage|water treatment|cogeneration)\s+plant\b/i,
    /\b(?:archaeological|historic district|historic site|open pit|mine|quarry|monument|ruins|petroglyph|mound)\b/i,
    /\b(?:album|song|single by|soundtrack|film|movie|tv series|television series|video game|novel|comic)\b/i,
    /\b(?:politician|actor|actress|footballer|athlete|businessman|musician|singer|author|director|born in)\b/i,
    /\b(?:automobile|car model|aircraft|ship|vessel|locomotive|weapon|firearm|artillery)\b/i,
    /\b(?:township|municipality|village|county|neighborhood|district of|census-designated place|capital of)\b/i,
    /\b(?:corporation|company ltd|inc\.|subsidiary|holding company|brand of)\b/i
  ];

  for (const dq of nonPlantDisqualifiers) {
    if (dq.test(combined) || dq.test(extract || '')) {
      return false;
    }
  }

  // Positive botanical classification indicators
  const botanicalIndicators = [
    /\b[A-Z][a-z]+aceae\b/, // Botanical family ending in -aceae (e.g. Asparagaceae, Nyctaginaceae, Araceae, Orchidaceae)
    /\b(?:species|genus|subfamily|tribe)\s+of\s+(?:flowering |carnivorous |perennial |woody |succulent |climbing |evergreen |deciduous )?(?:plants?|trees?|shrubs?|vines?|herbs?|grasses?|ferns?|mosses?|orchids?|succulents?|cacti|palms?)\b/i,
    /\b(?:flowering plant|perennial plant|houseplant|ornamental plant|cultivated plant|deciduous tree|evergreen shrub|botanical species)\b/i,
    /\b(?:plant in the family|native to\s+.*(?:forest|tropical|subtropical|woodland|rainforest|grassland|savanna|flora))\b/i,
    /\b(?:angiosperm|gymnosperm|monocot|dicot|bryophyte|pteridophyte|vascular plant)\b/i,
    /\b(?:phytoplankton|algae|moss|conifer|cycad|ginkgo)\b/i
  ];

  for (const bi of botanicalIndicators) {
    if (bi.test(`${description || ''} ${extract || ''}`)) {
      return true;
    }
  }

  return false;
}

export interface BotanicalAIResolution {
  isPlant: boolean;
  commonName?: string;
  scientificName?: string;
  reasonIfNotPlant?: string;
}

/**
 * Uses Google Gemini AI to verify if a search term refers to a real botanical plant/flower/tree/succulent,
 * and resolves any misspellings, phonetic approximations, or colloquialisms (e.g. "yukan plant" -> Yucca, "bunggangvilla" -> Bougainvillea).
 * If the query refers to something that is NOT a botanical plant (e.g. "computer mouse", "quarry", "nuclear plant"), returns isPlant: false.
 */
export async function resolvePlantTypoWithGoogleAI(rawQuery: string): Promise<BotanicalAIResolution | null> {
  const apiKey = getGoogleVisionApiKey();
  if (!apiKey || !rawQuery.trim()) return null;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;
    const prompt = `You are Dr. Flora's botanical verification and spellcheck engine.
The user entered a search query: "${rawQuery.trim()}".

Determine if this query refers to a botanical plant, flower, tree, succulent, fern, or herb (or a common misspelling/phonetic typo of one, e.g. "yukan plant" -> Yucca, "anturium" -> Anthurium, "bunggangvilla" -> Bougainvillea).

CRITICAL RULES:
- Manufactured items, electronic devices, animals, places, historical/archaeological sites, industrial/power/nuclear/manufacturing/chemical plants, movies, or people are NOT botanical plants.
- If it is NOT a botanical plant, return "isPlant": false with a clear explanation in "reasonIfNotPlant".
- If it IS a botanical plant (or typo of one), return "isPlant": true with the correct standard "commonName" and "scientificName".

Return ONLY a JSON object:
{
  "isPlant": boolean,
  "commonName": string,
  "scientificName": string,
  "reasonIfNotPlant": string
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
        return {
          isPlant: parsed.isPlant !== false,
          commonName: parsed.commonName || '',
          scientificName: parsed.scientificName || '',
          reasonIfNotPlant: parsed.reasonIfNotPlant || ''
        };
      }
    }
  } catch (err) {
    console.warn('Google AI botanical typo resolver failed:', err);
  }
  return null;
}

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

  // 0. Immediate Catalogue Check: if user is searching for something already in their collection
  const immediateMatch = findMatchingPlantInCatalog(rawQuery);
  if (immediateMatch) {
    addAliasToExistingPlant(immediateMatch.id, rawQuery);
    return {
      commonName: immediateMatch.commonName,
      scientificName: immediateMatch.scientificName,
      family: immediateMatch.family,
      description: immediateMatch.overview || `Botanical specimen of ${immediateMatch.commonName}.`,
      imageUrl: immediateMatch.heroImage,
      aliases: immediateMatch.aliases || [],
      alreadyInCatalog: true,
      existingPlant: immediateMatch,
      matchedTerm: immediateMatch.commonName
    };
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
          // RIGOROUS BOTANICAL FILTER: Must be verified as a living botanical plant organism!
          if (!isBotanicalWikipediaArticle(sumData.title, sumData.description, sumData.extract)) {
            continue;
          }

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
              matchedTerm: sumData.title,
              isPlant: true
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
            alreadyInCatalog: false,
            isPlant: true
          };
        }
      }
    } catch (e) {
      console.warn('Wikipedia search term failed:', term, e);
    }
  }

  // If standard Wikipedia keyword search yields no results (e.g. phonetic typos like "bunggangvilla", "yukan plant"),
  // leverage Google Gemini AI to resolve phonetic spelling/slang to real botanical species or verify if non-plant.
  const aiResolved = await resolvePlantTypoWithGoogleAI(rawQuery);
  if (aiResolved) {
    // If the query was evaluated as NOT a botanical plant (e.g. quarry, nuclear plant, computer mouse)
    if (!aiResolved.isPlant) {
      return {
        commonName: rawQuery.trim(),
        scientificName: 'Non-Botanical Entity',
        family: 'Not a Plant',
        description: aiResolved.reasonIfNotPlant || `"${rawQuery.trim()}" was determined to be a non-botanical entity.`,
        imageUrl: '',
        isPlant: false,
        nonPlantExplanation: aiResolved.reasonIfNotPlant || `"${rawQuery.trim()}" is not a botanical plant organism. The Greenhouse encyclopedia only catalogues living botanical flora.`,
        alreadyInCatalog: false
      };
    }

    if (aiResolved.scientificName || aiResolved.commonName) {
      const candidates: string[] = [aiResolved.scientificName, aiResolved.commonName].filter((c): c is string => typeof c === 'string' && c.trim().length > 0);

      // 1. Check if AI-resolved plant is already in the user's Greenhouse catalogue
      for (const cand of candidates) {
        const existingPlant = findMatchingPlantInCatalog(cand);
        if (existingPlant) {
          addAliasToExistingPlant(existingPlant.id, rawQuery);
          return {
            commonName: existingPlant.commonName,
            scientificName: existingPlant.scientificName,
            family: existingPlant.family,
            description: existingPlant.overview || `Specimen of ${existingPlant.commonName}.`,
            imageUrl: existingPlant.heroImage,
            aliases: Array.from(new Set([...(existingPlant.aliases || []), rawQuery.trim().toLowerCase()])),
            alreadyInCatalog: true,
            existingPlant,
            matchedTerm: existingPlant.commonName,
            correctedFrom: rawQuery.trim(),
            isPlant: true
          };
        }
      }

      // 2. Fetch authentic Wikipedia summary & photography for AI-resolved botanical candidates
      for (const cand of candidates) {
        try {
          const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cand)}`;
          const sumRes = await fetch(summaryUrl, {
            headers: { 'Accept': 'application/json', 'Api-User-Agent': 'GardenPerksBotanicalApp/1.0' }
          });
          if (!sumRes.ok) continue;
          const sumData = await sumRes.json();
          const img = sumData.originalimage?.source || sumData.thumbnail?.source;

          if (img && /\.(jpg|jpeg|png|webp)/i.test(img)) {
            // Verify botanical validity
            if (!isBotanicalWikipediaArticle(sumData.title, sumData.description, sumData.extract)) {
              continue;
            }

            let family = 'Plantae';
            const familyMatch = sumData.extract?.match(/family\s+([A-Z][a-z]+aceae)/);
            if (familyMatch) {
              family = familyMatch[1];
            }

            const { commonName: resolvedCommonName, aliases } = extractCommonNamesAndAliases(sumData.extract || '', sumData.title, rawQuery);
            aliases.push(rawQuery.trim().toLowerCase());

            return {
              commonName: resolvedCommonName || aiResolved.commonName || sumData.title,
              scientificName: sumData.title || aiResolved.scientificName,
              family,
              description: sumData.extract || sumData.description || `Botanical specimen of ${sumData.title}.`,
              imageUrl: img,
              correctedFrom: rawQuery.trim(),
              matchedTerm: sumData.title,
              aliases: Array.from(new Set(aliases)),
              alreadyInCatalog: false,
              isPlant: true
            };
          }
        } catch (e) {
          console.warn('Wikipedia summary for AI-resolved plant failed:', cand, e);
        }
      }

      // 3. Fallback search on Wikipedia for AI candidate
      for (const cand of candidates) {
        try {
          const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cand)}&format=json&origin=*`;
          const res = await fetch(searchUrl, {
            headers: { 'Accept': 'application/json', 'Api-User-Agent': 'GardenPerksBotanicalApp/1.0' }
          });
          if (!res.ok) continue;
          const data = await res.json();
          const searchItems = data?.query?.search || [];
          for (const item of searchItems.slice(0, 3)) {
            const sumRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(item.title)}`, {
              headers: { 'Accept': 'application/json', 'Api-User-Agent': 'GardenPerksBotanicalApp/1.0' }
            });
            if (!sumRes.ok) continue;
            const sumData = await sumRes.json();
            const img = sumData.originalimage?.source || sumData.thumbnail?.source;
            if (img && /\.(jpg|jpeg|png|webp)/i.test(img)) {
              if (!isBotanicalWikipediaArticle(sumData.title, sumData.description, sumData.extract)) {
                continue;
              }

              let family = 'Plantae';
              const familyMatch = sumData.extract?.match(/family\s+([A-Z][a-z]+aceae)/);
              if (familyMatch) family = familyMatch[1];

              const { commonName: resolvedCommonName, aliases } = extractCommonNamesAndAliases(sumData.extract || '', sumData.title, rawQuery);
              aliases.push(rawQuery.trim().toLowerCase());

              return {
                commonName: resolvedCommonName || item.title,
                scientificName: sumData.title,
                family,
                description: sumData.extract || sumData.description || `Botanical specimen of ${sumData.title}.`,
                imageUrl: img,
                correctedFrom: rawQuery.trim(),
                matchedTerm: sumData.title,
                aliases: Array.from(new Set(aliases)),
                alreadyInCatalog: false,
                isPlant: true
              };
            }
          }
        } catch (e) {
          console.warn('Wikipedia search for AI-resolved candidate failed:', cand, e);
        }
      }
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
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;
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
            const updatedUser = recordUserPlantContribution() || activeUser;
            guide.addedBy = {
              username: updatedUser.username,
              displayName: updatedUser.displayName,
              avatarEmoji: updatedUser.avatarEmoji,
              badge: updatedUser.badge,
              addedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };
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
    const updatedUser = recordUserPlantContribution() || activeUser;
    fallbackGuide.addedBy = {
      username: updatedUser.username,
      displayName: updatedUser.displayName,
      avatarEmoji: updatedUser.avatarEmoji,
      badge: updatedUser.badge,
      addedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
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
  if (webResult.isPlant === false) {
    throw new Error(`Cannot add non-botanical entity "${webResult.commonName}" to the Greenhouse catalogue.`);
  }
  return createCareGuideForPlantName(webResult.scientificName || webResult.commonName, webResult, currentUser);
}


