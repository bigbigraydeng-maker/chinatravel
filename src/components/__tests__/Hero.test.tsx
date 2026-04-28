/**
 * Hero component tests
 *
 * NOTE: These tests reflect the CURRENT source code behaviour of
 * `src/components/Hero.tsx` in this branch. The component currently
 * exposes two CTAs ("Explore China" and "Tailor My Trip") and embeds
 * the SearchBar; it does NOT yet wire `window.gtag` GA4 events.
 *
 * The GA4-instrumented variant referenced in the broader marketing
 * spec ("Browse Our China Tours →" / "Chat with a Kiwi Travel Expert"
 * + `hero_cta_primary_click` / `hero_cta_secondary_click`) is described
 * below in commented-out test stubs so they can be activated once the
 * GA4 wiring lands in source. We do NOT modify Hero.tsx as part of this
 * task — these tests exist to (a) lock in current behaviour and (b)
 * pre-stage the GA4 spec.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '../Hero';

// Mock next/navigation so the embedded SearchBar's useRouter() doesn't blow up.
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock next/image to a plain <img> so jest-dom can inspect rendered output.
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock next/link to a plain <a>.
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={typeof href === 'string' ? href : '#'} {...rest}>
      {children}
    </a>
  ),
}));

describe('Hero component (current source)', () => {
  beforeEach(() => {
    mockPush.mockClear();
    // Always provide a fresh window.gtag mock; some future tests assert on it.
    (window as any).gtag = jest.fn();
  });

  afterEach(() => {
    delete (window as any).gtag;
  });

  it('renders the eyebrow tagline and primary headline', () => {
    render(<Hero />);
    expect(
      screen.getByText(/New Zealand's China Specialists/i)
    ).toBeInTheDocument();
    // Headline is split across two lines: "China." and "All of it."
    expect(screen.getByText(/All of it\./i)).toBeInTheDocument();
  });

  it('renders the primary CTA "Explore China" linking to /explore', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /Explore China/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '/explore');
  });

  it('renders the secondary CTA "Tailor My Trip" linking to /tailor-made', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /Tailor My Trip/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '/tailor-made');
  });

  it('embeds a search input (SearchBar child component)', () => {
    render(<Hero />);
    expect(
      screen.getByPlaceholderText(/Search destinations, tours, experiences/i)
    ).toBeInTheDocument();
  });

  it('does not throw when window.gtag is undefined', () => {
    delete (window as any).gtag;
    expect(() => render(<Hero />)).not.toThrow();
  });

  // ---------------------------------------------------------------
  // GA4 event-tracking tests (skipped until the source is updated to
  // call window.gtag inside the CTA onClick handlers).
  // ---------------------------------------------------------------
  it.skip('fires window.gtag("event", "hero_cta_primary_click") on primary CTA click', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /Browse Our China Tours/i });
    fireEvent.click(cta);
    expect((window as any).gtag).toHaveBeenCalledWith(
      'event',
      'hero_cta_primary_click',
      expect.objectContaining({ event_category: expect.any(String) })
    );
  });

  it.skip('fires window.gtag("event", "hero_cta_secondary_click") on secondary CTA click', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', {
      name: /Chat with a Kiwi Travel Expert/i,
    });
    fireEvent.click(cta);
    expect((window as any).gtag).toHaveBeenCalledWith(
      'event',
      'hero_cta_secondary_click',
      expect.objectContaining({ event_category: expect.any(String) })
    );
  });
});
