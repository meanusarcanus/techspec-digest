'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquareHeart,
  Sparkles,
  Send,
  User,
  Mail,
  CheckCircle2,
  Heart,
  Bot,
  Compass,
  Smile,
  ShieldAlert,
  ThumbsUp,
  ShoppingBag,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { generateConsciousnessOracleReply, OracleDiagnosis } from '../lib/consciousnessOracle';

interface CommunityComment {
  id: string;
  date: string;
  author: string;
  role: string;
  avatar?: string;
  category: string;
  comment: string;
  likesCount: number;
  oracleReply?: OracleDiagnosis;
}

const INITIAL_CONSCIOUSNESS_COMMUNITY: CommunityComment[] = [
  {
    id: 'post-c01',
    date: '2 hours ago',
    author: 'Elena R. (Mindfulness Practitioner)',
    role: 'Seeker of Light',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Elena',
    category: 'The Master Key System',
    comment: 'When practicing Lesson 4 in The Master Key System, how do I stop my mind from worrying about the timeline of manifestation?',
    likesCount: 18,
    oracleReply: generateConsciousnessOracleReply(
      'When practicing Lesson 4 in The Master Key System, how do I stop my mind from worrying about the timeline of manifestation?',
      'The Master Key System',
      'Elena R.'
    )
  },
  {
    id: 'post-c02',
    date: '5 hours ago',
    author: 'Marcus Vance',
    role: 'Acoustic Sound Healer',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Marcus',
    category: 'Sound Healing & Solfeggio',
    comment: 'What is the optimal technique for activating 528Hz quartz crystal singing bowls without creating harsh harmonic overtones?',
    likesCount: 14,
    oracleReply: generateConsciousnessOracleReply(
      'What is the optimal technique for activating 528Hz quartz crystal singing bowls without creating harsh harmonic overtones?',
      'Sound Healing & Solfeggio',
      'Marcus Vance'
    )
  },
  {
    id: 'post-c03',
    date: 'Yesterday',
    author: 'Chloe Lin',
    role: 'Third-Eye Meditator',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Chloe',
    category: 'Third-Eye & Pineal Activation',
    comment: 'During my morning meditation, I feel a strong magnetic pressure and pulsing warmth between my eyebrows. Is this normal?',
    likesCount: 22,
    oracleReply: generateConsciousnessOracleReply(
      'During my morning meditation, I feel a strong magnetic pressure and pulsing warmth between my eyebrows. Is this normal?',
      'Third-Eye & Pineal Activation',
      'Chloe Lin'
    )
  }
];

export default function CommunityReflections() {
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('The Master Key System');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('consciousness_oracle_reflections');
      if (saved) {
        setComments(JSON.parse(saved));
      } else {
        setComments(INITIAL_CONSCIOUSNESS_COMMUNITY);
      }
    } catch {
      setComments(INITIAL_CONSCIOUSNESS_COMMUNITY);
    }
  }, []);

  const categories = [
    'The Master Key System',
    'Meditation & Mindfulness',
    'Sound Healing & Solfeggio',
    'Third-Eye & Pineal Activation',
    'Sacred Geometry',
    'General Suggestions & Feedback',
  ];

  const handleLike = (id: string) => {
    const updated = comments.map((c) => {
      if (c.id === id) {
        return { ...c, likesCount: c.likesCount + 1 };
      }
      return c;
    });
    setComments(updated);
    try {
      localStorage.setItem('consciousness_oracle_reflections', JSON.stringify(updated));
    } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !name.trim()) return;

    setIsSubmitting(true);

    // Generate intelligent oracle diagnosis instantly
    const oracleReply = generateConsciousnessOracleReply(message, category, name);

    setTimeout(() => {
      const newComment: CommunityComment = {
        id: `comment-${Date.now()}`,
        date: 'Just now',
        author: name.trim(),
        role: 'Community Seeker',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`,
        category,
        comment: message.trim(),
        likesCount: 1,
        oracleReply
      };

      const updated = [newComment, ...comments];
      setComments(updated);
      try {
        localStorage.setItem('consciousness_oracle_reflections', JSON.stringify(updated));
      } catch {}

      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setMessage('');
      setName('');
      setEmail('');
      setTimeout(() => setSubmittedSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section id="community-reflections" className="max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8 scroll-mt-28">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquareHeart className="w-4 h-4 text-amber-400" />
            <span>Seeker Inquiries &amp; Instant Hermetic Oracle</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white gold-gradient-text">
            Ask Master Haan &amp; The Consciousness Circle
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Share your meditation breakthroughs, questions on universal laws &amp; <em>The Master Key System</em>, or sound healing. Our enlightened Oracle provides instant esoteric diagnoses and practices!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Reflection Form */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#13192B] via-[#0B0F19] to-[#120F1D] border border-indigo-500/30 shadow-2xl space-y-6 sticky top-28">
              <div className="space-y-2 pb-3 border-b border-indigo-900/50">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Ask a Wisdom Question
                </h3>
                <span className="text-[11px] text-amber-400 font-semibold block">
                  ⚡ Instant Hermetic AI Wisdom Diagnosis
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Name or Seeker Alias *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya, Julian, SolarSeeker"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Wisdom Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-amber-400 transition"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Reflection or Inquiry *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your meditation experience, ask about The Master Key System, sound frequencies, or pineal activation..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Master Haan Channeling Wisdom...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmitting &amp; Get Instant Oracle Answer</span>
                    </>
                  )}
                </button>
              </form>

              {submittedSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Master Haan has delivered an enlightened oracle answer! View below.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Published Community Wisdom & AI Enlightened Replies */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>Recorded Wisdom Dialogues ({comments.length})</span>
              </h3>
              <span className="text-xs text-amber-400/90 font-medium bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                ● All Inquiries Answered
              </span>
            </div>

            <div className="space-y-6">
              {comments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl p-6 sm:p-7 bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl backdrop-blur-md hover:border-amber-500/30 transition-all"
                >
                  {/* Seeker Question Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-900 to-indigo-950 border border-indigo-500/40 flex items-center justify-center font-bold text-amber-400 text-sm shadow-md">
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-100">{item.author}</h4>
                          <span className="text-[10px] text-amber-300 font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                            {item.category}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {item.date}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLike(item.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 text-xs font-bold transition-colors border border-slate-700"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.likesCount}</span>
                    </button>
                  </div>

                  {/* Seeker Comment Text */}
                  <p className="text-sm text-slate-200 leading-relaxed font-light p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    "{item.comment}"
                  </p>

                  {/* Oracle Enlightened Reply Box */}
                  {item.oracleReply && (
                    <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#19152B] via-[#0E121E] to-[#120F1D] border border-amber-500/30 space-y-4 shadow-inner">
                      <div className="flex items-center justify-between gap-3 border-b border-indigo-900/40 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-amber-300 tracking-wide block">
                              Master Haan &amp; The Arcane Oracle
                            </span>
                            <span className="text-[10px] text-indigo-300/80 font-medium">
                              Hermetic Wisdom &amp; Bio-Resonance Diagnosis
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 font-semibold">
                          Enlightened Oracle
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
                        {item.oracleReply.greeting} {item.oracleReply.wisdomInsight}
                      </p>

                      <div className="p-3.5 bg-indigo-950/40 rounded-xl border border-indigo-500/20 text-xs text-slate-300 space-y-1">
                        <strong className="text-amber-300 block font-semibold">Esoteric Axiom:</strong>
                        <p className="font-light italic text-slate-300">{item.oracleReply.esotericPrinciple}</p>
                      </div>

                      <div className="space-y-1.5">
                        <strong className="text-xs text-amber-200 block font-semibold">Step-by-Step Contemplative Practice:</strong>
                        <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                          {item.oracleReply.stepByStepPractice.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sacred Tool Recommendation with Amazon Affiliate link */}
                      <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-200">
                        <div>
                          <span className="text-amber-400 font-bold block">✨ Sacred Mind Tool:</span>
                          <span className="text-slate-300 text-[11px]">{item.oracleReply.recommendedSacredTool}</span>
                        </div>
                        <a
                          href={`https://www.amazon.com/s?k=${encodeURIComponent(item.oracleReply.amazonSearchKeyword)}&tag=techspecdiges-20`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] shadow-sm whitespace-nowrap transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>View on Amazon</span>
                        </a>
                      </div>

                      <p className="text-[11px] text-amber-400/80 italic text-right font-medium">
                        {item.oracleReply.signoff}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
