/**
 * v5 Ads URL Master — Essentials + 5 Campaign 全量预生成
 *
 * Source: ME (Magic Engine) 子牙 v5 战略 (2026-06-11)
 *   - 决策 1: Tale of Two Cities + Best of China Essentials 两个 tour 在 Meta + Google 都推
 *   - 决策 2: 复用 ME docs/me-landing-page-sprint-2026-06-08 (Wave 2 已完成)
 *
 * UTM 严格遵循 docs/utm-conventions.md:
 *   - tour_ 前缀 — 产品页投流 (Tale / Essentials)
 *   - guide_ 前缀 — 指南页投流 (Visa-Free, Lijiang/Dali 等城市 guide)
 *
 * 这个文件 = PM 0 手工拼 URL 的承诺兑现 (子牙不让 PM 在 Ads UI 里粘错链接).
 * Ads team 直接复制 *_URL 字段进 Ads platform Final URL 字段.
 */

import { CTS_SITE_ORIGIN } from './october-2026-discovery';

/** Pure URL builder — five-param UTM, snake_case lower, no leading/trailing slash. */
function buildUtmUrl(
  pathOrFullUrl: string,
  utm: {
    source: string;
    medium: string;
    campaign: string;
    content?: string;
    term?: string;
  }
): string {
  const isAbsolute = /^https?:\/\//i.test(pathOrFullUrl);
  const base = isAbsolute
    ? pathOrFullUrl
    : `${CTS_SITE_ORIGIN}${pathOrFullUrl.startsWith('/') ? '' : '/'}${pathOrFullUrl}`;
  const q = new URLSearchParams({
    utm_source: utm.source,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign,
  });
  if (utm.content) q.set('utm_content', utm.content);
  if (utm.term) q.set('utm_term', utm.term);
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}${q.toString()}`;
}

// ---------------------------------------------------------------------------
// A. ESSENTIALS — Best of China (15 天, NZD $3,880, 11/3 出发) — #1 主推团
// ---------------------------------------------------------------------------

const ESSENTIALS_PATH = '/tours/china/discovery/essentials';

/** Meta cold paid social — Facebook Reels (PM 拍 Essentials reel 后用此 URL) */
export const ESSENTIALS_META_REELS_URL = buildUtmUrl(ESSENTIALS_PATH, {
  source: 'facebook',
  medium: 'paid_social',
  campaign: 'tour_essentials_main',
  content: 'essentials_fb_reels',
});

/** Meta cold paid social — Facebook Post */
export const ESSENTIALS_META_POST_URL = buildUtmUrl(ESSENTIALS_PATH, {
  source: 'facebook',
  medium: 'paid_social',
  campaign: 'tour_essentials_main',
  content: 'essentials_fb_post',
});

/** Meta cold paid social — Instagram Reels */
export const ESSENTIALS_META_IG_REELS_URL = buildUtmUrl(ESSENTIALS_PATH, {
  source: 'instagram',
  medium: 'paid_social',
  campaign: 'tour_essentials_main',
  content: 'essentials_ig_reels',
});

/** Google Ads — Search RSA */
export const ESSENTIALS_GOOGLE_RSA_URL = buildUtmUrl(ESSENTIALS_PATH, {
  source: 'google',
  medium: 'cpc',
  campaign: 'tour_essentials_main',
  content: 'google_rsa_essentials',
});

/** Google Ads — Performance Max */
export const ESSENTIALS_GOOGLE_PMAX_URL = buildUtmUrl(ESSENTIALS_PATH, {
  source: 'google',
  medium: 'cpc',
  campaign: 'tour_essentials_main',
  content: 'google_pmax_essentials',
});

// ---------------------------------------------------------------------------
// A2. SILK ROAD — 18 天 Signature, NZD $7,999, 13 May 2027 (优先) + 21 Oct 2027
// ---------------------------------------------------------------------------
// PM 2026-06-12 拍板: Silk Road 是 4 团重点推广之一, Meta + Google 都投.
// 优先推最近出发日 13 May 2027 (Silk Road 5-10 月是唯一可行季节, 沙漠 + Tianshan).
// LP 复用 tour template (无独立 campaign LP) — 18 天细节走 tour 模板深度内容.

const SILK_ROAD_PATH = '/tours/china/signature/silk-road';

/** Meta cold paid social — Facebook Reels */
export const SILK_ROAD_META_REELS_URL = buildUtmUrl(SILK_ROAD_PATH, {
  source: 'facebook',
  medium: 'paid_social',
  campaign: 'tour_silk_road_2027',
  content: 'silk_road_fb_reels',
});

/** Meta cold paid social — Facebook Post */
export const SILK_ROAD_META_POST_URL = buildUtmUrl(SILK_ROAD_PATH, {
  source: 'facebook',
  medium: 'paid_social',
  campaign: 'tour_silk_road_2027',
  content: 'silk_road_fb_post',
});

/** Meta cold paid social — Instagram Reels */
export const SILK_ROAD_META_IG_REELS_URL = buildUtmUrl(SILK_ROAD_PATH, {
  source: 'instagram',
  medium: 'paid_social',
  campaign: 'tour_silk_road_2027',
  content: 'silk_road_ig_reels',
});

/** Google Ads — Search RSA */
export const SILK_ROAD_GOOGLE_RSA_URL = buildUtmUrl(SILK_ROAD_PATH, {
  source: 'google',
  medium: 'cpc',
  campaign: 'tour_silk_road_2027',
  content: 'google_rsa_silk_road',
});

/** Google Ads — Performance Max */
export const SILK_ROAD_GOOGLE_PMAX_URL = buildUtmUrl(SILK_ROAD_PATH, {
  source: 'google',
  medium: 'cpc',
  campaign: 'tour_silk_road_2027',
  content: 'google_pmax_silk_road',
});

// ---------------------------------------------------------------------------
// B. v5 Google Ads 5 Campaign — 全量 URL (Campaign A/B/D/E/C)
// ---------------------------------------------------------------------------

/** Campaign A — Core Commercial: china tour generic */
export const ADS_CORE_CHINA_TOURS_GENERIC_URL = buildUtmUrl(
  '/china-tours-from-new-zealand',
  {
    source: 'google',
    medium: 'cpc',
    campaign: 'tour_core_commercial_2026',
    content: 'china_tours_generic',
  }
);

/** Campaign A — Core Commercial: from NZ geo */
export const ADS_CORE_CHINA_FROM_NZ_URL = buildUtmUrl(
  '/china-tours-from-new-zealand',
  {
    source: 'google',
    medium: 'cpc',
    campaign: 'tour_core_commercial_2026',
    content: 'china_tours_from_nz',
  }
);

/** Campaign A3 — Terracotta Warriors (vol 1,600 / CPC NZD $1.58 蓝海) */
export const ADS_CORE_TERRACOTTA_URL = buildUtmUrl(
  '/terracotta-warriors-travel-guide',
  {
    source: 'google',
    medium: 'cpc',
    campaign: 'tour_core_commercial_2026',
    content: 'terracotta_warriors',
  }
);

/** Campaign A3 — Great Wall (vol 590) */
export const ADS_CORE_GREAT_WALL_URL = buildUtmUrl(
  '/great-wall-travel-guide',
  {
    source: 'google',
    medium: 'cpc',
    campaign: 'tour_core_commercial_2026',
    content: 'great_wall',
  }
);

/** Campaign A3 — Yangtze River Cruise (vol 170) */
export const ADS_CORE_YANGTZE_URL = buildUtmUrl(
  '/yangtze-river-cruise-travel-guide',
  {
    source: 'google',
    medium: 'cpc',
    campaign: 'tour_core_commercial_2026',
    content: 'yangtze_cruise',
  }
);

// --- Campaign B — Intercept Asia (Japan / Vietnam / Holiday / 高铁) ---

/** Campaign B1 — Japan intercept → /blog/holidays-to-china-from-new-zealand */
export const ADS_INTERCEPT_JAPAN_URL = buildUtmUrl(
  '/blog/holidays-to-china-from-new-zealand',
  {
    source: 'google',
    medium: 'cpc',
    campaign: 'blog_intercept_asia_2026',
    content: 'japan_intercept',
  }
);

/** Campaign B2 — Vietnam intercept (测试) */
export const ADS_INTERCEPT_VIETNAM_URL = buildUtmUrl(
  '/blog/holidays-to-china-from-new-zealand',
  {
    source: 'google',
    medium: 'cpc',
    campaign: 'blog_intercept_asia_2026',
    content: 'vietnam_intercept',
  }
);

/** Campaign B3 — Generic holiday intercept */
export const ADS_INTERCEPT_GENERIC_URL = buildUtmUrl(
  '/blog/holidays-to-china-from-new-zealand',
  {
    source: 'google',
    medium: 'cpc',
    campaign: 'blog_intercept_asia_2026',
    content: 'generic_holiday',
  }
);

/** Campaign B4 — High-Speed Rail (子牙新发现, vol 170+70 真实研究 intent) */
export const ADS_INTERCEPT_HIGH_SPEED_RAIL_URL = buildUtmUrl(
  '/blog/china-tour-packages-including-airfare-from-nz',
  {
    source: 'google',
    medium: 'cpc',
    campaign: 'blog_intercept_asia_2026',
    content: 'high_speed_rail',
  }
);

// --- Campaign D — Lesser-Known Cities (Yunnan cluster) ---

/** D1 Lijiang (vol 390, CPC $1.63) */
export const ADS_LESSER_LIJIANG_URL = buildUtmUrl('/lijiang-travel-guide', {
  source: 'google',
  medium: 'cpc',
  campaign: 'guide_lesser_known_cities_2026',
  content: 'lijiang',
});

/** D2 Dali (vol 260, CPC $0.03 ⭐ 金矿) */
export const ADS_LESSER_DALI_URL = buildUtmUrl('/dali-travel-guide', {
  source: 'google',
  medium: 'cpc',
  campaign: 'guide_lesser_known_cities_2026',
  content: 'dali',
});

/** D3 Avatar Mountains / Zhangjiajie (vol 320, CPC $7.56) */
export const ADS_LESSER_ZHANGJIAJIE_URL = buildUtmUrl('/zhangjiajie-tours', {
  source: 'google',
  medium: 'cpc',
  campaign: 'guide_lesser_known_cities_2026',
  content: 'zhangjiajie_avatar',
});

/** D4 Shangri-La (vol 170, CPC $0.36) */
export const ADS_LESSER_SHANGRI_LA_URL = buildUtmUrl('/shangri-la-travel-guide', {
  source: 'google',
  medium: 'cpc',
  campaign: 'guide_lesser_known_cities_2026',
  content: 'shangri_la',
});

/** D4 Kunming (vol 90, CPC $0.79) */
export const ADS_LESSER_KUNMING_URL = buildUtmUrl('/kunming-travel-guide', {
  source: 'google',
  medium: 'cpc',
  campaign: 'guide_lesser_known_cities_2026',
  content: 'kunming',
});

/** D5 Yunnan 总词 (vol 880, CPC $0.58) — cluster hub */
export const ADS_LESSER_YUNNAN_URL = buildUtmUrl('/yunnan-travel-guide', {
  source: 'google',
  medium: 'cpc',
  campaign: 'guide_lesser_known_cities_2026',
  content: 'yunnan_hub',
});

// --- Campaign E — Visa-Free Education (PM 战略核心 hook, 'china visa free' vol 210, CPC $0) ---

/** Campaign E — visa-free hook keyword → visa guide page */
export const ADS_VISA_FREE_EDUCATION_URL = buildUtmUrl(
  '/china-visa-guide-for-new-zealanders',
  {
    source: 'google',
    medium: 'cpc',
    campaign: 'guide_visa_free_edu_2026',
    content: 'visa_free_hook',
  }
);

// --- Campaign C — Brand Defense + Retargeting + 中餐 ---

/** C1 — CTS brand defense → homepage */
export const ADS_BRAND_DEFENSE_URL = buildUtmUrl('/', {
  source: 'google',
  medium: 'cpc',
  campaign: 'tour_brand_defense_2026',
  content: 'cts_brand',
});

/** C2 — Competitor brand bidding (ad copy 不能含品牌名, Google 政策) */
export const ADS_COMPETITOR_BIDDING_URL = buildUtmUrl(
  '/china-tours-from-new-zealand',
  {
    source: 'google',
    medium: 'cpc',
    campaign: 'tour_brand_defense_2026',
    content: 'competitor_bidding',
  }
);

/**
 * C3 — General retargeting (Display network, 看过 ctstours 但没填 form)
 * 用 dynamic remarketing — 此 URL 仅作 base, 实际 audience-specific URL 由 Ads UI 动态拼.
 */
export const ADS_RETARGETING_GENERAL_BASE_URL = buildUtmUrl('/', {
  source: 'google',
  medium: 'display',
  campaign: 'tour_retargeting_2026',
  content: 'general_remarketing',
});

/**
 * C4 — 中餐 retargeting (vol 3,310 长漏斗)
 * Landing: /local-food-guide (注意: 子牙待验证此页是否存在, 若不存在用 /blog/local-food-guide)
 */
export const ADS_CHINESE_FOOD_RETARGET_URL = buildUtmUrl('/local-food-guide', {
  source: 'google',
  medium: 'cpc',
  campaign: 'guide_food_retargeting_2026',
  content: 'chinese_food_audience',
});

// ---------------------------------------------------------------------------
// C. Master Table — 给 Ads team 一次性复制粘贴用
// ---------------------------------------------------------------------------

export type V5AdsUrlRow = {
  /** Ads platform (google / facebook / instagram) */
  platform: string;
  /** Campaign label (matches v5 战略 Campaign A/A0/B/C/D/E) */
  campaignLabel: string;
  /** Ad group / keyword theme */
  adGroup: string;
  /** Final URL (Ads platform 直接粘贴此字段) */
  finalUrl: string;
};

/** v5 全量 Master Table — Ads team 一次性复制粘贴 */
export const V5_ADS_URL_MASTER_TABLE: V5AdsUrlRow[] = [
  // A0 Essentials 主推团
  {
    platform: 'google',
    campaignLabel: 'A0 Essentials',
    adGroup: 'Search RSA — Best of China',
    finalUrl: ESSENTIALS_GOOGLE_RSA_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'A0 Essentials',
    adGroup: 'PMax — Best of China',
    finalUrl: ESSENTIALS_GOOGLE_PMAX_URL,
  },
  {
    platform: 'facebook',
    campaignLabel: 'A0 Essentials',
    adGroup: 'Meta Reels — Best of China',
    finalUrl: ESSENTIALS_META_REELS_URL,
  },
  {
    platform: 'facebook',
    campaignLabel: 'A0 Essentials',
    adGroup: 'Meta Post — Best of China',
    finalUrl: ESSENTIALS_META_POST_URL,
  },
  {
    platform: 'instagram',
    campaignLabel: 'A0 Essentials',
    adGroup: 'IG Reels — Best of China',
    finalUrl: ESSENTIALS_META_IG_REELS_URL,
  },
  // A2 Silk Road 重点推广团 (Signature tier, NZD $7,999, 13 May 2027 优先)
  {
    platform: 'google',
    campaignLabel: 'A2 Silk Road',
    adGroup: 'Search RSA — Silk Road',
    finalUrl: SILK_ROAD_GOOGLE_RSA_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'A2 Silk Road',
    adGroup: 'PMax — Silk Road',
    finalUrl: SILK_ROAD_GOOGLE_PMAX_URL,
  },
  {
    platform: 'facebook',
    campaignLabel: 'A2 Silk Road',
    adGroup: 'Meta Reels — Silk Road',
    finalUrl: SILK_ROAD_META_REELS_URL,
  },
  {
    platform: 'facebook',
    campaignLabel: 'A2 Silk Road',
    adGroup: 'Meta Post — Silk Road',
    finalUrl: SILK_ROAD_META_POST_URL,
  },
  {
    platform: 'instagram',
    campaignLabel: 'A2 Silk Road',
    adGroup: 'IG Reels — Silk Road',
    finalUrl: SILK_ROAD_META_IG_REELS_URL,
  },
  // A Core Commercial
  {
    platform: 'google',
    campaignLabel: 'A Core Commercial',
    adGroup: 'A1 china tour generic',
    finalUrl: ADS_CORE_CHINA_TOURS_GENERIC_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'A Core Commercial',
    adGroup: 'A2 from NZ geo',
    finalUrl: ADS_CORE_CHINA_FROM_NZ_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'A Core Commercial',
    adGroup: 'A3 Terracotta Warriors',
    finalUrl: ADS_CORE_TERRACOTTA_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'A Core Commercial',
    adGroup: 'A3 Great Wall',
    finalUrl: ADS_CORE_GREAT_WALL_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'A Core Commercial',
    adGroup: 'A3 Yangtze cruise',
    finalUrl: ADS_CORE_YANGTZE_URL,
  },
  // B Intercept Asia
  {
    platform: 'google',
    campaignLabel: 'B Intercept Asia',
    adGroup: 'B1 Japan intercept',
    finalUrl: ADS_INTERCEPT_JAPAN_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'B Intercept Asia',
    adGroup: 'B2 Vietnam intercept',
    finalUrl: ADS_INTERCEPT_VIETNAM_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'B Intercept Asia',
    adGroup: 'B3 Generic holiday',
    finalUrl: ADS_INTERCEPT_GENERIC_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'B Intercept Asia',
    adGroup: 'B4 High-Speed Rail',
    finalUrl: ADS_INTERCEPT_HIGH_SPEED_RAIL_URL,
  },
  // D Lesser-Known Cities (Yunnan cluster)
  {
    platform: 'google',
    campaignLabel: 'D Lesser-Known',
    adGroup: 'D1 Lijiang',
    finalUrl: ADS_LESSER_LIJIANG_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'D Lesser-Known',
    adGroup: 'D2 Dali (CPC $0.03 ⭐)',
    finalUrl: ADS_LESSER_DALI_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'D Lesser-Known',
    adGroup: 'D3 Avatar/Zhangjiajie',
    finalUrl: ADS_LESSER_ZHANGJIAJIE_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'D Lesser-Known',
    adGroup: 'D4 Shangri-La',
    finalUrl: ADS_LESSER_SHANGRI_LA_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'D Lesser-Known',
    adGroup: 'D4 Kunming',
    finalUrl: ADS_LESSER_KUNMING_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'D Lesser-Known',
    adGroup: 'D5 Yunnan hub',
    finalUrl: ADS_LESSER_YUNNAN_URL,
  },
  // E Visa-Free Education
  {
    platform: 'google',
    campaignLabel: 'E Visa-Free Education',
    adGroup: 'china visa free hook',
    finalUrl: ADS_VISA_FREE_EDUCATION_URL,
  },
  // C Brand + Retargeting + 中餐
  {
    platform: 'google',
    campaignLabel: 'C Brand+Retarget',
    adGroup: 'C1 Brand defense',
    finalUrl: ADS_BRAND_DEFENSE_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'C Brand+Retarget',
    adGroup: 'C2 Competitor bidding',
    finalUrl: ADS_COMPETITOR_BIDDING_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'C Brand+Retarget',
    adGroup: 'C3 General remarketing',
    finalUrl: ADS_RETARGETING_GENERAL_BASE_URL,
  },
  {
    platform: 'google',
    campaignLabel: 'C Brand+Retarget',
    adGroup: 'C4 Chinese food audience',
    finalUrl: ADS_CHINESE_FOOD_RETARGET_URL,
  },
];
