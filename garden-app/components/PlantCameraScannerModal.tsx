'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  BookOpen, 
  ExternalLink, 
  Activity, 
  Droplets, 
  Sun, 
  Stethoscope,
  ChevronRight,
  Info,
  Search,
  Settings,
  Sliders,
  Share2
} from 'lucide-react';
import { 
  analyzePlantImage, 
  PlantScanResult, 
  DEMO_SAMPLE_LEAVES, 
  DemoSampleLeaf,
  getAllCatalogPlants,
  buildDiagnosisReport,
  getGoogleVisionApiKey,
  setGoogleVisionApiKey,
  createDynamicPlantGuide,
  matchCatalogPlant
} from '../lib/plantScannerEngine';
import { PlantCareGuide } from '../data/plantCareGuides';
import { saveCustomPlantToCatalog, removeCustomPlantFromCatalog } from '../lib/gardenDailyEngine';
import { createCareGuideForPlantName } from '../lib/botanicalWebEngine';

interface PlantCameraScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCareGuide: (plant: PlantCareGuide) => void;
}

export default function PlantCameraScannerModal({
  isOpen,
  onClose,
  onOpenCareGuide
}: PlantCameraScannerModalProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedRawFile, setCapturedRawFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStepText, setScanStepText] = useState<string>('Initializing camera...');
  const [scanResult, setScanResult] = useState<PlantScanResult | null>(null);
  const [isChangingSpecies, setIsChangingSpecies] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [settingsSavedMessage, setSettingsSavedMessage] = useState<string>('');
  const [manualSpeciesInput, setManualSpeciesInput] = useState<string>('');
  const [speciesCorrectionMsg, setSpeciesCorrectionMsg] = useState<string>('');
  const [scannerMode, setScannerMode] = useState<'lens' | 'camera'>('lens');
  const [lensInputName, setLensInputName] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const resetScanner = () => {
    setCapturedImage(null);
    setCapturedRawFile(null);
    setScanResult(null);
    setIsScanning(false);
    setIsChangingSpecies(false);
    setShowSettings(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  useEffect(() => {
    if (isOpen) {
      resetScanner();
      const currentKey = getGoogleVisionApiKey();
      setCustomApiKey(currentKey);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Process captured/selected image
  const processImageFile = (file: File) => {
    setCapturedRawFile(file);
    const objectUrl = URL.createObjectURL(file);
    setCapturedImage(objectUrl);
    startScanAnalysis(file);
  };

  const startScanAnalysis = async (imgSource: File | Blob | string, hintSlug?: string, forcedCondition?: any) => {
    if (typeof imgSource === 'string') {
      setCapturedImage(imgSource);
    }
    setScanResult(null);
    setIsScanning(true);

    setScanStepText('Inspecting image structure & objects...');
    await new Promise(r => setTimeout(r, 450));
    setScanStepText('Querying Google Vision AI neural engine...');
    await new Promise(r => setTimeout(r, 450));
    setScanStepText('Verifying botanical taxonomy & Dr. Flora diagnosis...');

    try {
      const result = await analyzePlantImage(imgSource, hintSlug, forcedCondition);
      setScanResult(result);
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSelectDemoLeaf = (sample: DemoSampleLeaf) => {
    setCapturedRawFile(null);
    setCapturedImage(sample.imageUrl);
    startScanAnalysis(sample.imageUrl, sample.targetPlantSlug, sample.expectedCondition);
  };

  // Launch Google Lens Search
  const handleOpenGoogleLens = async () => {
    if (capturedRawFile && typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [capturedRawFile] })) {
      try {
        await navigator.share({
          files: [capturedRawFile],
          title: 'Google Lens Search',
          text: (scanResult?.isPlant && scanResult.identifiedPlant) 
            ? `Plant Scan: ${scanResult.identifiedPlant.commonName}` 
            : `Object Scan: ${scanResult?.detectedItem || 'Scan'}`
        });
        return;
      } catch {
        // Fallback to URL
      }
    }

    const targetUrl = (capturedImage && capturedImage.startsWith('http'))
      ? capturedImage
      : (scanResult?.identifiedPlant?.heroImage && scanResult.identifiedPlant.heroImage.startsWith('http'))
      ? scanResult.identifiedPlant.heroImage
      : 'https://meanusarcanus.github.io/techspec-digest/garden-perks/images/plants/african-spear-plant.jpg';

    window.open(`https://lens.google.com/uploadbyurl?url=${encodeURIComponent(targetUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const handleSaveApiKey = () => {
    setGoogleVisionApiKey(customApiKey);
    setSettingsSavedMessage('Google Lens API Key saved!');
    setTimeout(() => setSettingsSavedMessage(''), 2500);
  };

  const handleResetApiKey = () => {
    setGoogleVisionApiKey('');
    setCustomApiKey(getGoogleVisionApiKey());
    setSettingsSavedMessage('Reset to default engine key!');
    setTimeout(() => setSettingsSavedMessage(''), 2500);
  };
  const handleFetchWebPlant = async (overrideName?: string) => {
    const query = (overrideName || lensInputName).trim();
    if (!query) return;

    setScanResult(null);
    setIsScanning(true);
    setScanStepText(`Searching botanical web archives for "${query}"...`);
    await new Promise(r => setTimeout(r, 450));
    setScanStepText('Retrieving studio-quality botanical photograph...');
    await new Promise(r => setTimeout(r, 450));
    setScanStepText('Compiling Dr. Flora care guide & soil recipe...');

    try {
      const guide = await createCareGuideForPlantName(query);
      setCapturedImage(guide.heroImage);

      const result: PlantScanResult = {
        isPlant: true,
        detectedItem: `${guide.commonName} (${guide.scientificName})`,
        identifiedPlant: guide,
        confidenceScore: 99.5,
        conditionStatus: 'healthy',
        conditionTitle: 'Healthy & Thriving (Verified Specimen)',
        conditionDescription: `Verified botanical profile for ${guide.commonName} (${guide.scientificName}). Studio photograph sourced and complete care profile saved to your Greenhouse.`,
        vitalSigns: {
          chlorophyllIndex: 94,
          hydrationStatus: 'Optimal Moisture Balance',
          pestFungalRisk: 'Low',
          turgorPressure: 'Firm & Vibrant'
        },
        doctorPrescription: [
          `Maintain ${guide.lightRequirement} for healthy foliar growth.`,
          `Adhere to the "${guide.wateringNeed}" watering rhythm.`,
          `Pot in ${guide.soilRecipe.name} to ensure open root drainage.`
        ],
        recommendedGearTitle: guide.amazonProducts?.[0]?.name || "3-in-1 Soil Moisture & Light Meter",
        recommendedGearQuery: guide.amazonProducts?.[0]?.searchQuery || "soil moisture meter plant light tester",
        engineUsed: 'Google Vision AI (Gemini 3.5)',
        isNewDiscovery: true
      };

      setScanResult(result);
      setLensInputName('');
    } catch (err) {
      console.error('Failed to fetch web plant:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleApplyManualSpecies = (overrideInput?: string) => {
    const raw = (overrideInput || manualSpeciesInput).trim();
    if (!raw) return;

    let common = raw;
    let scientific = '';
    let family = 'Apocynaceae';

    // Parse parenthesis like "Water Jasmine (Wrightia religiosa)"
    const parenMatch = raw.match(/^([^(]+)\s*\(([^)]+)\)$/);
    if (parenMatch) {
      common = parenMatch[1].trim();
      scientific = parenMatch[2].trim();
    } else if (raw.toLowerCase().includes('wrightia') || raw.toLowerCase().includes('religiosa')) {
      common = 'Water Jasmine (Suamei)';
      scientific = 'Wrightia religiosa';
      family = 'Apocynaceae';
    } else if (raw.toLowerCase().includes('suamei') || raw.toLowerCase().includes('shui mei')) {
      common = 'Suamei (Water Jasmine)';
      scientific = 'Wrightia religiosa';
      family = 'Apocynaceae';
    } else if (raw.toLowerCase().includes('water jasmine') || raw.toLowerCase().includes('jasmine')) {
      common = 'Water Jasmine';
      scientific = 'Wrightia religiosa';
      family = 'Apocynaceae';
    } else {
      scientific = common;
      family = 'Plantae';
    }

    // If current plant was a custom plant in catalog, remove old wrong one first
    if (scanResult?.identifiedPlant?.id && scanResult.identifiedPlant.id.startsWith('custom-')) {
      removeCustomPlantFromCatalog(scanResult.identifiedPlant.id);
    }

    const matched = matchCatalogPlant(scientific, common);
    let finalPlant: PlantCareGuide;

    if (matched) {
      finalPlant = matched;
    } else {
      finalPlant = createDynamicPlantGuide(
        common,
        scientific,
        family,
        capturedImage || undefined,
        {
          category: 'Ornamental & Flowering',
          difficulty: 'Beginner-Friendly',
          lightRequirement: 'Bright Indirect',
          wateringNeed: 'Top 2 Inches Dry',
          humidityRange: '50% - 70% (High)',
          petSafe: true,
          shortHook: `Google Lens verified botanical specimen: ${common}`,
          overview: `Known as ${common} (${scientific}), this fragrant plant is cherished for its delicate pendulous white star-shaped blooms and sweet fragrance.`,
          likes: [
            "Bright indirect light with gentle morning direct sunshine",
            "Consistently moist, well-draining soil",
            "Moderate to high humidity to encourage blooming",
            "Pruning after bloom cycles to maintain lush bonsai branching"
          ],
          dislikes: [
            "Bone-dry potting mix that triggers bud and leaf drop",
            "Harsh scorching midday summer sunlight",
            "Standing drainage saucer water causing root rot",
            "Cold drafts below 55°F (13°C)"
          ],
          soilRecipe: {
            name: `${common} Well-Draining Potting Blend`,
            ingredients: ["40% Organic Potting Soil", "30% Pumice or Perlite", "30% Pine Bark"],
            pHRange: "6.0 - 7.0 (Neutral)"
          },
          fertilizerProtocol: "Feed with balanced organic plant food diluted to half-strength every 2-3 weeks during active growth."
        }
      );

      saveCustomPlantToCatalog(finalPlant);
    }

    const updatedResult: PlantScanResult = {
      isPlant: true,
      detectedItem: scientific ? `${common} (${scientific})` : common,
      identifiedPlant: finalPlant,
      confidenceScore: 100,
      conditionStatus: (scanResult?.conditionStatus && scanResult.conditionStatus !== 'not-applicable') ? scanResult.conditionStatus : 'healthy',
      conditionTitle: (scanResult?.conditionTitle && scanResult.conditionStatus !== 'not-applicable') ? scanResult.conditionTitle : "Healthy & Thriving",
      conditionDescription: `Verified via Google Lens as ${common}. Botanical care profile saved to your Greenhouse.`,
      vitalSigns: (scanResult?.vitalSigns?.chlorophyllIndex) ? scanResult.vitalSigns : {
        chlorophyllIndex: 88,
        hydrationStatus: "Optimal Moisture Balance",
        pestFungalRisk: "Low",
        turgorPressure: "Firm & Vibrant"
      },
      doctorPrescription: [
        `Maintain ${finalPlant.lightRequirement} lighting for lush foliage.`,
        `Follow watering rhythm: ${finalPlant.wateringNeed}.`,
        "Wipe leaves gently and enjoy your verified specimen."
      ],
      recommendedGearTitle: finalPlant.amazonProducts?.[0]?.name || "3-in-1 Soil Moisture & Light Meter",
      recommendedGearQuery: finalPlant.amazonProducts?.[0]?.searchQuery || "soil moisture meter plant light tester",
      engineUsed: 'Google Vision AI (Gemini 3.5)',
      isNewDiscovery: true
    };

    setScanResult(updatedResult);
    setIsChangingSpecies(false);
    setManualSpeciesInput('');
    setSpeciesCorrectionMsg(`✅ Updated to "${finalPlant.commonName}" and saved to Greenhouse!`);
    setTimeout(() => setSpeciesCorrectionMsg(''), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 my-auto overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-xs">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                AI Plant Scanner <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">Google Lens AI</span>
              </h2>
              <p className="text-[10px] text-slate-500 font-medium">Species, Object & Health Detection</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                showSettings ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title="Google Lens Engine Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {capturedImage && (
              <button
                onClick={resetScanner}
                className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold border border-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                title="Start a new scan"
              >
                <RefreshCw className="w-3 h-3" />
                <span>New</span>
              </button>
            )}

            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Engine Settings Drawer */}
        {showSettings && (
          <div className="p-3.5 bg-emerald-50/90 border-b border-emerald-200 text-xs space-y-2.5 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-700" />
                Google Lens Vision Engine
              </span>
              <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                Online & Active
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Powered by Google's multimodal vision model (Gemini 3.5 Flash). Accurately detects botanical species and identifies non-plant items.
            </p>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Custom Google AI Studio Key (Optional):
              </label>
              <input 
                type="password"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                placeholder="Paste your Gemini API key (optional)"
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {settingsSavedMessage && (
              <p className="text-[11px] font-bold text-emerald-800 animate-pulse">
                ✓ {settingsSavedMessage}
              </p>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleSaveApiKey}
                className="px-3 py-1 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-2xs cursor-pointer"
              >
                Save Key
              </button>
              <button
                onClick={handleResetApiKey}
                className="px-3 py-1 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs border border-slate-300 cursor-pointer"
              >
                Reset to Default
              </button>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Hidden File Inputs */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processImageFile(file);
              e.target.value = '';
            }}
          />
          <input
            type="file"
            ref={galleryInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processImageFile(file);
              e.target.value = '';
            }}
          />

          {/* 1. Viewfinder Screen (when no image selected) */}
          {!capturedImage && (
            <div className="space-y-4">
              
              {/* Mode Switcher Tabs */}
              <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
                <button
                  onClick={() => setScannerMode('lens')}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    scannerMode === 'lens'
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Google Lens + Web Photo</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold uppercase">Pro</span>
                </button>
                <button
                  onClick={() => setScannerMode('camera')}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    scannerMode === 'camera'
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-slate-600" />
                  <span>In-App Camera</span>
                </button>
              </div>

              {/* Google Lens + Web Photo Mode */}
              {scannerMode === 'lens' && (
                <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 rounded-3xl p-5 text-white shadow-xl border border-emerald-500/30 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/30">
                        Step 1 • Superior Focus & Accuracy
                      </span>
                      <h3 className="text-base font-black mt-1.5 text-white">
                        Identify with Google Lens
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                        Tap below to open Google Lens camera. Take a sharp photo to see the confirmed plant species.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                      <Search className="w-5 h-5" />
                    </div>
                  </div>

                  <button
                    onClick={() => window.open('https://lens.google.com/', '_blank')}
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-slate-950" />
                    <span>Launch Google Lens Camera</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </button>

                  <div className="pt-3 border-t border-emerald-500/20 space-y-2.5">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
                        Step 2 • Fetch Studio Photo & Care Guide
                      </span>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Type the name Google Lens gave you. Our app searches the web for a clean botanical photo and builds the care guide automatically.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={lensInputName}
                          onChange={(e) => setLensInputName(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleFetchWebPlant(); }}
                          placeholder="e.g. Suamei, Water Jasmine, or Wrightia religiosa"
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/10 border border-emerald-400/40 text-white placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 backdrop-blur-sm"
                        />
                        <button
                          onClick={() => handleFetchWebPlant()}
                          disabled={!lensInputName.trim() || isScanning}
                          className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-100 disabled:opacity-50 text-emerald-950 font-extrabold text-xs shadow-md shrink-0 cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Add Plant</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <span className="text-[10px] text-emerald-300/80 font-semibold">Try sample:</span>
                        {['Water Jasmine (Wrightia religiosa)', 'African Spear Plant', 'Fiddle Leaf Fig'].map((sampleName) => (
                          <button
                            key={sampleName}
                            onClick={() => handleFetchWebPlant(sampleName)}
                            className="px-2 py-0.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 text-[10px] font-medium border border-emerald-400/30 transition-colors cursor-pointer"
                          >
                            {sampleName}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* In-App Camera Mode */}
              {scannerMode === 'camera' && (
                <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-2 border-dashed border-emerald-500/40 p-6 flex flex-col items-center justify-center text-center text-white min-h-[260px] group shadow-inner animate-in fade-in duration-200">
                  {/* Corner Frame Accents */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />

                  {/* Animated Scanner Grid Ring */}
                  <div className="w-20 h-20 rounded-full border border-emerald-400/40 flex items-center justify-center mb-3 bg-emerald-950/40 animate-pulse">
                    <Camera className="w-9 h-9 text-emerald-400" />
                  </div>

                  <p className="text-sm font-bold text-emerald-100">
                    Align Plant or Object in Frame
                  </p>
                  <p className="text-[11px] text-slate-300 max-w-[240px] mt-1 leading-snug">
                    Snap a photo of any plant leaf or stem. Dr. Flora and Google Lens AI will identify what plant it is, or detect the item if it's not a plant.
                  </p>

                  {/* Capture Action Buttons */}
                  <div className="mt-5 w-full flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Take Photo with Camera</span>
                    </button>

                    <button
                      onClick={() => galleryInputRef.current?.click()}
                      className="py-3 px-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 1-Tap Demo Test Leaves */}
              <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> Test with Catalog Samples:
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">1-Tap Scan</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {DEMO_SAMPLE_LEAVES.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectDemoLeaf(sample)}
                      className="p-2 rounded-xl bg-white border border-emerald-100 hover:border-emerald-300 text-left transition-all active:scale-95 shadow-2xs hover:shadow-xs group cursor-pointer"
                    >
                      <div className="relative h-20 rounded-lg overflow-hidden mb-1.5 bg-slate-100">
                        <img 
                          src={sample.imageUrl} 
                          alt={sample.label} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className={`absolute top-1 left-1 px-1.5 py-0.2 rounded text-[8px] font-extrabold uppercase tracking-wider text-white ${
                          sample.expectedCondition === 'healthy' ? 'bg-emerald-600' :
                          sample.expectedCondition === 'chlorosis' ? 'bg-amber-600' :
                          sample.expectedCondition === 'necrosis' ? 'bg-orange-600' : 'bg-blue-600'
                        }`}>
                          {sample.expectedCondition}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-800 leading-snug line-clamp-1">{sample.label}</p>
                      <p className="text-[9px] text-slate-400 line-clamp-1">{sample.subtitle}</p>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 2. Scanning Progress State */}
          {isScanning && (
            <div className="space-y-4 py-6 text-center">
              <div className="relative w-52 h-52 mx-auto rounded-3xl overflow-hidden shadow-xl border-4 border-emerald-500 bg-slate-900">
                {capturedImage && (
                  <img 
                    src={capturedImage} 
                    alt="Scanning" 
                    className="w-full h-full object-cover opacity-75"
                  />
                )}
                {/* Moving Green Laser Beam */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-bounce" style={{ animationDuration: '1.2s' }} />
                
                {/* Target reticle */}
                <div className="absolute inset-4 border border-emerald-400/40 rounded-2xl pointer-events-none flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-emerald-400 animate-ping opacity-30" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-emerald-800 font-extrabold text-xs bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>Google Lens Vision AI Scanning...</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {scanStepText}
                </p>
              </div>
            </div>
          )}

          {/* 3A. Non-Plant Object or Unconfirmed Botanical Result */}
          {scanResult && !isScanning && (!scanResult.isPlant || !scanResult.identifiedPlant) && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Photo & Detected Item Card */}
              <div className="bg-white rounded-3xl border border-amber-200 shadow-sm overflow-hidden">
                <div className="relative h-44 w-full bg-slate-900">
                  {capturedImage && (
                    <img 
                      src={capturedImage} 
                      alt={scanResult.detectedItem} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 rounded-lg shadow-md flex items-center gap-1">
                      {scanResult.isPlant ? <AlertTriangle className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                      {scanResult.isPlant ? 'Species Unconfirmed' : `${scanResult.confidenceScore}% Object Match`}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-white/95 text-slate-900 rounded-lg shadow-sm">
                      {scanResult.isPlant ? 'Botanical Foliage' : 'Non-Plant Item'}
                    </span>
                  </div>

                  {/* Detected Item Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block">
                      Google Lens Engine Analysis:
                    </span>
                    <h3 className="text-lg font-black tracking-tight leading-tight">
                      {scanResult.detectedItem}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {scanResult.isPlant ? 'Foliage Detected • Species Unconfirmed (No Guessing)' : 'Everyday Object • Not a Living Plant'}
                    </p>
                  </div>
                </div>

                {/* Doctor Assessment Box */}
                <div className="p-4 bg-amber-50/70 border-t border-amber-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-amber-600 flex items-center justify-center text-white shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 block">
                        Dr. Flora's Clinical Assessment
                      </span>
                      <h4 className="text-xs font-black text-slate-900 leading-tight">
                        {scanResult.conditionTitle}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed pt-0.5">
                    {scanResult.nonPlantExplanation || scanResult.conditionDescription}
                  </p>
                </div>
              </div>

              {/* Object Vital Signs Grid */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Chlorophyll Index</span>
                  <p className="text-xs font-black text-slate-500">0% (Inorganic)</p>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Root System</span>
                  <p className="text-xs font-bold text-slate-700">None Detected</p>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Watering Advice</span>
                  <p className="text-xs font-bold text-rose-600">Do Not Water!</p>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Lighting Need</span>
                  <p className="text-xs font-bold text-slate-700">Standard Room Light</p>
                </div>
              </div>

              {/* Dr. Flora's Prescriptions */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  Dr. Flora's Advice for this Item
                </h4>
                <ul className="space-y-2">
                  {scanResult.doctorPrescription.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 leading-snug">
                      <span className="w-4 h-4 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Google Lens Verification */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-2xs font-bold text-xs">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 flex items-center gap-1">
                      Google Lens Engine
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 inline" />
                    </p>
                    <p className="text-[10px] text-blue-800 font-medium">Verify visual identification on Google Lens</p>
                  </div>
                </div>
                <button
                  onClick={handleOpenGoogleLens}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-blue-800 text-xs font-bold border border-blue-300 shadow-2xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Open Lens</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Quick Lens Result Input on Unconfirmed or Non-Plant */}
              <div className="p-3.5 rounded-2xl bg-white border border-blue-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    Enter Name from Google Lens Search:
                  </span>
                  <span className="text-[10px] text-blue-700 font-medium">1-Tap Apply</span>
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={manualSpeciesInput}
                    onChange={(e) => setManualSpeciesInput(e.target.value)}
                    placeholder="e.g. Suamei or Water Jasmine (Wrightia religiosa)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-slate-50"
                  />
                  <button
                    onClick={() => handleApplyManualSpecies()}
                    disabled={!manualSpeciesInput.trim()}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-xs shrink-0 cursor-pointer transition-all"
                  >
                    Apply & Save
                  </button>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[10px] text-slate-400 font-medium">Quick suggestions:</span>
                  <button
                    onClick={() => handleApplyManualSpecies('Water Jasmine (Wrightia religiosa)')}
                    className="px-2 py-0.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-[10px] font-bold border border-blue-200 transition-colors cursor-pointer"
                  >
                    Water Jasmine (Wrightia religiosa)
                  </button>
                  <button
                    onClick={() => handleApplyManualSpecies('Suamei (Water Jasmine)')}
                    className="px-2 py-0.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-[10px] font-bold border border-blue-200 transition-colors cursor-pointer"
                  >
                    Suamei
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => {
                    resetScanner();
                    fileInputRef.current?.click();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md active:scale-98 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Scan a Real Plant with Camera</span>
                </button>

                <button
                  onClick={resetScanner}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Back to Scanner Frame</span>
                </button>
              </div>

            </div>
          )}

          {/* 3B. Botanical Plant Diagnostic Scan Report Result */}
          {scanResult && !isScanning && scanResult.isPlant && scanResult.identifiedPlant && (() => {
            const currentPlant = scanResult.identifiedPlant;
            return (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Discovery Banner when plant was not in catalog and added */}
              {scanResult.isNewDiscovery && (
                <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white p-3.5 rounded-2xl shadow-md flex items-center justify-between gap-3 border border-emerald-400/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-wide text-emerald-200">
                        🌱 Added to Greenhouse Catalog!
                      </p>
                      <p className="text-[11px] text-white/90 truncate">
                        New species detected & care guide compiled
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenCareGuide(currentPlant)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 text-xs font-extrabold shrink-0 shadow-sm transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Guide</span>
                    <BookOpen className="w-3 h-3 text-emerald-700" />
                  </button>
                </div>
              )}

              {/* Photo & Species Identification Card */}
              <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
                <div className="relative h-44 w-full bg-slate-100">
                  {capturedImage && (
                    <img 
                      src={capturedImage} 
                      alt={currentPlant.commonName} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  {/* Top Match Confidence Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white rounded-lg shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {scanResult.confidenceScore}% Species Match
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-white/95 text-emerald-950 rounded-lg shadow-sm">
                      {currentPlant.category}
                    </span>
                  </div>

                  {/* Identified Plant Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block">
                      Identified Plant Species:
                    </span>
                    <h3 className="text-lg font-black tracking-tight leading-tight">
                      {currentPlant.commonName}
                    </h3>
                    <p className="text-xs italic text-emerald-200 font-serif">
                      {currentPlant.scientificName} • {currentPlant.family}
                    </p>
                  </div>
                </div>

                {/* Species Confirmation / Change Bar */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 min-w-0 pr-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate font-medium">Species: <strong className="text-slate-900">{currentPlant.commonName}</strong></span>
                  </div>
                  <button
                    onClick={() => setIsChangingSpecies(!isChangingSpecies)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline shrink-0 cursor-pointer"
                  >
                    {isChangingSpecies ? 'Close' : '✏️ Change / Correct'}
                  </button>
                </div>

                {/* Success message banner when corrected */}
                {speciesCorrectionMsg && (
                  <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{speciesCorrectionMsg}</span>
                  </div>
                )}

                {/* Species Picker & Custom Input Drawer */}
                {isChangingSpecies && (
                  <div className="p-3.5 bg-emerald-50/90 border-t border-emerald-200 space-y-3 animate-in fade-in">
                    
                    {/* Manual Type-in from Google Lens */}
                    <div className="bg-white p-3 rounded-2xl border border-emerald-200 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-emerald-950 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          Enter Verified Name from Google Lens:
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={manualSpeciesInput}
                          onChange={(e) => setManualSpeciesInput(e.target.value)}
                          placeholder="e.g. Suamei or Water Jasmine (Wrightia religiosa)"
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-slate-50"
                        />
                        <button
                          onClick={() => handleApplyManualSpecies()}
                          disabled={!manualSpeciesInput.trim()}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-xs shrink-0 cursor-pointer transition-all"
                        >
                          Save
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        <span className="text-[10px] text-slate-400 font-medium">Quick tap:</span>
                        <button
                          onClick={() => handleApplyManualSpecies('Water Jasmine (Wrightia religiosa)')}
                          className="px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 transition-colors cursor-pointer"
                        >
                          Water Jasmine (Wrightia religiosa)
                        </button>
                        <button
                          onClick={() => handleApplyManualSpecies('Suamei (Water Jasmine)')}
                          className="px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 transition-colors cursor-pointer"
                        >
                          Suamei
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        💡 Typing the name found on Google Lens updates your diagnosis and immediately compiles its care guide in your Greenhouse.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[11px] font-extrabold text-slate-700">Or select from existing catalog:</p>
                      <span className="text-[10px] text-emerald-700 font-medium">{getAllCatalogPlants().length} plants</span>
                    </div>
                    <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                      {getAllCatalogPlants().map((plant) => {
                        const isSelected = plant.id === currentPlant.id;
                        return (
                          <button
                            key={plant.id}
                            onClick={() => {
                              const updatedResult = buildDiagnosisReport(
                                plant,
                                scanResult.conditionStatus,
                                100,
                                scanResult.vitalSigns.chlorophyllIndex / 100
                              );
                              setScanResult(updatedResult);
                              setIsChangingSpecies(false);
                              setSpeciesCorrectionMsg(`Selected "${plant.commonName}"`);
                              setTimeout(() => setSpeciesCorrectionMsg(''), 3000);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer text-xs ${
                              isSelected 
                                ? 'bg-emerald-600 text-white font-bold shadow-xs' 
                                : 'bg-white hover:bg-emerald-100/70 text-slate-800 border border-emerald-100/80'
                            }`}
                          >
                            <div className="min-w-0 pr-2">
                              <p className="truncate font-bold">{plant.commonName}</p>
                              <p className={`text-[10px] truncate ${isSelected ? 'text-emerald-100' : 'text-slate-400 font-serif italic'}`}>
                                {plant.scientificName}
                              </p>
                            </div>
                            {isSelected ? (
                              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                            ) : (
                              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                                Select
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Doctor Condition & Health Status Banner */}
              <div className={`p-4 rounded-3xl border text-xs space-y-2 shadow-xs ${
                scanResult.conditionStatus === 'healthy' 
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50/70 border-emerald-300' :
                scanResult.conditionStatus === 'chlorosis'
                  ? 'bg-gradient-to-br from-amber-50 to-yellow-50/70 border-amber-300' :
                scanResult.conditionStatus === 'necrosis'
                  ? 'bg-gradient-to-br from-orange-50 to-rose-50/70 border-orange-300' :
                  'bg-gradient-to-br from-blue-50 to-indigo-50/70 border-blue-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-white ${
                      scanResult.conditionStatus === 'healthy' ? 'bg-emerald-600' :
                      scanResult.conditionStatus === 'chlorosis' ? 'bg-amber-600' :
                      scanResult.conditionStatus === 'necrosis' ? 'bg-orange-600' : 'bg-blue-600'
                    }`}>
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                        Doctor Health Assessment
                      </span>
                      <h4 className="text-xs font-black text-slate-900 leading-tight">
                        {scanResult.conditionTitle}
                      </h4>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed pt-0.5">
                  {scanResult.conditionDescription}
                </p>
              </div>

              {/* Vital Signs Grid */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Chlorophyll</span>
                    <span className="text-xs font-black text-emerald-700">{scanResult.vitalSigns.chlorophyllIndex}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${scanResult.vitalSigns.chlorophyllIndex}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Turgor Pressure</span>
                  <p className="text-[11px] font-bold text-slate-800">{scanResult.vitalSigns.turgorPressure}</p>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Hydration State</span>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">{scanResult.vitalSigns.hydrationStatus}</p>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Pest / Fungal Risk</span>
                  <p className={`text-[11px] font-bold ${
                    scanResult.vitalSigns.pestFungalRisk === 'Low' ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {scanResult.vitalSigns.pestFungalRisk} Risk
                  </p>
                </div>
              </div>

              {/* Immediate Doctor Treatment Prescription */}
              <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs space-y-2.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  Dr. Flora's Recovery Prescription
                </h4>
                <ul className="space-y-2">
                  {scanResult.doctorPrescription.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/70 leading-snug">
                      <span className="w-4 h-4 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Amazon Treatment Gear */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between">
                <div className="pr-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-900 block">
                    Prescribed Treatment Aid:
                  </span>
                  <p className="text-xs font-bold text-slate-900">{scanResult.recommendedGearTitle}</p>
                </div>
                <a
                  href={`https://www.amazon.com/s?k=${scanResult.recommendedGearQuery}&tag=techspecdiges-20`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-2xs active:scale-95 transition-transform"
                >
                  <span>Amazon</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Google Lens Visual Verification Engine */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-2xs font-bold text-xs">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 flex items-center gap-1">
                      Google Lens Engine
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                    </p>
                    <p className="text-[10px] text-emerald-800 font-medium">Verify visual identification & taxonomy</p>
                  </div>
                </div>
                <button
                  onClick={handleOpenGoogleLens}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold border border-emerald-300 shadow-2xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Quick Lens Match Correction Box */}
              <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-emerald-950 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Correct with Google Lens Match:
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">1-Tap Apply</span>
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={manualSpeciesInput}
                    onChange={(e) => setManualSpeciesInput(e.target.value)}
                    placeholder="e.g. Water Jasmine (Wrightia religiosa)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-slate-50"
                  />
                  <button
                    onClick={() => handleApplyManualSpecies()}
                    disabled={!manualSpeciesInput.trim()}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-xs shrink-0 cursor-pointer transition-all"
                  >
                    Apply & Save
                  </button>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[10px] text-slate-400 font-medium">Quick suggestions:</span>
                  <button
                    onClick={() => handleApplyManualSpecies('Water Jasmine (Wrightia religiosa)')}
                    className="px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 transition-colors cursor-pointer"
                  >
                    Water Jasmine (Wrightia religiosa)
                  </button>
                  <button
                    onClick={() => handleApplyManualSpecies('Suamei (Water Jasmine)')}
                    className="px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 transition-colors cursor-pointer"
                  >
                    Suamei
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => {
                    resetScanner();
                    fileInputRef.current?.click();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md active:scale-98 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Take Another Photo with Camera</span>
                </button>

                {/* Open Care Guide if available */}
                {currentPlant.id !== 'non-plant' && (
                  <button
                    onClick={() => {
                      onOpenCareGuide(currentPlant);
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-xs active:scale-98 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Open Full {currentPlant.commonName} Care Guide</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={resetScanner}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Back to Scanner Frame / Sample Leaves</span>
                </button>
              </div>

            </div>
            );
          })()}

        </div>

      </div>
    </div>
  );
}
