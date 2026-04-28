/**
 * SearchBar component tests
 *
 * Tests for the GA4-instrumented SearchBar with Chinese-to-English translation:
 *   - Submits queries to /tours/find?q=<term>
 *   - Translates Chinese keywords (北京 → Beijing, etc.)
 *   - Fires hero_search_submit GA4 event on submission
 *   - Has 7 popular search chips
 */
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('SearchBar component', () => {
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

  it('does not invoke router.push with raw query when form is submitted with no query', () => {
    render(<SearchBar />);
    const form = screen
      .getByPlaceholderText(/Search destinations, tours, experiences/i)
      .closest('form')!;
    fireEvent.submit(form);
    // Empty query → URLSearchParams stays empty, push still fires with bare path
    expect(mockPush).toHaveBeenCalledWith('/tours/find?');
  });

  it('renders all seven popular-search chips', () => {
    render(<SearchBar />);
    ['Great Wall', 'Beijing', 'Shanghai', 'Guilin', "Xi'an", 'Chengdu', 'Zhangjiajie'].forEach(
      (term) => {
        expect(screen.getByRole('button', { name: term })).toBeInTheDocument();
      }
    );
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
  // Chinese-to-English translation tests
  // ---------------------------------------------------------------
  it('translates 北京 → Beijing before pushing to the router', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /Search destinations, tours, experiences/i
    );
    fireEvent.change(input, { target: { value: '北京' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockPush).toHaveBeenCalledWith('/tours/find?q=Beijing');
  });

  it('translates 上海 → Shanghai', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /Search destinations, tours, experiences/i
    );
    fireEvent.change(input, { target: { value: '上海' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockPush).toHaveBeenCalledWith('/tours/find?q=Shanghai');
  });

  it('translates 长城 → Great Wall (URL-encoded)', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /Search destinations, tours, experiences/i
    );
    fireEvent.change(input, { target: { value: '长城' } });
    fireEvent.submit(input.closest('form')!);
    const url: string = mockPush.mock.calls[0][0];
    expect(url).toMatch(/q=Great(%20|\+)Wall/);
  });

  it('keeps already-English input untouched', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /Search destinations, tours, experiences/i
    );
    fireEvent.change(input, { target: { value: 'Beijing' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockPush).toHaveBeenCalledWith('/tours/find?q=Beijing');
  });

  it('fires window.gtag("event", "hero_search_submit") on submit', () => {
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
        search_query: 'Beijing',
        event_category: 'engagement',
        event_label: 'hero_search_bar',
      })
    );
  });
});
