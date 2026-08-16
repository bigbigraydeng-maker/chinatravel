/**
 * 行程文档 → 结构化 Tour 数据。
 *
 * 用结构化输出(output_config.format)把返回值锁死在 TOUR_EXTRACTION_SCHEMA 上,
 * 所以调用方拿到的一定是合法 JSON,不需要正则兜底或重试解析。
 */

import Anthropic from '@anthropic-ai/sdk';
import { TOUR_EXTRACTION_SCHEMA, type ParsedTour } from './schema';

const MODEL = 'claude-opus-5';

/** 15 天行程的完整结构化输出约 6-8k token,加上 adaptive thinking 要留足余量 */
const MAX_TOKENS = 32000;

const SYSTEM_PROMPT = `You extract structured tour data from operator itinerary documents for CTS Tours New Zealand, a China tour operator selling to New Zealand travellers.

Your output is a DRAFT that a CTS product manager will review before it goes on the website. That shapes two rules above all others:

1. Never invent. If the document does not state a price, a departure date, a hotel, or a meal, return null (or an empty array) and name that field in missingFields. A fabricated price is a commercial incident; a null is a five-second fix for the reviewer.
2. Flag ambiguity rather than resolving it silently. If pricing is contradictory, dates lack a year, or the day count disagrees with the stated duration, record it in confidenceNotes and use your best reading for the field itself.

Two audiences, two languages. Product content — name, title, shortDescription, highlights, sellingPoints, itinerary, inclusions, exclusions, metaTitle, metaDescription — is published on an English-language website for New Zealand travellers and must be in English. Reviewer content — tierReasoning, the issue text in clientClaimsToVerify, and confidenceNotes — is read by the CTS product team in Auckland and must be in Simplified Chinese. Quotations are the exception that makes this work: whenever you quote the source in a Chinese field, the quoted words stay in the original English inside 「」, so the reviewer can match them against the document.

House conventions, so the draft matches existing products:
- Dates: "3 November 2026" — day, full month name, four-digit year. If the source omits the year, infer it from context and note that inference in confidenceNotes.
- Prices: "NZD $3,880" or "From NZD $3,880 per person". Keep the operator's currency if it is clearly not NZD, and flag it.
- Duration: "15 Days".
- City slugs: lowercase, no spaces or accents — beijing, xian, shanghai, guilin, zhangjiajie, chengdu, chongqing, hangzhou, suzhou, guangzhou, huangshan, yunnan.
- Meals: only "Breakfast", "Lunch", "Dinner".

You may be given two sources. SOURCE A, the itinerary document, is the factual authority — dates, prices, day count, hotels, inclusions come from it and nowhere else. SOURCE B, when present, is the client's own selling points: their positioning and their voice, written to market this trip. Use SOURCE B for sellingPoints, and let it inform highlights, shortDescription and the SEO fields — but never let it establish a fact. If SOURCE B claims something SOURCE A does not support, the itinerary wins for the data fields, and the claim goes in clientClaimsToVerify.

Preserve the operator's own wording for itinerary descriptions, inclusions and exclusions — tighten grammar, but do not rewrite the substance or add attractions the document does not mention. highlights, sellingPoints and the SEO fields are yours to phrase, but every factual claim in them must trace back to the document.`;

const INSTRUCTION = `Extract this tour into the required structure.

Work through the whole document before answering — pricing and departure dates are often in a table, a footer, or a separate section from the day-by-day itinerary.

Then set suggestedTier by what the document actually says about duration, hotel class and price, and explain that call in tierReasoning. Say in tierReasoning how confident you are: CTS's own 16-day products exist in both discovery and signature, so duration and price overlap between tiers and this call is genuinely uncertain from an itinerary alone.

Finish by filling missingFields and confidenceNotes honestly. An empty confidenceNotes means you are telling the reviewer the source was unambiguous — only say that when it is true.`;

export type TierOverride = 'signature' | 'discovery' | 'stopover';

export class TourExtractionError extends Error {}

export interface ExtractTourResult {
  tour: ParsedTour;
  usage: { inputTokens: number; outputTokens: number };
}

/**
 * @throws TourExtractionError 缺少 API key、模型拒答、输出被截断
 */
export async function extractTour(
  documentBlocks: Anthropic.ContentBlockParam[],
  tierOverride?: TierOverride
): Promise<ExtractTourResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new TourExtractionError('缺少 ANTHROPIC_API_KEY 环境变量。');
  }

  const client = new Anthropic();

  // 文档块必须排在指令文本之前
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    output_config: {
      effort: 'high',
      format: { type: 'json_schema', schema: TOUR_EXTRACTION_SCHEMA },
    },
    messages: [
      {
        role: 'user',
        content: [
          ...documentBlocks,
          {
            type: 'text',
            text: tierOverride
              ? `${INSTRUCTION}\n\nThe product manager has already decided this is a ${tierOverride} product. Use it — do not infer the tier, and do not argue with it. In tierReasoning, record that it was set by CTS and note what the itinerary would otherwise have suggested, so the two are on the record together.`
              : INSTRUCTION,
          },
        ],
      },
    ],
  });

  const message = await stream.finalMessage();

  if (message.stop_reason === 'refusal') {
    throw new TourExtractionError('模型拒绝处理这份文档。请检查内容后重试。');
  }
  if (message.stop_reason === 'max_tokens') {
    throw new TourExtractionError(
      `行程太长,输出被截断(上限 ${MAX_TOKENS} tokens)。请拆分文档,或联系开发调高上限。`
    );
  }

  const text = message.content.find((block) => block.type === 'text');
  if (!text || text.type !== 'text') {
    throw new TourExtractionError('模型没有返回内容。');
  }

  const tour = JSON.parse(text.text) as ParsedTour;

  // 人工指定的 tier 由代码兜底,不依赖模型遵守指令 —— 这是产品线决策,不是判断题
  if (tierOverride) tour.suggestedTier = tierOverride;

  return {
    tour,
    usage: { inputTokens: message.usage.input_tokens, outputTokens: message.usage.output_tokens },
  };
}
