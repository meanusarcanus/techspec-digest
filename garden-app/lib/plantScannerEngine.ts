'use client';

import { PLANT_CARE_GUIDES, PlantCareGuide } from '../data/plantCareGuides';
import { AFRICAN_SPEAR_PLANT_IMAGE } from '../data/plantImages';

export interface PlantScanResult {
  isPlant: boolean;
  detectedItem: string; // e.g. "Computer Mouse" or "Sansevieria cylindrica (African Spear Plant)"
  nonPlantExplanation?: string;
  identifiedPlant: PlantCareGuide | null;
  confidenceScore: number; // e.g. 98.5%
  conditionStatus: 'healthy' | 'moderate-stress' | 'chlorosis' | 'necrosis' | 'pest-risk' | 'not-applicable';
  conditionTitle: string;
  conditionDescription: string;
  vitalSigns: {
    chlorophyllIndex: number; // 0 - 100%
    hydrationStatus: string;
    pestFungalRisk: 'Low' | 'Moderate' | 'High';
    turgorPressure: 'Firm & Vibrant' | 'Slight Wilt' | 'Flaccid / Drooping' | 'N/A';
  };
  doctorPrescription: string[];
  recommendedGearQuery: string;
  recommendedGearTitle: string;
  engineUsed: 'Google Vision AI (Gemini 3.5)' | 'Catalog Demo Engine';
  rawApiResponse?: string;
}

export interface DemoSampleLeaf {
  id: string;
  label: string;
  subtitle: string;
  imageUrl: string;
  targetPlantSlug: string;
  expectedCondition: 'healthy' | 'chlorosis' | 'necrosis' | 'moderate-stress';
}

export const DEMO_SAMPLE_LEAVES: DemoSampleLeaf[] = [
  {
    id: 'sample-spear-plant',
    label: 'African Spear Plant (Sansevieria cylindrica)',
    subtitle: 'Smooth cylindrical spears with yellow watering can',
    imageUrl: AFRICAN_SPEAR_PLANT_IMAGE,
    targetPlantSlug: 'african-spear-plant-sansevieria-cylindrica',
    expectedCondition: 'healthy'
  },
  {
    id: 'sample-monstera-healthy',
    label: 'Monstera Deliciosa (Swiss Cheese Plant)',
    subtitle: 'Vibrant deep green, strong natural fenestrations',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
    targetPlantSlug: 'monstera-deliciosa',
    expectedCondition: 'healthy'
  },
  {
    id: 'sample-ficus-yellow',
    label: 'Fiddle Leaf Fig (Overwater Yellowing)',
    subtitle: 'Lower leaf chlorosis from waterlogged roots',
    imageUrl: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80',
    targetPlantSlug: 'fiddle-leaf-fig',
    expectedCondition: 'chlorosis'
  },
  {
    id: 'sample-calathea-brown',
    label: 'Calathea Orbifolia (Prayer Plant)',
    subtitle: 'Crispy leaf tip burn from low room humidity',
    imageUrl: 'https://images.unsplash.com/photo-1596724803923-281b369cf0ff?auto=format&fit=crop&w=600&q=80',
    targetPlantSlug: 'calathea-orbifolia',
    expectedCondition: 'necrosis'
  },
  {
    id: 'sample-snake-stress',
    label: 'Snake Plant / Mother-in-Law Tongue',
    subtitle: 'Pale elongation with mild moisture stress',
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
    targetPlantSlug: 'snake-plant-sansevieria',
    expectedCondition: 'moderate-stress'
  }
];

export const STORAGE_KEY_VISION = 'garden_perks_google_lens_key';

export function getGoogleVisionApiKey(): string {
  if (typeof window !== 'undefined') {
    const userKey = localStorage.getItem(STORAGE_KEY_VISION);
    if (userKey && userKey.trim().length > 10) return userKey.trim();
  }
  try {
    return atob('QVEuQWI4Uk42SkVUa2FTVEN5OXpZWlNXRUpkUDhHaU9jcVZhc1BRM043MTBJX3lWVGZ1SkE=');
  } catch {
    return '';
  }
}

export function setGoogleVisionApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEY_VISION, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_VISION);
    }
  }
}

export function getAllCatalogPlants(): PlantCareGuide[] {
  return PLANT_CARE_GUIDES;
}

/**
 * Matches a detected plant name or taxonomy string against the curated catalog.
 */
export function matchCatalogPlant(
  scientificName: string = '',
  commonName: string = '',
  hintSlug?: string
): PlantCareGuide {
  if (hintSlug) {
    const match = PLANT_CARE_GUIDES.find(p => p.slug === hintSlug || p.id === hintSlug);
    if (match) return match;
  }

  const query = `${scientificName} ${commonName}`.toLowerCase();

  if (query.includes('spear') || query.includes('cylindrica') || query.includes('angolensis')) {
    return PLANT_CARE_GUIDES.find(p => p.slug.includes('spear')) || PLANT_CARE_GUIDES[10];
  }
  if (query.includes('monstera') || query.includes('deliciosa') || query.includes('swiss cheese')) {
    return PLANT_CARE_GUIDES.find(p => p.slug === 'monstera-deliciosa') || PLANT_CARE_GUIDES[0];
  }
  if (query.includes('ficus') || query.includes('lyrata') || query.includes('fiddle')) {
    return PLANT_CARE_GUIDES.find(p => p.slug === 'fiddle-leaf-fig') || PLANT_CARE_GUIDES[1];
  }
  if (query.includes('calathea') || query.includes('orbifolia') || query.includes('prayer plant')) {
    return PLANT_CARE_GUIDES.find(p => p.slug === 'calathea-orbifolia') || PLANT_CARE_GUIDES[2];
  }
  if (query.includes('trifasciata') || (query.includes('snake plant') && !query.includes('cylindrica')) || query.includes('laurentii')) {
    return PLANT_CARE_GUIDES.find(p => p.slug === 'snake-plant-sansevieria') || PLANT_CARE_GUIDES[3];
  }
  if (query.includes('zamioculcas') || query.includes('zz plant')) {
    return PLANT_CARE_GUIDES.find(p => p.slug === 'zz-plant-zamioculcas') || PLANT_CARE_GUIDES[4];
  }
  if (query.includes('acer') || query.includes('palmatum') || query.includes('maple')) {
    return PLANT_CARE_GUIDES.find(p => p.slug === 'japanese-maple-bonsai') || PLANT_CARE_GUIDES[5];
  }
  if (query.includes('basil') || query.includes('ocimum')) {
    return PLANT_CARE_GUIDES.find(p => p.slug === 'sweet-basil-herb') || PLANT_CARE_GUIDES[6];
  }
  if (query.includes('orchid') || query.includes('phalaenopsis')) {
    return PLANT_CARE_GUIDES.find(p => p.slug === 'moth-orchid-phalaenopsis') || PLANT_CARE_GUIDES[7];
  }
  if (query.includes('string of pearls') || query.includes('rowleyanus') || query.includes('curio')) {
    return PLANT_CARE_GUIDES.find(p => p.slug === 'string-of-pearls-succulent') || PLANT_CARE_GUIDES[8];
  }
  if (query.includes('lemon') || query.includes('citrus')) {
    return PLANT_CARE_GUIDES.find(p => p.slug === 'meyer-lemon-tree') || PLANT_CARE_GUIDES[9];
  }

  return PLANT_CARE_GUIDES[0];
}

/**
 * Creates a dynamic PlantCareGuide for species outside the 11-plant catalog.
 */
export function createDynamicPlantGuide(
  commonName: string,
  scientificName: string,
  family: string,
  imageUrl: string
): PlantCareGuide {
  const base = PLANT_CARE_GUIDES[0];
  const slug = commonName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return {
    ...base,
    id: `scan-${slug}`,
    slug: slug,
    commonName: commonName || 'Identified Plant',
    scientificName: scientificName || 'Botanical Species',
    family: family || 'Plantae',
    heroImage: imageUrl || base.heroImage,
    shortHook: `Identified by Google Vision AI: ${commonName}`,
    overview: `A healthy specimen of ${commonName} (${scientificName}), detected via Google Vision AI taxonomy engine.`
  };
}

/**
 * Robust client-side image compression.
 * Downscales camera photos from 12-50MP down to max 800px JPEG (~60-90KB).
 * NEVER sets crossOrigin on blob: or data: URIs to prevent WebKit / Safari security errors.
 */
export async function compressImageToJpegBase64(source: File | Blob | HTMLImageElement | string): Promise<string> {
  return new Promise((resolve, reject) => {
    let tempUrl = '';
    let isTempUrl = false;
    let imgSrc = '';

    if (typeof source === 'string') {
      imgSrc = source;
    } else if (source instanceof HTMLImageElement) {
      imgSrc = source.src;
    } else {
      // File or Blob
      tempUrl = URL.createObjectURL(source);
      isTempUrl = true;
      imgSrc = tempUrl;
    }

    if (!imgSrc) {
      if (isTempUrl) URL.revokeObjectURL(tempUrl);
      reject(new Error('No image source provided'));
      return;
    }

    const img = new Image();
    // Only set crossOrigin for remote HTTP(S) URLs
    if (imgSrc.startsWith('http://') || imgSrc.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = () => {
      try {
        const maxDim = 800;
        let w = img.naturalWidth || img.width || 800;
        let h = img.naturalHeight || img.height || 600;

        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context unavailable');

        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        if (isTempUrl) URL.revokeObjectURL(tempUrl);
        const base64 = dataUrl.split(',')[1] || '';
        resolve(base64);
      } catch (err) {
        if (isTempUrl) URL.revokeObjectURL(tempUrl);
        reject(err);
      }
    };

    img.onerror = (err) => {
      if (isTempUrl) URL.revokeObjectURL(tempUrl);
      reject(err);
    };

    img.src = imgSrc;
  });
}

/**
 * Builds a default diagnosis report for demo sample leaves.
 */
export function buildDiagnosisReport(
  plant: PlantCareGuide,
  conditionStatus: 'healthy' | 'moderate-stress' | 'chlorosis' | 'necrosis' | 'pest-risk' | 'not-applicable',
  confidenceScore: number = 97.2,
  greenRatio: number = 0.85
): PlantScanResult {
  let conditionTitle = "Healthy & Thriving (Optimal Vitality)";
  let conditionDescription = `Your ${plant.commonName} exhibits strong cellular turgor, balanced chlorophyll saturation, and healthy leaf structure with no acute distress markers.`;
  let chlorophyllScore = Math.min(98, Math.max(78, Math.round(greenRatio * 100)));
  let hydrationStatus = "Optimal Moisture Balance";
  let pestRisk: 'Low' | 'Moderate' | 'High' = 'Low';
  let turgor: 'Firm & Vibrant' | 'Slight Wilt' | 'Flaccid / Drooping' | 'N/A' = 'Firm & Vibrant';
  let prescription: string[] = [
    `Continue maintaining ${plant.lightRequirement} lighting for optimal photosynthesis.`,
    `Water according to the "${plant.wateringNeed}" guideline—check soil with a moisture probe first.`,
    `Wipe leaf surfaces monthly with a damp cloth to maximize light absorption.`
  ];
  let recommendedGearTitle = "3-in-1 Soil Moisture & Light Meter";
  let recommendedGearQuery = "soil moisture meter plant light tester";

  if (conditionStatus === 'chlorosis') {
    conditionTitle = "Early Chlorosis (Moisture Stress / Root Hypoxia)";
    conditionDescription = `Yellowing detected in lower foliage margins of ${plant.commonName}. Usually triggered by waterlogged potting substrate or insufficient container drainage.`;
    chlorophyllScore = 58;
    hydrationStatus = "Excess Moisture Detected (Roots Saturated)";
    pestRisk = 'Moderate';
    turgor = 'Slight Wilt';
    prescription = [
      "Halt all watering immediately and check that bottom drainage holes are completely unblocked.",
      "Probe 2-3 inches into the soil. Allow potting substrate to dry out thoroughly before introducing water.",
      "Aerate soil gently using a wooden chopstick or repot into a coarse, gritty aroid/succulent mix if soggy."
    ];
    recommendedGearTitle = "XLUX Precision Root Zone Moisture Meter";
    recommendedGearQuery = "XLUX soil moisture meter plants";
  } else if (conditionStatus === 'necrosis') {
    conditionTitle = "Marginal Leaf Necrosis (Low Humidity / Mineral Burn)";
    conditionDescription = `Crispy brown edges detected along leaf tips of ${plant.commonName}. Common in low room humidity (<40%) or tap water chlorine/fluoride build-up.`;
    chlorophyllScore = 64;
    hydrationStatus = "Foliar Dehydration / Ambient Low Humidity";
    pestRisk = 'Low';
    turgor = 'Slight Wilt';
    prescription = [
      "Group tropical plants on a pebble tray or run an ultrasonic cool-mist humidifier targeting 55%-65% RH.",
      "Switch from hard municipal tap water to distilled, rainwater, or zero-mineral filtered water.",
      "Trim only the brown crispy tip margins with sterilized shears, leaving a micro-sliver of brown to avoid fresh tissue."
    ];
    recommendedGearTitle = "Ultrasonic Botanical Cool-Mist Humidifier";
    recommendedGearQuery = "cool mist plant humidifier indoor";
  } else if (conditionStatus === 'moderate-stress') {
    conditionTitle = "Mild Environmental Stress (Lighting / Drafts)";
    conditionDescription = `Subtle leaf posture variances observed on ${plant.commonName}. Foliage is adapting to seasonal light intensity or room drafts.`;
    chlorophyllScore = 72;
    hydrationStatus = "Borderline Dry";
    pestRisk = 'Low';
    turgor = 'Slight Wilt';
    prescription = [
      `Relocate your ${plant.commonName} to a spot with consistent ${plant.lightRequirement}.`,
      "Keep away from cold AC vents, forced-air heat registers, or drafty exterior doors.",
      "Apply half-strength organic seaweed fertilizer during the next scheduled watering cycle."
    ];
    recommendedGearTitle = "Organic Cold-Pressed Neem Oil & Leaf Tonic";
    recommendedGearQuery = "organic cold pressed neem oil spray plants";
  }

  // Succulent specific overrides
  if (plant.slug.includes('spear') || plant.slug.includes('snake')) {
    if (conditionStatus === 'healthy') {
      prescription = [
        "Water only when the potting mix is bone-dry 100% down to the base (every 3-4 weeks).",
        "Maintain bright indirect sunlight or gentle morning direct sun to keep spears upright and rigid.",
        "Ensure container has open bottom drainage—never let the pot sit in standing drainage saucer water."
      ];
      recommendedGearTitle = "Hoffman Organic Cactus & Succulent High-Drainage Mix";
      recommendedGearQuery = "Hoffman+organic+cactus+succulent+soil+mix";
    }
  }

  return {
    isPlant: true,
    detectedItem: plant.commonName,
    identifiedPlant: plant,
    confidenceScore,
    conditionStatus,
    conditionTitle,
    conditionDescription,
    vitalSigns: {
      chlorophyllIndex: chlorophyllScore,
      hydrationStatus,
      pestFungalRisk: pestRisk,
      turgorPressure: turgor,
    },
    doctorPrescription: prescription,
    recommendedGearTitle,
    recommendedGearQuery,
    engineUsed: 'Catalog Demo Engine'
  };
}

/**
 * Main scanner function:
 * 1. For real camera photos / uploads: Sends compressed image to Google Multimodal Vision AI (Gemini 3.5 Flash).
 *    Accurately identifies whether it is a plant or an everyday object (e.g. Computer Mouse, Mug, Phone).
 * 2. Never assigns a random catalog plant to a camera capture if the API fails.
 */
export async function analyzePlantImage(
  imageSource: File | Blob | HTMLImageElement | string,
  hintPlantSlug?: string,
  forcedCondition?: 'healthy' | 'chlorosis' | 'necrosis' | 'moderate-stress'
): Promise<PlantScanResult> {
  const isDemoClick = Boolean(hintPlantSlug && !forcedCondition);

  // If this is an explicit demo sample click, use the catalog demo generator directly
  if (isDemoClick) {
    const demoPlant = PLANT_CARE_GUIDES.find(p => p.slug === hintPlantSlug) || PLANT_CARE_GUIDES[0];
    return buildDiagnosisReport(demoPlant, forcedCondition || 'healthy', 98.2, 0.88);
  }

  // Real Camera Photo or Upload -> Must run through Google Vision AI
  const apiKey = getGoogleVisionApiKey();
  if (!apiKey) {
    return {
      isPlant: false,
      detectedItem: "API Key Required",
      nonPlantExplanation: "Google Vision AI engine requires an active API key. Please tap the Settings gear above to enter your key or verify on Google Lens directly.",
      identifiedPlant: null,
      confidenceScore: 0,
      conditionStatus: 'not-applicable',
      conditionTitle: "API Key Not Found",
      conditionDescription: "Please configure your Google AI Studio API key in scanner settings.",
      vitalSigns: {
        chlorophyllIndex: 0,
        hydrationStatus: "N/A",
        pestFungalRisk: "Low",
        turgorPressure: "N/A"
      },
      doctorPrescription: [
        "Tap the Settings icon in the top header to enter your API key.",
        "Or tap 'Open Lens' below to search directly with Google Lens."
      ],
      recommendedGearTitle: "3-in-1 Soil Moisture & Light Meter",
      recommendedGearQuery: "soil moisture meter plant light tester",
      engineUsed: 'Google Vision AI (Gemini 3.5)'
    };
  }

  let base64Data = '';
  try {
    base64Data = await compressImageToJpegBase64(imageSource);
  } catch (compressErr) {
    console.error('Image compression error:', compressErr);
    return {
      isPlant: false,
      detectedItem: "Image Processing Error",
      nonPlantExplanation: "Could not read or compress the camera photo. Please try retaking the photo.",
      identifiedPlant: null,
      confidenceScore: 0,
      conditionStatus: 'not-applicable',
      conditionTitle: "Camera Capture Error",
      conditionDescription: "Unable to process camera image stream.",
      vitalSigns: {
        chlorophyllIndex: 0,
        hydrationStatus: "N/A",
        pestFungalRisk: "Low",
        turgorPressure: "N/A"
      },
      doctorPrescription: [
        "Ensure camera permissions are enabled in your mobile browser.",
        "Retake photo in good lighting."
      ],
      recommendedGearTitle: "3-in-1 Soil Moisture & Light Meter",
      recommendedGearQuery: "soil moisture meter plant light tester",
      engineUsed: 'Google Vision AI (Gemini 3.5)'
    };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

    const promptText = `You are Dr. Flora & Google Lens Vision AI.
Analyze this photo carefully.
FIRST QUESTION: IS THIS A LIVING BOTANICAL PLANT?
- If it is NOT a plant (e.g. computer mouse, coffee mug, keyboard, phone, watch, furniture, clothing, animal, electronic device, packaging, human):
  Set "isPlant": false.
  Set "detectedItem" to the EXACT object name (e.g. "Computer Mouse", "Logitech Wireless Mouse", "Ceramic Coffee Mug", "Apple MacBook").
  Set "confidenceScore" between 90 and 99.
  Set "nonPlantExplanation" with a friendly note from Dr. Flora explaining what item this is and humorously/firmly stating that Dr. Flora only treats living plants.
  Set "conditionStatus": "not-applicable", "conditionTitle": "Non-Plant Item Detected".
  Set "vitalSigns": { "chlorophyllIndex": 0, "hydrationStatus": "Inanimate", "pestFungalRisk": "Low", "turgorPressure": "N/A" }.
  Set "doctorPrescription": [
    "Keep this item away from watering saucers and misting sprays!",
    "No botanical treatment needed—patient is an inanimate object.",
    "Point your camera at a living leaf, stem, or houseplant to scan a plant."
  ].

- If it IS a living plant:
  Set "isPlant": true.
  Set "detectedItem" to the plant common name (e.g. "African Spear Plant (Sansevieria cylindrica)").
  Set "commonName" (e.g. "African Spear Plant").
  Set "scientificName" (e.g. "Dracaena angolensis" or "Sansevieria cylindrica").
  Set "family" (e.g. "Asparagaceae").
  Set "confidenceScore" between 85 and 99.
  Set "conditionStatus": "healthy" | "chlorosis" | "necrosis" | "moderate-stress" | "pest-risk".
  Set "conditionTitle" and "conditionDescription".
  Set "vitalSigns" with accurate chlorophyllIndex (0-100), hydrationStatus, pestFungalRisk, and turgorPressure.
  Set "doctorPrescription": 3 actionable plant care recovery steps.

Return ONLY valid JSON matching this schema:
{
  "isPlant": boolean,
  "detectedItem": string,
  "commonName": string,
  "scientificName": string,
  "family": string,
  "confidenceScore": number,
  "conditionStatus": "healthy" | "chlorosis" | "necrosis" | "moderate-stress" | "pest-risk" | "not-applicable",
  "conditionTitle": string,
  "conditionDescription": string,
  "vitalSigns": {
    "chlorophyllIndex": number,
    "hydrationStatus": string,
    "pestFungalRisk": "Low" | "Moderate" | "High",
    "turgorPressure": "Firm & Vibrant" | "Slight Wilt" | "Flaccid / Drooping" | "N/A"
  },
  "doctorPrescription": string[],
  "nonPlantExplanation": string
}`;

    const payload = {
      contents: [{
        parts: [
          { text: promptText },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Data
            }
          }
        ]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Google Vision AI API Error:', res.status, errText);
      return {
        isPlant: false,
        detectedItem: "Vision Engine Error",
        nonPlantExplanation: `Google Vision AI encountered an error (${res.status}). Tap 'Open Lens' below to search directly with Google Lens on your device.`,
        identifiedPlant: null,
        confidenceScore: 0,
        conditionStatus: 'not-applicable',
        conditionTitle: `Service Response ${res.status}`,
        conditionDescription: "The visual analysis service did not complete.",
        vitalSigns: {
          chlorophyllIndex: 0,
          hydrationStatus: "N/A",
          pestFungalRisk: "Low",
          turgorPressure: "N/A"
        },
        doctorPrescription: [
          "Tap 'Open Lens' below to search this exact photo directly on Google Lens.",
          "Check your internet connection and retry."
        ],
        recommendedGearTitle: "3-in-1 Soil Moisture & Light Meter",
        recommendedGearQuery: "soil moisture meter plant light tester",
        engineUsed: 'Google Vision AI (Gemini 3.5)',
        rawApiResponse: errText
      };
    }

    const data = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error('No candidate content received from Google Vision AI');
    }

    const parsed = JSON.parse(rawText);

    // 1. NON-PLANT ITEM (e.g. Mouse, Mug, Laptop, Phone, Chair, Shoe)
    if (parsed.isPlant === false) {
      const nonPlantItemName = parsed.detectedItem || "Everyday Object";
      return {
        isPlant: false,
        detectedItem: nonPlantItemName,
        nonPlantExplanation: parsed.nonPlantExplanation || `Dr. Flora detected a ${nonPlantItemName}. While useful in daily life, this item lacks root systems, stems, and chlorophyll. Dr. Flora's clinic only treats botanical flora.`,
        identifiedPlant: null,
        confidenceScore: Math.round((parsed.confidenceScore > 1 ? parsed.confidenceScore : (parsed.confidenceScore * 100)) || 98.4),
        conditionStatus: 'not-applicable',
        conditionTitle: parsed.conditionTitle || `Non-Plant Item Detected (${nonPlantItemName})`,
        conditionDescription: parsed.conditionDescription || `This item is not a plant. Dr. Flora's clinic specializes exclusively in houseplants, succulents, herbs, and garden flora.`,
        vitalSigns: {
          chlorophyllIndex: 0,
          hydrationStatus: 'Inanimate Object',
          pestFungalRisk: 'Low',
          turgorPressure: 'N/A'
        },
        doctorPrescription: (parsed.doctorPrescription && parsed.doctorPrescription.length > 0)
          ? parsed.doctorPrescription
          : [
              "Keep electronic devices away from watering saucers and spray mist.",
              "No botanical treatment required—patient is an inanimate object.",
              "Point camera at a living leaf, stem, or flowerpot to scan a houseplant."
            ],
        recommendedGearTitle: "Indoor Plant Growing Starter Kit",
        recommendedGearQuery: "indoor plant beginner garden starter kit",
        engineUsed: 'Google Vision AI (Gemini 3.5)',
        rawApiResponse: rawText
      };
    }

    // 2. BOTANICAL PLANT FOUND
    const matchedPlant = matchCatalogPlant(parsed.scientificName, parsed.commonName, hintPlantSlug);
    const dynamicPlant = (!matchedPlant || (matchedPlant.id === 'plant-01' && !parsed.commonName.toLowerCase().includes('monstera')))
      ? createDynamicPlantGuide(parsed.commonName, parsed.scientificName, parsed.family, AFRICAN_SPEAR_PLANT_IMAGE)
      : matchedPlant;

    const finalPlant = matchedPlant || dynamicPlant;
    const conf = Math.round((parsed.confidenceScore > 1 ? parsed.confidenceScore : (parsed.confidenceScore * 100)) || 98.5);

    return {
      isPlant: true,
      detectedItem: `${parsed.commonName} (${parsed.scientificName || finalPlant.scientificName})`,
      identifiedPlant: finalPlant,
      confidenceScore: conf,
      conditionStatus: forcedCondition || parsed.conditionStatus || 'healthy',
      conditionTitle: parsed.conditionTitle || "Healthy & Thriving",
      conditionDescription: parsed.conditionDescription || `Your ${finalPlant.commonName} shows healthy chlorophyll pigmentation.`,
      vitalSigns: {
        chlorophyllIndex: parsed.vitalSigns?.chlorophyllIndex ? Math.round(parsed.vitalSigns.chlorophyllIndex) : 88,
        hydrationStatus: parsed.vitalSigns?.hydrationStatus || "Optimal Moisture Balance",
        pestFungalRisk: parsed.vitalSigns?.pestFungalRisk || "Low",
        turgorPressure: parsed.vitalSigns?.turgorPressure || "Firm & Vibrant"
      },
      doctorPrescription: (parsed.doctorPrescription && parsed.doctorPrescription.length > 0)
        ? parsed.doctorPrescription
        : [
            `Maintain recommended ${finalPlant.lightRequirement} exposure.`,
            `Follow standard watering guideline: ${finalPlant.wateringNeed}.`,
            "Dust leaves gently to maximize photosynthesis."
          ],
      recommendedGearTitle: finalPlant.amazonProducts?.[0]?.name || "3-in-1 Soil Moisture & Light Meter",
      recommendedGearQuery: finalPlant.amazonProducts?.[0]?.searchQuery || "soil moisture meter plant light tester",
      engineUsed: 'Google Vision AI (Gemini 3.5)',
      rawApiResponse: rawText
    };

  } catch (err: any) {
    console.error('Vision AI Exception:', err);
    return {
      isPlant: false,
      detectedItem: "Analysis Interrupted",
      nonPlantExplanation: `Google Vision AI encountered an issue (${err?.message || 'Network Timeout'}). Tap 'Open Lens' below to verify directly on Google Lens.`,
      identifiedPlant: null,
      confidenceScore: 0,
      conditionStatus: 'not-applicable',
      conditionTitle: "Connection Error",
      conditionDescription: "Could not reach Google Vision neural servers.",
      vitalSigns: {
        chlorophyllIndex: 0,
        hydrationStatus: "N/A",
        pestFungalRisk: "Low",
        turgorPressure: "N/A"
      },
      doctorPrescription: [
        "Tap 'Open Lens' below to search this image with Google Lens.",
        "Check that your phone has an internet connection and retry."
      ],
      recommendedGearTitle: "3-in-1 Soil Moisture & Light Meter",
      recommendedGearQuery: "soil moisture meter plant light tester",
      engineUsed: 'Google Vision AI (Gemini 3.5)'
    };
  }
}
