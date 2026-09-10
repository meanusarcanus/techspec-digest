'use client';

import React, { useState } from 'react';
import { Sparkles, Music, Compass, Sun, ShieldCheck, ShoppingBag, Clock, Heart } from 'lucide-react';

export default function SolfeggioFrequencyCalculator() {
  const [targetIntention, setTargetIntention] = useState('528');
  const [duration, setDuration] = useState('15');
  const [modality, setModality] = useState('bowl');

  const calculateFrequencyProtocol = () => {
    let hz = '528 Hz';
    let title = 'The Miracle / Transformation Frequency';
    let chakra = 'Solar Plexus & Heart Integration';
    let brainwave = 'Alpha-Theta Coherence (7.83 Hz – 10 Hz)';
    let protocol = [
      'Warm the meditation space with dim lighting and sit upright with spine lengthened.',
      'Begin with 3 minutes of box breathing: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s.',
      'Listen to the sustained 528 Hz harmonic tone, visualizing golden cellular repair along the spine.',
      'Affirm silently: "I am in perfect harmonic equilibrium with universal intelligence."',
    ];
    let recommendedTool = 'Hand-Hammered Tibetan 7-Metal Singing Bowl & 528Hz Solfeggio Weighted Tuning Fork';
    let amazonQuery = 'tibetan+singing+bowl+set+528hz+solfeggio+tuning+fork';

    if (targetIntention === '432') {
      hz = '432 Hz';
      title = 'Verdi Sacred Tuning & Natural Phi Harmony';
      chakra = 'All Chakras / Golden Mean Resonance';
      brainwave = 'Deep Alpha (8 Hz – 12 Hz)';
      protocol = [
        'Place attention on the natural rhythm of breath without trying to force or count.',
        'Immerse your auditory field in 432 Hz Pythagorean acoustics to release mental resistance.',
        'Visualize discordant thoughts dissolving into smooth concentric geometry like water ripples.',
      ];
      recommendedTool = '432Hz Quartz Crystal Singing Bowl (8-Inch Frosted Heart Chakra)';
      amazonQuery = '432hz+quartz+crystal+singing+bowl+frosted+heart+chakra';
    } else if (targetIntention === '852') {
      hz = '852 Hz';
      title = 'Third-Eye & Pineal Awakening Tone';
      chakra = 'Ajna (Brow Chakra / Inner Sight)';
      brainwave = 'Theta-Gamma Hypnagogic Access (4 Hz – 7 Hz)';
      protocol = [
        'Close eyes and softly rest attention behind the brow center without physical strain.',
        'Perform Trataka candle gazing for 3 minutes before closing eyes to observe the indigo aura.',
        'Tone the high 852 Hz harmonic pitch into the cranial chamber on each slow exhale.',
      ];
      recommendedTool = 'Organic Pure Beeswax Trataka Candle & 100% Amethyst Crystal Eye Mask';
      amazonQuery = 'amethyst+crystal+eye+mask+trataka+beeswax+candle+meditation';
    } else if (targetIntention === '396') {
      hz = '396 Hz';
      title = 'Liberation from Fear & Root Grounding';
      chakra = 'Muladhara (Root Chakra)';
      brainwave = 'Deep Delta-Theta (3 Hz – 6 Hz)';
      protocol = [
        'Sit directly on the floor or a firm buckwheat meditation cushion with sit bones anchored.',
        'Send your energetic roots down into the core of the earth on every exhale.',
        'Let the heavy 396 Hz fundamental bass vibrations shake loose subconscious fear and tension.',
      ];
      recommendedTool = 'Ergonomic Organic Buckwheat Zafu Meditation Cushion & Natural Mala Beads';
      amazonQuery = 'organic+buckwheat+meditation+zafu+cushion+sandalwood+mala+beads';
    } else if (targetIntention === '963') {
      hz = '963 Hz';
      title = 'Crown Chakra & Divine Cosmic Union';
      chakra = 'Sahasrara (Crown / Universal Oneness)';
      brainwave = 'High Gamma (40 Hz+)';
      protocol = [
        'Visualize a column of crystalline violet-white light entering the crown fontanelle.',
        'Immerse in 963 Hz pure sine tones to bridge finite individuality with Infinite Mind.',
        'Rest in non-dual, silent contemplation for the remainder of your session.',
      ];
      recommendedTool = 'Laser-Cut Birchwood Sacred Geometry Wall Altars & Pure Copper Sri Yantra Plate';
      amazonQuery = 'flower+of+life+sacred+geometry+wood+altar+copper+sri+yantra';
    }

    return {
      hz,
      title,
      chakra,
      brainwave,
      protocol,
      recommendedTool,
      amazonQuery
    };
  };

  const result = calculateFrequencyProtocol();

  return (
    <section id="frequency-calculator" className="my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Music className="w-4 h-4 text-amber-400" />
          <span>Interactive Esoteric Tool</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white gold-gradient-text">
          Solfeggio Bio-Resonance &amp; Frequency Calculator
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Calibrate your acoustic meditation frequency, brainwave state, and sacred practice protocol based on ancient hermetic harmonic science.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs (6 Cols) */}
        <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#13192B] via-[#0B0F19] to-[#120F1D] border border-indigo-500/30 shadow-2xl space-y-6">
          
          {/* Target Intention Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              1. Primary Meditation Focus &amp; Intention
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: '528', label: '🧬 528 Hz — DNA Repair & Miracles' },
                { id: '432', label: '🌿 432 Hz — Natural Phi Harmonic Tuning' },
                { id: '852', label: '👁️ 852 Hz — Third-Eye & Pineal Awakening' },
                { id: '396', label: '🛡️ 396 Hz — Releasing Fear & Guilt' },
                { id: '963', label: '👑 963 Hz — Divine Oneness & Crown' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTargetIntention(item.id)}
                  className={`py-2.5 px-3.5 rounded-xl text-xs font-bold border transition-all text-left ${
                    targetIntention === item.id
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-amber-500/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration & Modality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                2. Practice Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-100 focus:outline-none focus:border-amber-400"
              >
                <option value="5">5 Minutes (Micro-Reset)</option>
                <option value="15">15 Minutes (Optimal Alignment)</option>
                <option value="30">30 Minutes (Deep Trance)</option>
                <option value="60">60 Minutes (Complete Transmutation)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                3. Preferred Modality
              </label>
              <select
                value={modality}
                onChange={(e) => setModality(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-100 focus:outline-none focus:border-amber-400"
              >
                <option value="bowl">Tibetan Singing Bowl / Gong</option>
                <option value="tuning">Weighted Solfeggio Tuning Fork</option>
                <option value="binaural">Headphone Binaural Beats</option>
                <option value="breath">Silent Pranayama Breathwork</option>
              </select>
            </div>
          </div>

          {/* Principle note */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed space-y-1">
            <strong className="text-amber-300 font-bold block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Hermetic Axiom of Vibration:
            </strong>
            <p className="font-light text-slate-300">
              "Nothing rests; everything moves; everything vibrates." Acoustic resonance directly entrains the bio-field to reconstruct coherent mental and physical energy.
            </p>
          </div>

        </div>

        {/* Right Output Prescription (6 Cols) */}
        <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#19152B] via-[#0E121E] to-[#120F1D] border border-amber-500/30 shadow-2xl space-y-6 sticky top-28">
          
          <div className="flex items-center justify-between border-b border-indigo-900/40 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <Music className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Bio-Resonance Blueprint
                </h3>
                <span className="text-[10px] text-amber-300">{result.title}</span>
              </div>
            </div>
            <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              {result.hz}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block uppercase tracking-wider text-[10px]">Chakra Vortex</span>
              <span className="font-bold text-xs text-slate-100">{result.chakra}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block uppercase tracking-wider text-[10px]">Brainwave Entrainment</span>
              <span className="font-bold text-xs text-slate-100">{result.brainwave}</span>
            </div>
          </div>

          {/* Step by step protocol */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
              Step-by-Step Practice Protocol ({duration} Min):
            </span>
            <ul className="space-y-2 text-xs text-slate-300 font-light">
              {result.protocol.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-slate-900/50 border border-slate-800/60">
                  <span className="text-amber-400 font-bold flex-shrink-0">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Amazon Tool */}
          <div className="pt-3 border-t border-indigo-900/40 space-y-2.5">
            <div className="text-xs text-slate-300 flex items-center justify-between">
              <span className="font-semibold text-amber-300">Recommended Sacred Tool:</span>
            </div>
            <a
              href={`https://www.amazon.com/s?k=${result.amazonQuery}&tag=techspecdiges-20`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span>Get {result.recommendedTool} on Amazon</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
