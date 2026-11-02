// Destination hub content for Chengdu, Xi'an and Guilin (/chengdu-tours, /xian-tours, /guilin-tours).
//
// Everything that can drift (prices, durations, dates, which day a city appears on) is read from
// tours.ts at render time, so a departure or price edit there flows to these pages. Hand-written prose
// below only restates what the tour itineraries and existing guide pages already say.

import type { DayItinerary, Tour } from '@/lib/data/tours';
import { computeReturnDate } from '@/lib/data/tour-dates';
import { departures, priceNumber, tourUrl } from '@/lib/tour-discovery';
import { resolvePublishedTourCopyTokens } from '@/lib/data/tour-copy';

export type TourTier = 'signature' | 'discovery' | 'stopover';
export type TourRef = { tier: TourTier; slug: string };

/** A paragraph is a list of plain strings and inline links. */
export type RichPart = string | { text: string; href: string };
export interface HubProseSection {
  heading: string;
  paragraphs: RichPart[][];
}

export interface HubDepartureRow {
  slug: string;
  name: string;
  href: string;
  duration: string;
  price: string;
  cityDays: string | null;
  dates: Array<{ label: string; returnDate: string | null; price: string }>;
}

export interface HubSampleItinerary {
  heading: string;
  intro: string;
  tourName: string;
  tourHref: string;
  price: string;
  days: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
}

export interface DestinationHubConfig {
  featuredCount?: number;
  /** Quick-answer clause; stopovers are land only, so it must not promise flights for every trip. */
  offerSummary: string;
  /** Tours listed on the hub, in display order. */
  tourRefs: TourRef[];
  /** Matches itinerary day titles that mean "the traveller is in this city". */
  cityPattern: RegExp;
  /** Tour that supplies the day-by-day sample itinerary. */
  sampleRef: TourRef;
  prose: HubProseSection[];
}

const link = (text: string, href: string): RichPart => ({ text, href });

/** Lowest listed price, e.g. "from NZD $945", for the sidebar "Starting From" fact. */
export function cheapestPrice(tours: Tour[]): string | undefined {
  const priced = tours.map((t) => ({ t, n: priceNumber(t.price) })).filter((x) => x.n !== null);
  if (priced.length === 0) return undefined;
  return priced.reduce((a, b) => ((b.n as number) < (a.n as number) ? b : a)).t.price;
}

export function resolveHubTours(refs: TourRef[], tourList: Tour[], cityPattern?: RegExp): Tour[] {
  const keys = new Set(refs.map((ref) => `${ref.tier}/${ref.slug}`));
  return tourList.filter((tour) => {
    if (tour.destination !== 'china' || !tour.isActive || tour.soldOut) return false;
    if (keys.has(`${tour.tier}/${tour.slug}`)) return true;
    if (!cityPattern) return false;
    return (tour.tourCities ?? []).some((city) => cityPattern.test(city)) ||
      tour.itinerary.some((day) => cityPattern.test(day.title));
  });
}

/** "Days 10–11" for the itinerary days whose title names the city; null when none do. */
export function cityDayRange(tour: Tour, pattern: RegExp): string | null {
  const days = tour.itinerary.filter((d) => pattern.test(d.title)).map((d) => d.day);
  if (days.length === 0) return null;
  const first = days[0];
  const last = days[days.length - 1];
  return first === last ? `Day ${first}` : `Days ${first}–${last}`;
}

/** Group tours that still have an upcoming departure on file. Land-only stopovers have no fixed dates. */
export function buildDepartureRows(tours: Tour[], pattern: RegExp): HubDepartureRow[] {
  return tours.flatMap((tour) => {
    const upcoming = departures(tour);
    if (upcoming.length === 0) return [];
    return [
      {
        slug: tour.slug,
        name: tour.name,
        href: tourUrl(tour),
        duration: tour.duration,
        price: tour.price,
        cityDays: cityDayRange(tour, pattern),
        dates: upcoming.map((d) => ({ label: d.label, returnDate: computeReturnDate(d.label, tour.duration), price: d.price })),
      },
    ];
  });
}

export function buildSampleItinerary(config: DestinationHubConfig, tourList: Tour[]): HubSampleItinerary | null {
  const preferred = tourList.find((item) => item.destination === 'china' && item.tier === config.sampleRef.tier && item.slug === config.sampleRef.slug);
  const tour = preferred?.isActive && !preferred.soldOut ? preferred : tourList.find((item) => item.destination === 'china' && item.isActive && !item.soldOut &&
    ((item.tourCities ?? []).some((city) => config.cityPattern.test(city)) || item.itinerary.some((day) => config.cityPattern.test(day.title))));
  if (!tour || !tour.isActive) return null;
  return {
    heading: `${tour.name} — current itinerary`,
    intro: 'This day-by-day plan comes from the latest published tour record.',
    tourName: tour.name,
    tourHref: tourUrl(tour),
    price: tour.price,
    days: tour.itinerary,
    inclusions: tour.inclusions,
    exclusions: tour.exclusions,
  };
}

const price = (tier: TourTier, slug: string): string => `[[TOUR_PRICE:${tier}:${slug}]]`;

/** Resolve tour prices embedded in the site's explanatory copy from the published feed. */
export function hubProseForTours(config: DestinationHubConfig, tourList: Tour[]): HubProseSection[] {
  return config.prose.map((section) => ({
    ...section,
    paragraphs: section.paragraphs.map((paragraph) => paragraph.map((part) => {
      if (typeof part === 'string') return resolvePublishedTourCopyTokens(part, tourList);
      return { ...part, text: resolvePublishedTourCopyTokens(part.text, tourList) };
    })),
  }));
}

export const chengduHub: DestinationHubConfig = {
  tourRefs: [
    { tier: 'signature', slug: 'landscapes' },
    { tier: 'signature', slug: 'imperial-heritage' },
    { tier: 'signature', slug: 'grand-tour' },
    { tier: 'stopover', slug: 'chengdu' },
  ],
  offerSummary:
    'trips from New Zealand: a land-only stopover, plus Signature group tours with flights from Auckland included. Pricing is in NZD, with English-speaking guides',
  cityPattern: /chengdu/i,
  sampleRef: { tier: 'stopover', slug: 'chengdu' },
  prose: [
    {
      heading: 'Three ways to see Chengdu with CTS',
      paragraphs: [
        [
          'The quickest is the ',
          link('[[TOUR_NAME:stopover:chengdu]]', '/tours/china/stopover/chengdu'),
          ` ([[TOUR_DURATION:stopover:chengdu]] · ${price('stopover', 'chengdu')}). See its live itinerary for current inclusions and day plans.`,
        ],
        [
          'Chengdu appears in the current published itinerary for ',
          link('[[TOUR_NAME:signature:landscapes]]', '/tours/china/signature/landscapes'),
          ' ([[TOUR_DURATION:signature:landscapes]]). Open the tour page for its current route, day-by-day plan and inclusions.',
        ],
        [
          'On ',
          link('[[TOUR_NAME:signature:imperial-heritage]]', '/tours/china/signature/imperial-heritage'),
          ' ([[TOUR_DURATION:signature:imperial-heritage]]) and ',
          link('[[TOUR_NAME:signature:grand-tour]]', '/tours/china/signature/grand-tour'),
          ' ([[TOUR_DURATION:signature:grand-tour]]) also appear in the published Chengdu listings. Their current routes and day plans are on each tour page.',
        ],
      ],
    },
    {
      heading: 'Choosing your Chengdu trip',
      paragraphs: [
        [
          'Short on time, or already have flights booked? Start with the stopover. Compare the currently published itineraries to see which include a river cruise and where they go next. Still deciding between Sichuan and Chongqing? Read ',
          link('Chongqing vs Chengdu', '/blog/chongqing-vs-chengdu'),
          ' first, or ask us for a ',
          link('tailor-made itinerary', '/tailor-made'),
          '.',
        ],
      ],
    },
    {
      heading: 'Before you go: Chengdu reading',
      paragraphs: [
        [
          'Our ',
          link('Chengdu travel guide', '/chengdu-travel-guide'),
          ' covers the city sights, the ',
          link('Panda Sanctuary visitor guide', '/chengdu-panda-sanctuary'),
          ' covers timing and what to expect at the base, and the ',
          link('Sichuan food guide', '/blog/chengdu-spicy-cuisine-culture'),
          ' explains the numbing-spicy flavours. Considering a day trip? See our ',
          link('Leshan Giant Buddha notes', '/blog/leshan-giant-buddha-day-trip'),
          '. Check current entry rules in our ',
          link('China visa guide for New Zealanders', '/china-visa-guide-for-new-zealanders'),
          ' before you book.',
        ],
      ],
    },
  ],
};

export const xianHub: DestinationHubConfig = {
  tourRefs: [
    { tier: 'discovery', slug: 'beijing-xian' },
    { tier: 'discovery', slug: 'essentials' },
    { tier: 'signature', slug: 'silk-road' },
    { tier: 'stopover', slug: 'xian' },
    { tier: 'signature', slug: 'imperial-heritage' },
    { tier: 'signature', slug: 'grand-tour' },
    { tier: 'discovery', slug: 'golden-china' },
  ],
  /** First N tours are shown as cards; the rest sit in a collapsed list. */
  featuredCount: 4,
  offerSummary:
    'trips from New Zealand: a land-only stopover, plus group tours with flights from Auckland included. Pricing is in NZD, with English-speaking guides',
  cityPattern: /xi.?an/i,
  sampleRef: { tier: 'discovery', slug: 'beijing-xian' },
  prose: [
    {
      heading: 'Where Xi\'an fits in our trips',
      paragraphs: [
        [
          'Xi\'an is the home of the Terracotta Warriors, and you can reach it on several of our trips. The ',
          link('[[TOUR_NAME:stopover:xian]]', '/tours/china/stopover/xian'),
          ` ([[TOUR_DURATION:stopover:xian]] · ${price('stopover', 'xian')}). See its live itinerary for current inclusions and day plans.`,
        ],
        [
          'For a first trip, ',
          link('[[TOUR_NAME:discovery:beijing-xian]]', '/tours/china/discovery/beijing-xian'),
          ' ([[TOUR_DURATION:discovery:beijing-xian]]), ',
          link('[[TOUR_NAME:discovery:essentials]]', '/tours/china/discovery/essentials'),
          ' ([[TOUR_DURATION:discovery:essentials]]), and ',
          link('[[TOUR_NAME:discovery:golden-china]]', '/tours/china/discovery/golden-china'),
          ' ([[TOUR_DURATION:discovery:golden-china]]) all have current itineraries linked here. Compare the tour pages for their latest stops.',
        ],
        [
          'On the ',
          link('[[TOUR_NAME:signature:silk-road]]', '/tours/china/signature/silk-road'),
          ' ([[TOUR_DURATION:signature:silk-road]]) and the current ',
          link('[[TOUR_NAME:signature:imperial-heritage]]', '/tours/china/signature/imperial-heritage'),
          ' and ',
          link('[[TOUR_NAME:signature:grand-tour]]', '/tours/china/signature/grand-tour'),
          ' itineraries show their current Xi\'an stops and routes.',
        ],
      ],
    },
    {
      heading: 'Picking a Xi\'an trip',
      paragraphs: [
        [
          'Short on time or building around your own flights? The stopover. First time in China and happy to travel by high-speed train? A Tale of Two Cities. Want Xi\'an as the gateway to the ancient trade route? The Silk Road tour. If none fits, ',
          link('tailor-made', '/tailor-made'),
          ' is the other option.',
        ],
      ],
    },
    {
      heading: 'More on Xi\'an before you book',
      paragraphs: [
        [
          'Start with our ',
          link('Xi\'an travel guide', '/xian-travel-guide'),
          ', then read the ',
          link('Terracotta Warriors visitor guide', '/terracotta-warriors-travel-guide'),
          ' and the ',
          link('City Wall guide', '/xian-city-wall-travel-guide'),
          '.',
        ],
        [
          'For the food, see ',
          link('Xi\'an street food', '/blog/xian-street-food-adventure'),
          '. Travelling from Beijing? Our ',
          link('Beijing to Xi\'an train notes', '/blog/beijing-to-xian-high-speed-train'),
          ' explain the route, and the ',
          link('10-day Beijing and Xi\'an itinerary', '/blog/beijing-xian-itinerary-10-days'),
          ' shows how the days fit together.',
        ],
        [
          'Check current entry rules in our ',
          link('China visa guide for New Zealanders', '/china-visa-guide-for-new-zealanders'),
          ' before you book.',
        ],
      ],
    },
  ],
};

export const guilinHub: DestinationHubConfig = {
  tourRefs: [
    { tier: 'signature', slug: 'grand-tour' },
    { tier: 'stopover', slug: 'guilin-surrounds' },
    { tier: 'stopover', slug: 'guilin' },
  ],
  offerSummary:
    'trips from New Zealand: land-only stopovers and scheduled group tours. Check each live tour page for current inclusions, dates and pricing.',
  cityPattern: /guilin|yangshuo|li river/i,
  sampleRef: { tier: 'stopover', slug: 'guilin' },
  prose: [
    {
      heading: 'Guilin on a short stay or a long tour',
      paragraphs: [
        [
          'The current short-stay option is ',
          link('[[TOUR_NAME:stopover:guilin]]', '/tours/china/stopover/guilin'),
          ` ([[TOUR_DURATION:stopover:guilin]] · ${price('stopover', 'guilin')}). See its live itinerary for current stops and inclusions.`,
        ],
        [
          'The ',
          link('[[TOUR_NAME:stopover:guilin-surrounds]]', '/tours/china/stopover/guilin-surrounds'),
          ` ([[TOUR_DURATION:stopover:guilin-surrounds]] · ${price('stopover', 'guilin-surrounds')}). See its live itinerary for current stops and inclusions.`,
        ],
        [
          'Guilin also appears on our group tour ',
          link('[[TOUR_NAME:signature:grand-tour]]', '/tours/china/signature/grand-tour'),
          ' ([[TOUR_DURATION:signature:grand-tour]]) includes the latest published Guilin itinerary. Check the linked page for current routing and inclusions.',
        ],
      ],
    },
    {
      heading: 'Short stop or whole-of-China?',
      paragraphs: [
        [
          'Want the Li River without committing to a longer tour? Compare the current Guilin stopovers. For Guilin as one part of a whole-of-China journey, check the current group tour listings. For anything else, ask us about a ',
          link('tailor-made itinerary', '/tailor-made'),
          '.',
        ],
      ],
    },
    {
      heading: 'Read next: Guilin and Yangshuo',
      paragraphs: [
        [
          'Our ',
          link('Guilin travel guide', '/guilin-travel-guide'),
          ' gives the overview, the ',
          link('Li River guide', '/li-river-travel-guide'),
          ' explains the cruise, and the ',
          link('Yangshuo guide', '/yangshuo-travel-guide'),
          ' covers cycling and the countryside. Travelling on from Chengdu? See our ',
          link('Chengdu tours', '/chengdu-tours'),
          '. Check current entry rules in our ',
          link('China visa guide for New Zealanders', '/china-visa-guide-for-new-zealanders'),
          ' before you book.',
        ],
      ],
    },
  ],
};
