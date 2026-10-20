/**
 * WHY: The tour enquiry form asks when the visitor plans to travel and their budget per person.
 * Only the CODES travel between the form, the API, the analytics event and the CRM; the labels
 * are for people. The codes are a contract with the CRM on the other side, so this test pins
 * every code and label exactly — a silent rename or reorder would break the CRM integration.
 */

import {
  BUDGET_BAND_EMAIL_LABEL, BUDGET_BAND_FIELD_LABEL, BUDGET_BAND_OPTIONS,
  TRAVEL_WINDOW_EMAIL_LABEL, TRAVEL_WINDOW_FIELD_LABEL, TRAVEL_WINDOW_OPTIONS,
  budgetBandLabel, travelWindowLabel,
} from '@/lib/enquiry/travel-preferences';

describe('travel preferences', () => {
  it('travel window options are exactly these codes and labels, in this order', () => {
    expect([...TRAVEL_WINDOW_OPTIONS]).toEqual([
      { code: 'mar_may_2027', label: 'March – May 2027' },
      { code: 'jun_sep_2027', label: 'June – September 2027' },
      { code: 'oct_dec_2027', label: 'October – December 2027' },
      { code: 'not_sure', label: 'Not sure yet' },
    ]);
  });

  it('budget band options are exactly these codes and labels, in this order', () => {
    expect([...BUDGET_BAND_OPTIONS]).toEqual([
      { code: 'under_3000', label: 'Under $3,000' },
      { code: '3000_5000', label: '$3,000 – $5,000' },
      { code: '5000_8000', label: '$5,000 – $8,000' },
      { code: 'above_8000', label: 'Above $8,000' },
    ]);
  });

  it('codes are unique and only use lower-case letters, digits and underscores', () => {
    const codePattern = /^[a-z0-9_]+$/;

    for (const options of [TRAVEL_WINDOW_OPTIONS, BUDGET_BAND_OPTIONS]) {
      const codes = options.map((option) => option.code);

      expect(new Set(codes).size).toBe(codes.length);

      for (const code of codes) {
        expect(code).toMatch(codePattern);
      }
    }
  });

  it('field and email labels are exactly the agreed wording', () => {
    expect(TRAVEL_WINDOW_FIELD_LABEL).toBe('When are you planning to travel?');
    expect(BUDGET_BAND_FIELD_LABEL).toBe('Estimated budget per person (NZD)');
    expect(TRAVEL_WINDOW_EMAIL_LABEL).toBe('Travel window');
    expect(BUDGET_BAND_EMAIL_LABEL).toBe('Budget per person (NZD)');
  });

  it('a known code gives its label', () => {
    expect(travelWindowLabel('jun_sep_2027')).toBe('June – September 2027');
    expect(budgetBandLabel('above_8000')).toBe('Above $8,000');

    for (const option of TRAVEL_WINDOW_OPTIONS) {
      expect(travelWindowLabel(option.code)).toBe(option.label);
    }

    for (const option of BUDGET_BAND_OPTIONS) {
      expect(budgetBandLabel(option.code)).toBe(option.label);
    }
  });

  it.each([
    '',
    'March – May 2027',
    'lt_3000',
    'gt_8000',
    'MAR_MAY_2027',
    ' mar_may_2027',
    undefined,
    null,
    5,
    [],
    ['mar_may_2027'],
    {},
  ])('anything that is not a known code gives null: %p', (value) => {
    expect(travelWindowLabel(value)).toBeNull();
    expect(budgetBandLabel(value)).toBeNull();
  });
});
