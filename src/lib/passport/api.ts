/**
 * Shared guard for /api/admin/passports/* routes. Middleware already requires
 * the admin login; this re-checks it (defence in depth), requires a staff name
 * for the audit log, and refuses to run without the encryption key.
 */
import { NextResponse } from 'next/server';
import { verifyAdminApi, adminUnauthorized } from '@/lib/auth/admin';
import { isPassportCryptoConfigured } from './crypto';
import { currentStaffName, staffNameRequired } from './staff';
import { PassportInputError } from './store';

export type Guard = { ok: true; staff: string } | { ok: false; response: Response };

export function guardStaff(): Guard {
  if (!verifyAdminApi()) return { ok: false, response: adminUnauthorized() };
  if (!isPassportCryptoConfigured()) {
    return {
      ok: false,
      response: NextResponse.json({ error: '护照系统还没配置加密钥匙（PASSPORT_ENCRYPTION_KEY），暂时不能用。' }, { status: 503 }),
    };
  }
  const staff = currentStaffName();
  if (!staff) return { ok: false, response: staffNameRequired() };
  return { ok: true, staff };
}

export function errorResponse(e: unknown, context: string): Response {
  if (e instanceof PassportInputError) return NextResponse.json({ error: e.message }, { status: 400 });
  // Never log request bodies or passport data — only the message.
  console.error(`[passport] ${context}:`, e instanceof Error ? e.message : 'unknown');
  return NextResponse.json({ error: '服务器出错了，请稍后再试。' }, { status: 500 });
}

export const NO_STORE = { 'Cache-Control': 'no-store, private' };
