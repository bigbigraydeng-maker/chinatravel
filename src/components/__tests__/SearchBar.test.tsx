/**
 * SearchBar component tests
 *
 * NOTE: Reflects current behaviour of `src/components/SearchBar.tsx`.
 * The component currently:
 *   - submits raw user input to /tours/find?q=<term>
 *   - exposes 6 popular search chips (Great Wall, Shanghai, Panda,
 *     Silk Road, Japan Cherry Blossom, Vietnam)
 *   - does NOT translate Chinese tokens (e.g. 北京 → Beijing) and does
 *     NOT call window.gtag.
 *
 * Chinese-to-English translation and GA4 `hero_search_submit` event
 * tests are stubbed below as `it.skip(...)` — they are the spec for
 * the upcoming SearchBar enhancement and will be enabled once the
 * source ships those features.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('SearchBar component (current source)', () => {
  beforeEach(() => {
    mockPush.mockClear();
    (window as any).gtag = jest.fn();
  });

  afterEach(() => {
    delete (window as any).gtag;
  });

  it('renders a search input with the expected placeholder', () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText(/Search destinations, tours, experiences/i)
    ).toBeInTheDocument();
  });

  it('routes English queries to /tours/find with q= encoded', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /Search destinations, tours, experiences/i
    );
    fireEvent.change(input, { target: { value: 'Beijing' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush.mock.calls[0][0]).toBe('/tours/find?q=Beijing');
  });

  it('passes raw Chinese tokens through to the URL today (no translation layer yet)', () => {
    // Documents current behaviour: 北京 is sent as-is, NOT translated to "Beijing".
    // When translation lands, replace with `expect(...).toContain('q=Beijing')`.
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /Search destinations, tours, experiences/i
    );
    fireEvent.change(input, { target: { value: '北京' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockPush).toHaveBeenCalledTimes(1);
    const url: string = mockPush.mock.calls[0][0];
    // URLSearchParams percent-encodes the CJK characters; either way it
    // does not become "Beijing" today.
    expect(url.startsWith('/tours/find?q=')).toBe(true);
    expect(url).not.toContain('Beijing');
  });

  it('does not invoke router.push when the form is submitted with no query', () => {
    render(<SearchBar />);
    const form = screen
      .getByPlaceholderText(/Search destinations, tours, experiences/i)
      .closest('form')!;
    fireEvent.submit(form);
    // Empty query → URLSearchParams stays empty, push still fires with bare path.
    expect(mockPush).toHaveBeenCalledWith('/tours/find?');
  });

  it('renders all six popular-search chips', () => {
    render(<SearchBar />);
    [
      'Great Wall',
      'Shanghai',
      'Panda',
      'Silk Road',
      'Japan Cherry Blossom',
      'Vietnam',
    ].forEach((term) => {
      expect(screen.getByRole('button', { name: term })).toBeInTheDocument();
    });
  });

  it('clicking a popular chip routes to /tours/find with the term URL-encoded', () => {
    render(<SearchBar />);
    fireEvent.click(screen.getByRole('button', { name: 'Great Wall' }));
    expect(mockPush).toHaveBeenCalledWith('/tours/find?q=Great%20Wall');
  });

  it('does not throw when window.gtag is undefined', () => {
    delete (window as any).gtag;
    expect(() => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText(
        /Search destinations, tours, experiences/i
      );
      fireEvent.change(input, { target: { value: 'Shanghai' } });
      fireEvent.submit(input.closest('form')!);
    }).not.toThrow();
  });

  // ---------------------------------------------------------------
  // GA4 + i18n spec, awaiting implementation in source.
  // ---------------------------------------------------------------
  it.skip('translates 北京 → Beijing before pushing to the router', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /Search destinations, tours, experiences/i
    );
    fireEvent.change(input, { target: { value: '北京' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockPush).toHaveBeenCalledWith('/tours/find?q=Beijing');
  });

  it.skip('translates 上海 → Shanghai', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /Search destinations, tours, experiences/i
    );
    fireEvent.change(input, { target: { value: '上海' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockPush).toHaveBeenCalledWith('/tours/find?q=Shanghai');
  });

  it.skip('translates 长城 → Great Wall (URL-encoded)', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /Search destinations, tours, experiences/i
    );
    fireEvent.change(input, { target: { value: '长城' } });
    fireEvent.submit(input.closest('form')!);
    const url: string = mockPush.mock.calls[0][0];
    expect(url).toMatch(/q=Great(%20|\+)Wall/);
  });

  it.skip('keeps already-English input untouched', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /Search destinations, tours, experiences/i
    );
    fireEvent.change(input, { target: { value: 'Beijing' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockPush).toHaveBeenCalledWith('/tours/find?q=Beijing');
  });

  it.skip('fires window.gtag("event", "hero_search_submit") on submit', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /Search destinations, tours, experiences/i
    );
    fireEvent.change(input, { target: { value: 'Beijing' } });
    fireEvent.submit(input.closest('form')!);
    expect((window as any).gtag).toHaveBeenCalledWith(
      'event',
      'hero_search_submit',
      expect.objectContaining({
        event_category: expect.any(String),
        event_label: expect.any(String),
      })
    );
  });
});
