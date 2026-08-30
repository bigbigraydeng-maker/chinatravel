/**
 * Upcoming departures — price qualifiers and links.
 *
 * This block used to be a five-column table whose header row said "From" above
 * the price column. When it became a rail of cards, that header had nowhere to
 * go and was dropped, which left four of the six live cards showing a bare
 * amount directly beneath a specific date — reading as a fixed total for that
 * departure rather than a starting price.
 *
 * The correction is not "always say From". `departurePricing[date]` is a quote
 * for that exact departure; hedging it with "From" understates a commitment CTS
 * has actually made. So the qualifier has to track where the number came from,
 * and that is what these tests pin.
 *
 * Prices in tours.ts are free text and inconsistent — 'NZD $8,150',
 * 'From NZD $3,480', 'From NZD $4,080 per person' all exist — so the fixture
 * below deliberately contains one of each shape rather than a tidy invented set.
 */

import { render, within } from '@testing-library/react';
import UpcomingDepartures from '@/components/UpcomingDepartures';

// Fixed "today" so the component's next-occurrence date inference is stable.
const NOW = new Date(2026, 0, 15);

jest.mock('@/lib/data/tours', () => ({
  getAllActiveTours: () => [
    {
      // Headline price with no qualifier at all — the shape that read as a
      // fixed total once the table header was gone.
      slug: 'natural-china',
      name: 'China Signature — Natural China',
      destination: 'china',
      tier: 'signature',
      duration: '16 Days',
      price: 'NZD $8,150',
      departureDates: ['3 September 2026'],
    },
    {
      // Headline price that already says From and per person. Nothing may be
      // printed twice.
      slug: 'essentials',
      name: 'Best of China',
      destination: 'china',
      tier: 'discovery',
      duration: '13 Days',
      price: 'From NZD $4,080 per person',
      departureDates: ['11 March 2027'],
    },
    {
      // A quote for this exact date. Must NOT be hedged with From, even though
      // the tour's own headline price is a from-price.
      slug: 'legacy-of-china',
      name: 'China Signature — Legacy of China',
      destination: 'china',
      tier: 'signature',
      duration: '17 Days',
      price: 'From NZD $9,999',
      departureDates: ['15 October 2026'],
      departurePricing: { '15 October 2026': 'NZD $9,499' },
    },
  ],
}));

describe('UpcomingDepartures', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(NOW.getTime());
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  // Scoped to the rail's snap children. A plain a[href^="/tours/"] also picks
  // up the section's "See all tours & departures" link, which is not a card.
  function cards() {
    const { container } = render(<UpcomingDepartures />);
    return Array.from(container.querySelectorAll('a.snap-start'));
  }

  it('links every card at the canonical tour URL', () => {
    // URL structure is a hard project constraint; the rail rebuilt these links
    // by hand from the same fields the table used.
    const hrefs = cards().map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([
      '/tours/china/signature/natural-china',
      '/tours/china/signature/legacy-of-china',
      '/tours/china/discovery/essentials',
    ]);
  });

  it('orders departures by date, soonest first', () => {
    // Sep 2026, Oct 2026, Mar 2027 — proves the sort survived the rewrite and
    // that the rail is not just rendering catalogue order.
    const names = cards().map((a) => a.textContent ?? '');
    expect(names[0]).toContain('Natural China');
    expect(names[1]).toContain('Legacy of China');
    expect(names[2]).toContain('Best of China');
  });

  it('marks a headline price as a starting price', () => {
    const card = cards()[0];
    expect(within(card as HTMLElement).getByText('From')).toBeInTheDocument();
    expect(card.textContent).toContain('NZD $8,150');
  });

  it('does not hedge a price quoted for that exact departure', () => {
    // legacy-of-china has departurePricing for 15 Oct. The number shown is the
    // departure-specific 9,499, not the tour's 9,999, and it carries no "From".
    const card = cards()[1];
    expect(card.textContent).toContain('NZD $9,499');
    expect(card.textContent).not.toContain('NZD $9,999');
    expect(within(card as HTMLElement).queryByText('From')).toBeNull();
  });

  it('never prints a qualifier twice', () => {
    // 'From NZD $4,080 per person' rendered inside a card that supplies its own
    // "From" label is how the homepage Spotlight card currently reads
    // "From / From NZD $4,080 per person pp" in production.
    const text = cards()[2].textContent ?? '';
    expect(text).not.toMatch(/From\s*From/);
    expect(text).not.toMatch(/per person\s*pp/i);
    expect(text).toContain('NZD $4,080');
  });

  it('only claims per person where the source data says so', () => {
    // The catalogue has bare prices. Asserting "pp" on those would put a
    // commercial qualifier on screen that nobody at CTS wrote.
    //
    // Matched as an element rather than with a \bpp\b regex over textContent:
    // the qualifier sits in its own span with margin, so the concatenated text
    // reads "NZD $4,080ppView" and word boundaries never fire.
    expect(within(cards()[0] as HTMLElement).queryByText('pp')).toBeNull();
    expect(within(cards()[2] as HTMLElement).getByText('pp')).toBeInTheDocument();
  });
});
