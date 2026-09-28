/**
 * Real CTS Google reviews for the China Stopover cards.
 *
 * Source: Magic Engine `review_items` table (Supabase project glbdnayojixmexgofbsd),
 * client_id c0000000-0000-0000-0000-000000000000 ("CTS Tours NZ"), source='gbp'.
 * CTS has no per-tour review breakdown — Google only reports one company-wide
 * rating — so every stopover card shows the same real aggregate plus one of
 * these real excerpts, rotated across cards. `reviewUid` matches
 * `review_items.review_uid` for that row, so any quote here can be traced
 * back to its source review.
 *
 * Aggregate refreshed weekly by src/lib/reputation/snapshots.ts (reputation_snapshots
 * table); below is the value as of the date noted. Re-query both tables to refresh.
 */

export const CTS_GOOGLE_RATING = 4.4;
export const CTS_GOOGLE_REVIEW_COUNT = 12;
export const CTS_GOOGLE_RATING_AS_OF = '2026-09-28';

export interface CtsReviewQuote {
  reviewUid: string;
  author: string;
  rating: number;
  /** Verbatim excerpt from the real review text. "…" marks a mid-sentence cut, never a splice. */
  excerpt: string;
}

/**
 * Location-neutral quotes — none names a specific city or landmark, so any of
 * these is accurate on any China Stopover card. Safe to rotate freely.
 *
 * Excluded on purpose: Murray Middendorf's review ("...a stopover in Xian...
 * the culture and scenery in Xinjiang is stunning...") reads as Xian-relevant,
 * but the excerpt itself only describes Xinjiang — it doesn't say anything
 * true of Xian specifically, so no stopover card (including the Xian one) can
 * accurately show it (子牙 review, 2026-09-29, on the first version of this file,
 * which had assigned it to the xian and shanghai-suzhou cards).
 */
const NEUTRAL_QUOTES: CtsReviewQuote[] = [
  {
    reviewUid: 'Ci9DQUlRQUNvZENodHljRjlvT2xKVGFFRnhVbFUzVnpaVVdWbGZTVlZSWWxaMWRYYxAB',
    author: 'Colin Wright',
    rating: 5,
    excerpt: 'A group tour that exceeded all expectation.',
  },
  {
    reviewUid: 'Ci9DQUlRQUNvZENodHljRjlvT2sxb2JISkNWblZ5V1VSbFpsaEpiME5ZZGs1NUxXYxAB',
    author: 'Tessa A',
    rating: 5,
    excerpt: 'Communication was great and the tour itself was amazing.',
  },
  {
    reviewUid: 'Ci9DQUlRQUNvZENodHljRjlvT2taWmMyZFpVamx6UWxGT2VXVmZiM0JaUWs5R04zYxAB',
    author: 'Maryam Absh',
    rating: 5,
    excerpt:
      'The china journey was well‑organized, I actually enjoyed all the moments without worrying about anything.',
  },
  {
    reviewUid: 'Ci9DQUlRQUNvZENodHljRjlvT2pGUVpsbFZNSGcwVjBaRU9GQndkamxWYjJRM1IyYxAB',
    author: 'T L Trust Property',
    rating: 4,
    excerpt: 'The tour guides were knowledgeable and very good…',
  },
  {
    reviewUid: 'Ci9DQUlRQUNvZENodHljRjlvT2xKQmFGRk1OMng2UWtvd2NuTjRNVmQ1V1ROaVNtYxAB',
    author: 'Cherie Fairley',
    rating: 5,
    excerpt: '…an awesome trip, the trip of a lifetime.',
  },
  {
    reviewUid: 'Ci9DQUlRQUNvZENodHljRjlvT2tSUlJteHZkakExZGtjMWNtNUVTVVJOYmxCVGNIYxAB',
    author: 'Torsten Rahbek',
    rating: 5,
    excerpt: '…the trip was well organized, with no problems.',
  },
];

/**
 * Place-specific quote: only accurate on the exact slug it names, never a fallback
 * or a rotation candidate for any other card.
 */
const SHANGHAI_QUOTE: CtsReviewQuote = {
  reviewUid: 'ChdDSUhNMG9nS0VJQ0FnSUQwbEkzdzdRRRAB',
  author: 'Catherine Horide',
  rating: 5,
  excerpt: 'Shanghai night boat cruise and climbing the Great wall were standouts.',
};

const PLACE_SPECIFIC_QUOTE_BY_SLUG: Record<string, CtsReviewQuote> = {
  shanghai: SHANGHAI_QUOTE,
};

/** Every other China Stopover slug, in display order — rotates through NEUTRAL_QUOTES only. */
const NEUTRAL_ROTATION_SLUGS = [
  'xian',
  'beijing',
  'beijing-express',
  'shanghai-express',
  'chengdu',
  'guilin',
  'guangzhou',
  'shanghai-suzhou',
  'shanghai-wuzhen',
  'guilin-surrounds',
  'zhangjiajie',
  'guangzhou-shenzhen',
  'huangshan',
];

/**
 * Returns undefined for a slug this file doesn't know about, so the caller's
 * existing "no review data → don't render the block" path applies — never a
 * silent default to some other tour's quote.
 */
export function getCtsStopoverReviewQuote(slug: string): CtsReviewQuote | undefined {
  const placeSpecific = PLACE_SPECIFIC_QUOTE_BY_SLUG[slug];
  if (placeSpecific) return placeSpecific;
  const rotationIndex = NEUTRAL_ROTATION_SLUGS.indexOf(slug);
  if (rotationIndex === -1) return undefined;
  return NEUTRAL_QUOTES[rotationIndex % NEUTRAL_QUOTES.length];
}
