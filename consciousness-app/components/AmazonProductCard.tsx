'use client';

import React from 'react';
import { Star, ExternalLink, ShoppingBag, CheckCircle, ShieldCheck } from 'lucide-react';
import { AmazonProduct, DEFAULT_AFFILIATE_TAG } from '../data/dailyPosts';
import { ensureAffiliateUrl } from '../lib/dailyEngine';

export interface AmazonProductCardProps {
  product: AmazonProduct;
  trackingTag?: string;
  className?: string;
  compact?: boolean;
}

export const AmazonProductCard: React.FC<AmazonProductCardProps> = ({
  product,
  trackingTag = DEFAULT_AFFILIATE_TAG,
  className = '',
  compact = false,
}) => {
  const affiliateUrl = ensureAffiliateUrl(product.amazonUrl, trackingTag);

  // Render 5 SVG star rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    return (
      <div className="flex items-center space-x-0.5 text-amber-400">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />;
          } else if (i === fullStars && hasHalf) {
            return (
              <div key={i} className="relative w-4 h-4">
                <Star className="w-4 h-4 text-amber-400/30" />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
              </div>
            );
          } else {
            return <Star key={i} className="w-4 h-4 text-amber-400/30" />;
          }
        })}
      </div>
    );
  };

  return (
    <div
      className={`group relative bg-slate-900/90 border border-amber-500/20 hover:border-amber-500/50 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between backdrop-blur-md ${className}`}
    >
      {/* Badge Ribbon if present */}
      {product.badge && (
        <div className="absolute -top-3 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs px-3 py-1 rounded-full shadow-md tracking-wide uppercase flex items-center gap-1 z-10">
          <ShieldCheck className="w-3.5 h-3.5" />
          {product.badge}
        </div>
      )}

      <div>
        {/* Product Image Container */}
        <div className="relative w-full h-48 sm:h-52 mb-4 rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800 flex items-center justify-center p-3 group-hover:border-amber-500/30 transition-colors">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            {renderStars(product.rating)}
            <span className="text-amber-400 font-semibold text-xs">{product.rating}</span>
          </div>
          <span className="text-slate-400 text-xs font-medium">
            ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Product Title */}
        <h4 className="text-slate-100 font-semibold text-base sm:text-lg line-clamp-2 mb-2 group-hover:text-amber-300 transition-colors leading-snug">
          {product.title}
        </h4>

        {/* Price display */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-amber-400 tracking-tight">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-500 line-through font-medium">
              {product.originalPrice}
            </span>
          )}
          <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md flex items-center gap-1 ml-auto">
            <CheckCircle className="w-3 h-3" /> In Stock
          </span>
        </div>

        {/* Short Description */}
        {!compact && (
          <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-5">
            {product.description}
          </p>
        )}
      </div>

      {/* High-Converting CTA Button */}
      <div className="pt-2 border-t border-slate-800/80">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center justify-center gap-2 group/btn text-sm tracking-wide text-center"
        >
          <ShoppingBag className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5" />
          <span>Check Price on Amazon</span>
          <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
        </a>
        <div className="text-center mt-1.5">
          <span className="text-[10px] text-slate-500 tracking-wider uppercase">
            Amazon Affiliate Link • Tag: {trackingTag}
          </span>
        </div>
      </div>
    </div>
  );
};
