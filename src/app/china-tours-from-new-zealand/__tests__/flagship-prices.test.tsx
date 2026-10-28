/**
 * WHY: the "flagship tours" comparison table (and its structured-data list) on /china-tours-from-new-zealand used to
 * hold hand-written prices. Best of China sat at the wrong figure on several pages for that reason. The table now
 * reads each price from the tour data, the same source as the tour pages; these tests pin that a price change in the
 * data reaches the table and the structured data, and that a tour missing from the data is left out rather than
 * printed with a blank price.
 */
import { render } from '@testing-library/react';
import ChinaToursFromNZPage from '@/app/china-tours-from-new-zealand/page';
import { getPublishedChinaTours } from '@/lib/data/published-tour-catalog';
import { tours } from '@/lib/data/tours';
import { headlinePrice } from '@/lib/tour-price';

jest.mock('@/lib/data/published-tour-catalog', () => {
  const actual = jest.requireActual<typeof import('@/lib/data/published-tour-catalog')>('@/lib/data/published-tour-catalog');
  const localTours = jest.requireActual<typeof import('@/lib/data/tours')>('@/lib/data/tours').tours;
  return {
    ...actual,
    getPublishedChinaTours: jest.fn(async () => localTours.filter((tour) => tour.destination === 'china' && tour.isActive && !tour.soldOut)),
  };
});
const mockedGetPublishedChinaTours = getPublishedChinaTours as jest.MockedFunction<typeof getPublishedChinaTours>;

afterEach(() => {
  mockedGetPublishedChinaTours.mockImplementation(async () => tours.filter((tour) => tour.destination === 'china' && tour.isActive && !tour.soldOut));
});

const FLAGSHIPS = [
  { tier: 'discovery', slug: 'beijing-xian' },
  { tier: 'discovery', slug: 'essentials' },
  { tier: 'discovery', slug: 'shanghai-surroundings' },
  { tier: 'signature', slug: 'silk-road' },
] as const;

/** Tour name -> price as shown in the comparison table (only rows whose first cell is one of the flagship names). */
function tablePrices(container: HTMLElement): Record<string, string> {
  const prices: Record<string, string> = {};
  container.querySelectorAll('tbody tr').forEach((row) => {
    const link = row.querySelector('td a');
    const name = link?.textContent?.trim();
    const slug = link?.getAttribute('href')?.split('/').pop();
    const cells = row.querySelectorAll('td');
    if (name && cells.length >= 4 && FLAGSHIPS.some((flagship) => flagship.slug === slug)) {
      prices[name] = (cells[3].textContent ?? '').trim();
    }
  });
  return prices;
}

interface ListItem { name: string; description: string }

/** The flagship ItemList from the page's structured data. */
function itemList(container: HTMLElement, bestOfChinaName: string): { numberOfItems: number; items: ListItem[] } {
  for (const script of Array.from(container.querySelectorAll('script[type="application/ld+json"]'))) {
    const parsed: unknown = JSON.parse(script.textContent ?? 'null');
    const candidates = Array.isArray(parsed) ? parsed : [parsed];
    for (const candidate of candidates) {
      const node = candidate as { '@type'?: string; numberOfItems?: number; itemListElement?: ListItem[] } | null;
      if (node && node['@type'] === 'ItemList' && node.itemListElement?.some((item) => item.name === bestOfChinaName)) {
        return { numberOfItems: node.numberOfItems ?? 0, items: node.itemListElement };
      }
    }
  }
  throw new Error('flagship ItemList not found in the page');
}

describe('flagship tours on /china-tours-from-new-zealand', () => {
  it('shows each flagship tour with its headline price from the published tour catalogue', async () => {
    const { container } = render(await ChinaToursFromNZPage());
    const prices = tablePrices(container);

    for (const flagship of FLAGSHIPS) {
      const tour = tours.find((item) => item.destination === 'china' && item.tier === flagship.tier && item.slug === flagship.slug);
      expect(tour).toBeDefined();
      expect(prices[tour!.name]).toBe(headlinePrice(tour!.price));
    }
  });

  it('follows a published price change in the table and in the structured data', async () => {
    mockedGetPublishedChinaTours.mockImplementation(async () => tours
      .filter((tour) => tour.destination === 'china' && tour.isActive && !tour.soldOut)
      .map((tour) => tour.slug === 'essentials' ? { ...tour, price: 'From NZD $9,999 per person' } : tour));
    const { container } = render(await ChinaToursFromNZPage());

    const bestOfChinaName = tours.find((tour) => tour.slug === 'essentials')!.name;
    expect(tablePrices(container)[bestOfChinaName]).toBe('NZD $9,999');
    const bestOfChina = itemList(container, bestOfChinaName).items.find((item) => item.name === bestOfChinaName);
    expect(bestOfChina?.description).toContain('from NZD $9,999');
  });

  it('leaves a tour out when it is not in the published catalogue', async () => {
    mockedGetPublishedChinaTours.mockImplementation(async () => tours.filter((tour) =>
      tour.destination === 'china' && tour.isActive && !tour.soldOut && tour.slug !== 'silk-road',
    ));
    const { container } = render(await ChinaToursFromNZPage());

    const silkRoadName = tours.find((tour) => tour.slug === 'silk-road')!.name;
    expect(tablePrices(container)[silkRoadName]).toBeUndefined();
    expect(Object.keys(tablePrices(container))).toHaveLength(3);
    const list = itemList(container, tours.find((tour) => tour.slug === 'essentials')!.name);
    expect(list.numberOfItems).toBe(3);
    expect(list.items.map((item) => item.name)).not.toContain('Silk Road');
  });
});
