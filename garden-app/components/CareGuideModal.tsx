'use client';

import React, { useState } from 'react';
import { X, Sun, Droplets, Wind, ShieldCheck, ShieldAlert, ThumbsUp, ThumbsDown, CheckCircle2, AlertTriangle, Layers, BookOpen, Wrench, Sparkles } from 'lucide-react';
import { PlantCareGuide } from '../data/plantCareGuides';
import AmazonProductCard from './AmazonProductCard';

interface CareGuideModalProps {
  plant: PlantCareGuide | null;
  onClose: () => void;
}

export default function CareGuideModal({ plant, onClose }: CareGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'how-to' | 'troubleshooting' | 'gear'>('overview');

  if (!plant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-emerald-100 my-8 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                🌿 {plant.category}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                • {plant.difficulty}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {plant.commonName}
            </h3>
            <p className="text-xs text-emerald-600 font-serif italic">
              {plant.scientificName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-700 shadow-sm border border-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center gap-2.5">
              <Sun className="w-4 h-4 text-amber-500" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Light</span>
                <span className="text-xs font-bold text-slate-800">{plant.lightRequirement}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center gap-2.5">
              <Droplets className="w-4 h-4 text-blue-500" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Water</span>
                <span className="text-xs font-bold text-slate-800">{plant.wateringNeed}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center gap-2.5">
              <Wind className="w-4 h-4 text-teal-500" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Humidity</span>
                <span className="text-xs font-bold text-slate-800">{plant.humidityRange}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center gap-2.5">
              {plant.petSafe ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Pets</span>
                    <span className="text-xs font-bold text-emerald-700">Pet-Safe</span>
                  </div>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Pets</span>
                    <span className="text-xs font-bold text-amber-700">Toxic</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Likes & Dislikes Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4 text-emerald-600" />
                <span>What It Likes 👍</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {plant.likes.map((l, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-3">
              <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                <ThumbsDown className="w-4 h-4 text-rose-600" />
                <span>What It Dislikes 👎</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {plant.dislikes.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How-To Steps */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-emerald-600" />
              <span>{plant.howToGuide.title}</span>
            </h4>
            <div className="space-y-2.5">
              {plant.howToGuide.steps.map((s) => (
                <div key={s.stepNumber} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100 text-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    {s.stepNumber}
                  </span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">{s.title}</strong>
                    <span className="text-slate-600 leading-relaxed">{s.instruction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Amazon Products */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              🛍️ Companion Amazon Products ({plant.amazonProducts.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {plant.amazonProducts.map((p, idx) => (
                <AmazonProductCard key={idx} product={p} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
