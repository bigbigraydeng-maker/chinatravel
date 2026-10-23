// Page copy for the Chengdu, Xi'an and Guilin destination hubs.
// Moved out of seo-pages.ts when the hubs were rebuilt around real itineraries; seo-pages.ts re-exports these.
// Prices in FAQ answers are read from tours.ts so they cannot drift; the meta descriptions carry literal prices,
// which destination-hubs.test.ts checks against tours.ts.

import type { CityHubMeta } from './seo-pages';
import type { Tour } from './tours';
import { resolvePublishedTourCopyTokens } from './tour-copy';

const fact = (field: 'PRICE' | 'NAME' | 'DURATION', tier: 'signature' | 'discovery' | 'stopover', slug: string): string =>
  `[[TOUR_${field}:${tier}:${slug}]]`;

/** Fill tour-derived prices in city-hub SEO copy from the same published catalog as the cards. */
export function cityHubMetaForTours(meta: CityHubMeta, tours: Tour[]): CityHubMeta {
  const resolve = (text: string) => resolvePublishedTourCopyTokens(text, tours);
  return {
    ...meta,
    description: resolve(meta.description),
    introText: resolve(meta.introText),
    highlights: meta.highlights.map(resolve),
    faqs: meta.faqs.map((faq) => ({ ...faq, answer: resolve(faq.answer) })),
  };
}

export const chengduToursMeta: CityHubMeta = {
  slug: 'chengdu-tours',
  cityName: 'Chengdu',
  title: 'Chengdu Tours from New Zealand | Giant Pandas | CTS Tours',
  description:
    `Chengdu tours from New Zealand: scheduled group tours and a panda stopover from ${fact('PRICE', 'stopover', 'chengdu')}. See current routes, dates and prices.`,
  h1: 'Chengdu Tours from New Zealand',
  heroSubtitle: 'Meet giant pandas. Stroll Jinli Street and Kuanzhai Alley. Savour Sichuan cuisine.',
  introText:
    "Chengdu, the capital of Sichuan Province, is synonymous with China's most iconic animal: the giant panda. It is also a city of teahouses, old lanes and Sichuan cooking. This page shows every CTS trip that includes Chengdu, with prices, upcoming departure dates and the days you spend there.",
  searchTerms: ['chengdu', 'giant panda', 'panda'],
  highlights: [
    'Plan a visit to the Chengdu Research Base of Giant Panda Breeding; check the current linked itineraries for inclusion and timing',
    "Take tea at People's Park, then explore Jinli Street and Broad and Narrow (Kuanzhai) Alley",
    `See Wuhou Shrine and Jinli Ancient Street on ${fact('NAME', 'signature', 'landscapes')}`,
    'Explore Sichuan cuisine and Chengdu sights; check each current itinerary for included visits and meals',
    'Visit the Dujiangyan Irrigation System; check the current tour itineraries for timing',
  ],
  bestTimeToVisit:
    'Spring (March-May) and autumn (September-October) are ideal. Summers are hot and humid, while winters are cold and often cloudy.',
  faqs: [
    {
      question: 'Is the giant panda base part of every Chengdu tour?',
      answer:
        'The live day-by-day itinerary on each tour page shows whether the Chengdu Research Base of Giant Panda Breeding is included and which day it falls on.',
    },
    {
      question: 'How much does a Chengdu tour from New Zealand cost?',
      answer: `The Chengdu stopover is ${fact('DURATION', 'stopover', 'chengdu')} and costs ${fact('PRICE', 'stopover', 'chengdu')} (land only; airfare is not included). Group tours that include Chengdu start at ${fact('PRICE', 'signature', 'landscapes')} for ${fact('NAME', 'signature', 'landscapes')} (${fact('DURATION', 'signature', 'landscapes')}). Check the live tour page for its current itinerary and inclusions.`,
    },
    {
      question: 'How many days do I need in Chengdu?',
      answer:
        `The stopover duration is ${fact('DURATION', 'stopover', 'chengdu')}. Group tours may include Chengdu as one part of a longer route; check each current itinerary for the day count.`,
    },
    {
      question: 'Can I add Chengdu to a longer China trip?',
      answer:
        'Some scheduled China tours include Chengdu. The cards and linked itineraries on this page show the currently published options, dates and inclusions.',
    },
    {
      question: 'Is Sichuan food too spicy?',
      answer:
        'Sichuan cooking is known for "ma la", a numbing-spicy flavour from Sichuan peppercorns. Our Sichuan food guide explains what to try.',
    },
  ],
};

export const xianToursMeta: CityHubMeta = {
  slug: 'xian-tours',
  cityName: "Xi'an",
  title: "Xi'an Tours NZ | Terracotta Warriors | CTS Tours",
  description:
    `Xi'an tours from New Zealand: scheduled group tours and a Terracotta Warriors stopover from ${fact('PRICE', 'stopover', 'xian')}. See current itineraries and dates.`,
  h1: "Xi'an Tours from New Zealand",
  heroSubtitle: 'Marvel at the Terracotta Warriors. Visit the ancient City Wall. Taste the Muslim Quarter.',
  introText:
    "Xi'an (also spelled Xian), once the capital of multiple Chinese dynasties, is home to one of the world's greatest archaeological discoveries: the Terracotta Warriors. The city also has a 14th-century City Wall, Tang-dynasty pagodas and the street food of the Muslim Quarter. This page lists every CTS trip that includes Xi'an, with prices, departure dates and the days you spend there.",
  searchTerms: ["xi'an", 'xian', 'terracotta warriors'],
  highlights: [
    'Plan a visit to the Terracotta Warriors; check current tour itineraries for visit length and included exhibitions',
    "Visit the ancient City Wall that encircles Xi'an's historic centre",
    'Visit the Big Wild Goose Pagoda, the earliest and largest surviving square brick pagoda of the Tang Dynasty',
    "Stroll Huimin Street, Xi'an's Muslim Quarter, lined with street food stalls and artisan shops",
        "Explore Xi'an food and culture; check the current stopover itinerary for included experiences",
    'Visit the Shaanxi History Museum and the Small Wild Goose Pagoda Museum',
  ],
  bestTimeToVisit:
    'Spring (April-May) and autumn (September-October) offer ideal weather. Summer is hot, and winter can be cold.',
  faqs: [
    {
      question: 'How much time do I need for the Terracotta Warriors?',
      answer:
        'The live day-by-day itinerary on each tour page shows how much time is scheduled at the Terracotta Warriors.',
    },
    {
      question: "How much does a Xi'an tour from New Zealand cost?",
      answer: `The Xi'an stopover is ${fact('DURATION', 'stopover', 'xian')} and costs ${fact('PRICE', 'stopover', 'xian')} (land only; airfare is not included). ${fact('NAME', 'discovery', 'beijing-xian')} (${fact('DURATION', 'discovery', 'beijing-xian')}) is ${fact('PRICE', 'discovery', 'beijing-xian')}; ${fact('NAME', 'signature', 'silk-road')} (${fact('DURATION', 'signature', 'silk-road')}) is ${fact('PRICE', 'signature', 'silk-road')}. Check each live tour page for its current route and inclusions.`,
    },
    {
      question: 'What is the Muslim Quarter?',
      answer:
        "Huimin Street is Xi'an's famous Muslim Quarter, lined with street food stalls and artisan shops. Check each live tour itinerary for its current visit day.",
    },
    {
      question: "Is Xi'an a good starting point for the Silk Road?",
      answer:
        "Yes. Xi'an was the ancient starting point of the Silk Road. The live Silk Road tour page shows its current duration, route and starting point.",
    },
    {
      question: "Can I visit Xi'an as part of a Beijing trip?",
      answer:
        "Some published itineraries connect Beijing and Xi'an. Check the current linked tour pages for routing and transport details.",
    },
  ],
};

export const guilinToursMeta: CityHubMeta = {
  slug: 'guilin-tours',
  cityName: 'Guilin',
  title: 'Guilin Tours from New Zealand | Li River Cruise | CTS Tours',
  description:
    `Guilin tours from New Zealand: Li River cruise, Yangshuo and current itineraries. Stopovers from ${fact('PRICE', 'stopover', 'guilin')}; see routes and dates on each tour page.`,
  h1: 'Guilin Tours from New Zealand',
  heroSubtitle: 'Cruise the Li River. See karst peaks and Reed Flute Cave. Spend time in Yangshuo.',
  introText:
    "Guilin, in southern China's Guangxi region, is famous for limestone karst mountains rising beside the Li River. This page lists the currently published CTS trips that include Guilin, with their prices, departure dates and itineraries.",
  searchTerms: ['guilin', 'li river', 'yangshuo'],
  highlights: [
    'Cruise the Li River to Yangshuo through karst mountain scenery; check current itineraries for timing',
    'Explore Reed Flute Cave and see Elephant Trunk Hill',
    "Explore Yangshuo's local market and karst countryside; check current itineraries for included activities",
    "Explore Longsheng, the Longji area and local villages; check the current tour itinerary for inclusions",
    'See the current China Panorama itinerary for its Guilin and Yangshuo activities',
    'Check the China Panorama itinerary for its current Guilin visits',
  ],
  bestTimeToVisit:
    'Spring (March-May) and autumn (September-October) are perfect: clear skies, comfortable temperatures, and water levels ideal for cruising. Summer is hot and humid. Winter is cool but may have mist obscuring mountain views.',
  faqs: [
    {
      question: 'What is the Li River cruise like?',
      answer:
        'The linked tour pages show whether a Li River cruise is included and how much time is scheduled for it.',
    },
    {
      question: 'Should I visit Guilin or Yangshuo?',
      answer:
        'The current itineraries show which trips include Guilin, Yangshuo and the Li River cruise, with the planned time at each stop.',
    },
    {
      question: 'How much does a Guilin tour from New Zealand cost?',
      answer: `The ${fact('DURATION', 'stopover', 'guilin')} Guilin stopover is ${fact('PRICE', 'stopover', 'guilin')}, and ${fact('NAME', 'stopover', 'guilin-surrounds')} (${fact('DURATION', 'stopover', 'guilin-surrounds')}) is ${fact('PRICE', 'stopover', 'guilin-surrounds')}. The live tour pages show current inclusions and flight arrangements. ${fact('NAME', 'signature', 'grand-tour')} (${fact('DURATION', 'signature', 'grand-tour')}) is ${fact('PRICE', 'signature', 'grand-tour')}.`,
    },
  ],
};
