'use client';

import { useState } from 'react';
import { passportFetch } from './usePassportApi';

/** Masked by default; 「查看完整」 reveals and is written to the audit log server-side. */
export default function RevealNumber({ travellerId, masked }: { travellerId: string; masked: string }) {
  const [full, setFull] = useState<string | null>(null);
  const [error, setError] = useState('');
  return (
    <span className="font-mono">
      {full ?? masked}{' '}
      {full ? (
        <button type="button" className="text-xs text-gray-500 underline" onClick={() => setFull(null)}>
          收起
        </button>
      ) : (
        <button
          type="button"
          className="text-xs text-primary underline"
          title="会记录是谁、什么时候查看的"
          onClick={async () => {
            try {
              const r = await passportFetch<{ passportNumber: string }>(`/api/admin/passports/travellers/${travellerId}/reveal`, { method: 'POST' });
              setFull(r.passportNumber);
            } catch (e) {
              setError(e instanceof Error ? e.message : '失败');
            }
          }}
        >
          查看完整
        </button>
      )}
      {error ? <span className="ml-1 text-xs text-red-700">{error}</span> : null}
    </span>
  );
}
