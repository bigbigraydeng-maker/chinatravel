import type { Tour } from '@/lib/data/tours';
import type { BlogPost } from '@/lib/data/blogs';
import type { DestinationGuide } from '@/lib/data/guides';

export type TripDurationBucket = '5-7' | '8-10' | '11-14' | '15+';
export type TripInterest = 'history' | 'nature' | 'food' | 'adventure' | 'leisure';
export type TripBudget = 'economy' | 'mid' | 'luxury';
export type TripSeason = 'spring' | 'summer' | 'autumn' | 'winter';

export interface TripPlannerAnswers {
  duration: TripDurationBucket | null;
  interests: TripInterest[];
  budget: TripBudget | null;
  season: TripSeason | null;
}

export const TRIP_DURATION_OPTIONS: { id: TripDurationBucket; label: string }[] = [
  { id: '5-7', label: '5–7 days' },
  { id: '8-10', label: '8–10 days' },
  { id: '11-14', label: '11–14 days' },
  { id: '15+', label: '15+ days' },
];

export const TRIP_INTEREST_OPTIONS: { id: TripInterest; label: string }[] = [
  { id: 'history', label: 'History & heritage' },
  { id: 'nature', label: 'Nature & scenery' },
  { id: 'food', label: 'Food & culture' },
  { id: 'adventure', label: 'Adventure & activity' },
  { id: 'leisure', label: 'Relaxation & leisure' },
];

export const TRIP_BUDGET_OPTIONS: { id: TripBudget; label: string }[] = [
  { id: 'economy', label: 'Economy' },
  { id: 'mid', label: 'Mid-range' },
  { id: 'luxury', label: 'Luxury' },
];

export const TRIP_SEASON_OPTIONS: { id: TripSeason; label: string }[] = [
  { id: 'spring', label: 'Spring (Mar–May)' },
  { id: 'summer', label: 'Summer (Jun–Aug)' },
  { id: 'autumn', label: 'Autumn (Sep–Nov)' },
  { id: 'winter', label: 'Winter (Dec–Feb)' },
];

const INTEREST_KEYWORDS: Record<TripInterest, string[]> = {
  history: [
    'temple',
    'forbidden',
    'imperial',
    'dynasty',
    'museum',
    'warrior',
    'great wall',
    'heritage',
    'unesco',
    'ancient',
    'palace',
    'terracotta',
    'confucius',
    'dynastic',
  ],
  nature: [
    'river',
    'mountain',
    'zhangjiajie',
    'guilin',
    'yangshuo',
    'li river',
    'panda',
    'national park',
    'scenic',
    'landscape',
    'lake',
    'bamboo',
    'forest',
    'canyon',
  ],
  food: [
    'cuisine',
    'food',
    'hot pot',
    'dining',
    'tea',
    'culinary',
    'flavour',
    'sichuan',
    'peking',
    'dim sum',
    'restaurant',
    'gastronomy',
  ],
  adventure: ['hike', 'trek', 'cable', 'summit', 'rafting', 'active', 'adventure', 'climb', 'trail'],
  leisure: ['cruise', 'relax', 'leisure', 'spa', 'comfort', 'gentle', 'slow', 'pace'],
};

const SEASON_HINTS: Record<TripSeason, string[]> = {
  spring: ['spring', 'march', 'april', 'may', 'blossom', 'cherry'],
  summer: ['summer', 'june', 'july', 'august'],
  autumn: ['autumn', 'fall', 'september', 'october', 'november', 'foliage'],
  winter: ['winter', 'december', 'january', 'february', 'snow', 'ice festival'],
};

export function parseTourDurationDays(duration: string): number {
  const m = duration.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

export function durationBucketMatches(days: number, bucket: TripDurationBucket): boolean {
  if (days <= 0) return false;
  switch (bucket) {
    case '5-7':
      return days >= 5 && days <= 7;
    case '8-10':
      return days >= 8 && days <= 10;
    case '11-14':
      return days >= 11 && days <= 14;
    case '15+':
      return days >= 15;
    default:
      return false;
  }
}

export function scoreDurationFit(days: number, bucket: TripDurationBucket): number {
  if (durationBucketMatches(days, bucket)) return 40;
  const center =
    bucket === '5-7' ? 6 : bucket === '8-10' ? 9 : bucket === '11-14' ? 12 : 18;
  const dist = Math.abs(days - center);
  return Math.max(0, 25 - dist * 2);
}

export function buildTourSearchBlob(tour: Tour): string {
  return [
    tour.name,
    tour.title,
    tour.shortDescription,
    ...(tour.tags ?? []),
    ...tour.highlights,
    ...tour.itinerary.flatMap((d) => [d.title, d.description]),
  ]
    .join(' ')
    .toLowerCase();
}

export function scoreInterestsInText(interests: TripInterest[], text: string): number {
  let score = 0;
  const t = text.toLowerCase();
  for (const interest of interests) {
    const kws = INTEREST_KEYWORDS[interest];
    const hits = kws.filter((k) => t.includes(k)).length;
    score += Math.min(12, hits * 3);
  }
  return score;
}

export function scoreBudgetTier(budget: TripBudget, tier: Tour['tier']): number {
  if (budget === 'economy') {
    if (tier === 'stopover') return 18;
    if (tier === 'discovery') return 15;
    return 5;
  }
  if (budget === 'mid') {
    if (tier === 'discovery') return 18;
    if (tier === 'signature') return 12;
    return 10;
  }
  if (tier === 'signature') return 22;
  if (tier === 'discovery') return 12;
  return 6;
}

export function scoreSeasonHint(season: TripSeason, text: string): number {
  const t = text.toLowerCase();
  const hints = SEASON_HINTS[season];
  let hits = 0;
  for (const h of hints) {
    if (t.includes(h)) hits += 1;
  }
  return Math.min(15, hits * 3);
}

export function scoreTourForPlanner(answers: TripPlannerAnswers, tour: Tour): number {
  if (
    !answers.duration ||
    !answers.budget ||
    !answers.season ||
    answers.interests.length === 0
  ) {
    return 0;
  }
  const days = parseTourDurationDays(tour.duration);
  const blob = buildTourSearchBlob(tour);
  return (
    scoreDurationFit(days, answers.duration) +
    scoreInterestsInText(answers.interests, blob) +
    scoreBudgetTier(answers.budget, tour.tier) +
    scoreSeasonHint(answers.season, blob)
  );
}

export function getRecommendedTours(answers: TripPlannerAnswers, tours: Tour[], limit = 3): Tour[] {
  const scored = tours
    .map((tour) => ({ tour, score: scoreTourForPlanner(answers, tour) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.tour.name.localeCompare(b.tour.name));
  const seen = new Set<string>();
  const out: Tour[] = [];
  for (const { tour } of scored) {
    const key = `${tour.tier}-${tour.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(tour);
    if (out.length >= limit) break;
  }
  if (out.length >= limit) return out;
  const fallback = tours.filter((t) => !seen.has(`${t.tier}-${t.slug}`));
  for (const tour of fallback) {
    out.push(tour);
    if (out.length >= limit) break;
  }
  return out.slice(0, limit);
}

export function getRelatedBlogPosts(
  interests: TripInterest[],
  posts: BlogPost[],
  limit = 3
): BlogPost[] {
  const scored = posts
    .map((post) => {
      const blob = [post.title, post.excerpt, ...post.tags].join(' ').toLowerCase();
      return { post, score: scoreInterestsInText(interests, blob) };
    })
    .sort((a, b) => b.score - a.score);
  const matched = scored.filter((s) => s.score > 0).slice(0, limit);
  if (matched.length >= Math.min(limit, posts.length)) {
    return matched.map((m) => m.post);
  }
  return [...posts].slice(0, limit);
}

export function getRelatedGuides(
  interests: TripInterest[],
  guides: DestinationGuide[],
  limit = 4
): DestinationGuide[] {
  const scored = guides
    .map((guide) => {
      const blob = [guide.destinationName, guide.h1, ...guide.keywords, ...guide.introText]
        .join(' ')
        .toLowerCase();
      return { guide, score: scoreInterestsInText(interests, blob) };
    })
    .sort((a, b) => b.score - a.score);
  const matched = scored.filter((s) => s.score > 0).slice(0, limit);
  if (matched.length) return matched.map((m) => m.guide);
  return guides.slice(0, limit);
}

export function isTripPlannerComplete(a: TripPlannerAnswers): boolean {
  return !!(a.duration && a.budget && a.season && a.interests.length > 0);
}

export function tourDetailPath(tour: Tour): string {
  return `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;
}
