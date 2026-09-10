'use client';

import React, { useState } from 'react';
import { Moon, Sparkles, Clock, Sun, ShieldCheck, ShoppingBag, Baby, Heart } from 'lucide-react';

export default function BabySleepCalculator() {
  const [ageGroup, setAgeGroup] = useState('4-5m');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [sleepIssue, setSleepIssue] = useState('catnaps');

  const calculateSchedule = () => {
    let wakeWindow = '1.75 – 2.25 hours';
    let napsCount = '3 Naps (2.5 – 3.5 hrs total)';
    let totalSleep = '14 – 15 Hours (11 hrs Night + 3.5 hrs Day)';
    let bedtimeTarget = '07:30 PM';
    let schedule = [
      { time: '07:00 AM', event: 'Morning Wake-Up & Milk Feed' },
      { time: '08:45 AM – 10:00 AM', event: 'Nap 1 (Morning Rest)' },
      { time: '12:15 PM – 01:45 PM', event: 'Nap 2 (Midday Long Nap)' },
      { time: '04:15 PM – 04:45 PM', event: 'Nap 3 (Catnap Bridge)' },
      { time: '07:00 PM', event: 'Soothing Bedtime Routine' },
      { time: '07:30 PM', event: 'Night Sleep Onset' },
    ];
    let pediatricAdvice = 'Around 4 months, primitive sleep cycles mature. Aim to put baby down drowsy but awake to foster self-soothing.';
    let recommendedGear = 'Ultra-Quiet Pediatric White Noise Sound Machine (<65dB)';
    let searchTag = 'pediatric+white+noise+machine+amber+night+light+baby';

    if (ageGroup === '0-2m') {
      wakeWindow = '45 – 60 minutes';
      napsCount = '4 – 5 Naps (On-Demand)';
      totalSleep = '16 – 18 Hours Total';
      bedtimeTarget = '08:30 PM – 09:30 PM';
      schedule = [
        { time: '07:00 AM', event: 'Gentle Awakening & Diaper Change' },
        { time: '08:00 AM – 09:30 AM', event: 'Nap 1' },
        { time: '10:30 AM – 12:00 PM', event: 'Nap 2' },
        { time: '01:00 PM – 02:30 PM', event: 'Nap 3' },
        { time: '03:45 PM – 05:00 PM', event: 'Nap 4' },
        { time: '06:15 PM – 07:00 PM', event: 'Nap 5 (Evening bridge)' },
        { time: '08:30 PM', event: 'Bedtime Feed & Swaddle' },
      ];
      pediatricAdvice = 'Newborns lack a circadian rhythm. Keep daytime bright with natural light and night feeds quiet, dark, and minimal stimulation.';
      recommendedGear = '100% Organic Breathable Swaddle Sacks (Hip-Healthy Certified)';
      searchTag = 'organic+cotton+baby+swaddle+sack+hip+healthy';
    } else if (ageGroup === '6-8m') {
      wakeWindow = '2.5 – 3.0 hours';
      napsCount = '2 – 3 Naps (2.5 – 3 hrs total)';
      totalSleep = '14 Hours Total (11 hrs Night + 3 hrs Day)';
      bedtimeTarget = '07:00 PM – 07:30 PM';
      schedule = [
        { time: '07:00 AM', event: 'Morning Wake-Up & Solids/Milk' },
        { time: '09:30 AM – 11:00 AM', event: 'Nap 1 (1.5 hrs)' },
        { time: '02:00 PM – 03:30 PM', event: 'Nap 2 (1.5 hrs)' },
        { time: '06:45 PM', event: 'Bedtime Story & Lullaby' },
        { time: '07:15 PM', event: 'Night Slumber' },
      ];
      pediatricAdvice = 'Most babies transition from 3 naps to 2 solid naps during this window. Extend the morning wake window gradually by 15 minutes.';
      recommendedGear = '1.0 TOG Breathable Wearable Sleep Bag / Transition Sack';
      searchTag = 'wearable+blanket+sleep+sack+1.0+tog+cotton';
    } else if (ageGroup === '9-12m') {
      wakeWindow = '3.0 – 3.75 hours';
      napsCount = '2 Solid Naps (2 – 2.5 hrs total)';
      totalSleep = '13.5 – 14 Hours Total';
      bedtimeTarget = '07:30 PM';
      schedule = [
        { time: '07:00 AM', event: 'Morning Wake-Up & Breakfast' },
        { time: '10:00 AM – 11:15 AM', event: 'Nap 1' },
        { time: '02:45 PM – 04:00 PM', event: 'Nap 2' },
        { time: '07:00 PM', event: 'Wind-Down & Nursing/Bottle' },
        { time: '07:30 PM', event: 'Sound Slumber' },
      ];
      pediatricAdvice = 'Ensure the final wake window before bed is the longest (3.5 to 4 hours) to build adequate sleep pressure.';
      recommendedGear = 'BPA-Free Pediatric Ultrasonic Cool Mist Nursery Humidifier';
      searchTag = 'baby+cool+mist+humidifier+nursery+room';
    } else if (ageGroup === 'toddler') {
      wakeWindow = '5.0 – 6.0 hours';
      napsCount = '1 Midday Nap (1.5 – 2.5 hrs)';
      totalSleep = '12 – 13 Hours Total';
      bedtimeTarget = '07:45 PM – 08:15 PM';
      schedule = [
        { time: '07:00 AM', event: 'Morning Wake-Up & Play' },
        { time: '12:30 PM – 02:30 PM', event: 'Restorative Midday Nap' },
        { time: '07:15 PM', event: 'Bedtime Books & Amber Light' },
        { time: '07:45 PM', event: 'Overnight Slumber' },
      ];
      pediatricAdvice = 'Consistency is key. Use a visual toddler ok-to-wake clock to establish clear sleep and morning boundaries.';
      recommendedGear = 'Toddler Color-Changing Ok-to-Wake Clock & Sound Machine';
      searchTag = 'toddler+ok+to+wake+clock+night+light+sound+machine';
    }

    if (sleepIssue === 'witching') {
      pediatricAdvice += ' For evening witching hour fussiness, start your wind-down 30 minutes earlier to prevent overtired cortisol spikes.';
    }

    return {
      wakeWindow,
      napsCount,
      totalSleep,
      bedtimeTarget,
      schedule,
      pediatricAdvice,
      recommendedGear,
      searchTag
    };
  };

  const result = calculateSchedule();

  return (
    <section id="sleep-calculator" className="my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
          <Moon className="w-4 h-4 text-pink-400" />
          <span>Interactive Pediatric Tool</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white gold-gradient-text">
          Baby Wake Window &amp; Bedtime Schedule Calculator
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Calibrate your baby’s exact biological wake windows, nap timings, and target bedtime based on developmental pediatric research.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs (6 Cols) */}
        <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#13192B] via-[#0B0F19] to-[#120F1D] border border-pink-500/30 shadow-2xl space-y-6">
          
          {/* Age Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              1. Baby's Current Age Stage
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: '0-2m', label: '👶 0 - 2 Months' },
                { id: '4-5m', label: '🍼 4 - 5 Months' },
                { id: '6-8m', label: '🧸 6 - 8 Months' },
                { id: '9-12m', label: '🌙 9 - 12 Months' },
                { id: 'toddler', label: '⭐ 1 - 2+ Years' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAgeGroup(item.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-left ${
                    ageGroup === item.id
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 shadow-md'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-pink-500/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Wake Up Time & Challenge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                2. Usual Morning Wake Time
              </label>
              <select
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-100 focus:outline-none focus:border-pink-400"
              >
                <option value="06:00">06:00 AM (Early Bird)</option>
                <option value="06:30">06:30 AM</option>
                <option value="07:00">07:00 AM (Recommended)</option>
                <option value="07:30">07:30 AM</option>
                <option value="08:00">08:00 AM</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                3. Primary Sleep Challenge
              </label>
              <select
                value={sleepIssue}
                onChange={(e) => setSleepIssue(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-100 focus:outline-none focus:border-pink-400"
              >
                <option value="catnaps">Short 30-Min Catnaps</option>
                <option value="night-wake">Frequent Night Wakings</option>
                <option value="witching">Evening Witching Hour / Colic</option>
                <option value="false-start">False Starts at Bedtime</option>
              </select>
            </div>
          </div>

          {/* Pediatric Guidance Note */}
          <div className="p-4 rounded-2xl bg-pink-950/30 border border-pink-500/30 text-xs text-pink-200 leading-relaxed space-y-1">
            <strong className="text-pink-300 font-bold block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              Sister Claire's Pediatric Insight:
            </strong>
            <p className="font-light text-slate-300">{result.pediatricAdvice}</p>
          </div>

        </div>

        {/* Right Output Schedule (6 Cols) */}
        <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#1A1428] via-[#0E121E] to-[#151020] border border-pink-500/30 shadow-2xl space-y-6 sticky top-28">
          
          <div className="flex items-center justify-between border-b border-pink-900/40 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center">
                <Baby className="w-4 h-4 text-pink-400" />
              </div>
              <h3 className="text-base font-bold text-white">
                Daily Sleep Blueprint
              </h3>
            </div>
            <span className="text-[10px] font-bold text-pink-300 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20">
              Optimal Schedule
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-pink-400 font-bold block uppercase tracking-wider text-[10px]">Optimal Wake Window</span>
              <span className="font-bold text-sm text-slate-100">{result.wakeWindow}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-pink-400 font-bold block uppercase tracking-wider text-[10px]">Target Bedtime</span>
              <span className="font-bold text-sm text-slate-100">{result.bedtimeTarget}</span>
            </div>
          </div>

          {/* Step by step timeline */}
          <div className="space-y-2.5">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
              Suggested Routine Timeline:
            </span>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {result.schedule.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-pink-400" />
                    {item.time}
                  </span>
                  <span className="text-slate-300 font-light">{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Amazon Gear Aid */}
          <div className="pt-3 border-t border-pink-900/40 space-y-2.5">
            <div className="text-xs text-slate-300 flex items-center justify-between">
              <span className="font-semibold text-pink-300">Recommended Sleep Aid:</span>
            </div>
            <a
              href={`https://www.amazon.com/s?k=${result.searchTag}&tag=techspecdiges-20`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Get {result.recommendedGear} on Amazon</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
