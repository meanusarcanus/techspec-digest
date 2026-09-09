'use client';

import React, { useState } from 'react';
import GardenNavbar from './GardenNavbar';
import GardenFooter from './GardenFooter';
import TodayPlantHero from './TodayPlantHero';
import PlantClinicCommunity from './PlantClinicCommunity';
import GreenhouseArchive from './GreenhouseArchive';
import GardenNewsletter from './GardenNewsletter';
import { getDailyFeaturedPlant, getAllPlantGuides } from '../lib/gardenDailyEngine';
import { Smartphone, Sparkles } from 'lucide-react';

interface GardenDesktopViewProps {
  onSwitchToMobile?: () => void;
}

export default function GardenDesktopView({ onSwitchToMobile }: GardenDesktopViewProps) {
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  
  const dailyData = getDailyFeaturedPlant();
  const allPlants = getAllPlantGuides();

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      
      {/* Optional top banner informing about the PWA / Mobile version */}
      {onSwitchToMobile && (
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-emerald-50 text-xs py-2 px-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>📱 <strong>New:</strong> Dedicated PWA mobile app version available for smartphones!</span>
            </div>
            <button
              onClick={onSwitchToMobile}
              className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full text-xs font-bold text-white transition-colors border border-white/20"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Preview Phone App View</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <GardenNavbar 
        onOpenNewsletter={() => setNewsletterModalOpen(true)}
        onSwitchToMobile={onSwitchToMobile}
      />

      {/* Main Desktop Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. Today's Featured Plant & How-To Showcase */}
        <TodayPlantHero 
          plant={dailyData.plant} 
          formattedDate={dailyData.formattedDate} 
        />

        {/* 2. In-Page Newsletter Banner ("The Daily Sprout") */}
        <GardenNewsletter isBannerOnly={true} />

        {/* 3. Community Plant Clinic & AI Auto-Doctor */}
        <PlantClinicCommunity />

        {/* 4. Complete Greenhouse Botanical Archive */}
        <GreenhouseArchive plants={allPlants} />

      </main>

      {/* Footer */}
      <GardenFooter />

      {/* Newsletter Modal */}
      <GardenNewsletter 
        isOpen={newsletterModalOpen} 
        onClose={() => setNewsletterModalOpen(false)} 
      />

    </div>
  );
}
