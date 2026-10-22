import type { Tour } from '@/lib/data/tours';

type PublishedCatalogProduct = {
  slug: string;
  destination: string;
  tier?: string;
  is_active: boolean;
  departure_dates: string[];
  departure_pricing: Record<string, string>;
};

type PublicCatalog = {
  published: true;
  products: PublishedCatalogProduct[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isPublishedCatalogProduct(value: unknown): value is PublishedCatalogProduct {
  if (!isRecord(value)) return false;
  if (
    typeof value.slug !== 'string' ||
    typeof value.destination !== 'string' ||
    (value.tier !== undefined && typeof value.tier !== 'string') ||
    typeof value.is_active !== 'boolean' ||
    !Array.isArray(value.departure_dates) ||
    !value.departure_dates.every((date) => typeof date === 'string') ||
    !isRecord(value.departure_pricing)
  ) {
    return false;
  }

  return Object.values(value.departure_pricing).every((price) => typeof price === 'string');
}

async function readPublishedCatalog(): Promise<PublicCatalog | null> {
  const endpoint =
    process.env.ME_CTS_TOUR_CATALOG_URL?.trim() ||
    'https://app.magicengine.com.au/api/public/cts-tour-catalog';

  try {
    const response = await fetch(endpoint, { next: { revalidate: 60 } });
    if (!response.ok) {
      console.warn('CTS published tour catalog unavailable', response.status);
      return null;
    }

    const payload: unknown = await response.json();
    if (!isRecord(payload) || payload.published !== true || !Array.isArray(payload.products)) {
      console.warn('CTS published tour catalog response is unreadable');
      return null;
    }

    return {
      published: true,
      products: payload.products.filter(isPublishedCatalogProduct),
    };
  } catch (error) {
    console.warn(
      'CTS published tour catalog request failed',
      error instanceof Error ? error.name : 'unknown',
    );
    return null;
  }
}

function productKey(product: Pick<PublishedCatalogProduct, 'destination' | 'tier' | 'slug'>): string | null {
  if (!product.tier) return null;
  return `/tours/${product.destination}/${product.tier}/${product.slug}`;
}

/** Overlay published ME departure state on the site's stable editorial tour content. */
export async function getTourWithPublishedDepartures(tour: Tour): Promise<Tour> {
  const catalog = await readPublishedCatalog();
  if (!catalog) return tour;

  const product = catalog.products.find(
    (item) =>
      item.slug === tour.slug &&
      item.destination === tour.destination &&
      item.tier === tour.tier,
  );
  if (!product) return tour;

  const visibleDates = new Set(product.departure_dates);
  const departurePricing = Object.fromEntries(
    Object.entries(product.departure_pricing).filter(
      ([date, price]) => visibleDates.has(date) && price.trim() !== '',
    ),
  );

  return {
    ...tour,
    isActive: product.is_active,
    departureDates: [...product.departure_dates],
    departurePricing,
  };
}

/** Published dates for the site-wide China departure schedule. */
export async function loadPublishedDepartureOverrides(): Promise<Record<string, string[]> | null> {
  const catalog = await readPublishedCatalog();
  if (!catalog) return null;

  const overrides: Record<string, string[]> = {};
  for (const product of catalog.products) {
    const key = productKey(product);
    if (key !== null) {
      overrides[key] = product.is_active ? [...product.departure_dates] : [];
    }
  }
  return overrides;
}
