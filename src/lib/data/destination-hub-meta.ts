// Page copy for the Chengdu, Xi'an and Guilin destination hubs.
// Moved out of seo-pages.ts when the hubs were rebuilt around real itineraries; seo-pages.ts re-exports these.
// Prices in FAQ answers are read from tours.ts so they cannot drift; the meta descriptions carry literal prices,
// which destination-hubs.test.ts checks against tours.ts.

import type { CityHubMeta } from './seo-pages';
import { getTourBySlug } from './tours';

const price = (tier: 'signature' | 'discovery' | 'stopover', slug: string): string =>
  getTourBySlug('china', tier, slug)?.price.replace(/^From/, 'from') ?? '';

export const chengduToursMeta: CityHubMeta = {
  slug: 'chengdu-tours',
  cityName: 'Chengdu',
  title: 'Chengdu Tours from New Zealand | Giant Pandas | CTS Tours',
  description:
    'Chengdu tours from New Zealand: a 3-day panda stopover from NZD $1,359, or Chengdu on 16-27 day group tours with flights included. Upcoming dates and prices.',
  h1: 'Chengdu Tours from New Zealand',
  heroSubtitle: 'Meet giant pandas. Stroll Jinli Street and Kuanzhai Alley. Savour Sichuan cuisine.',
  introText:
    "Chengdu, the capital of Sichuan Province, is synonymous with China's most iconic animal: the giant panda. It is also a city of teahouses, old lanes and Sichuan cooking. This page shows every CTS trip that includes Chengdu, with prices, upcoming departure dates and the days you spend there.",
  searchTerms: ['chengdu', 'giant panda', 'panda'],
  highlights: [
    'Visit the Chengdu Research Base of Giant Panda Breeding, included on every Chengdu itinerary below',
    "Take tea at People's Park, then explore Jinli Street and Broad and Narrow (Kuanzhai) Alley",
    'See Wuhou Shrine and Jinli Ancient Street on Natural China',
    'Ride the first-class high-speed train from Chongqing to Chengdu (1 hr 26 min on the reference service)',
    'Sit down to an authentic Sichuan dinner on Legacy of China and China Panorama',
    'See the Dujiangyan Irrigation System on the 3-day Chengdu stopover',
  ],
  bestTimeToVisit:
    'Spring (March-May) and autumn (September-October) are ideal. Summers are hot and humid, while winters are cold and often cloudy.',
  faqs: [
    {
      question: 'Is the giant panda base part of every Chengdu tour?',
      answer:
        "Yes. Every itinerary on this page includes the Chengdu Research Base of Giant Panda Breeding: day 2 of the 3-day stopover, day 11 of Natural China and Legacy of China, and day 13 of China Panorama.",
    },
    {
      question: 'How much does a Chengdu tour from New Zealand cost?',
      answer: `The 3-day Chengdu stopover is ${price('stopover', 'chengdu')} (land only; airfare is not included). Group tours that include Chengdu start at ${price('signature', 'landscapes')} for the 16-day Natural China, which includes return flights from Auckland, domestic flights, 4-5 star hotels, a guide, entrance fees and the meals listed in the itinerary. Tips and travel insurance are extra.`,
    },
    {
      question: 'How many days do I need in Chengdu?',
      answer:
        'Our Chengdu stopover is 3 days: arrival, a full day at the panda base and in the city, then the Dujiangyan Irrigation System on departure day. On our group tours Chengdu is a two-day stop within a longer route.',
    },
    {
      question: 'Can I add Chengdu to a longer China trip?',
      answer:
        'Yes. Chengdu is on Natural China (after Chongqing, before Zhangjiajie), Legacy of China (after Lhasa, before the Yangtze cruise) and China Panorama (after the Yangtze cruise, before Dali). Each is a Signature group tour with international and domestic flights included.',
    },
    {
      question: 'Is Sichuan food too spicy?',
      answer:
        'Sichuan cooking is known for "ma la", a numbing-spicy flavour from Sichuan peppercorns, which many visitors find interesting rather than painful. You can ask for "bu la" (not spicy) when ordering, and mild versions of most dishes exist. Our Sichuan food guide explains what to try.',
    },
  ],
};

export const xianToursMeta: CityHubMeta = {
  slug: 'xian-tours',
  cityName: "Xi'an",
  title: "Xi'an Tours NZ | Terracotta Warriors | CTS Tours",
  description:
    "Xi'an tours from New Zealand: Terracotta Warriors on a 3-day stopover from NZD $945, a 10-day Beijing and Xi'an tour, or longer group tours. Upcoming dates.",
  h1: "Xi'an Tours from New Zealand",
  heroSubtitle: 'Marvel at the Terracotta Warriors. Visit the ancient City Wall. Taste the Muslim Quarter.',
  introText:
    "Xi'an (also spelled Xian), once the capital of multiple Chinese dynasties, is home to one of the world's greatest archaeological discoveries: the Terracotta Warriors. The city also has a 14th-century City Wall, Tang-dynasty pagodas and the street food of the Muslim Quarter. This page lists every CTS trip that includes Xi'an, with prices, departure dates and the days you spend there.",
  searchTerms: ["xi'an", 'xian', 'terracotta warriors'],
  highlights: [
    'See the Terracotta Warriors, with the Circle Vision movie and Bronze Chariot exhibition on A Tale of Two Cities',
    "Visit the ancient City Wall that encircles Xi'an's historic centre",
    'Visit the Big Wild Goose Pagoda, the earliest and largest surviving square brick pagoda of the Tang Dynasty',
    "Stroll Huimin Street, Xi'an's Muslim Quarter, lined with street food stalls and artisan shops",
    "Enjoy a traditional dumpling banquet with a cultural show on the Xi'an stopover",
    'Visit the Shaanxi History Museum and the Small Wild Goose Pagoda Museum',
  ],
  bestTimeToVisit:
    'Spring (April-May) and autumn (September-October) offer ideal weather. Summer is hot, and winter can be cold.',
  faqs: [
    {
      question: 'How much time do I need for the Terracotta Warriors?',
      answer:
        'Plan around half a day. On A Tale of Two Cities the Terracotta Warriors fill the morning of day 7, and China Panorama gives them a full day (day 7).',
    },
    {
      question: "How much does a Xi'an tour from New Zealand cost?",
      answer: `The 3-day Xi'an stopover is ${price('stopover', 'xian')} (land only; airfare is not included). A Tale of Two Cities, 10 days from Beijing to Xi'an with international and domestic airfares included, is ${price('discovery', 'beijing-xian')}. The 18-day Silk Road tour is ${price('signature', 'silk-road')}.`,
    },
    {
      question: 'What is the Muslim Quarter?',
      answer:
        "Huimin Street is Xi'an's famous Muslim Quarter, lined with street food stalls and artisan shops. It is on the Xi'an stopover, A Tale of Two Cities (day 9) and China Panorama.",
    },
    {
      question: "Is Xi'an a good starting point for the Silk Road?",
      answer:
        "Yes. Xi'an was the ancient starting point of the Silk Road, and our 18-day Silk Road tour begins there after landing in Shanghai. From Xi'an it continues to Lanzhou, Dunhuang, Turpan and Urumqi.",
    },
    {
      question: "Can I visit Xi'an as part of a Beijing trip?",
      answer:
        "Yes. A Tale of Two Cities and Best of China both take the high-speed train from Beijing to Xi'an (Train G89, departing 15:00 and arriving 19:12 on the reference service).",
    },
  ],
};

export const guilinToursMeta: CityHubMeta = {
  slug: 'guilin-tours',
  cityName: 'Guilin',
  title: 'Guilin Tours from New Zealand | Li River Cruise | CTS Tours',
  description:
    'Guilin tours from New Zealand: Li River cruise and Yangshuo on a 3- or 4-day stopover from NZD $1,099, or on the 27-day China Panorama. Dates and prices.',
  h1: 'Guilin Tours from New Zealand',
  heroSubtitle: 'Cruise the Li River. See karst peaks and Reed Flute Cave. Spend time in Yangshuo.',
  introText:
    "Guilin, in southern China's Guangxi region, is famous for limestone karst mountains rising beside the Li River. The cruise from Guilin to Yangshuo is the centrepiece of every Guilin trip we run. This page lists each CTS trip that includes Guilin, with prices, departure dates and what you see on the days you are there.",
  searchTerms: ['guilin', 'li river', 'yangshuo'],
  highlights: [
    'Cruise the Li River to Yangshuo through karst mountain scenery (5-6 hours on the Guilin stopover)',
    'Explore Reed Flute Cave and see Elephant Trunk Hill',
    "Browse Yangshuo's local market, with optional bike rentals through the karst countryside on Guilin & Surrounds",
    "Visit Longsheng on Guilin & Surrounds: the Longji area, Zhuang and Yao villages and the Dragon's Backbone summit",
    'Start a Yangshuo morning with Tai Chi, then take a countryside tour and see cormorant fishing on China Panorama',
    'See the Sun & Moon Pagodas in Guilin on China Panorama',
  ],
  bestTimeToVisit:
    'Spring (March-May) and autumn (September-October) are perfect: clear skies, comfortable temperatures, and water levels ideal for cruising. Summer is hot and humid. Winter is cool but may have mist obscuring mountain views.',
  faqs: [
    {
      question: 'What is the Li River cruise like?',
      answer:
        'On our Guilin stopover the Li River cruise from Guilin to Yangshuo takes 5-6 hours through limestone mountain formations, and includes a visit to Yangshuo market. On Guilin & Surrounds and China Panorama the cruise also ends in Yangshuo.',
    },
    {
      question: 'Should I visit Guilin or Yangshuo?',
      answer:
        'Both. Every Guilin trip we run includes the cruise from Guilin to Yangshuo. Guilin & Surrounds adds time in Yangshuo and a morning free for optional bike rentals, and China Panorama spends a full day there.',
    },
    {
      question: 'How much does a Guilin tour from New Zealand cost?',
      answer: `The 3-day Guilin stopover is ${price('stopover', 'guilin')} and the 4-day Guilin & Surrounds is ${price('stopover', 'guilin-surrounds')}; both are land only, so airfare is not included. China Panorama, 27 days with return flights from Auckland included, is ${price('signature', 'grand-tour')}.`,
    },
    {
      question: 'Which Guilin trip should I choose?',
      answer:
        'Choose the 3-day stopover for the Li River cruise, Reed Flute Cave and Elephant Trunk Hill. Choose the 4-day Guilin & Surrounds to add a full day at Longsheng, with the Longji terraces and Zhuang and Yao villages.',
    },
  ],
};
