/**
 * FlagshipTourGrid tests
 *
 * The flagship URLs are PM-confirmed contracts (roster set 2026-08-25):
 *   - Best of China    → /campaigns/best-of-china  (PM-confirmed campaign LP, NOT the generic tour detail page)
 *   - Golden China     → /tours/china/discovery/golden-china
 *   - Christmas & New Year (Auckland) → /tours/china/discovery/china-icons-collection
 *
 * Changing any of these breaks Meta / Google winner-ad landing flow. Test
 * pins the contract; do not relax without PM sign-off.
 *
 * The Christchurch/South Island Christmas departure is deliberately NOT in
 * this grid — it renders in its own SouthIslandDeparture section so the
 * South Island origin reads as a distinct offer. See that component's tests.
 */
import { render, screen } from '@testing-library/react';
import FlagshipTourGrid from '../FlagshipTourGrid';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props: any) => <img {...props} />,
}));

describe('FlagshipTourGrid', () => {
  it('renders the PM-confirmed flagship URLs', () => {
    render(<FlagshipTourGrid />);
    const links = screen
      .getAllByRole('link')
      .map((el) => el.getAttribute('href'))
      .filter(Boolean);

    expect(links).toEqual(
      expect.arrayContaining([
        '/campaigns/best-of-china',
        '/tours/china/discovery/golden-china',
        '/tours/china/discovery/china-icons-collection',
      ])
    );
  });

  it('does NOT surface the Christchurch departure here — it has its own section', () => {
    render(<FlagshipTourGrid />);
    const links = screen
      .getAllByRole('link')
      .map((el) => el.getAttribute('href'))
      .filter(Boolean);
    expect(links).not.toContain(
      '/tours/china/discovery/china-icons-collection-christchurch'
    );
  });

  it('renders three flagship cards', () => {
    render(<FlagshipTourGrid />);
    expect(
      screen.getByRole('heading', { name: /Flagship China itineraries/i })
    ).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(3);
  });

  it('surfaces the ribbon labels for ad creative continuity', () => {
    render(<FlagshipTourGrid />);
    expect(screen.getByText(/Most popular/i)).toBeInTheDocument();
    expect(screen.getByText(/November 2026/)).toBeInTheDocument();
    // "Christmas & New Year" appears both as the ribbon and inside the tour
    // name, so assert on the ribbon element specifically.
    expect(screen.getByText('Christmas & New Year')).toBeInTheDocument();
  });

  it('renders each card with duration + price text from the tour data', () => {
    render(<FlagshipTourGrid />);
    // Spot-check — proves the lookup against getAllChinaTours is wired up.
    expect(screen.getAllByText(/15 Days/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/12 Days/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/NZD/i).length).toBeGreaterThanOrEqual(3);
  });

  it('every price block shows an explicit "From" label so visitors read the price as a starting point, not a final cost', () => {
    render(<FlagshipTourGrid />);
    const labels = screen.getAllByText(/^From$/);
    expect(labels.length).toBeGreaterThanOrEqual(3);
  });

  it('strips "From " prefix and " per person" suffix from tour.price so each card displays a clean "NZD $X,XXX"', () => {
    render(<FlagshipTourGrid />);
    const text = document.body.textContent ?? '';
    // The raw tours.ts value for essentials is "From NZD $4,080 per person" —
    // it must surface as "NZD $4,080" (no leading "From", no trailing suffix).
    expect(text).toMatch(/NZD \$4,080/);
    expect(text).not.toMatch(/From NZD \$4,080 per person/);
    // Golden China's raw value is "From NZD $4,999 per person".
    expect(text).toMatch(/NZD \$4,999/);
    expect(text).not.toMatch(/From NZD \$4,999 per person/);
  });

  it('shows the sold-out November departure is gone — Best of China now chips March 2027', () => {
    render(<FlagshipTourGrid />);
    const bestOfChinaLink = screen
      .getAllByRole('link')
      .find((el) => el.getAttribute('href') === '/campaigns/best-of-china');
    expect(bestOfChinaLink).toBeTruthy();
    expect(bestOfChinaLink?.textContent).toMatch(/Next · Mar 2027/);
    expect(bestOfChinaLink?.textContent).not.toMatch(/Nov 2026/);
  });

  it('shows a "Next · {Mon YYYY}" chip on cards that have a scheduled departure', () => {
    render(<FlagshipTourGrid />);
    const chips = screen.getAllByText(/^Next · [A-Z][a-z]{2} \d{4}$/);
    expect(chips.length).toBeGreaterThanOrEqual(1);
  });

  // ─── limit prop (FB Leadform ThankYou → fewer cards, Hick's Law)
  it('respects the limit prop — renders 2 cards when limit=2', () => {
    render(<FlagshipTourGrid limit={2} />);
    const links = screen.getAllByRole('link');
    const cardLinks = links.filter((el) => {
      const href = el.getAttribute('href') ?? '';
      return href.startsWith('/tours/') || href.startsWith('/campaigns/');
    });
    expect(cardLinks).toHaveLength(2);
  });

  // ─── heading + intro overrides (thankyou-flavoured copy)
  it('renders the overridden heading + intro when provided', () => {
    render(
      <FlagshipTourGrid
        heading="Our most-requested China itineraries"
        intro="While you wait for our specialist to reach out…"
      />,
    );
    expect(
      screen.getByRole('heading', { name: /Our most-requested China itineraries/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/While you wait for our specialist to reach out/i)).toBeInTheDocument();
    // Default copy must not leak in.
    expect(screen.queryByText(/Flagship China itineraries/i)).toBeNull();
    expect(screen.queryByText(/our most-booked routes/i)).toBeNull();
  });
});
