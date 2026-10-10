import type { DayItinerary, Tour } from '@/lib/data/tours';

export interface TourFeedFaq {
  question: string;
  answer: string;
  link: { href: string; label: string } | null;
}

/**
 * Wire shape of one tour in the internal read-only feed (snake_case).
 * Optional `Tour` fields are normalised so every key is always present:
 * missing list -> [], missing map -> {}, missing scalar -> null, missing flag -> false.
 */
export interface TourFeedProduct {
  id: string;
  slug: string;
  destination: Tour['destination'];
  tier: Tour['tier'];
  name: string;
  title: string;
  duration: string;
  price: string;
  is_active: boolean;
  updated_at: string;
  departure_dates: string[];
  departure_pricing: Record<string, string>;
  tour_cities: string[];
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  single_supplement: string | null;
  max_group_size: number | null;
  created_at: string;
  short_description: string;
  highlights: string[];
  hero_image: string;
  gallery: string[];
  meta_title: string;
  meta_description: string;
  tags: string[];
  faqs: TourFeedFaq[];
  sold_out: boolean;
  single_supplement_note: string | null;
  rating: number | null;
  review_count: number | null;
  review_summary: string | null;
  related_blog_slugs: string[];
  quick_answer: string | null;
}

export function tourToFeed(tour: Tour): TourFeedProduct {
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
    created_at: tour.createdAt,
    short_description: tour.shortDescription,
    highlights: tour.highlights,
    hero_image: tour.heroImage,
    gallery: tour.gallery,
    meta_title: tour.metaTitle,
    meta_description: tour.metaDescription,
    tags: tour.tags ?? [],
    faqs: (tour.faqs ?? []).map((faq) => ({
      question: faq.question,
      answer: faq.answer,
      link: faq.link ?? null,
    })),
    sold_out: tour.soldOut ?? false,
    single_supplement_note: tour.singleSupplementNote ?? null,
    rating: tour.rating ?? null,
    review_count: tour.reviewCount ?? null,
    review_summary: tour.reviewSummary ?? null,
    related_blog_slugs: tour.relatedBlogSlugs ?? [],
    quick_answer: tour.quickAnswer ?? null,
  };
}

/**
 * Inverse of `tourToFeed`. Normalised "absent" values ([], {}, null, false)
 * become omitted optional fields, so `tourToFeed(feedToTour(x))` deep-equals `x`.
 * It cannot tell "not written" from "written as [] / false" in the source data.
 */
export function feedToTour(product: TourFeedProduct): Tour {
  const tour: Tour = {
    id: product.id,
    slug: product.slug,
    destination: product.destination,
    tier: product.tier,
    name: product.name,
    title: product.title,
    shortDescription: product.short_description,
    duration: product.duration,
    price: product.price,
    heroImage: product.hero_image,
    gallery: product.gallery,
    highlights: product.highlights,
    itinerary: product.itinerary,
    inclusions: product.inclusions,
    exclusions: product.exclusions,
    metaTitle: product.meta_title,
    metaDescription: product.meta_description,
    isActive: product.is_active,
    createdAt: product.created_at,
    updatedAt: product.updated_at,
  };

  if (product.sold_out) tour.soldOut = true;
  if (product.tags.length > 0) tour.tags = product.tags;
  if (product.departure_dates.length > 0) tour.departureDates = product.departure_dates;
  if (Object.keys(product.departure_pricing).length > 0) {
    tour.departurePricing = product.departure_pricing;
  }
  if (product.tour_cities.length > 0) tour.tourCities = product.tour_cities;
  if (product.faqs.length > 0) {
    tour.faqs = product.faqs.map((faq) =>
      faq.link === null
        ? { question: faq.question, answer: faq.answer }
        : { question: faq.question, answer: faq.answer, link: faq.link },
    );
  }
  if (product.single_supplement !== null) tour.singleSupplement = product.single_supplement;
  if (product.single_supplement_note !== null) {
    tour.singleSupplementNote = product.single_supplement_note;
  }
  if (product.rating !== null) tour.rating = product.rating;
  if (product.review_count !== null) tour.reviewCount = product.review_count;
  if (product.review_summary !== null) tour.reviewSummary = product.review_summary;
  if (product.related_blog_slugs.length > 0) tour.relatedBlogSlugs = product.related_blog_slugs;
  if (product.quick_answer !== null) tour.quickAnswer = product.quick_answer;
  if (product.max_group_size !== null) tour.maxGroupSize = product.max_group_size;

  return tour;
}
