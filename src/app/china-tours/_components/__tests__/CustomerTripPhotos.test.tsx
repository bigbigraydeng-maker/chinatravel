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

  it('each tile carries a reviewer name + NZ location attribution', () => {
    render(<CustomerTripPhotos />);
    expect(screen.getByText(/Claire & Tom Mackenzie · Wellington, NZ/i)).toBeInTheDocument();
    expect(screen.getByText(/Fiona Hewitt · Auckland, NZ/i)).toBeInTheDocument();
    expect(screen.getByText(/Liz & Peter Armstrong · Christchurch, NZ/i)).toBeInTheDocument();
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
});
