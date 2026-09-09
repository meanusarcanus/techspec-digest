'use client';

import React, { useState } from 'react';
import { Search, Filter, Sprout, ArrowRight, ShieldCheck, ShieldAlert, Sparkles, Check, Globe, X } from 'lucide-react';
import { PlantCareGuide } from '../data/plantCareGuides';
import CareGuideModal from './CareGuideModal';
import { searchBotanicalWebImage, confirmAndSaveWebPlant, BotanicalWebResult } from '../lib/botanicalWebEngine';

interface GreenhouseArchiveProps {
  plants: PlantCareGuide[];
}

export default function GreenhouseArchive({ plants }: GreenhouseArchiveProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [petSafeOnly, setPetSafeOnly] = useState(false);
  const [selectedPlantModal, setSelectedPlantModal] = useState<PlantCareGuide | null>(null);

  // Web search & user confirmation state
  const [isSearchingWeb, setIsSearchingWeb] = useState(false);
  const [webSearchResult, setWebSearchResult] = useState<BotanicalWebResult | null>(null);
  const [webSearchAttempted, setWebSearchAttempted] = useState(false);
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const [addedNotification, setAddedNotification] = useState<string | null>(null);

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

  const handleTriggerWebSearch = async (termToSearch?: string) => {
    const term = (termToSearch || searchQuery).trim();
    if (!term) return;

    setIsSearchingWeb(true);
    setWebSearchResult(null);
    setWebSearchAttempted(false);
    setAddedNotification(null);

    try {
      const result = await searchBotanicalWebImage(term);
      setWebSearchResult(result);
      setWebSearchAttempted(true);
    } catch (err) {
      console.error('Web botanical search error:', err);
      setWebSearchResult(null);
      setWebSearchAttempted(true);
    } finally {
      setIsSearchingWeb(false);
    }
  };

  const handleConfirmAddWebPlant = async () => {
    if (!webSearchResult) return;
    setIsAddingPlant(true);
    try {
      const newGuide = await confirmAndSaveWebPlant(webSearchResult);
      setAddedNotification(`"${newGuide.commonName}" confirmed & added to your Greenhouse Catalogue!`);
      setWebSearchResult(null);
      setWebSearchAttempted(false);
      setSearchQuery('');
      setSelectedCategory('All');
      // Immediately open the newly generated care guide for the user to enjoy
      setSelectedPlantModal(newGuide);
      setTimeout(() => setAddedNotification(null), 6000);
    } catch (err) {
      console.error('Failed to add plant to catalog:', err);
    } finally {
      setIsAddingPlant(false);
    }
  };

  const handleCancelConfirmation = () => {
    setWebSearchResult(null);
    setWebSearchAttempted(false);
  };

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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (webSearchResult || webSearchAttempted) {
                setWebSearchResult(null);
                setWebSearchAttempted(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && filteredPlants.length === 0 && searchQuery.trim()) {
                e.preventDefault();
                handleTriggerWebSearch();
              }
            }}
            placeholder="Search plant by common name, scientific name, or family (e.g. Monstera, Ficus, Orchid)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-slate-50/50"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setWebSearchResult(null);
                setWebSearchAttempted(false);
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
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
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
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

      {/* Success Notification Banner */}
      {addedNotification && (
        <div className="max-w-6xl mx-auto mb-6 px-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{addedNotification}</span>
            </div>
            <button 
              onClick={() => setAddedNotification(null)}
              className="text-emerald-700 hover:text-emerald-950 text-[11px] underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Interactive Web Confirmation Card (Visible when web search returns a candidate) */}
      {webSearchResult && (
        <div className="max-w-6xl mx-auto mb-8 px-4">
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 md:p-8 border-2 border-emerald-400 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-3 border-b border-emerald-500/20 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/90 text-emerald-300 text-[11px] font-black uppercase tracking-wider border border-emerald-400/40">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Botanical Web Specimen Found</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black mt-2 text-white">
                  Is this what you're looking for?
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  We found this specimen in botanical archives. Confirm below to add its studio photography & complete care profile to your catalogue.
                </p>
              </div>
            </div>

            {/* Specimen Preview Card */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-black/40 p-4 sm:p-5 rounded-2xl border border-emerald-500/30">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-400/40 shadow-lg bg-slate-800">
                <img
                  src={webSearchResult.imageUrl}
                  alt={webSearchResult.commonName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-[9px] font-bold text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-400/30">
                  Studio Photo
                </div>
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-emerald-200">
                    {webSearchResult.commonName}
                  </h4>
                  <p className="text-xs sm:text-sm italic text-slate-300 font-serif">
                    {webSearchResult.scientificName}
                  </p>
                </div>

                <div className="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
                  Family: {webSearchResult.family}
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 sm:line-clamp-4 leading-relaxed">
                  {webSearchResult.description}
                </p>
              </div>
            </div>

            {/* Confirmation Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancelConfirmation}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition-all cursor-pointer text-center"
              >
                ✕ No, not this one
              </button>
              <button
                type="button"
                onClick={handleConfirmAddWebPlant}
                disabled={isAddingPlant}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 active:scale-98 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAddingPlant ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Compiling Care Guide & Adding...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Yes, Add to Catalogue</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Web Prompt if Results Exist but user wants to search web */}
      {filteredPlants.length > 0 && searchQuery.trim().length > 1 && !webSearchResult && !isSearchingWeb && (
        <div className="max-w-6xl mx-auto mb-4 px-4 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredPlants.length} catalogue results</span>
          <button
            onClick={() => handleTriggerWebSearch()}
            className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>Don't see your plant? Search web for "{searchQuery}"</span>
          </button>
        </div>
      )}

      {/* Grid of Filtered Plant Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredPlants.length === 0 ? (
          isSearchingWeb ? (
            <div className="col-span-full py-16 px-6 bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl border border-emerald-500/40 text-center shadow-xl space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full border-2 border-emerald-400/40 border-t-emerald-300 animate-spin mx-auto" />
              <h3 className="text-base font-bold text-emerald-100">
                Searching Global Botanical Web Archives...
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Searching Wikipedia and Wikimedia Commons for authentic records and photography of <span className="text-emerald-300 font-bold">"{searchQuery}"</span>...
              </p>
            </div>
          ) : webSearchAttempted && !webSearchResult ? (
            <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 px-4 space-y-3">
              <Sprout className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Web Matches Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                We couldn't find a botanical profile on the web for <span className="font-semibold text-slate-700">"{searchQuery}"</span>. Try checking the spelling or typing the scientific name.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setWebSearchAttempted(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : searchQuery.trim().length > 0 ? (
            <div className="col-span-full py-12 px-6 bg-gradient-to-br from-slate-50 to-emerald-50/60 rounded-3xl border-2 border-dashed border-emerald-300 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                "{searchQuery}" is not in your current catalogue
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Would you like Dr. Flora to search the botanical web archives for this plant, preview its verified photo, and add it to your Greenhouse?
              </p>
              <button
                onClick={() => handleTriggerWebSearch()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>Search Botanical Web for "{searchQuery}"</span>
              </button>
            </div>
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200">
              <Sprout className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700">No botanical guides found</h3>
              <p className="text-xs text-slate-400 mt-1">Try resetting your search query or category filters.</p>
            </div>
          )
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
