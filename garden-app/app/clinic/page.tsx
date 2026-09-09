'use client';

import React, { useState } from 'react';
import GardenNavbar from '../../components/GardenNavbar';
import GardenFooter from '../../components/GardenFooter';
import PlantClinicCommunity from '../../components/PlantClinicCommunity';
import GardenNewsletter from '../../components/GardenNewsletter';
import GardenMobileApp from '../../components/GardenMobileApp';
import { useDeviceMode } from '../../lib/useDeviceMode';

export default function ClinicPage() {
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const { isMounted, isMobileView, setViewMode } = useDeviceMode();

  if (isMounted && isMobileView) {
    return (
      <GardenMobileApp 
        initialTab="doctor" 
        onSwitchToDesktop={() => setViewMode('desktop')} 
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <GardenNavbar onOpenNewsletter={() => setNewsletterModalOpen(true)} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <PlantClinicCommunity />
        <GardenNewsletter isBannerOnly={true} />
      </main>

      <GardenFooter />
      <GardenNewsletter isOpen={newsletterModalOpen} onClose={() => setNewsletterModalOpen(false)} />
    </div>
  );
}
