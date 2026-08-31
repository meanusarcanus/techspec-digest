'use client';

import React, { useState } from 'react';
import {
  Youtube,
  Music,
  Play,
  Pause,
  Clock,
  Sparkles,
  Heart,
  Volume2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function YouTubePlayerHero() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  return (
    <section id="lullaby-player" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 scroll-mt-28">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#16122C] via-[#0C1222] to-[#121B2F] border border-sky-500/30 p-6 sm:p-10 shadow-2xl">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Embedded Video & Channel Card */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-indigo-500/30 aspect-video bg-night-950">
              <iframe
                src="https://www.youtube-nocookie.com/embed/Jst0Yv_6mPU?rel=0&modestbranding=1"
                title="1 Hour Baby Sleep Music • Brahms &amp; Mozart Lullaby"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>1-Hour Continuous Bedtime Loop</span>
                <span className="text-slate-500">•</span>
                <span className="text-sky-300">Brahms &amp; Mozart Classics</span>
              </div>

              <a
                href="https://www.youtube.com/channel/UC61MVViTRqXAQVKqqfIoqbA?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 hover:text-white hover:bg-red-900/50 text-xs font-semibold transition"
              >
                <Youtube className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                <span>Subscribe on YouTube</span>
              </a>
            </div>
          </div>

          {/* Right Column: Information & Audio Benefits */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Music className="w-4 h-4 text-sky-400" />
              <span>Autonomous Baby Sleep Music Broadcast</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Calm Baby Sanctuary: Soothing Nightly Melodies
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Specially tuned music box lullabies arranged at a steady 60 BPM. Designed to replicate comforting maternal heartbeats, calm colic restlessness, and help infants transition gently into deep REM sleep.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Pure Public Domain Classical Masterpieces (Brahms' Wiegenlied &amp; Mozart)</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Zero Disruptive Ads or Sudden Volume Spikes for Uninterrupted Sleep</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Paired with Gentle Night Sky &amp; Bedtime Cloud Visual Animations</span>
              </div>
            </div>

            {/* YouTube CTA */}
            <div className="pt-2">
              <a
                href="https://www.youtube.com/channel/UC61MVViTRqXAQVKqqfIoqbA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-xl shadow-red-600/25 hover:shadow-red-600/40 transition-all transform hover:-translate-y-0.5"
              >
                <Youtube className="w-4 h-4 fill-white text-white" />
                <span>Visit Calm Baby Sanctuary on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
