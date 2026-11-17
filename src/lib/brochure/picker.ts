import type { Tour } from '@/lib/data/tours';
import { parseTourDurationDays } from '@/lib/tools/trip-planner-logic';
import { departures, tourCities, tourUrl } from '@/lib/tour-discovery';
import { headlinePrice } from '@/lib/tour-price';

export type TripLength = '10' | '15' | '17';
export type Pace = 'easy' | 'full';
export interface PickerAnswers {
  length: TripLength;
  firstVisit: boolean;
  pace: Pace;
}

export interface BrochureCard {
  path: string;
  name: string;
  duration: string;
  price: string;
  departures: string[];
  moreDepartures: number;
  tier: string;
  destination: string;
  days: number;
  cities: string[];
  hasDepartures: boolean;
}
export type ScoringFields = Pick<
  BrochureCard,
  'days' | 'tier' | 'cities' | 'hasDepartures' | 'destination'
>;

export function tourDays(tour: Tour): number {
  return parseTourDurationDays(tour.duration);
}

export type GroupKey = 'about10' | 'about15' | 'over17' | 'stopover' | 'asia';

export function groupKeyFor(destination: string, tier: string, days: number): GroupKey {
  if (destination === 'japan' || destination === 'vietnam') return 'asia';
  if (tier === 'stopover') return 'stopover';
  if (days === 0) return 'about15';
  if (days <= 12) return 'about10';
  if (days <= 16) return 'about15';
  return 'over17';
}

export const GROUP_TITLES: Record<GroupKey, string> = {
  about10: 'About 10 days',
  about15: 'About 2 weeks',
  over17: '17 days or more',
  stopover: 'Short stopovers',
  asia: 'Japan and Vietnam',
};

const GROUP_ORDER: GroupKey[] = ['about10', 'about15', 'over17', 'stopover', 'asia'];

export function groupTours(
  tours: Tour[]
): Array<{ key: GroupKey; title: string; tours: Tour[] }> {
  const buckets = new Map<GroupKey, Tour[]>();
  for (const tour of tours) {
    const key = groupKeyFor(tour.destination, tour.tier, tourDays(tour));
    const list = buckets.get(key);
    if (list) list.push(tour);
    else buckets.set(key, [tour]);
  }
  const groups: Array<{ key: GroupKey; title: string; tours: Tour[] }> = [];
  for (const key of GROUP_ORDER) {
    const list = buckets.get(key);
    if (!list || list.length === 0) continue;
    const sorted = [...list].sort(
      (a, b) => tourDays(a) - tourDays(b) || a.name.localeCompare(b.name)
    );
    groups.push({ key, title: GROUP_TITLES[key], tours: sorted });
  }
  return groups;
}

// Length comes first: a guest who asked for about 10 days must not be offered a 16-day tour ahead of a 10-day one
// because of a tier or pace bonus. Each day off costs 8, so 2 days off already outweighs the biggest bonus (15).
const LENGTH_FIT = 80;
const PER_DAY_OFF = 8;

export function scoreFields(answers: PickerAnswers, f: ScoringFields): number {
  if (f.destination !== 'china' || f.tier === 'stopover' || !f.hasDepartures) return 0;

  let score = 0;

  if (answers.length === '17') {
    score += f.days >= 17 ? LENGTH_FIT : Math.max(0, LENGTH_FIT - PER_DAY_OFF * (17 - f.days));
  } else {
    const target = answers.length === '10' ? 10 : 15;
    score += Math.max(0, LENGTH_FIT - PER_DAY_OFF * Math.abs(f.days - target));
  }

  if (answers.firstVisit === true) {
    if (f.tier === 'discovery') score += 15;
    const core = ['Beijing', "Xi'an", 'Shanghai'];
    const hits = core.filter((c) => f.cities.includes(c)).length;
    if (hits >= 2) score += 10;
  } else {
    if (f.tier === 'signature') score += 15;
  }

  const ratio = f.cities.length / Math.max(f.days, 1);
  if (answers.pace === 'easy') {
    if (ratio <= 0.4) score += 10;
  } else {
    if (ratio > 0.4) score += 10;
  }

  return score + 1;
}

export function scoreTour(answers: PickerAnswers, tour: Tour, today: string): number {
  return scoreFields(answers, {
    days: tourDays(tour),
    tier: tour.tier,
    cities: tourCities(tour),
    hasDepartures: departures(tour, today).length > 0,
    destination: tour.destination,
  });
}

function topTwo<T>(
  items: T[],
  score: (item: T) => number,
  name: (item: T) => string,
  key: (item: T) => string
): T[] {
  const scored = items
    .map((item) => ({ item, score: score(item) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || name(a.item).localeCompare(name(b.item)));
  const seen = new Set<string>();
  const out: T[] = [];
  for (const { item } of scored) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
    if (out.length >= 2) break;
  }
  return out;
}

export function recommend(answers: PickerAnswers, tours: Tour[], today: string): Tour[] {
  return topTwo(
    tours,
    (t) => scoreTour(answers, t, today),
    (t) => t.name,
    (t) => `${t.tier}-${t.slug}`
  );
}

export function recommendCards(answers: PickerAnswers, cards: BrochureCard[]): BrochureCard[] {
  return topTwo(
    cards,
    (c) => scoreFields(answers, c),
    (c) => c.name,
    (c) => c.path
  );
}

export function toBrochureCard(tour: Tour, today: string): BrochureCard {
  const deps = departures(tour, today).map((d) => d.label);
  return {
    path: tourUrl(tour),
    name: tour.name,
    duration: tour.duration,
    price: headlinePrice(tour.price),
    departures: deps.slice(0, 4),
    moreDepartures: Math.max(0, deps.length - 4),
    tier: tour.tier,
    destination: tour.destination,
    days: tourDays(tour),
    cities: tourCities(tour),
    hasDepartures: deps.length > 0,
  };
}
