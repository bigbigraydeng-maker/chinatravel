/**
 * Canonical site origin for metadata, canonical URLs, and JSON-LD.
 * Production: https://www.ctstours.co.nz — set NEXT_PUBLIC_SITE_URL in Render/hosting.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://www.ctstours.co.nz';
  return raw.replace(/\/$/, '');
}

/** Schema.org TravelAgency — use in JSON-LD (URL resolved at call time). */
export function getCtsTravelAgencySchema() {
  return {
    '@type': 'TravelAgency' as const,
    name: 'CTS Tours',
    url: getSiteUrl(),
    telephone: '+64-800-287-888',
    email: 'ctstours1@chinatravel.co.nz',
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
