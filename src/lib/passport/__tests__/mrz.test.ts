/**
 * The MRZ check digits are what lets staff trust a reading without re-typing it.
 * These tests pin the ICAO 9303 specimen and the failure modes that matter:
 * a single misread character must turn the reading red, never silently pass.
 */
import { checkDigit, mrzDate, normaliseMrzLines, parseTd3, tryParseTd3, MrzFormatError } from '../mrz';

const TODAY = new Date(Date.UTC(2026, 10, 15));

// ICAO Doc 9303 Part 4 specimen passport (Utopia).
const SPECIMEN = [
  'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<',
  'L898902C36UTO7408122F1204159ZE184226B<<<<<10',
].join('\n');

describe('checkDigit', () => {
  it('matches the ICAO worked examples', () => {
    expect(checkDigit('L898902C3')).toBe(6);
    expect(checkDigit('740812')).toBe(2);
    expect(checkDigit('120415')).toBe(9);
    expect(checkDigit('<<<<<<')).toBe(0);
  });
});

describe('parseTd3', () => {
  it('reads every field of the specimen and marks it valid', () => {
    const mrz = parseTd3(SPECIMEN, TODAY);
    expect(mrz.valid).toBe(true);
    expect(mrz.issuingState).toBe('UTO');
    expect(mrz.surname).toBe('ERIKSSON');
    expect(mrz.givenNames).toBe('ANNA MARIA');
    expect(mrz.passportNumber.value).toBe('L898902C3');
    expect(mrz.nationality).toBe('UTO');
    expect(mrz.dateOfBirth.value).toBe('1974-08-12');
    expect(mrz.sex).toBe('F');
    expect(mrz.expiryDate.value).toBe('2012-04-15');
    expect(mrz.personalNumber.value).toBe('ZE184226B');
  });

  it('fails the passport number check when one character is misread', () => {
    // C3 read as G3 — the kind of OCR slip that would put a wrong number on a flight manifest.
    const misread = SPECIMEN.replace('L898902C3', 'L898902G3');
    const mrz = parseTd3(misread, TODAY);
    expect(mrz.passportNumber.checkOk).toBe(false);
    expect(mrz.valid).toBe(false);
  });

  it('fails the date-of-birth check when a digit is wrong', () => {
    const mrz = parseTd3(SPECIMEN.replace('7408122', '7408132'), TODAY);
    expect(mrz.dateOfBirth.checkOk).toBe(false);
    expect(mrz.valid).toBe(false);
  });

  it('repairs letter-for-digit OCR slips in date fields only', () => {
    // O read for 0 in the date of birth; the passport number keeps its letters.
    const mrz = parseTd3(SPECIMEN.replace('7408122', '74O8122'), TODAY);
    expect(mrz.dateOfBirth.value).toBe('1974-08-12');
    expect(mrz.valid).toBe(true);
  });

  it('accepts lowercase, spaces and dropped trailing fillers', () => {
    const messy = 'p<utoeriksson<<anna<maria\n L898902C36UTO7408122F1204159ZE184226B<<<<<10 ';
    expect(parseTd3(messy, TODAY).valid).toBe(true);
  });

  it('puts a birth year in the past century when it would otherwise be in the future', () => {
    expect(mrzDate('500101', 'birth', TODAY)).toBe('1950-01-01');
    expect(mrzDate('200101', 'birth', TODAY)).toBe('2020-01-01');
  });

  it('rejects impossible dates', () => {
    expect(mrzDate('740230', 'birth', TODAY)).toBeNull();
  });
});

describe('normaliseMrzLines', () => {
  it('rejects input that is not two lines', () => {
    expect(() => normaliseMrzLines('P<UTOERIKSSON')).toThrow(MrzFormatError);
  });
  it('rejects non-passport documents', () => {
    expect(() => normaliseMrzLines('I<UTO\nL898902C3')).toThrow(MrzFormatError);
  });
});

describe('tryParseTd3', () => {
  it('returns null for unreadable input instead of throwing', () => {
    expect(tryParseTd3('not an mrz', TODAY)).toBeNull();
    expect(tryParseTd3(null, TODAY)).toBeNull();
  });
});
