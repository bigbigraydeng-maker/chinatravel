/**
 * Tour prices in tours.ts are free text and inconsistent. All three of these
 * are real values in the catalogue today:
 *
 *   'NZD $8,150'
 *   'From NZD $3,480'
 *   'From NZD $4,080 per person'
 *
 * Any surface that renders its own "From" label or "pp" suffix therefore
 * doubles up on the strings that already carry one. The homepage Spotlight card
 * does exactly this in production right now — it renders a "From" eyebrow above
 * `tour.price` and a "pp" after it, so the biggest card on the page reads
 * "From / From NZD $4,080 per person pp".
 *
 * This splits a price into the bare amount plus whichever qualifiers the string
 * already carried, so a caller can decide once and render each one only once.
 * It does not invent qualifiers: a price with no per-person wording comes back
 * with perPerson false rather than being assumed.
 */

export interface PriceParts {
  /** The amount, with any leading "From" and trailing per-person wording removed. */
  amount: string;
  /** The source string led with "From". */
  from: boolean;
  /** The source string already said "per person" (or "pp"). */
  perPerson: boolean;
}

const LEADING_FROM = /^from\s+/i;
const TRAILING_PER_PERSON = /\s*(?:per\s+person|pp)\.?$/i;

export function parsePrice(price: string): PriceParts {
  let amount = (price ?? '').trim();
  let from = false;
  let perPerson = false;

  if (LEADING_FROM.test(amount)) {
    from = true;
    amount = amount.replace(LEADING_FROM, '');
  }

  const pp = TRAILING_PER_PERSON.exec(amount);
  if (pp) {
    perPerson = true;
    amount = amount.slice(0, pp.index);
  }

  return { amount: amount.trim(), from, perPerson };
}
