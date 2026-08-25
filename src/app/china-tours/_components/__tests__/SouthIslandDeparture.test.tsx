/**
 * SouthIslandDeparture tests
 *
 * Contract (PM 2026-08-25): the Christchurch Christmas departure gets its own
 * band on /china-tours rather than a card in the flagship grid, because every
 * other tour on the hub departs Auckland and "flies direct from Christchurch"
 * is the whole point of this one. These tests pin that the section renders the
 * South Island framing and links to the right tour.
 */
import { render, screen } from '@testing-library/react';
import SouthIslandDeparture from '../SouthIslandDeparture';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props: any) => <img {...props} />,
}));

describe('SouthIslandDeparture', () => {
  it('links to the Christchurch departure tour page', () => {
    render(<SouthIslandDeparture />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe(
      '/tours/china/discovery/china-icons-collection-christchurch'
    );
  });

  it('makes the South Island / Christchurch origin explicit — this is the reason the section exists', () => {
    render(<SouthIslandDeparture />);
    expect(screen.getByText(/Departing from the South Island/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Fly direct from Christchurch/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Christchurch direct/i)).toBeInTheDocument();
  });

  it('pulls duration and price from tours.ts rather than hardcoding them', () => {
    render(<SouthIslandDeparture />);
    const text = document.body.textContent ?? '';
    expect(text).toMatch(/15 Days/);
    // Raw tours.ts value is "From NZD $6,188 per person" — must render clean.
    expect(text).toMatch(/NZD \$6,188/);
    expect(text).not.toMatch(/From NZD \$6,188 per person/);
  });
});
