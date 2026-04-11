import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const SITE = getSiteUrl();

// All static routes with their priority and change frequency
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Core pages ──────────────────────────────────────────────────────────
  const campaignOctober2026: MetadataRoute.Sitemap = [
    `${SITE}/campaigns/october-2026`,
    `${SITE}/campaigns/october-2026/shanghai-surroundings`,
    `${SITE}/campaigns/october-2026/tale-of-two-cities`,
  ].map((url) => ({
    url,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }));

  const corePages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/tours`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/china-tours`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/tailor-made`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/terms-and-conditions`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/agents`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/site-map`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // ── Phase 1 SEO Hub pages ────────────────────────────────────────────────
  const hubPages: MetadataRoute.Sitemap = [
    'beijing-tours',
    'xian-tours',
    'shanghai-tours',
    'chengdu-tours',
    'guilin-tours',
    'zhangjiajie-tours',
    'yunnan-tours',
    'china-tours-from-new-zealand',
    'china-tours-from-auckland',
    'best-time-to-visit-china',
    'china-visa-guide-for-new-zealanders',
  ].map((slug) => ({
    url: `${SITE}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ── Phase 2: 21 Destination Travel Guides ───────────────────────────────
  const guidePages: MetadataRoute.Sitemap = [
    'beijing-travel-guide',
    'xian-travel-guide',
    'shanghai-travel-guide',
    'chengdu-travel-guide',
    'guilin-travel-guide',
    'zhangjiajie-travel-guide',
    'yunnan-travel-guide',
    'lijiang-travel-guide',
    'dali-travel-guide',
    'kunming-travel-guide',
    'shangri-la-travel-guide',
    'great-wall-travel-guide',
    'forbidden-city-travel-guide',
    'terracotta-warriors-travel-guide',
    'leshan-buddha-travel-guide',
    'yangshuo-travel-guide',
    'li-river-travel-guide',
    'hangzhou-travel-guide',
    'suzhou-travel-guide',
    'chongqing-travel-guide',
    'tianmen-mountain-travel-guide',
  ].map((slug) => ({
    url: `${SITE}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ── Tour pages (destination/tier combos) ────────────────────────────────
  const tourSlugs: MetadataRoute.Sitemap = [
    // Signature
    { slug: 'silk-road', tier: 'signature' },
    { slug: 'imperial-heritage', tier: 'signature' },
    { slug: 'grand-tour', tier: 'signature' },
    { slug: 'landscapes', tier: 'signature' },
    // Discovery
    { slug: 'beijing-shanghai', tier: 'discovery' },
    { slug: 'essentials', tier: 'discovery' },
    { slug: 'shanghai-beyond', tier: 'discovery' },
    { slug: 'yunnan-explorer', tier: 'discovery' },
    // Stopover
    { slug: 'beijing', tier: 'stopover' },
    { slug: 'beijing-express', tier: 'stopover' },
    { slug: 'shanghai', tier: 'stopover' },
    { slug: 'shanghai-express', tier: 'stopover' },
    { slug: 'chengdu', tier: 'stopover' },
    { slug: 'guilin', tier: 'stopover' },
    { slug: 'xian', tier: 'stopover' },
    { slug: 'guangzhou', tier: 'stopover' },
    { slug: 'shanghai-suzhou', tier: 'stopover' },
    { slug: 'shanghai-wuzhen', tier: 'stopover' },
    { slug: 'guilin-surrounds', tier: 'stopover' },
    { slug: 'zhangjiajie', tier: 'stopover' },
    { slug: 'guangzhou-shenzhen', tier: 'stopover' },
    { slug: 'huangshan', tier: 'stopover' },
  ].map(({ slug, tier }) => ({
    url: `${SITE}/tours/china/${tier}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...corePages, ...campaignOctober2026, ...hubPages, ...guidePages, ...tourSlugs];
}
