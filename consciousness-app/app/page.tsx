'use client';

import React from 'react';
import { TodayHeroPost } from '@/components/TodayHeroPost';
import FeaturedBookSpotlight from '@/components/FeaturedBookSpotlight';
import ArchiveDrawer from '@/components/ArchiveDrawer';
import Link from 'next/link';
import { Radio, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Featured Book Spotlight: Thinking Big for Little People by Ted Nadres */}
      <FeaturedBookSpotlight />

      {/* Featured Active Daily Post */}
      <TodayHeroPost />

      {/* Mid-Page Callout Banner */}
      <section className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-10 bg-slate-900/80 border border-slate-800 overflow-hidden text-center space-y-6 shadow-xl backdrop-blur-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-48 bg-amber-500/10 blur-[100px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Daily Consciousness &amp; Wisdom Feed
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-3xl mx-auto text-white">
            Explore the Convergence of Ancient Mysticism &amp; Modern Bio-Resonance
          </h2>

          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From 432 Hz Solfeggio sound vibration and sacred geometry focus anchors to real-time mindfulness practices, discover tools calibrated for human enlightenment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              Read Manifesto <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Archive Drawer */}
      <ArchiveDrawer />
    </div>
  );
}
