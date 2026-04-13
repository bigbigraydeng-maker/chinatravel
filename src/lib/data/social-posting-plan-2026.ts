/**
 * October 2026 campaign — organic social posting grid (FB / IG).
 * Edit rows here; `/marketing/campaign/social` renders this file.
 * Rhythm aligns with Obsidian（01-Magiclab/Projects/China Travel）与 /marketing/campaign 统筹。
 */

export type SocialChannel = 'Facebook' | 'Instagram' | 'Both';
export type SocialPillar = 'Educate' | 'Inspire' | 'Convert' | 'Proof';
export type SocialPostStatus = 'draft' | 'scheduled' | 'posted';

export interface SocialPostRow {
  id: string;
  /** Campaign week token (same family as marketing-plan W1…). */
  week: string;
  /** Slot letter from template (A–E). */
  slot: string;
  suggestedDay: string;
  channel: SocialChannel;
  pillar: SocialPillar;
  topicOneLiner: string;
  primaryUrl: string;
  assetFile: string;
  status: SocialPostStatus;
  notes?: string;
}

export const SOCIAL_CAMPAIGN_META = {
  title: 'October 2026 · 社媒发帖计划（有机内容）',
  subtitle: '双产品战役：Beijing & Xi’an · Shanghai & Surroundings',
  lastUpdated: '2026-04-14',
  cadence:
    '冷启动建议：Facebook 每周 3–4 帖；Instagram 每周 3–4 帖（可同主题但文案/首图区分，勿完全复制）。与付费 pillar 对齐；主 URL 与营销统筹「全站两簇」一致：签证指南、china-tours 枢纽、双 Discovery 产品。长文案在 Obsidian「01-Magiclab/Projects/China Travel」锁稿。',
};

const U = 'https://www.ctstours.co.nz';

export const SOCIAL_POST_ROWS: SocialPostRow[] = [
  {
    id: 'S01',
    week: 'W1',
    slot: 'A',
    suggestedDay: 'Mon/Tue',
    channel: 'Both',
    pillar: 'Educate',
    topicOneLiner: 'Visa-free for NZ passport — three checks before you book',
    primaryUrl: `${U}/china-visa-guide-for-new-zealanders`,
    assetFile: '',
    status: 'draft',
  },
  {
    id: 'S02',
    week: 'W1',
    slot: 'B',
    suggestedDay: 'Wed',
    channel: 'Instagram',
    pillar: 'Inspire',
    topicOneLiner: 'One frame: Great Wall or hutong golden hour (Beijing line)',
    primaryUrl: `${U}/tours/china/discovery/beijing-xian`,
    assetFile: '',
    status: 'draft',
  },
  {
    id: 'S03',
    week: 'W1',
    slot: 'C',
    suggestedDay: 'Thu',
    channel: 'Instagram',
    pillar: 'Inspire',
    topicOneLiner: 'Bund skyline or water-town mood (Shanghai line)',
    primaryUrl: `${U}/tours/china/discovery/shanghai-surroundings`,
    assetFile: '',
    status: 'draft',
  },
  {
    id: 'S04',
    week: 'W1',
    slot: 'D',
    suggestedDay: 'Fri/Sat',
    channel: 'Facebook',
    pillar: 'Convert',
    topicOneLiner: 'Soft CTA: October departures — ask for a seat check (only if true)',
    primaryUrl: `${U}/campaigns/october-2026/tale-of-two-cities`,
    assetFile: '',
    status: 'draft',
    notes: 'Rotate URL with Shanghai hub when posting that line.',
  },
  {
    id: 'S05',
    week: 'W2',
    slot: 'A',
    suggestedDay: 'Mon/Tue',
    channel: 'Both',
    pillar: 'Inspire',
    topicOneLiner: 'Day-level hook: Terracotta warriors or Muslim Quarter evening',
    primaryUrl: `${U}/tours/china/discovery/beijing-xian`,
    assetFile: '',
    status: 'draft',
  },
  {
    id: 'S06',
    week: 'W2',
    slot: 'B',
    suggestedDay: 'Wed',
    channel: 'Both',
    pillar: 'Inspire',
    topicOneLiner: 'West Lake loop or classical garden — slow travel angle',
    primaryUrl: `${U}/tours/china/discovery/shanghai-surroundings`,
    assetFile: '',
    status: 'draft',
  },
  {
    id: 'S07',
    week: 'W2',
    slot: 'C',
    suggestedDay: 'Thu',
    channel: 'Facebook',
    pillar: 'Educate',
    topicOneLiner: 'Short practical: insurance, group size, pace — link deeper on site',
    primaryUrl: `${U}/china-tours`,
    assetFile: '',
    status: 'draft',
    notes: '枢纽页；若话题偏「从新西兰出发」，文案中可二次贴纸链至 /china-tours-from-new-zealand（主链仍保持单一 URL）。',
  },
  {
    id: 'S08',
    week: 'W2',
    slot: 'D',
    suggestedDay: 'Fri/Sat',
    channel: 'Both',
    pillar: 'Convert',
    topicOneLiner: 'Match site CTA: Enquire for October departures',
    primaryUrl: `${U}/campaigns/october-2026/shanghai-surroundings`,
    assetFile: '',
    status: 'draft',
  },
  {
    id: 'S09',
    week: 'W3',
    slot: 'A',
    suggestedDay: 'Mon/Tue',
    channel: 'Both',
    pillar: 'Convert',
    topicOneLiner: 'Stronger CTA + selection — only if dates/seats accurate',
    primaryUrl: `${U}/campaigns/october-2026/tale-of-two-cities`,
    assetFile: '',
    status: 'draft',
  },
  {
    id: 'S10',
    week: 'W3',
    slot: 'B',
    suggestedDay: 'Wed',
    channel: 'Facebook',
    pillar: 'Proof',
    topicOneLiner: 'Client moment or “why CTS” — anonymise if needed',
    primaryUrl: `${U}/about`,
    assetFile: '',
    status: 'draft',
    notes: 'Proof 支柱：信任与 specialist 叙事以 About 为主落地；文末可指回 /china-tours（统筹 T054）。',
  },
  {
    id: 'S11',
    week: 'W3',
    slot: 'C',
    suggestedDay: 'Thu',
    channel: 'Instagram',
    pillar: 'Inspire',
    topicOneLiner: 'Two styles of China — route to both Discovery pages',
    primaryUrl: `${U}/china-tours`,
    assetFile: '',
    status: 'draft',
  },
  {
    id: 'S12',
    week: 'W3',
    slot: 'D',
    suggestedDay: 'Fri/Sat',
    channel: 'Instagram',
    pillar: 'Convert',
    topicOneLiner: 'Reels-friendly: movement / food / skyline + October hook',
    primaryUrl: `${U}/campaigns/october-2026/shanghai-surroundings`,
    assetFile: '',
    status: 'draft',
  },
  {
    id: 'S13',
    week: 'W4',
    slot: 'A',
    suggestedDay: 'Mon/Tue',
    channel: 'Both',
    pillar: 'Inspire',
    topicOneLiner: 'Re-cut best-performing W2–W3 asset with new hook',
    primaryUrl: `${U}/tours/china/discovery/beijing-xian`,
    assetFile: '',
    status: 'draft',
    notes: 'Replace URL with the winning landing from analytics.',
  },
  {
    id: 'S14',
    week: 'W4',
    slot: 'B',
    suggestedDay: 'Wed',
    channel: 'Both',
    pillar: 'Educate',
    topicOneLiner: 'FAQ-style carousel: first-timer worries',
    primaryUrl: `${U}/best-time-to-visit-china`,
    assetFile: '',
    status: 'draft',
  },
  {
    id: 'S15',
    week: 'W4',
    slot: 'C',
    suggestedDay: 'Thu',
    channel: 'Facebook',
    pillar: 'Educate',
    topicOneLiner: 'Best time to visit — link seasonal guide',
    primaryUrl: `${U}/best-time-to-visit-china`,
    assetFile: '',
    status: 'draft',
  },
  {
    id: 'S16',
    week: 'W4',
    slot: 'D',
    suggestedDay: 'Fri',
    channel: 'Both',
    pillar: 'Convert',
    topicOneLiner: 'Plan next 4-week block + book consult CTA',
    primaryUrl: `${U}/contact`,
    assetFile: '',
    status: 'draft',
  },
];

/** 发帖前检查：适用范围（与 SOCIAL_POST_ROWS 的 channel 列一致）。 */
export const SOCIAL_CHECKLIST_SCOPE =
  '下列各项适用于 Facebook 与 Instagram 的有机发帖。上表「渠道」为 Instagram / Facebook 时只发该渠；为 Both 时两渠可发（建议文案或首图区分，勿完全复制）。「Reels / 屏上字」以 Instagram 为主，Facebook Reels 可沿用同一套 Hook 思路。';

export const SOCIAL_CHECKLIST: string[] = [
  'Hook：首行吸睛（两渠通用）；若做竖屏短视频，准备屏上大字幕（Reels 以 Instagram 为主，FB 亦可发 Reels）',
  '单一主 URL（与站点战役口径一致）',
  '素材文件名符合 T004 约定',
  'Alt text（无障碍；IG 图片帖与 FB 均需）',
  '付费或 boosting 所带外链加 UTM（Meta Pixel Phase 1b 上线后，便于与 organic 区分）',
  '签证表述：confirm latest rules；不作入境保证',
];
