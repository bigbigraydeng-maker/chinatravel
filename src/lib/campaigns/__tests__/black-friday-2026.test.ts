import {
  bestSavingPerPerson,
  BF_TOURS,
  eligibleDepartures,
  isOfferOpen,
  isOfferOver,
  parseDepartureLabel,
  BF_AFTER_OFFER_REDIRECT,
  FRIENDS_SAVING,
} from '../black-friday-2026';

/**
 * These numbers are printed on Facebook posts, ads and the landing page. If any of them changes here without the
 * creative changing too, customers see one price in the ad and another on the page — so the agreed amounts are
 * pinned explicitly rather than derived.
 */
describe('Black Friday 2026 offer amounts (one offer, PM 2026-11-19)', () => {
  it('Signature: 200/300/400/500 per person by people on the booking', () => {
    expect(FRIENDS_SAVING.signature).toEqual([200, 300, 400, 500]);
  });

  it('Discovery: 100/150/200/250 per person by people on the booking', () => {
    expect(FRIENDS_SAVING.discovery).toEqual([100, 150, 200, 250]);
  });

  it('headline claims hold: two people NZ$600 (Signature) / NZ$300 (Discovery), four people NZ$2,000', () => {
    expect(bestSavingPerPerson('signature', 2) * 2).toBe(600);
    expect(bestSavingPerPerson('discovery', 2) * 2).toBe(300);
    expect(bestSavingPerPerson('signature', 4) * 4).toBe(2000);
  });
});

describe('bestSavingPerPerson — depends only on the number of people', () => {
  it('a family of three on Signature saves the 3-person rate, NZ$400 each', () => {
    expect(bestSavingPerPerson('signature', 3)).toBe(400);
  });

  it('5 or more people use the 4-person rate; 0 people is treated as 1', () => {
    expect(bestSavingPerPerson('signature', 7)).toBe(500);
    expect(bestSavingPerPerson('signature', 0)).toBe(200);
  });
});

describe('eligibleDepartures — every 2027 departure of the tours in the sale', () => {
  it('keeps March 2027 departures of other tours and drops 2026 ones', () => {
    expect(eligibleDepartures(['15 October 2026', '18 March 2027', '10 June 2027'], 'beijing-xian')).toEqual([
      '18 March 2027',
      '10 June 2027',
    ]);
  });

  it('keeps March 2027 departures of tours in the sale', () => {
    expect(eligibleDepartures(['11 March 2027'], 'grand-tour')).toEqual(['11 March 2027']);
  });

  it('Best of China and Shanghai & Surroundings are not in the sale at all (PM 2026-11-19)', () => {
    const slugs = BF_TOURS.map((t) => t.slug);
    expect(slugs).not.toContain('essentials');
    expect(slugs).not.toContain('shanghai-beyond');
    expect(slugs).toHaveLength(6);
  });

  it('leaves out labels that are not a full date', () => {
    expect(eligibleDepartures(['TBC', 'May 2027', '1 May 2027'])).toEqual(['1 May 2027']);
  });
});

describe('isOfferOver — when the landing page stops showing savings', () => {
  it('is false on the last day (4 Dec NZDT) and true from 5 Dec 2026 00:00 NZDT', () => {
    expect(isOfferOver(new Date('2026-12-04T10:59:59Z'))).toBe(false);
    expect(isOfferOver(new Date('2026-12-04T11:00:00Z'))).toBe(true);
  });

  it('is false before the offer starts, so a preview before 17 Nov is not redirected away', () => {
    expect(isOfferOver(new Date('2026-11-10T00:00:00Z'))).toBe(false);
  });

  it('sends visitors to the China tours hub', () => {
    expect(BF_AFTER_OFFER_REDIRECT).toBe('/china-tours');
  });
});

describe('isOfferOpen — New Zealand time window', () => {
  it('opens at 00:00 on 17 Nov 2026 NZDT and closes after 4 Dec 2026 NZDT', () => {
    expect(isOfferOpen(new Date('2026-11-16T10:59:59Z'))).toBe(false);
    expect(isOfferOpen(new Date('2026-11-16T11:00:00Z'))).toBe(true);
    expect(isOfferOpen(new Date('2026-12-04T10:59:59Z'))).toBe(true);
    expect(isOfferOpen(new Date('2026-12-04T11:00:00Z'))).toBe(false);
  });
});

describe('BF26_HERO_VIDEO', () => {
  it('points at licensed files that are in public/ (never the watermarked comp)', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { existsSync } = require('fs') as typeof import('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { join } = require('path') as typeof import('path');
    const { BF26_HERO_VIDEO } = jest.requireActual('../black-friday-2026') as typeof import('../black-friday-2026');
    for (const p of [BF26_HERO_VIDEO.src, BF26_HERO_VIDEO.poster]) {
      expect(p).not.toMatch(/COMP|watermark/i);
      expect(existsSync(join(process.cwd(), 'public', p))).toBe(true);
    }
  });
});
