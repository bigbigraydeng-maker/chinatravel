/**
 * Black Friday 2026 offer (CTS, agreed by the PM on 2026-11-16/17).
 *
 * One offer (PM 2026-11-19, after CTS feedback): the more people on one booking, the more each saves. There is no
 * separate family or couple offer any more: a couple is two people, a family of three is three people, and so on.
 *
 * All 2027 departures of the tours below take part, March included (PM 2026-11-18).
 * Best of China and Shanghai & Surroundings are not in the offer at all, for any departure (PM 2026-11-19). Prices, durations and dates are NOT stored here — the page reads
 * them from the published tour catalogue so they can never drift from the tour pages.
 */

export type OfferTier = 'signature' | 'discovery';

export const BF_OFFER_START = '2026-11-17';
export const BF_OFFER_END = '2026-12-04';
export const BF_DEPOSIT_PER_PERSON_NZD = 1000;

/** Per-person saving (NZD) by number of people on the booking: index 0 = 1 person … index 3 = 4 people (the offer is for up to 4 people per booking, PM 2026-11-19). */
export const FRIENDS_SAVING: Record<OfferTier, readonly [number, number, number, number]> = {
  signature: [200, 300, 400, 500],
  discovery: [100, 150, 200, 250],
};


export interface BlackFridayTourRef {
  destination: 'china';
  tier: OfferTier;
  slug: string;
}

/** Order is the display order on the landing page (Signature first, then Discovery). */
export const BF_TOURS: readonly BlackFridayTourRef[] = [
  { destination: 'china', tier: 'signature', slug: 'grand-tour' },
  { destination: 'china', tier: 'signature', slug: 'imperial-heritage' },
  { destination: 'china', tier: 'signature', slug: 'silk-road' },
  { destination: 'china', tier: 'signature', slug: 'landscapes' },
  { destination: 'china', tier: 'discovery', slug: 'beijing-xian' },
  { destination: 'china', tier: 'discovery', slug: 'china-unveiled' },
];

/** First departure date that takes part in the offer (inclusive): any 2027 departure. */
const FIRST_ELIGIBLE_DEPARTURE = Date.UTC(2027, 0, 1); // 1 Jan 2027

/** Departures left out of the offer, by tour slug (exact departure labels as in the tour catalogue). */
const EXCLUDED_DEPARTURES: Readonly<Record<string, readonly string[]>> = {
};

/**
 * Parses a departure label such as "13 May 2027". Returns null for anything without a day, month and year,
 * so an unparseable label is left out rather than shown as eligible.
 */
export function parseDepartureLabel(label: string): number | null {
  const m = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(label.trim());
  if (!m) return null;
  const month = MONTHS.indexOf(m[2].slice(0, 3).toLowerCase());
  if (month < 0) return null;
  return Date.UTC(Number(m[3]), month, Number(m[1]));
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** Departures in the offer: any 2027 departure, minus the ones listed for this tour in EXCLUDED_DEPARTURES. */
export function eligibleDepartures(labels: readonly string[] | undefined, slug?: string): string[] {
  const excluded = slug ? EXCLUDED_DEPARTURES[slug] ?? [] : [];
  return (labels ?? []).filter((label) => {
    if (excluded.includes(label.trim())) return false;
    const t = parseDepartureLabel(label);
    return t !== null && t >= FIRST_ELIGIBLE_DEPARTURE;
  });
}

/**
 * The per-person saving for one booking, by tour tier and number of people on the booking.
 * `people` below 1 is treated as 1; 4 or more uses the 4-person rate.
 */
export function bestSavingPerPerson(tier: OfferTier, people: number): number {
  const idx = Math.min(Math.max(Math.floor(people), 1), 4) - 1;
  return FRIENDS_SAVING[tier][idx];
}

/**
 * Whether the offer is open at `now`, judged in New Zealand time: 17 November 2026 00:00 NZDT
 * to the end of 4 December 2026 NZDT (UTC+13).
 */
export function isOfferOpen(now: Date): boolean {
  const t = now.getTime();
  return t >= OFFER_START_UTC && t < OFFER_END_UTC;
}

/**
 * True from 5 December 2026 00:00 NZDT. The landing page then sends visitors to the China tours hub so nobody
 * reads Black Friday savings that no longer apply (the terms page stays up for customers who already booked).
 */
export function isOfferOver(now: Date): boolean {
  return now.getTime() >= OFFER_END_UTC;
}

/** Where the landing page sends visitors once the offer is over. */
export const BF_AFTER_OFFER_REDIRECT = '/china-tours';

const OFFER_START_UTC = Date.UTC(2026, 10, 16, 11, 0, 0); // 17 Nov 2026 00:00 NZDT
const OFFER_END_UTC = Date.UTC(2026, 11, 4, 11, 0, 0); // 5 Dec 2026 00:00 NZDT
