'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  Star,
  ExternalLink,
  SlidersHorizontal,
  ChevronRight,
  Zap,
  Info,
  X,
  Compass,
} from 'lucide-react';

interface ArchiveItem {
  id: string;
  title: string;
  category: 'Neurotech' | 'Light & Sound' | 'Sacred Geometry' | 'Bio-Resonance' | 'Solfeggio & Frequency';
  description: string;
  detailedReview: string;
  price: string;
  rating: number;
  frequency: string;
  tags: string[];
  amazonUrl: string;
  imageAccent: string;
}

const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'kasina-light-machine',
    title: 'Kasina Deep Vision Light & Sound Mind Machine',
    category: 'Light & Sound',
    description: 'Binaural beats, micro-pulsing light goggles, and audio-visual entrainment for altered states of consciousness.',
    detailedReview: 'The Kasina Mind Machine uses precision optical flickering & binaural frequency pulse pairs to guide brainwaves rapidly into theta (meditative) and delta (deep restoration) states without effort.',
    price: '$379.00',
    rating: 4.9,
    frequency: '432 Hz / 528 Hz',
    tags: ['Entrainment', 'Goggles', 'Altered States'],
    amazonUrl: 'https://amazon.com',
    imageAccent: 'from-amber-500/20 to-purple-600/20',
  },
  {
    id: 'copper-pyramid-meditation',
    title: 'Giza Ratio Copper Pyramid Meditation Canopy',
    category: 'Sacred Geometry',
    description: 'Precision Giza-proportioned copper pyramid generator for bio-field enhancement, grounding, and pineal alignment.',
    detailedReview: 'Constructed according to the Golden Ratio (Phi = 1.618), this copper structure concentrates subtle scalar field radiation to deepen meditative stillness and enhance quartz crystal clearing.',
    price: '$189.00',
    rating: 4.8,
    frequency: '7.83 Hz Schumann',
    tags: ['Sacred Geometry', 'Pyramid', 'Bio-Field'],
    amazonUrl: 'https://amazon.com',
    imageAccent: 'from-amber-500/30 to-yellow-600/20',
  },
  {
    id: 'sensate-2-vagus-nerve',
    title: 'Sensate 2 Vagus Nerve Bio-Acoustic Resonator',
    category: 'Bio-Resonance',
    description: 'Infrasonic bone-conduction resonance targeting the vagal nerve tone for rapid autonomic nervous system calming.',
    detailedReview: 'Placed on the sternum, Sensate transmits sub-audible sonic frequencies directly into the chest bone, signaling the vagus nerve to reduce heart rate variability stress within 10 minutes.',
    price: '$299.00',
    rating: 4.8,
    frequency: 'Infrasonic Sub-20Hz',
    tags: ['Vagus Nerve', 'Infrasonic', 'Biohack'],
    amazonUrl: 'https://amazon.com',
    imageAccent: 'from-cyan-500/20 to-indigo-600/20',
  },
  {
    id: 'ormus-monatomic-gold',
    title: 'Etheric Ormus Monatomic Gold Concentrate',
    category: 'Bio-Resonance',
    description: 'High-spin dead sea mineral extract rich in monatomic elements for pineal gland activation and subtle body flow.',
    detailedReview: 'Sourced from pristine ocean salt precipitates using ancient Egyptian wet-method alchemy, Ormus provides high-spin platinum group elements essential for cellular superconductivity.',
    price: '$55.00',
    rating: 4.7,
    frequency: '852 Hz Resonance',
    tags: ['Ormus', 'Monatomic Gold', 'Pineal'],
    amazonUrl: 'https://amazon.com',
    imageAccent: 'from-amber-400/30 to-amber-600/30',
  },
  {
    id: 'mindplace-limina',
    title: 'MindPlace Limina Audio-Visual Frequency Synthesizer',
    category: 'Solfeggio & Frequency',
    description: 'Customizable binaural frequency engine with full RGB light stimulation for deep delta, theta, and gamma wave states.',
    detailedReview: 'Limina combines micro-controlled RGB LED Ganzfeld glasses with high-fidelity audio synthesis, enabling users to program exact Solfeggio frequencies and custom brainwave ramps.',
    price: '$289.00',
    rating: 4.9,
    frequency: 'Full Solfeggio Scale',
    tags: ['Binaural', 'RGB Ganzfeld', 'Gamma Wave'],
    amazonUrl: 'https://amazon.com',
    imageAccent: 'from-purple-500/20 to-amber-500/20',
  },
  {
    id: 'vielight-neuro-alpha',
    title: 'Vielight Neuro Alpha Photobiomodulation Brain Light',
    category: 'Neurotech',
    description: 'Intranasal and transcranial 810nm near-infrared light emitting diodes designed for neural mitochondrial stimulation.',
    detailedReview: 'Pioneering brain photobiomodulation technology pulsing near-infrared light at 10Hz Alpha rhythm to increase ATP production, cerebral blood flow, and cognitive clarity.',
    price: '$1,749.00',
    rating: 5.0,
    frequency: '10 Hz Alpha NIR',
    tags: ['Photobiomodulation', 'NIR', 'Mitochondria'],
    amazonUrl: 'https://amazon.com',
    imageAccent: 'from-rose-500/20 to-indigo-600/20',
  },
  {
    id: 'solfeggio-tuning-forks',
    title: 'Weighted Solfeggio Harmonic Tuning Fork Set',
    category: 'Solfeggio & Frequency',
    description: 'Medical-grade aluminum unweighted and weighted tuning forks calibrated to 432Hz, 528Hz, and 963Hz.',
    detailedReview: 'Hand-crafted acoustic frequency forks used for sound therapy, chakra balancing, acoustic biofield clearing, and deep relaxation.',
    price: '$89.00',
    rating: 4.7,
    frequency: '528 Hz / 963 Hz',
    tags: ['Sound Bath', 'Tuning Forks', 'Chakra'],
    amazonUrl: 'https://amazon.com',
    imageAccent: 'from-emerald-500/20 to-amber-500/20',
  },
  {
    id: 'somavedic-amber',
    title: 'Somavedic Amber Bio-Resonance Energy Field Mitigator',
    category: 'Sacred Geometry',
    description: 'Precious stone and precious metal core emit 3P scalar field frequency neutralizing EMF radiation and geopathic stress.',
    detailedReview: 'Combines hand-blown Bohemian crystal with silver-plated copper geometry and semi-precious stones to harmonize ambient electromagnetic fields across 2,600 sq ft.',
    price: '$2,770.00',
    rating: 4.9,
    frequency: 'Scalar Field Harmonizer',
    tags: ['EMF Shield', 'Crystal Core', 'Scalar'],
    amazonUrl: 'https://amazon.com',
    imageAccent: 'from-amber-600/30 to-orange-500/20',
  },
];

export default function ArchiveDrawer() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<ArchiveItem | null>(null);

  const categories = ['All', 'Neurotech', 'Light & Sound', 'Sacred Geometry', 'Bio-Resonance', 'Solfeggio & Frequency'];

  const filteredItems = ARCHIVE_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="archive-drawer" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-indigo-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Compass className="w-4 h-4" /> Consciousness Tools &amp; Hardware Index
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text">
            The Consciousness Archive Drawer
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Explore our curated database of laboratory-tested EEG headsets, light entrainment goggles, scalar frequency emitters, and sacred geometry tools.
          </p>
        </div>

        {/* Search Input in Archive Drawer */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search archive tools..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-slate-100 text-xs placeholder-slate-400 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-105'
                : 'bg-indigo-950/40 text-slate-300 border border-indigo-500/20 hover:border-amber-500/40 hover:text-amber-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl bg-indigo-950/20 border border-indigo-500/20 p-6 flex flex-col justify-between hover:border-amber-500/40 hover:bg-indigo-900/25 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
          >
            {/* Top Badge & Rating */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[11px] font-semibold">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Tags & Bottom Action Bar */}
            <div className="mt-6 pt-4 border-t border-indigo-500/15 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/10">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 block">Est. Investment</span>
                  <span className="text-sm font-bold text-amber-400">{item.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="p-2 rounded-xl bg-indigo-950/60 border border-indigo-500/20 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                    title="View lab specs modal"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <a
                    href={item.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 transition-colors"
                  >
                    <span>Amazon</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Item Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B0F19] border border-amber-500/40 p-6 sm:p-8 space-y-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                {activeModalItem.category} • Frequency: {activeModalItem.frequency}
              </span>
              <h3 className="font-serif text-2xl font-bold gold-gradient-text">
                {activeModalItem.title}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed">
              <h4 className="font-semibold text-amber-400 mb-1">Laboratory Empirical Evaluation:</h4>
              <p>{activeModalItem.detailedReview}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-indigo-500/20">
              <div>
                <span className="text-xs text-slate-400 block">Retail Price</span>
                <span className="text-xl font-bold text-amber-400">{activeModalItem.price}</span>
              </div>
              <a
                href={activeModalItem.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all"
              >
                Buy on Amazon <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
