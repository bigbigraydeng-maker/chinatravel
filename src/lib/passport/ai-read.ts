/**
 * Reads one passport photo with Claude Sonnet 5.5 (PM approved per-photo cost
 * on 2026-11-15, est. NZ$5–15/month).
 *
 * The model transcribes; it does not decide. The MRZ text it returns is
 * re-checked by our own check-digit code (mrz.ts), and staff confirm every
 * record. Anthropic does not train on API data by default.
 */
import Anthropic from '@anthropic-ai/sdk';
import { EMPTY_FIELDS, type AiReading, type PassportFields } from './record';

export const PASSPORT_MODEL = 'claude-sonnet-5-5';
const MAX_TOKENS = 2000;

export type PassportImageMime = 'image/jpeg' | 'image/png' | 'image/webp';
export const ACCEPTED_IMAGE_TYPES: PassportImageMime[] = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

export class PassportReadError extends Error {}

export function isAiReadConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

const FIELD_KEYS: (keyof PassportFields)[] = [
  'surname',
  'givenNames',
  'chineseName',
  'sex',
  'dateOfBirth',
  'nationality',
  'issuingState',
  'passportNumber',
  'issueDate',
  'expiryDate',
  'placeOfIssue',
];

const str = { type: 'string' } as const;

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['isPassport', 'mrzLine1', 'mrzLine2', 'fields', 'unclearFields', 'notes'],
  properties: {
    isPassport: { type: 'boolean' },
    mrzLine1: str,
    mrzLine2: str,
    fields: {
      type: 'object',
      additionalProperties: false,
      required: FIELD_KEYS,
      properties: Object.fromEntries(FIELD_KEYS.map((k) => [k, str])),
    },
    unclearFields: { type: 'array', items: { type: 'string', enum: FIELD_KEYS } },
    notes: str,
  },
};

const SYSTEM = `You transcribe the data page of a passport photo for CTS Tours, a New Zealand tour operator, so staff can book flights and hotels. A CTS staff member checks every result against the photo before it is used.

Rules:
- Transcribe exactly what is printed. Never guess or invent. If a field is not printed, not visible, or not legible, return an empty string for it and list it in unclearFields when it should have been there.
- mrzLine1 / mrzLine2: the two machine-readable lines at the bottom, character for character, using "<" for each filler chevron, 44 characters each. Empty strings if the MRZ is not visible.
- Dates as yyyy-mm-dd. sex as M, F or X. nationality and issuingState as the 3-letter code printed (e.g. NZL, CHN, AUS).
- surname and givenNames in Latin letters as printed in the visual zone, upper case.
- chineseName: Chinese characters only if printed on the page (e.g. Chinese passports), else empty.
- placeOfIssue / issueDate: as printed in the visual zone ("Place of issue", "Authority", "签发地点", "Date of issue").
- notes: one short sentence in Simplified Chinese for CTS staff about anything that affects reliability (glare, blur, cropped edge, damaged page), or empty.
- If the image is not a passport data page, set isPassport to false and leave the fields empty.`;

interface ModelOutput {
  isPassport: boolean;
  mrzLine1: string;
  mrzLine2: string;
  fields: Record<keyof PassportFields, string>;
  unclearFields: (keyof PassportFields)[];
  notes: string;
}

export interface ReadResult {
  reading: AiReading;
  isPassport: boolean;
  usage: { inputTokens: number; outputTokens: number };
}

function cleanSex(s: string): PassportFields['sex'] {
  const u = s.trim().toUpperCase();
  return u === 'M' || u === 'F' || u === 'X' ? u : '';
}

export async function readPassportImage(image: Buffer, mime: PassportImageMime): Promise<ReadResult> {
  if (!isAiReadConfigured()) throw new PassportReadError('AI 读取未配置（缺少 ANTHROPIC_API_KEY）。');

  const client = new Anthropic();
  const message = await client.messages.create({
    model: PASSPORT_MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM,
    // Low effort keeps this a transcription job (cost matches the estimate the PM approved).
    output_config: { effort: 'low', format: { type: 'json_schema', schema: SCHEMA } },
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mime, data: image.toString('base64') } },
          { type: 'text', text: 'Transcribe this passport data page.' },
        ],
      },
    ],
  });

  if (message.stop_reason === 'refusal') throw new PassportReadError('AI 拒绝读取这张图片。');
  if (message.stop_reason === 'max_tokens') throw new PassportReadError('AI 输出被截断，请重试。');
  const text = message.content.find((b): b is Anthropic.TextBlock => b.type === 'text');
  if (!text) throw new PassportReadError('AI 没有返回内容。');

  const out = JSON.parse(text.text) as ModelOutput;
  const fields: PassportFields = { ...EMPTY_FIELDS };
  for (const k of FIELD_KEYS) {
    const value = (out.fields[k] ?? '').trim();
    if (k === 'sex') fields.sex = cleanSex(value);
    else fields[k] = k === 'chineseName' || k === 'placeOfIssue' ? value : value.toUpperCase();
  }
  const mrzText = out.mrzLine1.trim() && out.mrzLine2.trim() ? `${out.mrzLine1.trim()}\n${out.mrzLine2.trim()}` : null;

  return {
    isPassport: out.isPassport,
    reading: { mrzText, fields, unclearFields: out.unclearFields ?? [], notes: out.notes ?? '' },
    usage: { inputTokens: message.usage.input_tokens, outputTokens: message.usage.output_tokens },
  };
}
