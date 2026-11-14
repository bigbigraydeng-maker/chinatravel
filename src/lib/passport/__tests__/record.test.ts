/**
 * Business rules behind the colours staff see:
 * red = do not trust this reading; yellow = trust it but act on it.
 * If one of these stops firing, a wrong passport number or an expiring
 * passport can reach a flight manifest unnoticed.
 */
import { parseTd3 } from '../mrz';
import { computeWarnings, imageDeleteAfter, mergeReading, namesMatch, validateForSave, EMPTY_FIELDS, type AiReading } from '../record';

const TODAY = new Date(Date.UTC(2026, 10, 15));

// A valid MRZ (computed check digits) for a passport expiring 2030-03-01.
const MRZ = ['P<NZLSMITH<<JANE<MARY<<<<<<<<<<<<<<<<<<<<<<<', 'LA12345675NZL6005144F3003013<<<<<<<<<<<<<<<6'].join('\n');

function ai(overrides: Partial<AiReading['fields']> = {}, unclear: string[] = []): AiReading {
  return {
    mrzText: MRZ,
    fields: {
      ...EMPTY_FIELDS,
      surname: 'SMITH',
      givenNames: 'JANE MARY',
      sex: 'F',
      dateOfBirth: '1960-05-14',
      nationality: 'NZL',
      passportNumber: 'LA1234567',
      issueDate: '2020-03-01',
      expiryDate: '2030-03-01',
      placeOfIssue: 'WELLINGTON',
      ...overrides,
    },
    unclearFields: unclear,
    notes: '',
  };
}

describe('fixture sanity', () => {
  it('uses an MRZ whose check digits pass', () => {
    expect(parseTd3(MRZ, TODAY).valid).toBe(true);
  });
});

describe('mergeReading', () => {
  it('prefers the MRZ number over a visual misread when the check digit passes', () => {
    const mrz = parseTd3(MRZ, TODAY);
    const merged = mergeReading(mrz, ai({ passportNumber: 'LA1234561' }));
    expect(merged.passportNumber).toBe('LA1234567');
    // Fields the MRZ does not carry come from the photo.
    expect(merged.issueDate).toBe('2020-03-01');
    expect(merged.placeOfIssue).toBe('WELLINGTON');
  });
});

describe('computeWarnings', () => {
  const codes = (w: { code: string }[]) => w.map((x) => x.code);

  it('is clean for a good passport and a far departure', () => {
    const mrz = parseTd3(MRZ, TODAY);
    const reading = ai();
    const w = computeWarnings(mergeReading(mrz, reading), { mrz, ai: reading, today: TODAY, departureDate: '2027-05-13' });
    expect(w).toEqual([]);
  });

  it('turns red when the MRZ check fails', () => {
    const bad = parseTd3(MRZ.replace('LA12345675', 'LA12345685'), TODAY);
    const w = computeWarnings(mergeReading(bad, ai()), { mrz: bad, ai: ai(), today: TODAY });
    expect(codes(w)).toContain('mrz_check_failed');
    expect(w.find((x) => x.code === 'mrz_check_failed')?.level).toBe('red');
  });

  it('turns red when the photo and the MRZ disagree', () => {
    const mrz = parseTd3(MRZ, TODAY);
    const reading = ai({ dateOfBirth: '1960-05-15' });
    expect(codes(computeWarnings(mergeReading(mrz, reading), { mrz, ai: reading, today: TODAY }))).toContain('mrz_visual_mismatch');
  });

  it('turns yellow when under 6 months remain at departure (same rule as the traveller form)', () => {
    const mrz = parseTd3(MRZ, TODAY);
    const w = computeWarnings(mergeReading(mrz, ai()), { mrz, ai: ai(), today: TODAY, departureDate: '2029-12-01' });
    const hit = w.find((x) => x.code === 'passport_under_6_months');
    expect(hit?.level).toBe('yellow');
  });

  it('turns red when the passport expires before departure', () => {
    const mrz = parseTd3(MRZ, TODAY);
    expect(codes(computeWarnings(mergeReading(mrz, ai()), { mrz, ai: ai(), today: TODAY, departureDate: '2030-06-01' }))).toContain(
      'passport_expired'
    );
  });

  it('warns when the passport name does not match the booking', () => {
    const mrz = parseTd3(MRZ, TODAY);
    const w = computeWarnings(mergeReading(mrz, ai()), { mrz, ai: ai(), today: TODAY, orderName: 'John Smith' });
    expect(codes(w)).toContain('name_mismatch_order');
  });

  it('flags a photo with no readable MRZ', () => {
    expect(codes(computeWarnings(ai().fields, { mrz: null, ai: ai(), today: TODAY }))).toContain('mrz_unreadable');
  });
});

describe('namesMatch', () => {
  it('ignores order, case and missing middle names on the booking', () => {
    expect(namesMatch({ surname: 'SMITH', givenNames: 'JANE MARY' }, 'jane smith')).toBe(true);
    expect(namesMatch({ surname: 'SMITH', givenNames: 'JANE MARY' }, 'Smith, Jane Mary')).toBe(true);
  });
  it('catches a different person', () => {
    expect(namesMatch({ surname: 'SMITH', givenNames: 'JANE' }, 'John Smith')).toBe(false);
  });
});

describe('validateForSave', () => {
  it('requires the fields airlines and visas cannot do without', () => {
    expect(validateForSave(EMPTY_FIELDS).length).toBeGreaterThanOrEqual(4);
    expect(validateForSave(ai().fields)).toEqual([]);
  });
});

describe('imageDeleteAfter', () => {
  it('is 6 months after the tour returns', () => {
    expect(imageDeleteAfter('2027-05-28', TODAY)).toBe('2027-11-28');
  });
  it('clamps to month end', () => {
    expect(imageDeleteAfter('2027-08-31', TODAY)).toBe('2028-02-29');
  });
  it('falls back to 6 months after upload when no departure is linked', () => {
    expect(imageDeleteAfter(null, TODAY)).toBe('2027-05-15');
  });
});
