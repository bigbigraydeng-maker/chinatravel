/**
 * The "Latest on this journey" block of an ad landing page shows ONE recent post or video about the tour.
 *
 * Nothing is fetched from a social network: a person adds an item to this list in a pull request, with the name of
 * who approved it and when, so every visitor-facing item has a named approver and a reviewable history. An item
 * older than 30 days is hidden, and when there is nothing to show the whole block disappears. Videos are
 * self-hosted files (no third-party embeds, so no extra tracking and no outside scripts on the page).
 */
import type { AdImage } from './types';
import { findForbiddenCopy } from './facts';

export type AdContentType = 'reel' | 'video' | 'post';
export type AdContentPlatform = 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'website';

export interface AdContentItem {
  id: string;
  tourSlug: string;
  type: AdContentType;
  platform: AdContentPlatform;
  /** Public page of the original post, optional, shown only as a plain link. */
  permalink?: string;
  /** Self-hosted file path that starts with '/', required for 'reel' and 'video', not allowed for 'post'. */
  videoSrc?: string;
  poster: AdImage;
  caption: string;
  /** 'YYYY-MM-DD' the post went public. */
  publishedAt: string;
  /** Name of the person who signed it off for the website. */
  approvedBy: string;
  /** ISO date-time of that sign-off. */
  approvedAt: string;
}

export const MAX_ITEM_AGE_DAYS = 30;

/** Starts empty on purpose; the block stays hidden until the first approved item is added here. */
export const AD_CONTENT_FEED: readonly AdContentItem[] = [];

export function validateFeedItem(item: AdContentItem): string[] {
  const problems: string[] = [];

  if (item.id.trim() === '') {
    problems.push('id is empty');
  }
  if (item.tourSlug.trim() === '') {
    problems.push('tourSlug is empty');
  }
  if (item.approvedBy.trim() === '') {
    problems.push('approvedBy is empty');
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.publishedAt) || Number.isNaN(Date.parse(item.publishedAt))) {
    problems.push('publishedAt is not a valid YYYY-MM-DD date');
  }
  if (Number.isNaN(Date.parse(item.approvedAt))) {
    problems.push('approvedAt is not a valid date-time');
  }

  if (item.caption.trim() === '') {
    problems.push('caption is empty');
  }
  if (item.caption.length > 300) {
    problems.push('caption is longer than 300 characters');
  }
  for (const reason of findForbiddenCopy(item.caption)) {
    problems.push(`caption: ${reason}`);
  }

  if (item.poster.src.trim() === '' || item.poster.alt.trim() === '') {
    problems.push('poster needs src and alt');
  }

  if ((item.type === 'reel' || item.type === 'video') && !item.videoSrc) {
    problems.push('videoSrc is required for a reel or video');
  }
  if (item.type === 'post' && item.videoSrc) {
    problems.push('videoSrc is not allowed for a post');
  }
  if (item.videoSrc && (!item.videoSrc.startsWith('/') || item.videoSrc.startsWith('//'))) {
    problems.push('videoSrc must be a file on this site (start with a single "/")');
  }

  if (item.permalink && !item.permalink.startsWith('https://')) {
    problems.push('permalink must start with https://');
  }

  return problems;
}

export function getLatestApprovedItem(
  feed: readonly AdContentItem[],
  tourSlug: string,
  now: Date,
): AdContentItem | null {
  const nowMs = now.getTime();

  const candidates = feed.filter((item) => {
    if (item.tourSlug !== tourSlug) {
      return false;
    }
    if (validateFeedItem(item).length !== 0) {
      return false;
    }
    if (Date.parse(item.approvedAt) > nowMs) {
      return false;
    }
    const published = Date.parse(`${item.publishedAt}T00:00:00Z`);
    const ageDays = Math.floor((nowMs - published) / 86400000);
    return ageDays >= 0 && ageDays <= MAX_ITEM_AGE_DAYS;
  });

  if (candidates.length === 0) {
    return null;
  }

  let best = candidates[0];
  for (const item of candidates.slice(1)) {
    if (item.publishedAt > best.publishedAt) {
      best = item;
    } else if (item.publishedAt === best.publishedAt && item.approvedAt > best.approvedAt) {
      best = item;
    }
  }
  return best;
}
