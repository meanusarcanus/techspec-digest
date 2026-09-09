'use client';

import React, { useState } from 'react';
import { 
  Sun, Droplets, Wind, ShieldAlert, ShieldCheck, 
  ThumbsUp, ThumbsDown, CheckCircle2, AlertTriangle, 
  HelpCircle, Wrench, Sparkles, BookOpen, Layers
} from 'lucide-react';
import { PlantCareGuide } from '../data/plantCareGuides';
import AmazonProductCard from './AmazonProductCard';

interface TodayPlantHeroProps {
  plant: PlantCareGuide;
  formattedDate: string;
}

export default function TodayPlantHero({ plant, formattedDate }: TodayPlantHeroProps) {
  const [activeTab, setActiveTab] = useState<'likes-dislikes' | 'how-to' | 'troubleshooting' | 'soil-recipe'>('likes-dislikes');

  return (
    <section className="relative overflow-hidden pt-6 pb-16">
      
      {/* Date & Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Botanical Spotlight • {formattedDate}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {plant.commonName}
        </h1>
        <p className="text-sm sm:text-base font-serif italic text-emerald-700 mt-1 font-medium">
          {plant.scientificName} • Family: {plant.family}
        </p>
        <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
          {plant.shortHook}
        </p>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: High-Res Hero Image & Quick Care Badges (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-slate-100 group">
            <img 
              src={plant.heroImage} 
              alt={plant.commonName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
            
            {/* Category & Pet-Safety Floating Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider bg-white/95 text-emerald-900 backdrop-blur-md rounded-xl shadow-lg border border-emerald-100">
                🌿 {plant.category}
              </span>
              
              {plant.petSafe ? (
                <span className="px-3 py-1.5 text-xs font-bold bg-emerald-500/90 text-white backdrop-blur-md rounded-xl shadow-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pet-Safe Non-Toxic</span>
                </span>
              ) : (
                <span className="px-3 py-1.5 text-xs font-bold bg-amber-500/90 text-white backdrop-blur-md rounded-xl shadow-lg flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Toxic to Pets</span>
                </span>
              )}
            </div>

            {/* Bottom Caption on Image */}
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold block mb-1">
                Care Level
              </span>
              <p className="text-lg font-bold">
                {plant.difficulty}
              </p>
            </div>
          </div>

          {/* Quick Care Matrix Tiles */}
          <div className="grid grid-cols-2 gap-3.5">
            
            <div className="bg-white p-4 rounded-2xl border border-emerald-100/80 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Light</span>
                <span className="text-xs font-bold text-slate-800">{plant.lightRequirement}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-100/80 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Water</span>
                <span className="text-xs font-bold text-slate-800">{plant.wateringNeed}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-100/80 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Humidity</span>
                <span className="text-xs font-bold text-slate-800">{plant.humidityRange}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-100/80 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Soil pH</span>
                <span className="text-xs font-bold text-slate-800">{plant.soilRecipe.pHRange}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right: In-Depth Care Guide & Interactive Tabs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Botanical Overview */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-emerald-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Botanical Background & Natural Habitat</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {plant.overview}
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-emerald-100/60 rounded-2xl border border-emerald-200/80 overflow-x-auto">
            <button
              onClick={() => setActiveTab('likes-dislikes')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'likes-dislikes'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-emerald-800 hover:bg-white/50'
              }`}
            >
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
              <span>Likes & Dislikes</span>
            </button>

            <button
              onClick={() => setActiveTab('how-to')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'how-to'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-emerald-800 hover:bg-white/50'
              }`}
            >
              <Wrench className="w-4 h-4 text-emerald-600" />
              <span>How-To Masterclass</span>
            </button>

            <button
              onClick={() => setActiveTab('troubleshooting')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'troubleshooting'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-emerald-800 hover:bg-white/50'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Troubleshooting</span>
            </button>

            <button
              onClick={() => setActiveTab('soil-recipe')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'soil-recipe'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-emerald-800 hover:bg-white/50'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Soil & Fertilizer</span>
            </button>
          </div>

          {/* TAB 1: LIKES & DISLIKES MATRIX */}
          {activeTab === 'likes-dislikes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-300">
              
              {/* LIKES CARD */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-6 rounded-3xl border border-emerald-200/80 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4 text-emerald-900">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <ThumbsUp className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-black tracking-tight">
                    What It LIKES 👍
                  </h4>
                </div>
                <ul className="space-y-3">
                  {plant.likes.map((like, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{like}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DISLIKES CARD */}
              <div className="bg-gradient-to-br from-rose-50 to-orange-50/50 p-6 rounded-3xl border border-rose-200/80 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4 text-rose-950">
                  <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
                    <ThumbsDown className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-black tracking-tight">
                    What It DISLIKES 👎
                  </h4>
                </div>
                <ul className="space-y-3">
                  {plant.dislikes.map((dislike, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                      <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{dislike}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* TAB 2: STEP-BY-STEP HOW-TO GUIDE */}
          {activeTab === 'how-to' && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-emerald-100 shadow-sm space-y-5 animate-in fade-in duration-300">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-base font-bold text-slate-900">
                  🛠️ {plant.howToGuide.title}
                </h4>
                <p className="text-xs text-emerald-600 font-medium mt-0.5">
                  {plant.howToGuide.subtitle}
                </p>
              </div>

              <div className="space-y-4">
                {plant.howToGuide.steps.map((step) => (
                  <div key={step.stepNumber} className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                      {step.stepNumber}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 mb-1">
                        {step.title}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TROUBLESHOOTING SYMPTOMS */}
          {activeTab === 'troubleshooting' && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-emerald-100 shadow-sm space-y-4 animate-in fade-in duration-300">
              <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Symptom Diagnosis & Cure Matrix</span>
              </h4>

              <div className="space-y-3.5">
                {plant.troubleshooting.map((t, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-amber-800">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Symptom: {t.symptom}</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      <strong>Probable Cause:</strong> {t.cause}
                    </p>
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                      <strong>Doctor Remedy:</strong> {t.remedy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SOIL RECIPE & FERTILIZER */}
          {activeTab === 'soil-recipe' && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-emerald-100 shadow-sm space-y-5 animate-in fade-in duration-300">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  🌱 Soil Mix Recipe: {plant.soilRecipe.name}
                </h4>
                <p className="text-xs text-slate-500">
                  Ideal root pH range: <strong>{plant.soilRecipe.pHRange}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                  Mix Ratio by Volume:
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900">
                  {plant.soilRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  🧪 Fertilizer & Feeding Protocol
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {plant.fertilizerProtocol}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Recommended Amazon Companion Gear Section */}
      <div id="gear" className="mt-16 pt-12 border-t border-emerald-100">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
              <span>🛍️ Curated Botanical Gear</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Essential Tools for {plant.commonName}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Affiliate Tag Active: <code className="bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">tag=techspecdiges-20</code>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plant.amazonProducts.map((prod, idx) => (
            <AmazonProductCard key={idx} product={prod} featured={idx === 0} />
          ))}
        </div>
      </div>

    </section>
  );
}
