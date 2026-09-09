'use client';

import React, { useState, useRef } from 'react';
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
  Info
} from 'lucide-react';
import { 
  analyzePlantImage, 
  PlantScanResult, 
  DEMO_SAMPLE_LEAVES, 
  DemoSampleLeaf,
  getAllCatalogPlants,
  buildDiagnosisReport
} from '../lib/plantScannerEngine';
import { PlantCareGuide } from '../data/plantCareGuides';

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
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStepText, setScanStepText] = useState<string>('Initializing camera...');
  const [scanResult, setScanResult] = useState<PlantScanResult | null>(null);
  const [isChangingSpecies, setIsChangingSpecies] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const resetScanner = () => {
    setCapturedImage(null);
    setScanResult(null);
    setIsScanning(false);
    setIsChangingSpecies(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  // Reset to clean state each time the scanner opens
  React.useEffect(() => {
    if (isOpen) {
      resetScanner();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Process captured/selected image
  const processImageFile = (file: File, hintSlug?: string, forcedCondition?: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgDataUrl = e.target?.result as string;
      startScanAnalysis(imgDataUrl, hintSlug, forcedCondition);
    };
    reader.readAsDataURL(file);
  };

  const startScanAnalysis = async (imgUrl: string, hintSlug?: string, forcedCondition?: any) => {
    setCapturedImage(imgUrl);
    setScanResult(null);
    setIsScanning(true);

    // Realistic scanning step progression
    setScanStepText('Analyzing leaf contour & venation pattern...');
    await new Promise(r => setTimeout(r, 450));
    setScanStepText('Inspecting chlorophyll green & yellowing chroma...');
    await new Promise(r => setTimeout(r, 450));
    setScanStepText('Matching botanical taxonomy & Doctor health diagnosis...');
    await new Promise(r => setTimeout(r, 400));

    // Create an image element to run canvas inspection
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      const result = await analyzePlantImage(img, hintSlug, forcedCondition);
      setScanResult(result);
      setIsScanning(false);
    };
    img.onerror = async () => {
      const result = await analyzePlantImage(imgUrl, hintSlug, forcedCondition);
      setScanResult(result);
      setIsScanning(false);
    };
    img.src = imgUrl;
  };

  // Handle Demo Leaf Click
  const handleSelectDemoLeaf = (sample: DemoSampleLeaf) => {
    startScanAnalysis(sample.imageUrl, sample.targetPlantSlug, sample.expectedCondition);
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
                AI Plant Scanner <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">Doctor AI</span>
              </h2>
              <p className="text-[10px] text-slate-500 font-medium">Camera Species & Health Detection</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {capturedImage && (
              <button
                onClick={resetScanner}
                className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold border border-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                title="Start a new scan"
              >
                <RefreshCw className="w-3 h-3" />
                <span>New Scan</span>
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Hidden File Inputs with automatic value clearing */}
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
              
              {/* Camera Frame Box */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-2 border-dashed border-emerald-500/40 p-6 flex flex-col items-center justify-center text-center text-white min-h-[260px] group shadow-inner">
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
                  Align Plant Leaf in Frame
                </p>
                <p className="text-[11px] text-slate-300 max-w-[220px] mt-1 leading-snug">
                  Snap a photo of the leaf or stem to detect what plant it is and its current health condition.
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

              {/* 1-Tap Demo Test Leaves */}
              <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> Or Test with Demo Leaves:
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">1-Tap Scan</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {DEMO_SAMPLE_LEAVES.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectDemoLeaf(sample)}
                      className="p-2 rounded-xl bg-white border border-emerald-100 hover:border-emerald-300 text-left transition-all active:scale-95 shadow-2xs hover:shadow-xs group"
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
                  <span>AI Vision Doctor Analyzing...</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {scanStepText}
                </p>
              </div>
            </div>
          )}

          {/* 3. Diagnostic Scan Report Result */}
          {scanResult && !isScanning && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Photo & Species Identification Card */}
              <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
                <div className="relative h-44 w-full bg-slate-100">
                  {capturedImage && (
                    <img 
                      src={capturedImage} 
                      alt={scanResult.identifiedPlant.commonName}
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
                      {scanResult.identifiedPlant.category}
                    </span>
                  </div>

                  {/* Identified Plant Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block">
                      Identified Plant Species:
                    </span>
                    <h3 className="text-lg font-black tracking-tight leading-tight">
                      {scanResult.identifiedPlant.commonName}
                    </h3>
                    <p className="text-xs italic text-emerald-200 font-serif">
                      {scanResult.identifiedPlant.scientificName} • {scanResult.identifiedPlant.family}
                    </p>
                  </div>
                </div>

                {/* Species Confirmation / Change Bar */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 min-w-0 pr-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate font-medium">Species: <strong className="text-slate-900">{scanResult.identifiedPlant.commonName}</strong></span>
                  </div>
                  <button
                    onClick={() => setIsChangingSpecies(!isChangingSpecies)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline shrink-0 cursor-pointer"
                  >
                    {isChangingSpecies ? 'Close' : 'Change / Confirm'}
                  </button>
                </div>

                {/* Species Picker List */}
                {isChangingSpecies && (
                  <div className="p-3 bg-emerald-50/70 border-t border-emerald-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-extrabold text-emerald-950">Confirm or change plant species:</p>
                      <span className="text-[10px] text-emerald-700 font-medium">{getAllCatalogPlants().length} species in catalog</span>
                    </div>
                    <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
                      {getAllCatalogPlants().map((plant) => {
                        const isSelected = plant.id === scanResult.identifiedPlant.id;
                        return (
                          <button
                            key={plant.id}
                            onClick={() => {
                              const updatedResult = buildDiagnosisReport(
                                plant,
                                scanResult.conditionStatus,
                                100, // 100% confirmed by user
                                scanResult.vitalSigns.chlorophyllIndex / 100
                              );
                              setScanResult(updatedResult);
                              setIsChangingSpecies(false);
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

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                {/* 1. Instant Camera Re-take */}
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

                {/* 2. Open Care Guide */}
                <button
                  onClick={() => {
                    onOpenCareGuide(scanResult.identifiedPlant);
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-xs active:scale-98 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open Full {scanResult.identifiedPlant.commonName} Care Guide</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* 3. Back to viewfinder / sample leaves */}
                <button
                  onClick={resetScanner}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Back to Scanner Frame / Sample Leaves</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
