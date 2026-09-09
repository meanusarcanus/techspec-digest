'use client';

import React, { useState } from 'react';
import { Search, Filter, Sprout, ArrowRight, ShieldCheck, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { PlantCareGuide } from '../data/plantCareGuides';
import CareGuideModal from './CareGuideModal';

interface GreenhouseArchiveProps {
  plants: PlantCareGuide[];
}

export default function GreenhouseArchive({ plants }: GreenhouseArchiveProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [petSafeOnly, setPetSafeOnly] = useState(false);
  const [selectedPlantModal, setSelectedPlantModal] = useState<PlantCareGuide | null>(null);

  const categories = ['All', 'Indoor Houseplants', 'Ornamental & Flowering', 'Edible Gardens & Herbs', 'Succulents & Rare Tropicals'];
  const difficulties = ['All', 'Beginner-Friendly', 'Intermediate', 'Plant Connoisseur'];

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = 
      plant.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || plant.difficulty === selectedDifficulty;
    const matchesPetSafe = !petSafeOnly || plant.petSafe;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesPetSafe;
  });

  return (
    <section id="greenhouse" className="pt-8 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-emerald-200">
          <Sprout className="w-4 h-4 text-emerald-600" />
          <span>The Botanical Greenhouse Archive</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore All Botanical Care Guides ({plants.length})
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
          Filter through our complete encyclopedia of houseplants, flowering ornamentals, edible herbs, and exotic succulents.
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm mb-10 space-y-4 px-4 sm:px-6">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search plant by common name, scientific name, or family (e.g. Monstera, Ficus, Orchid)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-slate-50/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                  : 'bg-slate-100 hover:bg-emerald-50 text-slate-700'
              }`}
            >
              {cat === 'All' ? '🌱 All Categories' : cat}
            </button>
          ))}
        </div>

        {/* Secondary Filters (Difficulty & Pet-Safety) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Difficulty:</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer bg-emerald-50/60 px-3.5 py-1.5 rounded-xl border border-emerald-200/80">
            <input
              type="checkbox"
              checked={petSafeOnly}
              onChange={(e) => setPetSafeOnly(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-0"
            />
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Show Pet-Safe Only</span>
          </label>

        </div>

      </div>

      {/* Grid of Filtered Plant Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredPlants.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200">
            <Sprout className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No botanical guides found</h3>
            <p className="text-xs text-slate-400 mt-1">Try resetting your search query or category filters.</p>
          </div>
        ) : (
          filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
            >
              
              {/* Image Banner */}
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <img
                  src={plant.heroImage}
                  alt={plant.commonName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap max-w-[70%]">
                  <span className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-white/95 text-emerald-950 backdrop-blur-md rounded-xl shadow-md">
                    {plant.category}
                  </span>
                  {plant.id.startsWith('custom-') && (
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white rounded-lg shadow-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Scanned Discovery</span>
                    </span>
                  )}
                </div>

                {plant.petSafe ? (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded-xl shadow-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Pet-Safe</span>
                    </span>
                  </div>
                ) : (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-amber-500 text-white rounded-xl shadow-md flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      <span>Toxic</span>
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                    {plant.family}
                  </span>
                  <h4 className="text-base font-bold line-clamp-1">
                    {plant.commonName}
                  </h4>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {plant.shortHook}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-600 font-medium">
                  <div>☀️ {plant.lightRequirement}</div>
                  <div>💧 {plant.wateringNeed}</div>
                </div>

                <button
                  onClick={() => setSelectedPlantModal(plant)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all group-hover:shadow-md"
                >
                  <span>Read Complete Care Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Modal Popup */}
      <CareGuideModal
        plant={selectedPlantModal}
        onClose={() => setSelectedPlantModal(null)}
      />

    </section>
  );
}
