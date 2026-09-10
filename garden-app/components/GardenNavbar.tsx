'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Search, Sparkles, MessageCircleHeart, Sprout, ShoppingBag, Menu, X, ArrowUpRight, User, LogOut, Share2, Check } from 'lucide-react';
import BotanistLoginModal from './BotanistLoginModal';
import { getCurrentGardenUser, logoutGardenUser, GardenUser } from '../lib/gardenAuthEngine';

interface NavbarProps {
  onOpenNewsletter?: () => void;
  onSearchFocus?: () => void;
  onSwitchToMobile?: () => void;
}

export default function GardenNavbar({ onOpenNewsletter, onSearchFocus, onSwitchToMobile }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<GardenUser | null>(() => getCurrentGardenUser());
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'The Garden Perks | Daily Botanical Care & Guides',
      text: 'Explore plant care guides, greenhouse archives, and expert plant clinic diagnostics.',
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

  useEffect(() => {
    const handleUserUpdate = () => {
      setCurrentUser(getCurrentGardenUser());
    };
    handleUserUpdate();
    window.addEventListener('garden_user_updated', handleUserUpdate);
    return () => window.removeEventListener('garden_user_updated', handleUserUpdate);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Leaf className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-emerald-950 flex items-center gap-1.5 font-sans">
                  The Garden Perks <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-widest -mt-0.5">
                  Daily Botanical Care & Guides
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link 
              href="/" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 rounded-xl transition-all"
            >
              Today's Plant
            </Link>
            <Link 
              href="/greenhouse" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Sprout className="w-4 h-4 text-emerald-600" />
              Greenhouse Archive
            </Link>
            <Link 
              href="/clinic" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 rounded-xl transition-all flex items-center gap-1.5"
            >
              <MessageCircleHeart className="w-4 h-4 text-emerald-600" />
              Plant Clinic Q&A
            </Link>
            <a 
              href="https://www.amazon.com/s?k=garden+plants+care+tools+indoor+houseplants&tag=techspecdiges-20"
              target="_blank"
              rel="noopener noreferrer" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 rounded-xl transition-all flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              Amazon Gears
            </a>

            {/* Portal Network Switcher Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/80 rounded-lg flex items-center gap-1.5 transition-colors border border-emerald-200"
              >
                <span>🌐 Portals</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {portalDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-emerald-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setPortalDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Our Network Portals
                  </div>
                  <a 
                    href="/techspec-digest/" 
                    target="_self"
                    className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                  >
                    <span>⚡ TechSpec Digest (Hub)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a 
                    href="/techspec-digest/consciousness/" 
                    target="_self"
                    className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <span>🌌 Consciousness Lab</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a 
                    href="/techspec-digest/baby-care/" 
                    target="_self"
                    className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <span>🍼 Calm Baby Nursery</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <div className="flex items-center justify-between p-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50">
                    <span>🌱 The Garden Perks</span>
                    <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full">Active</span>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 shadow-2xs">
                <span className="text-sm">{currentUser.avatarEmoji || '🌿'}</span>
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-emerald-900 leading-none">@{currentUser.username}</span>
                  <span className="text-[9px] text-emerald-600 font-semibold leading-none mt-0.5">📬 Subscribed</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-700 text-white text-[9px] uppercase tracking-wider font-black">
                  {currentUser.badge}
                </span>
                <button
                  onClick={() => logoutGardenUser()}
                  className="p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white/60 transition-colors ml-0.5 cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 shadow-2xs transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Botanist Sign In</span>
              </button>
            )}

            {onSwitchToMobile && (
              <button
                onClick={onSwitchToMobile}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs transition-all cursor-pointer"
                title="Switch to Phone PWA View"
              >
                <span>📱 Phone View</span>
              </button>
            )}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs transition-all cursor-pointer"
              title="Share The Garden Perks"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-emerald-600" />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={onOpenNewsletter}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join Newsletter</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-emerald-50 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-emerald-100 px-4 pt-2 pb-6 space-y-2">
          {currentUser ? (
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentUser.avatarEmoji || '🌿'}</span>
                <div>
                  <span className="font-extrabold text-emerald-950 text-sm">@{currentUser.username}</span>
                  <span className="text-[10px] text-emerald-700 block">{currentUser.badge}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  logoutGardenUser();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-red-600 font-bold px-2.5 py-1 rounded-lg hover:bg-red-50 border border-red-200 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setLoginModalOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 text-sm font-bold flex items-center justify-center gap-2 border border-slate-200 mb-2 cursor-pointer"
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>Botanist Sign In (Email)</span>
            </button>
          )}

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-emerald-50"
          >
            🌿 Today's Featured Plant
          </Link>
          <Link
            href="/greenhouse"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-emerald-50"
          >
            🌱 Greenhouse Care Archive
          </Link>
          <Link
            href="/clinic"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-emerald-50"
          >
            🩺 Plant Clinic Q&A & Auto-Doctor
          </Link>
          <a
            href="https://www.amazon.com/s?k=garden+plants+care+tools+indoor+houseplants&tag=techspecdiges-20"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-emerald-50"
          >
            🛍️ Amazon Gears
          </a>
          <button
            onClick={handleShare}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-sm font-bold flex items-center justify-center gap-2 border border-emerald-200 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-emerald-600" />}
            <span>{copied ? 'Link Copied!' : 'Share The Garden Perks'}</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenNewsletter?.();
            }}
            className="w-full mt-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-center text-sm shadow-md"
          >
            ✨ Subscribe to The Daily Sprout
          </button>
        </div>
      )}

      {/* Botanist Login Modal */}
      <BotanistLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={(u) => setCurrentUser(u)}
        actionTitle="Botanist Sign In"
      />
    </header>
  );
}
