/**
 * UTM 与活动命名 —— 严格按 docs/utm-conventions.md 生成。
 *
 * 这部分刻意不交给模型:命名骨架是硬规范(`{line}_{initiative}_{yyyymm}`,
 * utm_campaign 必须以 tour_ 开头),模型编出来的链接看着对、GA4 里对不上,
 * 而报表口径一旦断层是要靠人肉回溯的。
 */

import type { ParsedTour } from './schema';

const SITE = 'https://www.ctstours.co.nz';

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

/** "3 November 2026" → Date;解析不出来时返回 null */
export function parseDepartureDate(date: string): Date | null {
  const m = date.trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return null;
  const monthIndex = MONTHS.indexOf(m[2].toLowerCase());
  if (monthIndex === -1) return null;
  return new Date(Date.UTC(parseInt(m[3], 10), monthIndex, parseInt(m[1], 10)));
}

/** "3 November 2026" → "202611";解析不出来时返回 null */
export function departureYyyymm(date: string): string | null {
  const d = parseDepartureDate(date);
  if (!d) return null;
  return `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

/** slug 里的连字符在 utm_content 里要转成 snake_case */
function snake(value: string): string {
  return value.replace(/-/g, '_').toLowerCase();
}

export interface UtmLink {
  label: string;
  url: string;
}

export interface CampaignNaming {
  /** utm_campaign,例如 tour_discovery_202612 */
  campaign: string;
  /** 产品页 utm_content,例如 discovery_beijing_xian */
  content: string;
  productUrl: string;
  links: UtmLink[];
  /** 命名依据,显示给审核人看 */
  notes: string[];
}

/**
 * 从解析结果推出活动命名和整套投放链接。
 *
 * @param initiative 活动主题 token(如 `discovery`、`dec_departure`),留空时按 tier 取
 */
export function buildCampaignNaming(tour: ParsedTour, initiative?: string): CampaignNaming {
  const notes: string[] = [];

  const firstDeparture = tour.departures[0]?.date;
  const yyyymm = firstDeparture ? departureYyyymm(firstDeparture) : null;
  if (!yyyymm) {
    notes.push(
      firstDeparture
        ? `团期「${firstDeparture}」解析不出年月,活动名里的 yyyymm 用了占位值,发链接前请改掉。`
        : '解析结果里没有团期,活动名里的 yyyymm 用了占位值,发链接前请改掉。'
    );
  }

  const themeToken = snake(initiative?.trim() || tour.suggestedTier);
  const campaign = `tour_${themeToken}_${yyyymm ?? 'YYYYMM'}`;
  const content = `${tour.suggestedTier}_${snake(tour.suggestedSlug)}`;
  const productUrl = `${SITE}/tours/china/${tour.suggestedTier}/${tour.suggestedSlug}`;

  notes.push(`utm_campaign 按 {line}_{initiative}_{yyyymm} 骨架生成,line 固定为 tour。`);
  notes.push('同一拨活动跨平台共用同一个 utm_campaign,用 utm_source / utm_content 区分。');

  const channels: Array<{ label: string; source: string; medium: string; contentSuffix: string }> = [
    { label: 'Google 搜索', source: 'google', medium: 'cpc', contentSuffix: '' },
    { label: 'Meta 信息流', source: 'facebook', medium: 'paid_social', contentSuffix: 'meta_feed' },
    { label: 'Instagram Reels', source: 'instagram', medium: 'paid_social', contentSuffix: 'ig_reels' },
    { label: '邮件 EDM', source: 'newsletter', medium: 'email', contentSuffix: 'edm' },
  ];

  const links = channels.map(({ label, source, medium, contentSuffix }) => {
    const utmContent = contentSuffix ? `${contentSuffix}_${snake(tour.suggestedSlug)}` : content;
    const params = new URLSearchParams({
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign,
      utm_content: utmContent,
    });
    // 搜索广告用平台的动态插入,不能被 URLSearchParams 转义
    const suffix = source === 'google' ? '&utm_term={keyword}' : '';
    return { label, url: `${productUrl}?${params.toString()}${suffix}` };
  });

  return { campaign, content, productUrl, links, notes };
}

export interface ProductFact {
  label: string;
  value: string;
}

/** 「产品事实速查」表 —— 全部来自解析结果,对外口径以此为准 */
export function buildProductFacts(tour: ParsedTour): ProductFact[] {
  return [
    { label: '数据 slug', value: tour.suggestedSlug },
    { label: 'Tier', value: tour.suggestedTier },
    { label: '主产品 URL', value: `/tours/china/${tour.suggestedTier}/${tour.suggestedSlug}` },
    { label: '天数', value: tour.duration },
    { label: '价格', value: tour.price ?? '未定 —— 发广告前必须补' },
    { label: '单房差', value: tour.singleSupplement ?? '未定' },
    {
      label: '主推出发日',
      value: tour.departures.length
        ? tour.departures.map((d) => d.date).join(' / ')
        : '未定 —— 发广告前必须补',
    },
    { label: '路线', value: tour.tourCities.join(' → ') || '未提取到' },
  ];
}
