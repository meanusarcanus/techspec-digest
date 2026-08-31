'use client';

import React from 'react';
import {
  Youtube,
  Music,
  Clock,
  Sparkles,
  Heart,
  Bell,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Moon,
  Radio,
  Play,
} from 'lucide-react';

export default function YouTubePlayerHero() {
  const videoId = 'bic6nYeSwCU';
  const videoUrl = 'https://youtu.be/bic6nYeSwCU';
  const channelUrl = 'https://www.youtube.com/channel/UC61MVViTRqXAQVKqqfIoqbA';
  const subscribeUrl = 'https://www.youtube.com/channel/UC61MVViTRqXAQVKqqfIoqbA?sub_confirmation=1';

  return (
    <section id="lullaby-player" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 scroll-mt-28">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#16122C] via-[#0C1222] to-[#121B2F] border border-sky-500/30 p-6 sm:p-10 shadow-2xl">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Embedded 16:9 YouTube Video Player */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-indigo-500/40 aspect-video bg-night-950">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="Calm Baby Sanctuary - Baby Sleep Music & Lullabies"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white font-bold text-[11px] uppercase tracking-wider">
                  <Play className="w-3 h-3 fill-white" /> Now Playing
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-sky-300 font-medium">Calm Baby Sanctuary</span>
              </div>

              <a
                href={subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 hover:text-white hover:bg-red-900/50 text-xs font-semibold transition shadow-sm"
              >
                <Bell className="w-3.5 h-3.5 text-red-400" />
                <span>Subscribe on YouTube</span>
              </a>
            </div>
          </div>

          {/* Right Column: Information & Channel Mission */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Music className="w-4 h-4 text-sky-400" />
              <span>Official YouTube Sleep Music Broadcast</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Calm Baby Sanctuary: Soothing Nightly Melodies
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Experience our gentle classical baby sleep lullabies, carefully arranged at 60 BPM with soothing music box bells and celesta chimes to ease infants and toddlers into deep, restorative sleep.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Johannes Brahms (Wiegenlied) &amp; Mozart Bedtime Music Box</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Calming 1080p HD Animated Night Sky &amp; Bedtime Visuals</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>100% Royalty-Free &amp; Pediatric Sleep Approved</span>
              </div>
            </div>

            {/* YouTube CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs shadow-xl shadow-red-600/25 transition-all transform hover:-translate-y-0.5"
              >
                <Youtube className="w-4 h-4 fill-white text-white" />
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
              </a>

              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <span>Visit Channel</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
