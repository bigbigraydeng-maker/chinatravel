export type TravelSeason = 'spring' | 'summer' | 'autumn' | 'winter';

export const FLIGHT_BASE_PRICE_NZD = 1400;

export const SEASON_MULTIPLIERS: Record<TravelSeason, number> = {
  spring: 1.0,
  summer: 1.15,
  autumn: 1.1,
  winter: 0.92,
};

export const MONTH_TO_SEASON: Record<number, TravelSeason> = {
  1: 'winter',
  2: 'winter',
  3: 'spring',
  4: 'spring',
  5: 'spring',
  6: 'summer',
  7: 'summer',
  8: 'summer',
  9: 'autumn',
  10: 'autumn',
  11: 'autumn',
  12: 'winter',
};

export const TIER_BASE_COSTS: Record<'signature' | 'discovery' | 'stopover', number> = {
  signature: 7500,
  discovery: 4500,
  stopover: 1800,
};

export const ADD_ON_PRICES = {
  insurance: 80,
  singleUpgrade: 400,
  privateTransfer: 200,
} as const;
