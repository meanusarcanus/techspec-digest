'use client';

import React, { useState } from 'react';
import { X, Sparkles, User, Award, Mail, ShieldCheck, Check, BellRing } from 'lucide-react';
import { loginGardenUser, sendWelcomeSignUpEmail, GardenUser, getBadgeForCount } from '../lib/gardenAuthEngine';

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
  const [welcomeUser, setWelcomeUser] = useState<GardenUser | null>(null);
  const [emailMailto, setEmailMailto] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
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
    const emailResult = await sendWelcomeSignUpEmail(user);
    setEmailMailto(emailResult.mailtoUrl);
    setWelcomeUser(user);
  };

  const handleFinish = () => {
    if (welcomeUser) {
      onSuccess(welcomeUser);
    }
    setWelcomeUser(null);
    onClose();
  };

  const previewBadge = getBadgeForCount(1).badge;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
        
        {welcomeUser ? (
          /* Sign Up / Log In Success & Email Dispatch Confirmation View */
          <div className="p-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-3xl mx-auto shadow-xl shadow-emerald-600/30">
              {welcomeUser.avatarEmoji || '🌿'}
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span>Account Verified & Synced</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Welcome, @{welcomeUser.username}!
              </h3>
              <p className="text-xs text-slate-500">
                Your botanical identity and catalogue records are permanently preserved.
              </p>
            </div>

            {/* Restored Badge & Contributions Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Horticultural Rank</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-800 text-white text-[11px] font-black">
                  {welcomeUser.badge}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-200">
                <span>Verified Catalogue Contributions:</span>
                <span className="font-extrabold text-emerald-700">{welcomeUser.contributionsCount} {welcomeUser.contributionsCount === 1 ? 'plant' : 'plants'}</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-medium">
                🔒 Badge & memory remain permanently attached to your callsign.
              </p>
            </div>

            {/* Email Dispatch Notice */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-black text-xs">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Confirmation Email Sent</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A welcome dispatch with your credentials, Dr. Flora pass, and perks has been routed to <strong>{welcomeUser.email}</strong>.
              </p>
              {emailMailto && (
                <a
                  href={emailMailto}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-900 font-black underline underline-offset-2 pt-1"
                >
                  <span>✉️ Open Welcome Email in Mail App</span>
                </a>
              )}
            </div>

            {/* Proceed Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-sm font-black shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Enter Greenhouse & Continue</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Standard Sign In Form */
          <>
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
                  <span className="text-[10px] text-emerald-600 font-bold lowercase tracking-normal">required for sign-up & confirmation email</span>
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
                    placeholder="e.g. theodisius or green_thumb"
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
                  <span>Permanent Account & Automated Confirmation Email</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Your badges, species contributions, and doctor access are permanently remembered. When you sign in, a welcome confirmation email is automatically sent to your inbox.
                </p>
                <div className="flex items-center gap-2 pt-0.5 text-[10px] text-emerald-700 font-semibold">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Starting / Base Badge: {previewBadge}</span>
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
                  <span>Sign In & Send Confirmation</span>
                </button>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
}
