'use client';

import { useEffect } from 'react';
import { initCommunityCatalogSync } from '../lib/communityCatalogSync';

export function CommunitySyncProvider() {
  useEffect(() => {
    const unsub = initCommunityCatalogSync();
    return () => {
      if (typeof unsub === 'function') {
        unsub();
      }
    };
  }, []);

  return null;
}
