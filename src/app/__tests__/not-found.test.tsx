/**
 * 404 NotFound page tests
 *
 * Tests for src/app/not-found.tsx which provides:
 *   - "404" heading
 *   - "Page Not Found" copy
 *   - link to "/"
 *   - link to "/tours/find"
 *   - 6 popular destination quick-links
 *   - useEffect that fires window.gtag('event', 'page_view', { page_path: '/404' })
 */
import { render, screen, cleanup } from '@testing-library/react';
import NotFound from '@/app/not-found';

// Stub next/link so the page renders cleanly under jsdom.
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={typeof href === 'string' ? href : '#'} {...rest}>
      {children}
    </a>
  ),
}));

describe('NotFound page', () => {
  beforeEach(() => {
    (window as any).gtag = jest.fn();
  });

  afterEach(() => {
    delete (window as any).gtag;
    cleanup();
  });

  it('renders the "404" heading', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { name: /404/ })).toBeInTheDocument();
  });

  it('renders the "Page Not Found" message', () => {
    render(<NotFound />);
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });

  it('contains a link back to the homepage', () => {
    render(<NotFound />);
    const home = screen.getByRole('link', { name: /Back to Home/i });
    expect(home).toHaveAttribute('href', '/');
  });

  it('contains a link to /tours/find', () => {
    render(<NotFound />);
    const find = screen.getByRole('link', { name: /Explore Tours/i });
    expect(find).toHaveAttribute('href', '/tours/find');
  });

  it('contains six popular destination quick-links', () => {
    render(<NotFound />);
    ['Beijing', 'Shanghai', "Xi'an", 'Chengdu', 'Guilin', 'Zhangjiajie'].forEach(
      (city) => {
        expect(screen.getByText(new RegExp(city, 'i'))).toBeInTheDocument();
      }
    );
  });

  it('fires window.gtag page_view with page_path "/404" on mount', () => {
    render(<NotFound />);
    expect((window as any).gtag).toHaveBeenCalledWith(
      'event',
      'page_view',
      expect.objectContaining({ page_path: '/404' })
    );
  });

  it('does not throw when window.gtag is undefined', () => {
    delete (window as any).gtag;
    expect(() => render(<NotFound />)).not.toThrow();
  });
});
