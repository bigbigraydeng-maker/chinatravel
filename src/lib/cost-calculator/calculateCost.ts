import {
  ADD_ON_PRICES,
  FLIGHT_BASE_PRICE_NZD,
  MONTH_TO_SEASON,
  SEASON_MULTIPLIERS,
  TIER_BASE_COSTS,
  type TravelSeason,
} from './flightRates';

export type { TravelSeason };

export interface CostInput {
  groupSize: number;
  tier: 'signature' | 'discovery' | 'stopover';
  travelMonth: number;
  addOns: {
    insurance: boolean;
    singleUpgrade: boolean;
    privateTransfer: boolean;
  };
  tourPrice: string;
}

export interface CostBreakdown {
  flightCostPerPerson: number;
  tourCostPerPerson: number;
  addOnCostPerPerson: number;
  totalPerPerson: number;
  totalGroupCost: number;
  flightTotal: number;
  tourTotal: number;
  addOnTotal: number;
  season: TravelSeason;
  seasonMultiplier: number;
}

export function parseTourPrice(price: string): number {
  const cleaned = price.replace(/,/g, '');
  const match = cleaned.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export function getSeasonForMonth(month: number): TravelSeason {
  return MONTH_TO_SEASON[month] ?? 'spring';
}

export function getFlightCostPerPerson(season: TravelSeason): number {
  return Math.round(FLIGHT_BASE_PRICE_NZD * SEASON_MULTIPLIERS[season]);
}

export function getTierBaseCost(tier: 'signature' | 'discovery' | 'stopover'): number {
  return TIER_BASE_COSTS[tier];
}

export function calculateCost(input: CostInput): CostBreakdown {
  const { groupSize, tier, travelMonth, addOns, tourPrice } = input;

  const season = getSeasonForMonth(travelMonth);
  const seasonMultiplier = SEASON_MULTIPLIERS[season];

  const flightCostPerPerson = getFlightCostPerPerson(season);

  const parsedPrice = parseTourPrice(tourPrice);
  const tourCostPerPerson = parsedPrice > 0 ? parsedPrice : getTierBaseCost(tier);

  let addOnCostPerPerson = 0;
  if (addOns.insurance) addOnCostPerPerson += ADD_ON_PRICES.insurance;
  if (addOns.singleUpgrade) addOnCostPerPerson += ADD_ON_PRICES.singleUpgrade;
  if (addOns.privateTransfer) addOnCostPerPerson += ADD_ON_PRICES.privateTransfer;

  const totalPerPerson = flightCostPerPerson + tourCostPerPerson + addOnCostPerPerson;
  const totalGroupCost = totalPerPerson * groupSize;

  return {
    flightCostPerPerson,
    tourCostPerPerson,
    addOnCostPerPerson,
    totalPerPerson,
    totalGroupCost,
    flightTotal: flightCostPerPerson * groupSize,
    tourTotal: tourCostPerPerson * groupSize,
    addOnTotal: addOnCostPerPerson * groupSize,
    season,
    seasonMultiplier,
  };
}
