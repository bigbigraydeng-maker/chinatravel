'use client';

import { useEffect, useState } from 'react';

type AnalyzePayload = {
  unused: { bucket: string; path: string; publicUrl: string; size: number }[];
  unusedTotal: number;
  large: { bucket: string; path: string; publicUrl: string; size: number }[];
  largeTotal: number;
  missingAlt: { bucket: string; path: string; url: string }[];
  missingAltTotal: number;
  recommendations: string[];
  referencedCount: number;
  storageCount: number;
};

function formatBytes(n: number): string {
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function AdminAnalyzePage() {
  const [data, setData] = useState<AnalyzePayload | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/images/analyze', { credentials: 'include' });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || 'Analyze failed');
          return;
        }
        setData(json);
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-semibold text-accent">Analysis</h2>
        <p className="mt-1 text-warm-700">
          Cross-checks Storage objects with <code className="rounded bg-warm-100 px-1">optimized/url-mapping-complete.json</code> and{' '}
          <code className="rounded bg-warm-100 px-1">src/</code> URL references.
        </p>
      </div>

      {loading && <p className="text-sm text-warm-600">Running analysis…</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      {data && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-warm-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase text-warm-500">Referenced URLs (scan)</p>
              <p className="mt-1 font-serif text-2xl text-accent">{data.referencedCount}</p>
            </div>
            <div className="rounded-lg border border-warm-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase text-warm-500">Objects in Storage</p>
              <p className="mt-1 font-serif text-2xl text-accent">{data.storageCount}</p>
            </div>
            <div className="rounded-lg border border-warm-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase text-warm-500">Unused (approx.)</p>
              <p className="mt-1 font-serif text-2xl text-accent">{data.unusedTotal}</p>
            </div>
          </div>

          <div className="rounded-xl border border-warm-200 bg-white p-6 shadow-sm">
            <h3 className="font-serif text-lg font-semibold text-accent">Recommendations</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-warm-800">
              {data.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-accent">Possibly unused ({Math.min(data.unused.length, 500)} shown)</h3>
            <ul className="mt-2 max-h-80 overflow-y-auto rounded border border-warm-200 bg-white text-xs font-mono">
              {data.unused.map((u) => (
                <li key={`${u.bucket}/${u.path}`} className="border-b border-warm-100 px-2 py-1">
                  <span className="text-warm-500">{u.bucket}</span> / {u.path}{' '}
                  <span className="text-warm-400">({formatBytes(u.size)})</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-accent">Large files &gt; 2 MB ({Math.min(data.large.length, 200)} shown)</h3>
            <ul className="mt-2 max-h-64 overflow-y-auto rounded border border-warm-200 bg-white text-xs font-mono">
              {data.large.map((u) => (
                <li key={`${u.bucket}/${u.path}`} className="border-b border-warm-100 px-2 py-1">
                  {u.bucket}/{u.path} — {formatBytes(u.size)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-accent">Missing alt in admin metadata ({Math.min(data.missingAlt.length, 500)} shown)</h3>
            <ul className="mt-2 max-h-64 overflow-y-auto rounded border border-warm-200 bg-white text-xs">
              {data.missingAlt.map((u) => (
                <li key={`${u.bucket}/${u.path}`} className="border-b border-warm-100 px-2 py-1 font-mono">
                  {u.bucket}/{u.path}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
