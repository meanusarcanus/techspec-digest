'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  Key,
  Star,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ShoppingBag,
  Youtube,
  Headphones,
  HeartHandshake,
} from 'lucide-react';

interface FeaturedBookSpotlightProps {
  trackingTag?: string;
}

export default function FeaturedBookSpotlight({
  trackingTag = 'tag=techspecdiges-20',
}: FeaturedBookSpotlightProps) {
  const amazonUrl = `https://www.amazon.com/dp/B0GXTC1PY6?${trackingTag}`;
  const amazonSearchUrl = `https://www.amazon.com/s?k=Thinking+Big+for+Little+People+Ted+Nadres&${trackingTag}`;

  return (
    <section id="featured-book" className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8 scroll-mt-28">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#120D1F] via-[#0B0F19] to-[#1A1208] border border-amber-500/30 shadow-2xl shadow-black/80">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          {/* Top Banner Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-6 mb-8">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Key className="w-4 h-4 text-amber-400" />
              <span>Featured Essential Literature • The Master Key System</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-indigo-950/80 text-indigo-300 px-3 py-1 rounded-full border border-indigo-700/50 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> For Young Minds &amp; Families
              </span>
              <span className="bg-amber-950/80 text-amber-300 px-3 py-1 rounded-full border border-amber-700/50 font-semibold">
                Kindle: $8.99 USD
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: 3D Book Presentation Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group">
                {/* Book Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/40 via-purple-500/30 to-amber-600/40 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />

                {/* Main 3D Book Container */}
                <div className="relative rounded-2xl bg-gradient-to-b from-amber-950/60 to-slate-950 border-2 border-amber-500/40 p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl space-y-5 max-w-sm">
                  {/* Visual Book Cover Thumbnail */}
                  <div className="relative w-48 sm:w-56 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-[#160E08] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/techspec-digest/consciousness/images/thinking_big_for_little_people.jpg"
                      alt="Thinking Big for Little People by Ted Nadres"
                      className="w-full h-full object-cover shadow-inner"
                      onError={(e) => {
                        // Fallback if asset path is absolute root
                        (e.target as HTMLImageElement).src = '/images/thinking_big_for_little_people.jpg';
                      }}
                    />
                  </div>

                  {/* Title & Author Info */}
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                      Thinking Big for Little People
                    </h4>
                    <p className="text-xs text-amber-300/90 font-medium">
                      A Kid's Introduction to The Master Key System
                    </p>
                    <p className="text-xs text-slate-400 pt-1">
                      By <strong className="text-slate-200">Ted Nadres</strong>
                    </p>
                  </div>

                  {/* Format & Rating Badges */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center text-amber-400 text-xs gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold">• Kindle &amp; Print Edition</span>
                  </div>

                  {/* Buy Button */}
                  <a
                    href={amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Get on Amazon Kindle ($8.99)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Compelling Editorial Write-up & Core Wisdom */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Foundational Consciousness for the Next Generation
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight gold-gradient-text">
                  Unlocking Universal Laws &amp; Creative Mind Power for Kids
                </h3>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  In 1912, Charles F. Haanel published <em>The Master Key System</em>—a legendary masterpiece revealing how thought operates as the fundamental creative force in the universe. Now, in <strong>Thinking Big for Little People</strong>, author <strong>Ted Nadres</strong> masterfully decodes these profound Hermetic and New Thought principles into an engaging, empowering guide designed specifically for young minds.
                </p>
                <p>
                  Before childhood curiosity is clouded by limiting beliefs and self-doubt, this book introduces children to the mechanics of their own subconscious mind, emotional sovereignty, and the law of cause and effect.
                </p>
              </div>

              {/* Core Pillars of The Book */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <strong className="text-slate-100 block">Constructive Thought Habits</strong>
                    <span className="text-slate-400">Teaching kids that every thought is an energetic seed.</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <strong className="text-slate-100 block">Creative Visualization</strong>
                    <span className="text-slate-400">Playful mental exercises to build laser focus and confidence.</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <strong className="text-slate-100 block">Cause &amp; Effect Mastery</strong>
                    <span className="text-slate-400">Understanding how choices create reality with calm poise.</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <strong className="text-slate-100 block">Family Co-Reading Guide</strong>
                    <span className="text-slate-400">A shared language for parents and children on mindfulness.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Ecosystem Links */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
                <a
                  href={amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read on Kindle / Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://open.spotify.com/show/7momxK3fyonPI9SWZ707Vt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 text-xs sm:text-sm font-semibold transition-all"
                >
                  <Headphones className="w-4 h-4 text-emerald-400" />
                  <span>Arcane Books Podcast</span>
                </a>

                <a
                  href="https://www.youtube.com/@LogicLens-l9n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-red-950/50 border border-red-500/30 hover:border-red-400 text-red-300 text-xs sm:text-sm font-semibold transition-all"
                >
                  <Youtube className="w-4 h-4 fill-red-400" />
                  <span>YouTube Channel</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
