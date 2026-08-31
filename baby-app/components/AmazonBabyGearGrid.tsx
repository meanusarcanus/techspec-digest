'use client';

import React from 'react';
import {
  ShoppingBag,
  Star,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Heart,
  Package,
} from 'lucide-react';

export default function AmazonBabyGearGrid() {
  const products = [
    {
      asin: 'B06XMRCC94',
      title: 'Hatch Rest Baby Sound Machine, Night Light & Sleep Trainer',
      category: 'Sound Machines & Soothers',
      price: '$59.99',
      rating: 4.9,
      reviews: '34,000+ Reviews',
      description:
        'Customizable nightlight with soothing white noise, ocean waves, and gentle lullaby melodies controlled via smartphone app.',
      imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
      highlights: ['App Controlled Sounds', 'Time-to-Rise Color Signals', 'Toddler Sleep Training'],
    },
    {
      asin: 'B014A7M58M',
      title: 'Halo 100% Cotton SleepSack Swaddle Blanket for Newborns',
      category: 'Swaddles & Sleep Sacks',
      price: '$29.99',
      rating: 4.8,
      reviews: '18,000+ Reviews',
      description:
        'Safe sleep 3-way adjustable wearable blanket recognized by the International Hip Dysplasia Institute.',
      imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
      highlights: ['Safe Sleep Certified', '100% Breathable Cotton', 'Prevents Startle Reflex'],
    },
    {
      asin: 'B0798C71Z5',
      title: 'Gund Baby Animated Plush Sleep Soother Teddy Bear',
      category: 'Nursery Plush Soothers',
      price: '$39.99',
      rating: 4.9,
      reviews: '12,500+ Reviews',
      description:
        'Super-soft animated plush bear with gentle moving mouth, playing soothing peek-a-boo and bedtime lullabies.',
      imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80',
      highlights: ['Interactive Animated Plush', 'Plays Soothing Lullabies', 'Ultra-Soft Velour Fabric'],
    },
    {
      asin: 'B08R7M2F5D',
      title: 'Nanit Pro Smart Baby Monitor & Wall Mount Camera',
      category: 'Smart Nursery Monitors',
      price: '$249.99',
      rating: 4.8,
      reviews: '9,200+ Reviews',
      description:
        '1080p HD video overhead monitor with sleep tracking metrics, temperature and humidity sensors, and crystal 2-way audio.',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      highlights: ['1080p Crystal HD Video', 'Breathing Motion Monitoring', 'Pediatric Sleep Insights'],
    },
    {
      asin: 'B00FEGO2T6',
      title: 'Newton Baby 100% Breathable & Washable Crib Mattress',
      category: 'Crib Bedding & Mattresses',
      price: '$299.99',
      rating: 4.9,
      reviews: '6,800+ Reviews',
      description:
        'Pediatrician recommended innovative Breathe-Thru technology to reduce suffocation risks and regulate infant temperature.',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      highlights: ['100% Breathable Core', 'Fully Washable Cover & Core', 'Zero Toxic Glues or Latex'],
    },
  ];

  return (
    <section id="baby-gear" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 scroll-mt-28">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Package className="w-4 h-4 text-amber-400" />
            <span>Curated Nursery Essentials &amp; Sleep Gear</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white gold-gradient-text">
            Pediatric-Approved Nursery Essentials
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Top-rated baby sleep aids, breathable bedding, and soothing monitors to create a safe, peaceful sleep sanctuary for your little one.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => {
            const affiliateUrl = `https://www.amazon.com/dp/${p.asin}?tag=techspecdiges-20`;
            return (
              <div
                key={p.asin}
                className="rounded-3xl p-6 bg-gradient-to-b from-[#13192B] via-[#0B0F19] to-[#120F1D] border border-indigo-500/25 hover:border-amber-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-indigo-500/30 bg-slate-950">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-night-950/80 border border-slate-700 text-sky-300">
                      {p.category}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-serif text-base font-bold text-white leading-snug line-clamp-2">
                      {p.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center text-amber-400 gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-slate-200">{p.rating}</span>
                        <span className="text-slate-400 text-[11px]">({p.reviews})</span>
                      </div>
                      <span className="font-bold text-sm text-amber-300">{p.price}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {p.description}
                  </p>

                  <div className="space-y-1 pt-1">
                    {p.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Check Price on Amazon</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-75" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
