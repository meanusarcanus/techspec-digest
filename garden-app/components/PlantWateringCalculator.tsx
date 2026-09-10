'use client';

import React, { useState } from 'react';
import { Droplets, Sparkles, Sun, ShieldCheck, ShoppingBag, ArrowRight, RotateCcw, Info } from 'lucide-react';

export default function PlantWateringCalculator() {
  const [plantType, setPlantType] = useState('aroid');
  const [potSize, setPotSize] = useState('8');
  const [potMaterial, setPotMaterial] = useState('terracotta');
  const [lightLevel, setLightLevel] = useState('bright-indirect');
  const [season, setSeason] = useState('spring-summer');

  const calculateSchedule = () => {
    let baseDays = 7;
    let waterVolume = '400 - 550 ml';
    let soilThreshold = 'Top 2 inches dry';
    let tip = 'Ensure pot drains completely; never leave standing water in the drainage tray.';
    let recommendedProduct = '3-in-1 Soil Moisture, Light & pH Meter';
    let productSearch = 'Soil+Moisture+Meter+Indoor+Plants';

    // Plant Type Adjustments
    if (plantType === 'succulent') {
      baseDays = 16;
      waterVolume = '150 - 250 ml';
      soilThreshold = '100% bone-dry throughout entire pot';
      tip = 'Succulents store water in fleshy leaves. When in doubt, wait another 3-4 days before watering.';
      recommendedProduct = 'Fast-Draining Gritty Succulent & Cactus Soil Mix';
      productSearch = 'Gritty+Succulent+Cactus+Soil+Mix+Pumice';
    } else if (plantType === 'calathea') {
      baseDays = 5;
      waterVolume = '350 - 500 ml';
      soilThreshold = 'Top 0.5 inches dry (consistently moist)';
      tip = 'Calatheas are sensitive to mineral salts; use distilled or filtered rainwater exclusively.';
      recommendedProduct = 'Ultrasonic Cool Mist Botanical Humidifier (65% RH)';
      productSearch = 'Ultrasonic+Cool+Mist+Humidifier+Plants';
    } else if (plantType === 'ficus') {
      baseDays = 8;
      waterVolume = '600 - 800 ml';
      soilThreshold = 'Top 2-3 inches dry';
      tip = 'Water thoroughly until water flows out the drainage holes, then discard runoff after 15 mins.';
      recommendedProduct = 'Specialized NPK 3-1-2 Fiddle Leaf Fig Liquid Food';
      productSearch = 'Fiddle+Leaf+Fig+Plant+Food+Fertilizer';
    } else if (plantType === 'edible') {
      baseDays = 3;
      waterVolume = '500 - 700 ml';
      soilThreshold = 'Top 1 inch dry';
      tip = 'Herbs and vegetables transpire rapidly in high light; check soil moisture daily during heatwaves.';
      recommendedProduct = 'Organic Tomato-Tone & Herb Liquid Kelp Fertilizer';
      productSearch = 'Espoma+Organic+Tomato+Tone+Fertilizer';
    }

    // Pot Material Adjustments
    if (potMaterial === 'terracotta') {
      baseDays = Math.max(2, baseDays - 2); // Terracotta breathes and dries faster
    } else if (potMaterial === 'plastic') {
      baseDays += 1; // Plastic retains moisture longer
    }

    // Light Adjustments
    if (lightLevel === 'direct-sun') {
      baseDays = Math.max(2, baseDays - 2);
    } else if (lightLevel === 'low-light') {
      baseDays += 3;
    }

    // Season Adjustments
    if (season === 'fall-winter') {
      baseDays += 4;
      tip += ' Reduce watering during winter dormancy as evaporation slows down.';
    }

    return {
      cadence: `Every ${baseDays} to ${baseDays + 2} Days`,
      volume: waterVolume,
      threshold: soilThreshold,
      tip,
      recommendedProduct,
      productSearch
    };
  };

  const result = calculateSchedule();

  return (
    <section id="calculator" className="my-16 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-emerald-200">
            <Droplets className="w-4 h-4 text-emerald-600" />
            <span>Interactive Botanical Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Precision Plant Watering &amp; Soil Calculator
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Eliminate root rot and under-watering guesswork. Calibrate your plant’s exact hydration volume and watering cadence in real time.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-md space-y-6">
            
            {/* Plant Variety */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                1. Plant Variety &amp; Foliage Family
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'aroid', label: '🌿 Aroid / Monstera' },
                  { id: 'ficus', label: '🌳 Ficus / Fiddle Leaf' },
                  { id: 'calathea', label: '🌸 Calathea / Fern' },
                  { id: 'succulent', label: '🌵 Succulent / Snake' },
                  { id: 'edible', label: '🍅 Herbs & Edibles' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPlantType(item.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-left ${
                      plantType === item.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pot Material & Pot Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  2. Pot Material
                </label>
                <select
                  value={potMaterial}
                  onChange={(e) => setPotMaterial(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="terracotta">Unfinished Terracotta (High Porosity)</option>
                  <option value="ceramic">Glazed Ceramic (Medium)</option>
                  <option value="plastic">Plastic Nursery Pot (High Retention)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  3. Pot Diameter Size
                </label>
                <select
                  value={potSize}
                  onChange={(e) => setPotSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="4">Small (4 - 5 inch)</option>
                  <option value="8">Medium (6 - 8 inch)</option>
                  <option value="12">Large (10 - 12+ inch)</option>
                </select>
              </div>
            </div>

            {/* Light Exposure & Season */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  4. Light Exposure
                </label>
                <select
                  value={lightLevel}
                  onChange={(e) => setLightLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="bright-indirect">Bright Indirect (Optimal)</option>
                  <option value="direct-sun">Direct Sunlight / Full Sun</option>
                  <option value="low-light">Low Light / Dim Corner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  5. Current Season
                </label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="spring-summer">Spring / Summer (Active Growth)</option>
                  <option value="fall-winter">Fall / Winter (Dormancy)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Results Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 text-white p-7 sm:p-8 rounded-3xl shadow-xl border border-emerald-800/80 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                  <Droplets className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Calibrated Prescription
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-800/80 text-emerald-200 px-2.5 py-1 rounded-full border border-emerald-700/60">
                Live Dynamic Output
              </span>
            </div>

            {/* Big Cadence Badge */}
            <div className="p-4 rounded-2xl bg-emerald-800/40 border border-emerald-700/50 space-y-1">
              <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider block">
                Recommended Watering Frequency
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-100 tracking-tight flex items-center gap-2">
                <span>{result.cadence}</span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-emerald-400 font-bold block">Water Volume:</span>
                <span className="font-semibold text-slate-100">{result.volume}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-emerald-400 font-bold block">Soil Dryness Check:</span>
                <span className="font-semibold text-slate-100">{result.threshold}</span>
              </div>
            </div>

            {/* Horticultural Guidance */}
            <div className="p-3.5 rounded-xl bg-emerald-900/50 border border-emerald-700/40 text-xs text-emerald-200 leading-relaxed">
              <strong className="text-white block mb-1">🌿 Master Botanist Tip:</strong>
              {result.tip}
            </div>

            {/* Recommended Amazon Tool CTA */}
            <div className="pt-2 border-t border-emerald-800/60 space-y-3">
              <div className="flex items-center justify-between text-xs text-emerald-300">
                <span className="font-semibold">Recommended Monitoring Tool:</span>
              </div>
              <a
                href={`https://www.amazon.com/s?k=${result.productSearch}&tag=techspecdiges-20`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span>Get {result.recommendedProduct} on Amazon</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
