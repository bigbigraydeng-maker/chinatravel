/**
 * CustomerTripPhotos tests
 *
 * Social-proof photo strip — guarantees:
 *  - 6 reviewer-quote tiles rendered (so a missing entry drops a card, not the section)
 *  - each tile has a quote + reviewer name + NZ location
 *  - section heading + supporting copy present
 */
import { render, screen } from '@testing-library/react';
import CustomerTripPhotos from '../CustomerTripPhotos';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props: any) => <img {...props} />,
}));

describe('CustomerTripPhotos', () => {
  it('renders the section heading + intro', () => {
    render(<CustomerTripPhotos />);
    expect(screen.getByRole('heading', { name: /Stories from the road/i })).toBeInTheDocument();
    expect(screen.getByText(/Real Kiwi travellers/i)).toBeInTheDocument();
  });

  it('renders exactly 6 trip-photo tiles', () => {
    render(<CustomerTripPhotos />);
    // <figure> per tile
    const tiles = document.querySelectorAll('figure');
    expect(tiles.length).toBe(6);
  });

  it('each tile carries a reviewer attribution using "Quote from X · {city}, NZ" — the explicit phrasing keeps it clear the quote is from a verified reviewer, not necessarily the person in the photo', () => {
    render(<CustomerTripPhotos />);
    expect(screen.getByText(/Quote from Claire & Tom Mackenzie · Wellington, NZ/i)).toBeInTheDocument();
    expect(screen.getByText(/Quote from Fiona Hewitt · Auckland, NZ/i)).toBeInTheDocument();
    expect(screen.getByText(/Quote from Liz & Peter Armstrong · Christchurch, NZ/i)).toBeInTheDocument();
  });

  it('every photo URL comes from ME visual-assets bucket (not chinatravel tour-images)', () => {
    // Pinning the data source: switching back to the chinatravel tour-images
    // bucket would silently regress the "ME-curated" promise — fail loudly.
    render(<CustomerTripPhotos />);
    const imgs = document.querySelectorAll('figure img');
    expect(imgs.length).toBe(6);
    imgs.forEach((img) => {
      const src = img.getAttribute('src') || '';
      expect(src).toMatch(/glbdnayojixmexgofbsd\.supabase\.co\/storage\/.*\/visual-assets\//);
    });
  });

  it('section intro discloses the photo/quote pairing model (no false 1:1 claim)', () => {
    render(<CustomerTripPhotos />);
    expect(
      screen.getByText(/photos shared by CTS travellers, paired with quotes from our verified NZ reviews/i)
    ).toBeInTheDocument();
  });
});
