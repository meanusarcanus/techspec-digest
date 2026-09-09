'use client';

import React from 'react';
import { ShoppingCart, Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { AmazonProduct } from '../data/plantCareGuides';

interface ProductCardProps {
  product: AmazonProduct;
  featured?: boolean;
}

export default function AmazonProductCard({ product, featured }: ProductCardProps) {
  const amazonUrl = `https://www.amazon.com/s?k=${product.searchQuery}&tag=techspecdiges-20`;

  return (
    <div className={`group relative bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden ${
      featured 
        ? 'border-emerald-300 shadow-lg shadow-emerald-700/10 ring-2 ring-emerald-500/20' 
        : 'border-slate-200 hover:border-emerald-300 hover:shadow-md'
    }`}>
      
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white rounded-full shadow-md">
            {product.badge}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 sm:h-52 w-full bg-slate-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
            {product.category}
          </span>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
            {product.name}
          </h4>
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Rating */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviewsCount.toLocaleString()})</span>
          </div>
          <span className="text-lg font-black text-slate-900 font-mono">
            {product.price}
          </span>
        </div>

        {/* CTA Button */}
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-black tracking-wide shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>CHECK PRICE ON AMAZON</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>
    </div>
  );
}
