/**
 * Who is acting, for the audit log.
 *
 * The CTS back office has ONE shared login (ADMIN_SECRET_KEY), so the system
 * cannot know which staff member is at the keyboard. Each person types their
 * name once per browser; it is stored in a cookie and written on every audit
 * entry. This is self-declared, not proof of identity — see the PR notes.
 */
import { cookies } from 'next/headers';

export const STAFF_COOKIE = 'cts_staff_name';
export const STAFF_NAME_MAX = 40;

export function cleanStaffName(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const s = raw.replace(/[\u0000-\u001f]/g, '').trim().slice(0, STAFF_NAME_MAX);
  return s.length >= 2 ? s : null;
}

export function currentStaffName(): string | null {
  const v = cookies().get(STAFF_COOKIE)?.value;
  if (!v) return null;
  try {
    return cleanStaffName(decodeURIComponent(v));
  } catch {
    return null;
  }
}

export function staffNameRequired(): Response {
  return new Response(JSON.stringify({ error: '请先在页面顶部填写你的名字（用于记录谁查看/修改了护照）。', code: 'staff_name_required' }), {
    status: 428,
    headers: { 'Content-Type': 'application/json' },
  });
}
