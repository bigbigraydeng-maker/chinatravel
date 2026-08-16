/**
 * 对话式修订 —— 审核人用自然语言纠正解析结果。
 *
 * 每轮都带上原始文档,这样「第 5 天酒店写错了」这类指令能回原文核对,
 * 而不是让模型凭印象改。文档块打了 cache_control,多轮对话只付一次读取成本。
 *
 * 每轮返回完整 Tour 对象(而不是增量补丁)—— 补丁合并容易在嵌套数组上出错,
 * 全量重发换来的是「拿到的一定是完整合法对象」。代价是每轮约 6-8k 输出 token,
 * 所以这里用 medium effort:改字段是编辑活,不需要 high。
 */

import Anthropic from '@anthropic-ai/sdk';
import { TOUR_EXTRACTION_SCHEMA, type ParsedTour } from './schema';
import { TourExtractionError } from './extract';

const MODEL = 'claude-opus-5';
const MAX_TOKENS = 32000;

/** 最多带多少轮历史 —— 再多对修订质量没有帮助,只是烧 token */
const MAX_HISTORY_TURNS = 20;

const REFINE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['reply', 'tour'],
  properties: {
    reply: {
      type: 'string',
      description:
        'Your reply to the reviewer, in the language they used. State what you changed and why, or — if you did not change anything — why not. Two or three sentences. Do not restate the whole tour.',
    },
    tour: TOUR_EXTRACTION_SCHEMA,
  },
} as const;

const SYSTEM_PROMPT = `You are revising a structured tour draft with the CTS Tours product manager who is reviewing it. The original source document is attached, along with the current state of the draft.

Apply exactly the change the reviewer asks for, and nothing else. Every field they did not mention must come back byte-identical — this is a review loop, so silent edits elsewhere destroy their trust in the diff.

The reviewer outranks the document on judgement calls: tier, naming, phrasing, how to present a product. When they correct one of those, apply it without arguing, and carry the implication through — a tier correction should also update tierReasoning to reflect the real reason, not leave the old justification standing.

The document outranks the reviewer on facts it actually states. If they ask you to change a date, price, hotel or itinerary detail in a way the source contradicts, make the change they asked for — they may know something the document does not — but say plainly in your reply what the document says, so the discrepancy is on the record.

Language is per field, not per conversation. Product content — name, title, shortDescription, highlights, sellingPoints, itinerary, inclusions, exclusions, metaTitle, metaDescription — stays in English; it is published on an English-language site. Reviewer content — tierReasoning, the issue text in clientClaimsToVerify, and confidenceNotes — stays in Simplified Chinese. Quoted source wording stays in the original English inside 「」 in both cases. Answering the reviewer in Chinese does not license translating the product fields.

Keep missingFields and confidenceNotes current. When the reviewer resolves an open question, drop it from those lists; that is how they see the draft converge.`;

export interface RefineTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface RefineTourResult {
  reply: string;
  tour: ParsedTour;
  usage: { inputTokens: number; outputTokens: number; cacheReadTokens: number };
}

/**
 * @throws TourExtractionError 缺少 API key、模型拒答、输出被截断
 */
export async function refineTour(
  documentBlocks: Anthropic.ContentBlockParam[],
  currentTour: ParsedTour,
  history: RefineTurn[]
): Promise<RefineTourResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new TourExtractionError('缺少 ANTHROPIC_API_KEY 环境变量。');
  }
  if (history.length === 0 || history[history.length - 1].role !== 'user') {
    throw new TourExtractionError('对话历史必须以审核人的一条消息结尾。');
  }

  const client = new Anthropic();
  const recent = history.slice(-MAX_HISTORY_TURNS);

  // 文档块每轮完全相同 —— 打上缓存断点,后续轮次按缓存价读取
  const cachedDocument: Anthropic.ContentBlockParam[] = documentBlocks.map((block, i) =>
    i === documentBlocks.length - 1 ? { ...block, cache_control: { type: 'ephemeral' } } : block
  );

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    output_config: {
      effort: 'medium',
      format: { type: 'json_schema', schema: REFINE_SCHEMA },
    },
    messages: [
      {
        role: 'user',
        content: [
          ...cachedDocument,
          {
            type: 'text',
            text: `Current draft:\n\n${JSON.stringify(currentTour, null, 2)}`,
          },
        ],
      },
      ...recent.map((turn) => ({ role: turn.role, content: turn.content })),
    ],
  });

  const message = await stream.finalMessage();

  if (message.stop_reason === 'refusal') {
    throw new TourExtractionError('模型拒绝处理这条修改请求。');
  }
  if (message.stop_reason === 'max_tokens') {
    throw new TourExtractionError(`输出被截断(上限 ${MAX_TOKENS} tokens)。`);
  }

  const text = message.content.find((block) => block.type === 'text');
  if (!text || text.type !== 'text') {
    throw new TourExtractionError('模型没有返回内容。');
  }

  const parsed = JSON.parse(text.text) as { reply: string; tour: ParsedTour };

  return {
    reply: parsed.reply,
    tour: parsed.tour,
    usage: {
      inputTokens: message.usage.input_tokens,
      outputTokens: message.usage.output_tokens,
      cacheReadTokens: message.usage.cache_read_input_tokens ?? 0,
    },
  };
}
