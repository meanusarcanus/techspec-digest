'use client';

export interface GardenUser {
  username: string;
  displayName: string;
  avatarEmoji: string;
  badge: string;
  badgeTier: 'Novice' | 'Scout' | 'Curator' | 'Master';
  contributionsCount: number;
  joinedAt: string;
}

const STORAGE_KEY_USER = 'garden_perks_active_user';

export function getBadgeForCount(count: number): { badge: string; tier: GardenUser['badgeTier'] } {
  if (count <= 1) {
    return { badge: '🌱 Pioneer Botanist', tier: 'Novice' };
  } else if (count <= 4) {
    return { badge: '🌿 Botanical Scout', tier: 'Scout' };
  } else if (count <= 9) {
    return { badge: '🌺 Greenhouse Curator', tier: 'Curator' };
  } else {
    return { badge: '👑 Master Horticulturist', tier: 'Master' };
  }
}

export function getCurrentGardenUser(): GardenUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function loginGardenUser(
  rawUsername: string,
  avatarEmoji = '🌿',
  displayName?: string
): GardenUser {
  const cleanUsername = rawUsername.replace(/^@/, '').trim().toLowerCase().replace(/\s+/g, '_') || 'botanist';
  const existing = getCurrentGardenUser();

  const contributionsCount = (existing && existing.username === cleanUsername) 
    ? existing.contributionsCount 
    : 0;
  
  const { badge, tier } = getBadgeForCount(contributionsCount);

  const user: GardenUser = {
    username: cleanUsername,
    displayName: displayName?.trim() || cleanUsername,
    avatarEmoji,
    badge,
    badgeTier: tier,
    contributionsCount,
    joinedAt: existing?.joinedAt || new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('garden_user_updated', { detail: user }));
  }

  return user;
}

export function logoutGardenUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_USER);
    window.dispatchEvent(new CustomEvent('garden_user_updated', { detail: null }));
  }
}

export function recordUserPlantContribution(): GardenUser | null {
  const user = getCurrentGardenUser();
  if (!user || typeof window === 'undefined') return null;

  const updatedCount = (user.contributionsCount || 0) + 1;
  const { badge, tier } = getBadgeForCount(updatedCount);

  const updatedUser: GardenUser = {
    ...user,
    contributionsCount: updatedCount,
    badge,
    badgeTier: tier
  };

  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
  window.dispatchEvent(new CustomEvent('garden_user_updated', { detail: updatedUser }));
  return updatedUser;
}
