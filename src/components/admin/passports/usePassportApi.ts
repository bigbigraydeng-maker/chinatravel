'use client';

import { useCallback, useEffect, useState } from 'react';

export class StaffNameNeeded extends Error {}

/** fetch wrapper: JSON in/out, turns the 428 "who are you" reply into StaffNameNeeded. */
export async function passportFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { credentials: 'include', cache: 'no-store', ...init });
  if (res.status === 428) {
    window.dispatchEvent(new Event('cts-staff-name-needed'));
    throw new StaffNameNeeded('请先填写你的名字');
  }
  const json = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) throw new Error(json.error || `请求失败（${res.status}）`);
  return json;
}

export function useStaffName() {
  const [name, setName] = useState<string | null | undefined>(undefined);
  const refresh = useCallback(async () => {
    const r = await fetch('/api/admin/passports/staff', { credentials: 'include', cache: 'no-store' });
    const j = (await r.json().catch(() => ({ name: null }))) as { name: string | null };
    setName(j.name ?? null);
  }, []);
  useEffect(() => {
    void refresh();
    const onNeed = () => setName(null);
    window.addEventListener('cts-staff-name-needed', onNeed);
    return () => window.removeEventListener('cts-staff-name-needed', onNeed);
  }, [refresh]);
  const save = useCallback(async (value: string) => {
    const r = await fetch('/api/admin/passports/staff', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: value }),
    });
    const j = (await r.json().catch(() => ({}))) as { name?: string; error?: string };
    if (!r.ok) throw new Error(j.error || '保存失败');
    setName(j.name ?? null);
  }, []);
  return { name, save };
}
