'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DestinationGuide as DestinationGuideType, getGuideBySlug } from '@/lib/data/guides';
import { getBlogPostBySlug } from '@/lib/data/blogs';
import { Icon, type IconName } from '@/components/ui/Icon';
import HubHero from './HubHero';
import Lightbox from '@/components/ui/Lightbox';
import { EYEBROW, H2_BAND, H2_SECTION, H3_CARD } from '@/lib/ui/typography';

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
  image?: string;
  imageClassName?: string;
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

      { name: 'Best of China (15 Days)', duration: '15 Days', price: 'NZD $4,080', url: '/tours/china/discovery/essentials', image: `${TI}/shanghai-night-blue.jpg`, tier: 'discovery' },
      { name: 'A Tale of Two Cities (10 Days)', duration: '10 Days', price: 'From NZD $3,480', url: '/tours/china/discovery/beijing-xian', image: `${TI}/forbidden-city-aerial.jpg`, tier: 'discovery' },      { name: 'Beijing Stopover (4 Days)', duration: '4 Days', price: 'From NZD $2,120', url: '/tours/china/stopover/beijing', image: `${TI}/forbidden-city-lion.jpg`, tier: 'stopover' },
      { name: 'Beijing Express (3 Days)', duration: '3 Days', price: 'From NZD $1,450', url: '/tours/china/stopover/beijing-express', image: `${TI}/forbidden-city-lion-2.jpg`, tier: 'stopover' },
      { name: 'Legacy of China (17 Days)', duration: '17 Days', price: 'NZD $9,999', url: '/tours/china/signature/imperial-heritage', image: `${TI}/forbidden-city-aerial.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Temple of Heaven', slug: 'temple-of-heaven-travel-guide', emoji: '🛕', image: '/images/guides/temple-of-heaven/hero.webp', imageClassName: 'object-[center_58%]' },
      { name: 'Great Wall Guide', slug: 'great-wall-travel-guide', emoji: '🏯', image: '/images/cts-upgrade/experience-wall.webp', imageClassName: 'object-[center_45%]' },
      { name: 'Forbidden City', slug: 'forbidden-city-travel-guide', emoji: '🏛️', image: '/images/tours/forbidden-city-aerial.jpg', imageClassName: 'object-[center_48%]' },
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺', image: '/images/tours/xian-terracotta.jpg', imageClassName: 'object-[center_68%]' },
    ],
  },
  'xian-travel-guide': {
    hubUrl: '/xian-tours', hubLabel: "All Xi'an Tours",
    relatedTours: [

      { name: 'A Tale of Two Cities (10 Days)', duration: '10 Days', price: 'From NZD $3,480', url: '/tours/china/discovery/beijing-xian', image: `${TI}/xian-terracotta.jpg`, tier: 'discovery' },      { name: "Xi'an Stopover (3 Days)", duration: '3 Days', price: 'From NZD $945', url: '/tours/china/stopover/xian', image: `${TI}/xian-terracotta.jpg`, tier: 'stopover' },
      { name: 'Best of China (15 Days)', duration: '15 Days', price: 'NZD $4,080', url: '/tours/china/discovery/essentials', image: `${TI}/shanghai-night-blue.jpg`, tier: 'discovery' },
      { name: 'Silk Road (18 Days)', duration: '18 Days', price: 'From NZD $7,999', url: '/tours/china/signature/silk-road', image: `${TI}/silk-road-wall.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: "Xi'an City Wall", slug: 'xian-city-wall-travel-guide', emoji: '🏰' },
      { name: 'Big Wild Goose Pagoda', slug: 'big-wild-goose-pagoda-travel-guide', emoji: '🛕' },
      { name: 'Terracotta Warriors', slug: 'terracotta-warriors-travel-guide', emoji: '⚔️' },
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
    ],
  },
  'shanghai-travel-guide': {
    hubUrl: '/shanghai-tours', hubLabel: 'All Shanghai Tours',
    relatedTours: [
      { name: 'Best of China (15 Days)', duration: '15 Days', price: 'NZD $4,080', url: '/tours/china/discovery/essentials', image: `${TI}/shanghai-night-blue.jpg`, tier: 'discovery' },
      { name: 'Shanghai Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,060', url: '/tours/china/stopover/shanghai', image: `${TI}/shanghai-night-red.jpg`, tier: 'stopover' },
      { name: 'A Tale of Two Cities (10 Days)', duration: '10 Days', price: 'From NZD $3,480', url: '/tours/china/discovery/beijing-xian', image: `${TI}/forbidden-city-gold-lion.jpg`, tier: 'discovery' },
      { name: 'Shanghai & Surroundings (10 Days)', duration: '10 Days', price: 'NZD $3,399', url: '/tours/china/discovery/shanghai-surroundings', image: `${TI}/wuzhen-canal.jpg`, tier: 'discovery' },
    ],
    relatedGuides: [
      { name: 'The Bund', slug: 'the-bund-travel-guide', emoji: '🌉' },
      { name: 'Yu Garden', slug: 'yu-garden-travel-guide', emoji: '🪷' },
      { name: 'Suzhou Travel Guide', slug: 'suzhou-travel-guide', emoji: '🌿' },
      { name: 'Hangzhou Travel Guide', slug: 'hangzhou-travel-guide', emoji: '🍵' },
    ],
  },
  'chengdu-travel-guide': {
    hubUrl: '/chengdu-tours', hubLabel: 'All Chengdu Tours',
    relatedTours: [

      { name: 'Fire & Fuzz (10 Days)', duration: '10 Days', price: 'From NZD $2,999', url: '/tours/china/discovery/chongqing-chengdu', image: `${TI}/chengdu-pandas.jpg`, tier: 'discovery' },      { name: 'Chengdu Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,359', url: '/tours/china/stopover/chengdu', image: `${TI}/chengdu-pandas.jpg`, tier: 'stopover' },
      { name: 'Natural China (16 Days)', duration: '16 Days', price: 'From NZD $7,670', url: '/tours/china/signature/landscapes', image: `${TI}/jiuzhaigou-lake.jpg`, tier: 'signature' },
      { name: 'China Panorama (27 Days)', duration: '27 Days', price: 'From NZD $10,899', url: '/tours/china/signature/grand-tour', image: `${TI}/great-wall-mist.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Panda Sanctuary Guide', slug: 'chengdu-panda-sanctuary', emoji: '🐼' },
      { name: 'Leshan Buddha', slug: 'leshan-buddha-travel-guide', emoji: '🏔️' },
      { name: 'Yunnan Travel Guide', slug: 'yunnan-travel-guide', emoji: '🌄' },
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
    ],
  },
  'guilin-travel-guide': {
    hubUrl: '/guilin-tours', hubLabel: 'All Guilin Tours',
    relatedTours: [
      { name: 'Guilin Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,099', url: '/tours/china/stopover/guilin', image: '/images/tours/yangshuo-karst-aerial.jpg', tier: 'stopover' },
      { name: 'Guilin & Surrounds (4 Days)', duration: '4 Days', price: 'From NZD $1,310', url: '/tours/china/stopover/guilin-surrounds', image: '/images/tours/yangshuo-karst-aerial.jpg', tier: 'stopover' },
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
      { name: 'Colorful Yunnan (11 Days)', duration: '11 Days', price: 'NZD $3,899', url: '/tours/china/discovery/yunnan-explorer', image: `${TI}/shangri-la-monastery.jpg`, tier: 'discovery' },
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
      { name: 'Colorful Yunnan (11 Days)', duration: '11 Days', price: 'NZD $3,899', url: '/tours/china/discovery/yunnan-explorer', image: `${TI}/shangri-la-monastery.jpg`, tier: 'discovery' },
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
      { name: 'Colorful Yunnan (11 Days)', duration: '11 Days', price: 'NZD $3,899', url: '/tours/china/discovery/yunnan-explorer', image: `${TI}/shangri-la-monastery.jpg`, tier: 'discovery' },
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
      { name: 'Colorful Yunnan (11 Days)', duration: '11 Days', price: 'NZD $3,899', url: '/tours/china/discovery/yunnan-explorer', image: `${TI}/shangri-la-monastery.jpg`, tier: 'discovery' },
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
      { name: 'Colorful Yunnan (11 Days)', duration: '11 Days', price: 'NZD $3,899', url: '/tours/china/discovery/yunnan-explorer', image: `${TI}/shangri-la-monastery.jpg`, tier: 'discovery' },
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

      { name: 'A Tale of Two Cities (10 Days)', duration: '10 Days', price: 'From NZD $3,480', url: '/tours/china/discovery/beijing-xian', image: `${TI}/great-wall-mist.jpg`, tier: 'discovery' },      { name: 'Beijing Stopover (4 Days)', duration: '4 Days', price: 'From NZD $2,120', url: '/tours/china/stopover/beijing', image: `${TI}/forbidden-city-lion.jpg`, tier: 'stopover' },
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

      { name: 'A Tale of Two Cities (10 Days)', duration: '10 Days', price: 'From NZD $3,480', url: '/tours/china/discovery/beijing-xian', image: `${TI}/forbidden-city-aerial.jpg`, tier: 'discovery' },      { name: 'Beijing Stopover (4 Days)', duration: '4 Days', price: 'From NZD $2,120', url: '/tours/china/stopover/beijing', image: `${TI}/forbidden-city-lion.jpg`, tier: 'stopover' },
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

      { name: 'A Tale of Two Cities (10 Days)', duration: '10 Days', price: 'From NZD $3,480', url: '/tours/china/discovery/beijing-xian', image: `${TI}/xian-terracotta.jpg`, tier: 'discovery' },      { name: "Xi'an Stopover (3 Days)", duration: '3 Days', price: 'From NZD $945', url: '/tours/china/stopover/xian', image: `${TI}/xian-terracotta.jpg`, tier: 'stopover' },
      { name: 'Best of China (15 Days)', duration: '15 Days', price: 'NZD $4,080', url: '/tours/china/discovery/essentials', image: `${TI}/shanghai-night-blue.jpg`, tier: 'discovery' },
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

      { name: 'Fire & Fuzz (10 Days)', duration: '10 Days', price: 'From NZD $2,999', url: '/tours/china/discovery/chongqing-chengdu', image: `${TI}/chengdu-pandas.jpg`, tier: 'discovery' },      { name: 'Chengdu Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,359', url: '/tours/china/stopover/chengdu', image: `${TI}/chengdu-pandas.jpg`, tier: 'stopover' },
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
      { name: 'Guilin & Surrounds (4 Days)', duration: '4 Days', price: 'From NZD $1,310', url: '/tours/china/stopover/guilin-surrounds', image: '/images/tours/yangshuo-karst-aerial.jpg', tier: 'stopover' },
      { name: 'Guilin Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,099', url: '/tours/china/stopover/guilin', image: '/images/tours/yangshuo-karst-aerial.jpg', tier: 'stopover' },
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
      { name: 'Guilin & Surrounds (4 Days)', duration: '4 Days', price: 'From NZD $1,310', url: '/tours/china/stopover/guilin-surrounds', image: '/images/tours/yangshuo-karst-aerial.jpg', tier: 'stopover' },
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
    hubUrl: '/hangzhou-tours', hubLabel: 'All Hangzhou Tours',
    relatedTours: [
      { name: 'Shanghai & Surroundings (10 Days)', duration: '10 Days', price: 'NZD $3,399', url: '/tours/china/discovery/shanghai-surroundings', image: `${TI}/wuzhen-canal.jpg`, tier: 'discovery' },
      { name: 'Best of China (15 Days)', duration: '15 Days', price: 'NZD $4,080', url: '/tours/china/discovery/essentials', image: `${TI}/shanghai-night-blue.jpg`, tier: 'discovery' },
    ],
    relatedGuides: [
      { name: 'West Lake', slug: 'west-lake-travel-guide', emoji: '🪷' },
      { name: 'Shanghai Travel Guide', slug: 'shanghai-travel-guide', emoji: '🌆' },
      { name: 'Suzhou Travel Guide', slug: 'suzhou-travel-guide', emoji: '🌿' },
      { name: 'Yu Garden', slug: 'yu-garden-travel-guide', emoji: '🪷' },
    ],
  },
  'suzhou-travel-guide': {
    hubUrl: '/suzhou-tours', hubLabel: 'All Suzhou Tours',
    relatedTours: [
      { name: 'Shanghai & Suzhou (3 Days)', duration: '3 Days', price: 'From NZD $1,356', url: '/tours/china/stopover/shanghai-suzhou', image: `${TI}/suzhou-canal.jpg`, tier: 'stopover' },
      { name: 'Shanghai & Surroundings (10 Days)', duration: '10 Days', price: 'NZD $3,399', url: '/tours/china/discovery/shanghai-surroundings', image: `${TI}/wuzhen-canal.jpg`, tier: 'discovery' },
    ],
    relatedGuides: [
      { name: 'Shanghai Travel Guide', slug: 'shanghai-travel-guide', emoji: '🌆' },
      { name: 'Hangzhou Travel Guide', slug: 'hangzhou-travel-guide', emoji: '🍵' },
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
    ],
  },
  'chongqing-travel-guide': {
    hubUrl: '/chongqing-tours', hubLabel: 'All Chongqing Tours',
    relatedTours: [

      { name: 'Fire & Fuzz (10 Days)', duration: '10 Days', price: 'From NZD $2,999', url: '/tours/china/discovery/chongqing-chengdu', image: `${TI}/chengdu-pandas.jpg`, tier: 'discovery' },      { name: 'Natural China (16 Days)', duration: '16 Days', price: 'From NZD $7,670', url: '/tours/china/signature/landscapes', image: `${TI}/jiuzhaigou-lake.jpg`, tier: 'signature' },
      { name: 'China Panorama (27 Days)', duration: '27 Days', price: 'From NZD $10,899', url: '/tours/china/signature/grand-tour', image: `${TI}/great-wall-mist.jpg`, tier: 'signature' },
    ],
    relatedGuides: [
      { name: 'Liziba Station Guide', slug: 'liziba-station-chongqing', emoji: '🚝' },
      { name: 'Hongyadong Guide', slug: 'hongyadong-chongqing', emoji: '🏮' },
      { name: 'Chengdu Travel Guide', slug: 'chengdu-travel-guide', emoji: '🐼' },
      { name: 'Leshan Buddha', slug: 'leshan-buddha-travel-guide', emoji: '🏔️' },
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
  'temple-of-heaven-travel-guide': {
    hubUrl: '/beijing-tours', hubLabel: 'All Beijing Tours',
    relatedTours: [
      { name: 'A Tale of Two Cities (10 Days)', duration: '10 Days', price: 'From NZD $3,480', url: '/tours/china/discovery/beijing-xian', image: '/images/guides/temple-of-heaven/detail.webp', tier: 'discovery' },
      { name: 'Beijing Stopover (4 Days)', duration: '4 Days', price: 'From NZD $2,120', url: '/tours/china/stopover/beijing', image: '/images/guides/temple-of-heaven/gallery.webp', tier: 'stopover' },
    ],
    relatedGuides: [
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
      { name: 'Forbidden City', slug: 'forbidden-city-travel-guide', emoji: '🏛️' },
      { name: 'Great Wall Guide', slug: 'great-wall-travel-guide', emoji: '⛰️' },
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
    ],
  },
  'xian-city-wall-travel-guide': {
    hubUrl: '/xian-tours', hubLabel: "All Xi'an Tours",
    relatedTours: [
      { name: 'A Tale of Two Cities (10 Days)', duration: '10 Days', price: 'From NZD $3,480', url: '/tours/china/discovery/beijing-xian', image: '/images/guides/xian-city-wall/hero.webp', tier: 'discovery' },
      { name: "Xi'an Stopover (3 Days)", duration: '3 Days', price: 'From NZD $945', url: '/tours/china/stopover/xian', image: `${TI}/xian-terracotta-2.jpg`, tier: 'stopover' },
    ],
    relatedGuides: [
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺' },
      { name: 'Big Wild Goose Pagoda', slug: 'big-wild-goose-pagoda-travel-guide', emoji: '🛕' },
      { name: 'Terracotta Warriors', slug: 'terracotta-warriors-travel-guide', emoji: '⚔️' },
      { name: 'Beijing Travel Guide', slug: 'beijing-travel-guide', emoji: '🏯' },
    ],
  },
  'big-wild-goose-pagoda-travel-guide': {
    hubUrl: '/xian-tours', hubLabel: "All Xi'an Tours",
    relatedTours: [
      { name: 'A Tale of Two Cities (10 Days)', duration: '10 Days', price: 'From NZD $3,480', url: '/tours/china/discovery/beijing-xian', image: '/images/guides/big-wild-goose-pagoda/hero.webp', tier: 'discovery' },
      { name: "Xi'an Stopover (3 Days)", duration: '3 Days', price: 'From NZD $945', url: '/tours/china/stopover/xian', image: `${TI}/xian-terracotta.jpg`, tier: 'stopover' },
    ],
    relatedGuides: [
      { name: "Xi'an Travel Guide", slug: 'xian-travel-guide', emoji: '🏺', image: '/images/blog/first-time-destinations/xian.webp' },
      { name: "Xi'an City Wall", slug: 'xian-city-wall-travel-guide', emoji: '🏰', image: '/images/guides/xian-city-wall/hero.webp', imageClassName: 'object-[center_55%]' },
      { name: 'Terracotta Warriors', slug: 'terracotta-warriors-travel-guide', emoji: '⚔️', image: `${TI}/xian-terracotta-2.jpg` },
      { name: 'Beijing & Xi’an Journey', slug: 'beijing-xian-discovery-guide', emoji: '🐫', image: `${TI}/forbidden-city-aerial.jpg` },
    ],
  },
  'west-lake-travel-guide': {
    hubUrl: '/hangzhou-tours', hubLabel: 'All Hangzhou Tours',
    relatedTours: [
      { name: 'Shanghai & Surroundings (10 Days)', duration: '10 Days', price: 'NZD $3,399', url: '/tours/china/discovery/shanghai-surroundings', image: '/images/guides/west-lake/causeway.webp', tier: 'discovery' },
      { name: 'Best of China (15 Days)', duration: '15 Days', price: 'NZD $4,080', url: '/tours/china/discovery/essentials', image: '/images/guides/west-lake/gallery.webp', tier: 'discovery' },
    ],
    relatedGuides: [
      { name: 'Hangzhou Travel Guide', slug: 'hangzhou-travel-guide', emoji: '🍵' },
      { name: 'Shanghai Travel Guide', slug: 'shanghai-travel-guide', emoji: '🌆' },
      { name: 'Suzhou Travel Guide', slug: 'suzhou-travel-guide', emoji: '🌿' },
      { name: 'Yu Garden', slug: 'yu-garden-travel-guide', emoji: '🪷' },
    ],
  },
  'yu-garden-travel-guide': {
    hubUrl: '/shanghai-tours', hubLabel: 'All Shanghai Tours',
    relatedTours: [
      { name: 'Shanghai & Surroundings (10 Days)', duration: '10 Days', price: 'NZD $3,399', url: '/tours/china/discovery/shanghai-surroundings', image: '/images/guides/yu-garden/pavilion.webp', tier: 'discovery' },
      { name: 'Shanghai Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,060', url: '/tours/china/stopover/shanghai', image: '/images/guides/yu-garden/gallery.webp', tier: 'stopover' },
    ],
    relatedGuides: [
      { name: 'Shanghai Travel Guide', slug: 'shanghai-travel-guide', emoji: '🌆' },
      { name: 'The Bund', slug: 'the-bund-travel-guide', emoji: '🌉' },
      { name: 'Suzhou Travel Guide', slug: 'suzhou-travel-guide', emoji: '🌿' },
      { name: 'West Lake', slug: 'west-lake-travel-guide', emoji: '🪷' },
    ],
  },
  'the-bund-travel-guide': {
    hubUrl: '/shanghai-tours', hubLabel: 'All Shanghai Tours',
    relatedTours: [
      { name: 'Shanghai & Surroundings (10 Days)', duration: '10 Days', price: 'NZD $3,399', url: '/tours/china/discovery/shanghai-surroundings', image: '/images/guides/the-bund/skyline.webp', tier: 'discovery' },
      { name: 'Shanghai Stopover (3 Days)', duration: '3 Days', price: 'From NZD $1,060', url: '/tours/china/stopover/shanghai', image: '/images/guides/the-bund/night.webp', tier: 'stopover' },
    ],
    relatedGuides: [
      { name: 'Shanghai Travel Guide', slug: 'shanghai-travel-guide', emoji: '🌆' },
      { name: 'Yu Garden', slug: 'yu-garden-travel-guide', emoji: '🪷' },
      { name: 'Hangzhou Travel Guide', slug: 'hangzhou-travel-guide', emoji: '🍵' },
      { name: 'Suzhou Travel Guide', slug: 'suzhou-travel-guide', emoji: '🌿' },
    ],
  },
};

const DEFAULT_CONFIG: GuideConfig = {
  hubUrl: '/china-tours', hubLabel: 'All China Tours',
  relatedTours: [
    { name: 'Best of China (15 Days)', duration: '15 Days', price: 'NZD $4,080', url: '/tours/china/discovery/essentials', image: `${TI}/great-wall-mist.jpg`, tier: 'discovery' },
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
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const guideTocItems = [
    ...(guide.inspirationVideos?.length ? [{ id: 'watch-zhangjiajie', title: 'Watch Zhangjiajie' }] : []),
    ...(guide.mapGuide ? [{ id: 'map-guide', title: 'Map & route planner' }] : []),
    ...(guide.featuredTour ? [{ id: 'featured-stopover', title: guide.featuredTour.title }] : []),
    ...guide.sections.map((section) => ({ id: section.id, title: section.title })),
    { id: 'attractions', title: 'Top Attractions' },
    { id: 'practical', title: 'Practical Info' },
    { id: 'faqs', title: 'FAQs' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <HubHero
        title={guide.h1}
        subtitle={guide.heroSubtitle}
        backgroundImage={guide.heroImage}
        imageClassName={guide.heroImageClassName}
        imageCredit={guide.heroImageCredit}
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
      <div className="container mx-auto px-4 section-space">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ════════ LEFT: Main Content ════════ */}
          <main className="flex-1 min-w-0">

            {/* Table of Contents */}
            <nav className="mb-8 p-5 bg-warm-50 rounded-2xl border border-border">
              <h2 className={`${EYEBROW} mb-3`}>
                In This Guide
              </h2>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm">
                {guideTocItems.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-primary hover:underline flex items-center gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      {item.title}
                    </a>
                  </li>
                ))}
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

            {guide.quickAnswer && guide.visitPlanning && (
              <aside data-geo-summary className="mb-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <p className={`${EYEBROW} mb-2`}>Quick answer</p>
                <p className="text-[17px] leading-relaxed text-accent">{guide.quickAnswer}</p>
                <dl className="mt-5 grid gap-4 border-t border-primary/15 pt-5 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary">Recommended time</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-700">{guide.visitPlanning.recommendedVisitLength}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary">Best for</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-700">{guide.visitPlanning.bestFor}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary">Combine with</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-700">{guide.visitPlanning.combineWith}</dd>
                  </div>
                </dl>
              </aside>
            )}

            {guide.inspirationVideos && guide.inspirationVideos.length > 0 && (
              <section id="watch-zhangjiajie" className="mb-12 scroll-mt-20">
                <p className={`${EYEBROW} mb-2`}>See it before you plan it</p>
                <h2 className={H2_SECTION}>Why younger travellers put Zhangjiajie on the list</h2>
                <p className="-mt-4 mb-6 max-w-3xl text-gray-600 leading-relaxed">
                  The scale is difficult to understand from a single photograph. These two films show the difference between the Avatar-style pillar landscape and Tianmen Mountain&apos;s high-altitude adventure route.
                </p>
                <div className="grid gap-5 md:grid-cols-2">
                  {guide.inspirationVideos.map((video) => {
                    const isActive = activeVideo === video.youtubeId;
                    return (
                      <article key={video.youtubeId} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                        <div className="relative aspect-video overflow-hidden bg-accent">
                          {isActive ? (
                            <iframe
                              className="absolute inset-0 h-full w-full"
                              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                              title={video.title}
                              loading="lazy"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => setActiveVideo(video.youtubeId)}
                              className="group absolute inset-0 w-full bg-cover bg-center text-left"
                              style={{ backgroundImage: `linear-gradient(180deg, rgba(14,23,38,0.06), rgba(14,23,38,0.54)), url(https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg)` }}
                              aria-label={`Play ${video.title}`}
                            >
                              <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-transform group-hover:scale-110">
                                <span className="ml-1 text-2xl" aria-hidden="true">▶</span>
                              </span>
                              <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">{video.duration}</span>
                            </button>
                          )}
                        </div>
                        <div className="p-5">
                          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">YouTube · {video.creator}</p>
                          <h3 className={`${H3_CARD} mb-2`}>{video.title}</h3>
                          <p className="text-sm leading-relaxed text-gray-600">{video.description}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-gray-500">
                  Videos are hosted by their creators on YouTube. Playback loads only after you press play; routes and operating arrangements may have changed since filming.
                </p>
              </section>
            )}

            {guide.mapGuide && (
              <section id="map-guide" className="mb-12 scroll-mt-20">
                <p className={`${EYEBROW} mb-2`}>Map first, itinerary second</p>
                <h2 className={H2_SECTION}>{guide.mapGuide.title}</h2>
                <p className="-mt-4 mb-6 max-w-3xl text-gray-600 leading-relaxed">{guide.mapGuide.summary}</p>
                <div className="overflow-hidden rounded-3xl border border-border bg-[#f3efe5]">
                  <div className="grid lg:grid-cols-[1.05fr_1fr]">
                    <div className="relative min-h-[430px] overflow-hidden border-b border-border bg-[radial-gradient(circle_at_70%_25%,rgba(88,132,91,0.26),transparent_28%),radial-gradient(circle_at_22%_78%,rgba(69,111,137,0.18),transparent_25%),linear-gradient(145deg,#e9e4d5,#f8f5ed)] lg:min-h-[570px] lg:border-b-0 lg:border-r">
                      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M22 75 C36 66 48 51 62 33 C71 26 79 27 88 28" fill="none" stroke="#c32232" strokeWidth="1.2" strokeDasharray="2.5 2.5" vectorEffect="non-scaling-stroke" />
                        <path d="M22 75 C21 82 19 87 18 91" fill="none" stroke="#c32232" strokeWidth="1.2" strokeDasharray="2.5 2.5" vectorEffect="non-scaling-stroke" />
                        <path d="M2 63 C18 57 30 58 45 66 C60 74 74 73 98 61" fill="none" stroke="#9ab2b9" strokeWidth="0.8" opacity="0.7" vectorEffect="non-scaling-stroke" />
                        <path d="M2 46 C20 40 34 43 51 38 C69 32 81 14 98 12" fill="none" stroke="#b9ae92" strokeWidth="0.6" opacity="0.75" vectorEffect="non-scaling-stroke" />
                      </svg>
                      <div className="absolute left-5 top-5 max-w-[230px] rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">Orientation map</p>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">A planning diagram, not a road-navigation map. Tap any place in the list for its live map location.</p>
                      </div>
                      {guide.mapGuide.stops.map((stop) => (
                        <div
                          key={stop.number}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${stop.position.x}%`, top: `${stop.position.y}%` }}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-primary text-sm font-bold text-white shadow-lg">
                            {stop.number}
                          </div>
                          <span className="absolute left-1/2 top-11 w-28 -translate-x-1/2 text-center text-[11px] font-bold leading-tight text-accent">
                            {stop.name.split(' & ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white p-5 sm:p-7">
                      <div className="space-y-5">
                        {guide.mapGuide.stops.map((stop) => (
                          <article key={stop.number} className="flex gap-4 border-b border-warm-100 pb-5 last:border-0 last:pb-0">
                            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{stop.number}</span>
                            <div>
                              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                <h3 className="font-semibold text-accent">{stop.name}</h3>
                                <a href={stop.mapUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">Open map ↗</a>
                              </div>
                              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">{stop.base}</p>
                              <p className="mt-2 text-sm leading-relaxed text-gray-600">{stop.description}</p>
                              <p className="mt-2 text-xs leading-relaxed text-gray-500">{stop.travelNote}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-3 border-t border-border bg-warm-50 p-5 sm:grid-cols-3 sm:p-6">
                    {guide.mapGuide.planningNotes.map((note, index) => (
                      <div key={note} className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-relaxed text-gray-700">
                        <span className="font-bold text-primary">0{index + 1}</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {guide.featuredTour && (
              <section id="featured-stopover" className="mb-12 scroll-mt-20 overflow-hidden rounded-3xl bg-accent text-white shadow-xl">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[280px] lg:min-h-full">
                    <Image
                      src={guide.featuredTour.image}
                      alt={guide.featuredTour.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-accent/30" />
                    {guide.featuredTour.imageCredit && (
                      <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[10px] text-white/80 backdrop-blur">
                        {guide.featuredTour.imageCredit}
                      </span>
                    )}
                  </div>
                  <div className="p-6 sm:p-9">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-red-300">{guide.featuredTour.eyebrow}</p>
                    <h2 className={`${H2_BAND} mb-3 text-3xl`}>{guide.featuredTour.title}</h2>
                    <div className="mb-5 flex flex-wrap gap-2 text-sm">
                      <span className="rounded-full bg-white/10 px-3 py-1.5">{guide.featuredTour.duration}</span>
                      <span className="rounded-full bg-white/10 px-3 py-1.5">{guide.featuredTour.price}</span>
                    </div>
                    <p className="mb-6 leading-relaxed text-white/80">{guide.featuredTour.summary}</p>
                    <ul className="mb-7 grid gap-3 text-sm sm:grid-cols-2">
                      {guide.featuredTour.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2 leading-relaxed text-white/90">
                          <span className="text-red-300" aria-hidden="true">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link href={guide.featuredTour.href} className="rounded-full bg-primary px-6 py-3 text-center font-bold text-white transition-colors hover:bg-red-500">View the 3-day stopover →</Link>
                      <Link href="/tailor-made" className="rounded-full border border-white/30 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-white/10">Add it to my China trip</Link>
                    </div>
                  </div>
                </div>
              </section>
            )}

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
                <h2 className={H2_SECTION}>
                  {section.title}
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-[16px]">
                    {section.content[0]}
                  </p>
                  {section.image && (
                    <figure className="my-6 overflow-hidden rounded-2xl border border-border bg-warm-50">
                      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
                        <Image
                          src={section.image.src}
                          alt={section.image.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 850px"
                          className={`object-cover ${section.image.imageClassName ?? ''}`}
                        />
                      </div>
                      <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-gray-600">
                        {section.image.caption}
                      </figcaption>
                    </figure>
                  )}
                  {section.content.slice(1).map((para, j) => (
                    <p key={j + 1} className="text-gray-700 leading-relaxed text-[16px]">
                      {para}
                    </p>
                  ))}
                  {section.link && (
                    <a
                      href={section.link.href}
                      className="inline-block text-primary font-medium hover:underline text-[15px]"
                    >
                      {section.link.label}
                    </a>
                  )}
                </div>
              </section>
            ))}

            {/* Attractions */}
            <section id="attractions" className="mb-12 scroll-mt-20">
              <h2 className={H2_SECTION}>
                Top Attractions in {guide.destinationName}
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {guide.attractions.map((attraction, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all bg-white"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className={`${H3_CARD} mb-1.5`}>
                          {attraction.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {attraction.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Icon name="clock" className="w-4 h-4 text-primary" /> {attraction.visitDuration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="calendar" className="w-4 h-4 text-primary" /> {attraction.bestTime}
                          </span>
                          {attraction.ticketInfo && (
                            <span className="flex items-center gap-1">
                              <Icon name="ticket" className="w-4 h-4 text-primary" /> {attraction.ticketInfo}
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
              <section id="photo-gallery" className="mb-12 scroll-mt-20">
                <h2 className={H2_SECTION}>
                  {guide.destinationName} Photo Gallery
                </h2>
                <Lightbox
                  columns={3}
                  images={guide.galleryImages.map((item, i) => ({
                    src: typeof item === 'string' ? item : item.src,
                    alt: typeof item === 'string' ? `${guide.destinationName} — photo ${i + 1}` : item.alt ?? `${guide.destinationName} — photo ${i + 1}`,
                    caption: typeof item === 'string' ? undefined : item.caption,
                    imgClass: typeof item === 'string' ? undefined : item.imgClass,
                  }))}
                />
              </section>
            )}

            {/* Practical Info */}
            <section id="practical" className="mb-12 scroll-mt-20">
              <h2 className={H2_SECTION}>
                Practical <span data-slot="italic">Information</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {([
                  { icon: 'bus', label: 'Getting Around', text: guide.practicalInfo.transportation },
                  { icon: 'cloud', label: 'Climate & Best Time', text: `${guide.practicalInfo.climate} Best time: ${guide.practicalInfo.bestTime}` },
                  { icon: 'coins', label: 'Budget', text: guide.practicalInfo.budget },
                  { icon: 'message', label: 'Language & Safety', text: `${guide.practicalInfo.language} ${guide.practicalInfo.safety}` },
                ] as { icon: IconName; label: string; text: string }[]).map(({ icon, label, text }) => (
                  <div key={label} className="bg-warm-50 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={icon} className="w-5 h-5 text-primary" />
                      <h3 className={EYEBROW}>{label}</h3>
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
                  <Icon name="calendar" className="w-4 h-4" /> Best Time to Visit China →
                </Link>
                <Link
                  href="/china-visa-guide-for-new-zealanders"
                  className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                >
                  <Icon name="file-text" className="w-4 h-4" /> NZ entry & visa-free guide →
                </Link>
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="mb-12 scroll-mt-20">
              <h2 className={H2_SECTION}>
                Frequently <span data-slot="italic">Asked</span> Questions
              </h2>
              <div className="space-y-3">
                {guide.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-border rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer hover:bg-warm-50 transition-colors font-semibold text-accent">
                      <span>{faq.question}</span>
                      <Icon name="chevron-down" className="w-4 h-4 flex-shrink-0 text-primary group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-5 pb-5 pt-1">
                      <p className="text-gray-700 text-[15px] leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Blog Articles */}
            {guide.relatedBlogSlugs && guide.relatedBlogSlugs.length > 0 && (
              <section id="recommended-reading" className="mb-12 scroll-mt-20">
                <h2 className={H2_SECTION}>
                  Recommended <span data-slot="italic">Reading</span>
                </h2>
                <p className="-mt-4 mb-6 max-w-3xl text-gray-600 leading-relaxed">
                  Continue the story with practical routes, local food, transport and the wider history of {guide.parentDestination ?? guide.destinationName}.
                </p>
                <div className="grid grid-cols-1 min-[560px]:grid-cols-2 xl:grid-cols-3 gap-5">
                  {guide.relatedBlogSlugs.map((slug) => {
                    const post = getBlogPostBySlug(slug);
                    if (!post) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/blog/${slug}`}
                        className="flex flex-col rounded-2xl border border-border hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden bg-white group"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-warm-100">
                          <Image
                            src={post.heroImage}
                            alt={`${post.title} — CTS Tours travel article`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 260px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 p-5 flex flex-col">
                          <div className="mb-3">
                            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-accent mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{post.author}</span>
                            {post.readTime && <span>{post.readTime}</span>}
                          </div>
                        </div>
                        <div className="px-5 py-3 bg-warm-50 border-t border-border text-sm text-primary font-semibold group-hover:text-primary/80 transition-colors">
                          Read Article →
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {guide.sources && guide.sources.length > 0 && (
              <aside className="mb-12 rounded-2xl border border-warm-200 bg-warm-50 p-5 text-sm text-gray-600">
                <p className={`${EYEBROW} mb-2`}>Sources & editorial review</p>
                <p className="mb-3 leading-relaxed">
                  Core destination facts were checked against the primary sources below. Prices, opening hours and entry rules can change, so confirm them before travel.
                </p>
                <ul className="space-y-1.5">
                  {guide.sources.map((source) => (
                    <li key={source.href}>
                      <a className="font-medium text-primary hover:underline" href={source.href} target="_blank" rel="noopener noreferrer">
                        {source.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-gray-500">Last reviewed: {guide.updatedAt}</p>
              </aside>
            )}

            {/* Related Guides */}
            <section id="explore-more" className="mb-12 scroll-mt-20">
              <h2 className={H2_SECTION}>
                Explore More Destinations
              </h2>
              <div className="grid grid-cols-1 min-[440px]:grid-cols-2 xl:grid-cols-4 gap-4">
                {config.relatedGuides.map((g) => {
                  const relatedGuide = getGuideBySlug(g.slug);
                  const image = g.image ?? relatedGuide?.heroImage;
                  const imageClassName = g.imageClassName ?? relatedGuide?.heroImageClassName;
                  return (
                    <Link
                      key={g.slug}
                      href={`/${g.slug}`}
                      className="group overflow-hidden rounded-2xl border border-border hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all bg-white"
                    >
                      {image ? (
                        <div className="relative aspect-[16/10] overflow-hidden bg-warm-100">
                          <Image
                            src={image}
                            alt={`${g.name} travel guide`}
                            fill
                            sizes="(max-width: 439px) 100vw, (max-width: 1279px) 50vw, 180px"
                            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${imageClassName ?? ''}`}
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[16/10] items-center justify-center bg-warm-50">
                          <Icon name="map-pin" className="w-7 h-7 text-primary" />
                        </div>
                      )}
                      <div className="p-4 text-left">
                        <span className="text-base font-semibold text-accent leading-snug group-hover:text-primary transition-colors">{g.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

          </main>

          {/* ════════ RIGHT: Sticky Sidebar ════════ */}
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-6 space-y-6">

              {/* Primary CTA Card */}
              <div className="rounded-2xl bg-gradient-to-br from-primary to-red-500 text-white p-6 shadow-lg">
                <h3 className="font-serif text-xl font-medium mb-2">
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
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className={`${EYEBROW} mb-4`}>Quick Facts</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-gray-500 mb-1.5">Best Time</dt>
                    <dd className="font-medium text-accent leading-relaxed">
                      {guide.practicalInfo.bestTime}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1.5">Entry (NZ passport)</dt>
                    <dd className="font-medium text-accent leading-relaxed">
                      Visa-free up to 30 days (policy to 31 Dec 2026; confirm before travel)
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 pt-4 border-t border-border">
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
                <div className="rounded-2xl border border-border bg-white p-5">
                  <h3 className={`${EYEBROW} mb-4`}>
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
                  <div className="mt-4 pt-4 border-t border-border">
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
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className={`${EYEBROW} mb-4`}>Useful Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/best-time-to-visit-china" className="text-primary hover:underline flex items-center gap-2">
                      <Icon name="calendar" className="w-4 h-4 flex-shrink-0" /> Best time to visit China
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-visa-guide-for-new-zealanders" className="text-primary hover:underline flex items-center gap-2">
                      <Icon name="file-text" className="w-4 h-4 flex-shrink-0" /> China entry for NZ passport holders
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-tours-from-new-zealand" className="text-primary hover:underline flex items-center gap-2">
                      <Icon name="plane" className="w-4 h-4 flex-shrink-0" /> China tours from New Zealand
                    </Link>
                  </li>
                  <li>
                    <Link href="/tailor-made" className="text-primary hover:underline flex items-center gap-2">
                      <Icon name="target" className="w-4 h-4 flex-shrink-0" /> Tailor-made China tours
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
      <section className="bg-gradient-to-r from-primary to-red-500 text-white section-space-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`${H2_BAND} text-3xl mb-3`}>
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
