'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Heart,
  Star,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ShoppingBag,
  Moon,
} from 'lucide-react';

export default function BabyBookSpotlight() {
  const [activeTab, setActiveTab] = useState<'bible' | 'masterkey'>('bible');

  const trackingTag = 'tag=techspecdiges-20';

  const bibleBook = {
    title: 'Bible Bedtime Stories: For Little Hearts',
    author: 'J. N. Littlelight',
    asin: 'B0HCYR3DN1',
    format: 'Paperback ($9.99 USD)',
    price: '$9.99',
    tagline: 'Gentle Biblical Tales & Calming Bedtime Prayers for Infants, Toddlers & Growing Hearts',
    coverImage: '/techspec-digest/baby-care/images/bible_bedtime_stories_cover.jpg',
    fallbackCover: '/images/bible_bedtime_stories_cover.jpg',
    url: `https://www.amazon.com/dp/B0HCYR3DN1?${trackingTag}`,
    searchUrl: `https://www.amazon.com/s?k=Bible+Bedtime+Stories+For+Little+Hearts+J+N+Littlelight&${trackingTag}`,
    pillars: [
      {
        title: '🕊️ Soul-Soothing Bedtime Peace',
        desc: 'Gentle, tender narratives engineered to melt away daytime restlessness and wrap little ones in divine comfort.',
      },
      {
        title: '💖 Timeless Values & Unconditional Love',
        desc: 'Nurtures empathy, courage, gratitude, and peaceful faith in growing minds through simple, memorable biblical truths.',
      },
      {
        title: '🌙 Sacred Parent-Child Bonding',
        desc: 'Warm, lyrical cadence paired with comforting artwork, creating the ultimate loving nighttime routine before sleep.',
      },
    ],
    quote:
      '“Let the gentle whispers of faith and love fill your child’s dreams with peace, protection, and boundless joy.”',
  };

  const masterKeyBook = {
    title: 'Thinking Big for Little People',
    subtitle: "A Kid's Introduction to The Master Key System (1912 Simplified)",
    author: 'Ted Nadres',
    asin: 'B0GXTC1PY6',
    format: 'Kindle ($8.99) & Paperback',
    price: '$8.99',
    tagline: 'Teaching Young Minds the Creative Power of Thought, Emotional Mastery & Focused Intention',
    coverImage: '/techspec-digest/baby-care/images/thinking_big_for_little_people.jpg',
    fallbackCover: '/images/thinking_big_for_little_people.jpg',
    url: `https://www.amazon.com/dp/B0GXTC1PY6?${trackingTag}`,
    searchUrl: `https://www.amazon.com/s?k=Thinking+Big+for+Little+People+Ted+Nadres&${trackingTag}`,
    pillars: [
      {
        title: '🌱 The Subconscious Magic Garden',
        desc: 'Teaches children how thoughts act as seeds that shape their real-world confidence and habits.',
      },
      {
        title: '🔑 Creative Focus & Mental Calm',
        desc: 'Simple exercises for focus, emotional resilience, and constructive daily intention.',
      },
      {
        title: '🌟 Universal Mind Connection',
        desc: 'Simplifies Charles F. Haanel’s 1912 masterpiece into playful, empowering wisdom for young families.',
      },
    ],
    quote:
      '“When young minds learn that thought is creative energy, they grow up with unstoppable courage, kindness, and self-belief.”',
  };

  const currentBook = activeTab === 'bible' ? bibleBook : masterKeyBook;

  return (
    <section id="bedtime-books" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 scroll-mt-28">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1A122E] via-[#0C1222] to-[#1F170E] border border-amber-500/35 shadow-2xl">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          {/* Header & Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-6 mb-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Featured Nursery Bedtime Literature</span>
              </div>
            </div>

            {/* Switcher Toggle */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-inner">
              <button
                onClick={() => setActiveTab('bible')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'bible'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>📖 Bible Bedtime Stories</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-950/80 text-amber-200 border border-amber-600/40">
                  Featured
                </span>
              </button>

              <button
                onClick={() => setActiveTab('masterkey')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'masterkey'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Thinking Big for Little People</span>
              </button>
            </div>
          </div>

          {/* Book Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 3D Book Presentation Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group w-full max-w-sm">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/40 via-purple-500/30 to-amber-600/40 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />

                <div className="relative rounded-2xl bg-gradient-to-b from-[#181326] to-[#0A0D17] border-2 border-amber-500/40 p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl space-y-5">
                  <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-[#160E08] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={currentBook.coverImage}
                      alt={currentBook.title}
                      className="w-full h-full object-cover shadow-inner"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = currentBook.fallbackCover;
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                      {currentBook.title}
                    </h4>
                    <p className="text-xs text-amber-300/90 font-medium">
                      By <strong className="text-slate-100">{currentBook.author}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center text-amber-400 text-xs gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-300 font-semibold">• {currentBook.format}</span>
                  </div>

                  <a
                    href={currentBook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order on Amazon ({currentBook.price})</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-75" />
                  </a>

                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Authentic Amazon KDP Prime Delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Wisdom Pillars & Summary */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bedtime Reading &amp; Emotional Calm</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-white leading-tight gold-gradient-text">
                  {currentBook.tagline}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  {activeTab === 'bible' ? (
                    <>
                      Authored by <strong>J. N. Littlelight</strong>,{' '}
                      <em>Bible Bedtime Stories: For Little Hearts</em> is crafted to fill bedtime with gentle faith, security, and tranquility. Designed for parents seeking calming stories that cultivate kindness, gratitude, and peaceful sleep.
                    </>
                  ) : (
                    <>
                      Authored by <strong>Ted Nadres</strong>,{' '}
                      <em>Thinking Big for Little People</em> translates Charles F. Haanel's 1912 Master Key System into joyful metaphors, giving children the mental tools to build self-confidence and subconscious alignment early in life.
                    </>
                  )}
                </p>
              </div>

              {/* Three Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {currentBook.pillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 backdrop-blur-sm"
                  >
                    <h5 className="font-bold text-xs sm:text-sm text-amber-300">
                      {pillar.title}
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quote Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-indigo-950/30 to-transparent border-l-4 border-amber-400 text-xs sm:text-sm italic text-amber-200/90 font-serif leading-relaxed">
                {currentBook.quote}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={currentBook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Get {currentBook.title.split(':')[0]} on Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={currentBook.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                >
                  <span>Search Reviews on Amazon</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
