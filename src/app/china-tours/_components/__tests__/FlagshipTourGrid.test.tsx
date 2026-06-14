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
});
