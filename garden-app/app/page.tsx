'use client';

import React from 'react';
import { useDeviceMode } from '../lib/useDeviceMode';
import GardenDesktopView from '../components/GardenDesktopView';
import GardenMobileApp from '../components/GardenMobileApp';

export default function HomePage() {
  const { isMounted, isMobileView, setViewMode } = useDeviceMode();

  // Default to Desktop View during SSR for SEO & search crawler indexing
  if (!isMounted) {
    return <GardenDesktopView onSwitchToMobile={() => setViewMode('mobile')} />;
  }

  // Active phone / mobile PWA view
  if (isMobileView) {
    return (
      <GardenMobileApp 
        onSwitchToDesktop={() => setViewMode('desktop')} 
      />
    );
  }

  // Standard Desktop Portal view
  return (
    <GardenDesktopView 
      onSwitchToMobile={() => setViewMode('mobile')} 
    />
  );
}
