'use strict';

/**
 * @typedef {{ slug: string, nameKeywords?: string[], extraPaths?: string[], patterns?: string[] }} ScanEntry
 * @typedef {{ source: string, regex: RegExp }} ScanPattern
 * @typedef {{ needles: string[], slugNeedles: string[], patterns: ScanPattern[], findInText: (text: string) => string[], findInPath: (relativePath: string) => string[] }} Scanner
 */

const NAMED_ENTITIES = {
  amp: '&',
  nbsp: '\u00a0',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  rsquo: '\u2019',
  lsquo: '\u2018',
  ldquo: '\u201c',
  rdquo: '\u201d',
  ndash: '\u2013',
  mdash: '\u2014',
};

/**
 * Decode HTML entities in a single pass.
 * @param {string} text
 * @returns {string}
 */
function decodeEntitiesOnce(text) {
  let result = text.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    try {
      return String.fromCodePoint(parseInt(hex, 16));
    } catch (err) {
      return ' ';
    }
  });

  result = result.replace(/&#([0-9]+);/g, (match, dec) => {
    try {
      return String.fromCodePoint(parseInt(dec, 10));
    } catch (err) {
      return ' ';
    }
  });

  result = result.replace(/&([a-zA-Z]+);/g, (match, name) => {
    const key = name.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, key)) {
      return NAMED_ENTITIES[key];
    }
    return match;
  });

  return result;
}

/**
 * Normalise text for scanning: strip markup, decode escapes/entities,
 * apply typographic normalisation, collapse whitespace and lower-case.
 * @param {string} text
 * @returns {string}
 */
function normalizeForScan(text) {
  if (typeof text !== 'string' || text.length === 0) {
    return '';
  }

  let result = text;

  // 1. Remove HTML comments.
  result = result.replace(/<!--[\s\S]*?-->/g, '');

  // 2. Decode JSON unicode escapes.
  result = result.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

  // 3. Unescape JS/JSON escapes written as text.
  result = result.replace(/\\'/g, "'");
  result = result.replace(/\\"/g, '"');
  result = result.replace(/\\n/g, ' ');
  result = result.replace(/\\r/g, ' ');
  result = result.replace(/\\t/g, ' ');

  // 4. Decode HTML entities, repeating until stable (max 3 passes).
  for (let pass = 0; pass < 3; pass += 1) {
    const decoded = decodeEntitiesOnce(result);
    if (decoded === result) {
      break;
    }
    result = decoded;
  }

  // 5. Replace tag-like runs with a single space.
  result = result.replace(/<[^>]*>/g, ' ');

  // 6. Typographic normalisation.
  result = result.replace(/[\u2018\u2019\u201B]/g, "'");
  result = result.replace(/[\u201C\u201D]/g, '"');
  result = result.replace(/[\u2010-\u2015\u2212]/g, '-');
  result = result.replace(/\u00A0/g, ' ');
  result = result.replace(/[\u200B\u200C\u200D\u2060\uFEFF]/g, '');

  // 7. Collapse whitespace, trim, lower-case.
  result = result.replace(/\s+/g, ' ').trim().toLowerCase();

  return result;
}

/**
 * Convert text into a URL/file-name friendly slug.
 * @param {string} text
 * @returns {string}
 */
function slugifyForPath(text) {
  return normalizeForScan(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * @param {string[]} values
 * @returns {string[]}
 */
function uniqueNonEmpty(values) {
  const seen = new Set();
  const out = [];
  for (const value of values) {
    if (typeof value === 'string' && value.length > 0 && !seen.has(value)) {
      seen.add(value);
      out.push(value);
    }
  }
  return out;
}

/**
 * Build a scanner from a list of scan entries.
 * @param {ScanEntry[]} entries
 * @returns {Scanner}
 */
function buildScanner(entries) {
  const list = Array.isArray(entries) ? entries : [];

  /** @type {string[]} */
  const needleCandidates = [];
  /** @type {string[]} */
  const slugNeedleCandidates = [];
  /** @type {ScanPattern[]} */
  const patterns = [];

  for (const entry of list) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }

    if (typeof entry.slug === 'string') {
      needleCandidates.push(normalizeForScan(entry.slug));
      slugNeedleCandidates.push(slugifyForPath(entry.slug));
    }

    if (Array.isArray(entry.nameKeywords)) {
      for (const keyword of entry.nameKeywords) {
        if (typeof keyword === 'string') {
          needleCandidates.push(normalizeForScan(keyword));
          slugNeedleCandidates.push(slugifyForPath(keyword));
        }
      }
    }

    if (Array.isArray(entry.extraPaths)) {
      for (const extraPath of entry.extraPaths) {
        if (typeof extraPath === 'string') {
          needleCandidates.push(normalizeForScan(extraPath));
        }
      }
    }

    if (Array.isArray(entry.patterns)) {
      for (const source of entry.patterns) {
        if (typeof source !== 'string') {
          continue;
        }
        let regex;
        try {
          regex = new RegExp(source, 'i');
        } catch (err) {
          throw new Error(`Invalid scan pattern: ${source}`);
        }
        patterns.push({ source, regex });
      }
    }
  }

  const needles = uniqueNonEmpty(needleCandidates);
  const slugNeedles = uniqueNonEmpty(slugNeedleCandidates);

  /**
   * @param {string} text
   * @returns {string[]}
   */
  function findInText(text) {
    if (typeof text !== 'string' || text.length === 0) {
      return [];
    }
    const normalized = normalizeForScan(text);
    if (normalized.length === 0) {
      return [];
    }

    /** @type {string[]} */
    const labels = [];
    for (const needle of needles) {
      if (normalized.includes(needle)) {
        labels.push(needle);
      }
    }
    for (const pattern of patterns) {
      if (pattern.regex.test(normalized)) {
        labels.push(`/${pattern.source}/`);
      }
    }
    return uniqueNonEmpty(labels);
  }

  /**
   * @param {string} relativePath
   * @returns {string[]}
   */
  function findInPath(relativePath) {
    if (typeof relativePath !== 'string' || relativePath.length === 0) {
      return [];
    }
    const p = relativePath.replace(/\\/g, '/');
    const n = normalizeForScan(p);
    const lowerPath = p.toLowerCase();

    /** @type {string[]} */
    const labels = [];
    for (const needle of needles) {
      if (n.includes(needle)) {
        labels.push(needle);
      }
    }
    for (const slugNeedle of slugNeedles) {
      if (lowerPath.includes(slugNeedle)) {
        labels.push(slugNeedle);
      }
    }
    for (const pattern of patterns) {
      if (pattern.regex.test(n)) {
        labels.push(`/${pattern.source}/`);
      }
    }
    return uniqueNonEmpty(labels);
  }

  return { needles, slugNeedles, patterns, findInText, findInPath };
}

module.exports = { normalizeForScan, slugifyForPath, buildScanner };
