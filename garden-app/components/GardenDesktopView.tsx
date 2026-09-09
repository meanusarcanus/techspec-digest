'use client';

import React, { useState } from 'react';
import GardenNavbar from './GardenNavbar';
import GardenFooter from './GardenFooter';
import TodayPlantHero from './TodayPlantHero';
import PlantClinicCommunity from './PlantClinicCommunity';
import GreenhouseArchive from './GreenhouseArchive';
import GardenNewsletter from './GardenNewsletter';
import CareGuideModal from './CareGuideModal';
import PlantCameraScannerModal from './PlantCameraScannerModal';
import { getDailyFeaturedPlant, getAllPlantGuides } from '../lib/gardenDailyEngine';
import { PlantCareGuide } from '../data/plantCareGuides';
import { Smartphone, Camera } from 'lucide-react';

interface GardenDesktopViewProps {
  onSwitchToMobile?: () => void;
}

export default function GardenDesktopView({ onSwitchToMobile }: GardenDesktopViewProps) {
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [scannerModalOpen, setScannerModalOpen] = useState(false);
  const [selectedCarePlant, setSelectedCarePlant] = useState<PlantCareGuide | null>(null);
  
  const dailyData = getDailyFeaturedPlant();
  const allPlants = getAllPlantGuides();

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      
      {/* Top banner with Mobile PWA & Camera Scanner shortcuts */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-emerald-50 text-xs py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>📱 <strong>The Garden Perks PWA:</strong> Optimized mobile app view & AI Camera Plant Scanner now active!</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScannerModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-emerald-700/80 hover:bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold text-white transition-colors border border-emerald-500/50 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-300" />
              <span>📷 AI Plant Scanner</span>
            </button>

            {onSwitchToMobile && (
              <button
                onClick={onSwitchToMobile}
                className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full text-xs font-bold text-white transition-colors border border-white/20 cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Preview Phone App View</span>
              </button>
            )}
          </div>
        </div>
      </div>

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

      {/* AI Camera Scanner Modal */}
      <PlantCameraScannerModal
        isOpen={scannerModalOpen}
        onClose={() => setScannerModalOpen(false)}
        onOpenCareGuide={(plant) => setSelectedCarePlant(plant)}
      />

      {/* Care Guide Modal (when opened from scanner) */}
      <CareGuideModal
        plant={selectedCarePlant}
        onClose={() => setSelectedCarePlant(null)}
      />

    </div>
  );
}
