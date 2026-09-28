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

export const CTS_REVIEW_QUOTES: CtsReviewQuote[] = [
  {
    reviewUid: 'Ci9DQUlRQUNvZENodHljRjlvT25obWRsUkVaalZhUkhVdFFVWldXRWRSU0VwdWNYYxAB',
    author: 'Murray Middendorf',
    rating: 5,
    excerpt:
      'We had a fantastic time, the culture and scenery in Xinjiang is stunning and the tour was led by an experienced guide with excellent English.',
  },
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
    reviewUid: 'ChdDSUhNMG9nS0VJQ0FnSUQwbEkzdzdRRRAB',
    author: 'Catherine Horide',
    rating: 5,
    excerpt: 'Shanghai night boat cruise and climbing the Great wall were standouts.',
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
 * Deterministic slug → quote assignment for every China Stopover tour, hand-picked
 * where a quote's own content matches the destination (Murray's review literally
 * mentions "a stopover in Xian"), otherwise rotated through the pool above.
 */
const STOPOVER_QUOTE_BY_SLUG: Record<string, number> = {
  xian: 0,
  beijing: 1,
  'beijing-express': 2,
  shanghai: 3,
  'shanghai-express': 4,
  chengdu: 5,
  guilin: 6,
  guangzhou: 7,
  'shanghai-suzhou': 0,
  'shanghai-wuzhen': 1,
  'guilin-surrounds': 2,
  zhangjiajie: 3,
  'guangzhou-shenzhen': 4,
  huangshan: 5,
};

export function getCtsStopoverReviewQuote(slug: string): CtsReviewQuote {
  const index = STOPOVER_QUOTE_BY_SLUG[slug] ?? 0;
  return CTS_REVIEW_QUOTES[index];
}
