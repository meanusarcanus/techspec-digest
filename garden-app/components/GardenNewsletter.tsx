'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, CheckCircle2, X, Leaf, ShieldCheck, Heart, BellRing, Loader2 } from 'lucide-react';
import { getCurrentGardenUser, autoSubscribeToNewsletter, loginGardenUser, sendWelcomeSignUpEmail, GardenUser } from '../lib/gardenAuthEngine';
import { syncNewsletterSubscriptionToCloud } from '../lib/newsletterCloudSync';

interface NewsletterProps {
  isOpen?: boolean;
  onClose?: () => void;
  isBannerOnly?: boolean;
}

export default function GardenNewsletter({ isOpen, onClose, isBannerOnly }: NewsletterProps) {
  const [currentUser, setCurrentUser] = useState<GardenUser | null>(() => getCurrentGardenUser());
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailDispatched, setEmailDispatched] = useState<boolean | null>(null);
  const [indoorChecked, setIndoorChecked] = useState(true);
  const [edibleChecked, setEdibleChecked] = useState(true);
  const [pestChecked, setPestChecked] = useState(true);

  useEffect(() => {
    const handleSync = () => {
      const u = getCurrentGardenUser();
      setCurrentUser(u);
      if (u?.email) {
        setEmail(u.email);
      }
    };
    handleSync();
    window.addEventListener('garden_user_updated', handleSync);
    return () => window.removeEventListener('garden_user_updated', handleSync);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || isSubmitting) return;

    setIsSubmitting(true);
    const user = currentUser || loginGardenUser(cleanEmail);
    autoSubscribeToNewsletter(cleanEmail, user.username);

    // Sync to Firestore & dispatch real welcome email through Hostinger PHP mailer
    const result = await syncNewsletterSubscriptionToCloud({
      email: cleanEmail,
      username: user.username,
      user,
      preferences: {
        indoor: indoorChecked,
        edible: edibleChecked,
        pests: pestChecked
      },
      source: isBannerOnly ? 'newsletter_banner' : 'newsletter_modal'
    });

    await sendWelcomeSignUpEmail(user);
    setEmailDispatched(result.emailDispatched);
    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      if (onClose && !isBannerOnly) {
        onClose();
        setSubmitted(false);
        setEmail('');
        setEmailDispatched(null);
      }
    }, 4500);
  };

  // 1. In-Page Section / Banner Form
  if (isBannerOnly) {
    return (
      <div className="my-16 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>The Daily Sprout Botanical Newsletter</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
            Grow Your Greenest Life Every Morning
          </h3>

          <p className="text-sm sm:text-base text-emerald-200/90 leading-relaxed">
            Join over 12,000 passionate plant parents. Get our daily plant care profile, organic troubleshooting recipes, and private Amazon gear deals delivered straight to your inbox.
          </p>

          {currentUser && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-700/80 border border-emerald-400/40 text-emerald-100 text-xs font-semibold shadow-inner">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Signed in as @{currentUser.username} ({currentUser.email}) — automatically enrolled in The Daily Sprout VIP!</span>
            </div>
          )}

          {submitted ? (
            <div className="p-5 rounded-2xl bg-emerald-700/90 border border-emerald-400/50 text-emerald-100 text-center space-y-1.5 animate-in fade-in">
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>Welcome to The Daily Sprout VIP Society!</span>
              </div>
              <p className="text-xs text-emerald-200/90 max-w-md mx-auto">
                Your email is registered with our botanical society. We've dispatched your VIP welcome guide and Master Aroid Soil Blend recipe to <strong>{email}</strong>!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your best gardening email..."
                  className="flex-1 px-4 py-3.5 rounded-xl bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-medium disabled:opacity-70"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all transform active:scale-95 whitespace-nowrap flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Subscribe Free</span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-emerald-300/80 pt-2 flex-wrap">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={indoorChecked} onChange={(e) => setIndoorChecked(e.target.checked)} className="rounded text-emerald-600 focus:ring-0" />
                  <span>Indoor Tropicals</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={edibleChecked} onChange={(e) => setEdibleChecked(e.target.checked)} className="rounded text-emerald-600 focus:ring-0" />
                  <span>Edible Raised Beds</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={pestChecked} onChange={(e) => setPestChecked(e.target.checked)} className="rounded text-emerald-600 focus:ring-0" />
                  <span>Organic Pest Defense</span>
                </label>
              </div>
            </form>
          )}

        </div>
      </div>
    );
  }

  // 2. Modal Version
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            Join The Daily Sprout 🌱
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
            Get daily plant care breakthroughs, seasonal pest alerts, and exclusive discounts on curated Amazon botanical gear.
          </p>
        </div>

        {submitted ? (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-2 animate-in fade-in">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-emerald-900">You're officially on the list!</h4>
            <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
              We have dispatched your VIP welcome guide and Master Aroid Soil Blend recipe to <strong>{email}</strong>. Check your inbox (or spam folder)!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentUser && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Signed in as <strong>@{currentUser.username}</strong> ({currentUser.email}). VIP perks active!</span>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Your Email Address
              </label>
              <input
                type="email"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="green.thumb@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-slate-50/50 disabled:opacity-70"
              />
            </div>

            <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Choose Your Daily Topics:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="checkbox" checked={indoorChecked} onChange={(e) => setIndoorChecked(e.target.checked)} className="rounded text-emerald-600" />
                  <span>Indoor Houseplants</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="checkbox" checked={edibleChecked} onChange={(e) => setEdibleChecked(e.target.checked)} className="rounded text-emerald-600" />
                  <span>Edibles & Herbs</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="checkbox" checked={pestChecked} onChange={(e) => setPestChecked(e.target.checked)} className="rounded text-emerald-600" />
                  <span>Pest & Disease Rx</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-emerald-700/20 transition-all transform active:scale-98 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Subscribing & Dispatching Email...</span>
                </>
              ) : (
                <span>Subscribe Free</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero spam. Unsubscribe with 1-click anytime.</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
