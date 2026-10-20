// Why this exists: pages that print a tour's price in a table or card must show it the way the rest of the site
// does ("NZD $3,480"), whatever the stored string looks like ("From NZD $3,480", "NZD $2,699 per person", ...).
import { headlinePrice } from '@/lib/tour-price';

describe('headlinePrice', () => {
  it.each([
    ['From NZD $3,480', 'NZD $3,480'],
    ['From NZD $4,080 per person', 'NZD $4,080'],
    ['NZD $2,699 per person', 'NZD $2,699'],
    ['NZD $7,999', 'NZD $7,999'],
    ['from NZD $1,000 pp', 'NZD $1,000'],
    ['  From   NZD $875  ', 'NZD $875'],
  ])('shows "%s" as "%s"', (stored, shown) => {
    expect(headlinePrice(stored)).toBe(shown);
  });
});
