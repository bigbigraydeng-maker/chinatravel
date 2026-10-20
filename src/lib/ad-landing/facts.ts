/**
 * Why this file exists: the ad landing pages never type a price, a date or an
 * inclusion into a page config. Everything a visitor reads as a fact is read
 * from the tour data through these helpers, and every sentence a page config
 * writes is checked against the tour data and against a list of claims the
 * business has ruled out.
 */
import type { Tour } from '@/lib/data/tours';
import { aucklandToday } from '@/lib/tour-discovery';
import { getDepartureRows } from '@/components/tours/TourGoldenBlocks';

export interface HeroFacts {
  /** Price of the first upcoming priced departure, e.g. 'NZD $2,699'. */
  fromPrice: string | null;
  /** That departure's date label. */
  firstDeparture: string | null;
  /** That departure's return date. */
  firstReturn: string | null;
  /** The first inclusion that mentions airfares or flights, word for word. */
  airfareLine: string | null;
}

export function buildHeroFacts(tour: Tour, today: string = aucklandToday()): HeroFacts {
  const first = getDepartureRows(tour, today)[0];
  return {
    fromPrice: first ? first.price : null,
    firstDeparture: first ? first.label : null,
    firstReturn: first ? first.returnDate : null,
    airfareLine:
      tour.inclusions.find((item) => /\bair\s?fares?\b|\bflights?\b/i.test(item)) ?? null,
  };
}

/**
 * Copied word for word from the booking-terms block in
 * src/components/tours/TourGoldenBlocks.tsx, which summarises the published
 * Terms & Conditions; a test keeps the two in step.
 */
export const DEPOSIT_TEXT =
  'A non-refundable deposit of NZD $1,000 per person confirms your booking, payable within 3 working days of reserving. Your booking is not confirmed until we receive it.';

export type TourFaq = NonNullable<Tour['faqs']>[number];

export function selectFaqs(faqs: Tour['faqs'], patterns: readonly string[]): TourFaq[] {
  if (!faqs) return [];
  const picked: TourFaq[] = [];
  for (const pattern of patterns) {
    const needle = pattern.toLowerCase();
    const match = faqs.find(
      (faq) => !picked.includes(faq) && faq.question.toLowerCase().includes(needle),
    );
    if (match) picked.push(match);
  }
  return picked;
}

export function tourCorpus(tour: Tour): string {
  const parts: string[] = [tour.name, tour.shortDescription];
  for (const highlight of tour.highlights) parts.push(highlight);
  for (const day of tour.itinerary) {
    parts.push(day.title);
    parts.push(day.description);
  }
  for (const inclusion of tour.inclusions) parts.push(inclusion);
  for (const exclusion of tour.exclusions) parts.push(exclusion);
  for (const faq of tour.faqs ?? []) {
    parts.push(faq.question);
    parts.push(faq.answer);
  }
  return parts.join('\n');
}

export interface ForbiddenRule {
  pattern: RegExp;
  reason: string;
}

export const AD_COPY_FORBIDDEN: readonly ForbiddenRule[] = [
  { pattern: /small[\s-]*group/i, reason: 'group-size claim ("small group")' },
  { pattern: /\bmax(?:imum)?\b[\s.:]*(?:of\s+)?\d+/i, reason: 'group-size quota ("max N")' },
  {
    pattern:
      /\b(?:only|just|limited to|up to)\s+\d+\s+(?:guests|travellers|travelers|people|passengers|spots|seats|places|rooms)\b/i,
    reason: 'quota or scarcity claim',
  },
  { pattern: /\bwuzhen\b/i, reason: 'Wuzhen is not on this itinerary' },
  { pattern: /whats\s?app/i, reason: 'WhatsApp is not set up yet' },
  { pattern: /luggage|baggage/i, reason: 'no luggage wording without a published standard' },
  {
    pattern:
      /high[\s-]*speed|bullet train|all[\s-]*rail|by (?:high-speed )?rail|fast train/i,
    reason:
      'transport may only be described as "High-speed train and coach", next to the route map',
  },
  {
    pattern:
      /\bguarantee[ds]?\b|\bselling fast\b|\bhurry\b|\b(?:limited|few)\s+(?:spots|seats|places)\b|\blast chance\b/i,
    reason: 'unbacked guarantee or urgency claim',
  },
  { pattern: /\bsave\b/i, reason: 'discount claim ("save")' },
  { pattern: /\bbook\s+by\b/i, reason: 'booking-deadline claim ("Book by")' },
  { pattern: /\bearly[\s-]*bird\b/i, reason: 'early-bird claim' },
  { pattern: /\bcountdown\b/i, reason: 'countdown claim' },
  { pattern: /\b(?:weeks?|days?)\s+left\b/i, reason: 'time-left claim ("weeks left")' },
];

const ALLOWED_TRANSPORT = /high-speed train and coach/gi;

export function findForbiddenCopy(text: string): string[] {
  const cleaned = text.replace(ALLOWED_TRANSPORT, ' ');
  return AD_COPY_FORBIDDEN.filter((rule) => rule.pattern.test(cleaned)).map(
    (rule) => rule.reason,
  );
}
