/**
 * Hero component tests
 *
 * Tests for the GA4-instrumented Hero with:
 * - Primary CTA: "Browse Our China Tours →" → /tours/find
 * - Secondary CTA: "Chat with a Kiwi Travel Expert" → /contact
 * - GA4 events: hero_cta_primary_click, hero_cta_secondary_click
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
  default: ({ href, children, onClick, ...rest }: any) => (
    <a
      href={typeof href === 'string' ? href : '#'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  ),
}));

describe('Hero component', () => {
  beforeEach(() => {
    mockPush.mockClear();
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
    expect(screen.getByText(/All of it\./i)).toBeInTheDocument();
  });

  it('renders the primary CTA "Browse Our China Tours" linking to /tours/find', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /Browse Our China Tours/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '/tours/find');
  });

  it('renders the secondary CTA "Chat with a Kiwi Travel Expert" linking to /contact', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', {
      name: /Chat with a Kiwi Travel Expert/i,
    });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '/contact');
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

  it('fires window.gtag("event", "hero_cta_primary_click") on primary CTA click', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /Browse Our China Tours/i });
    fireEvent.click(cta);
    expect((window as any).gtag).toHaveBeenCalledWith(
      'event',
      'hero_cta_primary_click',
      expect.objectContaining({
        button_text: 'Browse Our China Tours',
        destination_url: '/tours/find',
        event_category: 'engagement',
        event_label: 'hero_primary_cta',
      })
    );
  });

  it('fires window.gtag("event", "hero_cta_secondary_click") on secondary CTA click', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', {
      name: /Chat with a Kiwi Travel Expert/i,
    });
    fireEvent.click(cta);
    expect((window as any).gtag).toHaveBeenCalledWith(
      'event',
      'hero_cta_secondary_click',
      expect.objectContaining({
        button_text: 'Chat with a Kiwi Travel Expert',
        event_category: 'engagement',
        event_label: 'hero_secondary_cta',
      })
    );
  });

  it('does not call window.gtag when gtag is undefined (graceful degradation)', () => {
    delete (window as any).gtag;
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /Browse Our China Tours/i });
    expect(() => fireEvent.click(cta)).not.toThrow();
  });
});
