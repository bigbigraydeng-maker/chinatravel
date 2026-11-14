/**
 * The passport record staff confirm, the warnings shown beside it, and the
 * rules that merge an AI reading with the MRZ. Pure functions — no I/O — so
 * the business rules are testable on their own.
 */
import { parseIsoDate, passportStatus, MIN_PASSPORT_VALIDITY_MONTHS } from '@/lib/traveller-form';
import type { ParsedMrz } from './mrz';

export interface PassportFields {
  surname: string;
  givenNames: string;
  chineseName: string;
  sex: '' | 'M' | 'F' | 'X';
  dateOfBirth: string; // yyyy-mm-dd
  nationality: string;
  issuingState: string;
  passportNumber: string;
  issueDate: string;
  expiryDate: string;
  placeOfIssue: string;
}

export const EMPTY_FIELDS: PassportFields = {
  surname: '',
  givenNames: '',
  chineseName: '',
  sex: '',
  dateOfBirth: '',
  nationality: '',
  issuingState: '',
  passportNumber: '',
  issueDate: '',
  expiryDate: '',
  placeOfIssue: '',
};

/** What the AI read from the photo (visual zone + raw MRZ text). */
export interface AiReading {
  mrzText: string | null;
  fields: PassportFields;
  /** Fields the model could not read clearly. */
  unclearFields: string[];
  notes: string;
}

export type WarningLevel = 'red' | 'yellow';

export type WarningCode =
  | 'mrz_unreadable'
  | 'mrz_check_failed'
  | 'mrz_visual_mismatch'
  | 'passport_expired'
  | 'passport_under_6_months'
  | 'name_mismatch_order'
  | 'missing_required'
  | 'ai_unclear';

export interface Warning {
  code: WarningCode;
  level: WarningLevel;
  message: string; // Chinese, for CTS staff
}

export const WARNING_LEVEL: Record<WarningCode, WarningLevel> = {
  mrz_unreadable: 'red',
  mrz_check_failed: 'red',
  mrz_visual_mismatch: 'red',
  passport_expired: 'red',
  missing_required: 'red',
  passport_under_6_months: 'yellow',
  name_mismatch_order: 'yellow',
  ai_unclear: 'yellow',
};

export const REQUIRED_FIELDS: (keyof PassportFields)[] = ['surname', 'dateOfBirth', 'passportNumber', 'expiryDate'];

const FIELD_LABEL: Record<keyof PassportFields, string> = {
  surname: '姓（英文）',
  givenNames: '名（英文）',
  chineseName: '中文名',
  sex: '性别',
  dateOfBirth: '出生日期',
  nationality: '国籍',
  issuingState: '签发国',
  passportNumber: '护照号',
  issueDate: '签发日期',
  expiryDate: '有效期至',
  placeOfIssue: '签发地点',
};

export function fieldLabel(key: string): string {
  return (FIELD_LABEL as Record<string, string>)[key] ?? key;
}

function norm(s: string): string {
  return s.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/**
 * Starting values for the review form. The MRZ wins wherever its check digit
 * passed (that is checked arithmetic, not a guess); otherwise the visual reading.
 * Issue date, place of issue and Chinese name only exist in the visual zone.
 */
export function mergeReading(mrz: ParsedMrz | null, ai: AiReading | null): PassportFields {
  const v = ai?.fields ?? EMPTY_FIELDS;
  const out: PassportFields = { ...EMPTY_FIELDS, ...v };
  if (!mrz) return out;
  out.surname = mrz.surname || v.surname;
  out.givenNames = mrz.givenNames || v.givenNames;
  out.sex = mrz.sex === 'X' && v.sex ? v.sex : mrz.sex;
  out.nationality = mrz.nationality || v.nationality;
  out.issuingState = mrz.issuingState || v.issuingState;
  if (mrz.passportNumber.checkOk) out.passportNumber = mrz.passportNumber.value;
  if (mrz.dateOfBirth.checkOk && mrz.dateOfBirth.value) out.dateOfBirth = mrz.dateOfBirth.value;
  if (mrz.expiryDate.checkOk && mrz.expiryDate.value) out.expiryDate = mrz.expiryDate.value;
  return out;
}

/** Normalises a name for "does it match the booking" — order and spacing ignored. */
function nameTokens(s: string): string[] {
  return s
    .toUpperCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .split(/[^A-Z]+/)
    .filter(Boolean)
    .sort();
}

export function namesMatch(fields: Pick<PassportFields, 'surname' | 'givenNames'>, orderName: string): boolean {
  const a = nameTokens(`${fields.surname} ${fields.givenNames}`);
  const b = nameTokens(orderName);
  if (a.length === 0 || b.length === 0) return true;
  // Every booking-name token must appear on the passport (bookings often drop middle names).
  return b.every((t) => a.includes(t));
}

export interface WarningContext {
  mrz: ParsedMrz | null;
  ai: AiReading | null;
  /** Name as on the booking, if known. */
  orderName?: string | null;
  /** yyyy-mm-dd of the linked departure, if known. */
  departureDate?: string | null;
  today: Date;
}

export function computeWarnings(fields: PassportFields, ctx: WarningContext): Warning[] {
  const out: Warning[] = [];
  const add = (code: WarningCode, message: string) => out.push({ code, level: WARNING_LEVEL[code], message });

  if (!ctx.mrz) {
    add('mrz_unreadable', '护照底部两行机器码没读出来，所有字段都要对照照片人工核对。');
  } else if (!ctx.mrz.valid) {
    const bad: string[] = [];
    if (!ctx.mrz.passportNumber.checkOk) bad.push('护照号');
    if (!ctx.mrz.dateOfBirth.checkOk) bad.push('出生日期');
    if (!ctx.mrz.expiryDate.checkOk) bad.push('有效期');
    if (!ctx.mrz.compositeCheckOk || !ctx.mrz.personalNumber.checkOk) bad.push('整体校验');
    add('mrz_check_failed', `机器码校验没通过（${bad.join('、') || '格式'}），可能读错了字，请对照照片逐位核对。`);
  }

  if (ctx.mrz && ctx.ai) {
    const diffs: string[] = [];
    const v = ctx.ai.fields;
    if (v.passportNumber && ctx.mrz.passportNumber.checkOk && norm(v.passportNumber) !== norm(ctx.mrz.passportNumber.value)) {
      diffs.push('护照号');
    }
    if (v.dateOfBirth && ctx.mrz.dateOfBirth.checkOk && v.dateOfBirth !== ctx.mrz.dateOfBirth.value) diffs.push('出生日期');
    if (v.expiryDate && ctx.mrz.expiryDate.checkOk && v.expiryDate !== ctx.mrz.expiryDate.value) diffs.push('有效期');
    if (diffs.length) add('mrz_visual_mismatch', `照片上印的字和机器码不一致：${diffs.join('、')}。以照片为准核对。`);
  }

  const missing = REQUIRED_FIELDS.filter((k) => !String(fields[k]).trim());
  if (missing.length) add('missing_required', `缺少必填项：${missing.map(fieldLabel).join('、')}。`);

  if (fields.expiryDate && parseIsoDate(fields.expiryDate)) {
    const departure = ctx.departureDate ? parseIsoDate(ctx.departureDate) : null;
    const status = passportStatus(fields.expiryDate, departure, ctx.today);
    const against = departure ? '出发日' : '今天';
    if (status === 'expired') add('passport_expired', `护照在${against}之前已经过期。`);
    if (status === 'short') {
      add('passport_under_6_months', `护照到${against}剩余有效期不足 ${MIN_PASSPORT_VALIDITY_MONTHS} 个月，建议客人换护照。`);
    }
  }

  if (ctx.orderName && !namesMatch(fields, ctx.orderName)) {
    add('name_mismatch_order', `护照上的名字和订单上的「${ctx.orderName}」对不上，请核对。`);
  }

  if (ctx.ai && ctx.ai.unclearFields.length) {
    add('ai_unclear', `AI 说这几项看不清：${ctx.ai.unclearFields.map(fieldLabel).join('、')}。`);
  }

  return out;
}

/** Field-level validation before a record is saved. Returns Chinese messages. */
export function validateForSave(fields: PassportFields): string[] {
  const errors: string[] = [];
  for (const k of REQUIRED_FIELDS) if (!String(fields[k]).trim()) errors.push(`${fieldLabel(k)}不能为空`);
  for (const k of ['dateOfBirth', 'expiryDate', 'issueDate'] as const) {
    if (fields[k] && !parseIsoDate(fields[k])) errors.push(`${fieldLabel(k)}格式不对（要 yyyy-mm-dd）`);
  }
  if (fields.passportNumber && !/^[A-Z0-9]{5,12}$/i.test(fields.passportNumber.replace(/\s/g, ''))) {
    errors.push('护照号只能是 5–12 位字母或数字');
  }
  if (fields.sex && !['M', 'F', 'X'].includes(fields.sex)) errors.push('性别只能是 M / F / X');
  return errors;
}

/** Photo deletion date: 6 months after the tour returns (PM decision 2026-11-15). */
export function imageDeleteAfter(returnDate: string | null, uploadedAt: Date): string {
  const base = (returnDate && parseIsoDate(returnDate)) || new Date(Date.UTC(uploadedAt.getUTCFullYear(), uploadedAt.getUTCMonth(), uploadedAt.getUTCDate()));
  const d = new Date(base.getTime());
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + 6);
  const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, last));
  return d.toISOString().slice(0, 10);
}
