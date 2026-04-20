import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const SITE = getSiteUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all bots (including Google-Extended for AI Overview)
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/', // Allow JS/CSS bundles so Google can render pages
        ],
        disallow: [
          '/api/',
          // Internal tooling; page also sets noindex.
          '/blog/staging',
          // Client-shared marketing board; noindex + disallow keeps it out of search results.
          '/marketing',
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    // Note: 'host' directive removed — it is non-standard (Yandex-only) and
    // causes "invalid robots.txt format" errors in Google Search Console / Semrush.
  };
}
