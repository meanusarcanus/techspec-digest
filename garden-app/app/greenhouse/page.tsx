'use client';

import React, { useState } from 'react';
import GardenNavbar from '../../components/GardenNavbar';
import GardenFooter from '../../components/GardenFooter';
import GreenhouseArchive from '../../components/GreenhouseArchive';
import GardenNewsletter from '../../components/GardenNewsletter';
import { getAllPlantGuides } from '../../lib/gardenDailyEngine';

export default function GreenhousePage() {
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const allPlants = getAllPlantGuides();

  return (
    <div className="flex-1 flex flex-col">
      <GardenNavbar onOpenNewsletter={() => setNewsletterModalOpen(true)} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <GreenhouseArchive plants={allPlants} />
        <GardenNewsletter isBannerOnly={true} />
      </main>

      <GardenFooter />
      <GardenNewsletter isOpen={newsletterModalOpen} onClose={() => setNewsletterModalOpen(false)} />
    </div>
  );
}
