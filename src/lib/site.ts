/**
 * Canonical site origin for metadata, canonical URLs, and JSON-LD.
 * Production: https://www.ctstours.co.nz — set NEXT_PUBLIC_SITE_URL in Render/hosting.
 * Accepts values with or without scheme; invalid URLs fall back to production default
 * so `new URL(getSiteUrl())` in root layout never throws at runtime.
 */
export function getSiteUrl(): string {
  const fallback = 'https://www.ctstours.co.nz';
  let raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallback;
  raw = raw.replace(/\/$/, '');
  if (!/^https?:\/\//i.test(raw)) {
    raw = `https://${raw.replace(/^\/+/, '')}`;
  }
  try {
    const u = new URL(raw);
    const base = `${u.origin}${u.pathname.replace(/\/$/, '')}`;
    return base || u.origin;
  } catch {
    return fallback;
  }
}

/** Schema.org TravelAgency — use in JSON-LD (URL resolved at call time). */
export function getCtsTravelAgencySchema() {
  return {
    '@type': 'TravelAgency' as const,
    name: 'CTS Tours',
    url: getSiteUrl(),
    telephone: '+64-800-287-888',
    email: 'info@ctstours.co.nz',
    address: {
      '@type': 'PostalAddress' as const,
      streetAddress: '2F CTS House, 175 Queen Street',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
    sameAs: [
      'https://www.facebook.com/CTSTOURS/',
      'https://www.instagram.com/chinatravelservices/',
    ],
    description: 'China Travel Specialists for New Zealand | Heritage since 1928',
    areaServed: {
      '@type': 'Country' as const,
      name: 'New Zealand',
    },
  };
}
