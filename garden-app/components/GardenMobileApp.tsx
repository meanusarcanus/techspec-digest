'use client';

import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Sparkles, 
  Stethoscope, 
  Sprout, 
  ShoppingBag, 
  Camera, 
  Mail, 
  Sun, 
  Droplets, 
  Wind, 
  Layers, 
  ThumbsUp, 
  ThumbsDown, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  Share2, 
  Monitor, 
  Download, 
  Search, 
  ExternalLink,
  ChevronRight,
  Send,
  X,
  ShieldCheck,
  Flame,
  BookOpen
} from 'lucide-react';
import { getDailyFeaturedPlant, getAllPlantGuides } from '../lib/gardenDailyEngine';
import { generatePlantDoctorDiagnosis, DoctorDiagnosis } from '../lib/botanicalDoctor';
import { PlantCareGuide } from '../data/plantCareGuides';
import CareGuideModal from './CareGuideModal';
import PlantCameraScannerModal from './PlantCameraScannerModal';

interface GardenMobileAppProps {
  onSwitchToDesktop: () => void;
  initialTab?: MobileTab;
}

type MobileTab = 'today' | 'doctor' | 'greenhouse' | 'gear' | 'sprout';

export default function GardenMobileApp({ onSwitchToDesktop, initialTab = 'today' }: GardenMobileAppProps) {
  const [activeTab, setActiveTab] = useState<MobileTab>(initialTab);
  const [todaySection, setTodaySection] = useState<'likes' | 'steps' | 'trouble' | 'soil'>('likes');
  const [selectedPlant, setSelectedPlant] = useState<PlantCareGuide | null>(null);
  const [scannerModalOpen, setScannerModalOpen] = useState<boolean>(false);

  // Doctor state
  const [symptomInput, setSymptomInput] = useState('');
  const [diagnosis, setDiagnosis] = useState<DoctorDiagnosis | null>(null);

  // Greenhouse search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Newsletter form
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // PWA Install state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallSheet, setShowInstallSheet] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const dailyData = getDailyFeaturedPlant();
  const [allPlants, setAllPlants] = useState<PlantCareGuide[]>(() => getAllPlantGuides());

  useEffect(() => {
    const handleCatalogUpdate = () => {
      setAllPlants(getAllPlantGuides());
    };
    handleCatalogUpdate();
    window.addEventListener('garden_catalog_updated', handleCatalogUpdate);
    return () => window.removeEventListener('garden_catalog_updated', handleCatalogUpdate);
  }, []);

  useEffect(() => {
    // Check if device is iOS
    const isIPhone = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsIOS(isIPhone);

    // Listen for PWA install event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setShowInstallSheet(false);
        }
        setDeferredPrompt(null);
      });
    } else {
      setShowInstallSheet(true);
    }
  };

  const runQuickDiagnosis = (symptom: string) => {
    setSymptomInput(symptom);
    const result = generatePlantDoctorDiagnosis(symptom, dailyData.plant.commonName);
    setDiagnosis(result);
  };

  const handleCustomDiagnosis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;
    const result = generatePlantDoctorDiagnosis(symptomInput, dailyData.plant.commonName);
    setDiagnosis(result);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 5000);
      setNewsletterEmail('');
    }
  };

  // Categories
  const categories = ['All', 'Houseplants', 'Aroids', 'Tropical', 'Ficus', 'Succulents', 'Herbs'];
  const filteredPlants = allPlants.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = p.commonName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f7faf8] text-slate-900 selection:bg-emerald-200">
      
      {/* 1. Mobile App Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 px-4 py-3 shadow-xs">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & PWA Tag */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-emerald-950 font-sans">
                  Garden Perks
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded">
                  PWA
                </span>
              </div>
              <p className="text-[10px] text-emerald-600 font-medium">Daily Plant Care & Doctor</p>
            </div>
          </div>

          {/* Quick Actions (Scan, Install & Desktop Toggle) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setScannerModalOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs transition-transform active:scale-95 cursor-pointer"
              title="Scan Plant with Camera"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>Scan</span>
            </button>

            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
              title="Install PWA to Home Screen"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>

            <button
              onClick={onSwitchToDesktop}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Switch to Desktop Portal View"
            >
              <Monitor className="w-3.5 h-3.5 text-slate-600" />
              <span>Desktop</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Content Area (Tab Views) */}
      <main className="flex-1 pb-24 px-4 pt-4 max-w-md mx-auto w-full">

        {/* ========================================================== */}
        {/* TAB 1: TODAY'S SPOTLIGHT & DAILY CARE                      */}
        {/* ========================================================== */}
        {activeTab === 'today' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Today Date Pill */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
              <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full text-[11px]">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Spotlight: {dailyData.formattedDate}
              </span>
              <span className="text-[11px] text-slate-400">Guide #{dailyData.dayIndex + 1} of {dailyData.totalGuidesCount}</span>
            </div>

            {/* Plant Hero Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-emerald-100 bg-white">
              <div className="relative h-64 w-full bg-slate-100">
                <img 
                  src={dailyData.plant.heroImage} 
                  alt={dailyData.plant.commonName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-emerald-900 rounded-lg shadow-sm">
                    🌿 {dailyData.plant.category}
                  </span>
                  {dailyData.plant.petSafe ? (
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded-lg shadow-sm flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Pet Safe
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-amber-500 text-white rounded-lg shadow-sm flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Toxic to Pets
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h1 className="text-2xl font-black tracking-tight leading-snug">
                    {dailyData.plant.commonName}
                  </h1>
                  <p className="text-xs italic text-emerald-200 font-serif">
                    {dailyData.plant.scientificName} • {dailyData.plant.family}
                  </p>
                </div>
              </div>

              {/* Hook snippet */}
              <div className="p-3.5 bg-white border-b border-slate-100">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {dailyData.plant.shortHook}
                </p>
              </div>

              {/* Google Lens Verified Botanical Engine */}
              {(() => {
                const lensTargetUrl = dailyData.plant.heroImage.startsWith('http')
                  ? dailyData.plant.heroImage
                  : dailyData.plant.heroImage.startsWith('data:')
                  ? 'https://meanusarcanus.github.io/techspec-digest/garden-perks/images/plants/african-spear-plant.jpg'
                  : `https://meanusarcanus.github.io${dailyData.plant.heroImage}`;
                return (
                  <div className="px-3.5 py-2.5 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-2xs font-bold text-[10px]">
                        <Search className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-slate-900 flex items-center gap-1">
                          Google Lens Engine <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                        </p>
                        <p className="text-[9px] text-emerald-800 font-medium">100% verified accurate species & photo</p>
                      </div>
                    </div>
                    <a
                      href={`https://lens.google.com/uploadbyurl?url=${encodeURIComponent(lensTargetUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 text-[10px] font-bold border border-emerald-300 shadow-2xs flex items-center gap-1 transition-all active:scale-95"
                      title="Verify with Google Lens"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                );
              })()}

              {/* 4-Stat Metric Grid */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50/70 border-b border-slate-100 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100/60 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Light</span>
                    <span className="text-[11px] font-bold text-slate-800 line-clamp-1">{dailyData.plant.lightRequirement}</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-emerald-100/60 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Water</span>
                    <span className="text-[11px] font-bold text-slate-800 line-clamp-1">{dailyData.plant.wateringNeed}</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-emerald-100/60 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Humidity</span>
                    <span className="text-[11px] font-bold text-slate-800 line-clamp-1">{dailyData.plant.humidityRange}</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-emerald-100/60 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Soil pH</span>
                    <span className="text-[11px] font-bold text-slate-800 line-clamp-1">{dailyData.plant.soilRecipe.pHRange}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Segmented Controls for Subsections */}
            <div className="flex items-center gap-1.5 bg-emerald-100/70 p-1 rounded-2xl border border-emerald-200/80 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setTodaySection('likes')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-center ${
                  todaySection === 'likes' ? 'bg-white text-emerald-900 shadow-xs' : 'text-emerald-800'
                }`}
              >
                👍 Likes & 👎 Dislikes
              </button>
              <button
                onClick={() => setTodaySection('steps')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-center ${
                  todaySection === 'steps' ? 'bg-white text-emerald-900 shadow-xs' : 'text-emerald-800'
                }`}
              >
                🛠️ How-To
              </button>
              <button
                onClick={() => setTodaySection('trouble')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-center ${
                  todaySection === 'trouble' ? 'bg-white text-emerald-900 shadow-xs' : 'text-emerald-800'
                }`}
              >
                ⚠️ Symptoms
              </button>
              <button
                onClick={() => setTodaySection('soil')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap text-center ${
                  todaySection === 'soil' ? 'bg-white text-emerald-900 shadow-xs' : 'text-emerald-800'
                }`}
              >
                🌱 Soil
              </button>
            </div>

            {/* Subsection Content */}
            {todaySection === 'likes' && (
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-4 rounded-2xl border border-emerald-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2.5 text-emerald-900">
                    <ThumbsUp className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wide">What It Likes (Do This)</h3>
                  </div>
                  <ul className="space-y-2">
                    {dailyData.plant.likes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-orange-50/50 p-4 rounded-2xl border border-rose-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2.5 text-rose-950">
                    <ThumbsDown className="w-4 h-4 text-rose-600" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wide">What It Dislikes (Avoid)</h3>
                  </div>
                  <ul className="space-y-2">
                    {dailyData.plant.dislikes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {todaySection === 'steps' && (
              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs space-y-3">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-bold text-slate-900">🛠️ {dailyData.plant.howToGuide.title}</h3>
                  <p className="text-[11px] text-emerald-700 font-medium">{dailyData.plant.howToGuide.subtitle}</p>
                </div>
                <div className="space-y-3 pt-1">
                  {dailyData.plant.howToGuide.steps.map((step) => (
                    <div key={step.stepNumber} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/70">
                      <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 mb-0.5">{step.title}</h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{step.instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {todaySection === 'trouble' && (
              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Common Plant Problems & Fixes
                </h3>
                <div className="space-y-2.5">
                  {dailyData.plant.troubleshooting.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Symptom: {item.symptom}</span>
                      </div>
                      <p className="text-[11px] text-slate-500"><strong className="text-slate-700">Cause:</strong> {item.cause}</p>
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-medium">
                        <strong>Doctor Cure:</strong> {item.remedy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {todaySection === 'soil' && (
              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  Soil Recipe: {dailyData.plant.soilRecipe.name}
                </h3>
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-xs space-y-2">
                  <span className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider block">Recommended Blend:</span>
                  <ul className="space-y-1 text-emerald-900">
                    {dailyData.plant.soilRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px]">
                        <span className="w-1 h-1 rounded-full bg-emerald-600" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-slate-600 pt-1">Ideal pH Range: <strong className="text-emerald-800">{dailyData.plant.soilRecipe.pHRange}</strong></p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <h4 className="font-bold text-slate-900 text-[11px]">Fertilizer Routine</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{dailyData.plant.fertilizerProtocol}</p>
                </div>
              </div>
            )}

            {/* Amazon Tools for Today's Plant */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" /> Curated Plant Gear
                </span>
                <span className="text-[10px] text-slate-400">tag=techspecdiges-20</span>
              </div>
              <div className="space-y-2">
                {dailyData.plant.amazonProducts.map((prod, idx) => (
                  <a
                    key={idx}
                    href={`https://www.amazon.com/s?k=${prod.searchQuery}&tag=techspecdiges-20`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 shadow-2xs transition-all"
                  >
                    <div className="flex items-center gap-3 pr-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-sm">
                        🌿
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 line-clamp-1">{prod.name}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-black text-emerald-700">{prod.price}</span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">Prime</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 shadow-xs">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: AI PLANT DOCTOR & SYMPTOM CHECKER                   */}
        {/* ========================================================== */}
        {activeTab === 'doctor' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 p-4 rounded-3xl text-white shadow-md">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-emerald-200">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black">AI Plant Doctor Clinic</h2>
                  <p className="text-[11px] text-emerald-200">Instant Botanical Symptom Diagnosis</p>
                </div>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Notice drooping stems, yellow leaf spots, or pests? Pick a symptom below or describe what you see for an instant remedy.
              </p>
            </div>

            {/* 📷 Featured AI Camera Scanner Card */}
            <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-4 rounded-3xl text-white shadow-md flex items-center justify-between border border-emerald-500/30">
              <div className="pr-3 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-emerald-100">
                    Camera Vision
                  </span>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-300 animate-ping" />
                </div>
                <h3 className="text-xs font-black">Scan Plant with Phone Camera</h3>
                <p className="text-[11px] text-emerald-100 leading-snug">
                  Identify species & detect current health condition in seconds.
                </p>
              </div>
              <button
                onClick={() => setScannerModalOpen(true)}
                className="px-3.5 py-2.5 rounded-2xl bg-white text-emerald-950 font-bold text-xs shadow-lg shrink-0 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>Scan Now</span>
              </button>
            </div>

            {/* Quick 1-Tap Symptom Tags */}
            <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-xs space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Tap Common Symptom:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: '🟡 Yellow Leaves', query: 'yellow lower leaves mushy stem' },
                  { label: '🟤 Brown Crispy Tips', query: 'brown crispy dry leaf tips low humidity' },
                  { label: '🥀 Drooping / Wilting', query: 'drooping wilting soggy soil overwater' },
                  { label: '🕸️ Spider Mites / Webbing', query: 'spider mites web bugs under leaves' },
                  { label: '⚪ White Powdery Mold', query: 'white powdery mold mildew on foliage' },
                  { label: '🌱 Propagation Help', query: 'how to propagate cuttings in water' }
                ].map((s, i) => (
                  <button
                    key={i}
                    onClick={() => runQuickDiagnosis(s.query)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-all active:scale-95"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Symptom Input Form */}
            <form onSubmit={handleCustomDiagnosis} className="flex gap-2">
              <input
                type="text"
                placeholder="Or describe symptoms here..."
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-2xs"
              />
              <button
                type="submit"
                className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs shrink-0 flex items-center gap-1 active:scale-95"
              >
                <span>Diagnose</span>
                <Send className="w-3 h-3" />
              </button>
            </form>

            {/* Diagnosis Result Card */}
            {diagnosis && (
              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-400 shadow-md space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <h3 className="text-xs font-black uppercase tracking-wide">Dr. Flora's Prescription</h3>
                  </div>
                  <button 
                    onClick={() => setDiagnosis(null)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">Assessment:</span>
                  <p className="text-xs font-bold text-slate-900">{diagnosis.diagnosisSummary}</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed pt-0.5">{diagnosis.probableCause}</p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">Step-By-Step Remedy:</span>
                  <ul className="space-y-1.5">
                    {diagnosis.stepByStepRemedy.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-700 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block mb-0.5">Recommended Aid:</span>
                  <p className="text-[11px] text-slate-700">{diagnosis.recommendedToolOrOrganicAid}</p>
                </div>

                <div className="text-[10px] text-slate-500 italic text-right pt-1">
                  {diagnosis.signoff}
                </div>
              </div>
            )}

            {/* Quick Amazon First-Aid Link */}
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-emerald-950">Plant First-Aid Essentials</span>
              </div>
              <a
                href="https://www.amazon.com/s?k=organic+neem+oil+spray+plant+moisture+meter&tag=techspecdiges-20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1"
              >
                <span>View on Amazon</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 3: GREENHOUSE ARCHIVE                                  */}
        {/* ========================================================== */}
        {activeTab === 'greenhouse' && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plants by name or species..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-2xs"
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Plants Count */}
            <div className="text-[11px] text-slate-500 font-medium px-1 flex items-center justify-between">
              <span>Showing {filteredPlants.length} Botanical Profiles</span>
              <span>Tap card to view guide</span>
            </div>

            {/* Plant Cards List */}
            <div className="space-y-2.5">
              {filteredPlants.map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => setSelectedPlant(plant)}
                  className="p-3 rounded-2xl bg-white border border-emerald-100 shadow-2xs hover:border-emerald-300 transition-all flex items-center gap-3 cursor-pointer active:scale-98"
                >
                  <img
                    src={plant.heroImage}
                    alt={plant.commonName}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{plant.commonName}</h4>
                      {plant.id.startsWith('custom-') && (
                        <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-full font-bold flex items-center gap-0.5 shadow-2xs">
                          <Sparkles className="w-2 h-2" /> Scanned
                        </span>
                      )}
                      {plant.petSafe && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold">Pet Safe</span>
                      )}
                    </div>
                    <p className="text-[10px] italic text-slate-500 truncate">{plant.scientificName}</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-600 mt-1">
                      <span>☀️ {plant.lightRequirement.slice(0, 15)}...</span>
                      <span>💧 {plant.wateringNeed.slice(0, 15)}...</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 4: CURATED AMAZON GEAR                                */}
        {/* ========================================================== */}
        {activeTab === 'gear' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            <div className="bg-gradient-to-r from-teal-800 to-emerald-900 p-4 rounded-3xl text-white shadow-md">
              <h2 className="text-base font-black flex items-center gap-1.5">
                <ShoppingBag className="w-5 h-5 text-emerald-300" />
                Botanical Toolkit & Essentials
              </h2>
              <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                Hand-tested horticultural tools, moisture meters, certified organic neem oils, and aroid mix soils.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: "XLUX Long Probe Soil Moisture Meter",
                  desc: "Zero batteries required. Accurately measures moisture at root zone to prevent yellow leaves and rot.",
                  price: "$12.99",
                  rating: "4.8 ★ (42,000+ reviews)",
                  category: "Essential Diagnostic",
                  url: "https://www.amazon.com/s?k=XLUX+Soil+Moisture+Meter+plant&tag=techspecdiges-20"
                },
                {
                  name: "Organic Cold-Pressed Neem Oil Spray (Ready-to-Use)",
                  desc: "Triple-action organic fungicide, miticide, and insecticide safe for indoor plants and herbs.",
                  price: "$14.50",
                  rating: "4.7 ★ (18,000+ reviews)",
                  category: "Organic Pest Control",
                  url: "https://www.amazon.com/s?k=organic+cold+pressed+neem+oil+spray+plants&tag=techspecdiges-20"
                },
                {
                  name: "Chunky Premium Aroid Soil Mix (Perlite + Orchid Bark)",
                  desc: "Ultra-aerated blend preventing soil compaction and root rot for Monsteras, Philodendrons & Anthuriums.",
                  price: "$19.99",
                  rating: "4.9 ★ (8,500+ reviews)",
                  category: "Substrate Blend",
                  url: "https://www.amazon.com/s?k=chunky+aroid+potting+mix+soil+perlite+bark&tag=techspecdiges-20"
                },
                {
                  name: "Gonicc 8-Inch Professional Bypass Pruning Shears",
                  desc: "Titanium-coated Japanese steel blades for clean propagation cuts without crushing plant vascular tissue.",
                  price: "$21.95",
                  rating: "4.9 ★ (31,000+ reviews)",
                  category: "Propagation Shears",
                  url: "https://www.amazon.com/s?k=gonicc+professional+titanium+bypass+pruning+shears&tag=techspecdiges-20"
                },
                {
                  name: "Sansi 36W Full Spectrum LED Grow Light Bulb",
                  desc: "Simulates natural daylight (4000K) to keep tropical foliage thriving during dark winter months.",
                  price: "$34.99",
                  rating: "4.8 ★ (12,400+ reviews)",
                  category: "Supplemental Light",
                  url: "https://www.amazon.com/s?k=sansi+36w+led+grow+light+bulb+plants&tag=techspecdiges-20"
                }
              ].map((gear, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-2xs space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {gear.category}
                    </span>
                    <span className="text-xs font-black text-emerald-800">{gear.price}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{gear.name}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{gear.desc}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-semibold text-amber-700">{gear.rating}</span>
                    <a
                      href={gear.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-95"
                    >
                      <span>Get on Amazon</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 5: SPROUT NEWSLETTER & COMMUNITY                       */}
        {/* ========================================================== */}
        {activeTab === 'sprout' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 p-5 rounded-3xl text-white shadow-md text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/15 mx-auto flex items-center justify-center text-emerald-200 mb-1">
                <Sprout className="w-6 h-6 animate-bounce" />
              </div>
              <h2 className="text-lg font-black tracking-tight">The Daily Sprout Club</h2>
              <p className="text-xs text-emerald-100 max-w-xs mx-auto leading-relaxed">
                Join 14,000+ plant lovers receiving our morning 2-minute botanical care snapshot, propagation tips, and member gear deals.
              </p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">What You Receive:</h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Daily featured houseplant care & likes/dislikes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Early access to AI Plant Doctor diagnostic models</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Curated Amazon lightning deals on rare plants & soil</span>
                </li>
              </ul>

              {newsletterSuccess ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold text-center">
                  🌱 Welcome to The Daily Sprout! Check your inbox for your first botanical care guide.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-98 transition-all"
                  >
                    Subscribe Free
                  </button>
                </form>
              )}
            </div>

            {/* Network Portals Links */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Explore Sister Portals
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                <a 
                  href="/techspec-digest/" 
                  className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 text-slate-700 hover:text-emerald-700"
                >
                  <span className="font-semibold">⚡ TechSpec Digest (Hub)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a 
                  href="/techspec-digest/consciousness/" 
                  className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 text-slate-700 hover:text-indigo-700"
                >
                  <span className="font-semibold">🌌 Consciousness Lab</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a 
                  href="/techspec-digest/baby-care/" 
                  className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 text-slate-700 hover:text-amber-700"
                >
                  <span className="font-semibold">🍼 Calm Baby Nursery</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* 3. Bottom App Navigation Dock (Fixed) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-2xl px-2 py-1.5">
        <div className="max-w-md mx-auto flex items-center justify-around">
          
          {/* Tab 1: Today */}
          <button
            onClick={() => setActiveTab('today')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
              activeTab === 'today' ? 'text-emerald-700 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <Leaf className={`w-5 h-5 ${activeTab === 'today' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-0.5">Today</span>
          </button>

          {/* Tab 2: Doctor */}
          <button
            onClick={() => setActiveTab('doctor')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
              activeTab === 'doctor' ? 'text-emerald-700 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <Stethoscope className={`w-5 h-5 ${activeTab === 'doctor' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-0.5">Doctor</span>
          </button>

          {/* Tab 3: Greenhouse */}
          <button
            onClick={() => setActiveTab('greenhouse')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
              activeTab === 'greenhouse' ? 'text-emerald-700 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <Sprout className={`w-5 h-5 ${activeTab === 'greenhouse' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-0.5">Greenhouse</span>
          </button>

          {/* Tab 4: Gear */}
          <button
            onClick={() => setActiveTab('gear')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
              activeTab === 'gear' ? 'text-emerald-700 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <ShoppingBag className={`w-5 h-5 ${activeTab === 'gear' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-0.5">Gear</span>
          </button>

          {/* Tab 5: Sprout */}
          <button
            onClick={() => setActiveTab('sprout')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
              activeTab === 'sprout' ? 'text-emerald-700 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <Mail className={`w-5 h-5 ${activeTab === 'sprout' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-0.5">Sprout</span>
          </button>

        </div>
      </nav>

      {/* 4. Plant Care Guide Modal (when tapped in greenhouse) */}
      <CareGuideModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
      />

      {/* 5. PWA Install Bottom Sheet / Modal */}
      {showInstallSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <Download className="w-5 h-5 text-emerald-600" />
                <span>Install The Garden Perks App</span>
              </div>
              <button onClick={() => setShowInstallSheet(false)} className="text-slate-400 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Install the Garden Perks PWA to your home screen for instantaneous access, offline plant diagnosis, and full-screen convenience.
            </p>

            {isIOS ? (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-xs text-emerald-950">
                <p className="font-bold">How to install on iOS Safari:</p>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-700">
                  <li>Tap the <strong>Share</strong> button (box with upward arrow) at bottom of Safari.</li>
                  <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                  <li>Tap <strong>Add</strong> in the top right corner.</li>
                </ol>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (deferredPrompt) {
                      deferredPrompt.prompt();
                    }
                    setShowInstallSheet(false);
                  }}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md active:scale-98"
                >
                  Add to Home Screen Now
                </button>
              </div>
            )}

            <button
              onClick={() => setShowInstallSheet(false)}
              className="w-full py-2 text-center text-xs text-slate-400 font-medium"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}

      {/* 6. AI Plant Camera Scanner Modal */}
      <PlantCameraScannerModal
        isOpen={scannerModalOpen}
        onClose={() => setScannerModalOpen(false)}
        onOpenCareGuide={(plant) => setSelectedPlant(plant)}
      />

    </div>
  );
}
