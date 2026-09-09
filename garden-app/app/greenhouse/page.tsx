'use client';

import React, { useState, useEffect } from 'react';
import GardenNavbar from '../../components/GardenNavbar';
import GardenFooter from '../../components/GardenFooter';
import GreenhouseArchive from '../../components/GreenhouseArchive';
import GardenNewsletter from '../../components/GardenNewsletter';
import GardenMobileApp from '../../components/GardenMobileApp';
import { useDeviceMode } from '../../lib/useDeviceMode';
import { getAllPlantGuides } from '../../lib/gardenDailyEngine';
import { PlantCareGuide } from '../../data/plantCareGuides';

export default function GreenhousePage() {
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const { isMounted, isMobileView, setViewMode } = useDeviceMode();
  const [allPlants, setAllPlants] = useState<PlantCareGuide[]>(() => getAllPlantGuides());

  useEffect(() => {
    const handleUpdate = () => {
      setAllPlants(getAllPlantGuides());
    };
    // Sync initially on mount after hydration
    handleUpdate();
    window.addEventListener('garden_catalog_updated', handleUpdate);
    return () => window.removeEventListener('garden_catalog_updated', handleUpdate);
  }, []);

  if (isMounted && isMobileView) {
    return (
      <GardenMobileApp 
        initialTab="greenhouse" 
        onSwitchToDesktop={() => setViewMode('desktop')} 
      />
    );
  }

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
