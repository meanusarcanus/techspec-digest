'use client';

import React, { useState } from 'react';
import { X, Sparkles, User, Award, ShieldCheck, Check } from 'lucide-react';
import { loginGardenUser, GardenUser, getBadgeForCount } from '../lib/gardenAuthEngine';

interface BotanistLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: GardenUser) => void;
  actionTitle?: string;
}

const AVATAR_OPTIONS = ['🌿', '🌱', '🌺', '🌵', '🪴', '🍀', '🌻', '🌲'];

export default function BotanistLoginModal({
  isOpen,
  onClose,
  onSuccess,
  actionTitle = 'Sign In to Contribute'
}: BotanistLoginModalProps) {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🌿');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = username.trim().replace(/^@/, '');
    if (!clean) {
      setErrorMsg('Please enter a username or call-sign.');
      return;
    }
    if (clean.length < 2) {
      setErrorMsg('Username must be at least 2 characters.');
      return;
    }

    const user = loginGardenUser(clean, selectedAvatar);
    onSuccess(user);
    onClose();
  };

  const previewBadge = getBadgeForCount(1).badge;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
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
            Choose your botanist identity so your username and discovery badge appear on the Greenhouse catalogue.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Choose Avatar Icon
            </label>
            <div className="flex items-center justify-between gap-1.5 bg-slate-50 p-2 rounded-2xl border border-slate-200">
              {AVATAR_OPTIONS.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setSelectedAvatar(emoji)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
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

          {/* Username Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Botanist Username / Handle
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                @
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="e.g. theo, plant_doc, or green_sprout"
                className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                autoFocus
              />
            </div>
            {errorMsg && (
              <p className="text-[11px] text-red-500 font-semibold mt-1">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Badge Preview Callout */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                Unlockable Contributor Badge
              </span>
              <p className="text-xs font-bold text-slate-800">
                {previewBadge}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                Will be permanently engraved beside plants you add to the catalogue!
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
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
              <span>Sign In & Continue</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
