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
  { city: 'beijing', slug: 'temple-of-heaven', match: /temple of heaven/i },
  { city: 'xian', slug: 'terracotta-warriors', match: /terracotta/i },
  { city: 'xian', slug: 'xian-city-wall', match: /(?:xi'?an )?city wall/i },
  { city: 'xian', slug: 'big-wild-goose-pagoda', match: /(?:big )?wild goose pagoda/i },
  { city: 'hangzhou', slug: 'west-lake', match: /west lake/i },
  { city: 'shanghai', slug: 'yu-garden', match: /yu\s?yuan|yu garden/i },
  { city: 'shanghai', slug: 'the-bund', match: /(?:the )?bund/i },
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
  const citySlugs = cities.map(city => city === 'shangrila' ? 'shangri-la' : city);
  const matchedLandmarks = cities.map(city =>
    landmarks.filter(landmark => landmark.city === city && landmark.match.test(text)).map(landmark => landmark.slug));
  const landmarkSlugs = [
    ...matchedLandmarks.flatMap(matches => matches.slice(0, 1)),
    ...matchedLandmarks.flatMap(matches => matches.slice(1)),
  ];
  // Preserve the tour's destination coverage first, then use remaining card
  // slots for exact attractions mentioned in its itinerary. The first matched
  // landmark from each city comes before secondary landmarks from one city.
  const slugs = [...citySlugs, ...landmarkSlugs];
  return [...new Set(slugs)].flatMap(slug => {
    const guide = getGuideBySlug(`${slug}-travel-guide`);
    return guide ? [{ href: `/${guide.slug}`, title: guide.destinationName,
      image: images[slug] ? `/images/cts-upgrade/${images[slug]}.webp` : guide.heroImage,
      category: landmarks.some(l => l.slug === slug) ? 'Landmark guide' : 'Destination guide',
    }] : [];
  }).slice(0, 6);
}
