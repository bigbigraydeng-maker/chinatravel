/**
 * 2027 departure prices that are agreed but NOT live on the site yet.
 *
 * Source: the ME tour catalogue price table (Product Owner, 19 October 2026).
 * NZD per person, twin share. Nothing in the site imports this file for rendering,
 * so none of these dates or prices can appear on a customer-visible page.
 *
 * To put a departure live, in tours.ts add its date to the tour's `departureDates`
 * and the matching price to `departurePricing`, then check the return date against
 * CTS's 2027 schedule (see src/__tests__/tour-golden-blocks.test.tsx). Update any
 * copy that quotes a single flat price for the tour at the same time.
 *
 * src/__tests__/departure-pricing.test.ts keeps this table, the live prices in
 * tours.ts and the Product Owner's table in step.
 */
export const STAGED_DEPARTURE_PRICES: Record<string, Record<string, string>> = {
  // Natural China: June onwards is +NZD $500 on the March / May price.
  landscapes: {
    '14 June 2027': 'NZD $7,849',
    '8 August 2027': 'NZD $7,849',
    '8 October 2027': 'NZD $7,849',
    '1 November 2027': 'NZD $7,849',
  },
  // Legacy of China: 28 May 2027 stays NZD $9,999 (already live).
  'imperial-heritage': {
    '3 September 2027': 'NZD $10,499',
  },
  // Shanghai & Surroundings: the NZD $2,699 promotional price is 25 March 2027 only (live).
  // Held back: CTS has not confirmed the 25 May return date, so it must not go live yet.
  'shanghai-surroundings': {
    '25 May 2027': 'NZD $2,899',
    '5 November 2027': 'NZD $2,899',
  },
  // Best of China: 11 March and 13 May 2027 stay NZD $4,080 (already live).
  essentials: {
    '9 September 2027': 'NZD $4,380',
    '28 October 2027': 'NZD $4,380',
  },
  // A Tale of Two Cities: 10 June 2027 is already live at NZD $3,680.
  'beijing-xian': {
    '21 August 2027': 'NZD $3,680',
    '2 September 2027': 'NZD $3,680',
    '21 October 2027': 'NZD $3,680',
    '14 November 2027': 'NZD $3,680',
  },
};
