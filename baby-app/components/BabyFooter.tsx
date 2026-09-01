'use client';

import React from 'react';
import Link from 'next/link';
import { Moon, Heart, Youtube, ExternalLink, ShieldCheck } from 'lucide-react';

export default function BabyFooter() {
  return (
    <footer className="border-t border-indigo-500/20 bg-night-950/90 backdrop-blur-md pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Moon className="w-5 h-5 text-amber-300 fill-amber-300/30" />
              <span className="font-serif text-base font-bold text-white tracking-wider">
                CALM BABY NURSERY
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-light">
              Dedicated to helping little ones and families experience peaceful, restorative nights through classical lullabies, bedtime faith storybooks, and pediatric sleep research.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Navigation</h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#daily-sleep" className="hover:text-amber-300 transition">
                  Daily Sleep Guide
                </a>
              </li>
              <li>
                <a href="#lullaby-player" className="hover:text-amber-300 transition">
                  1-Hour Classical Lullabies
                </a>
              </li>
              <li>
                <a href="#baby-gear" className="hover:text-amber-300 transition">
                  Nursery Essentials
                </a>
              </li>
              <li>
                <a href="#bedtime-books" className="hover:text-amber-300 transition">
                  Bible Bedtime Stories
                </a>
              </li>
              <li>
                <a href="#parent-qna" className="hover:text-amber-300 transition">
                  Parent Community Q&amp;A
                </a>
              </li>
            </ul>
          </div>

          {/* Media Channels */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Our Channels</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.youtube.com/channel/UC61MVViTRqXAQVKqqfIoqbA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition"
                >
                  <Youtube className="w-4 h-4 fill-red-500 text-red-500" />
                  <span>Calm Baby Nursery YouTube</span>
                </a>
              </li>
              <li>
                <Link
                  href="/consciousness/"
                  className="hover:text-amber-300 text-slate-300 transition flex items-center gap-1"
                >
                  <span>Consciousness &amp; Bio-Resonance Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="border-t border-slate-800/80 pt-6 space-y-2 text-[11px] text-slate-500 leading-relaxed text-center">
          <p>
            <strong>Amazon Associates Disclosure:</strong> Calm Baby Nursery participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by linking to Amazon.com.
          </p>
          <p>© {new Date().getFullYear()} Calm Baby Nursery. All rights reserved. Made with love for little hearts &amp; peaceful homes.</p>
        </div>
      </div>
    </footer>
  );
}
