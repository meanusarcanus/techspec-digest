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
  Compass,
  Moon,
} from 'lucide-react';

interface ParentComment {
  id: string;
  date: string;
  author: string;
  role: string;
  category: string;
  comment: string;
  reply?: {
    author: string;
    role: string;
    date: string;
    content: string;
  };
}

const initialQuestions: ParentComment[] = [
  {
    id: 'parent-001',
    date: 'August 31, 2026',
    author: 'Sarah K.',
    role: 'Mom of 4-Month-Old',
    category: 'Bedtime Routines',
    comment: 'How early should we start reading "Bible Bedtime Stories" to our newborn? Will hearing our voice establish a calming bedtime association already?',
    reply: {
      author: 'Calm Baby Nursery Editorial Circle',
      role: 'Pediatric Sleep & Nursery Care Guides',
      date: 'August 31, 2026',
      content: 'A warm and joyful welcome, Sarah! 🌙 Absolutely yes! Even in the first weeks of life, infants recognize maternal and paternal vocal rhythms. Reading J. N. Littlelight’s "Bible Bedtime Stories: For Little Hearts" creates a serene, low-frequency acoustic anchor that signals safe transition into sleep. Pair your soft reading voice with a gentle swaddle, and your little one will quickly associate that lyrical cadence with deep, peaceful slumber! Sending love to your family! 💖✨',
    },
  },
  {
    id: 'parent-002',
    date: 'August 30, 2026',
    author: 'David L.',
    role: 'New Father',
    category: 'Lullaby Sound & Noise',
    comment: 'Is it better to leave the 1-hour Brahms lullaby video playing on low volume all night, or switch to pink noise once the baby is asleep?',
    reply: {
      author: 'Calm Baby Nursery Editorial Circle',
      role: 'Pediatric Sleep & Nursery Care Guides',
      date: 'August 30, 2026',
      content: 'Hello, David! 💫 Both methods are wonderful! A great routine is playing our 1-hour Brahms & Mozart music box video during the wind-down feeding and crib transition (first 45–60 minutes). Once your baby enters deep non-REM sleep, keeping a steady, continuous pink noise or sound machine at a gentle 50 dB masks sudden household noises and prevents premature wake-ups. Wishing you and your little one restful nights! 💤🧸',
    },
  },
];

export default function ParentReflections() {
  const [comments, setComments] = useState<ParentComment[]>(initialQuestions);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Bedtime Routines');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const categories = [
    'Bedtime Routines & Stories',
    'Lullabies & Sound Therapy',
    'Swaddling & Safe Sleep',
    'Crying & Colic Soothing',
    'Nursery Gear Recommendations',
    'General Suggestions & Parenting Tips',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !name.trim()) return;

    setIsSubmitting(true);

    const newComment: ParentComment = {
      id: `comment-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      author: name,
      role: 'Parent Seeker',
      category,
      comment: message,
      reply: {
        author: 'Calm Baby Nursery Editorial Circle',
        role: 'Pediatric Sleep & Nursery Care Guides',
        date: 'Awaiting Next Dawn Update',
        content:
          'Thank you for your question! 🌙 Our nursery editorial team is preparing a thoughtful, pediatric-informed answer for our next daily update.',
      },
    };

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'b1d0339d-2c8c-4a3a-a5f1-meanusarcanus',
          to_email: 'meanusarcanus@gmail.com',
          from_name: name,
          email: email || 'parent@calmbaby.sanctuary',
          subject: `🍼 New Parent Question [${category}] from ${name}`,
          message: `Parent Name: ${name}\nEmail: ${email || 'Not provided'}\nCategory: ${category}\n\nQuestion/Reflection:\n${message}\n\nSubmitted at: ${new Date().toISOString()}`,
        }),
      }).catch(() => {});
    } catch {}

    setComments([newComment, ...comments]);
    setIsSubmitting(false);
    setSubmittedSuccess(true);
    setMessage('');
    setName('');
    setEmail('');
  };

  return (
    <section id="parent-qna" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 scroll-mt-28">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquareHeart className="w-4 h-4 text-pink-400" />
            <span>Parent Inquiries &amp; Bedtime Reflections</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white gold-gradient-text">
            Parenting Q&amp;A &amp; Sleep Community
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Ask questions regarding newborn sleep routines, bedtime storybooks, lullabies, or soothing gear. Our editorial circle responds thoughtfully every morning!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Submission Form */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#13192B] via-[#0B0F19] to-[#120F1D] border border-indigo-500/30 shadow-2xl space-y-5">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Ask a Parenting or Sleep Question
              </h3>
              <p className="text-xs text-slate-400">
                All questions are reviewed with care by our nursery editorial circle.
              </p>

              {submittedSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="font-serif text-lg font-bold text-white">
                    Question Received with Warmth! 🌟
                  </h4>
                  <p className="text-xs text-slate-300">
                    Our nursery editorial circle will publish a thoughtful answer in tomorrow morning's daily update.
                  </p>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
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
                        placeholder="e.g. Sarah M., David L."
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
                        placeholder="parent@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
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
                      Your Question or Bedtime Experience *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask about soothing fussy babies, bedtime stories, lullaby frequency, or nursery essentials..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting...' : 'Submit Question'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Published Parent Dialogues */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                Published Parent Q&amp;A Dialogues
              </h3>
              <span className="text-xs text-amber-400 font-medium">
                {comments.length} Dialogues Recorded
              </span>
            </div>

            <div className="space-y-6">
              {comments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-6 bg-slate-900/70 border border-slate-800 space-y-4 shadow-lg backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center font-bold text-sky-400 text-sm">
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

                  <p className="text-sm text-slate-200 leading-relaxed font-light pl-3 border-l-2 border-amber-500/40">
                    "{item.comment}"
                  </p>

                  {item.reply && (
                    <div className="rounded-xl p-5 bg-gradient-to-br from-[#181528] to-[#0E121E] border border-amber-500/25 space-y-2.5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                          <span className="text-xs font-bold text-amber-300">
                            {item.reply.author}
                          </span>
                          <span className="text-[10px] text-indigo-300/80 bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-700/40">
                            Nursery Guidance
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
