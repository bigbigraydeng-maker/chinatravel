import {
  getPublishedActiveTours,
  getPublishedTourBySlug,
  getPublishedTours,
} from '../published-tour-catalog';

type WebsiteProduct = {
  id: string;
  slug: string;
  destination: 'china';
  tier: 'signature' | 'discovery';
  name: string;
  title: string;
  short_description: string;
  duration: string;
  price: string;
  hero_image: string;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
  sold_out: boolean;
  updated_at: string;
  departure_dates: string[];
  departure_pricing: Record<string, string>;
  tour_cities: string[];
  highlights: string[];
  itinerary: Array<{ day: number; title: string; description: string; meals: string[] }>;
  inclusions: string[];
  exclusions: string[];
  gallery: string[];
  tags: string[];
  faqs: Array<{ question: string; answer: string; link: null }>;
  single_supplement: string | null;
  single_supplement_note: string | null;
  max_group_size: number | null;
  rating: number | null;
  review_count: number | null;
  review_summary: string | null;
  related_blog_slugs: string[];
  quick_answer: string | null;
};

const runtime = globalThis as typeof globalThis & { __ctsPublishedTourCatalog?: unknown };
const mutableEnv = process.env as unknown as Record<string, string | undefined>;
const originalUrl = process.env.ME_CTS_TOUR_CATALOG_URL;
const originalKey = process.env.ME_CTS_TOUR_CATALOG_API_KEY;
const originalNodeEnv = process.env.NODE_ENV;
const mockFetch = jest.fn();

function product(overrides: Partial<WebsiteProduct> = {}): WebsiteProduct {
  return {
    id: 'tour-1', slug: 'landscapes', destination: 'china', tier: 'signature',
    name: 'Natural China', title: 'Natural China: updated title', short_description: 'A current description',
    duration: '16 days', price: 'NZD $5,200',
    hero_image: 'https://example.com/hero.jpg', meta_title: 'Natural China', meta_description: 'Updated metadata',
    is_active: true, sold_out: false, updated_at: '2026-10-22',
    departure_dates: ['28 May 2027'], departure_pricing: { '28 May 2027': 'NZD $5,200' },
    tour_cities: ['beijing', 'xian'], highlights: ['Current highlight'],
    itinerary: [{ day: 1, title: 'Day 1', description: 'Current itinerary', meals: [] }],
    inclusions: ['Current inclusion'], exclusions: ['Current exclusion'], gallery: [], tags: ['nature'], faqs: [],
    single_supplement: null, single_supplement_note: null, max_group_size: 16, rating: null, review_count: null,
    review_summary: null, related_blog_slugs: [], quick_answer: null,
    ...overrides,
  };
}

function setFeedResponse(payload: unknown, ok = true) {
  mockFetch.mockResolvedValue({ ok, status: ok ? 200 : 503, json: async () => payload });
  global.fetch = mockFetch as unknown as typeof fetch;
}

beforeEach(() => {
  process.env.ME_CTS_TOUR_CATALOG_URL = 'https://me.example.test/api/public/tour-catalog/client';
  process.env.ME_CTS_TOUR_CATALOG_API_KEY = 'test-key';
  delete runtime.__ctsPublishedTourCatalog;
  mockFetch.mockReset();
  global.fetch = mockFetch as unknown as typeof fetch;
});

afterEach(() => {
  if (originalUrl === undefined) delete process.env.ME_CTS_TOUR_CATALOG_URL;
  else process.env.ME_CTS_TOUR_CATALOG_URL = originalUrl;
  if (originalKey === undefined) delete process.env.ME_CTS_TOUR_CATALOG_API_KEY;
  else process.env.ME_CTS_TOUR_CATALOG_API_KEY = originalKey;
  if (originalNodeEnv === undefined) delete mutableEnv.NODE_ENV;
  else mutableEnv.NODE_ENV = originalNodeEnv;
  delete runtime.__ctsPublishedTourCatalog;
  jest.restoreAllMocks();
});

describe('published tour catalog adapter', () => {
  it('uses the published snapshot as product membership and maps every managed field', async () => {
    setFeedResponse({ published: true, version: 3, products: [product()] });

    const tours = await getPublishedTours();
    const tour = await getPublishedTourBySlug('china', 'signature', 'landscapes');

    expect(tours).toHaveLength(1);
    expect(tour).toMatchObject({
      name: 'Natural China', title: 'Natural China: updated title', duration: '16 days',
      price: 'NZD $5,200', heroImage: 'https://example.com/hero.jpg',
      departureDates: ['28 May 2027'], departurePricing: { '28 May 2027': 'NZD $5,200' },
      tourCities: ['beijing', 'xian'], highlights: ['Current highlight'],
      inclusions: ['Current inclusion'], exclusions: ['Current exclusion'], gallery: [],
    });
    expect(tour?.gallery).toEqual([]);
  });

  it('does not project a cancelled departure or its old price override from the published record', async () => {
    setFeedResponse({ published: true, version: 7, products: [product({
      departure_dates: ['28 May 2027'],
      departure_pricing: {
        '26 March 2027': 'NZD $7,349',
        '28 May 2027': 'NZD $7,349',
      },
    })] });

    const tour = await getPublishedTourBySlug('china', 'signature', 'landscapes');
    expect(tour?.departureDates).toEqual(['28 May 2027']);
    expect(tour?.departurePricing).toEqual({ '28 May 2027': 'NZD $7,349' });
  });

  it('keeps inactive and sold-out products reachable by detail but out of sales lists', async () => {
    setFeedResponse({ published: true, version: 4, products: [
      product(), product({ id: 'tour-2', slug: 'closed', is_active: false }),
      product({ id: 'tour-3', slug: 'sold-out', sold_out: true }),
    ] });

    expect(await getPublishedTours()).toHaveLength(3);
    expect(await getPublishedActiveTours()).toHaveLength(1);
    expect(await getPublishedTourBySlug('china', 'signature', 'closed')).toBeDefined();
  });

  it('fails closed instead of showing the stale static catalog when a configured feed fails cold', async () => {
    setFeedResponse({ published: false, version: null, products: [] }, false);

    await expect(getPublishedTours()).resolves.toEqual([]);
  });

  it('does not use the local fallback catalog in production when feed credentials are missing', async () => {
    mutableEnv.NODE_ENV = 'production';
    delete process.env.ME_CTS_TOUR_CATALOG_URL;
    delete process.env.ME_CTS_TOUR_CATALOG_API_KEY;

    await expect(getPublishedTours()).resolves.toEqual([]);

  });

  it('continues with the last valid published snapshot during a warm feed outage', async () => {
    setFeedResponse({ published: true, version: 5, products: [product()] });
    await getPublishedTours();
    setFeedResponse(null, false);

    await expect(getPublishedTours()).resolves.toHaveLength(1);
  });

  it('rejects a regressed published version and keeps the last valid snapshot', async () => {
    setFeedResponse({ published: true, version: 6, products: [product()] });
    await getPublishedTours();
    setFeedResponse({ published: true, version: 5, products: [product({ name: 'Older record' })] });
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    await expect(getPublishedTours()).resolves.toEqual(await getPublishedTours());
    expect((await getPublishedTours())[0].name).toBe('Natural China');
  });
});
