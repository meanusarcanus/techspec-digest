'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, Send, CheckCircle2, ShieldCheck, Bell, Radio } from 'lucide-react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    // Dispatch notification to meanusarcanus@gmail.com
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'b1d0339d-2c8c-4a3a-a5f1-meanusarcanus',
          to_email: 'meanusarcanus@gmail.com',
          from_name: name || 'Consciousness Seeker',
          email: email,
          subject: `✨ New Newsletter Subscriber: ${email}`,
          message: `A new reader has subscribed to the Daily Dawn Dispatch!\n\nSubscriber Name: ${name || 'Seeker'}\nEmail: ${email}\nDate: ${new Date().toISOString()}`,
        }),
      }).catch(() => {});
    } catch {
      // Static fallback resilience
    }

    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail('');
    setName('');
  };

  return (
    <section id="newsletter" className="max-w-7xl mx-auto my-14 px-4 sm:px-6 lg:px-8 scroll-mt-28">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#15102A] via-[#0B0F19] to-[#181122] border border-amber-500/30 p-8 sm:p-12 shadow-2xl text-center space-y-6">
        {/* Ambient Glows */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>The Daily Dawn Dispatch • Free Wisdom Newsletter</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white gold-gradient-text">
            Awaken Your Morning with Sacred Insights
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Receive curated daily meditation protocols, Solfeggio sound frequency guides, sacred geometry studies, and new esoteric book releases delivered to your inbox each morning at dawn.
          </p>

          {isSubscribed ? (
            <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-2 mt-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="font-serif text-lg font-bold text-white">
                Welcome to the Inner Circle! 🌟
              </h4>
              <p className="text-xs text-slate-300">
                You are now subscribed to the Daily Dawn Dispatch. Check your inbox for upcoming morning wisdom transmissions.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pt-4 space-y-3 max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 shadow-inner transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 whitespace-nowrap disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Subscribing...' : 'Subscribe Free'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Privacy. Zero spam.
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Daily Dawn Delivery
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
