import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';
import {
  faqPlanningYourChinaTrip,
  faqBeijingTravel,
  faqGreatWall,
  faqTourPlanning,
  faqVisaRequirements,
  faqBestTimeTravel,
} from '@/lib/data/faq-pages';
import { getAllActiveTours } from '@/lib/data/tours';
import { getAllCities } from '@/lib/data/cities';
import { getAllPlayQuizSlugs } from '@/lib/data/play-quizzes';

const SITE = getSiteUrl();

// All static routes with their priority and change frequency
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Core pages ──────────────────────────────────────────────────────────
  const campaignOctober2026: MetadataRoute.Sitemap = [
    `${SITE}/campaigns/spotlight`,
    `${SITE}/campaigns/october-2026/shanghai-surroundings`,
    `${SITE}/campaigns/october-2026/tale-of-two-cities`,
    `${SITE}/campaigns/fire-fuzz`,
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
    { url: `${SITE}/travel-tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/terms-and-conditions`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/about/asian-escapes`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/agents`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/site-map`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE}/guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/experts/baker-gu`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/experts/lisa-li`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/campaigns/best-of-china`, lastModified: now, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${SITE}/campaigns/chongqing`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE}/best-china-tours`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/china-tours-for-seniors`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${SITE}/chongqing-tours`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/destination-matcher`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/local-food-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/seasonal-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/trip-planner`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/tools/cost-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
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
    'china-travel-specialists-nz',
    'small-group-china-tours',
    'chengdu-panda-sanctuary',
    'liziba-station-chongqing',
    'hongyadong-chongqing',
  ].map((slug) => ({
    url: `${SITE}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ── Discovery Guides (Product dimension) ───────────────────────────────
  const discoveryGuides: MetadataRoute.Sitemap = [
    'beijing-xian-discovery-guide',
    'shanghai-surroundings-discovery-guide',
    'chongqing-chengdu-discovery-guide',
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

  // ── Tour pages ──────────────────────────────────────────────────────────
  // 从 tours.ts 派生,不再手写 slug 列表。手写列表会和数据漂移 ——
  // 曾经出现过 isActive:false 的产品仍留在 sitemap 里,成为站内无入口的孤儿页。
  const tourSlugs: MetadataRoute.Sitemap = getAllActiveTours()
    .filter((tour) => tour.destination === 'china')
    .map((tour) => ({
      url: `${SITE}/tours/china/${tour.tier}/${tour.slug}`,
      lastModified: tour.updatedAt || now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }));

  // ── Phase 3: FAQ Pages ─────────────────────────────────────────────────────
  const faqPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...[
      faqPlanningYourChinaTrip,
      faqBeijingTravel,
      faqGreatWall,
      faqTourPlanning,
      faqVisaRequirements,
      faqBestTimeTravel,
    ].map((faq) => ({
      url: `${SITE}/faq/${faq.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];

  // ── Explore city guides ──────────────────────────────────────────────────
  const explorePages: MetadataRoute.Sitemap = [
    { url: `${SITE}/explore`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    ...getAllCities().map((city) => ({
      url: `${SITE}/explore/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.55,
    })),
  ];

  // ── Play quizzes ─────────────────────────────────────────────────────────
  const playPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/play`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    ...getAllPlayQuizSlugs().map((slug) => ({
      url: `${SITE}/play/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.45,
    })),
  ];

  // ── Long-tail blog posts (batch 1) ──────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = [
    // Line A: Beijing / Xi'an
    'beijing-xian-itinerary-10-days',
    'first-time-china-beijing-xian',
    'beijing-to-xian-high-speed-train',
    'terracotta-warriors-guide-nz',
    'beijing-xian-tour-new-zealand',
    // Line B: Shanghai & Surroundings
    'shanghai-suzhou-hangzhou-itinerary',
    'west-lake-hangzhou-travel-guide',
    'suzhou-gardens-guide-nz',
    'shanghai-10-days-itinerary',
    'china-water-towns-jiangnan-guide',
    // Line C: Chongqing / Chengdu
    'chongqing-chengdu-itinerary-10-days',
    'how-many-days-in-chongqing',
    'chongqing-vs-chengdu',
    'liziba-station-chongqing-guide',
    'chengdu-panda-tour-new-zealand',
  ].map((slug) => ({
    url: `${SITE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...corePages, ...campaignOctober2026, ...hubPages, ...discoveryGuides, ...guidePages, ...faqPages, ...explorePages, ...playPages, ...tourSlugs, ...blogPages];
}
