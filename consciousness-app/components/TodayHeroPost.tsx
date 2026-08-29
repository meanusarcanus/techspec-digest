'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Tag,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Quote,
  CheckCircle2,
  Share2,
  BookOpen,
  ShoppingBag,
  Youtube,
  Headphones,
} from 'lucide-react';
import { DailyPost, DEFAULT_AFFILIATE_TAG } from '../data/dailyPosts';
import { formatDateDisplay, shiftDateByDays, getPostForDate } from '../lib/dailyEngine';
import { AmazonProductCard } from './AmazonProductCard';

export interface TodayHeroPostProps {
  initialDate?: Date;
  trackingTag?: string;
  onSelectCategory?: (category: string) => void;
}

export const TodayHeroPost: React.FC<TodayHeroPostProps> = ({
  initialDate = new Date(),
  trackingTag = DEFAULT_AFFILIATE_TAG,
  onSelectCategory,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const post: DailyPost = getPostForDate(currentDate);

  const handlePrevDay = () => {
    setCurrentDate((prev) => shiftDateByDays(prev, -1));
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => shiftDateByDays(prev, 1));
  };

  const handleResetToday = () => {
    setCurrentDate(new Date());
  };

  const isToday =
    currentDate.toDateString() === new Date().toDateString();

  // Structured JSON-LD Schema for Google Rich Snippets
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage.startsWith('/') ? `https://meanusarcanus.github.io/techspec-digest/consciousness${post.featuredImage}` : post.featuredImage,
    datePublished: post.formattedDate || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Products of Consciousness & Enlightenment',
      url: 'https://meanusarcanus.github.io/techspec-digest/consciousness/',
    },
  };

  return (
    <article className="w-full max-w-6xl mx-auto space-y-10">
      {/* Google Rich Snippet JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      {/* Date Navigation & Status Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-amber-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                {isToday ? "TODAY'S WISDOM INSIGHT" : 'CALENDAR ARCHIVE POST'}
              </span>
              {isToday && (
                <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-500/40">
                  <Sparkles className="w-3 h-3" /> ACTIVE
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-100">
              {formatDateDisplay(currentDate)}
            </h2>
          </div>
        </div>

        {/* Date Shifting Controls */}
        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          <button
            onClick={handlePrevDay}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl transition border border-slate-700 hover:border-slate-600"
            title="Previous Day's Post"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Day</span>
          </button>

          {!isToday && (
            <button
              onClick={handleResetToday}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold px-3 py-2 rounded-xl border border-amber-500/30 transition"
            >
              Back to Today
            </button>
          )}

          <button
            onClick={handleNextDay}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl transition border border-slate-700 hover:border-slate-600"
            title="Next Day's Post"
          >
            <span className="hidden sm:inline">Next Day</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Hero Header Card */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 relative z-10 items-center">
          {/* Left Column: Post Details */}
          <div className="lg:col-span-7 space-y-5">
            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectCategory && onSelectCategory(post.category)}
                className="bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold text-xs px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5"
              >
                <Tag className="w-3.5 h-3.5" />
                {post.category}
              </button>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {post.readTime}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-serif">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans border-l-2 border-amber-500/60 pl-4 py-1">
              {post.excerpt}
            </p>

            {/* Author Profile */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
              />
              <div>
                <div className="text-slate-100 font-semibold text-sm">{post.author.name}</div>
                <div className="text-slate-400 text-xs">{post.author.role}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image Showcase */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-950">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 sm:h-80 object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-amber-300/90 font-medium flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Daily Consciousness Digest • Entry #{post.id}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Essay Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 backdrop-blur-sm">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <BookOpen className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Essay Breakdown & Deeper Wisdom
          </h3>
        </div>

        {/* Main Essay Body Text */}
        <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
          {post.fullEssay.split('\n\n').map((paragraph, index) => (
            <p key={index} className={index === 0 ? 'first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-400 first-letter:mr-2 first-letter:float-left' : ''}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Structured Sections if provided */}
        {post.sections && post.sections.length > 0 && (
          <div className="space-y-6 pt-4">
            {post.sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4"
              >
                <h4 className="text-lg font-bold text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {section.title}
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {section.content}
                </p>
                {section.quote && (
                  <div className="bg-amber-950/30 border-l-4 border-amber-500 p-4 rounded-r-xl italic text-amber-200 text-sm flex items-start gap-3">
                    <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{section.quote}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Guided Practice Protocol Card */}
        {post.practiceProtocol && (
          <div className="bg-gradient-to-br from-slate-950 to-indigo-950/40 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h4 className="text-xl font-bold text-white">Daily Practice Protocol</h4>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="bg-indigo-950/80 text-indigo-300 px-3 py-1 rounded-full border border-indigo-700/50 font-semibold">
                  Duration: {post.practiceProtocol.duration}
                </span>
                <span className="bg-amber-950/80 text-amber-300 px-3 py-1 rounded-full border border-amber-700/50 font-semibold">
                  Focus: {post.practiceProtocol.focus}
                </span>
              </div>
            </div>

            <ul className="space-y-3 text-slate-300 text-sm sm:text-base">
              {post.practiceProtocol.steps.map((step, stepIdx) => (
                <li key={stepIdx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags Footer */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mr-2">
            Related Topics:
          </span>
          {post.tags.map((t, idx) => (
            <span
              key={idx}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-lg border border-slate-700 transition cursor-default"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Arcane Books Audio Companion & Spotify Podcast Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/40 via-purple-950/30 to-emerald-950/40 border border-amber-500/30 p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Youtube className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                <span>YouTube</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                <span>Spotify Podcast</span>
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Arcane Books: Audiobooks &amp; Esoteric Podcasts
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Immerse yourself in deep philosophical audiobooks, Hermetic teachings, and spoken esoteric wisdom curated by <strong>Arcane Books</strong>. Stream daily on YouTube and Spotify.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://open.spotify.com/search/Arcane%20Books"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Headphones className="w-4 h-4 text-white" />
              <span>Spotify Podcast</span>
            </a>
            <a
              href="https://www.youtube.com/@LogicLens-l9n"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* Integrated Amazon Curated Products Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShoppingBag className="w-4 h-4" /> Recommended Sacred Artifacts
            </div>
            <h3 className="text-2xl font-bold text-white font-serif">
              Curated Tools for Today's Practice
            </h3>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md">
            Hand-picked items aligned with today's insight to support your sound bath, meditation posture, or energetic focus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {post.amazonProducts.map((product) => (
            <AmazonProductCard
              key={product.id}
              product={product}
              trackingTag={trackingTag}
            />
          ))}
        </div>
      </section>
    </article>
  );
};
