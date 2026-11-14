/**
 * Expiry reminders for other departments — the same 6-month rule the
 * traveller-details form uses (src/lib/traveller-form.ts), so a customer
 * and CTS staff never get different answers about the same passport.
 */
import { MIN_PASSPORT_VALIDITY_MONTHS, parseIsoDate, passportStatus, type PassportStatus } from '@/lib/traveller-form';

export interface ExpiryInput {
  id: string;
  surname: string;
  givenNames: string;
  maskedNumber: string;
  expiryDate: string;
  contactEmail: string | null;
  departureDate: string | null;
  tourName: string | null;
}

export interface ExpiryReportRow extends ExpiryInput {
  status: Exclude<PassportStatus, 'ok' | 'unknown'> | 'within_12_months';
  /** Chinese, for staff */
  reason: string;
}

const ORDER: Record<ExpiryReportRow['status'], number> = { expired: 0, short: 1, within_12_months: 2 };

export function buildExpiryReport(rows: ExpiryInput[], today: Date): ExpiryReportRow[] {
  const out: ExpiryReportRow[] = [];
  const horizon = new Date(Date.UTC(today.getUTCFullYear() + 1, today.getUTCMonth(), today.getUTCDate()));
  for (const r of rows) {
    const departure = r.departureDate ? parseIsoDate(r.departureDate) : null;
    const status = passportStatus(r.expiryDate, departure, today);
    const when = departure ? `出发日 ${r.departureDate}` : '今天';
    if (status === 'expired') {
      out.push({ ...r, status, reason: `护照在${when}前已过期` });
    } else if (status === 'short') {
      out.push({ ...r, status, reason: `到${when}剩余不足 ${MIN_PASSPORT_VALIDITY_MONTHS} 个月` });
    } else if (!departure) {
      const exp = parseIsoDate(r.expiryDate);
      if (exp && exp.getTime() <= horizon.getTime()) out.push({ ...r, status: 'within_12_months', reason: '12 个月内到期，下次报团前提醒客人' });
    }
  }
  return out.sort((a, b) => ORDER[a.status] - ORDER[b.status] || a.expiryDate.localeCompare(b.expiryDate));
}
