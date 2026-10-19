/**
 * Display-price helpers — the single place that turns price placeholders in
 * tour text into the price the page actually shows.
 *
 * While the early bird promotion is open the placeholders resolve to the early
 * bird price; from 1 December 2026 they resolve to the regular price on their
 * own, with no text edits. Pure functions only, no React.
 */

import type { Tour } from '@/lib/data/tours';
import { aucklandToday, priceNumber } from '@/lib/tour-discovery';
import { parseDepartureDate } from '@/lib/data/tour-dates';
import { EARLY_BIRD_LAST_DATE_LABEL, earlyBirdPrices, type EarlyBirdPrice } from '@/lib/pricing/early-bird';

/** Matches an NZD amount such as 'NZD $4,080' or 'NZD $3,880.50'. */
const NZD_AMOUNT = /NZD\s*\$[\d,]+(?:\.\d+)?/;

/** Matches a price placeholder such as '{{from}}' or '{{ price:11 March 2027 }}'. */
const PLACEHOLDER = /\{\{\s*([^{}]*?)\s*\}\}/g;

/**
 * Replaces the first NZD amount in a headline with the early bird lead price,
 * keeping the surrounding wording ('From ', ' per person'). When there is no
 * lead price the headline is returned unchanged; when the headline has no
 * amount at all the lead price is returned on its own.
 */
export function headlineWithEarlyBird(headline: string, lead: EarlyBirdPrice | null): string {
  if (!lead) return headline;
  if (!NZD_AMOUNT.test(headline)) return lead.price;
  return headline.replace(NZD_AMOUNT, lead.price);
}

/**
 * The price to show for a single departure: the early bird price when one
 * applies, otherwise the departure's regular price, otherwise null.
 */
export function displayedDeparturePrice(
  tour: Tour,
  departureLabel: string,
  earlyBird: Record<string, EarlyBirdPrice>,
): string | null {
  return earlyBird[departureLabel]?.price ?? tour.departurePricing?.[departureLabel] ?? null;
}

/** Options for {@link resolvePriceText}. */
export interface ResolvePriceOptions {
  /** Auckland date as 'YYYY-MM-DD'; defaults to today. */
  today?: string;
  /** false = regular prices only (used for data feeds). */
  earlyBird?: boolean;
}

/**
 * Resolves every price placeholder in a piece of tour text to the price the
 * page should show. Unknown placeholders and unknown departures throw.
 */
export function resolvePriceText(text: string, tour: Tour, options: ResolvePriceOptions = {}): string {
  const today = options.today ?? aucklandToday();
  const earlyBird = options.earlyBird === false ? {} : earlyBirdPrices(tour, today);

  return text.replace(PLACEHOLDER, (_match: string, rawInner: string): string => {
    const inner = rawInner.trim();

    if (inner.startsWith('price:')) {
      const label = inner.slice('price:'.length).trim();
      const price = displayedDeparturePrice(tour, label, earlyBird);
      if (price === null) {
        throw new Error(`Unknown departure in price placeholder "{{price:${label}}}" for tour ${tour.slug}`);
      }
      return price;
    }

    if (inner === 'from') {
      return lowestDisplayedPrice(tour, earlyBird, today);
    }

    if (inner === 'eb') {
      return Object.keys(earlyBird).length > 0
        ? ' Early bird prices are available until ' + EARLY_BIRD_LAST_DATE_LABEL + '.'
        : '';
    }

    throw new Error(`Unknown price placeholder "{{${inner}}}"`);
  });
}

/**
 * The lowest displayed price among future departures that have a regular
 * price; falls back to the lowest regular price among all departures with a
 * price. Throws when the tour has no price at all.
 */
function lowestDisplayedPrice(
  tour: Tour,
  earlyBird: Record<string, EarlyBirdPrice>,
  today: string,
): string {
  const labels = tour.departureDates ?? [];
  const pricing = tour.departurePricing ?? {};

  let futureLowest: { amount: number; price: string } | null = null;
  let anyLowest: { amount: number; price: string } | null = null;

  for (const label of labels) {
    const regular = pricing[label];
    if (!regular) continue;

    const displayed = displayedDeparturePrice(tour, label, earlyBird);
    if (displayed === null) continue;
    const amount = priceNumber(displayed);
    if (amount === null) continue;

    if (!anyLowest || amount < anyLowest.amount) {
      anyLowest = { amount, price: displayed };
    }

    const parsed = parseDepartureDate(label);
    if (!parsed) continue;
    if (parsed.toISOString().slice(0, 10) < today) continue;

    if (!futureLowest || amount < futureLowest.amount) {
      futureLowest = { amount, price: displayed };
    }
  }

  const chosen = futureLowest ?? anyLowest;
  if (!chosen) {
    throw new Error(`No price to resolve {{from}} for tour ${tour.slug}`);
  }
  return chosen.price;
}

/**
 * Every price placeholder in the text, as its trimmed inner text, in order
 * (e.g. ['from', 'price:11 March 2027', 'eb']); [] when there are none.
 */
export function pricePlaceholders(text: string): string[] {
  const result: string[] = [];
  const regex = new RegExp(PLACEHOLDER.source, 'g');
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    result.push(match[1].trim());
  }
  return result;
}
