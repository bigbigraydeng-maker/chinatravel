import { TextEncoder } from 'util';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  BASE_ROUTE_ID,
  RouteVariantProvider,
  RouteVariantSwitcher,
  RouteVariantView,
  routeFromSearch,
  type RouteChoice,
} from '@/components/tours/RouteVariantSwitch';

const CHOICES: RouteChoice[] = [
  { id: BASE_ROUTE_ID, label: '8 May 2027', departureDates: ['8 May 2027'] },
  { id: 'oct-2027', label: '16 October 2027', note: 'Zhangjiajie replaces Yunnan.', departureDates: ['16 October 2027'] },
];

// react-dom/server needs TextEncoder, which jsdom does not provide; load it after adding it.
Object.assign(globalThis, { TextEncoder });
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { renderToString } = require('react-dom/server') as typeof import('react-dom/server');

function Page({ choices = CHOICES }: { choices?: RouteChoice[] }) {
  return (
    <RouteVariantProvider choices={choices}>
      <RouteVariantSwitcher />
      <RouteVariantView
        anchorId="itinerary"
        views={{
          [BASE_ROUTE_ID]: <section id="itinerary">May route: Kunming</section>,
          'oct-2027': <section id="itinerary-oct-2027">October route: Zhangjiajie</section>,
        }}
      />
    </RouteVariantProvider>
  );
}

function setUrl(search: string) {
  window.history.replaceState(null, '', `/tours/china/signature/grand-tour${search}`);
}

describe('routeFromSearch', () => {
  it.each([
    ['?route=oct-2027', 'oct-2027'],
    ['?departure=16%20October%202027', 'oct-2027'],
    ['?departure=16+october+2027', 'oct-2027'],
    ['?departure=8%20May%202027', BASE_ROUTE_ID],
    ['?route=nope', null],
    ['?departure=1%20Jan%202030', null],
    ['', null],
  ])('%s -> %s', (search, expected) => {
    expect(routeFromSearch(search, CHOICES)).toBe(expected);
  });
});

describe('route picker', () => {
  beforeEach(() => setUrl(''));

  it('puts every route in the server HTML, and only the default one is visible', () => {
    const html = renderToString(<Page />);
    expect(html).toContain('May route: Kunming');
    expect(html).toContain('October route: Zhangjiajie');
    expect(html).toMatch(/<div hidden="">\s*<section id="itinerary-oct-2027"/);
    expect(html).not.toMatch(/<div hidden="">\s*<section id="itinerary">/);
  });

  it('starts on the default route and offers both dates', () => {
    render(<Page />);
    expect(screen.getByText('May route: Kunming')).toBeInTheDocument();
    expect(screen.queryByText('October route: Zhangjiajie')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '8 May 2027' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: '16 October 2027' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches to the October route on click, shows its note, and keeps #itinerary pointing at it', () => {
    render(<Page />);
    fireEvent.click(screen.getByRole('button', { name: '16 October 2027' }));
    expect(screen.getByText('October route: Zhangjiajie')).toBeInTheDocument();
    expect(screen.queryByText('May route: Kunming')).not.toBeInTheDocument();
    expect(screen.getByText('Zhangjiajie replaces Yunnan.')).toBeInTheDocument();
    expect(document.querySelectorAll('#itinerary')).toHaveLength(1);
    expect(window.location.search).toBe('?route=oct-2027');
  });

  it('goes back to the default route and clears the link parameter', () => {
    render(<Page />);
    fireEvent.click(screen.getByRole('button', { name: '16 October 2027' }));
    fireEvent.click(screen.getByRole('button', { name: '8 May 2027' }));
    expect(screen.getByText('May route: Kunming')).toBeInTheDocument();
    expect(window.location.search).toBe('');
  });

  it('opens on the October route when the link asks for it', async () => {
    setUrl('?departure=16%20October%202027');
    await act(async () => {
      render(<Page />);
    });
    expect(screen.getByText('October route: Zhangjiajie')).toBeInTheDocument();
    expect(screen.queryByText('May route: Kunming')).not.toBeInTheDocument();
  });

  it('shows no picker for a tour with a single route, and just the default block', () => {
    render(<Page choices={[]} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('May route: Kunming')).toBeInTheDocument();
  });
});
