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
} from 'lucide-react';

export default function YouTubePlayerHero() {
  const channelUrl = 'https://www.youtube.com/channel/UC61MVViTRqXAQVKqqfIoqbA';
  const subscribeUrl = 'https://www.youtube.com/channel/UC61MVViTRqXAQVKqqfIoqbA?sub_confirmation=1';

  return (
    <section id="lullaby-player" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 scroll-mt-28">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#16122C] via-[#0C1222] to-[#121B2F] border border-sky-500/30 p-6 sm:p-10 shadow-2xl">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Video Broadcast Preview Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-indigo-500/30 aspect-video bg-night-950 group">
              <img
                src="/techspec-digest/baby-care/images/teddy_bears_on_clouds.jpg"
                alt="1 Hour Baby Sleep Music Lullaby Broadcast"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/teddy_bears_on_clouds.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/40 to-transparent" />

              {/* Broadcast / Premiere Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg animate-pulse">
                  <Radio className="w-3.5 h-3.5" /> Scheduled Premiere • 7:00 PM
                </span>
                <span className="bg-night-950/80 text-sky-300 text-xs px-3 py-1 rounded-full border border-sky-500/30">
                  1-Hour 1080p HD
                </span>
              </div>

              {/* Floating Center Action */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Youtube className="w-8 h-8 fill-white" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white shadow-black drop-shadow-md">
                    1 Hour Classical Baby Sleep Music
                  </h4>
                  <p className="text-xs text-sky-200">
                    Brahms' Lullaby &amp; Mozart Bedtime Music Box
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Uploads Daily at 7:00 PM</span>
                <span className="text-slate-500">•</span>
                <span className="text-sky-300">Calm Baby Sanctuary</span>
              </div>

              <a
                href={subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 hover:text-white hover:bg-red-900/50 text-xs font-semibold transition shadow-sm"
              >
                <Bell className="w-3.5 h-3.5 text-red-400" />
                <span>Set Reminder / Subscribe</span>
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
              Our automated 1-hour baby lullaby broadcasts go live every evening at <strong>7:00 PM</strong>. Arranged at a steady 60 BPM to replicate maternal heartbeats and ease infants into deep, uninterrupted sleep.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Johannes Brahms (Wiegenlied) &amp; W. A. Mozart Bedtime Melodies</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Calming 1080p HD Animated Night Sky &amp; Bedtime Clouds</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Premieres Nightly at 7:00 PM for Nursery Bedtime Routines</span>
              </div>
            </div>

            {/* YouTube CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs shadow-xl shadow-red-600/25 transition-all transform hover:-translate-y-0.5"
              >
                <Youtube className="w-4 h-4 fill-white text-white" />
                <span>Visit YouTube Channel</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
              </a>

              <a
                href={subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>Subscribe Free</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
