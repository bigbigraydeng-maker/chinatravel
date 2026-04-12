'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DestinationGuide as DestinationGuideType } from '@/lib/data/guides';
import HubHero from './HubHero';

const TI = 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images';

// ─── Per-guide config: hub link, related tours, related guides ─────────────
interface TourCard {
  name: string;
  duration: string;
  price: string;
  url: string;
  image: string;
  tier: 'signature' | 'discovery' | 'stopover';
}
interface GuideLink {
  name: string;
  slug: string;
  emoji: string;
}
interface GuideConfig {
  hubUrl: string;
  hubLabel: string;
  relatedTours: TourCard[];
  relatedGuides: GuideLink[];
}

const TIER_COLORS = {
  signature: 'bg-amber-100 text-amber-800',
  discovery: 'bg-emerald-100 text-emerald-800',
  stopover: 'bg-sky-100 text-sky-800',
};

const GUIDE_CONFIG: Record<string, GuideConfig> = {
  'beijing-travel-guide': {
    hubUrl: '/beijing-tours', hubLabel: 'All Beijing Tours',
    relatedTours: [
      { name: 'Beijing Stopover (4 Days)', duration: '4 Days', price: 'From NZD $2,120', url: '/tours/china/stopover/beijing', image: `${TI}/forbidden-city-lion.jpg`, tier: 'stopover' },
      { name: 'Beijing Express (3 Days)', duration: '3 Days', price: 'From NZD $1,450', url: '/tours/china/stopover/beijing-express', image: `${TI}/forbidden-city-lion-2.jpg`, tier: 'stopover' },
      { name: 'Legacy of China (17 Days)', duration: '17 Days', price: 'NZD $9,999', url: '/tours/china/signature/imperial-heritage', image: `${TI}/forbidden-city-aerial.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Great Wall Guide', slug: 'great-wall-travel-guide', emoji: '🏯' },
      { name: 'Forbidden City', slug: 'forbidden-city-travel-guide', emoji: '🏛️' },
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
      { name: 'Shanghai Travel Guide', slug: 'shanghai-travel-guide', emoji: '🌆' },
    ],
  },
  'xian-travel-guide': {
    hubUrl: '/xian-tours', hubLabel: "All Xi'an Tours",
    relatedTours: [
      { name: "Xi'an Stopover (3 Days)", duration: '3 Days', price: 'From NZD $945', url: '/tours/china/stopover/xian', image: `${TI}/xian-terracotta.jpg`, tier: 'stopover' },
      { name: 'Best of China (15 Days)', duration: '15 Days', price: 'NZD $4,539', url: '/tours/china/discovery/essentials', image: `${TI}/shanghai-night-blue.jpg`, tier: 'discovery' },
      { name: 'Silk Road Discovery (17 Days)', duration: '17 Days', price: 'From NZD $6,699', url: '/tours/china/signature/silk-road', image: `${TI}/silk-road-wall.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Terracotta Warriors', slug: 'terracotta-warriors-travel-guide', emoji: '⚔️' },
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
      { name: 'Guilin Travel Guide', slug: 'guilin-travel-guide', emoji: '🌊' },
      { name: 'Shanghai Travel Guide', slug: 'shanghai-travel-guide', emoji: '🌆' },
    ],
  },
  'shanghai-travel-guide': {
    hubUrl: '/shanghai-tours', hubLabel: 'All Shanghai Tours',
    relatedTours: [
      { name: 'Shanghai Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,060', url: '/tours/china/stopover/shanghai', image: `${TI}/shanghai-night-red.jpg`, tier: 'stopover' },
      { name: 'A Tale of Two Cities (10 Days)', duration: '10 Days', price: 'From NZD $3,480', url: '/tours/china/discovery/beijing-xian', image: `${TI}/forbidden-city-gold-lion.jpg`, tier: 'discovery' },
      { name: 'Shanghai & Surroundings (10 Days)', duration: '10 Days', price: 'NZD $2,999', url: '/tours/china/discovery/shanghai-surroundings', image: `${TI}/wuzhen-canal.jpg`, tier: 'discovery' },
    ],
    relatedGuides: [
      { name: 'Suzhou Travel Guide', slug: 'suzhou-travel-guide', emoji: '🌿' },
      { name: 'Hangzhou Travel Guide', slug: 'hangzhou-travel-guide', emoji: '🍵' },
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
    ],
  },
  'chengdu-travel-guide': {
    hubUrl: '/chengdu-tours', hubLabel: 'All Chengdu Tours',
    relatedTours: [
      { name: 'Chengdu Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,359', url: '/tours/china/stopover/chengdu', image: `${TI}/chengdu-pandas.jpg`, tier: 'stopover' },
      { name: 'Natural China (16 Days)', duration: '16 Days', price: 'From NZD $7,670', url: '/tours/china/signature/landscapes', image: `${TI}/jiuzhaigou-lake.jpg`, tier: 'signature' },
      { name: 'China Panorama (27 Days)', duration: '27 Days', price: 'From NZD $10,899', url: '/tours/china/signature/grand-tour', image: `${TI}/great-wall-mist.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Leshan Buddha', slug: 'leshan-buddha-travel-guide', emoji: '🏔️' },
      { name: 'Yunnan Travel Guide', slug: 'yunnan-travel-guide', emoji: '🌄' },
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
    ],
  },
  'guilin-travel-guide': {
    hubUrl: '/guilin-tours', hubLabel: 'All Guilin Tours',
    relatedTours: [
      { name: 'Guilin Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,099', url: '/tours/china/stopover/guilin', image: `${TI}/guilin-river-valley.jpg`, tier: 'stopover' },
      { name: 'Guilin & Surrounds (4 Days)', duration: '4 Days', price: 'From NZD $1,310', url: '/tours/china/stopover/guilin-surrounds', image: `${TI}/guilin-river-valley.jpg`, tier: 'stopover' },
      { name: 'China Panorama (27 Days)', duration: '27 Days', price: 'From NZD $10,899', url: '/tours/china/signature/grand-tour', image: `${TI}/great-wall-mist.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Yangshuo Travel Guide', slug: 'yangshuo-travel-guide', emoji: '🚵' },
      { name: 'Li River Guide', slug: 'li-river-travel-guide', emoji: '🛶' },
      { name: 'Zhangjiajie Guide', slug: 'zhangjiajie-travel-guide', emoji: '🌫️' },
      { name: 'Chengdu Travel Guide', slug: 'chengdu-travel-guide', emoji: '🐼' },
    ],
  },
  'zhangjiajie-travel-guide': {
    hubUrl: '/zhangjiajie-tours', hubLabel: 'All Zhangjiajie Tours',
    relatedTours: [
      { name: 'Zhangjiajie Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,899', url: '/tours/china/stopover/zhangjiajie', image: `${TI}/zhangjiajie.jpg`, tier: 'stopover' },
      { name: 'Natural China (16 Days)', duration: '16 Days', price: 'From NZD $7,670', url: '/tours/china/signature/landscapes', image: `${TI}/jiuzhaigou-lake.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Tianmen Mountain', slug: 'tianmen-mountain-travel-guide', emoji: '⛰️' },
      { name: 'Guilin Travel Guide', slug: 'guilin-travel-guide', emoji: '🌊' },
      { name: 'Yangshuo Travel Guide', slug: 'yangshuo-travel-guide', emoji: '🚵' },
      { name: 'Chengdu Travel Guide', slug: 'chengdu-travel-guide', emoji: '🐼' },
    ],
  },
  'yunnan-travel-guide': {
    hubUrl: '/yunnan-tours', hubLabel: 'All Yunnan Tours',
    relatedTours: [
      { name: 'Colorful Yunnan (11 Days)', duration: '11 Days', price: 'NZD $3,899', url: '/tours/china/discovery/yunnan-explorer', image: `${TI}/yunnan-village.jpg`, tier: 'discovery' },
      { name: 'Natural China (16 Days)', duration: '16 Days', price: 'From NZD $7,670', url: '/tours/china/signature/landscapes', image: `${TI}/jiuzhaigou-lake.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Lijiang Travel Guide', slug: 'lijiang-travel-guide', emoji: '🏘️' },
      { name: 'Dali Travel Guide', slug: 'dali-travel-guide', emoji: '🌊' },
      { name: 'Kunming Travel Guide', slug: 'kunming-travel-guide', emoji: '🌸' },
      { name: 'Shangri-La Guide', slug: 'shangri-la-travel-guide', emoji: '🏔️' },
    ],
  },
  'lijiang-travel-guide': {
    hubUrl: '/yunnan-tours', hubLabel: 'All Yunnan Tours',
    relatedTours: [
      { name: 'Colorful Yunnan (11 Days)', duration: '11 Days', price: 'NZD $3,899', url: '/tours/china/discovery/yunnan-explorer', image: `${TI}/yunnan-village.jpg`, tier: 'discovery' },
    ],
    relatedGuides: [
      { name: 'Yunnan Travel Guide', slug: 'yunnan-travel-guide', emoji: '🌄' },
      { name: 'Dali Travel Guide', slug: 'dali-travel-guide', emoji: '🌊' },
      { name: 'Shangri-La Guide', slug: 'shangri-la-travel-guide', emoji: '🏔️' },
      { name: 'Kunming Travel Guide', slug: 'kunming-travel-guide', emoji: '🌸' },
    ],
  },
  'dali-travel-guide': {
    hubUrl: '/yunnan-tours', hubLabel: 'All Yunnan Tours',
    relatedTours: [
      { name: 'Colorful Yunnan (11 Days)', duration: '11 Days', price: 'NZD $3,899', url: '/tours/china/discovery/yunnan-explorer', image: `${TI}/yunnan-village.jpg`, tier: 'discovery' },
    ],
    relatedGuides: [
      { name: 'Yunnan Travel Guide', slug: 'yunnan-travel-guide', emoji: '🌄' },
      { name: 'Lijiang Travel Guide', slug: 'lijiang-travel-guide', emoji: '🏘️' },
      { name: 'Kunming Travel Guide', slug: 'kunming-travel-guide', emoji: '🌸' },
      { name: 'Shangri-La Guide', slug: 'shangri-la-travel-guide', emoji: '🏔️' },
    ],
  },
  'kunming-travel-guide': {
    hubUrl: '/yunnan-tours', hubLabel: 'All Yunnan Tours',
    relatedTours: [
      { name: 'Colorful Yunnan (11 Days)', duration: '11 Days', price: 'NZD $3,899', url: '/tours/china/discovery/yunnan-explorer', image: `${TI}/yunnan-village.jpg`, tier: 'discovery' },
    ],
    relatedGuides: [
      { name: 'Yunnan Travel Guide', slug: 'yunnan-travel-guide', emoji: '🌄' },
      { name: 'Lijiang Travel Guide', slug: 'lijiang-travel-guide', emoji: '🏘️' },
      { name: 'Dali Travel Guide', slug: 'dali-travel-guide', emoji: '🌊' },
      { name: 'Chengdu Travel Guide', slug: 'chengdu-travel-guide', emoji: '🐼' },
    ],
  },
  'shangri-la-travel-guide': {
    hubUrl: '/yunnan-tours', hubLabel: 'All Yunnan Tours',
    relatedTours: [
      { name: 'Colorful Yunnan (11 Days)', duration: '11 Days', price: 'NZD $3,899', url: '/tours/china/discovery/yunnan-explorer', image: `${TI}/yunnan-village.jpg`, tier: 'discovery' },
    ],
    relatedGuides: [
      { name: 'Yunnan Travel Guide', slug: 'yunnan-travel-guide', emoji: '🌄' },
      { name: 'Lijiang Travel Guide', slug: 'lijiang-travel-guide', emoji: '🏘️' },
      { name: 'Dali Travel Guide', slug: 'dali-travel-guide', emoji: '🌊' },
      { name: 'Kunming Travel Guide', slug: 'kunming-travel-guide', emoji: '🌸' },
    ],
  },
  'great-wall-travel-guide': {
    hubUrl: '/beijing-tours', hubLabel: 'All Beijing Tours',
    relatedTours: [
      { name: 'Beijing Stopover (4 Days)', duration: '4 Days', price: 'From NZD $2,120', url: '/tours/china/stopover/beijing', image: `${TI}/forbidden-city-lion.jpg`, tier: 'stopover' },
      { name: 'Legacy of China (17 Days)', duration: '17 Days', price: 'NZD $9,999', url: '/tours/china/signature/imperial-heritage', image: `${TI}/forbidden-city-aerial.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
      { name: 'Forbidden City', slug: 'forbidden-city-travel-guide', emoji: '🏛️' },
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
      { name: 'Terracotta Warriors', slug: 'terracotta-warriors-travel-guide', emoji: '⚔️' },
    ],
  },
  'forbidden-city-travel-guide': {
    hubUrl: '/beijing-tours', hubLabel: 'All Beijing Tours',
    relatedTours: [
      { name: 'Beijing Stopover (4 Days)', duration: '4 Days', price: 'From NZD $2,120', url: '/tours/china/stopover/beijing', image: `${TI}/forbidden-city-lion.jpg`, tier: 'stopover' },
      { name: 'Legacy of China (17 Days)', duration: '17 Days', price: 'NZD $9,999', url: '/tours/china/signature/imperial-heritage', image: `${TI}/forbidden-city-aerial.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
      { name: 'Great Wall Guide', slug: 'great-wall-travel-guide', emoji: '🏔️' },
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
      { name: 'Terracotta Warriors', slug: 'terracotta-warriors-travel-guide', emoji: '⚔️' },
    ],
  },
  'terracotta-warriors-travel-guide': {
    hubUrl: '/xian-tours', hubLabel: "All Xi'an Tours",
    relatedTours: [
      { name: "Xi'an Stopover (3 Days)", duration: '3 Days', price: 'From NZD $945', url: '/tours/china/stopover/xian', image: `${TI}/xian-terracotta.jpg`, tier: 'stopover' },
      { name: 'Best of China (15 Days)', duration: '15 Days', price: 'NZD $4,539', url: '/tours/china/discovery/essentials', image: `${TI}/shanghai-night-blue.jpg`, tier: 'discovery' },
    ],
    relatedGuides: [
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
      { name: 'Forbidden City', slug: 'forbidden-city-travel-guide', emoji: '🏛️' },
      { name: 'Great Wall Guide', slug: 'great-wall-travel-guide', emoji: '🏔️' },
    ],
  },
  'leshan-buddha-travel-guide': {
    hubUrl: '/chengdu-tours', hubLabel: 'All Chengdu Tours',
    relatedTours: [
      { name: 'Chengdu Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,359', url: '/tours/china/stopover/chengdu', image: `${TI}/chengdu-pandas.jpg`, tier: 'stopover' },
      { name: 'Natural China (16 Days)', duration: '16 Days', price: 'From NZD $7,670', url: '/tours/china/signature/landscapes', image: `${TI}/jiuzhaigou-lake.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Chengdu Travel Guide', slug: 'chengdu-travel-guide', emoji: '🐼' },
      { name: 'Yunnan Travel Guide', slug: 'yunnan-travel-guide', emoji: '🌄' },
      { name: 'Guilin Travel Guide', slug: 'guilin-travel-guide', emoji: '🌊' },
      { name: 'Zhangjiajie Guide', slug: 'zhangjiajie-travel-guide', emoji: '🌫️' },
    ],
  },
  'yangshuo-travel-guide': {
    hubUrl: '/guilin-tours', hubLabel: 'All Guilin Tours',
    relatedTours: [
      { name: 'Guilin & Surrounds (4 Days)', duration: '4 Days', price: 'From NZD $1,310', url: '/tours/china/stopover/guilin-surrounds', image: `${TI}/guilin-river-valley.jpg`, tier: 'stopover' },
      { name: 'Guilin Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,099', url: '/tours/china/stopover/guilin', image: `${TI}/guilin-river-valley.jpg`, tier: 'stopover' },
    ],
    relatedGuides: [
      { name: 'Guilin Travel Guide', slug: 'guilin-travel-guide', emoji: '🌊' },
      { name: 'Li River Guide', slug: 'li-river-travel-guide', emoji: '🛶' },
      { name: 'Zhangjiajie Guide', slug: 'zhangjiajie-travel-guide', emoji: '🌫️' },
      { name: 'Chengdu Travel Guide', slug: 'chengdu-travel-guide', emoji: '🐼' },
    ],
  },
  'li-river-travel-guide': {
    hubUrl: '/guilin-tours', hubLabel: 'All Guilin Tours',
    relatedTours: [
      { name: 'Guilin & Surrounds (4 Days)', duration: '4 Days', price: 'From NZD $1,310', url: '/tours/china/stopover/guilin-surrounds', image: `${TI}/guilin-river-valley.jpg`, tier: 'stopover' },
      { name: 'China Panorama (27 Days)', duration: '27 Days', price: 'From NZD $10,899', url: '/tours/china/signature/grand-tour', image: `${TI}/great-wall-mist.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Guilin Travel Guide', slug: 'guilin-travel-guide', emoji: '🌊' },
      { name: 'Yangshuo Travel Guide', slug: 'yangshuo-travel-guide', emoji: '🚵' },
      { name: 'Zhangjiajie Guide', slug: 'zhangjiajie-travel-guide', emoji: '🌫️' },
      { name: 'Chengdu Travel Guide', slug: 'chengdu-travel-guide', emoji: '🐼' },
    ],
  },
  'hangzhou-travel-guide': {
    hubUrl: '/china-tours', hubLabel: 'All China Tours',
    relatedTours: [
      { name: 'Shanghai & Surroundings (10 Days)', duration: '10 Days', price: 'NZD $2,999', url: '/tours/china/discovery/shanghai-surroundings', image: `${TI}/wuzhen-canal.jpg`, tier: 'discovery' },
      { name: 'Best of China (15 Days)', duration: '15 Days', price: 'NZD $4,539', url: '/tours/china/discovery/essentials', image: `${TI}/shanghai-night-blue.jpg`, tier: 'discovery' },
    ],
    relatedGuides: [
      { name: 'Shanghai Travel Guide', slug: 'shanghai-travel-guide', emoji: '🌆' },
      { name: 'Suzhou Travel Guide', slug: 'suzhou-travel-guide', emoji: '🌿' },
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
    ],
  },
  'suzhou-travel-guide': {
    hubUrl: '/china-tours', hubLabel: 'All China Tours',
    relatedTours: [
      { name: 'Shanghai & Suzhou (3 Days)', duration: '3 Days', price: 'From NZD $1,356', url: '/tours/china/stopover/shanghai-suzhou', image: `${TI}/suzhou-canal.jpg`, tier: 'stopover' },
      { name: 'Shanghai & Surroundings (10 Days)', duration: '10 Days', price: 'NZD $2,999', url: '/tours/china/discovery/shanghai-surroundings', image: `${TI}/wuzhen-canal.jpg`, tier: 'discovery' },
    ],
    relatedGuides: [
      { name: 'Shanghai Travel Guide', slug: 'shanghai-travel-guide', emoji: '🌆' },
      { name: 'Hangzhou Travel Guide', slug: 'hangzhou-travel-guide', emoji: '🍵' },
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
    ],
  },
  'chongqing-travel-guide': {
    hubUrl: '/china-tours', hubLabel: 'All China Tours',
    relatedTours: [
      { name: 'Natural China (16 Days)', duration: '16 Days', price: 'From NZD $7,670', url: '/tours/china/signature/landscapes', image: `${TI}/jiuzhaigou-lake.jpg`, tier: 'signature' },
      { name: 'China Panorama (27 Days)', duration: '27 Days', price: 'From NZD $10,899', url: '/tours/china/signature/grand-tour', image: `${TI}/great-wall-mist.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Chengdu Travel Guide', slug: 'chengdu-travel-guide', emoji: '🐼' },
      { name: 'Leshan Buddha', slug: 'leshan-buddha-travel-guide', emoji: '🏔️' },
      { name: 'Yunnan Travel Guide', slug: 'yunnan-travel-guide', emoji: '🌄' },
      { name: 'Guilin Travel Guide', slug: 'guilin-travel-guide', emoji: '🌊' },
    ],
  },
  'tianmen-mountain-travel-guide': {
    hubUrl: '/zhangjiajie-tours', hubLabel: 'All Zhangjiajie Tours',
    relatedTours: [
      { name: 'Zhangjiajie Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,899', url: '/tours/china/stopover/zhangjiajie', image: `${TI}/zhangjiajie.jpg`, tier: 'stopover' },
    ],
    relatedGuides: [
      { name: 'Zhangjiajie Guide', slug: 'zhangjiajie-travel-guide', emoji: '🌫️' },
      { name: 'Guilin Travel Guide', slug: 'guilin-travel-guide', emoji: '🌊' },
      { name: 'Yangshuo Travel Guide', slug: 'yangshuo-travel-guide', emoji: '🚵' },
      { name: 'Chengdu Travel Guide', slug: 'chengdu-travel-guide', emoji: '🐼' },
    ],
  },
};

const DEFAULT_CONFIG: GuideConfig = {
  hubUrl: '/china-tours', hubLabel: 'All China Tours',
  relatedTours: [
    { name: 'Best of China (15 Days)', duration: '15 Days', price: 'NZD $4,539', url: '/tours/china/discovery/essentials', image: `${TI}/great-wall-mist.jpg`, tier: 'discovery' },
    { name: 'China Panorama (27 Days)', duration: '27 Days', price: 'From NZD $10,899', url: '/tours/china/signature/grand-tour', image: `${TI}/forbidden-city-aerial.jpg`, tier: 'signature' },
  ],
  relatedGuides: [
    { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
    { name: 'Shanghai Travel Guide', slug: 'shanghai-travel-guide', emoji: '🌆' },
    { name: 'Yunnan Travel Guide', slug: 'yunnan-travel-guide', emoji: '🌄' },
    { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
  ],
};

// ─── Main Component ────────────────────────────────────────────────────────
export default function DestinationGuide({ guide }: { guide: DestinationGuideType }) {
  const config = GUIDE_CONFIG[guide.slug] ?? DEFAULT_CONFIG;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <HubHero
        title={guide.h1}
        subtitle={guide.heroSubtitle}
        backgroundImage={guide.heroImage}
        imageClassName={guide.heroImageClassName}
      />

      {/* ── Breadcrumb ── */}
      <nav className="bg-warm-50 border-b border-warm-100">
        <div className="container mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-1 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href={config.hubUrl} className="hover:text-primary transition-colors">
            {config.hubLabel}
          </Link>
          <span>/</span>
          <span className="text-accent font-medium">{guide.destinationName} Guide</span>
        </div>
      </nav>

      {/* ── Body: two-column layout ── */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ════════ LEFT: Main Content ════════ */}
          <main className="flex-1 min-w-0">

            {/* Table of Contents */}
            <nav className="mb-8 p-5 bg-warm-50 rounded-xl border border-warm-100">
              <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-3">
                In This Guide
              </h2>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm">
                {guide.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-primary hover:underline flex items-center gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#attractions" className="text-primary hover:underline flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {guide.sections.length + 1}
                    </span>
                    Top Attractions
                  </a>
                </li>
                <li>
                  <a href="#practical" className="text-primary hover:underline flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {guide.sections.length + 2}
                    </span>
                    Practical Info
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="text-primary hover:underline flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {guide.sections.length + 3}
                    </span>
                    FAQs
                  </a>
                </li>
              </ol>
            </nav>

            {/* Intro paragraphs */}
            <div className="mb-10 prose prose-lg max-w-none">
              {guide.introText.map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed text-[17px] mb-5">
                  {para}
                </p>
              ))}
            </div>

            {/* Inline mid-page CTA */}
            <div className="mb-10 rounded-xl bg-gradient-to-r from-accent to-accent/90 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-lg">{guide.destinationName} with CTS Tours</p>
                <p className="text-white/80 text-sm">Expert-led tours. Small groups. 33+ years in China.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link
                  href={config.hubUrl}
                  className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm whitespace-nowrap"
                >
                  View Tours →
                </Link>
                <Link
                  href="/tailor-made"
                  className="bg-white/15 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-white/25 transition-colors text-sm whitespace-nowrap"
                >
                  Tailor My Trip
                </Link>
              </div>
            </div>

            {/* Editorial Sections */}
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-serif font-bold text-accent mb-5 pb-3 border-b border-warm-100">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((para, j) => (
                    <p key={j} className="text-gray-700 leading-relaxed text-[16px]">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {/* Attractions */}
            <section id="attractions" className="mb-12 scroll-mt-20">
              <h2 className="text-2xl font-serif font-bold text-accent mb-6 pb-3 border-b border-warm-100">
                Top Attractions in {guide.destinationName}
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {guide.attractions.map((attraction, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-warm-100 p-5 hover:shadow-md hover:border-primary/30 transition-all bg-white"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-accent text-[15px] mb-1.5 leading-snug">
                          {attraction.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {attraction.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <span>⏱</span> {attraction.visitDuration}
                          </span>
                          <span className="flex items-center gap-1">
                            <span>📅</span> {attraction.bestTime}
                          </span>
                          {attraction.ticketInfo && (
                            <span className="flex items-center gap-1">
                              <span>🎫</span> {attraction.ticketInfo}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            {guide.galleryImages.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-accent mb-6 pb-3 border-b border-warm-100">
                  {guide.destinationName} Photo Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {guide.galleryImages.map((item, i) => {
                    const src = typeof item === 'string' ? item : item.src;
                    const extra = typeof item === 'string' ? '' : item.imgClass ?? '';
                    return (
                    <div
                      key={`${src}-${i}`}
                      className="relative overflow-hidden rounded-lg aspect-square bg-warm-100 group"
                    >
                      <Image
                        src={src}
                        alt={`${guide.destinationName} - ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className={['object-cover group-hover:scale-105 transition-transform duration-500', extra].filter(Boolean).join(' ')}
                        loading="lazy"
                      />
                    </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Practical Info */}
            <section id="practical" className="mb-12 scroll-mt-20">
              <h2 className="text-2xl font-serif font-bold text-accent mb-6 pb-3 border-b border-warm-100">
                Practical Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: '🚌', label: 'Getting Around', text: guide.practicalInfo.transportation },
                  { icon: '🌤', label: 'Climate & Best Time', text: `${guide.practicalInfo.climate} Best time: ${guide.practicalInfo.bestTime}` },
                  { icon: '💰', label: 'Budget', text: guide.practicalInfo.budget },
                  { icon: '🗣', label: 'Language & Safety', text: `${guide.practicalInfo.language} ${guide.practicalInfo.safety}` },
                ].map(({ icon, label, text }) => (
                  <div key={label} className="bg-warm-50 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{icon}</span>
                      <h3 className="font-bold text-accent text-sm uppercase tracking-wide">{label}</h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/best-time-to-visit-china"
                  className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                >
                  📅 Best Time to Visit China →
                </Link>
                <Link
                  href="/china-visa-guide-for-new-zealanders"
                  className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                >
                  📄 NZ entry & visa-free guide →
                </Link>
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="mb-12 scroll-mt-20">
              <h2 className="text-2xl font-serif font-bold text-accent mb-6 pb-3 border-b border-warm-100">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {guide.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-warm-100 rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer hover:bg-warm-50 transition-colors font-semibold text-accent">
                      <span>{faq.question}</span>
                      <span className="flex-shrink-0 text-primary group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <div className="px-5 pb-5 pt-1">
                      <p className="text-gray-700 text-[15px] leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Guides */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-accent mb-6 pb-3 border-b border-warm-100">
                Explore More Destinations
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {config.relatedGuides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/${g.slug}`}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-warm-100 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all text-center bg-white"
                  >
                    <span className="text-2xl">{g.emoji}</span>
                    <span className="text-sm font-semibold text-accent leading-snug">{g.name}</span>
                  </Link>
                ))}
              </div>
            </section>

          </main>

          {/* ════════ RIGHT: Sticky Sidebar ════════ */}
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-6 space-y-6">

              {/* Primary CTA Card */}
              <div className="rounded-2xl bg-gradient-to-br from-primary to-red-500 text-white p-6 shadow-lg">
                <h3 className="font-serif text-xl font-bold mb-2">
                  Plan Your {guide.destinationName} Trip
                </h3>
                <p className="text-white/85 text-sm mb-5 leading-relaxed">
                  Our China specialists craft personalised itineraries. No group rush — just your journey.
                </p>
                <Link
                  href="/tailor-made"
                  className="block w-full bg-white text-primary text-center font-bold py-3 rounded-lg hover:shadow-lg transition-shadow mb-3"
                >
                  Get a Free Consultation
                </Link>
                <Link
                  href={config.hubUrl}
                  className="block w-full bg-white/20 border border-white/30 text-white text-center font-semibold py-3 rounded-lg hover:bg-white/30 transition-colors text-sm"
                >
                  {config.hubLabel} →
                </Link>
              </div>

              {/* Quick Facts */}
              <div className="rounded-2xl border border-warm-100 bg-white p-5">
                <h3 className="font-bold text-accent text-sm uppercase tracking-widest mb-4">Quick Facts</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Best Time</dt>
                    <dd className="font-medium text-accent text-right">{guide.practicalInfo.bestTime}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2">
                    <dt className="text-gray-500 shrink-0">Entry (NZ passport)</dt>
                    <dd className="font-medium text-accent sm:text-right">
                      Visa-free up to 30 days (policy to 31 Dec 2026; confirm before travel)
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Currency</dt>
                    <dd className="font-medium text-accent text-right">Chinese Yuan (CNY)</dd>
                  </div>
                </dl>
                <div className="mt-4 pt-4 border-t border-warm-100">
                  <Link
                    href="/china-visa-guide-for-new-zealanders"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Read NZ entry guide →
                  </Link>
                </div>
              </div>

              {/* Related Tours */}
              {config.relatedTours.length > 0 && (
                <div className="rounded-2xl border border-warm-100 bg-white p-5">
                  <h3 className="font-bold text-accent text-sm uppercase tracking-widest mb-4">
                    Featured Tours
                  </h3>
                  <div className="space-y-4">
                    {config.relatedTours.map((tour) => (
                      <Link
                        key={tour.url}
                        href={tour.url}
                        className="flex gap-3 group"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-warm-100">
                          <Image
                            src={tour.image}
                            alt={tour.name}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${TIER_COLORS[tour.tier]}`}>
                            {tour.tier}
                          </span>
                          <p className="text-accent text-sm font-semibold mt-1 leading-snug group-hover:text-primary transition-colors">
                            {tour.name}
                          </p>
                          <p className="text-primary text-sm font-bold">{tour.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-warm-100">
                    <Link
                      href={config.hubUrl}
                      className="block text-center text-sm text-primary font-semibold hover:underline"
                    >
                      See all {config.hubLabel} →
                    </Link>
                  </div>
                </div>
              )}

              {/* Useful Links */}
              <div className="rounded-2xl border border-warm-100 bg-white p-5">
                <h3 className="font-bold text-accent text-sm uppercase tracking-widest mb-4">Useful Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/best-time-to-visit-china" className="text-primary hover:underline flex items-center gap-2">
                      📅 Best time to visit China
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-visa-guide-for-new-zealanders" className="text-primary hover:underline flex items-center gap-2">
                      📄 China entry for NZ passport holders
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-tours-from-new-zealand" className="text-primary hover:underline flex items-center gap-2">
                      ✈️ China tours from New Zealand
                    </Link>
                  </li>
                  <li>
                    <Link href="/tailor-made" className="text-primary hover:underline flex items-center gap-2">
                      🎯 Tailor-made China tours
                    </Link>
                  </li>
                </ul>
              </div>

            </div>
          </aside>
          {/* ════════ end Sidebar ════════ */}

        </div>
      </div>

      {/* ── Bottom CTA Banner ── */}
      <section className="bg-gradient-to-r from-primary to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-3">
            Ready to Experience {guide.destinationName}?
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Let our China specialists build your perfect itinerary. 33+ years of experience, small groups, authentic access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tailor-made"
              className="inline-block bg-white text-primary font-bold py-4 px-10 rounded-full hover:shadow-xl transition-shadow text-lg"
            >
              Plan My Custom Trip
            </Link>
            <Link
              href={config.hubUrl}
              className="inline-block bg-white/15 border-2 border-white text-white font-semibold py-4 px-10 rounded-full hover:bg-white/25 transition-colors"
            >
              Browse {guide.destinationName} Tours
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
