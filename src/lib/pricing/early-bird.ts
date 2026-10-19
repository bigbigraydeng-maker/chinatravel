/**
 * Early Bird promotion — pure pricing helpers.
 *
 * CTS Tours runs an Early Bird promotion: anyone who books by 30 November 2026
 * gets NZD 200 off per person on a Discovery tour and NZD 500 off per person on
 * a Signature tour. It only applies to departures in 2027 on China tours.
 *
 * First cut: only these four tours (slugs):
 *   - essentials            (Best of China)
 *   - beijing-xian          (A Tale of Two Cities)
 *   - shanghai-surroundings (Shanghai & Surroundings)
 *   - landscapes            (Natural China)
 *
 * The website shows ONLY the early bird price plus a small label; it never
 * shows the regular price next to it, no strike-through, no "save", no
 * countdown. After the deadline the site must go back to regular prices on its
 * own, so everything here is a pure function of (tour, departure, today).
 *
 * The early bird price is ALWAYS worked out as the departure's regular price
 * minus the discount; it is never stored separately.
 */

import type { Tour } from '@/lib/data/tours';
import { aucklandToday, priceNumber } from '@/lib/tour-discovery';
import { parseDepartureDate } from '@/lib/data/tour-dates';

/** Last Auckland calendar day the early bird price can be booked. */
export const EARLY_BIRD_BOOK_BY_DATE = '2026-11-30';

/** Human-readable form of {@link EARLY_BIRD_BOOK_BY_DATE}. */
export const EARLY_BIRD_BOOK_BY_LABEL = '30 November 2026';

/** The small label shown next to the early bird price. */
export const EARLY_BIRD_LABEL = `Early bird price · book by ${EARLY_BIRD_BOOK_BY_LABEL}`;

/** Only departures in this calendar year qualify. */
export const EARLY_BIRD_DEPARTURE_YEAR = 2027;

/** Per-person discount, in NZD, by tour tier. */
export const EARLY_BIRD_AMOUNT_OFF = { discovery: 200, signature: 500 } as const;

/** The first-cut set of tours the promotion covers. */
export const EARLY_BIRD_TOUR_SLUGS: readonly string[] = [
  'essentials',
  'beijing-xian',
  'shanghai-surroundings',
  'landscapes',
];

/** A computed early bird price for a single departure. */
export interface EarlyBirdPrice {
  /** Site format, e.g. 'NZD $3,880'. */
  price: string;
  /** Numeric amount, e.g. 3880. */
  amount: number;
  /** The regular price it was worked out from; never shown to visitors. */
  regularAmount: number;
  /** 200 or 500. */
  amountOff: number;
  /** {@link EARLY_BIRD_BOOK_BY_DATE}. */
  bookByDate: string;
  /** {@link EARLY_BIRD_LABEL}. */
  label: string;
}

/** Formats an NZD amount the way the site writes prices, e.g. 3880 -> 'NZD $3,880'. */
export function formatNzd(amount: number): string {
  return 'NZD $' + amount.toLocaleString('en-NZ');
}

/** True while today is on or before the book-by date (plain YYYY-MM-DD comparison). */
export function isEarlyBirdOpen(today: string = aucklandToday()): boolean {
  return today <= EARLY_BIRD_BOOK_BY_DATE;
}

/**
 * Computes the early bird price for a single departure, or null when the
 * promotion does not apply. Never falls back to the tour's headline price.
 */
export function earlyBirdForDeparture(
  tour: Tour,
  departureLabel: string,
  today: string = aucklandToday(),
): EarlyBirdPrice | null {
  if (!isEarlyBirdOpen(today)) return null;
  if (!tour.isActive || tour.soldOut) return null;
  if (tour.destination !== 'china') return null;
  if (tour.tier !== 'discovery' && tour.tier !== 'signature') return null;
  if (!EARLY_BIRD_TOUR_SLUGS.includes(tour.slug)) return null;
  if (!tour.departureDates || !tour.departureDates.includes(departureLabel)) return null;

  const parsed = parseDepartureDate(departureLabel);
  if (!parsed) return null;
  if (parsed.getUTCFullYear() !== EARLY_BIRD_DEPARTURE_YEAR) return null;
  if (parsed.toISOString().slice(0, 10) < today) return null;

  const ownPrice = tour.departurePricing?.[departureLabel];
  if (!ownPrice) return null;
  const regularAmount = priceNumber(ownPrice);
  if (regularAmount === null) return null;

  const amountOff = EARLY_BIRD_AMOUNT_OFF[tour.tier];
  const amount = regularAmount - amountOff;
  if (amount <= 0) return null;

  return {
    price: formatNzd(amount),
    amount,
    regularAmount,
    amountOff,
    bookByDate: EARLY_BIRD_BOOK_BY_DATE,
    label: EARLY_BIRD_LABEL,
  };
}

/** Every departure of the tour that qualifies for the early bird price, keyed by label. */
export function earlyBirdPrices(
  tour: Tour,
  today: string = aucklandToday(),
): Record<string, EarlyBirdPrice> {
  const result: Record<string, EarlyBirdPrice> = {};
  for (const label of tour.departureDates ?? []) {
    const price = earlyBirdForDeparture(tour, label, today);
    if (price) result[label] = price;
  }
  return result;
}

/** The lowest early bird price (the "From" price), or null when there are none. */
export function earlyBirdLead(prices: Record<string, EarlyBirdPrice>): EarlyBirdPrice | null {
  let lead: EarlyBirdPrice | null = null;
  for (const price of Object.values(prices)) {
    if (!lead || price.amount < lead.amount) lead = price;
  }
  return lead;
}
