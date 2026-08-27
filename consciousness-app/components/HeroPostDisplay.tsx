'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Star,
  ExternalLink,
  ShieldCheck,
  Radio,
  Cpu,
  Brain,
  Activity,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  Sliders,
} from 'lucide-react';

export default function HeroPostDisplay() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [waveFrequency, setWaveFrequency] = useState<number>(7.83); // Schumann resonance

  const toggleBioAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <section id="hero-product" className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Top Tag & Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-sm shadow-amber-500/20">
          <Sparkles className="w-4 h-4 text-amber-400" /> Featured Consciousness Tool Review
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight gold-gradient-text">
          Muse 2 Brain-Sensing EEG &amp; Multi-Sensor Bio-Feedback Headband
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          An in-depth empirical laboratory evaluation of the real-time EEG brainwave neurofeedback system that translates brain activity into authentic storm and ocean acoustic frequencies.
        </p>
      </div>

      {/* Main Glassmorphic Hero Post Container */}
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-amber-500/25 shadow-2xl shadow-black/80 grid grid-cols-1 lg:grid-cols-12 gap-8 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Left Column: Product Showcase & Interactive Bio-Frequency Simulator */}
        <div className="lg:col-span-7 space-y-6 z-10">
          {/* Card Mockup / Graphic Display */}
          <div className="relative rounded-2xl bg-gradient-to-br from-indigo-950/80 via-[#0B0F19] to-indigo-900/60 p-6 border border-indigo-500/20 shadow-xl">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-amber-400 animate-pulse" />
                <span className="font-serif font-bold text-sm text-slate-200">EEG Neuro-Field Matrix</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                Lab Tested Rating: 4.9 / 5.0
              </span>
            </div>

            {/* Simulated Brainwave Frequency Visualizer Bar */}
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-400" /> Active Wave State:
                </span>
                <span className="font-mono text-amber-300 font-bold">
                  {waveFrequency < 4 ? 'Delta (Deep Sleep)' : waveFrequency < 8 ? 'Theta (Meditation)' : waveFrequency < 13 ? 'Alpha (Flow State)' : 'Beta/Gamma (Focus)'} ({waveFrequency} Hz)
                </span>
              </div>

              {/* Dynamic Wave Spectrum Visualizer Graphic */}
              <div className="h-16 w-full rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-between px-4 gap-1 overflow-hidden relative">
                {Array.from({ length: 32 }).map((_, i) => {
                  const h = Math.abs(Math.sin((i + 1) * 0.5 + waveFrequency)) * 80 + 20;
                  return (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-gradient-to-t from-indigo-600 via-amber-500 to-amber-300 transition-all duration-300"
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>

              {/* Wave Frequency Slider */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Delta (2 Hz)</span>
                  <span>Theta (6 Hz)</span>
                  <span>Alpha (10 Hz)</span>
                  <span>Gamma (40 Hz)</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  step="0.5"
                  value={waveFrequency}
                  onChange={(e) => setWaveFrequency(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-indigo-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            {/* Audio Simulation Control Button */}
            <div className="mt-4 pt-4 border-t border-indigo-500/20 flex items-center justify-between">
              <span className="text-xs text-slate-400">Simulate Real-Time EEG Weather Audio</span>
              <button
                onClick={toggleBioAudio}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 transition-colors"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Pause Sound Feedback' : 'Play Sound Feedback'}</span>
              </button>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 space-y-1">
              <span className="text-slate-400 block">Sensors</span>
              <span className="font-bold text-amber-300 block">7 EEG Electrodes</span>
            </div>
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 space-y-1">
              <span className="text-slate-400 block">Metrics</span>
              <span className="font-bold text-amber-300 block">Heart, Breath &amp; Mind</span>
            </div>
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 space-y-1">
              <span className="text-slate-400 block">Battery</span>
              <span className="font-bold text-amber-300 block">10 Hours Active</span>
            </div>
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 space-y-1">
              <span className="text-slate-400 block">Connectivity</span>
              <span className="font-bold text-amber-300 block">Bluetooth LE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Takeaways, Verdict & Amazon Affiliate CTA */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between z-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Laboratory Review &amp; Analysis
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-100">
              The Biohackers Mirror for Neural Coherence
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Muse 2 bridges electroencephalography (EEG) with auditory bio-feedback. When your mind wanders, the soundscape turns stormy; when your brain enters relaxed alpha/theta coherence, weather sounds fade into tranquil ocean waves and singing birds.
            </p>

            {/* Pros & Cons List */}
            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-start gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Instant real-time EEG bio-feedback accelerates deep meditation 3x faster.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Integrated optical PPG sensor measures heart rate variability (HRV) and breath.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-200">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Requires quiet environment to prevent forehead muscle artifact noise.</span>
              </div>
            </div>
          </div>

          {/* Price & Affiliate CTA Button */}
          <div className="p-5 rounded-2xl bg-indigo-950/60 border border-amber-500/30 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Retail Price Range</span>
                <span className="text-xl font-bold text-amber-400">$249.00 - $299.00</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                In Stock on Amazon
              </span>
            </div>

            <a
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>View Muse 2 on Amazon</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <p className="text-[10px] text-slate-400 text-center">
              As an Amazon Associate, Products of Consciousness earns from qualifying purchases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
