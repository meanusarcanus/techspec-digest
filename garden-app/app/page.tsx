'use client';

import React, { useState } from 'react';
import GardenNavbar from '../components/GardenNavbar';
import GardenFooter from '../components/GardenFooter';
import TodayPlantHero from '../components/TodayPlantHero';
import PlantClinicCommunity from '../components/PlantClinicCommunity';
import GreenhouseArchive from '../components/GreenhouseArchive';
import GardenNewsletter from '../components/GardenNewsletter';
import { getDailyFeaturedPlant, getAllPlantGuides } from '../lib/gardenDailyEngine';

export default function HomePage() {
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  
  const dailyData = getDailyFeaturedPlant();
  const allPlants = getAllPlantGuides();

  return (
    <div className="flex-1 flex flex-col">
      
      {/* Top Navbar */}
      <GardenNavbar 
        onOpenNewsletter={() => setNewsletterModalOpen(true)}
      />

      {/* Main Content Area */}
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
