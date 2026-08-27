import { Metadata } from 'next';
import HomePageRedesign from '@/app/page-redesign';
import SchemaMarkup from '@/components/SchemaMarkup';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';

/**
 * Live homepage. Renders the Editorial redesign (HomePageRedesign) while
 * keeping the original SEO metadata + JSON-LD schema below. The previous
 * homepage layout is preserved in git history (rollback = revert this change).
 */

export async function generateMetadata(): Promise<Metadata> {
  try {
    return buildCtsPageMetadata({
      title: 'China Tours from New Zealand | CTS Tours',
      description:
        "New Zealand's Kiwi-led China travel specialists — CTS Tours NZ, Auckland since 2000, backed by China Travel Service (founded 1928). Expertly crafted tours, direct China operations, authentic experiences. Get your free quote today.",
      path: '/',
      ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg',
      ogImageAlt: 'Great Wall of China mist, CTS Tours',
      keywords: [
        'China tours from New Zealand',
        'China tours NZ',
        'China trips from New Zealand',
        'China travel specialists',
        'CTS Tours',
        'Beijing tours',
        'Shanghai tours',
        'luxury China travel',
        'small group China tours',
      ],
      ogType: 'website',
      openGraphTitle: 'China Tours from New Zealand | CTS Tours',
      openGraphDescription:
        "Discover authentic China with CTS Tours, New Zealand's Kiwi-led China travel specialists — CTS Tours NZ, Auckland since 2000, backed by China Travel Service (founded 1928). Expert-led small groups, direct China operations, and immersive itineraries.",
      openGraphSiteName: 'CTS Tours',
    });
  } catch {
    return {
      title: 'China Tours from New Zealand | CTS Tours',
      description:
        "New Zealand's Kiwi-led China travel specialists — CTS Tours NZ, Auckland since 2000, backed by China Travel Service (founded 1928). Expertly crafted tours, direct China operations, authentic experiences. Get your free quote today.",
      robots: { index: true, follow: true },
    };
  }
}

const buildHomePageSchemas = () => {
  const siteUrl = getSiteUrl();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'CTS Tours',
    alternateName: 'China Travel Service',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/logo.png`,
    foundingDate: '1928',
    description:
      "New Zealand's Kiwi-led China travel specialists — CTS Tours NZ, Auckland since 2000, backed by China Travel Service (founded 1928). Direct China operations, authentic experiences, expertly crafted tours.",
    areaServed: [
      { '@type': 'Country', name: 'New Zealand' },
      { '@type': 'Country', name: 'China' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2F CTS House, 175 Queen Street',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@ctstours.co.nz',
      telephone: '+64-800-287-888',
      contactType: 'customer service',
      areaServed: 'NZ',
      availableLanguage: ['English', 'Chinese'],
    },
    sameAs: [
      'https://www.facebook.com/CTSTOURS/',
      'https://www.instagram.com/chinatravelservices/',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: 'CTS Tours',
    alternateName: 'China Travel Service',
    description: "New Zealand's Kiwi-led China travel specialists — CTS Tours NZ, Auckland since 2000, backed by China Travel Service (founded 1928).",
    publisher: {
      '@type': 'Organization',
      name: 'CTS Tours',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/tours/find?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return [organizationSchema, websiteSchema];
};

export default function HomePage() {
  const homePageSchemas = buildHomePageSchemas();

  return (
    <>
      <SchemaMarkup data={homePageSchemas} />
      <HomePageRedesign />
    </>
  );
}
