/** Validates untrusted JSON into PassportFields (shape only; business checks live in record.ts). */
import { EMPTY_FIELDS, type PassportFields } from './record';

export function parseFields(input: unknown): PassportFields | null {
  if (!input || typeof input !== 'object') return null;
  const src = input as Record<string, unknown>;
  const out: PassportFields = { ...EMPTY_FIELDS };
  for (const key of Object.keys(EMPTY_FIELDS) as (keyof PassportFields)[]) {
    const v = src[key];
    if (v === undefined || v === null) continue;
    if (typeof v !== 'string' || v.length > 100) return null;
    if (key === 'sex') {
      if (v !== '' && v !== 'M' && v !== 'F' && v !== 'X') return null;
      out.sex = v;
    } else {
      out[key] = v.trim();
    }
  }
  return out;
}
