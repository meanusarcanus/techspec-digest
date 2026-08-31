'use client';

import React from 'react';
import YouTubePlayerHero from '@/components/YouTubePlayerHero';
import TodayBabyPost from '@/components/TodayBabyPost';
import AmazonBabyGearGrid from '@/components/AmazonBabyGearGrid';
import BabyBookSpotlight from '@/components/BabyBookSpotlight';
import ParentReflections from '@/components/ParentReflections';
import SweetDreamsNewsletter from '@/components/SweetDreamsNewsletter';
import Link from 'next/link';
import { Moon, Sparkles, Music, BookOpen, Heart, ArrowRight } from 'lucide-react';

export default function BabyHomePage() {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero 1-Hour Lullaby Player & YouTube Broadcast */}
      <YouTubePlayerHero />

      {/* Today's Featured Pediatric Baby Sleep Routine & Article */}
      <TodayBabyPost />

      {/* Featured Bedtime Books Spotlight: Bible Bedtime Stories by J. N. Littlelight & Thinking Big for Little People */}
      <BabyBookSpotlight />

      {/* Curated Nursery & Sleep Gear Essentials Matrix */}
      <AmazonBabyGearGrid />

      {/* Parent Reflections & Bedtime Q&A Community */}
      <ParentReflections />

      {/* Sweet Dreams Newsletter Subscription */}
      <SweetDreamsNewsletter />
    </div>
  );
}
