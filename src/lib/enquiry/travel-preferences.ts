/**
 * The two qualifying questions on the tour enquiry form: when the visitor plans to travel, and their
 * budget per person. The form (browser), the API route and the notification email all read this one
 * list, so a code means the same thing everywhere.
 *
 * Only the CODES travel between systems (form payload, analytics event, CRM). The labels are for people:
 * the form options and the email rows. Never store or compare a label.
 */

export const TRAVEL_WINDOW_OPTIONS = [
  { code: 'mar_may_2027', label: 'March – May 2027' },
  { code: 'jun_sep_2027', label: 'June – September 2027' },
  { code: 'oct_dec_2027', label: 'October – December 2027' },
  { code: 'not_sure', label: 'Not sure yet' },
] as const;

export const BUDGET_BAND_OPTIONS = [
  { code: 'under_3000', label: 'Under $3,000' },
  { code: '3000_5000', label: '$3,000 – $5,000' },
  { code: '5000_8000', label: '$5,000 – $8,000' },
  { code: 'above_8000', label: 'Above $8,000' },
] as const;

export type TravelWindowCode = (typeof TRAVEL_WINDOW_OPTIONS)[number]['code'];
export type BudgetBandCode = (typeof BUDGET_BAND_OPTIONS)[number]['code'];

/** Field labels on the form. */
export const TRAVEL_WINDOW_FIELD_LABEL = 'When are you planning to travel?';
export const BUDGET_BAND_FIELD_LABEL = 'Estimated budget per person (NZD)';

/** Row labels in the notification email. */
export const TRAVEL_WINDOW_EMAIL_LABEL = 'Travel window';
export const BUDGET_BAND_EMAIL_LABEL = 'Budget per person (NZD)';

/** The label for a known travel-window code, or null for anything else (including a label, '' and non-strings). */
export function travelWindowLabel(code: unknown): string | null {
  return TRAVEL_WINDOW_OPTIONS.find((option) => option.code === code)?.label ?? null;
}

/** The label for a known budget-band code, or null for anything else (including a label, '' and non-strings). */
export function budgetBandLabel(code: unknown): string | null {
  return BUDGET_BAND_OPTIONS.find((option) => option.code === code)?.label ?? null;
}
