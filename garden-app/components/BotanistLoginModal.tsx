'use client';

import React, { useState } from 'react';
import { X, Sparkles, User, Award, Mail, ShieldCheck, Check, BellRing } from 'lucide-react';
import { loginGardenUser, GardenUser, getBadgeForCount } from '../lib/gardenAuthEngine';

interface BotanistLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: GardenUser) => void;
  actionTitle?: string;
  actionSubtitle?: string;
}

const AVATAR_OPTIONS = ['🌿', '🌱', '🌺', '🌵', '🪴', '🍀', '🌻', '🌲'];

export default function BotanistLoginModal({
  isOpen,
  onClose,
  onSuccess,
  actionTitle = 'Sign In to Garden Perks',
  actionSubtitle
}: BotanistLoginModalProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [hasCustomUsername, setHasCustomUsername] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('🌿');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (errorMsg) setErrorMsg('');
    if (!hasCustomUsername && val.includes('@')) {
      const prefix = val.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
      if (prefix) setUsername(prefix);
    }
  };

  const handleUsernameChange = (val: string) => {
    setUsername(val);
    setHasCustomUsername(true);
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const cleanUsername = (username.trim() || cleanEmail.split('@')[0]).replace(/^@/, '');
    if (cleanUsername.length < 2) {
      setErrorMsg('Username must be at least 2 characters.');
      return;
    }

    const user = loginGardenUser(cleanEmail, cleanUsername, selectedAvatar);
    onSuccess(user);
    onClose();
  };

  const previewBadge = getBadgeForCount(1).badge;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg">
            {selectedAvatar}
          </div>

          <h3 className="text-xl font-black text-white tracking-tight">
            {actionTitle}
          </h3>
          <p className="text-xs text-emerald-200 mt-1 max-w-xs mx-auto">
            {actionSubtitle || 'Sign in with your email to unlock Dr. Flora clinic consultations, contribute species to the catalogue, and receive our morning dispatch.'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Email Input (Required) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-[10px] text-emerald-600 font-bold lowercase tracking-normal">required</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                autoFocus
              />
            </div>
            {errorMsg && (
              <p className="text-[11px] text-red-500 font-semibold mt-1">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Botanist Callsign / Handle</span>
              <span className="text-[10px] text-slate-400 font-normal lowercase tracking-normal">visible on catalogue</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                @
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder="e.g. theo or green_thumb"
                className="w-full pl-8 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Choose Avatar Icon
            </label>
            <div className="flex items-center justify-between gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
              {AVATAR_OPTIONS.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setSelectedAvatar(emoji)}
                  className={`w-8 h-8 rounded-xl text-base flex items-center justify-center transition-all cursor-pointer ${
                    selectedAvatar === emoji
                      ? 'bg-emerald-600 text-white shadow-md scale-110'
                      : 'hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Automatic Newsletter & Perks Callout */}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 space-y-1.5 text-left">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
              <BellRing className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free VIP Membership Included</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Signing in automatically enrolls your email into <strong>The Daily Sprout Newsletter</strong> (morning care profiles & pest defense) and unlocks <strong>Dr. Flora AI Clinic consultations</strong>.
            </p>
            <div className="flex items-center gap-2 pt-0.5 text-[10px] text-emerald-700 font-semibold">
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Contributor Badge: {previewBadge}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-1 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-black shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Sign In & Join VIP</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
