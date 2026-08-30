import { parsePrice } from '@/lib/ui/price';

/**
 * These cases are the actual shapes present in src/lib/data/tours.ts, not
 * invented ones. If the catalogue grows a fourth shape, this file is where the
 * behaviour gets decided.
 *
 * Why it matters: a price is a commercial promise. Rendering "From" over a
 * departure-specific price understates certainty; rendering a bare amount next
 * to a fixed date overstates it. Callers can only get that right if the
 * qualifiers already baked into the string are separable from the number.
 */
describe('parsePrice', () => {
  it('leaves a bare amount alone and claims no qualifiers', () => {
    // Bare prices must NOT come back as per-person. Assuming it would put a
    // qualifier on screen that nobody at CTS wrote.
    expect(parsePrice('NZD $8,150')).toEqual({
      amount: 'NZD $8,150',
      from: false,
      perPerson: false,
    });
  });

  it('separates a leading From so a caller does not print it twice', () => {
    expect(parsePrice('From NZD $3,480')).toEqual({
      amount: 'NZD $3,480',
      from: true,
      perPerson: false,
    });
  });

  it('separates both qualifiers at once', () => {
    // This is the string behind the live "From / From NZD $4,080 per person pp"
    // defect on the homepage Spotlight card.
    expect(parsePrice('From NZD $4,080 per person')).toEqual({
      amount: 'NZD $4,080',
      from: true,
      perPerson: true,
    });
  });

  it('handles a trailing per person without a leading From', () => {
    expect(parsePrice('NZD $3,399 per person')).toEqual({
      amount: 'NZD $3,399',
      from: false,
      perPerson: true,
    });
  });

  it('treats the pp abbreviation as per person', () => {
    expect(parsePrice('NZD $2,999 pp')).toEqual({
      amount: 'NZD $2,999',
      from: false,
      perPerson: true,
    });
  });

  it('only strips From at the start, never mid-string', () => {
    // CTS quotes differ by departure city, so "NZD $2,999 from Christchurch" is
    // a shape this catalogue could plausibly grow. Without the ^ anchor the
    // helper would eat "from " out of the middle and report from:true, turning
    // a Christchurch price into a bare amount labelled as a starting price.
    //
    // An earlier version of this test used "fromage", which passed even with
    // the anchor removed — "from" there is not followed by whitespace, so it
    // never exercised the anchor at all.
    expect(parsePrice('NZD $2,999 from Christchurch')).toEqual({
      amount: 'NZD $2,999 from Christchurch',
      from: false,
      perPerson: false,
    });
  });

  it('survives empty and whitespace input rather than throwing', () => {
    expect(parsePrice('')).toEqual({ amount: '', from: false, perPerson: false });
    expect(parsePrice('   ')).toEqual({ amount: '', from: false, perPerson: false });
  });
});
