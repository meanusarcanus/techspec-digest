'use client';

import { PlantCareGuide } from '../data/plantCareGuides';
import { createDynamicPlantGuide, getGoogleVisionApiKey } from './plantScannerEngine';
import { saveCustomPlantToCatalog } from './gardenDailyEngine';

export interface BotanicalWebResult {
  commonName: string;
  scientificName: string;
  family: string;
  description: string;
  imageUrl: string;
}

/**
 * Searches Wikipedia and Wikimedia Commons API for authentic high-res botanical photography.
 */
export async function searchBotanicalWebImage(rawQuery: string): Promise<BotanicalWebResult | null> {
  const terms: string[] = [];

  // 1. Extract terms in parenthesis, e.g. "Water Jasmine (Wrightia religiosa)" -> "Wrightia religiosa"
  const parenMatches = rawQuery.match(/\(([^)]+)\)/g);
  if (parenMatches) {
    for (const m of parenMatches) {
      const clean = m.replace(/[()]/g, '').trim();
      if (clean) terms.push(clean);
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

  for (const term of terms) {
    try {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(term)}&format=json&origin=*`;
      const res = await fetch(searchUrl, {
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) continue;
      const data = await res.json();
      const searchItems = data?.query?.search || [];

      for (const item of searchItems.slice(0, 3)) {
        const title = item.title;
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
        const sumRes = await fetch(summaryUrl, {
          headers: { 'Accept': 'application/json' }
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

          return {
            commonName: rawQuery.replace(/\(.*?\)/g, '').trim() || sumData.title,
            scientificName: sumData.title,
            family,
            description: sumData.extract || sumData.description || `Botanical specimen of ${sumData.title}.`,
            imageUrl: img
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
 */
export async function createCareGuideForPlantName(plantName: string): Promise<PlantCareGuide> {
  const webResult = await searchBotanicalWebImage(plantName);
  const common = webResult?.commonName || plantName.trim();
  const scientific = webResult?.scientificName || plantName.trim();
  const family = webResult?.family || 'Plantae';
  const heroImage = webResult?.imageUrl || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80';

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
            parsed
          );
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
      shortHook: `Verified botanical specimen: ${common}`
    }
  );
  saveCustomPlantToCatalog(fallbackGuide);
  return fallbackGuide;
}
