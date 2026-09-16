import type { Tour } from '@/lib/data/tours';
import { getGuideBySlug } from '@/lib/data/guides';
import { extractRouteFromItinerary } from '@/lib/itinerary-map/extractRouteFromItinerary';
import { normalizeCity } from '@/lib/tour-discovery';

export const experienceGuidePaths: Record<string, string> = {
  'great-wall': '/great-wall-travel-guide',
  terracotta: '/terracotta-warriors-travel-guide',
  pandas: '/chengdu-travel-guide',
  'avatar-mountains': '/zhangjiajie-travel-guide',
  'river-cruise': '/shanghai-travel-guide',
  'imperial-beijing': '/forbidden-city-travel-guide',
};
const images: Record<string, string> = {
  beijing: 'spotlight-temple-landscape', shanghai: 'search-bund', hangzhou: 'planner-westlake',
  'great-wall': 'experience-wall', 'terracotta-warriors': 'tour-terracotta',
  'forbidden-city': 'planner-palace',
};
const landmarks = [
  { city: 'beijing', slug: 'great-wall', match: /great wall/i },
  { city: 'beijing', slug: 'forbidden-city', match: /forbidden city/i },
  { city: 'xian', slug: 'terracotta-warriors', match: /terracotta/i },
  { city: 'guilin', slug: 'li-river', match: /li river/i },
  { city: 'chengdu', slug: 'leshan-buddha', match: /leshan/i },
  { city: 'zhangjiajie', slug: 'tianmen-mountain', match: /tianmen/i },
];

/** Only existing guides supported by the tour's cities and itinerary are promoted. */
export function getTourGuideCards(tour: Tour) {
  if (tour.destination !== 'china') return [];
  const cities = [...new Set((tour.tourCities?.length ? tour.tourCities :
    extractRouteFromItinerary(tour.itinerary)?.stops.map(s => s.cityId) ?? []).map(normalizeCity))];
  const text = [...tour.highlights, ...tour.itinerary.map(d => `${d.title} ${d.description}`)].join(' ');
  const slugs = cities.flatMap(city => [city === 'shangrila' ? 'shangri-la' : city,
    ...landmarks.filter(l => l.city === city && l.match.test(text)).map(l => l.slug)]);
  return [...new Set(slugs)].flatMap(slug => {
    const guide = getGuideBySlug(`${slug}-travel-guide`);
    return guide ? [{ href: `/${guide.slug}`, title: guide.destinationName,
      image: images[slug] ? `/images/cts-upgrade/${images[slug]}.webp` : guide.heroImage,
      category: landmarks.some(l => l.slug === slug) ? 'Landmark guide' : 'Destination guide',
    }] : [];
  }).slice(0, 6);
}
