'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  Compass,
  Radio,
  Eye,
  Activity,
  Maximize2,
  ShieldCheck,
  ArrowRight,
  Sun,
  Flame,
  Globe,
  Award,
} from 'lucide-react';

interface SolfeggioFreq {
  hz: string;
  name: string;
  ancientMeaning: string;
  modernTechApp: string;
  iconColor: string;
}

const SOLFEGGIO_FREQUENCIES: SolfeggioFreq[] = [
  {
    hz: '432 Hz',
    name: 'Universal Cosmic Harmony',
    ancientMeaning: 'Vibrational tuning aligned with natural golden ratio frequencies of planet Earth and natural acoustic vibration.',
    modernTechApp: 'Precision audio synthesizers, binaural entrainment tracks, and tuned singing quartz crystal bowls.',
    iconColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
  {
    hz: '528 Hz',
    name: 'Miracle & Transformation',
    ancientMeaning: 'Known as the "Love Frequency" used by ancient priests and healers to facilitate deep spiritual breakthroughs.',
    modernTechApp: 'Photobiomodulation pulsed light goggles and bio-acoustic vibro-tactile sound tables.',
    iconColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
  {
    hz: '639 Hz',
    name: 'Interconnected Resonance',
    ancientMeaning: 'Harmonizing relationships, enhancing empathy, and connecting individual consciousness to the collective grid.',
    modernTechApp: 'Dual-user EEG sync headsets and group sound bath meditation stations.',
    iconColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
  },
  {
    hz: '741 Hz',
    name: 'Awakening Intuition',
    ancientMeaning: 'Cleansing toxic energy, opening the throat & third eye chakras, encouraging self-expression.',
    modernTechApp: 'Pulsed Electromagnetic Field (PEMF) therapy mats with scalar wave coils.',
    iconColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  },
  {
    hz: '852 Hz',
    name: 'Spiritual Order & Pineal Awakening',
    ancientMeaning: 'Returning to spiritual order, penetrating illusions, and opening higher dimensional awareness.',
    modernTechApp: 'Monatomic gold bio-resonance elixirs and binaural theta wave entrainment generators.',
    iconColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  },
];

export default function AboutPage() {
  const [activeFreq, setActiveFreq] = useState<SolfeggioFreq>(SOLFEGGIO_FREQUENCIES[0]);

  return (
    <div className="relative min-h-screen text-slate-100 pb-20 pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Top Hero Banner */}
      <div className="relative rounded-3xl p-8 sm:p-12 glass-panel border border-amber-500/25 overflow-hidden shadow-2xl shadow-black/60">
        {/* Background Subtle Geometry Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" /> Convergence of Wisdom &amp; Technology
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight gold-gradient-text">
            Bridging Ancient Mystery with Modern Bio-Resonance
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            For millennia, mystics, sages, and ancient civilizations harnessed sacred geometry, sound harmonics, and elemental alchemy to expand human perception. Today, quantum physics, EEG neurofeedback, and vagal acoustics reveal the empirical mechanics behind these profound states of consciousness.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#solfeggio-tuner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 hover:border-amber-500/40 text-slate-200 text-sm font-medium transition-all"
            >
              Frequency Matrix <Radio className="w-4 h-4 text-amber-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Two Pillars Grid: Ancient Wisdom vs Modern Neurotech */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ancient Wisdom Card */}
        <div className="rounded-3xl p-8 glass-panel-indigo border border-indigo-500/30 space-y-6 hover:border-amber-500/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Sun className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-100">Ancient Esoteric Wisdom</h3>
              <p className="text-xs text-amber-400 font-medium">Sacred Geometry, Harmonics &amp; Ormus</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Ancient Egyptian, Vedic, and Pythagorean traditions recognized that the universe is constructed from mathematical ratios, sacred geometry (such as the Merkaba and Flower of Life), and vibrational frequencies.
          </p>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <span><strong>Pyramid Power Concentrators:</strong> Copper Giza ratios amplifying subtle scalar energy fields and bio-field coherence.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <span><strong>Harmonic Solfeggio Scale:</strong> Ancient 432 Hz and 528 Hz tuning protocols engineered for cellular and spirit alignment.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <span><strong>Monatomic Elements:</strong> M-state Ormus gold minerals utilized for pineal gland stimulation and light-body activation.</span>
            </li>
          </ul>
        </div>

        {/* Modern Neurotechnology Card */}
        <div className="rounded-3xl p-8 glass-panel-indigo border border-indigo-500/30 space-y-6 hover:border-amber-500/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
              <Activity className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-100">Modern Bio-Resonance</h3>
              <p className="text-xs text-indigo-300 font-medium">EEG, Light-Sound &amp; Vagus Stimulation</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            21st-century neurotechnology translates ancient meditative states into measurable brainwave frequencies (Alpha 8-12Hz, Theta 4-8Hz, Gamma 30-100Hz) accessible through real-time feedback loops.
          </p>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <span><strong>Real-Time EEG Neurofeedback:</strong> Multi-sensor headbands tracking brain rhythm, heart coherence, and calm index.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <span><strong>Audio-Visual Entrainment (AVE):</strong> Pulsed light goggles &amp; binaural sound machines driving rapid brainwave synchronization.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <span><strong>Infrasonic Vagus Toners:</strong> Bone-conduction bio-acoustic resonators shifting autonomic tone into deep parasympathetic states.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Solfeggio & Practice Frequency Matrix */}
      <div id="solfeggio-tuner" className="rounded-3xl p-8 glass-panel border border-amber-500/30 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-amber-400 text-xs font-medium">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Interactive Frequency Matrix
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text">
            Harmonic Frequencies &amp; Tech Applications
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click on a Solfeggio frequency below to examine its ancient spiritual meaning and its corresponding modern neuro-biohacking tool.
          </p>
        </div>

        {/* Frequency Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {SOLFEGGIO_FREQUENCIES.map((freq) => (
            <button
              key={freq.hz}
              onClick={() => setActiveFreq(freq)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-bold transition-all shadow-md ${
                activeFreq.hz === freq.hz
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/30 scale-105'
                  : 'bg-indigo-950/40 border-indigo-500/20 text-slate-300 hover:border-amber-500/40 hover:text-amber-300'
              }`}
            >
              {freq.hz}
            </button>
          ))}
        </div>

        {/* Active Frequency Display Panel */}
        <div className="p-6 sm:p-8 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${activeFreq.iconColor}`}>
              {activeFreq.hz} • {activeFreq.name}
            </span>
            <h4 className="text-base font-semibold text-slate-100">Ancient Esoteric Significance</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeFreq.ancientMeaning}</p>
          </div>
          <div className="space-y-3 border-t md:border-t-0 md:border-l border-indigo-500/20 pt-4 md:pt-0 md:pl-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Modern Tool Application
            </span>
            <h4 className="text-base font-semibold text-slate-100">Bio-Tech Implementation</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeFreq.modernTechApp}</p>
          </div>
        </div>
      </div>

      {/* Laboratory Ethos & Evaluation Criteria */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text">
            Our Testing Ethos &amp; Curation Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Every product cataloged in our laboratory undergoes rigorous testing across three vital dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-3 hover:border-amber-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="font-serif text-base font-bold text-slate-100">1. Bio-Field Resonance</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We evaluate electromagnetic field purity, harmonic distortion, and structural material integrity (pure copper, quartz, lead-free metals).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-3 hover:border-amber-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Eye className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="font-serif text-base font-bold text-slate-100">2. Empirical Efficacy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Devices must produce verifiable shifts in HRV (Heart Rate Variability), EEG delta/theta power spectral density, or subjective state metrics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-3 hover:border-amber-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="font-serif text-base font-bold text-slate-100">3. Spiritual Ergonomics</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Technology should serve human awareness rather than enslave it—seamless intuitive design that naturally invites effortless daily practice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
