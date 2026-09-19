function parseNzdAmount(value: string): number | null {
  const match = value.replace(/,/g, '').match(/\d+(?:\.\d+)?/);
  if (!match) return null;
  const amount = Number(match[0]);
  return Number.isFinite(amount) ? amount : null;
}

function formatNzdAmount(amount: number): string {
  return `NZD $${new Intl.NumberFormat('en-NZ', { maximumFractionDigits: 0 }).format(amount)}`;
}

/** Returns the per-person tour price when a solo room supplement is added. */
export function getSoloTourPrice(basePrice: string, singleSupplement: string): string | null {
  const base = parseNzdAmount(basePrice);
  const supplement = parseNzdAmount(singleSupplement);
  if (base === null || supplement === null) return null;
  return `${/^\s*from\b/i.test(basePrice) ? 'From ' : ''}${formatNzdAmount(base + supplement)}`;
}

