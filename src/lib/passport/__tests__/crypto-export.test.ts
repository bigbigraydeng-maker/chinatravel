/**
 * @jest-environment node
 *
 * Encryption must round-trip and must not be reversible by anyone without the
 * key; exports must be safe to open in Excel (no formula injection).
 */
import { randomBytes } from 'crypto';
import {
  decryptBytes,
  decryptText,
  encryptBytes,
  encryptText,
  hashLinkToken,
  lastFour,
  maskPassportNumber,
  newLinkToken,
  passportLookup,
  PassportCryptoConfigError,
} from '../crypto';
import { buildDepartureCsv, csvCell } from '../export-csv';

const ORIGINAL = process.env.PASSPORT_ENCRYPTION_KEY;

beforeEach(() => {
  process.env.PASSPORT_ENCRYPTION_KEY = randomBytes(32).toString('base64');
});
afterAll(() => {
  process.env.PASSPORT_ENCRYPTION_KEY = ORIGINAL;
});

describe('passport crypto', () => {
  it('round-trips text and never stores the plaintext', () => {
    const enc = encryptText('LA1234567');
    expect(enc).not.toContain('LA1234567');
    expect(decryptText(enc)).toBe('LA1234567');
  });

  it('round-trips image bytes', () => {
    const img = randomBytes(1000);
    expect(decryptBytes(encryptBytes(img)).equals(img)).toBe(true);
  });

  it('cannot decrypt with a different key', () => {
    const enc = encryptText('LA1234567');
    process.env.PASSPORT_ENCRYPTION_KEY = randomBytes(32).toString('base64');
    expect(() => decryptText(enc)).toThrow();
  });

  it('gives the same lookup for the same passport however it was typed', () => {
    expect(passportLookup('la 1234 567')).toBe(passportLookup('LA1234567'));
    expect(passportLookup('LA1234567')).not.toBe(passportLookup('LA1234568'));
  });

  it('refuses to run without a proper key', () => {
    process.env.PASSPORT_ENCRYPTION_KEY = 'short';
    expect(() => encryptText('x')).toThrow(PassportCryptoConfigError);
  });

  it('shows only the last 4 characters by default', () => {
    expect(maskPassportNumber(lastFour('LA1234567'))).toBe('•••••4567');
  });

  it('stores only a hash of link tokens', () => {
    const { token, hash } = newLinkToken();
    expect(token.length).toBeGreaterThanOrEqual(43);
    expect(hash).toBe(hashLinkToken(token));
    expect(hash).not.toContain(token);
  });
});

describe('departure CSV', () => {
  it('neutralises spreadsheet formulas', () => {
    expect(csvCell('=HYPERLINK("x")')).toBe(`"'=HYPERLINK(""x"")"`);
  });

  it('lists travellers with the 6-month check against the departure date', () => {
    const csv = buildDepartureCsv(
      [
        {
          surname: 'SMITH',
          givenNames: 'JANE',
          chineseName: '史密斯',
          sex: 'F',
          dateOfBirth: '1960-05-14',
          nationality: 'NZL',
          passportNumber: 'LA1234567',
          issueDate: null,
          expiryDate: '2027-06-01',
          placeOfIssue: null,
          orderRef: 'B-100',
          agentName: null,
        },
      ],
      '2027-05-13',
      new Date(Date.UTC(2026, 10, 15))
    );
    expect(csv.startsWith('﻿')).toBe(true);
    expect(csv).toContain('"史密斯"');
    expect(csv).toContain('"UNDER 6 MONTHS"');
  });
});
