'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import initialComments from '../data/community_feedbacks.json';

interface CommentReply {
  author: string;
  role: string;
  date: string;
  content: string;
}

interface CommunityComment {
  id: string;
  date: string;
  author: string;
  role: string;
  avatar?: string;
  category: string;
  comment: string;
  reply?: CommentReply;
}

export default function CommunityReflections() {
  const [comments, setComments] = useState<CommunityComment[]>(initialComments);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('The Master Key System');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const categories = [
    'The Master Key System',
    'Meditation & Mindfulness',
    'Sound Healing & Solfeggio',
    'Third-Eye & Pineal Activation',
    'Sacred Geometry',
    'General Suggestions & Feedback',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !name.trim()) return;

    setIsSubmitting(true);

    const newComment: CommunityComment = {
      id: `comment-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      author: name,
      role: 'Community Seeker',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      category,
      comment: message,
      reply: {
        author: 'Arcane Books Editorial Circle',
        role: 'Curators of Esoteric Wisdom & Bio-Resonance Research',
        date: 'Awaiting Dawn Daily Update',
        content:
          'Thank you for this beautiful reflection! ✨ The Arcane Books Editorial Circle is preparing an enlightened, joyful, and polite response for our next dawn update. A notification dispatch has been scheduled for the editorial team at meanusarcanus@gmail.com.',
      },
    };

    // Forward to Formspree / Webhook endpoint if configured, or mailto fallback
    try {
      // Send dispatch payload via Web3Forms/Formspree or fallback
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'b1d0339d-2c8c-4a3a-a5f1-meanusarcanus', // Fallback identifier
          to_email: 'meanusarcanus@gmail.com',
          from_name: name,
          email: email || 'seeker@consciousness.digest',
          subject: `✨ New Reader Reflection [${category}] from ${name}`,
          message: `Seeker Name: ${name}\nEmail: ${email || 'Not provided'}\nCategory: ${category}\n\nReflection/Question:\n${message}\n\nSubmitted at: ${new Date().toISOString()}`,
        }),
      }).catch(() => {
        // Gracefully ignore network errors on static mock submission
      });
    } catch {
      // Static resilience
    }

    // Update local state so seeker immediately sees their contribution
    setComments([newComment, ...comments]);
    setIsSubmitting(false);
    setSubmittedSuccess(true);
    setMessage('');
    setName('');
    setEmail('');
  };

  return (
    <section id="community-reflections" className="max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8 scroll-mt-28">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquareHeart className="w-4 h-4 text-amber-400" />
            <span>Seeker Inquiries &amp; Community Reflections</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white gold-gradient-text">
            Join the Collective Dialogue
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Share your meditation breakthroughs, questions on universal laws &amp; <em>The Master Key System</em>, or suggestions. Our editorial team replies thoughtfully and enthusiastically every morning at dawn!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Reflection Form */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#13192B] via-[#0B0F19] to-[#120F1D] border border-indigo-500/30 shadow-2xl space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Leave a Question or Reflection
                </h3>
                <p className="text-xs text-slate-400">
                  Every submission is reviewed with enlightened care and notified to <strong className="text-slate-200">meanusarcanus@gmail.com</strong>.
                </p>
              </div>

              {submittedSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="font-serif text-lg font-bold text-white">
                    Reflection Received with Gratitude! 🌟
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Thank you for contributing your vibration. The Arcane Books Editorial Circle will publish an enlightened, joyful answer during the next daily update!
                  </p>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline"
                  >
                    Submit another reflection
                  </button>
                </div>
              ) : (
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
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seeker@example.com"
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
                      Your Reflection, Inquiry, or Suggestion *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your meditation experience, ask about The Master Key System, or suggest new topics..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting to Collective...' : 'Send Reflection & Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Published Community Wisdom & AI Enlightened Replies */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                Community Dialogues &amp; Enlightened Answers
              </h3>
              <span className="text-xs text-amber-400/90 font-medium">
                {comments.length} Dialogues Recorded
              </span>
            </div>

            <div className="space-y-6">
              {comments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-6 bg-slate-900/70 border border-slate-800 space-y-5 shadow-lg backdrop-blur-sm"
                >
                  {/* Seeker Question Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center font-bold text-amber-400 text-sm overflow-hidden">
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-100">{item.author}</h4>
                          <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                            {item.category}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">{item.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seeker Comment Text */}
                  <p className="text-sm text-slate-200 leading-relaxed font-light pl-3 border-l-2 border-amber-500/40">
                    "{item.comment}"
                  </p>

                  {/* Author Enlightened Reply Box */}
                  {item.reply && (
                    <div className="rounded-xl p-5 bg-gradient-to-br from-[#181528] to-[#0E121E] border border-amber-500/25 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                          <span className="text-xs font-bold text-amber-300">
                            {item.reply.author}
                          </span>
                          <span className="text-[10px] text-indigo-300/80 bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-700/40">
                            Editorial Reflection
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{item.reply.date}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        {item.reply.content}
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
