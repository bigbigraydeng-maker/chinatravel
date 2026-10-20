function parseNzdAmount(value: string): number | null {
  const match = value.replace(/,/g, '').match(/\d+(?:\.\d+)?/);
  if (!match) return null;
  const amount = Number(match[0]);
  return Number.isFinite(amount) ? amount : null;
}

function formatNzdAmount(amount: number): string {
  return `NZD $${new Intl.NumberFormat('en-NZ', { maximumFractionDigits: 0 }).format(amount)}`;
}

/**
 * A tour's lead-in price as the site prints it in tables and cards: "NZD $3,480".
 * Drops a leading "From" and a trailing "per person" / "pp" from the stored price string.
 */
export function headlinePrice(price: string): string {
  return price.replace(/^\s*from\s+/i, '').replace(/\s*(?:per\s+person|pp)\s*$/i, '').trim();
}

/** Returns the per-person tour price when a solo room supplement is added. */
export function getSoloTourPrice(basePrice: string, singleSupplement: string): string | null {
  const base = parseNzdAmount(basePrice);
  const supplement = parseNzdAmount(singleSupplement);
  if (base === null || supplement === null) return null;
  return `${/^\s*from\b/i.test(basePrice) ? 'From ' : ''}${formatNzdAmount(base + supplement)}`;
}

