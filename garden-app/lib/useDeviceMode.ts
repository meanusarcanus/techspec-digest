'use client';

import { useState, useEffect } from 'react';

export type ViewMode = 'auto' | 'mobile' | 'desktop';

export function useDeviceMode() {
  const [viewMode, setViewModeState] = useState<ViewMode>('auto');
  const [isPhoneDetected, setIsPhoneDetected] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    // 1. Check saved override in localStorage
    const saved = localStorage.getItem('garden_perks_view_mode') as ViewMode | null;
    if (saved && (saved === 'auto' || saved === 'mobile' || saved === 'desktop')) {
      setViewModeState(saved);
    }

    // 2. Detection helper
    const checkDevice = () => {
      if (typeof window === 'undefined') return;

      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isMobileWidth = window.innerWidth < 768;
      const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;

      setIsStandalone(standalone);
      setIsPhoneDetected(isMobileUA || isMobileWidth || standalone);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('garden_perks_view_mode', mode);
    }
  };

  // Determine effective layout to show
  let isMobileView = isPhoneDetected;
  if (viewMode === 'mobile') {
    isMobileView = true;
  } else if (viewMode === 'desktop') {
    isMobileView = false;
  }

  return {
    isMounted,
    isPhoneDetected,
    isStandalone,
    viewMode,
    isMobileView,
    setViewMode,
  };
}
