'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Moon,
  Sparkles,
  Music,
  ShoppingBag,
  BookOpen,
  MessageSquareHeart,
  Mail,
  Youtube,
  Menu,
  X,
  Heart,
  Share2,
  Check,
} from 'lucide-react';

export default function BabyNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Calm Baby Nursery | Sleep, Lullabies & Nursery Care',
      text: 'Gentle infant sleep protocols, soothing lullabies, and curated nursery essentials for restful nights.',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url || window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (e) {
        // fallback
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-night-950/80 border-b border-indigo-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-indigo-500 to-sky-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-night-950 rounded-[14px] flex items-center justify-center">
                <Moon className="w-6 h-6 text-amber-300 fill-amber-300/30 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-extrabold tracking-wide text-white group-hover:text-amber-300 transition-colors">
                CALM BABY NURSERY
              </span>
              <span className="text-[10px] text-indigo-300/90 tracking-wider uppercase font-sans font-medium">
                Sleep, Lullabies &amp; Nursery Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <a
              href="#daily-sleep"
              onClick={(e) => handleNavClick(e, 'daily-sleep')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Daily Sleep Guide
            </a>
            <a
              href="#lullaby-player"
              onClick={(e) => handleNavClick(e, 'lullaby-player')}
              className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Music className="w-3.5 h-3.5 text-sky-400" />
              <span>Lullabies</span>
            </a>
            <a
              href="#baby-gear"
              onClick={(e) => handleNavClick(e, 'baby-gear')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              🧸 Nursery Gear
            </a>
            <a
              href="#bedtime-books"
              onClick={(e) => handleNavClick(e, 'bedtime-books')}
              className="hover:text-amber-300 text-amber-300/95 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Bedtime Books</span>
            </a>
            <a
              href="#parent-qna"
              onClick={(e) => handleNavClick(e, 'parent-qna')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              💬 Parent Q&amp;A
            </a>
            <a
              href="#newsletter"
              onClick={(e) => handleNavClick(e, 'newsletter')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              ✉️ Newsletter
            </a>

            {/* Garden Perks Link */}
            <a
              href="/techspec-digest/garden-perks/"
              target="_self"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-900/40 text-xs font-bold transition-all shadow-sm"
              title="The Garden Perks Botanical Portal"
            >
              <span>🌱 Garden Perks</span>
            </a>

            {/* YouTube Channel Button */}
            <a
              href="https://www.youtube.com/channel/UC61MVViTRqXAQVKqqfIoqbA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-900/30 text-xs font-semibold transition-all shadow-sm"
              title="Calm Baby Nursery YouTube"
            >
              <Youtube className="w-4 h-4 fill-red-500 text-red-500" />
              <span>YouTube</span>
            </a>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 hover:text-amber-200 hover:border-amber-400 text-xs font-semibold transition-all shadow-sm cursor-pointer"
              title="Share Calm Baby Nursery"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-amber-400 hover:text-amber-300 focus:outline-none"
              title="Share Calm Baby Nursery"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5 text-amber-400" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-300 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-indigo-500/20 bg-night-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="space-y-1">
            <a
              href="#daily-sleep"
              onClick={(e) => handleNavClick(e, 'daily-sleep')}
              className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-indigo-950/60 hover:text-amber-300 font-medium cursor-pointer"
            >
              Daily Sleep Guide
            </a>
            <a
              href="#lullaby-player"
              onClick={(e) => handleNavClick(e, 'lullaby-player')}
              className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-indigo-950/60 hover:text-amber-300 font-medium cursor-pointer"
            >
              🎵 Soothing Lullabies
            </a>
            <a
              href="#baby-gear"
              onClick={(e) => handleNavClick(e, 'baby-gear')}
              className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-indigo-950/60 hover:text-amber-300 font-medium cursor-pointer"
            >
              🧸 Nursery Gear Essentials
            </a>
            <a
              href="#bedtime-books"
              onClick={(e) => handleNavClick(e, 'bedtime-books')}
              className="block px-3 py-2 rounded-lg text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 font-semibold cursor-pointer"
            >
              📖 Bedtime Books Spotlight
            </a>
            <a
              href="#parent-qna"
              onClick={(e) => handleNavClick(e, 'parent-qna')}
              className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-indigo-950/60 hover:text-amber-300 font-medium cursor-pointer"
            >
              💬 Parent Q&amp;A
            </a>
            <a
              href="#newsletter"
              onClick={(e) => handleNavClick(e, 'newsletter')}
              className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-indigo-950/60 hover:text-amber-300 font-medium cursor-pointer"
            >
              ✉️ Sweet Dreams Newsletter
            </a>
            <a
              href="https://www.youtube.com/channel/UC61MVViTRqXAQVKqqfIoqbA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 bg-red-950/40 border border-red-500/30 font-medium"
            >
              <Youtube className="w-4 h-4 fill-red-500 text-red-500" />
              <span>Calm Baby Nursery YouTube</span>
            </a>
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 font-semibold cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
              <span>{copied ? 'Link Copied!' : 'Share Calm Baby Nursery'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
