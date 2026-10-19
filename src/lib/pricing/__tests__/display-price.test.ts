/**
 * WHY — every sentence that quotes a tour price must follow the price the page
 * shows: early bird while the promotion is open, the regular price from
 * 1 December 2026, without anybody editing text.
 */

import { getTourBySlug, type Tour } from '@/lib/data/tours';
import { earlyBirdLead, earlyBirdPrices } from '@/lib/pricing/early-bird';
import {
  displayedDeparturePrice,
  headlineWithEarlyBird,
  pricePlaceholders,
  resolvePriceText,
} from '@/lib/pricing/display-price';

const tour = (tier: 'discovery' | 'signature', slug: string): Tour => {
  const found = getTourBySlug('china', tier, slug);
  if (!found) throw new Error(`missing tour ${slug}`);
  return found;
};

const during = '2026-10-21';
const after = '2026-12-01';

describe('display-price', () => {
  test('swaps the amount in a headline price and keeps its wording', () => {
    const lead = (t: Tour) => earlyBirdLead(earlyBirdPrices(t, during));
    expect(headlineWithEarlyBird('From NZD $4,080 per person', lead(tour('discovery', 'essentials')))).toBe(
      'From NZD $3,880 per person',
    );
    expect(headlineWithEarlyBird('NZD $7,349', lead(tour('signature', 'landscapes')))).toBe('NZD $6,849');
    expect(headlineWithEarlyBird('From NZD $3,480', lead(tour('discovery', 'beijing-xian')))).toBe(
      'From NZD $3,280',
    );
    expect(headlineWithEarlyBird('From NZD $4,080 per person', null)).toBe('From NZD $4,080 per person');
    expect(headlineWithEarlyBird('Price on request', lead(tour('discovery', 'essentials')))).toBe('NZD $3,880');
  });

  test('shows the early bird price for a departure while it applies, otherwise the regular price', () => {
    const t = tour('discovery', 'beijing-xian');
    expect(displayedDeparturePrice(t, '18 March 2027', earlyBirdPrices(t, during))).toBe('NZD $3,280');
    expect(displayedDeparturePrice(t, '18 March 2027', earlyBirdPrices(t, after))).toBe('NZD $3,480');
    expect(displayedDeparturePrice(t, '1 January 2030', {})).toBeNull();
  });

  test('resolves price placeholders to early bird prices while the promotion is open', () => {
    const t = tour('discovery', 'beijing-xian');
    const text = 'at {{price:18 March 2027}} and at {{price:10 June 2027}}, from {{from}}.{{eb}} Done.';
    expect(resolvePriceText(text, t, { today: during })).toBe(
      'at NZD $3,280 and at NZD $3,480, from NZD $3,280. Early bird prices are available until 30 November 2026. Done.',
    );
  });

  test('goes back to the regular prices on its own after the deadline', () => {
    const t = tour('discovery', 'beijing-xian');
    const text = 'at {{price:18 March 2027}} and at {{price:10 June 2027}}, from {{from}}.{{eb}} Done.';
    expect(resolvePriceText(text, t, { today: after })).toBe(
      'at NZD $3,480 and at NZD $3,680, from NZD $3,480. Done.',
    );
    expect(resolvePriceText(text, t, { today: '2026-11-30' })).toBe(
      'at NZD $3,280 and at NZD $3,480, from NZD $3,280. Early bird prices are available until 30 November 2026. Done.',
    );
    expect(resolvePriceText(text, t, { today: '2026-12-01' })).toBe(
      'at NZD $3,480 and at NZD $3,680, from NZD $3,480. Done.',
    );
  });

  test('resolves to regular prices for data feeds when earlyBird is false', () => {
    const t = tour('discovery', 'beijing-xian');
    const text = 'at {{price:18 March 2027}} and at {{price:10 June 2027}}, from {{from}}.{{eb}} Done.';
    expect(resolvePriceText(text, t, { today: during, earlyBird: false })).toBe(
      resolvePriceText(text, t, { today: after }),
    );
  });

  test('{{from}} skips departures that have already left', () => {
    const base = tour('discovery', 'essentials');
    const custom: Tour = {
      ...base,
      departureDates: ['11 March 2027', '13 May 2027'],
      departurePricing: {
        '11 March 2027': 'NZD $4,080',
        '13 May 2027': 'NZD $4,500',
      },
    };
    expect(resolvePriceText('{{from}}', custom, { today: '2027-04-01' })).toBe('NZD $4,500');
    expect(resolvePriceText('{{from}}', custom, { today: '2027-02-01' })).toBe('NZD $4,080');
  });

  test('fails loudly on a placeholder it does not know', () => {
    expect(() => resolvePriceText('{{nope}}', tour('discovery', 'essentials'), { today: during })).toThrow(
      /Unknown price placeholder/,
    );
    expect(() =>
      resolvePriceText('{{price:1 January 2030}}', tour('discovery', 'essentials'), { today: during }),
    ).toThrow(/Unknown departure/);
  });

  test('lists the placeholders in a text', () => {
    expect(pricePlaceholders('a {{ from }} b {{price:11 March 2027}} c {{eb}}')).toEqual([
      'from',
      'price:11 March 2027',
      'eb',
    ]);
    expect(pricePlaceholders('no placeholders here')).toEqual([]);
  });

  test('text without placeholders is returned unchanged', () => {
    expect(resolvePriceText('A private room adds NZD $800.', tour('discovery', 'essentials'), { today: during })).toBe(
      'A private room adds NZD $800.',
    );
  });
});
