/**
 * FlagshipTourGrid tests
 *
 * The 4 URLs are PM-confirmed contracts:
 *   - A Tale of Two Cities    → /tours/china/discovery/beijing-xian
 *   - Best of China           → /tours/china/discovery/essentials
 *   - Shanghai & Surroundings → /campaigns/october-2026/shanghai-surroundings
 *   - Silk Road               → /tours/china/signature/silk-road
 *
 * Changing any of these breaks Meta / Google winner-ad landing flow. Test
 * pins the contract; do not relax without PM sign-off.
 */
import { render, screen } from '@testing-library/react';
import FlagshipTourGrid from '../FlagshipTourGrid';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props: any) => <img {...props} />,
}));

describe('FlagshipTourGrid', () => {
  it('renders the four PM-confirmed flagship URLs', () => {
    render(<FlagshipTourGrid />);
    const links = screen
      .getAllByRole('link')
      .map((el) => el.getAttribute('href'))
      .filter(Boolean);

    expect(links).toEqual(
      expect.arrayContaining([
        '/tours/china/discovery/beijing-xian',
        '/tours/china/discovery/essentials',
        '/campaigns/october-2026/shanghai-surroundings',
        '/tours/china/signature/silk-road',
      ])
    );
  });

  it('renders four flagship cards', () => {
    render(<FlagshipTourGrid />);
    // Section title + 4 anchors
    expect(screen.getByRole('heading', { name: /Flagship China itineraries/i })).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(4);
  });

  it('surfaces the ribbon labels for ad creative continuity', () => {
    render(<FlagshipTourGrid />);
    expect(screen.getByText(/Beijing \+ Xi’an/)).toBeInTheDocument();
    expect(screen.getByText(/Most popular/i)).toBeInTheDocument();
    expect(screen.getByText(/October 2026/)).toBeInTheDocument();
    expect(screen.getByText(/Signature · 18 days/)).toBeInTheDocument();
  });

  it('renders each card with duration + price text from the tour data', () => {
    render(<FlagshipTourGrid />);
    // Spot-check two — proves the lookup against getAllChinaTours wired up.
    expect(screen.getAllByText(/10 Days/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/18 Days/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/NZD/i).length).toBeGreaterThanOrEqual(4);
  });

  it('every price block shows an explicit "From" label so visitors read the price as a starting point, not a final cost', () => {
    render(<FlagshipTourGrid />);
    const labels = screen.getAllByText(/^From$/);
    expect(labels.length).toBeGreaterThanOrEqual(4);
  });

  it('strips "From " prefix and " per person" suffix from tour.price so each card displays a clean "NZD $X,XXX"', () => {
    render(<FlagshipTourGrid />);
    const text = document.body.textContent ?? '';
    // The raw tours.ts value for essentials is "From NZD $3,880 per person" —
    // it must surface as "NZD $3,880" (no leading "From", no trailing suffix).
    expect(text).toMatch(/NZD \$3,880/);
    expect(text).not.toMatch(/From NZD \$3,880 per person/);
    // The raw value for shanghai-surroundings is "NZD $3,399 per person" —
    // also must drop the " per person" suffix.
    expect(text).toMatch(/NZD \$3,399/);
    expect(text).not.toMatch(/NZD \$3,399 per person/);
  });

  it('shows a "Next · {Mon YYYY}" chip on cards that have a scheduled departure', () => {
    render(<FlagshipTourGrid />);
    // At least one card must surface the chip (Oct / Nov / Mar etc. — depends
    // on which flagship has departureDates populated at test time).
    const chips = screen.getAllByText(/^Next · [A-Z][a-z]{2} \d{4}$/);
    expect(chips.length).toBeGreaterThanOrEqual(1);
  });
});
