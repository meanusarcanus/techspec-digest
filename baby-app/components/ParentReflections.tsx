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
  Compass,
  Moon,
  ThumbsUp,
  ShoppingBag,
  Clock,
  Baby,
} from 'lucide-react';
import { generateBabyPediatricReply, PediatricDiagnosis } from '../lib/babyPediatricDoctor';

interface ParentComment {
  id: string;
  date: string;
  author: string;
  role: string;
  category: string;
  comment: string;
  likesCount: number;
  pediatricReply?: PediatricDiagnosis;
}

const INITIAL_PARENT_QUESTIONS: ParentComment[] = [
  {
    id: 'post-b01',
    date: '3 hours ago',
    author: 'Sarah M. (First-Time Mom)',
    role: 'Parent Guide Seeker',
    category: 'Bedtime Routines & Stories',
    comment: 'My 3-month-old was sleeping 5-hour stretches, but suddenly wakes up every 90 minutes fussing and crying. How do I navigate this?',
    likesCount: 16,
    pediatricReply: generateBabyPediatricReply(
      'My 3-month-old was sleeping 5-hour stretches, but suddenly wakes up every 90 minutes fussing and crying. How do I navigate this?',
      'Bedtime Routines & Stories',
      'Sarah M.'
    )
  },
  {
    id: 'post-b02',
    date: '6 hours ago',
    author: 'David & Rachel L.',
    role: 'Gentle Caregivers',
    category: 'Crying & Colic Soothing',
    comment: 'Every evening around 6 PM, our baby gets intensely gassy and cries for nearly an hour despite being fed and changed. What soothing technique helps fastest?',
    likesCount: 21,
    pediatricReply: generateBabyPediatricReply(
      'Every evening around 6 PM, our baby gets intensely gassy and cries for nearly an hour despite being fed and changed. What soothing technique helps fastest?',
      'Crying & Colic Soothing',
      'David & Rachel L.'
    )
  },
  {
    id: 'post-b03',
    date: 'Yesterday',
    author: 'Jessica K.',
    role: 'Newborn Caregiver',
    category: 'Lullabies & Sound Therapy',
    comment: 'What is the safe decibel limit and optimal distance for placing our white noise sound machine in the nursery?',
    likesCount: 12,
    pediatricReply: generateBabyPediatricReply(
      'What is the safe decibel limit and optimal distance for placing our white noise sound machine in the nursery?',
      'Lullabies & Sound Therapy',
      'Jessica K.'
    )
  }
];

export default function ParentReflections() {
  const [comments, setComments] = useState<ParentComment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Bedtime Routines & Stories');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('calm_baby_parent_questions');
      if (saved) {
        setComments(JSON.parse(saved));
      } else {
        setComments(INITIAL_PARENT_QUESTIONS);
      }
    } catch {
      setComments(INITIAL_PARENT_QUESTIONS);
    }
  }, []);

  const categories = [
    'Bedtime Routines & Stories',
    'Lullabies & Sound Therapy',
    'Swaddling & Safe Sleep',
    'Crying & Colic Soothing',
    'Nursery Gear Recommendations',
    'General Suggestions & Parenting Tips',
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
      localStorage.setItem('calm_baby_parent_questions', JSON.stringify(updated));
    } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !name.trim()) return;

    setIsSubmitting(true);

    const reply = generateBabyPediatricReply(message, category, name);

    setTimeout(() => {
      const newComment: ParentComment = {
        id: `comment-${Date.now()}`,
        date: 'Just now',
        author: name.trim(),
        role: 'Parent Seeker',
        category,
        comment: message.trim(),
        likesCount: 1,
        pediatricReply: reply
      };

      const updated = [newComment, ...comments];
      setComments(updated);
      try {
        localStorage.setItem('calm_baby_parent_questions', JSON.stringify(updated));
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
    <section id="parent-qna" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 scroll-mt-28">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquareHeart className="w-4 h-4 text-pink-400" />
            <span>Parent Inquiries &amp; Instant Pediatric Sleep Clinic</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white gold-gradient-text">
            Ask Sister Claire &amp; The Pediatric Care Team
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Ask questions regarding newborn sleep routines, bedtime regressions, lullabies, or colic soothing. Our pediatric intelligence engine provides instant pediatric-backed advice and soothing steps!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Submission Form */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#13192B] via-[#0B0F19] to-[#120F1D] border border-pink-500/30 shadow-2xl space-y-5 sticky top-28">
              <div className="pb-3 border-b border-pink-900/40">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  Ask a Parenting or Sleep Question
                </h3>
                <span className="text-[11px] text-pink-300 font-semibold block mt-1">
                  ⚡ Instant Pediatric &amp; Infant Sleep Guidance
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Name or Parent Handle *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah M., David & Rachel"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-pink-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Topic Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-pink-400 transition"
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
                    Your Question or Bedtime Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about soothing fussy babies, bedtime routines, colic relief, sound machines, or swaddling..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-pink-400 transition leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-sm shadow-xl shadow-pink-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-white" />
                      <span>Sister Claire Consulting Guides...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Post &amp; Get Instant Pediatric Guidance</span>
                    </>
                  )}
                </button>
              </form>

              {submittedSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Sister Claire has prepared your pediatric guidance! Scroll down to read.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Published Parent Dialogues */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-pink-400" />
                <span>Parent Q&amp;A Dialogues ({comments.length})</span>
              </h3>
              <span className="text-xs text-pink-300 font-medium bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                ● All Inquiries Answered
              </span>
            </div>

            <div className="space-y-6">
              {comments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl p-6 sm:p-7 bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl backdrop-blur-md hover:border-pink-500/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-950 to-rose-950 border border-pink-500/40 flex items-center justify-center font-bold text-pink-300 text-sm shadow-md">
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-100">{item.author}</h4>
                          <span className="text-[10px] text-pink-300 font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/30">
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
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-pink-500/20 text-slate-300 hover:text-pink-300 text-xs font-bold transition-colors border border-slate-700"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-pink-400" />
                      <span>{item.likesCount}</span>
                    </button>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed font-light p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    "{item.comment}"
                  </p>

                  {item.pediatricReply && (
                    <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#1C1428] via-[#0E121E] to-[#171222] border border-pink-500/30 space-y-4 shadow-inner">
                      <div className="flex items-center justify-between gap-3 border-b border-pink-900/40 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center">
                            <Baby className="w-4 h-4 text-pink-400" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-pink-300 tracking-wide block">
                              Sister Claire &amp; Pediatric Care Clinic
                            </span>
                            <span className="text-[10px] text-indigo-300/80 font-medium">
                              Certified Infant Sleep &amp; Nursery Guidance
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-pink-300 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20 font-semibold">
                          Pediatric Guide
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-pink-100 font-medium leading-relaxed">
                        {item.pediatricReply.greeting} {item.pediatricReply.pediatricInsight}
                      </p>

                      <div className="p-3.5 bg-indigo-950/40 rounded-xl border border-indigo-500/20 text-xs text-slate-300 space-y-1">
                        <strong className="text-pink-300 block font-semibold">Developmental Biological Cause:</strong>
                        <p className="font-light text-slate-300">{item.pediatricReply.developmentalCause}</p>
                      </div>

                      <div className="space-y-1.5">
                        <strong className="text-xs text-pink-200 block font-semibold">Pediatric Soothing Protocol:</strong>
                        <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                          {item.pediatricReply.stepByStepProtocol.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-pink-400 font-bold">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommended Nursery Gear Aid with Amazon affiliate link */}
                      <div className="p-3 rounded-xl bg-pink-950/30 border border-pink-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-pink-200">
                        <div>
                          <span className="text-pink-400 font-bold block">🧸 Recommended Nursery Aid:</span>
                          <span className="text-slate-300 text-[11px]">{item.pediatricReply.recommendedNurseryAid}</span>
                        </div>
                        <a
                          href={`https://www.amazon.com/s?k=${encodeURIComponent(item.pediatricReply.amazonSearchKeyword)}&tag=techspecdiges-20`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500 hover:bg-pink-400 text-white font-bold text-[11px] shadow-sm whitespace-nowrap transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>View on Amazon</span>
                        </a>
                      </div>

                      <p className="text-[11px] text-pink-300/80 italic text-right font-medium">
                        {item.pediatricReply.signoff}
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
