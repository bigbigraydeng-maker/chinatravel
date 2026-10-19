/**
 * WHY — the early bird price must be exactly the departure's regular price
 * minus the discount, only for the tours and departures the promotion covers,
 * and it must switch itself off at midnight Auckland time after 30 November
 * 2026 so nobody has to remember to revert prices.
 */

import { aucklandToday } from '@/lib/tour-discovery';
import { getTourBySlug, tours, type Tour } from '@/lib/data/tours';
import { priceNumber } from '@/lib/tour-discovery';
import {
  EARLY_BIRD_LAST_DATE,
  EARLY_BIRD_LABEL,
  earlyBirdForDeparture,
  earlyBirdLead,
  earlyBirdPrices,
  formatNzd,
  isEarlyBirdOpen,
} from '@/lib/pricing/early-bird';

const tour = (tier: 'discovery' | 'signature', slug: string): Tour => {
  const found = getTourBySlug('china', tier, slug);
  if (!found) throw new Error(`missing tour ${slug}`);
  return found;
};

const today = '2026-10-21';

describe('early bird pricing', () => {
  test('the window closes at the end of 30 November 2026, Auckland time', () => {
    expect(isEarlyBirdOpen('2026-10-20')).toBe(true);
    expect(isEarlyBirdOpen('2026-11-30')).toBe(true);
    expect(isEarlyBirdOpen('2026-12-01')).toBe(false);
    expect(isEarlyBirdOpen('2027-03-01')).toBe(false);

    // 23:59 on 30 November in Auckland (UTC+13 in November).
    expect(isEarlyBirdOpen(aucklandToday(new Date('2026-11-30T10:59:00Z')))).toBe(true);
    // 00:00 on 1 December in Auckland.
    expect(isEarlyBirdOpen(aucklandToday(new Date('2026-11-30T11:00:00Z')))).toBe(false);
  });

  test('works out the four March 2027 early bird prices from the regular price', () => {
    const essentials = earlyBirdForDeparture(tour('discovery', 'essentials'), '11 March 2027', today);
    expect(essentials).not.toBeNull();
    expect(essentials!.price).toBe('NZD $3,880');
    expect(essentials!.amountOff).toBe(200);
    expect(essentials!.regularAmount).toBe(4080);
    expect(essentials!.label).toBe('Early bird price · available until 30 November 2026');
    expect(essentials!.availableUntil).toBe('2026-11-30');

    const beijingXian = earlyBirdForDeparture(tour('discovery', 'beijing-xian'), '18 March 2027', today);
    expect(beijingXian).not.toBeNull();
    expect(beijingXian!.price).toBe('NZD $3,280');
    expect(beijingXian!.amountOff).toBe(200);
    expect(beijingXian!.regularAmount).toBe(3480);
    expect(beijingXian!.label).toBe('Early bird price · available until 30 November 2026');
    expect(beijingXian!.availableUntil).toBe('2026-11-30');

    const shanghai = earlyBirdForDeparture(tour('discovery', 'shanghai-surroundings'), '25 March 2027', today);
    expect(shanghai).not.toBeNull();
    expect(shanghai!.price).toBe('NZD $2,499');
    expect(shanghai!.amountOff).toBe(200);
    expect(shanghai!.regularAmount).toBe(2699);
    expect(shanghai!.label).toBe('Early bird price · available until 30 November 2026');
    expect(shanghai!.availableUntil).toBe('2026-11-30');

    const landscapes = earlyBirdForDeparture(tour('signature', 'landscapes'), '26 March 2027', today);
    expect(landscapes).not.toBeNull();
    expect(landscapes!.price).toBe('NZD $6,849');
    expect(landscapes!.amountOff).toBe(500);
    expect(landscapes!.regularAmount).toBe(7349);
    expect(landscapes!.label).toBe('Early bird price · available until 30 November 2026');
    expect(landscapes!.availableUntil).toBe('2026-11-30');
  });

  test('covers all eight 2027 departures of the four tours with the same rule', () => {
    const amounts = (t: Tour) =>
      Object.fromEntries(
        Object.entries(earlyBirdPrices(t, today)).map(([label, p]) => [label, p.amount]),
      );

    expect(amounts(tour('discovery', 'essentials'))).toEqual({
      '11 March 2027': 3880,
      '13 May 2027': 3880,
    });
    expect(amounts(tour('discovery', 'beijing-xian'))).toEqual({
      '18 March 2027': 3280,
      '10 June 2027': 3480,
    });
    expect(amounts(tour('discovery', 'shanghai-surroundings'))).toEqual({
      '25 March 2027': 2499,
      '5 November 2027': 2699,
    });
    expect(amounts(tour('signature', 'landscapes'))).toEqual({
      '26 March 2027': 6849,
      '28 May 2027': 6849,
    });
  });

  test('never works from the headline price: a departure without its own price gets no early bird price', () => {
    const base = tour('discovery', 'essentials');
    const noOwnPrice: Tour = { ...base, departurePricing: {} };
    expect(earlyBirdForDeparture(noOwnPrice, '11 March 2027', today)).toBeNull();
    expect(earlyBirdPrices(noOwnPrice, today)).toEqual({});
  });

  test('stays inside the promotion rules, each rule on its own', () => {
    const base = tour('discovery', 'essentials');
    // Sanity: the untouched tour is eligible, so every null below comes from the one thing changed.
    expect(Object.keys(earlyBirdPrices(base, today))).toHaveLength(2);

    // Stopover tours are never eligible.
    expect(earlyBirdPrices({ ...base, tier: 'stopover' }, today)).toEqual({});
    // Japan and Vietnam are never eligible.
    expect(earlyBirdPrices({ ...base, destination: 'japan' }, today)).toEqual({});
    expect(earlyBirdPrices({ ...base, destination: 'vietnam' }, today)).toEqual({});
    // A China tour outside the first cut is never eligible, even though it has 2027 dates.
    expect(earlyBirdPrices({ ...base, slug: 'not-in-the-first-cut' }, today)).toEqual({});
    expect(earlyBirdPrices(tour('signature', 'silk-road'), today)).toEqual({});
    // A 2026 departure is never eligible.
    const y2026: Tour = {
      ...base,
      departureDates: ['3 November 2026'],
      departurePricing: { '3 November 2026': 'NZD $4,080' },
    };
    expect(earlyBirdPrices(y2026, today)).toEqual({});
    // Sold-out and inactive tours are never eligible.
    expect(earlyBirdPrices({ ...base, soldOut: true }, today)).toEqual({});
    expect(earlyBirdPrices({ ...base, isActive: false }, today)).toEqual({});

    // The real Stopover and Japan tours (not just synthetic copies) get nothing either.
    const stopover = getTourBySlug('china', 'stopover', 'beijing');
    const japan = getTourBySlug('japan', 'signature', 'ultimate');
    expect(stopover).toBeTruthy();
    expect(japan).toBeTruthy();
    expect(earlyBirdPrices(stopover as Tour, today)).toEqual({});
    expect(earlyBirdPrices(japan as Tour, today)).toEqual({});
  });

  test('a date that is not one of the tour departures gets no early bird price', () => {
    const base = tour('discovery', 'essentials');
    expect(earlyBirdForDeparture(base, '12 March 2027', today)).toBeNull();
    expect(earlyBirdForDeparture(base, 'not a date', today)).toBeNull();
    // Even a stray price entry for a date the tour does not run must not produce one.
    const stray: Tour = {
      ...base,
      departurePricing: { ...base.departurePricing, '12 March 2027': 'NZD $4,080' },
    };
    expect(earlyBirdForDeparture(stray, '12 March 2027', today)).toBeNull();
    expect(Object.keys(earlyBirdPrices(stray, today))).toEqual(['11 March 2027', '13 May 2027']);
  });

  test('every early bird price in the catalogue is the regular price minus 200 (Discovery) or 500 (Signature)', () => {
    let checked = 0;
    for (const t of tours) {
      const prices = earlyBirdPrices(t, today);
      for (const [label, p] of Object.entries(prices)) {
        expect(t.tier === 'discovery' || t.tier === 'signature').toBe(true);
        expect(t.destination).toBe('china');
        expect(label.endsWith('2027')).toBe(true);
        const regular = priceNumber(t.departurePricing![label]) as number;
        const expected = regular - (t.tier === 'discovery' ? 200 : 500);
        expect(p.amount).toBe(expected);
        checked += 1;
      }
    }
    expect(checked).toBeGreaterThanOrEqual(8);
  });

  test('after the deadline nothing in the catalogue has an early bird price', () => {
    for (const t of tours) {
      expect(earlyBirdPrices(t, '2026-12-01')).toEqual({});
    }
  });

  test('the lead price is the lowest early bird price', () => {
    expect(earlyBirdLead(earlyBirdPrices(tour('discovery', 'beijing-xian'), today))?.amount).toBe(3280);
    expect(earlyBirdLead(earlyBirdPrices(tour('signature', 'landscapes'), today))?.amount).toBe(6849);
    expect(earlyBirdLead({})).toBeNull();
  });

  test('formats prices the way the site writes them', () => {
    expect(formatNzd(3880)).toBe('NZD $3,880');
    expect(formatNzd(2499)).toBe('NZD $2,499');
    expect(formatNzd(10499)).toBe('NZD $10,499');
  });

  test('the wording is exactly the agreed label and has no countdown or saving language', () => {
    expect(EARLY_BIRD_LABEL).toBe('Early bird price · available until 30 November 2026');
    expect(EARLY_BIRD_LABEL).not.toMatch(
      /save|off\b|only|last chance|hurry|limited|left|remaining|countdown|days? to go|was\b|from\b|book by|deadline|closes/i,
    );
    // Sanity: the book-by date constant is the one the label references.
    expect(EARLY_BIRD_LAST_DATE).toBe('2026-11-30');
  });
});
