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

export interface SentEmailRecord {
  id: string;
  to: string;
  subject: string;
  sentAt: string;
  type: 'welcome_signup' | 'newsletter_dispatch' | 'badge_upgrade';
  preview: string;
}

const STORAGE_KEY_USER = 'garden_perks_active_user';
const STORAGE_KEY_USERS_DB = 'garden_perks_users_database';
const STORAGE_KEY_SUBSCRIBERS = 'garden_perks_subscribers';
const STORAGE_KEY_SENT_EMAILS = 'garden_perks_sent_emails';
const STORAGE_KEY_CUSTOM_CATALOG = 'garden_perks_custom_catalog';

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

/**
 * Retrieves the persistent user database of all registered botanists
 */
export function getGardenUsersDatabase(): Record<string, GardenUser> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS_DB);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return (parsed && typeof parsed === 'object') ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Finds a user in the persistent database by username or email
 */
export function findUserInDatabase(identifier: string): GardenUser | null {
  if (!identifier || typeof window === 'undefined') return null;
  const db = getGardenUsersDatabase();
  const clean = identifier.trim().toLowerCase().replace(/^@/, '');
  
  if (db[clean]) return db[clean];

  // Search by email or username values
  for (const user of Object.values(db)) {
    if (
      user.username.toLowerCase() === clean ||
      user.email.toLowerCase() === clean ||
      user.email.toLowerCase().split('@')[0] === clean
    ) {
      return user;
    }
  }

  return null;
}

/**
 * Saves or updates a user in the persistent database
 */
export function saveGardenUserToDatabase(user: GardenUser): void {
  if (typeof window === 'undefined' || !user || !user.username) return;
  try {
    const db = getGardenUsersDatabase();
    const cleanUsername = user.username.toLowerCase().trim().replace(/^@/, '');
    const cleanEmail = user.email.toLowerCase().trim();

    db[cleanUsername] = { ...user, username: cleanUsername, email: cleanEmail };
    if (cleanEmail) {
      db[cleanEmail] = db[cleanUsername];
    }

    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(db));
  } catch (err) {
    console.warn('Failed to save user to database:', err);
  }
}

/**
 * Counts how many plants in the custom catalog were authored by this username/email
 */
export function countUserContributionsFromCatalog(username: string, email?: string): number {
  if (typeof window === 'undefined' || !username) return 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_CATALOG);
    if (!raw) return 0;
    const catalog = JSON.parse(raw);
    if (!Array.isArray(catalog)) return 0;

    const cleanUser = username.trim().toLowerCase().replace(/^@/, '');
    const cleanEmail = (email || '').trim().toLowerCase();
    const emailPrefix = cleanEmail.split('@')[0];

    const userPlants = catalog.filter((plant: any) => {
      if (!plant || !plant.addedBy) return false;
      const authorUsername = (plant.addedBy.username || '').toLowerCase().trim().replace(/^@/, '');
      const authorDisplay = (plant.addedBy.displayName || '').toLowerCase().trim().replace(/^@/, '');
      
      return (
        authorUsername === cleanUser ||
        authorDisplay === cleanUser ||
        (cleanEmail && (authorUsername === cleanEmail || authorUsername === emailPrefix))
      );
    });

    return userPlants.length;
  } catch {
    return 0;
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
 * Dispatches a welcome confirmation email to the user upon signup / login.
 * Supports asynchronous FormSubmit background delivery, local email records logging,
 * and pre-built mailto links.
 */
export async function sendWelcomeSignUpEmail(user: GardenUser): Promise<{
  success: boolean;
  mailtoUrl: string;
  preview: string;
}> {
  const subject = `Welcome to The Garden Perks! 🌱 Your Botanist Membership is Confirmed`;
  const preview = `Greetings Botanist @${user.username}! Your VIP membership is confirmed. Rank: ${user.badge}. You have unlocked unlimited Dr. Flora Plant Clinic consultations and custom catalogue submissions.`;

  const bodyText = `Greetings Botanist @${user.username},

Welcome to The Garden Perks Botanical Society! We are thrilled to welcome you to our community of passionate plant parents and botanists.

Your Botanist Credentials:
------------------------------------------
• Handle: @${user.username}
• Current Rank: ${user.badge} (${user.badgeTier})
• Member Email: ${user.email}
• Verified Species in Catalogue: ${user.contributionsCount}
• Joined: ${new Date(user.joinedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}

Your Active Member Perks:
------------------------------------------
1. 🌿 Unlimited Dr. Flora Consultations: Direct diagnostics, repotting schedules, and natural pest solutions.
2. 🌺 Global Catalogue Publishing: Add rare cultivars and local flora to our community encyclopedia.
3. 📬 The Daily Sprout Dispatch: Every morning care profiles and seasonal greenhouse advice.
4. 🛍️ Amazon Botanist Perks: Curated soil blends, moisture meters, and grow light recommendations.

Explore Your Perks Online:
https://theodisius.github.io/techspec-digest/garden-perks/

With verdant regards,
Dr. Flora & The Garden Perks Curatorial Board
`;

  const mailtoUrl = `mailto:${encodeURIComponent(user.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  // 1. Record sent email in local sent emails log
  if (typeof window !== 'undefined') {
    try {
      const rawSent = localStorage.getItem(STORAGE_KEY_SENT_EMAILS);
      const sentList: SentEmailRecord[] = rawSent ? JSON.parse(rawSent) : [];
      sentList.unshift({
        id: `email-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        to: user.email,
        subject,
        sentAt: new Date().toISOString(),
        type: 'welcome_signup',
        preview
      });
      // Keep recent 50 emails
      localStorage.setItem(STORAGE_KEY_SENT_EMAILS, JSON.stringify(sentList.slice(0, 50)));
      window.dispatchEvent(new CustomEvent('garden_email_sent', { detail: { user, subject } }));
    } catch (err) {
      console.warn('Failed to log sent email:', err);
    }
  }

  // 2. Dispatch background HTTP POST to FormSubmit API (runs silently, gracefully catches CORS or offline)
  try {
    if (typeof window !== 'undefined' && navigator.onLine) {
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(user.email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: subject,
          _template: 'box',
          username: `@${user.username}`,
          email: user.email,
          rank: user.badge,
          tier: user.badgeTier,
          contributions: user.contributionsCount,
          message: bodyText
        })
      }).catch(() => {
        // Silently handled - email is logged locally and mailto fallback ready
      });
    }
  } catch {
    // Graceful fallback
  }

  return {
    success: true,
    mailtoUrl,
    preview
  };
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

  // 1. Search persistent user database
  const priorUser = findUserInDatabase(cleanUsername) || findUserInDatabase(cleanEmail);

  // 2. Count actual custom catalog contributions matching this user
  const catalogCount = countUserContributionsFromCatalog(cleanUsername, cleanEmail);

  // 3. Compute accurate contributions count (never reset back to 0 if previously earned or plants exist)
  const totalContributions = Math.max(
    priorUser?.contributionsCount || 0,
    catalogCount
  );

  const { badge, tier } = getBadgeForCount(totalContributions);

  // Automatically join the newsletter and VIP subscription
  autoSubscribeToNewsletter(cleanEmail, cleanUsername);

  const user: GardenUser = {
    username: cleanUsername,
    email: cleanEmail,
    displayName: displayName?.trim() || priorUser?.displayName || cleanUsername,
    avatarEmoji: avatarEmoji || priorUser?.avatarEmoji || '🌿',
    badge,
    badgeTier: tier,
    contributionsCount: totalContributions,
    joinedAt: priorUser?.joinedAt || new Date().toISOString(),
    isSubscribedToNewsletter: true
  };

  if (typeof window !== 'undefined') {
    // Save to persistent database
    saveGardenUserToDatabase(user);
    // Save active session
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('garden_user_updated', { detail: user }));
    
    // Dispatch welcome email
    sendWelcomeSignUpEmail(user);
  }

  return user;
}

export function logoutGardenUser(): void {
  if (typeof window !== 'undefined') {
    // Only removes active session, keeps user permanently in STORAGE_KEY_USERS_DB!
    localStorage.removeItem(STORAGE_KEY_USER);
    window.dispatchEvent(new CustomEvent('garden_user_updated', { detail: null }));
  }
}

export function recordUserPlantContribution(): GardenUser | null {
  const user = getCurrentGardenUser();
  if (!user || typeof window === 'undefined') return null;

  const catalogCount = countUserContributionsFromCatalog(user.username, user.email);
  const updatedCount = Math.max((user.contributionsCount || 0) + 1, catalogCount + 1);
  const { badge, tier } = getBadgeForCount(updatedCount);

  const updatedUser: GardenUser = {
    ...user,
    contributionsCount: updatedCount,
    badge,
    badgeTier: tier
  };

  // Persist to user database
  saveGardenUserToDatabase(updatedUser);
  // Persist to active session
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
  window.dispatchEvent(new CustomEvent('garden_user_updated', { detail: updatedUser }));
  return updatedUser;
}
