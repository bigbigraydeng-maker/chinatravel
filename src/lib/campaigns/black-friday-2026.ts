/**
 * Black Friday 2026 offer (CTS, agreed by the PM on 2026-11-16/17).
 *
 * Two offers, one per booking (the higher one applies, never both):
 * - "Travel with your Bestie or Mate": per-person saving grows with the number of people on the booking.
 * - "Family Travel": flat per-person saving; couples count as family.
 *
 * Only 2027 departures from May onward take part (the March 2027 departures never had early-bird pricing),
 * and Shanghai & Surroundings is excluded. Prices, durations and dates are NOT stored here — the page reads
 * them from the published tour catalogue so they can never drift from the tour pages.
 */

export type OfferTier = 'signature' | 'discovery';

export const BF_OFFER_START = '2026-11-17';
export const BF_OFFER_END = '2026-12-04';
export const BF_DEPOSIT_PER_PERSON_NZD = 1000;

/** Per-person saving (NZD) by number of people on the booking: index 0 = 1 person … index 3 = 4 or more. */
export const FRIENDS_SAVING: Record<OfferTier, readonly [number, number, number, number]> = {
  signature: [200, 300, 400, 500],
  discovery: [100, 150, 200, 250],
};

/** Per-person saving (NZD) for a family booking. */
export const FAMILY_SAVING: Record<OfferTier, number> = {
  signature: 500,
  discovery: 200,
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
  { destination: 'china', tier: 'discovery', slug: 'essentials' },
  { destination: 'china', tier: 'discovery', slug: 'beijing-xian' },
];

/** First departure date that takes part in the offer (inclusive). */
const FIRST_ELIGIBLE_DEPARTURE = Date.UTC(2027, 4, 1); // 1 May 2027

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

/** Departures in the offer: dated 1 May 2027 or later. */
export function eligibleDepartures(labels: readonly string[] | undefined): string[] {
  return (labels ?? []).filter((label) => {
    const t = parseDepartureLabel(label);
    return t !== null && t >= FIRST_ELIGIBLE_DEPARTURE;
  });
}

/**
 * The saving that applies to one booking: the higher of the friends and family offers (never both).
 * `people` below 1 is treated as 1; 4 or more uses the 4-person rate.
 */
export function bestSavingPerPerson(tier: OfferTier, people: number, isFamily: boolean): number {
  const idx = Math.min(Math.max(Math.floor(people), 1), 4) - 1;
  const friends = FRIENDS_SAVING[tier][idx];
  return isFamily ? Math.max(friends, FAMILY_SAVING[tier]) : friends;
}

/**
 * Whether the offer is open at `now`, judged in New Zealand time: 17 November 2026 00:00 NZDT
 * to the end of 4 December 2026 NZDT (UTC+13).
 */
export function isOfferOpen(now: Date): boolean {
  const start = Date.UTC(2026, 10, 16, 11, 0, 0); // 17 Nov 2026 00:00 NZDT
  const end = Date.UTC(2026, 11, 4, 11, 0, 0); // 5 Dec 2026 00:00 NZDT
  const t = now.getTime();
  return t >= start && t < end;
}
