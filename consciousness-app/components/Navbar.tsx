'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Menu, X, Radio, Compass, ShieldCheck, Flame, Youtube } from 'lucide-react';
import SearchModal from './SearchModal';

const FREQUENCIES = [
  { freq: '432 Hz', name: 'Universal Harmony', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
  { freq: '528 Hz', name: 'Transformation & DNA', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
  { freq: '7.83 Hz', name: 'Schumann Resonance', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
  { freq: '40 Hz', name: 'Gamma Focus Wave', color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [freqIndex, setFreqIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Shortcut key (Cmd+K / Ctrl+K) handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cycleFrequency = () => {
    setFreqIndex((prev) => (prev + 1) % FREQUENCIES.length);
  };

  const currentFreq = FREQUENCIES[freqIndex];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0F19]/90 backdrop-blur-md border-b border-indigo-500/20 shadow-lg shadow-black/40 py-3'
            : 'bg-[#0B0F19]/60 backdrop-blur-sm border-b border-indigo-500/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-indigo-700 p-[1px] shadow-sm shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all">
              <div className="w-full h-full rounded-xl bg-[#0B0F19] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="font-serif font-bold text-base sm:text-lg tracking-wide gold-gradient-text block">
                CONSCIOUSNESS & ENLIGHTENMENT
              </span>
              <span className="text-[10px] text-indigo-300/80 tracking-wider uppercase font-sans font-medium block">
                Products &amp; Bio-Resonance Lab
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <Link href="/#hero-product" className="hover:text-amber-400 transition-colors">
              Hero Review
            </Link>
            <Link href="/#archive-drawer" className="hover:text-amber-400 transition-colors">
              Archive Drawer
            </Link>
            <Link href="/about" className="hover:text-amber-400 transition-colors">
              About Lab
            </Link>
            <a
              href="https://www.youtube.com/@ArcaneBooks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-900/30 text-xs font-semibold transition-all shadow-sm"
              title="Arcane Books Official YouTube Channel"
            >
              <Youtube className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>Arcane Books</span>
            </a>
          </nav>

          {/* Action Bar (Search, Theme/Frequency Pill, Mobile Menu Button) */}
          <div className="flex items-center space-x-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-xs transition-all shadow-inner"
              title="Search products (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-indigo-900/60 rounded text-[10px] text-indigo-300 border border-indigo-500/20">
                ⌘K
              </kbd>
            </button>

            {/* Cosmic Frequency Indicator / Alignment Switcher */}
            <button
              onClick={cycleFrequency}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-sm ${currentFreq.color}`}
              title="Click to cycle cosmic alignment frequency"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>{currentFreq.freq}</span>
              <span className="hidden xl:inline text-[10px] opacity-80">({currentFreq.name})</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-slate-300 hover:text-amber-400 transition-colors"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-indigo-500/20 bg-[#0B0F19]/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3 mt-3">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-indigo-950/60 hover:text-amber-400 font-medium"
            >
              Home
            </Link>
            <Link
              href="/#hero-product"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-indigo-950/60 hover:text-amber-400 font-medium"
            >
              Hero Product
            </Link>
            <Link
              href="/#archive-drawer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-indigo-950/60 hover:text-amber-400 font-medium"
            >
              Archive Drawer
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-indigo-950/60 hover:text-amber-400 font-medium"
            >
              About
            </Link>
            <a
              href="https://www.youtube.com/@ArcaneBooks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 bg-red-950/40 border border-red-500/30 font-medium"
            >
              <Youtube className="w-4 h-4 fill-red-500 text-red-500" />
              <span>Arcane Books YouTube Channel</span>
            </a>
          </div>
        )}
      </header>

      {/* Search Modal Overlay */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
