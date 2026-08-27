'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, Zap, ShieldAlert, Cpu, Orbit, Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProductItem {
  id: string;
  title: string;
  category: string;
  description: string;
  rating: string;
  priceRange: string;
  tag: string;
  link: string;
}

const SAMPLE_PRODUCTS: ProductItem[] = [
  {
    id: '1',
    title: 'Muse 2 Brain-Sensing EEG Headband',
    category: 'Neurotech & EEG',
    description: 'Real-time EEG neurofeedback measuring brainwaves, heart rate, and breath during meditation.',
    rating: '4.8 ★',
    priceRange: '$249 - $299',
    tag: 'Neurofeedback',
    link: '/#hero-product',
  },
  {
    id: '2',
    title: 'Kasina Deep Vision Light & Sound Mind Machine',
    category: 'Light & Sound Baths',
    description: 'Binaural beats, micro-pulsing light goggles, and audio-visual entrainment for altered states.',
    rating: '4.9 ★',
    priceRange: '$379',
    tag: 'Entrainment',
    link: '#',
  },
  {
    id: '3',
    title: 'Copper Pyramid Energy Meditation Canopy',
    category: 'Sacred Geometry',
    description: 'Precision Giza-proportioned copper pyramid generator for bio-field enhancement & grounding.',
    rating: '4.7 ★',
    priceRange: '$189',
    tag: 'Sacred Geometry',
    link: '#',
  },
  {
    id: '4',
    title: 'Sensate 2 Vagus Nerve Bio-Acoustic Resonator',
    category: 'Bio-Resonance',
    description: 'Infrasonic bone-conduction resonance targeting the vagal tone for rapid nervous system calming.',
    rating: '4.8 ★',
    priceRange: '$299',
    tag: 'Vagus Nerve',
    link: '#',
  },
  {
    id: '5',
    title: 'Ormus Monatomic Gold Etheric Elixir',
    category: 'Monatomic & Bio-Resonance',
    description: 'High-spin dead sea mineral extract for pineal gland activation and subtle body alignment.',
    rating: '4.6 ★',
    priceRange: '$45 - $85',
    tag: 'Ormus',
    link: '#',
  },
  {
    id: '6',
    title: 'MindPlace Limina Audio-Visual Frequency Synthesizer',
    category: 'Brainwave Entrainment',
    description: 'Customizable binaural frequency engine with full RGB light stimulation for deep delta/theta states.',
    rating: '4.9 ★',
    priceRange: '$289',
    tag: 'Solfeggio',
    link: '#',
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'Neurotech & EEG', 'Light & Sound Baths', 'Sacred Geometry', 'Brainwave Entrainment', 'Monatomic & Bio-Resonance'];

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesQuery =
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.tag.toLowerCase().includes(query.toLowerCase());
    const matchesCat = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md transition-opacity">
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-[#0B0F19]/95 border border-amber-500/30 shadow-2xl shadow-amber-500/10 overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-5 py-4 border-b border-indigo-500/20 bg-indigo-950/30">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, frequency generators, EEG, sacred geometry..."
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-400 text-base focus:outline-none focus:ring-0"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-white/5 transition-colors ml-2"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 px-5 py-3 overflow-x-auto border-b border-white/5 bg-[#0B0F19]/80 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/20'
                  : 'bg-indigo-950/40 text-slate-400 border border-indigo-500/20 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <a
                key={item.id}
                href={item.link}
                onClick={onClose}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/10 hover:border-amber-500/40 hover:bg-indigo-900/30 transition-all cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20">
                      {item.tag}
                    </span>
                    <span className="text-xs text-indigo-300 font-medium">{item.category}</span>
                  </div>
                  <h4 className="text-base font-semibold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="text-right">
                    <span className="block text-xs font-bold text-amber-400">{item.priceRange}</span>
                    <span className="block text-[10px] text-slate-400">{item.rating}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-400 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="text-center py-12 space-y-2">
              <Sparkles className="w-8 h-8 text-amber-400/50 mx-auto animate-pulse" />
              <p className="text-slate-300 text-sm font-medium">No consciousness tools match your search.</p>
              <p className="text-slate-500 text-xs">Try searching for &quot;EEG&quot;, &quot;Pyramid&quot;, &quot;Solfeggio&quot; or &quot;Vagus&quot;.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-indigo-500/20 bg-indigo-950/40 text-xs text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Orbit className="w-3.5 h-3.5 text-amber-400" /> Products of Consciousness Index
          </span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-indigo-900/60 rounded text-[10px] text-amber-300">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
