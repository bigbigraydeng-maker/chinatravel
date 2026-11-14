/**
 * Per-departure traveller list for operations, airlines and the China ground
 * team. UTF-8 with BOM so Excel shows Chinese names correctly.
 */
import { passportStatus, parseIsoDate } from '@/lib/traveller-form';

export interface ExportRow {
  surname: string;
  givenNames: string;
  chineseName: string | null;
  sex: string | null;
  dateOfBirth: string;
  nationality: string | null;
  passportNumber: string;
  issueDate: string | null;
  expiryDate: string;
  placeOfIssue: string | null;
  orderRef: string | null;
  agentName: string | null;
}

const HEADERS = [
  'Surname',
  'Given names',
  'Chinese name',
  'Sex',
  'Date of birth',
  'Nationality',
  'Passport number',
  'Issue date',
  'Expiry date',
  'Place of issue',
  'Order ref',
  'Agent',
  'Passport 6-month check',
];

const CHECK_LABEL = { ok: 'OK', short: 'UNDER 6 MONTHS', expired: 'EXPIRED', unknown: 'CHECK' } as const;

/** Quote every cell; neutralise leading = + - @ so a spreadsheet never runs a cell as a formula. */
export function csvCell(value: string | null | undefined): string {
  let s = value ?? '';
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export function buildDepartureCsv(rows: ExportRow[], departureDate: string, today: Date): string {
  const departure = parseIsoDate(departureDate);
  const lines = [HEADERS.map(csvCell).join(',')];
  const sorted = [...rows].sort((a, b) => `${a.surname} ${a.givenNames}`.localeCompare(`${b.surname} ${b.givenNames}`));
  for (const r of sorted) {
    const check = CHECK_LABEL[passportStatus(r.expiryDate, departure, today)];
    lines.push(
      [
        r.surname,
        r.givenNames,
        r.chineseName,
        r.sex,
        r.dateOfBirth,
        r.nationality,
        r.passportNumber,
        r.issueDate,
        r.expiryDate,
        r.placeOfIssue,
        r.orderRef,
        r.agentName,
        check,
      ]
        .map(csvCell)
        .join(',')
    );
  }
  return '﻿' + lines.join('\r\n') + '\r\n';
}
