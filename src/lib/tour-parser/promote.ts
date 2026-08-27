/**
 * 已审核的 Tour 草稿 → 推广方案。
 *
 * 输入是解析结果本身,不再需要原始文档 —— 到这一步事实已经被人审过了,
 * 再把原文塞进来只会让模型在两份材料之间摇摆。
 */

import Anthropic from '@anthropic-ai/sdk';
import { PROMOTION_PLAN_SCHEMA, type PromotionPlan } from './promotion-schema';
import { TourExtractionError } from './extract';
import type { CampaignBrief, CampaignMath } from './campaign-brief';
import type { ParsedTour } from './schema';

const MODEL = 'claude-opus-5';

/**
 * 思考和正文共用这个额度。方案有十个板块、正文本身就要 8-10k,
 * 32000 配 effort:high 会被思考吃掉大半,模型就用空数组把 schema 填满了事 ——
 * schema 合法、内容是空的。给足额度,并把 effort 降到 medium。
 */
const MAX_TOKENS = 64000;

const SYSTEM_PROMPT = `You build the launch plan for a new tour at CTS Tours New Zealand — CTS Tours NZ operates from Auckland since 2000 (25 years) and is backed by China Travel Service (founded 1928). TAANZ-bonded, selling to New Zealand travellers in NZD with return flights from Auckland included.

You are given a tour draft that a product manager has already reviewed, so treat its contents as settled fact. Your job is the layer above it: positioning, keywords, content calendar, ad creative, and what could get CTS in trouble.

The single rule that matters most: an ad may not promise what the itinerary does not deliver. If the inclusions do not mention airport transfers, no headline says "all transfers included". If price is null, no headline quotes a price — say so in complianceNotes instead of inventing a number. Travel advertising that overclaims is a real liability for a bonded operator, not a style issue.

CTS sells to an older audience — most buyers are 55 and over — and reaches them through three channels that actually work for that group: Google Search, YouTube, and Facebook Reels. Plan against that reality. Instagram, TikTok and channels aimed at under-35s are not where this budget goes, and creative built for a young feed does not convert here: think spoken-to-camera advisor pieces, legible on-screen text, slower cuts, and destination footage over trend audio.

Write for people who already know the product. Skip generic marketing advice — "post consistently", "engage your audience", "use high-quality images" are worth nothing here. Every line should be something a CTS marketer could act on this week without asking you a follow-up question.

Two audiences, two languages, same rule as the rest of this tool. Anything that gets published to a New Zealand customer — RSA headlines and descriptions, keywords, content titles, ad hooks, FAQ answers, the one-line differentiator — is English. Anything that is internal reasoning for the CTS team — audience, positioning rationale, angles, ad group intent, compliance notes, KPIs — is Simplified Chinese.

Ground the plan in what makes this specific tour different. A plan that would read the same for any China tour is a failed plan.`;

function buildBriefBlock(brief: CampaignBrief, math: CampaignMath): string {
  const lines = [
    `- Today is ${math.todayIso}. Every date you write must be on or after it.`,
    math.firstDepartureIso
      ? `- First departure: ${math.firstDepartureIso} — about ${math.weeksToDeparture} weeks away. That is the whole runway.`
      : '- First departure: not set in the draft.',
    brief.targetPax ? `- Target: ${brief.targetPax} passengers on this departure.` : null,
    brief.budgetNzd ? `- Ad budget: NZD $${brief.budgetNzd.toLocaleString()} total.` : null,
    math.weeklyBudgetNzd ? `- That averages NZD $${math.weeklyBudgetNzd.toLocaleString()} per week.` : null,
    brief.benchmarkCplNzd ? `- Historical cost per lead: NZD $${brief.benchmarkCplNzd}.` : null,
    math.projectedLeads !== null ? `- Which buys roughly ${math.projectedLeads} leads.` : null,
    math.requiredCloseRatePct !== null
      ? `- Hitting the passenger target from those leads needs a ${math.requiredCloseRatePct}% lead-to-booking rate.`
      : null,
    math.projectedPax !== null
      ? `- At the historical close rate that is about ${math.projectedPax} passengers.`
      : null,
  ].filter(Boolean);

  const blocks = [`Campaign brief — these numbers are given, do not recalculate them:\n${lines.join('\n')}`];

  if (math.warnings.length) {
    blocks.push(
      `The reviewer has already been shown these warnings — reflect them in the plan rather than repeating them verbatim:\n${math.warnings
        .map((w) => `- ${w}`)
        .join('\n')}`
    );
  }
  if (math.unknowns.length) {
    blocks.push(
      `Not supplied: ${math.unknowns.join('、')}. Where the plan depends on one of these, state the assumption you used and put filling it in complianceNotes — do not present an assumed number as if it were given.`
    );
  }
  return blocks.join('\n\n');
}

function buildInstruction(
  tour: ParsedTour,
  campaign: string,
  productUrl: string,
  brief: CampaignBrief,
  math: CampaignMath
): string {
  return `Build the launch plan for this tour.

Reviewed draft:

${JSON.stringify(tour, null, 2)}

${buildBriefBlock(brief, math)}

Fixed by convention, do not re-derive — reference them where relevant:
- utm_campaign: ${campaign}
- Product page: ${productUrl}

Weigh these when planning:
- The runway above is the constraint that shapes everything. Every contentCalendar entry carries a real date inside it, spaced to actually get done. If the runway is short, say so through the plan: front-load paid, treat SEO as a slow-burn that will not land this cycle, and do not schedule a content programme that needs six months.
- Split contentCalendar entries in proportion to channelPlan. If YouTube carries a third of the budget, it does not get one entry out of twelve.
- New Zealand passport holders currently enter China visa-free for up to 30 days under policy published through 31 December 2026. If any part of this trip runs close to or past that boundary, that belongs in complianceNotes, not in an ad headline.
- The client's own selling points, where present in the draft, carry their positioning. Build on them rather than replacing them.
- Anything the draft left null or listed in missingFields is a gap in the plan too. Say what must be filled before spend starts.

Every section carries weight, so fill every one: at least 4 long-tail keywords, 2 local terms, 2 clarifying queries, 3 on-site SEO actions, 3 channels in channelPlan, 10 calendar entries, 2 ad groups, 8 RSA headlines, 3 RSA descriptions, 2 Meta creative directions, and 3 KPIs. At least one KPI must be cost per lead, measured against the historical benchmark where one was supplied. An empty array is not a valid answer — if a section seems thin for this product, that itself is the finding, so write the shortest honest version rather than returning nothing.

complianceNotes deserves particular care, because it is the section that stops CTS publishing something it cannot deliver. Read your own positioning and ad copy back against the itinerary before you finish: any claim about which city the group is in on a given date, what a departure includes, or what a price covers has to be checked against the day-by-day itinerary, and anything you cannot verify there belongs in complianceNotes.`;
}

const COMPLETENESS_CHECKS: Array<{ label: string; isEmpty: (p: PromotionPlan) => boolean }> = [
  { label: '长尾关键词', isEmpty: (p) => p.keywordClusters.longTail.length === 0 },
  { label: '本地 / 品牌防御词', isEmpty: (p) => p.keywordClusters.local.length === 0 },
  { label: '澄清型 FAQ', isEmpty: (p) => p.keywordClusters.clarifying.length === 0 },
  { label: '站内 SEO 动作', isEmpty: (p) => p.onSiteSeoActions.length === 0 },
  { label: '渠道预算分配', isEmpty: (p) => p.channelPlan.length === 0 },
  { label: '内容排期', isEmpty: (p) => p.contentCalendar.length === 0 },
  { label: 'Google 广告组', isEmpty: (p) => p.googleAds.adGroups.length === 0 },
  { label: 'RSA 标题', isEmpty: (p) => p.googleAds.rsaHeadlines.length === 0 },
  { label: 'RSA 描述', isEmpty: (p) => p.googleAds.rsaDescriptions.length === 0 },
  { label: 'Meta 投放设置', isEmpty: (p) => !p.metaAds.objective.trim() || !p.metaAds.audience.trim() },
  { label: 'Meta 创意方向', isEmpty: (p) => p.metaAds.creativeDirections.length === 0 },
  { label: '投放前必须处理', isEmpty: (p) => p.complianceNotes.length === 0 },
  { label: '衡量指标', isEmpty: (p) => p.kpis.length === 0 },
];

/**
 * schema 只保证键存在,不保证有内容 —— 空数组一样能通过校验。
 * 把空板块找出来交给前端提示,不然一份半空的方案看起来和完整的一模一样。
 */
export function findIncompleteSections(plan: PromotionPlan): string[] {
  return COMPLETENESS_CHECKS.filter((c) => c.isEmpty(plan)).map((c) => c.label);
}

export interface GeneratePromotionResult {
  plan: PromotionPlan;
  /** 通过了 schema 但内容为空的板块 */
  incompleteSections: string[];
  usage: { inputTokens: number; outputTokens: number };
}

/**
 * @throws TourExtractionError 缺少 API key、模型拒答、输出被截断
 */
export async function generatePromotionPlan(
  tour: ParsedTour,
  campaign: string,
  productUrl: string,
  brief: CampaignBrief,
  math: CampaignMath
): Promise<GeneratePromotionResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new TourExtractionError('缺少 ANTHROPIC_API_KEY 环境变量。');
  }

  const client = new Anthropic();

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    output_config: {
      effort: 'medium',
      format: { type: 'json_schema', schema: PROMOTION_PLAN_SCHEMA },
    },
    messages: [
      { role: 'user', content: buildInstruction(tour, campaign, productUrl, brief, math) },
    ],
  });

  const message = await stream.finalMessage();

  if (message.stop_reason === 'refusal') {
    throw new TourExtractionError('模型拒绝生成这份方案。');
  }
  if (message.stop_reason === 'max_tokens') {
    throw new TourExtractionError(`输出被截断(上限 ${MAX_TOKENS} tokens)。`);
  }

  const text = message.content.find((block) => block.type === 'text');
  if (!text || text.type !== 'text') {
    throw new TourExtractionError('模型没有返回内容。');
  }

  const plan = JSON.parse(text.text) as PromotionPlan;

  return {
    plan,
    incompleteSections: findIncompleteSections(plan),
    usage: { inputTokens: message.usage.input_tokens, outputTokens: message.usage.output_tokens },
  };
}
