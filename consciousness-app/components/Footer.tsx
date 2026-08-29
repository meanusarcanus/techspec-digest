'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Compass, Heart, ExternalLink, Zap, Orbit, Youtube, Headphones } from 'lucide-react';

export default function Footer() {
  const popularTerms = [
    { name: 'EEG Headbands', query: 'EEG+Headband+Meditation' },
    { name: 'Vagus Nerve Stimulators', query: 'Vagus+Nerve+Stimulator+Bio-Resonance' },
    { name: 'Monatomic Ormus Gold', query: 'Monatomic+Ormus+Gold+Liquid' },
    { name: 'Binaural Frequency Generators', query: 'Binaural+Frequency+Generator+Mind Machine' },
    { name: 'Sacred Geometry Pyramids', query: 'Sacred+Geometry+Copper+Pyramid' },
    { name: 'Solfeggio 528Hz Sound Baths', query: 'Solfeggio+528Hz+Quartz+Crystal+Singing+Bowl' },
    { name: 'Lucid Dreaming Masks', query: 'Lucid+Dreaming+Entrainment+Mask' },
    { name: 'PEMF Therapy Mats', query: 'PEMF+Therapy+Full+Body+Mat' },
    { name: 'Bio-Resonance Cards', query: 'Bio+Resonance+Scalar+Card' },
    { name: 'Pineal Gland Activation', query: 'Pineal+Gland+Activation+Lapis+Lazuli' },
    { name: 'Gamma Wave Devices', query: 'Gamma+Wave+40Hz+Light+Therapy' },
    { name: 'Audio-Visual Entrainment', query: 'Audio+Visual+Ganzfeld+Entrainment' },
  ];

  const toolCategories = [
    { name: 'Neurotech & EEG', query: 'Neurotech+EEG+Headband' },
    { name: 'Light & Sound Entrainment', query: 'Light+and+Sound+Mind+Machine' },
    { name: 'Sacred Geometry Pyramids', query: 'Sacred+Geometry+Copper+Pyramid' },
    { name: 'Bio-Resonance & Ormus', query: 'Bio+Resonance+Monatomic+Ormus+Gold' },
  ];

  return (
    <footer className="relative z-10 bg-[#070A12] border-t border-indigo-500/20 text-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid: Mission Summary & Quick Nav */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-indigo-500/10">
          {/* Mission Summary */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-serif font-bold text-lg gold-gradient-text">
                PRODUCTS OF CONSCIOUSNESS
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Dedicated to bridging cutting-edge bio-resonance neurotechnology, sound frequency dynamics, and ancient esoteric wisdom for human awakening and spiritual elevation. We curating high-vibrational tools for seekers, meditators, and biohackers worldwide.
            </p>
            <div className="flex items-center gap-4 text-xs text-amber-400/80 pt-1 font-medium">
              <span className="flex items-center gap-1">
                <Orbit className="w-3.5 h-3.5 text-amber-400" /> Sacred Geometry Tested
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Frequency Calibrated
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Explore Lab
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home Portal
                </Link>
              </li>
              <li>
                <Link href="/#hero-product" className="hover:text-amber-400 transition-colors">
                  Hero Product Showcase
                </Link>
              </li>
              <li>
                <Link href="/#archive-drawer" className="hover:text-amber-400 transition-colors">
                  Consciousness Archive
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Ancient &amp; Modern Practice
                </Link>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@LogicLens-l9n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>Arcane Books YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/show/7momxK3fyonPI9SWZ707Vt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Arcane Books Spotify</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Consciousness Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Tool Categories
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {toolCategories.map((cat) => (
                <li key={cat.name}>
                  <a
                    href={`https://www.amazon.com/s?k=${cat.query}&tag=techspecdiges-20`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-amber-400 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <ExternalLink className="w-3 h-3 text-amber-400/60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular Search Terms Tag Cloud */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-amber-400" /> Popular Consciousness Search Terms
          </h4>
          <div className="flex flex-wrap gap-2">
            {popularTerms.map((term) => (
              <a
                key={term.name}
                href={`https://www.amazon.com/s?k=${term.query}&tag=techspecdiges-20`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-950/30 border border-indigo-500/15 text-slate-400 text-xs hover:border-amber-500/40 hover:text-amber-300 transition-colors"
              >
                <span>{term.name}</span>
                <ExternalLink className="w-3 h-3 text-amber-400/50" />
              </a>
            ))}
          </div>
        </div>

        {/* Amazon Affiliate Disclosure Box */}
        <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/15 text-xs text-slate-400 space-y-2 leading-relaxed">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
            <Shield className="w-4 h-4" /> Amazon Affiliate Disclosure
          </div>
          <p>
            Products of Consciousness &amp; Enlightenment is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. Certain content that appears on this site comes from Amazon Services LLC. This content is provided &apos;as is&apos; and is subject to change or removal at any time without notice.
          </p>
        </div>

        {/* Footer Bottom Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-500 border-t border-indigo-500/10">
          <p>© {new Date().getFullYear()} Products of Consciousness &amp; Enlightenment. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with sacred intent &amp; high vibration <Heart className="w-3 h-3 text-amber-400 fill-amber-400/20 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
