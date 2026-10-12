// Destination hub content for Chengdu, Xi'an and Guilin (/chengdu-tours, /xian-tours, /guilin-tours).
//
// Everything that can drift (prices, durations, dates, which day a city appears on) is read from
// tours.ts at render time, so a departure or price edit there flows to these pages. Hand-written prose
// below only restates what the tour itineraries and existing guide pages already say.

import { getTourBySlug, type DayItinerary, type Tour } from '@/lib/data/tours';
import { computeReturnDate } from '@/lib/data/tour-dates';
import { departures, priceNumber, tourUrl } from '@/lib/tour-discovery';

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
  sampleHeading: string;
  sampleIntro: string;
  prose: HubProseSection[];
}

const link = (text: string, href: string): RichPart => ({ text, href });

/** Lowest listed price, e.g. "from NZD $945", for the sidebar "Starting From" fact. */
export function cheapestPrice(tours: Tour[]): string | undefined {
  const priced = tours.map((t) => ({ t, n: priceNumber(t.price) })).filter((x) => x.n !== null);
  if (priced.length === 0) return undefined;
  return priced.reduce((a, b) => ((b.n as number) < (a.n as number) ? b : a)).t.price;
}

export function resolveHubTours(refs: TourRef[]): Tour[] {
  return refs.flatMap((ref) => {
    const tour = getTourBySlug('china', ref.tier, ref.slug);
    return tour && tour.isActive && !tour.soldOut ? [tour] : [];
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

export function buildSampleItinerary(config: DestinationHubConfig): HubSampleItinerary | null {
  const tour = getTourBySlug('china', config.sampleRef.tier, config.sampleRef.slug);
  if (!tour || !tour.isActive) return null;
  return {
    heading: config.sampleHeading,
    intro: config.sampleIntro,
    tourName: tour.name,
    tourHref: tourUrl(tour),
    price: tour.price,
    days: tour.itinerary,
    inclusions: tour.inclusions,
    exclusions: tour.exclusions,
  };
}

const price = (tier: TourTier, slug: string): string => getTourBySlug('china', tier, slug)?.price.replace(/^From/, 'from') ?? '';

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
  sampleHeading: 'A 3-day Chengdu itinerary',
  sampleIntro:
    'The stopover is our shortest way to see Chengdu: a guide meets you at the airport and the days below are set out in full on the tour page.',
  prose: [
    {
      heading: 'Three ways to see Chengdu with CTS',
      paragraphs: [
        [
          'The quickest is the ',
          link('3-day Chengdu stopover', '/tours/china/stopover/chengdu'),
          ` (${price('stopover', 'chengdu')}, land only, so airfare is not included). It covers the Giant Panda Breeding and Research Centre, tea at People's Park, Jinli Street and Broad and Narrow Alley, then the Dujiangyan Irrigation System on departure day.`,
        ],
        [
          'Chengdu also sits inside three of our Signature group tours, which include international and domestic flights. On ',
          link('Natural China', '/tours/china/signature/landscapes'),
          " (16 days) you take the high-speed train from Chongqing, see Wuhou Shrine and Jinli Ancient Street, then spend a day at the panda base, People's Park, Taikoo Li and Kuanzhai Alley before continuing to Zhangjiajie.",
        ],
        [
          'On ',
          link('Legacy of China', '/tours/china/signature/imperial-heritage'),
          ' (17 days) Chengdu follows Lhasa: a Sichuan dinner, then the panda base before the train to Chongqing and the Yangtze cruise. On ',
          link('China Panorama', '/tours/china/signature/grand-tour'),
          " (27 days) you arrive from Chongqing by high-speed train and visit the Panda Breeding Base, People's Park, Wide & Narrow Alleys and Taikoo Li before an evening flight to Dali.",
        ],
      ],
    },
    {
      heading: 'Choosing your Chengdu trip',
      paragraphs: [
        [
          'Short on time, or already have flights booked? Start with the stopover. Want a river cruise as well? All three group tours include one: the Three Gorges on Natural China (which then goes on to Zhangjiajie), the Yangtze on Legacy of China and China Panorama. Still deciding between Sichuan and Chongqing? Read ',
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
    { tier: 'discovery', slug: 'china-icons-collection' },
    { tier: 'discovery', slug: 'china-icons-collection-christchurch' },
  ],
  /** First N tours are shown as cards; the rest sit in a collapsed list. */
  featuredCount: 4,
  offerSummary:
    'trips from New Zealand: a land-only stopover, plus group tours with flights from Auckland included. Pricing is in NZD, with English-speaking guides',
  cityPattern: /xi.?an/i,
  sampleRef: { tier: 'discovery', slug: 'beijing-xian' },
  sampleHeading: 'A 10-day Beijing and Xi\'an itinerary',
  sampleIntro:
    'A Tale of Two Cities is our shortest group tour that includes Xi\'an: Beijing first, then the high-speed train to Xi\'an for the last four days.',
  prose: [
    {
      heading: 'Where Xi\'an fits in our trips',
      paragraphs: [
        [
          'Xi\'an is the home of the Terracotta Warriors, and you can reach it on several of our trips. The ',
          link('3-day Xi\'an stopover', '/tours/china/stopover/xian'),
          ` (${price('stopover', 'xian')}, land only, so airfare is not included) covers the Terracotta Warriors, the Muslim Quarter, the Great Mosque, the Shaanxi History Museum and a dumpling banquet with a cultural show.`,
        ],
        [
          'For a first trip, ',
          link('A Tale of Two Cities', '/tours/china/discovery/beijing-xian'),
          ' (10 days) takes the high-speed train from Beijing to Xi\'an for the Terracotta Warriors, the City Wall, the Big Wild Goose Pagoda and Huimin Street. ',
          link('Best of China', '/tours/china/discovery/essentials'),
          ' (15 days) and ',
          link('Golden China', '/tours/china/discovery/golden-china'),
          ' (12 days) add Shanghai after Xi\'an (Best of China also stops in Hangzhou).',
        ],
        [
          'On the ',
          link('Silk Road tour', '/tours/china/signature/silk-road'),
          ' (18 days) Xi\'an is the starting point, before the route heads west to Lanzhou, Dunhuang, Turpan and Urumqi. ',
          link('Legacy of China', '/tours/china/signature/imperial-heritage'),
          ' and ',
          link('China Panorama', '/tours/china/signature/grand-tour'),
          ' also stop in Xi\'an for the Terracotta Warriors and the City Wall.',
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
    'trips from New Zealand: land-only stopovers, plus the 27-day China Panorama group tour with flights from Auckland included. Pricing is in NZD, with English-speaking guides',
  cityPattern: /guilin|yangshuo|li river/i,
  sampleRef: { tier: 'stopover', slug: 'guilin' },
  sampleHeading: 'A 3-day Guilin itinerary',
  sampleIntro: 'The Guilin stopover puts the Li River cruise at the centre of the trip. The days below are set out in full on the tour page.',
  prose: [
    {
      heading: 'Guilin on a short stay or a long tour',
      paragraphs: [
        [
          'In our programme Guilin is mostly a short-stay destination. The ',
          link('3-day Guilin stopover', '/tours/china/stopover/guilin'),
          ` (${price('stopover', 'guilin')}, land only, so airfare is not included) is built around a 5–6 hour Li River cruise to Yangshuo, with Reed Flute Cave and Elephant Trunk Hill on the last day.`,
        ],
        [
          'The ',
          link('4-day Guilin & Surrounds stopover', '/tours/china/stopover/guilin-surrounds'),
          ` (${price('stopover', 'guilin-surrounds')}, also land only) adds a full day at Longsheng, with the Longji terraces and Zhuang and Yao villages, then a Li River cruise and time in Yangshuo.`,
        ],
        [
          'Guilin also appears on our group tour ',
          link('China Panorama', '/tours/china/signature/grand-tour'),
          ' (27 days, flights from Auckland included): you fly in from Kunming, cruise the Li River to Yangshuo, spend a day there with a morning Tai Chi session, a countryside tour and cormorant fishing, and return to Guilin for Elephant Trunk Hill, Reed Flute Cave and the Sun & Moon Pagodas.',
        ],
      ],
    },
    {
      heading: 'Short stop or whole-of-China?',
      paragraphs: [
        [
          'Want the Li River without committing to a long tour? Choose a stopover; the 4-day Guilin & Surrounds trip adds the rice terraces. Want Guilin as one part of a whole-of-China journey? China Panorama is the only group tour that includes it. For anything else, ask us about a ',
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
