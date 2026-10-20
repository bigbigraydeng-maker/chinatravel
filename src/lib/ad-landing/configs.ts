import type { AdLandingConfig } from './types';

/**
 * One config per advertised tour. A tour appears here only when its data is complete (an upcoming departure with its
 * own price, inclusions, FAQs); a tour that is not listed has no ad page (the route returns 404).
 *
 * Every sentence below has a `source`: a phrase that must occur in the tour data. src/lib/ad-landing/__tests__/configs.test.ts
 * fails when one does not, so this file cannot say anything the tour data does not.
 */

/** Water-town loop: Suzhou, Wuxi, Xinshi, Hangzhou, Shanghai. */
const SHANGHAI_SURROUNDINGS: AdLandingConfig = {
  pathKey: 'shanghai-surroundings',
  tour: { tier: 'discovery', slug: 'shanghai-surroundings' },
  accent: 'teal',
  hero: {
    variant: 'water-town',
    eyebrow: 'China Discovery',
    headline: 'Shanghai & Surroundings',
    subhead: [
      { text: 'Suzhou gardens', source: 'Master of the Nets Garden' },
      { text: 'Hanfu photos and afternoon tea in a water town', source: 'Hanfu dress-up for photos and afternoon tea' },
      { text: 'Longjing tea tasting', source: 'Longjing tea tasting' },
      { text: 'the Bund', source: 'The Bund' },
    ],
    chips: [
      { text: 'Suzhou gardens', source: 'Master of the Nets Garden' },
      { text: 'Water-town afternoon tea', source: 'afternoon tea' },
      { text: 'Longjing tea tasting', source: 'Longjing tea tasting' },
      { text: 'West Lake boat tour', source: 'West Lake boat tour' },
    ],
    imageAlt: 'A canal lined with old houses in a Yangtze Delta water town, with a wooden boat on the water',
    imageCaption: 'A Yangtze Delta water town',
  },
  blocks: [
    {
      type: 'cityLoop',
      title: 'Your loop, stop by stop',
      stops: [
        {
          city: 'Suzhou',
          highlights: [
            { text: 'Master of the Nets Garden', source: 'Master of the Nets Garden' },
            { text: 'Panmen and Shantang Street', source: 'Panmen' },
          ],
        },
        {
          city: 'Wuxi',
          highlights: [
            { text: 'Three Kingdoms City by Taihu Lake', source: 'Three Kingdoms City' },
            { text: 'Li Garden by the lake', source: 'Li Garden' },
          ],
        },
        {
          city: 'Xinshi',
          highlights: [
            { text: 'Hanfu dress-up photos', source: 'Hanfu' },
            { text: 'Afternoon tea in a thousand-year-old water town', source: 'thousand-year-old' },
          ],
        },
        {
          city: 'Hangzhou',
          highlights: [
            { text: 'West Lake boat tour and the Su Causeway', source: 'Su Causeway' },
            { text: 'Leifeng Pagoda', source: 'Leifeng Pagoda' },
            { text: 'Longjing tea tasting at Meijiawu', source: 'Meijiawu' },
          ],
        },
        {
          city: 'Shanghai',
          highlights: [
            { text: 'The Bund', source: 'The Bund' },
            { text: 'City God Temple quarter', source: 'City God Temple' },
            { text: 'Nanjing Road', source: 'Nanjing Road' },
          ],
        },
      ],
    },
    {
      type: 'featureCards',
      title: 'Highlights of the journey',
      cards: [
        {
          title: 'Hanfu photos and afternoon tea',
          icon: 'camera',
          body: [
            {
              text: 'Dress up in Hanfu for photos, then take afternoon tea in thousand-year-old Xinshi Town.',
              source: 'Hanfu dress-up for photos and afternoon tea in thousand-year-old Xinshi Town',
            },
          ],
        },
        {
          title: 'West Lake and Longjing tea',
          image: {
            src: '/images/cts-upgrade/planner-westlake.webp',
            alt: 'A classical pavilion beside a lotus lake',
            width: 1080,
            height: 1620,
          },
          body: [
            {
              text: 'Take a boat tour on West Lake and visit the Su Causeway and Leifeng Pagoda.',
              source: 'West Lake boat tour, Su Causeway, Leifeng Pagoda',
            },
            { text: 'Taste Longjing tea at Meijiawu.', source: 'Longjing tea tasting at Meijiawu' },
          ],
        },
        {
          title: 'The Bund and Nanjing Road',
          image: {
            src: '/images/cts-upgrade/search-bund.webp',
            alt: "Shanghai's Pudong skyline reflected in calm water",
            width: 1080,
            height: 1617,
          },
          body: [
            { text: 'Take in the Bund and the City God Temple quarter.', source: 'The Bund, City God Temple quarter' },
            { text: 'Browse Nanjing Road.', source: 'Nanjing Road' },
          ],
        },
      ],
    },
    {
      type: 'routeMap',
      title: 'Your route, city by city',
      caption:
        'Suzhou, Wuxi, Xinshi, Hangzhou and Shanghai. Between cities: High-speed train and coach (see the map key).',
    },
    { type: 'latestContent', title: 'Latest on this journey' },
    { type: 'priceDepartures', title: 'Dates, price and booking' },
    { type: 'trust' },
    { type: 'inclusions', title: "What's included" },
    {
      type: 'faq',
      title: 'Questions, answered',
      pick: ['included in the price', 'which hotels', 'optional activities', 'visa', 'how do i book'],
    },
  ],
};

export const AD_LANDING_CONFIGS: readonly AdLandingConfig[] = [SHANGHAI_SURROUNDINGS];

export function getAdLandingConfig(pathKey: string): AdLandingConfig | undefined {
  return AD_LANDING_CONFIGS.find((config) => config.pathKey === pathKey);
}
