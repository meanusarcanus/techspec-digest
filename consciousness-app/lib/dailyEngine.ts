import { dailyPosts, DailyPost, Category, DEFAULT_AFFILIATE_TAG } from '../data/dailyPosts';

/**
 * Calculates the day of year (0-based: 0 to 365) for a given Date object.
 */
export function getDayOfYear(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diffTime = date.getTime() - startOfYear.getTime();
  const oneDayMs = 1000 * 60 * 60 * 24;
  return Math.floor(diffTime / oneDayMs);
}

/**
 * Formats a Date object to YYYY-MM-DD string key.
 */
export function formatDateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Deterministically retrieves the active post for any given calendar date.
 * Uses day-of-year modulo algorithm across dailyPosts dataset.
 */
export function getPostForDate(date: Date = new Date()): DailyPost {
  if (!dailyPosts || dailyPosts.length === 0) {
    throw new Error('dailyPosts dataset is empty');
  }
  const dayIndex = getDayOfYear(date);
  const postIndex = ((dayIndex % dailyPosts.length) + dailyPosts.length) % dailyPosts.length;
  return dailyPosts[postIndex];
}

/**
 * Convenience function to fetch today's active consciousness post.
 */
export function getTodayPost(): DailyPost {
  return getPostForDate(new Date());
}

/**
 * Formats a date into a human-readable string (e.g., "Thursday, August 27, 2026").
 */
export function formatDateDisplay(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Given a "YYYY-MM-DD" string, returns the post for that calendar date.
 */
export function getPostByDateString(dateStr: string): DailyPost {
  const parsedDate = new Date(dateStr);
  if (isNaN(parsedDate.getTime())) {
    return getTodayPost();
  }
  return getPostForDate(parsedDate);
}

/**
 * Returns a new Date shifted by the given number of days (+1 for tomorrow, -1 for yesterday).
 */
export function shiftDateByDays(baseDate: Date, days: number): Date {
  const result = new Date(baseDate);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Filters posts by category. Returns all posts if category is 'All'.
 */
export function getPostsByCategory(category: Category | 'All'): DailyPost[] {
  if (category === 'All') {
    return dailyPosts;
  }
  return dailyPosts.filter((post) => post.category === category);
}

/**
 * Searches posts across titles, excerpts, tags, and full essay content.
 */
export function searchPosts(query: string, categoryFilter: Category | 'All' = 'All'): DailyPost[] {
  const targetCategoryPosts = getPostsByCategory(categoryFilter);
  if (!query || query.trim() === '') {
    return targetCategoryPosts;
  }

  const q = query.toLowerCase().trim();
  return targetCategoryPosts.filter((post) => {
    const inTitle = post.title.toLowerCase().includes(q);
    const inExcerpt = post.excerpt.toLowerCase().includes(q);
    const inEssay = post.fullEssay.toLowerCase().includes(q);
    const inTags = post.tags.some((t) => t.toLowerCase().includes(q));
    const inAuthor = post.author.name.toLowerCase().includes(q);
    return inTitle || inExcerpt || inEssay || inTags || inAuthor;
  });
}

/**
 * Ensures an Amazon affiliate URL contains the specified tracking tag parameter.
 */
export function ensureAffiliateUrl(url: string, trackingTag: string = DEFAULT_AFFILIATE_TAG): string {
  if (!url) return '#';
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('tag', trackingTag);
    return parsed.toString();
  } catch {
    if (url.includes('tag=')) {
      return url.replace(/tag=[^&]+/, `tag=${trackingTag}`);
    }
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}tag=${trackingTag}`;
  }
}
