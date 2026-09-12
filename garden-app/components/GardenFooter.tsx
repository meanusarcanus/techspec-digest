'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Heart, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function GardenFooter() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                The Garden Perks
              </span>
            </div>
            <p className="text-sm text-emerald-300/80 leading-relaxed">
              Your daily botanical sanctuary providing science-backed houseplant guides, organic pest solutions, and curated garden essentials.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Amazon Associate Verified Partner</span>
            </div>
          </div>

          {/* Quick Care Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-200">
              Botanical Categories
            </h4>
            <ul className="space-y-2 text-sm text-emerald-300/80">
              <li><Link href="/greenhouse?category=Indoor" className="hover:text-white transition-colors">🌿 Indoor Houseplants</Link></li>
              <li><Link href="/greenhouse?category=Ornamental" className="hover:text-white transition-colors">🌸 Flowering Ornamentals</Link></li>
              <li><Link href="/greenhouse?category=Edible" className="hover:text-white transition-colors">🍅 Edible Gardens & Herbs</Link></li>
              <li><Link href="/greenhouse?category=Succulents" className="hover:text-white transition-colors">🌵 Succulents & Rare Flora</Link></li>
              <li><Link href="/clinic" className="hover:text-white transition-colors">🩺 Plant Doctor Clinic</Link></li>
            </ul>
          </div>

          {/* Sister Network Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-200">
              Sister Portals
            </h4>
            <ul className="space-y-2 text-sm text-emerald-300/80">
              <li>
                <a href="https://theodisius.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>🏛️ Theodisius (Root)</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a href="https://digest.theodisius.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>⚡ TechSpec Digest (Hub)</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a href="https://digest.theodisius.com/consciousness/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>🌌 Consciousness Lab</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a href="https://digest.theodisius.com/baby-care/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>🍼 Calm Baby Nursery</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Amazon Affiliate Disclosure & Mission */}
          <div className="space-y-3 md:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-200">
              Affiliate Transparency
            </h4>
            <p className="text-xs text-emerald-300/70 leading-relaxed bg-emerald-900/40 p-3.5 rounded-xl border border-emerald-800/60">
              <strong>Amazon Associate Disclosure:</strong> The Garden Perks participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com with tracking tag <code>tag=techspecdiges-20</code>.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-900/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p>&copy; 2026 The Garden Perks & TechSpec Digest Network. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Nurtured with organic care for plants and people</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
