/**
 * Central data source for all CTS Travel Planning Tools.
 *
 * Each tool entry drives:
 *  - /travel-tools page cards + anchor IDs
 *  - ToolsRecommendationBanner on /tailor-made
 *  - Metadata and schema markup on individual tool pages
 *  - GA4 event tracking (tool_name field)
 */

export type ToolStatus = 'live' | 'coming-soon';

export interface ToolData {
  /** Unique slug — used as GA4 tool_name and URL anchor (#id) */
  id: string;
  title: string;
  description: string;
  /** Longer description shown in the travel-tools hub */
  longDescription: string;
  emoji: string;
  status: ToolStatus;
  /** Canonical URL for the tool (page or anchor) */
  url: string;
  /** Primary SEO keyword this tool targets (NZ database) */
  targetKeyword: string;
  /** Approx NZ monthly search volume from SEMrush */
  searchVolume: number;
  /** Keyword difficulty (0-100) */
  kd: number;
}

export const TOOLS: ToolData[] = [
  {
    id: 'best-time-to-visit',
    title: 'Best Time to Visit China',
    description: 'Find the ideal season for your interests — cherry blossom, autumn colour, festivals, or beating the crowds.',
    longDescription:
      'Compare weather, crowds, and highlights month by month across China\'s top destinations. Whether you\'re chasing cherry blossoms in spring, autumn foliage in October, or avoiding Golden Week chaos — this guide helps you pick the perfect travel window.',
    emoji: '🌸',
    status: 'live',
    url: '/best-time-to-visit-china',
    targetKeyword: 'best time to visit China',
    searchVolume: 260,
    kd: 19,
  },
  {
    id: 'cost-calculator',
    title: 'China Trip Cost Calculator',
    description: 'Estimate your total China holiday budget — flights, tours, hotels, and daily expenses — before you enquire.',
    longDescription:
      'Get a personalised budget estimate for your China trip based on group size, travel duration, comfort level, and destinations. Understand where your money goes and arrive at the tailor-made form with realistic expectations.',
    emoji: '💰',
    status: 'coming-soon',
    url: '/travel-tools#cost-calculator',
    targetKeyword: 'China trip cost',
    searchVolume: 20,
    kd: 0,
  },
  {
    id: 'visa-checker',
    title: 'Visa Requirement Checker',
    description: 'Check visa requirements for New Zealand passport holders travelling to China — including the 240-hour transit visa.',
    longDescription:
      'New Zealand citizens now benefit from China\'s visa-free policy for stays up to 30 days. Use this tool to confirm eligibility, check the 240-hour transit visa option, and understand what documents you\'ll need at the border.',
    emoji: '🛂',
    status: 'live',
    url: '/china-visa-guide-for-new-zealanders',
    targetKeyword: 'China visa NZ',
    searchVolume: 390,
    kd: 29,
  },
  {
    id: 'seasonal-guide',
    title: 'Month-by-Month Seasonal Guide',
    description: 'Deep-dive weather, festivals, and crowd levels for every month — with destination-specific breakdowns.',
    longDescription:
      'Our interactive seasonal guide breaks down every month across Beijing, Xi\'an, Shanghai, Guilin, and more. Compare temperature, rainfall, and major festivals side-by-side to plan the trip that suits your travel style.',
    emoji: '🗓️',
    status: 'live',
    url: '/seasonal-guide',
    targetKeyword: 'China weather by month',
    searchVolume: 30,
    kd: 21,
  },
  {
    id: 'trip-planner',
    title: 'China Trip Planner',
    description: 'Match your travel duration, interests, and budget to the right destinations and CTS tour products.',
    longDescription:
      'Answer a few quick questions about your travel style, party size, and interests, and our planner will suggest the most suitable China itinerary, destinations, and tour tier for you.',
    emoji: '🧭',
    status: 'live',
    url: '/trip-planner',
    targetKeyword: 'China trip planner',
    searchVolume: 20,
    kd: 0,
  },
  {
    id: 'local-food-guide',
    title: 'China Local Food Map',
    description: 'Explore regional dishes by destination — from Peking duck in Beijing to spicy hotpot in Chengdu.',
    longDescription:
      'China\'s cuisine varies dramatically by region. Our interactive food map helps you discover must-try dishes in each city so you can plan your culinary stops alongside your sightseeing itinerary.',
    emoji: '🥟',
    status: 'live',
    url: '/local-food-guide',
    targetKeyword: 'China food guide',
    searchVolume: 20,
    kd: 0,
  },
];

/** Tools shown in the Tailor-Made page recommendation banner (top 3 by conversion value) */
export const BANNER_TOOLS = TOOLS.filter((t) =>
  ['best-time-to-visit', 'cost-calculator', 'visa-checker'].includes(t.id)
);

export function getToolById(id: string): ToolData | undefined {
  return TOOLS.find((t) => t.id === id);
}
