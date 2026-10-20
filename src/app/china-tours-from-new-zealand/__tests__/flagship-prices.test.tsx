/**
 * WHY: the "flagship tours" comparison table (and its structured-data list) on /china-tours-from-new-zealand used to
 * hold hand-written prices. Best of China sat at the wrong figure on several pages for that reason. The table now
 * reads each price from the tour data, the same source as the tour pages; these tests pin that a price change in the
 * data reaches the table and the structured data, and that a tour missing from the data is left out rather than
 * printed with a blank price.
 */
import { render } from '@testing-library/react';
import ChinaToursFromNZPage from '@/app/china-tours-from-new-zealand/page';
import { getTourBySlug } from '@/lib/data/tours';
import { headlinePrice } from '@/lib/tour-price';

jest.mock('@/lib/data/tours', () => {
  const actual = jest.requireActual<typeof import('@/lib/data/tours')>('@/lib/data/tours');
  return { ...actual, getTourBySlug: jest.fn(actual.getTourBySlug) };
});
const actualGetTourBySlug = jest.requireActual<typeof import('@/lib/data/tours')>('@/lib/data/tours').getTourBySlug;
const mockedGetTourBySlug = getTourBySlug as jest.MockedFunction<typeof getTourBySlug>;

afterEach(() => {
  mockedGetTourBySlug.mockImplementation(actualGetTourBySlug);
});

const FLAGSHIPS = [
  { name: 'Tale of Two Cities', tier: 'discovery', slug: 'beijing-xian' },
  { name: 'Best of China', tier: 'discovery', slug: 'essentials' },
  { name: 'Shanghai & Surroundings', tier: 'discovery', slug: 'shanghai-surroundings' },
  { name: 'Silk Road', tier: 'signature', slug: 'silk-road' },
] as const;

/** Tour name -> price as shown in the comparison table (only rows whose first cell is one of the flagship names). */
function tablePrices(container: HTMLElement): Record<string, string> {
  const prices: Record<string, string> = {};
  container.querySelectorAll('tbody tr').forEach((row) => {
    const name = row.querySelector('td a')?.textContent?.trim();
    const cells = row.querySelectorAll('td');
    if (name && cells.length >= 4 && FLAGSHIPS.some((f) => f.name === name)) {
      prices[name] = (cells[3].textContent ?? '').trim();
    }
  });
  return prices;
}

interface ListItem { name: string; description: string }

/** The flagship ItemList from the page's structured data. */
function itemList(container: HTMLElement): { numberOfItems: number; items: ListItem[] } {
  for (const script of Array.from(container.querySelectorAll('script[type="application/ld+json"]'))) {
    const parsed: unknown = JSON.parse(script.textContent ?? 'null');
    const candidates = Array.isArray(parsed) ? parsed : [parsed];
    for (const candidate of candidates) {
      const node = candidate as { '@type'?: string; numberOfItems?: number; itemListElement?: ListItem[] } | null;
      if (node && node['@type'] === 'ItemList' && node.itemListElement?.some((item) => item.name === 'Best of China')) {
        return { numberOfItems: node.numberOfItems ?? 0, items: node.itemListElement };
      }
    }
  }
  throw new Error('flagship ItemList not found in the page');
}

describe('flagship tours on /china-tours-from-new-zealand', () => {
  it('shows each flagship tour with its headline price from the tour data', () => {
    const { container } = render(<ChinaToursFromNZPage />);
    const prices = tablePrices(container);

    for (const flagship of FLAGSHIPS) {
      const tour = actualGetTourBySlug('china', flagship.tier, flagship.slug);
      expect(tour).toBeDefined();
      expect(prices[flagship.name]).toBe(headlinePrice(tour!.price));
    }
  });

  it('follows a price change in the tour data, in the table and in the structured data', () => {
    mockedGetTourBySlug.mockImplementation((destination, tier, slug) => {
      const tour = actualGetTourBySlug(destination, tier, slug);
      return tour && slug === 'essentials' ? { ...tour, price: 'From NZD $9,999 per person' } : tour;
    });
    const { container } = render(<ChinaToursFromNZPage />);

    expect(tablePrices(container)['Best of China']).toBe('NZD $9,999');
    const bestOfChina = itemList(container).items.find((item) => item.name === 'Best of China');
    expect(bestOfChina?.description).toContain('from NZD $9,999');
  });

  it('leaves a tour out, instead of printing it with a blank price, when it is not in the tour data', () => {
    mockedGetTourBySlug.mockImplementation((destination, tier, slug) =>
      slug === 'silk-road' ? undefined : actualGetTourBySlug(destination, tier, slug),
    );
    const { container } = render(<ChinaToursFromNZPage />);

    expect(tablePrices(container)['Silk Road']).toBeUndefined();
    expect(Object.keys(tablePrices(container))).toHaveLength(3);
    const list = itemList(container);
    expect(list.numberOfItems).toBe(3);
    expect(list.items.map((item) => item.name)).not.toContain('Silk Road');
  });
});
