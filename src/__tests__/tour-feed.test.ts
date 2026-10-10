/** @jest-environment node */
import { GET } from '@/app/api/internal/tours/route';
import { tours, type Tour } from '@/lib/data/tours';
import { feedToTour, tourToFeed, type TourFeedProduct } from '@/lib/tour-feed';

// The mapping the feed shipped with before it was widened. Magic Engine already
// consumes these keys, so the widened feed must keep every one byte-for-byte.
function legacyFeed(tour: Tour) {
  return {
    id: tour.id,
    slug: tour.slug,
    destination: tour.destination,
    tier: tour.tier,
    name: tour.name,
    title: tour.title,
    duration: tour.duration,
    price: tour.price,
    is_active: tour.isActive,
    updated_at: tour.updatedAt,
    departure_dates: tour.departureDates ?? [],
    departure_pricing: tour.departurePricing ?? {},
    tour_cities: tour.tourCities ?? [],
    itinerary: tour.itinerary,
    inclusions: tour.inclusions,
    exclusions: tour.exclusions,
    single_supplement: tour.singleSupplement ?? null,
    max_group_size: tour.maxGroupSize ?? null,
  };
}

const NEW_KEYS: Array<keyof TourFeedProduct> = [
  'created_at',
  'short_description',
  'highlights',
  'hero_image',
  'gallery',
  'meta_title',
  'meta_description',
  'tags',
  'faqs',
  'sold_out',
  'single_supplement_note',
  'rating',
  'review_count',
  'review_summary',
  'related_blog_slugs',
  'quick_answer',
];

const REQUIRED_TOUR_KEYS: Array<keyof Tour> = [
  'id',
  'slug',
  'destination',
  'tier',
  'name',
  'title',
  'shortDescription',
  'duration',
  'price',
  'heroImage',
  'gallery',
  'highlights',
  'itinerary',
  'inclusions',
  'exclusions',
  'metaTitle',
  'metaDescription',
  'createdAt',
  'updatedAt',
];

describe('tour feed mapping', () => {
  test('there are tours to check', () => {
    expect(tours.length).toBeGreaterThan(0);
  });

  describe.each(tours.map((tour) => [tour.id, tour] as const))('%s', (_id, tour) => {
    const feed = tourToFeed(tour);

    test('keeps every pre-existing key and value unchanged (additive only)', () => {
      const legacy = legacyFeed(tour);
      for (const key of Object.keys(legacy) as Array<keyof typeof legacy>) {
        expect(feed[key]).toEqual(legacy[key]);
      }
    });

    test('carries every field the public tour page reads', () => {
      const keys = new Set(Object.keys(feed));
      for (const key of NEW_KEYS) {
        expect(keys.has(key)).toBe(true);
        expect(feed[key]).not.toBeUndefined();
      }
      // No Tour field may be left behind: every source key maps to some feed key.
      expect(Object.keys(feed).length).toBe(Object.keys(legacyFeed(tour)).length + NEW_KEYS.length);
      expect(feed.hero_image).toBe(tour.heroImage);
      expect(feed.gallery).toEqual(tour.gallery);
      expect(feed.faqs.length).toBe(tour.faqs?.length ?? 0);
    });

    test('survives a round trip with zero field differences', () => {
      // Magic Engine acceptance: read in -> write out -> identical feed.
      expect(tourToFeed(feedToTour(feed))).toEqual(feed);
      // Also after JSON transport, which is how the consumer actually receives it.
      const overTheWire = JSON.parse(JSON.stringify(feed)) as TourFeedProduct;
      expect(overTheWire).toEqual(feed);
      expect(tourToFeed(feedToTour(overTheWire))).toEqual(feed);
    });

    test('feedToTour rebuilds a Tour with all required fields populated', () => {
      const rebuilt = feedToTour(feed);
      for (const key of REQUIRED_TOUR_KEYS) {
        const value = rebuilt[key];
        expect(value).toBeDefined();
        if (typeof value === 'string') expect(value.length).toBeGreaterThan(0);
      }
      expect(typeof rebuilt.isActive).toBe('boolean');
      expect(rebuilt.itinerary.length).toBeGreaterThan(0);
      // Every value written in the source survives; only absent/empty optionals are dropped.
      for (const key of Object.keys(rebuilt) as Array<keyof Tour>) {
        if (key === 'faqs') continue; // compared via the feed round trip (link normalisation)
        expect(rebuilt[key]).toEqual(tour[key]);
      }
    });
  });

  test('every Tour key present in the data is covered by the feed', () => {
    // Guards against a new Tour field being added without widening the feed.
    for (const tour of tours) {
      const rebuilt = feedToTour(tourToFeed(tour)) as unknown as Record<string, unknown>;
      for (const [key, value] of Object.entries(tour)) {
        const empty =
          value === undefined ||
          value === false ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'object' && value !== null && Object.keys(value).length === 0);
        if (!empty) expect(rebuilt[key]).toBeDefined();
      }
    }
  });
});

describe('GET /api/internal/tours', () => {
  test('returns one product per tour, each with all new keys, envelope unchanged', async () => {
    const response = await GET();
    const body = (await response.json()) as {
      source: string;
      source_version: string;
      products: Array<Record<string, unknown>>;
    };

    expect(body.source).toBe('chinatravel.tours');
    expect(body.source_version).toBe(
      tours.reduce((latest, tour) => (tour.updatedAt > latest ? tour.updatedAt : latest), ''),
    );
    expect(body.products.length).toBe(tours.length);
    for (const product of body.products) {
      for (const key of NEW_KEYS) {
        expect(Object.prototype.hasOwnProperty.call(product, key)).toBe(true);
      }
    }
    expect(body.products).toEqual(JSON.parse(JSON.stringify(tours.map(tourToFeed))));
  });
});
