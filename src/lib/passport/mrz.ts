/**
 * TD3 (passport) machine-readable zone parser, ICAO Doc 9303 Part 4.
 *
 * The MRZ is the only part of a passport with built-in error detection: each
 * field carries a check digit. We treat a passing check as the strongest
 * evidence a reading is right, and any failure as "a human must look".
 *
 * The MRZ does NOT contain issue date or place of issue — those come from the
 * visual zone (AI reading or manual entry).
 */

export const TD3_LINE_LENGTH = 44;

export interface MrzField<T> {
  value: T;
  /** null when the field has no check digit of its own */
  checkOk: boolean | null;
}

export interface ParsedMrz {
  documentType: string;
  issuingState: string;
  surname: string;
  givenNames: string;
  passportNumber: MrzField<string>;
  nationality: string;
  dateOfBirth: MrzField<string | null>; // yyyy-mm-dd
  sex: 'M' | 'F' | 'X';
  expiryDate: MrzField<string | null>; // yyyy-mm-dd
  personalNumber: MrzField<string>;
  compositeCheckOk: boolean;
  /** Every check digit passed and both dates are real dates. */
  valid: boolean;
}

export class MrzFormatError extends Error {}

const WEIGHTS = [7, 3, 1];

function charValue(ch: string): number {
  if (ch >= '0' && ch <= '9') return ch.charCodeAt(0) - 48;
  if (ch >= 'A' && ch <= 'Z') return ch.charCodeAt(0) - 55;
  if (ch === '<') return 0;
  throw new MrzFormatError(`Invalid MRZ character "${ch}"`);
}

/** ICAO 9303 check digit: weights 7-3-1 repeating, sum mod 10. */
export function checkDigit(input: string): number {
  let sum = 0;
  for (let i = 0; i < input.length; i += 1) {
    sum += charValue(input[i]) * WEIGHTS[i % 3];
  }
  return sum % 10;
}

function digitMatches(field: string, digit: string): boolean {
  // A filler '<' as check digit is allowed only for an all-filler field.
  if (digit === '<') return /^<*$/.test(field);
  return /^\d$/.test(digit) && checkDigit(field) === Number(digit);
}

/** OCR commonly confuses these in fields that can only be digits. */
const DIGIT_FIXES: Record<string, string> = { O: '0', Q: '0', D: '0', I: '1', L: '1', Z: '2', S: '5', B: '8', G: '6' };

function digitsOnly(s: string): string {
  return s.replace(/[A-Z]/g, (ch) => DIGIT_FIXES[ch] ?? ch);
}

/**
 * Normalise raw text (from AI, OCR or a paste) into two 44-char MRZ lines.
 * Accepts lowercase, spaces, guillemets read for '<', and extra blank lines.
 */
export function normaliseMrzLines(raw: string): [string, string] {
  const lines = raw
    .toUpperCase()
    .replace(/[«‹＜]/g, '<')
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+/g, ''))
    .filter((l) => l.length > 0);

  if (lines.length !== 2) {
    throw new MrzFormatError(`Expected 2 MRZ lines, got ${lines.length}`);
  }
  const fixed = lines.map((l) => {
    if (l.length > TD3_LINE_LENGTH) throw new MrzFormatError(`MRZ line is ${l.length} characters, expected 44`);
    // Trailing fillers are often dropped by OCR; pad them back.
    return l.padEnd(TD3_LINE_LENGTH, '<');
  }) as [string, string];
  if (!fixed[0].startsWith('P')) throw new MrzFormatError('Not a passport MRZ (line 1 must start with P)');
  if (!/^[A-Z0-9<]+$/.test(fixed[0] + fixed[1])) throw new MrzFormatError('MRZ contains characters other than A-Z, 0-9 and <');
  return fixed;
}

/** YYMMDD → yyyy-mm-dd, or null if not a real calendar date. */
export function mrzDate(yymmdd: string, kind: 'birth' | 'expiry', today: Date): string | null {
  if (!/^\d{6}$/.test(yymmdd)) return null;
  const yy = Number(yymmdd.slice(0, 2));
  const mm = Number(yymmdd.slice(2, 4));
  const dd = Number(yymmdd.slice(4, 6));
  const currentYY = today.getUTCFullYear() % 100;
  const century = today.getUTCFullYear() - currentYY;
  let year: number;
  if (kind === 'birth') {
    // A birth date cannot be in the future.
    year = yy > currentYY ? century - 100 + yy : century + yy;
  } else {
    // Passports are valid ≤ 10 years; anything that would be > 20 years ahead is last century.
    year = century + yy;
    if (year > today.getUTCFullYear() + 20) year -= 100;
  }
  const d = new Date(Date.UTC(year, mm - 1, dd));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== mm - 1 || d.getUTCDate() !== dd) return null;
  return `${String(year).padStart(4, '0')}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
}

function nameField(s: string): string {
  return s.replace(/<+/g, ' ').trim();
}

export function parseTd3(raw: string, today: Date = new Date()): ParsedMrz {
  const [line1, rawLine2] = normaliseMrzLines(raw);

  // Line 2 positions that can only be digits get OCR fixes; the passport
  // number and personal number are alphanumeric and are left alone.
  const l2 = rawLine2.split('');
  const numericPositions = [9, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 43];
  for (const p of numericPositions) l2[p] = digitsOnly(l2[p]);
  const line2 = l2.join('');

  const documentType = line1.slice(0, 2).replace(/</g, '');
  const issuingState = line1.slice(2, 5).replace(/</g, '');
  const names = line1.slice(5);
  const sep = names.indexOf('<<');
  const surname = nameField(sep >= 0 ? names.slice(0, sep) : names);
  const givenNames = sep >= 0 ? nameField(names.slice(sep + 2)) : '';

  const numberRaw = line2.slice(0, 9);
  const numberCheck = line2[9];
  const nationality = line2.slice(10, 13).replace(/</g, '');
  const dobRaw = line2.slice(13, 19);
  const dobCheck = line2[19];
  const sexRaw = line2[20];
  const expiryRaw = line2.slice(21, 27);
  const expiryCheck = line2[27];
  const personalRaw = line2.slice(28, 42);
  const personalCheck = line2[42];
  const compositeCheck = line2[43];

  const composite = line2.slice(0, 10) + line2.slice(13, 20) + line2.slice(21, 43);
  const compositeCheckOk = /^\d$/.test(compositeCheck) && checkDigit(composite) === Number(compositeCheck);

  const passportNumber = { value: numberRaw.replace(/</g, ''), checkOk: digitMatches(numberRaw, numberCheck) };
  const dateOfBirth = { value: mrzDate(dobRaw, 'birth', today), checkOk: digitMatches(dobRaw, dobCheck) };
  const expiryDate = { value: mrzDate(expiryRaw, 'expiry', today), checkOk: digitMatches(expiryRaw, expiryCheck) };
  // Personal-number check digit may be '<' or '0' when the field is empty.
  const personalEmpty = /^<*$/.test(personalRaw);
  const personalNumber = {
    value: personalRaw.replace(/</g, ''),
    checkOk: personalEmpty ? personalCheck === '<' || personalCheck === '0' : digitMatches(personalRaw, personalCheck),
  };
  const sex: ParsedMrz['sex'] = sexRaw === 'M' || sexRaw === 'F' ? sexRaw : 'X';

  const valid =
    passportNumber.checkOk &&
    dateOfBirth.checkOk &&
    expiryDate.checkOk &&
    personalNumber.checkOk &&
    compositeCheckOk &&
    dateOfBirth.value !== null &&
    expiryDate.value !== null &&
    passportNumber.value.length > 0 &&
    surname.length > 0;

  return {
    documentType,
    issuingState,
    surname,
    givenNames,
    passportNumber,
    nationality,
    dateOfBirth,
    sex,
    expiryDate,
    personalNumber,
    compositeCheckOk,
    valid,
  };
}

/** Like parseTd3 but returns null instead of throwing on unreadable input. */
export function tryParseTd3(raw: string | null | undefined, today: Date = new Date()): ParsedMrz | null {
  if (!raw) return null;
  try {
    return parseTd3(raw, today);
  } catch (e) {
    if (e instanceof MrzFormatError) return null;
    throw e;
  }
}
