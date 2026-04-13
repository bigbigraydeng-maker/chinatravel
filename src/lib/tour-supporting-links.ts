import type { Tour } from '@/lib/data/tours';
import { extractRouteFromItinerary } from '@/lib/itinerary-map/extractRouteFromItinerary';

export interface SupportingContentLink {
  label: string;
  href: string;
}

const PLANNING_LINKS: SupportingContentLink[] = [
  { label: 'China visa guide for New Zealanders', href: '/china-visa-guide-for-new-zealanders' },
  { label: 'Best time to visit China', href: '/best-time-to-visit-china' },
  { label: 'China tours from New Zealand', href: '/china-tours-from-new-zealand' },
];

/** City IDs from tourCities / itinerary map → hub + guide URLs (deduped later). */
const CITY_LINK_GROUPS: Record<string, SupportingContentLink[]> = {
  beijing: [
    { label: 'Beijing tours', href: '/beijing-tours' },
    { label: 'Beijing travel guide', href: '/beijing-travel-guide' },
  ],
  xian: [
    { label: 'Xi’an tours', href: '/xian-tours' },
    { label: 'Xi’an travel guide', href: '/xian-travel-guide' },
  ],
  shanghai: [
    { label: 'Shanghai tours', href: '/shanghai-tours' },
    { label: 'Shanghai travel guide', href: '/shanghai-travel-guide' },
  ],
  hangzhou: [
    { label: 'Hangzhou travel guide', href: '/hangzhou-travel-guide' },
  ],
  suzhou: [
    { label: 'Suzhou travel guide', href: '/suzhou-travel-guide' },
  ],
  wuxi: [
    { label: 'Shanghai & Jiangnan hub', href: '/shanghai-tours' },
  ],
  nanjing: [
    { label: 'Shanghai & eastern China tours', href: '/shanghai-tours' },
  ],
  puyuan: [
    { label: 'Hangzhou travel guide', href: '/hangzhou-travel-guide' },
  ],
  xinshi: [
    { label: 'Suzhou travel guide', href: '/suzhou-travel-guide' },
  ],
  guilin: [
    { label: 'Guilin tours', href: '/guilin-tours' },
    { label: 'Guilin travel guide', href: '/guilin-travel-guide' },
  ],
  yangshuo: [
    { label: 'Yangshuo travel guide', href: '/yangshuo-travel-guide' },
  ],
  chengdu: [
    { label: 'Chengdu tours', href: '/chengdu-tours' },
    { label: 'Chengdu travel guide', href: '/chengdu-travel-guide' },
  ],
  chongqing: [
    { label: 'Chongqing travel guide', href: '/chongqing-travel-guide' },
  ],
  zhangjiajie: [
    { label: 'Zhangjiajie tours', href: '/zhangjiajie-tours' },
    { label: 'Zhangjiajie travel guide', href: '/zhangjiajie-travel-guide' },
  ],
  lijiang: [
    { label: 'Lijiang travel guide', href: '/lijiang-travel-guide' },
  ],
  dali: [
    { label: 'Dali travel guide', href: '/dali-travel-guide' },
  ],
  kunming: [
    { label: 'Kunming travel guide', href: '/kunming-travel-guide' },
  ],
  yunnan: [
    { label: 'Yunnan tours', href: '/yunnan-tours' },
    { label: 'Yunnan travel guide', href: '/yunnan-travel-guide' },
  ],
  hongkong: [{ label: 'China tours hub', href: '/china-tours' }],
};

const HUB_FALLBACK: SupportingContentLink = { label: 'China tours hub', href: '/china-tours' };

function cityLinksFor(id: string): SupportingContentLink[] {
  const direct = CITY_LINK_GROUPS[id];
  if (direct?.length) return direct;
  return [];
}

/**
 * Contextual internal links to SEO guides and destination hubs for a tour product page.
 * Dedupes by href; caps list length for readable UI.
 */
export function getTourSupportingLinks(tour: Tour, maxLinks = 10): SupportingContentLink[] {
  if (tour.destination !== 'china') {
    return [{ label: `${tour.destination.charAt(0).toUpperCase() + tour.destination.slice(1)} tours`, href: `/tours/${tour.destination}` }];
  }

  const cityIds = new Set<string>();
  if (tour.tourCities?.length) {
    tour.tourCities.forEach((c) => cityIds.add(c));
  } else {
    const route = extractRouteFromItinerary(tour.itinerary);
    route?.stops.forEach((s) => cityIds.add(s.cityId));
  }

  const out: SupportingContentLink[] = [];
  const seen = new Set<string>();

  const push = (items: SupportingContentLink[]) => {
    for (const item of items) {
      if (seen.has(item.href)) continue;
      seen.add(item.href);
      out.push(item);
      if (out.length >= maxLinks) return;
    }
  };

  push(PLANNING_LINKS);

  const sortedCities = Array.from(cityIds).sort();
  for (const id of sortedCities) {
    if (out.length >= maxLinks) break;
    push(cityLinksFor(id));
  }

  if (!seen.has(HUB_FALLBACK.href) && out.length < maxLinks) {
    push([HUB_FALLBACK]);
  }

  return out.slice(0, maxLinks);
}
