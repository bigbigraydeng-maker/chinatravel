import type { DestinationGuide } from '@/lib/data/guides';
import type { TripInterest } from '@/lib/tools/trip-planner-logic';
import { scoreInterestsInText } from '@/lib/tools/trip-planner-logic';

export type MatcherFitness = 'easy' | 'moderate' | 'challenge';
export type MatcherGroup = 'honeymoon' | 'family' | 'friends' | 'solo';
export type MatcherStyle = 'immersive' | 'classic' | 'hidden';

export interface DestinationMatcherAnswers {
  interest: TripInterest | null;
  fitness: MatcherFitness | null;
  group: MatcherGroup | null;
  style: MatcherStyle | null;
}

export const MATCHER_INTEREST_OPTIONS: { id: TripInterest; label: string }[] = [
  { id: 'history', label: 'History & heritage' },
  { id: 'nature', label: 'Nature & scenery' },
  { id: 'food', label: 'Food & culture' },
  { id: 'adventure', label: 'Adventure & activity' },
  { id: 'leisure', label: 'Relaxation & leisure' },
];

export const MATCHER_FITNESS_OPTIONS: { id: MatcherFitness; label: string }[] = [
  { id: 'easy', label: 'Relaxed pace' },
  { id: 'moderate', label: 'Moderate walking' },
  { id: 'challenge', label: 'Active & challenging' },
];

export const MATCHER_GROUP_OPTIONS: { id: MatcherGroup; label: string }[] = [
  { id: 'honeymoon', label: 'Honeymoon' },
  { id: 'family', label: 'Family' },
  { id: 'friends', label: 'Friends' },
  { id: 'solo', label: 'Solo traveller' },
];

export const MATCHER_STYLE_OPTIONS: { id: MatcherStyle; label: string }[] = [
  { id: 'immersive', label: 'Deep cultural immersion' },
  { id: 'classic', label: 'Iconic must-see sights' },
  { id: 'hidden', label: 'Hidden gems & quieter corners' },
];

const FITNESS_POSITIVE: Record<MatcherFitness, string[]> = {
  easy: ['cruise', 'flat', 'leisure', 'gentle', 'relax', 'slow', 'comfortable', 'walk'],
  moderate: ['walk', 'steps', 'moderate', 'pace', 'explore'],
  challenge: ['hike', 'steep', 'summit', 'trail', 'cable', 'vertical', 'climb', 'strenuous'],
};

const STYLE_KEYWORDS: Record<MatcherStyle, string[]> = {
  immersive: ['culture', 'local', 'immerse', 'heritage', 'traditional', 'hutong', 'authentic', 'daily life'],
  classic: ['iconic', 'unesco', 'must', 'forbidden', 'great wall', 'terracotta', 'imperial', 'landmark'],
  hidden: ['quiet', 'lesser', 'village', 'countryside', 'off', 'hidden', 'boutique', 'intimate'],
};

const GROUP_SLUG_BOOST: Record<MatcherGroup, Record<string, number>> = {
  honeymoon: {
    'lijiang-travel-guide': 14,
    'hangzhou-travel-guide': 12,
    'yangshuo-travel-guide': 10,
    'dali-travel-guide': 10,
  },
  family: {
    'chengdu-travel-guide': 14,
    'guilin-travel-guide': 12,
    'beijing-travel-guide': 10,
    'shanghai-travel-guide': 8,
  },
  friends: {
    'zhangjiajie-travel-guide': 12,
    'chongqing-travel-guide': 10,
    'chengdu-travel-guide': 10,
    'yangshuo-travel-guide': 8,
  },
  solo: {
    'shanghai-travel-guide': 12,
    'beijing-travel-guide': 10,
    'xian-travel-guide': 10,
    'kunming-travel-guide': 8,
  },
};

export function buildGuideBlob(guide: DestinationGuide): string {
  return [
    guide.destinationName,
    guide.h1,
    guide.heroSubtitle,
    ...guide.keywords,
    ...guide.introText,
    ...guide.sections.flatMap((s) => [s.title, ...s.content]),
  ]
    .join(' ')
    .toLowerCase();
}

export function scoreFitnessFit(fitness: MatcherFitness, text: string): number {
  const t = text.toLowerCase();
  const words = FITNESS_POSITIVE[fitness];
  let hits = 0;
  for (const w of words) {
    if (t.includes(w)) hits += 1;
  }
  return Math.min(18, hits * 2);
}

export function scoreStyleFit(style: MatcherStyle, text: string): number {
  const t = text.toLowerCase();
  const words = STYLE_KEYWORDS[style];
  let hits = 0;
  for (const w of words) {
    if (t.includes(w)) hits += 1;
  }
  return Math.min(20, hits * 4);
}

export function scoreGroupBoost(group: MatcherGroup, slug: string): number {
  return GROUP_SLUG_BOOST[group][slug] ?? 0;
}

export function scoreGuideForMatcher(
  guide: DestinationGuide,
  answers: DestinationMatcherAnswers
): number {
  if (!answers.interest || !answers.fitness || !answers.group || !answers.style) return 0;
  const blob = buildGuideBlob(guide);
  let score =
    scoreInterestsInText([answers.interest], blob) +
    scoreFitnessFit(answers.fitness, blob) +
    scoreStyleFit(answers.style, blob) +
    scoreGroupBoost(answers.group, guide.slug);
  return score;
}

export interface MatchedDestination {
  guide: DestinationGuide;
  score: number;
  stars: number;
}

export function scoreToStars(score: number): number {
  if (score <= 0) return 1;
  const stars = Math.round(score / 18);
  return Math.min(5, Math.max(1, stars));
}

export function getMatchedDestinations(
  answers: DestinationMatcherAnswers,
  guides: DestinationGuide[],
  limit = 4
): MatchedDestination[] {
  const scored = guides
    .map((guide) => {
      const score = scoreGuideForMatcher(guide, answers);
      return { guide, score, stars: scoreToStars(score) };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.guide.destinationName.localeCompare(b.guide.destinationName));
  if (scored.length) return scored.slice(0, limit);
  const fallback = guides.slice(0, limit).map((guide) => ({
    guide,
    score: 10,
    stars: 3 as const,
  }));
  return fallback;
}

export function isDestinationMatcherComplete(a: DestinationMatcherAnswers): boolean {
  return !!(a.interest && a.fitness && a.group && a.style);
}
