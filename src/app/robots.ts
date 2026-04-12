import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const SITE = getSiteUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          // Internal tooling; page also sets noindex. Disallow reduces bot load on heavy client bundle.
          '/blog/staging',
          // Client-shared marketing execution board; noindex + disallow keeps it out of search results.
          '/marketing-plan',
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
