import { tours as fallbackTours, type DayItinerary, type Tour } from '@/lib/data/tours';
import { isDelistedSlug } from '@/lib/data/delisted-tours';

/** Shared Next data-cache tag. The ME publish callback invalidates this tag. */
export const PUBLISHED_TOUR_CATALOG_TAG = 'cts-published-tour-catalog';
const CATALOG_REVALIDATE_SECONDS = 15;
const PUBLISHED_CITY_LABELS: Record<string, string> = {
  beijing: 'Beijing', chengdu: 'Chengdu', chongqing: 'Chongqing', dunhuang: 'Dunhuang',
  guilin: 'Guilin', hangzhou: 'Hangzhou', lanzhou: 'Lanzhou', shanghai: 'Shanghai',
  suzhou: 'Suzhou', turpan: 'Turpan', urumqi: 'Urumqi', wuxi: 'Wuxi', xian: "Xi'an",
};

export function formatPublishedTourCity(city: string): string {
  const normalized = city.trim().toLowerCase().replace(/[\s-]+/g, '_');
  return PUBLISHED_CITY_LABELS[normalized] ?? city
    .split(/([\s-]+)/)
    .map((part) => part.match(/^[\s-]+$/) ? part : `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');
}

export function formatPublishedTourCities(cities: readonly string[] | string | undefined, separator = ' · '): string {
  if (typeof cities === 'string') return cities;
  return (cities ?? []).map(formatPublishedTourCity).join(separator);
}

/**
 * Source-of-truth contract for ME-managed public records. Keep the surface list
 * beside the shared reader so new website entry points have a concrete checklist
 * and the contract test can catch consumers that bypass this module.
 */
export const PUBLISHED_TOUR_CATALOG_CONTRACT = {
  records: {
    tour: [
      'id', 'slug', 'destination', 'tier', 'name', 'title', 'short_description', 'duration', 'price',
      'hero_image', 'meta_title', 'meta_description', 'is_active', 'sold_out', 'updated_at', 'tour_cities',
      'highlights', 'itinerary', 'inclusions', 'exclusions', 'gallery', 'tags', 'faqs',
      'single_supplement', 'single_supplement_note', 'max_group_size', 'rating', 'review_count',
      'review_summary', 'related_blog_slugs', 'quick_answer',
    ],
    departure: ['tour_id', 'depart_on', 'status', 'price_text_override'],
  },
  recordCoverage: [
    {
      record: 'tour identity, active status and ordering',
      fields: ['id', 'slug', 'destination', 'tier', 'name', 'is_active', 'sold_out'],
      surfaceGroups: ['listing and search', 'product and campaign pages', 'conversion and trip tools', 'SEO, guides and planning'],
    },
    {
      record: 'tour offer and product content',
      fields: ['title', 'short_description', 'duration', 'price', 'hero_image', 'updated_at', 'tour_cities', 'highlights', 'itinerary', 'inclusions', 'exclusions', 'gallery', 'faqs', 'single_supplement', 'single_supplement_note', 'max_group_size', 'rating', 'review_count', 'review_summary', 'quick_answer'],
      surfaceGroups: ['listing and search', 'product and campaign pages', 'conversion and trip tools', 'SEO, guides and planning'],
    },
    {
      record: 'tour metadata and relationships',
      fields: ['meta_title', 'meta_description', 'tags', 'related_blog_slugs'],
      surfaceGroups: ['listing and search', 'product and campaign pages', 'SEO, guides and planning'],
    },
    {
      record: 'departures linked by tour_id',
      fields: ['tour_id', 'depart_on', 'status', 'price_text_override'],
      surfaceGroups: ['listing and search', 'product and campaign pages', 'conversion and trip tools', 'SEO, guides and planning'],
    },
  ],
  surfaces: [
    { group: 'listing and search', routes: ['/', '/tours', '/tours/find', '/china-tours', '/small-group-china-tours', '/tours/[destination]', '/tours/[destination]/[tier]', '/beijing-tours', '/chongqing-tours', '/chengdu-tours', '/guilin-tours', '/hangzhou-tours', '/shanghai-tours', '/suzhou-tours', '/xian-tours', '/yunnan-tours', '/zhangjiajie-tours', '/explore/[city]'] },
    { group: 'product and campaign pages', routes: ['/tours/[destination]/[tier]/[tour]', '/tours/[destination]/[tier]/[tour]/print', '/campaigns/[tour]', '/campaigns/best-of-china', '/campaigns/chongqing', '/campaigns/fire-fuzz', '/campaigns/october-2026/[slug]', '/campaigns/spotlight', '/spotlight/october-2026', '/best-china-tours', '/china-tours-for-seniors', '/agents'] },
    { group: 'conversion and trip tools', routes: ['/traveller-details', '/trip-planner', '/api/tour-enquiry', '/api/send-itinerary', '/api/internal/tours', '/api/site-analyzer'] },
    { group: 'SEO, guides and planning', routes: ['/sitemap.xml', '/api/revalidate', '/china-tours-from-new-zealand', '/china-tours-from-auckland', '/best-time-to-visit-china', '/travel-tools', '/play/[slug]', '/beijing-travel-guide', '/xian-travel-guide', '/shanghai-travel-guide', '/chengdu-travel-guide', '/guilin-travel-guide', '/zhangjiajie-travel-guide', '/yunnan-travel-guide', '/lijiang-travel-guide', '/dali-travel-guide', '/kunming-travel-guide', '/shangri-la-travel-guide', '/great-wall-travel-guide', '/forbidden-city-travel-guide', '/terracotta-warriors-travel-guide', '/leshan-buddha-travel-guide', '/yangshuo-travel-guide', '/tianmen-mountain-travel-guide', '/hangzhou-travel-guide', '/suzhou-travel-guide', '/chongqing-travel-guide', '/li-river-travel-guide'] },
  ],
  consumerFiles: [
    'src/app/agents/page.tsx', 'src/app/api/internal/tours/route.ts', 'src/app/api/revalidate/route.ts',
    'src/app/api/send-itinerary/route.ts', 'src/app/api/site-analyzer/route.ts', 'src/app/api/tour-enquiry/route.ts',
    'src/app/beijing-tours/page.tsx', 'src/app/best-china-tours/page.tsx', 'src/app/best-time-to-visit-china/page.tsx',
    'src/app/blog/[slug]/page.tsx', 'src/app/campaigns/[tour]/page.tsx', 'src/app/campaigns/best-of-china/page.tsx',
    'src/app/campaigns/chongqing/page.tsx', 'src/app/campaigns/fire-fuzz/page.tsx',
    'src/app/campaigns/october-2026/[slug]/page.tsx', 'src/app/campaigns/spotlight/page.tsx',
    'src/app/beijing-xian-discovery-guide/page.tsx', 'src/app/shanghai-surroundings-discovery-guide/page.tsx',
    'src/app/chengdu-tours/page.tsx', 'src/app/china-tours-from-auckland/page.tsx',
    'src/app/china-tours-from-new-zealand/page.tsx', 'src/app/china-tours-for-seniors/page.tsx',
    'src/app/china-travel-specialists-nz/page.tsx', 'src/app/china-tours/page.tsx', 'src/app/chongqing-tours/page.tsx',
    'src/app/explore/[city]/page.tsx', 'src/app/great-wall-travel-guide/page.tsx', 'src/app/guilin-tours/page.tsx',
    'src/app/hangzhou-tours/page.tsx', 'src/app/page-redesign.tsx', 'src/app/shanghai-tours/page.tsx',
    'src/app/sitemap.ts', 'src/app/small-group-china-tours/page.tsx', 'src/app/spotlight/october-2026/page.tsx',
    'src/app/suzhou-tours/page.tsx', 'src/app/terracotta-warriors-travel-guide/page.tsx',
    'src/app/test-tours/page.tsx', 'src/app/tours/[destination]/[tier]/[tour]/page.tsx',
    'src/app/tours/[destination]/[tier]/[tour]/print/page.tsx', 'src/app/tours/[destination]/[tier]/page.tsx',
    'src/app/tours/[destination]/page.tsx', 'src/app/tours/find/page.tsx', 'src/app/tours/page.tsx',
    'src/app/traveller-details/page.tsx', 'src/app/trip-planner/page.tsx', 'src/app/xian-tours/page.tsx',
    'src/app/yunnan-tours/page.tsx', 'src/app/zhangjiajie-tours/page.tsx',
    'src/app/travel-tools/page.tsx', 'src/app/play/_components/TourDiscoveryFooter.tsx',
    'src/components/SpotlightTours.tsx', 'src/components/seo/DestinationGuide.tsx', 'src/components/seo/VisaGuideOctoberCampaignCtas.tsx',
    'src/components/tours/CtsDepartureScheduleBlock.tsx', 'src/components/upgrade/UpgradedTourPage.tsx',
  ],
} as const;

type PublishedFaq = { question: string; answer: string; link: { href: string; label: string } | null };
type PublishedCatalogProduct = {
  id: string;
  slug: string;
  destination: Tour['destination'];
  tier: Tour['tier'];
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
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  gallery: string[];
  tags: string[];
  faqs: PublishedFaq[];
  single_supplement: string | null;
  single_supplement_note: string | null;
  max_group_size: number | null;
  rating: number | null;
  review_count: number | null;
  review_summary: string | null;
  related_blog_slugs: string[];
  quick_answer: string | null;
};

type PublicCatalog = { published: true; version: number; products: PublishedCatalogProduct[] };
type CatalogGlobal = typeof globalThis & { __ctsPublishedTourCatalog?: PublicCatalog };

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string';
}

function isWebsiteItineraryDay(value: unknown): value is DayItinerary {
  if (!isRecord(value) || typeof value.day !== 'number' || typeof value.title !== 'string' ||
    typeof value.description !== 'string' || !isStringArray(value.meals)) return false;
  if (value.accommodation !== undefined && typeof value.accommodation !== 'string') return false;
  if (value.festiveLabel !== undefined && typeof value.festiveLabel !== 'string') return false;
  if (value.operatorLogo !== undefined && (!isRecord(value.operatorLogo) ||
    typeof value.operatorLogo.src !== 'string' || typeof value.operatorLogo.alt !== 'string')) return false;
  return true;
}

function isPublishedFaq(value: unknown): value is PublishedFaq {
  return isRecord(value) && typeof value.question === 'string' && typeof value.answer === 'string' &&
    (value.link === null || (isRecord(value.link) && typeof value.link.href === 'string' && typeof value.link.label === 'string'));
}

function isPublishedCatalogProduct(value: unknown): value is PublishedCatalogProduct {
  if (!isRecord(value)) return false;
  const enumsOk =
    (value.destination === 'china' || value.destination === 'japan' || value.destination === 'vietnam') &&
    (value.tier === 'signature' || value.tier === 'discovery' || value.tier === 'stopover');
  const arraysOk =
    isStringArray(value.departure_dates) && isStringArray(value.tour_cities) &&
    isStringArray(value.highlights) && isStringArray(value.inclusions) &&
    isStringArray(value.exclusions) && isStringArray(value.gallery) &&
    isStringArray(value.tags) && isStringArray(value.related_blog_slugs) &&
    Array.isArray(value.itinerary) && value.itinerary.every(isWebsiteItineraryDay) &&
    Array.isArray(value.faqs) && value.faqs.every(isPublishedFaq);
  const scalarOk =
    typeof value.id === 'string' && typeof value.slug === 'string' && enumsOk &&
    typeof value.name === 'string' && typeof value.title === 'string' &&
    typeof value.short_description === 'string' && typeof value.duration === 'string' &&
    typeof value.price === 'string' && typeof value.hero_image === 'string' && value.hero_image.trim() !== '' &&
    typeof value.meta_title === 'string' && typeof value.meta_description === 'string' &&
    typeof value.is_active === 'boolean' && typeof value.sold_out === 'boolean' &&
    typeof value.updated_at === 'string' && isRecord(value.departure_pricing) &&
    Object.values(value.departure_pricing).every((price) => typeof price === 'string') &&
    isNullableString(value.single_supplement) && isNullableString(value.single_supplement_note) &&
    (value.max_group_size === null || (typeof value.max_group_size === 'number' && Number.isInteger(value.max_group_size) && value.max_group_size > 0)) &&
    (value.rating === null || (typeof value.rating === 'number' && value.rating >= 0 && value.rating <= 5)) &&
    (value.review_count === null || (typeof value.review_count === 'number' && Number.isInteger(value.review_count) && value.review_count >= 0)) &&
    isNullableString(value.review_summary) && isNullableString(value.quick_answer);

  return scalarOk && arraysOk;
}

async function readPublishedCatalog(): Promise<PublicCatalog | null> {
  const endpoint = process.env.ME_CTS_TOUR_CATALOG_URL?.trim();
  const apiKey = process.env.ME_CTS_TOUR_CATALOG_API_KEY?.trim();
  if (!endpoint || !apiKey) return null;

  try {
    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: CATALOG_REVALIDATE_SECONDS, tags: [PUBLISHED_TOUR_CATALOG_TAG] },
    });
    if (!response.ok) {
      console.warn('CTS published tour catalog unavailable', response.status);
      return null;
    }

    const payload: unknown = await response.json();
    if (!isRecord(payload) || payload.published !== true || !Number.isInteger(payload.version) || !Array.isArray(payload.products)) {
      console.warn('CTS published tour catalog response is unreadable');
      return null;
    }

    const products = payload.products.filter(isPublishedCatalogProduct);
    if (products.length !== payload.products.length) {
      console.error('CTS published tour catalog contains invalid products', payload.products.length - products.length);
      return null;
    }

    const catalog: PublicCatalog = { published: true, version: payload.version as number, products };
    const runtime = globalThis as CatalogGlobal;
    const previous = runtime.__ctsPublishedTourCatalog;
    if (previous && catalog.version < previous.version) {
      console.error('CTS published tour catalog version regressed', catalog.version, previous.version);
      return previous;
    }
    runtime.__ctsPublishedTourCatalog = catalog;
    return catalog;
  } catch (error) {
    console.warn('CTS published tour catalog request failed', error instanceof Error ? error.name : 'unknown');
    return null;
  }
}

function productKey(product: Pick<PublishedCatalogProduct, 'destination' | 'tier' | 'slug'>): string {
  return `${product.destination}/${product.tier}/${product.slug}`;
}

function toSiteTour(product: PublishedCatalogProduct, base?: Tour): Tour {
  const departures = new Set(product.departure_dates);
  const departurePricing = Object.fromEntries(Object.entries(product.departure_pricing)
    .filter(([date, price]) => departures.has(date) && price.trim() !== ''));
  return {
    id: base?.id ?? product.id,
    slug: product.slug,
    destination: product.destination,
    tier: product.tier,
    name: product.name,
    title: product.title,
    shortDescription: product.short_description,
    duration: product.duration,
    price: product.price,
    heroImage: product.hero_image || base?.heroImage || '',
    gallery: product.gallery,
    highlights: product.highlights,
    itinerary: product.itinerary,
    inclusions: product.inclusions,
    exclusions: product.exclusions,
    metaTitle: product.meta_title,
    metaDescription: product.meta_description,
    isActive: product.is_active,
    soldOut: product.sold_out,
    createdAt: base?.createdAt ?? product.updated_at,
    updatedAt: product.updated_at,
    tags: product.tags,
    departureDates: product.departure_dates,
    departurePricing,
    tourCities: product.tour_cities,
    faqs: product.faqs.map(({ question, answer, link }) => ({ question, answer, ...(link ? { link } : {}) })),
    singleSupplement: product.single_supplement ?? undefined,
    singleSupplementNote: product.single_supplement_note ?? undefined,
    rating: product.rating ?? undefined,
    reviewCount: product.review_count ?? undefined,
    reviewSummary: product.review_summary ?? undefined,
    relatedBlogSlugs: product.related_blog_slugs,
    quickAnswer: product.quick_answer ?? undefined,
    maxGroupSize: product.max_group_size ?? undefined,
    // These are site-owned presentation settings, intentionally retained by slug.
    goldenBlocks: base?.goldenBlocks,
    planLinks: base?.planLinks,
    suppressAggregateRating: base?.suppressAggregateRating,
  };
}

/**
 * All public tour pages and APIs must use this read. A valid ME published snapshot
 * is authoritative for product membership, ordering, status and all managed fields.
 * Static tour data is used only before feed credentials are configured or when the
 * feed is temporarily unavailable.
 */
export async function getPublishedTours(): Promise<Tour[]> {
  const catalog = await readPublishedCatalog();
  const runtime = globalThis as CatalogGlobal;
  const feedConfigured = Boolean(process.env.ME_CTS_TOUR_CATALOG_URL?.trim() || process.env.ME_CTS_TOUR_CATALOG_API_KEY?.trim());
  const usableCatalog = catalog ?? (feedConfigured ? runtime.__ctsPublishedTourCatalog ?? null : null);
  if (!usableCatalog) return feedConfigured || process.env.NODE_ENV === 'production' ? [] : fallbackTours;
  const baseByKey = new Map(fallbackTours.map((tour) => [`${tour.destination}/${tour.tier}/${tour.slug}`, tour]));
  return usableCatalog.products
    .filter((product) => !isDelistedSlug(product.slug))
    .map((product) => toSiteTour(product, baseByKey.get(productKey(product))));
}

export async function getPublishedTourBySlug(destination: string, tier: string, slug: string): Promise<Tour | undefined> {
  const all = await getPublishedTours();
  return all.find((tour) => tour.destination === destination && tour.tier === tier && tour.slug === slug);
}

export async function getPublishedToursByDestinationAndTier(destination: string, tier: string): Promise<Tour[]> {
  return (await getPublishedTours()).filter((tour) => tour.destination === destination && tour.tier === tier && tour.isActive && !tour.soldOut);
}

export async function getPublishedToursByDestination(destination: string): Promise<Tour[]> {
  return (await getPublishedTours()).filter((tour) => tour.destination === destination && tour.isActive && !tour.soldOut);
}

export async function getPublishedActiveTours(): Promise<Tour[]> {
  return (await getPublishedTours()).filter((tour) => tour.isActive && !tour.soldOut);
}

export async function getPublishedChinaTours(): Promise<Tour[]> {
  const tierOrder: Record<Tour['tier'], number> = { signature: 0, discovery: 1, stopover: 2 };
  return (await getPublishedTours()).filter((tour) => tour.destination === 'china' && tour.isActive && !tour.soldOut)
    .sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);
}

export async function getPublishedToursByCityName(cityName: string): Promise<Tour[]> {
  const terms = [cityName.toLowerCase()];
  if (terms[0] === "xi'an" || terms[0] === 'xian') terms.push("xi'an", 'xian', "xi\\'an");
  return (await getPublishedChinaTours()).filter((tour) => {
    const text = [tour.name, tour.shortDescription, ...(tour.tourCities ?? []), ...tour.highlights, ...(tour.tags ?? []),
      ...tour.itinerary.flatMap((day) => [day.title, day.description])].join(' ').toLowerCase();
    return terms.some((term) => text.includes(term));
  });
}

export async function getPublishedToursByRegion(regionNames: string[]): Promise<Tour[]> {
  const terms = regionNames.flatMap((name) => {
    const value = name.toLowerCase();
    return value === "xi'an" || value === 'xian' ? [value, "xi'an", 'xian', "xi\\'an"] : [value];
  });
  return (await getPublishedChinaTours()).filter((tour) => {
    const text = [tour.name, tour.shortDescription, ...(tour.tourCities ?? []), ...tour.highlights, ...(tour.tags ?? []),
      ...tour.itinerary.flatMap((day) => [day.title, day.description])].join(' ').toLowerCase();
    return terms.some((term) => text.includes(term));
  });
}

/** Published snapshot version for diagnostics and downstream receipts. */
export async function getPublishedTourCatalogVersion(): Promise<number | null> {
  return (await readPublishedCatalog())?.version ?? null;
}
