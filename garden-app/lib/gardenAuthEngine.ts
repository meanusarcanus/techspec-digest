'use client';

export interface GardenUser {
  username: string;
  email: string;
  displayName: string;
  avatarEmoji: string;
  badge: string;
  badgeTier: 'Novice' | 'Scout' | 'Curator' | 'Master';
  contributionsCount: number;
  joinedAt: string;
  isSubscribedToNewsletter: boolean;
}

const STORAGE_KEY_USER = 'garden_perks_active_user';
const STORAGE_KEY_SUBSCRIBERS = 'garden_perks_subscribers';

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
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.username) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Automatically joins the user into the newsletter & subscription database
 */
export function autoSubscribeToNewsletter(email: string, username?: string): void {
  if (typeof window === 'undefined') return;
  try {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return;

    const raw = localStorage.getItem(STORAGE_KEY_SUBSCRIBERS);
    const subs: Array<{ email: string; date: string; preferences: any; username?: string; source?: string }> = raw ? JSON.parse(raw) : [];

    const existingIndex = subs.findIndex(s => {
      if (typeof s === 'string') return (s as string).toLowerCase() === cleanEmail;
      return s.email?.toLowerCase() === cleanEmail;
    });

    if (existingIndex === -1) {
      subs.push({
        email: cleanEmail,
        username: username || cleanEmail.split('@')[0],
        date: new Date().toISOString(),
        source: 'botanist_auto_signup',
        preferences: { indoor: true, edible: true, pests: true }
      });
      localStorage.setItem(STORAGE_KEY_SUBSCRIBERS, JSON.stringify(subs));
    }

    // Broadcast subscriber event
    window.dispatchEvent(new CustomEvent('garden_newsletter_updated', { detail: { email: cleanEmail } }));
  } catch (err) {
    console.warn('Auto-subscribe newsletter error:', err);
  }
}

export function loginGardenUser(
  emailInput: string,
  rawUsername?: string,
  avatarEmoji = '🌿',
  displayName?: string
): GardenUser {
  let cleanEmail = emailInput.trim().toLowerCase();
  let candidateUsername = (rawUsername || '').trim();

  // If user swapped email and username
  if (!cleanEmail.includes('@') && candidateUsername.includes('@')) {
    const temp = cleanEmail;
    cleanEmail = candidateUsername;
    candidateUsername = temp;
  }

  // If no @ is in email, provide fallback
  if (!cleanEmail.includes('@')) {
    cleanEmail = `${cleanEmail.replace(/[^a-z0-9_]/gi, '') || 'botanist'}@gardenperks.vip`;
  }

  // Derive clean username from candidate or email prefix
  const usernameFromEmail = cleanEmail.split('@')[0].replace(/[^a-z0-9_]/gi, '_');
  const cleanUsername = candidateUsername.replace(/^@/, '').trim().toLowerCase().replace(/\s+/g, '_') || usernameFromEmail || 'botanist';

  const existing = getCurrentGardenUser();

  const contributionsCount = (existing && existing.username === cleanUsername) 
    ? existing.contributionsCount 
    : 0;
  
  const { badge, tier } = getBadgeForCount(contributionsCount);

  // Automatically join the newsletter and VIP subscription
  autoSubscribeToNewsletter(cleanEmail, cleanUsername);

  const user: GardenUser = {
    username: cleanUsername,
    email: cleanEmail,
    displayName: displayName?.trim() || cleanUsername,
    avatarEmoji: avatarEmoji || '🌿',
    badge,
    badgeTier: tier,
    contributionsCount,
    joinedAt: existing?.joinedAt || new Date().toISOString(),
    isSubscribedToNewsletter: true
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
