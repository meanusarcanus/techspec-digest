'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircleHeart, Send, Bot, User, ThumbsUp, Sparkles, CheckCircle2, ShieldAlert, Clock, Lock, Mail, BellRing } from 'lucide-react';
import { generatePlantDoctorDiagnosis, DoctorDiagnosis } from '../lib/botanicalDoctor';
import { getCurrentGardenUser, GardenUser } from '../lib/gardenAuthEngine';
import BotanistLoginModal from './BotanistLoginModal';
import { subscribeToClinicConsultations, saveClinicPostToCloud, likeClinicPostInCloud } from '../lib/clinicCloudSync';

export interface ClinicPost {
  id: string;
  author: string;
  avatarColor: string;
  plantName: string;
  question: string;
  timestamp: string;
  likesCount: number;
  doctorReply?: DoctorDiagnosis;
}

const INITIAL_COMMUNITY_POSTS: ClinicPost[] = [
  {
    id: 'post-01',
    author: 'Elena R. (Indoor Jungle Enthusiast)',
    avatarColor: 'from-emerald-500 to-teal-600',
    plantName: 'Monstera Deliciosa',
    question: 'My lower Monstera leaves are turning yellow and the stems feel a little limp. I have been watering every Sunday. Is this root rot?',
    timestamp: '2 hours ago',
    likesCount: 14,
    doctorReply: generatePlantDoctorDiagnosis('My lower leaves are turning yellow and limp overwatering rot', 'Monstera Deliciosa')
  },
  {
    id: 'post-02',
    author: 'Marcus Vance',
    avatarColor: 'from-amber-500 to-orange-600',
    plantName: 'Calathea Orbifolia',
    question: 'The outer edges of my Calathea leaves are turning crispy brown and curling upward. I use tap water and the room is air-conditioned. What should I do?',
    timestamp: '5 hours ago',
    likesCount: 9,
    doctorReply: generatePlantDoctorDiagnosis('outer edges turning crispy brown and curling tap water dry air', 'Calathea Orbifolia')
  },
  {
    id: 'post-03',
    author: 'Chloe Lin',
    avatarColor: 'from-purple-500 to-indigo-600',
    plantName: 'Fiddle Leaf Fig',
    question: 'I noticed tiny red speckles across the new top leaf that just unfurled yesterday. Are these spider mites or something else?',
    timestamp: 'Yesterday',
    likesCount: 19,
    doctorReply: {
      greeting: "Hello Chloe! 🌿 Dr. Flora here from The Garden Perks Clinic.",
      diagnosisSummary: "Good news: this is likely Edema, not spider mites!",
      probableCause: "Edema occurs when the root system absorbs water faster than the new unfurling leaf cells can transpire, causing tiny cellular bursts that leave harmless red dots.",
      stepByStepRemedy: [
        "Maintain a steady, consistent watering rhythm rather than letting soil go bone-dry before heavy floods.",
        "Ensure your Fiddle Leaf Fig receives bright, direct morning sunlight near an east or south window.",
        "The red speckles will naturally fade as the green leaf expands and matures over the next month."
      ],
      recommendedToolOrOrganicAid: "Use a specialized 3-1-2 Fiddle Leaf Fig liquid food to strengthen cellular walls!",
      signoff: "Your tree is doing great—keep up the great care! 🌿✨"
    }
  }
];

export default function PlantClinicCommunity() {
  const [posts, setPosts] = useState<ClinicPost[]>([]);
  const [activeUser, setActiveUser] = useState<GardenUser | null>(() => getCurrentGardenUser());
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authorInput, setAuthorInput] = useState('');
  const [plantInput, setPlantInput] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  useEffect(() => {
    // Real-time synchronization with Firebase Firestore
    const unsub = subscribeToClinicConsultations((cloudPosts) => {
      setPosts(cloudPosts);
    }, INITIAL_COMMUNITY_POSTS);

    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  useEffect(() => {
    const handleUserSync = () => {
      const u = getCurrentGardenUser();
      setActiveUser(u);
      if (u) {
        setAuthorInput(`@${u.username}`);
      }
    };
    handleUserSync();
    window.addEventListener('garden_user_updated', handleUserSync);
    return () => window.removeEventListener('garden_user_updated', handleUserSync);
  }, []);

  const handleLike = (id: string) => {
    const updated = posts.map(p => {
      if (p.id === id) {
        return { ...p, likesCount: p.likesCount + 1 };
      }
      return p;
    });
    setPosts(updated);
    try {
      localStorage.setItem('garden_perks_clinic_posts', JSON.stringify(updated));
    } catch (e) {}

    // Cloud sync like to Firestore
    likeClinicPostInCloud(id).catch(() => {});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUser) {
      setShowLoginModal(true);
      return;
    }
    if (!questionInput.trim()) return;

    setIsSubmitting(true);

    const displayName = activeUser.displayName 
      ? `${activeUser.displayName} (@${activeUser.username})` 
      : `@${activeUser.username}`;

    // Generate intelligent AI doctor reply based on symptoms
    const generatedDoctorReply = generatePlantDoctorDiagnosis(
      questionInput,
      plantInput.trim() || 'Your Botanical Specimen'
    );

    setTimeout(() => {
      const newPost: ClinicPost = {
        id: `post-${Date.now()}`,
        author: displayName,
        avatarColor: 'from-emerald-600 to-teal-500',
        plantName: plantInput.trim() || 'Indoor Houseplant',
        question: questionInput.trim(),
        timestamp: 'Just now',
        likesCount: 1,
        doctorReply: generatedDoctorReply
      };

      const updated = [newPost, ...posts];
      setPosts(updated);
      try {
        localStorage.setItem('garden_perks_clinic_posts', JSON.stringify(updated));
      } catch (e) {}

      // Save to Firebase Firestore cloud in background
      saveClinicPostToCloud(newPost).catch(() => {});

      setQuestionInput('');
      setPlantInput('');
      setIsSubmitting(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 5000);
    }, 1200);
  };

  return (
    <section id="clinic" className="pt-8 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-emerald-200">
          <MessageCircleHeart className="w-4 h-4 text-emerald-600" />
          <span>Community Plant Clinic & Auto-Doctor</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Ask Dr. Flora & The Garden Community
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
          Post any plant symptom, pest issue, or care question below. Our intelligent Botanical Doctor auto-replies with instant diagnostic guidance within seconds!
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
        
        {/* Left: Submit Question Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-emerald-100 shadow-md sticky top-28 self-start">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-emerald-50">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Submit Plant Care Question
              </h3>
              <span className="text-[11px] text-emerald-600 font-semibold">
                ⚡ Instant AI Botanical Diagnosis
              </span>
            </div>
          </div>

          {!activeUser ? (
            /* Signed Out Gate */
            <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 rounded-2xl p-6 text-white text-center space-y-4 shadow-inner border border-emerald-800/40">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-2xl shadow-md">
                🩺
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                  <Lock className="w-3 h-3" />
                  <span>Botanist Sign-In Required</span>
                </div>
                <h4 className="text-base font-black text-white">
                  Sign In with Email to Ask Dr. Flora
                </h4>
                <p className="text-xs text-emerald-200/80 max-w-xs mx-auto leading-relaxed">
                  Doctor consultations are reserved for registered botanists. Sign in with your email to receive instant AI diagnoses and automatically activate your free subscription to <strong>The Daily Sprout Newsletter</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-slate-950" />
                <span>Sign In with Email to Ask Doctor</span>
              </button>

              <div className="pt-2 border-t border-white/10 text-[10px] text-emerald-300/80 flex items-center justify-center gap-3">
                <span>✓ Instant AI Prescriptions</span>
                <span>✓ Daily Sprout Newsletter</span>
              </div>
            </div>
          ) : (
            /* Authenticated Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">{activeUser.avatarEmoji || '🌿'}</span>
                  <div>
                    <span className="font-extrabold text-emerald-950">@{activeUser.username}</span>
                    <span className="text-slate-500 text-[10px] block">{activeUser.email}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900 text-[10px] font-black uppercase tracking-wider">
                  VIP Subscriber ✓
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Plant Name or Variety
                </label>
                <input
                  type="text"
                  value={plantInput}
                  onChange={(e) => setPlantInput(e.target.value)}
                  placeholder="e.g. Fiddle Leaf Fig, Monstera, Basil..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Describe Symptoms or Question
                </label>
                <textarea
                  required
                  rows={4}
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  placeholder="e.g. My leaves have yellow patches and dark brown crispy tips. I water once a week..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 resize-none font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Dr. Flora Diagnosing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post & Get Instant Doctor Diagnosis</span>
                  </>
                )}
              </button>
            </form>
          )}

          {successToast && (
            <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Dr. Flora has replied to your question! Scroll down to see the diagnosis.</span>
            </div>
          )}
        </div>

        {/* Right: Live Community Q&A Feed (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>🌿 Recent Garden Discussions ({posts.length})</span>
            </h3>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ● All Posts Answered
            </span>
          </div>

          <div className="space-y-5">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4 hover:border-emerald-200 transition-colors"
              >
                {/* User Post Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${post.avatarColor} text-white font-black text-sm flex items-center justify-center shadow-md`}>
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {post.author}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-semibold text-emerald-700">🌱 {post.plantName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 text-xs font-bold transition-colors border border-slate-100"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{post.likesCount}</span>
                  </button>
                </div>

                {/* Question */}
                <p className="text-sm text-slate-800 leading-relaxed font-medium bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                  "{post.question}"
                </p>

                {/* AI Doctor Reply Box */}
                {post.doctorReply && (
                  <div className="bg-gradient-to-br from-emerald-50/90 to-teal-50/60 rounded-2xl p-5 border border-emerald-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs shadow-sm">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                          Dr. Flora (Plant Clinic Auto-Doctor)
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        AI Certified Diagnosis
                      </span>
                    </div>

                    <p className="text-xs text-emerald-900 font-semibold">
                      {post.doctorReply.greeting} {post.doctorReply.diagnosisSummary}
                    </p>

                    <div className="p-3 bg-white/80 rounded-xl border border-emerald-100 text-xs text-slate-700 space-y-1">
                      <strong className="text-emerald-950 block">Probable Cause:</strong>
                      <p>{post.doctorReply.probableCause}</p>
                    </div>

                    <div className="space-y-1.5">
                      <strong className="text-xs text-emerald-950 block">Step-by-Step Prescription:</strong>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {post.doctorReply.stepByStepRemedy.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 font-medium">
                      💡 <strong>Recommended Care Aid:</strong> {post.doctorReply.recommendedToolOrOrganicAid}
                    </div>

                    <p className="text-[11px] text-emerald-700 italic text-right font-medium">
                      {post.doctorReply.signoff}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <BotanistLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={(u) => {
          setActiveUser(u);
          setAuthorInput(`@${u.username}`);
        }}
        actionTitle="Sign In to Ask Dr. Flora"
        actionSubtitle="Enter your email to unlock instant AI botanical diagnoses and automatically subscribe to The Daily Sprout Newsletter."
      />

    </section>
  );
}
