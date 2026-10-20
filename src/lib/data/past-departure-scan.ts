/**
 * Flags customer-facing sentences that present an already-passed departure as
 * if it were still upcoming, e.g. "Departs 15 October 2026 & 18 March 2027."
 * written after 15 October 2026 has passed.
 *
 * Deliberately NOT read:
 *  - dates without a year (e.g. "Departs 15 October") — cannot be shown past;
 *  - date-before-word wording ("the 15 October 2026 departure") — only dates
 *    that follow a departure word are considered.
 * Known gaps (it does NOT catch these, so do not claim coverage):
 *  - a comma, full stop, ! or ? between the word and the date ("Departs, 15 October 2026");
 *  - ordinal days ("15th October 2026"), numeric dates ("15/10/2026"), US order ("October 15, 2026");
 *  - a sentence that also says sold out / has passed is skipped as a whole, even when it advertises
 *    another past departure.
 *
 * Sentences that explain history — sold out, fully booked, has passed /
 * departed / left / ended / gone, already departed, no longer — are skipped.
 *
 * A departure ON `today` is not past. Month-year dates are past only once the
 * last day of that month is strictly before `today`.
 *
 * A second, date-free rule (findYearlessMonthDepartures) catches departure wording that names a month but
 * no year, e.g. "departs Auckland in October" or "October Discovery departures": no date can be checked there,
 * and the tours have no departure in the month named, so the shape is banned outright. Write the full date, or
 * point at the tour page.
 * Known gaps of the second rule (measured, so do not rely on it for these): a word between "in" and the month
 * ("departs in late October", "in mid-October", "in early October"); a month with no product word before
 * "departure(s)" ("the October departure", "October departures"); and a month that has a year
 * ("October 2026 Discovery departures"), which the date rule cannot read either.
 */

const MONTHS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  jan: 1, feb: 2, mar: 3, apr: 4, jun: 6, jul: 7, aug: 8,
  sep: 9, sept: 9, oct: 10, nov: 11, dec: 12,
};

export interface PastDepartureMention {
  /** 1-based line number, in the ORIGINAL text, of the departure word. */
  line: number;
  /** The past date as written, whitespace collapsed, e.g. '15 October 2026' or 'October 2026'. */
  date: string;
  /** The whole sentence the mention is in: markup removed, whitespace collapsed. */
  sentence: string;
}

const DEPARTURE_WORD = /\b(?:depart(?:s|ing|ure|ures)?|leaves|leaving)\b/gi;

const MONTH_NAME = '(?:january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sept|sep|oct|nov|dec)\\.?';

// Anchored: a date is only ever read at the exact position asked for.
const FULL_DATE = new RegExp(`^(\\d{1,2})\\s+(${MONTH_NAME})\\s+(\\d{4})`, 'i');
const MONTH_YEAR = new RegExp(`^(${MONTH_NAME})\\s+(\\d{4})`, 'i');

/** A written date is never longer than this, so only this much text is looked at per position. */
const DATE_WINDOW = 40;

const SEPARATOR = /^\s*(?:,|&|and|or|\/|·|–|—|-)\s*/i;

const HISTORY = /\b(?:sold[ -]out|fully booked|(?:has|have|had)\s+(?:already\s+|now\s+)?(?:passed|departed|left|ended|gone)|already\s+(?:departed|left|passed)|no longer)\b/i;

const GAP_MAX = 32;

function normaliseLine(line: string): string {
  return line
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/\{\s*['"]\s*['"]\s*\}/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[*`]/g, '');
}

function collapseWhitespace(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

function lastDayOfMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

interface ParsedDate {
  /** The date as written, whitespace collapsed. */
  raw: string;
  /** ISO date to compare against `today`. */
  iso: string;
  /** Index just past the end of the date in `flat`. */
  end: number;
}

function readDateAt(flat: string, index: number): ParsedDate | null {
  const rest = flat.slice(index, index + DATE_WINDOW);

  const full = FULL_DATE.exec(rest);
  if (full && full.index === 0) {
    const day = Number(full[1]);
    const month = MONTHS[full[2].toLowerCase().replace(/\.$/, '')];
    const year = Number(full[3]);
    if (month !== undefined && day >= 1 && day <= lastDayOfMonth(year, month)) {
      return {
        raw: collapseWhitespace(full[0]),
        iso: isoDate(year, month, day),
        end: index + full[0].length,
      };
    }
  }

  const my = MONTH_YEAR.exec(rest);
  if (my && my.index === 0) {
    const month = MONTHS[my[1].toLowerCase().replace(/\.$/, '')];
    const year = Number(my[2]);
    if (month !== undefined) {
      return {
        raw: collapseWhitespace(my[0]),
        iso: isoDate(year, month, lastDayOfMonth(year, month)),
        end: index + my[0].length,
      };
    }
  }

  return null;
}

function isPast(iso: string, today: string): boolean {
  return iso < today;
}

const CLOSERS = '\'"`)]}';

/**
 * True when the character at `i` ends a sentence: '.', '!' or '?' followed by white space, a closing quote or
 * bracket, or the end of the text; or the quote that closes a string in source code (', " or ` followed by
 * ',', ';', ')' or a line break). Without the second rule a data file, where strings end without a full stop
 * and no ". " separates them, would glue a sentence to the next line and the next property's comments.
 */
function endsSentenceAt(text: string, i: number): boolean {
  const ch = text[i];
  const next = text[i + 1];
  if (ch === '.' || ch === '!' || ch === '?') {
    return next === undefined || /\s/.test(next) || CLOSERS.includes(next);
  }
  if (ch === "'" || ch === '"' || ch === '`') {
    return next === undefined || next === '\n' || next === ',' || next === ';' || next === ')';
  }
  return false;
}

function sentenceBounds(text: string, index: number): { start: number; end: number } {
  let start = 0;
  for (let i = 0; i < index; i++) {
    if (endsSentenceAt(text, i)) start = i + 1;
  }
  let end = text.length;
  for (let i = index; i < text.length; i++) {
    if (endsSentenceAt(text, i)) {
      end = i + 1;
      break;
    }
  }
  return { start, end };
}

function lineNumberAt(normalised: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index; i++) {
    if (normalised[i] === '\n') line++;
  }
  return line;
}

export function findPastDepartureMentions(text: string, today: string): PastDepartureMention[] {
  const normalised = text.split('\n').map(normaliseLine).join('\n');
  const flat = normalised.replace(/\n/g, ' ');

  const mentions: PastDepartureMention[] = [];
  const seen = new Set<string>();

  DEPARTURE_WORD.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = DEPARTURE_WORD.exec(flat)) !== null) {
    const wordEnd = match.index + match[0].length;

    // The first date must start within GAP_MAX chars of the word, with no digit and no sentence
    // punctuation in between, and at the start of a word (so "Clemay 2026" is not read as May 2026).
    // A month-year date begins with letters, so try every word start inside the gap.
    let first: ParsedDate | null = null;
    const gapLimit = Math.min(flat.length, wordEnd + GAP_MAX);
    for (let cursor = wordEnd; cursor <= gapLimit; cursor++) {
      const atWordStart = cursor === 0 || !/[A-Za-z0-9]/.test(flat[cursor - 1]);
      if (atWordStart) {
        first = readDateAt(flat, cursor);
        if (first) break;
      }
      if (cursor < flat.length && /[\d.!?,]/.test(flat[cursor])) break;
    }
    if (!first) continue;

    const chain: ParsedDate[] = [first];
    let chainEnd = first.end;
    for (;;) {
      const sep = SEPARATOR.exec(flat.slice(chainEnd));
      if (!sep) break;
      const next = readDateAt(flat, chainEnd + sep[0].length);
      if (!next) break;
      chain.push(next);
      chainEnd = next.end;
    }

    const pastDates = chain.filter((d) => isPast(d.iso, today));
    if (pastDates.length === 0) continue;

    const { start, end } = sentenceBounds(normalised, match.index);
    const sentence = collapseWhitespace(normalised.slice(start, end));
    if (HISTORY.test(sentence)) continue;

    const line = lineNumberAt(normalised, match.index);
    for (const d of pastDates) {
      const key = `${line}\u0000${d.raw}`;
      if (seen.has(key)) continue;
      seen.add(key);
      mentions.push({ line, date: d.raw, sentence });
    }
  }

  return mentions;
}

export interface YearlessMonthDeparture {
  /** 1-based line number, in the ORIGINAL text, of the departure word. */
  line: number;
  /** The wording that was found, e.g. 'departs Auckland in October'. */
  phrase: string;
  /** The whole sentence it is in: markup removed, whitespace collapsed. */
  sentence: string;
}

const MONTH_FULL = 'January|February|March|April|May|June|July|August|September|October|November|December';

/** A departure word, then (no digits or sentence punctuation in between) "in <Month>" that is NOT followed by a year. */
const YEARLESS_IN_MONTH = new RegExp(
  `\\b(?:depart(?:s|ing|ure|ures)?|leaves|leaving)\\b[^.!?\\d]{0,40}?\\bin\\s+(?:${MONTH_FULL})\\b(?!\\s+\\d{4})`,
  'gi',
);

/** Words that can sit between a month and "departure(s)" and say what departs: "October Discovery departures". */
const PRODUCT_WORD = 'Discovery|Signature|Stopover|Golden China|Best of China|small[- ]group|group|guided|tours?';

/**
 * A month, one or two product words, then "departure(s)": "October Discovery departures", "our March small-group
 * departure". It does not match when a day comes before the month ("the 15 October Discovery departure" is a dated
 * departure) or a year follows it ("October 2026 Discovery departures"). It runs case-insensitively so that
 * "Departures" in a heading counts; the caller then keeps only a month written with a capital letter.
 */
const MONTH_PRODUCT_DEPARTURES = new RegExp(
  `(?<!\\d(?:st|nd|rd|th)?\\s)\\b(?:${MONTH_FULL})\\s+(?:(?:${PRODUCT_WORD})\\s+){1,2}departures?\\b`,
  'gi',
);

/**
 * Finds departure wording that names a month but no year: "departs Auckland in October" and "October Discovery
 * departures". Sentences that explain history (sold out, has passed, ...) are skipped, as in
 * findPastDepartureMentions.
 */
export function findYearlessMonthDepartures(text: string): YearlessMonthDeparture[] {
  const normalised = text.split('\n').map(normaliseLine).join('\n');
  const flat = normalised.replace(/\n/g, ' ');

  const found: Array<YearlessMonthDeparture & { index: number }> = [];
  const seen = new Set<string>();
  for (const pattern of [YEARLESS_IN_MONTH, MONTH_PRODUCT_DEPARTURES]) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(flat)) !== null) {
      // "may" is a month only when it is written with a capital letter ("you may group departures" is not).
      if (pattern === MONTH_PRODUCT_DEPARTURES && !/^[A-Z]/.test(match[0])) continue;

      const { start, end } = sentenceBounds(normalised, match.index);
      const sentence = collapseWhitespace(normalised.slice(start, end));
      if (HISTORY.test(sentence)) continue;

      const line = lineNumberAt(normalised, match.index);
      const phrase = collapseWhitespace(match[0]);
      const key = `${line}\u0000${phrase}`;
      if (seen.has(key)) continue;
      seen.add(key);
      found.push({ index: match.index, line, phrase, sentence });
    }
  }
  return found
    .sort((a, b) => a.index - b.index)
    .map(({ line, phrase, sentence }) => ({ line, phrase, sentence }));
}
