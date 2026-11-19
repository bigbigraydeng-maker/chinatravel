import {
  bestSavingPerPerson,
  BF_TOURS,
  eligibleDepartures,
  isOfferOpen,
  isOfferOver,
  parseDepartureLabel,
  BF_AFTER_OFFER_REDIRECT,
  FRIENDS_SAVING,
  FAMILY_SAVING,
} from '../black-friday-2026';

/**
 * These numbers are printed on Facebook posts, ads and the landing page. If any of them changes here without the
 * creative changing too, customers see one price in the ad and another on the page — so the agreed amounts are
 * pinned explicitly rather than derived.
 */
describe('Black Friday 2026 offer amounts (agreed 2026-11-16/17)', () => {
  it('Signature: 200/300/400/500 per person for friends, 500 for families', () => {
    expect(FRIENDS_SAVING.signature).toEqual([200, 300, 400, 500]);
    expect(FAMILY_SAVING.signature).toBe(500);
  });

  it('Discovery: 100/150/200/250 per person for friends, 200 for families', () => {
    expect(FRIENDS_SAVING.discovery).toEqual([100, 150, 200, 250]);
    expect(FAMILY_SAVING.discovery).toBe(200);
  });

  it('headline claims hold: couple NZ$600 (Signature) / NZ$300 (Discovery), four friends up to NZ$2,000', () => {
    expect(bestSavingPerPerson('signature', 2, false) * 2).toBe(600);
    expect(bestSavingPerPerson('discovery', 2, false) * 2).toBe(300);
    expect(bestSavingPerPerson('signature', 4, false) * 4).toBe(2000);
  });
});

describe('bestSavingPerPerson — one offer per booking, the higher one', () => {
  it('a couple on Signature gets the 2-person friends 300 each (600 total), same as two friends', () => {
    expect(bestSavingPerPerson('signature', 2, false)).toBe(300);
  });

  it('a family of three on Signature gets the family 500, not the 3-person friends 400', () => {
    expect(bestSavingPerPerson('signature', 3, true)).toBe(500);
  });

  it('four friends on Discovery beat the family rate (250 > 200)', () => {
    expect(bestSavingPerPerson('discovery', 4, false)).toBe(250);
    expect(bestSavingPerPerson('discovery', 4, true)).toBe(250);
  });

  it('5 or more people use the 4-person rate; 0 people is treated as 1', () => {
    expect(bestSavingPerPerson('signature', 7, false)).toBe(500);
    expect(bestSavingPerPerson('signature', 0, false)).toBe(200);
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
