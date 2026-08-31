'use client';

import React from 'react';
import {
  Moon,
  Sparkles,
  Heart,
  Star,
  Clock,
  BookOpen,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Compass,
} from 'lucide-react';
import { dailyBabyPosts, DailyBabyPost } from '../data/dailyBabyPosts';

export default function TodayBabyPost() {
  const post: DailyBabyPost = dailyBabyPosts[0];

  return (
    <section id="daily-sleep" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 scroll-mt-28">
      <div className="space-y-10">
        {/* Article Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Today’s Nursery Guide • {post.formattedDate}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight gold-gradient-text">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            {post.subtitle}
          </p>
        </div>

        {/* Main Article Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Full Essay & Soothing Protocol */}
          <div className="lg:col-span-7 space-y-8">
            {/* Featured Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/30 aspect-[16/9] bg-night-950">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/teddy_bears_on_clouds.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                <span className="bg-night-950/80 px-3 py-1 rounded-full border border-slate-700">
                  {post.category}
                </span>
                <span className="bg-night-950/80 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" /> {post.readTime}
                </span>
              </div>
            </div>

            {/* Essay Text */}
            <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl backdrop-blur-md">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Moon className="w-5 h-5 text-amber-400" />
                Pediatric Sleep Breakdown
              </h3>
              <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-light whitespace-pre-line space-y-4">
                {post.fullEssay}
              </div>
            </div>

            {/* Daily 4-Step Soothing Protocol */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#1A152E] via-[#0E1324] to-[#121B2F] border border-amber-500/30 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                    Tonight's Bedtime Protocol
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {post.soothingProtocol.focus}
                  </h4>
                </div>
                <span className="text-xs text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/40 font-semibold">
                  ⏱️ {post.soothingProtocol.duration}
                </span>
              </div>

              <div className="space-y-3">
                {post.soothingProtocol.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Curated Amazon Nursery Essentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Featured Bedtime Gear &amp; Books
              </h3>
              <span className="text-xs text-amber-400 font-medium">Calibrated Picks</span>
            </div>

            <div className="space-y-5">
              {post.amazonProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-2xl p-5 bg-gradient-to-b from-[#13192B] via-[#0B0F19] to-[#120F1D] border border-amber-500/30 space-y-4 shadow-xl hover:border-amber-400/60 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-amber-500/40 bg-slate-950 flex-shrink-0">
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1 flex-1">
                      {prod.badge && (
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
                          {prod.badge}
                        </span>
                      )}
                      <h4 className="font-serif text-sm font-bold text-white leading-snug line-clamp-2">
                        {prod.title}
                      </h4>
                      <div className="flex items-center gap-2 pt-0.5">
                        <div className="flex items-center text-amber-400 text-xs gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-100">{prod.price}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-2">
                    {prod.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {prod.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={prod.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Check Price on Amazon</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-75" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
