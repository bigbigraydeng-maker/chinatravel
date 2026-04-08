'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ImageCard from '@/components/admin/ImageCard';

type Dash = {
  total: number;
  totalBytes: number;
  recent: { publicUrl: string; path: string; bucket: string }[];
  recommendations: string[];
};

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function AdminDashboardPage() {
  const [dash, setDash] = useState<Dash | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [imgRes, anRes] = await Promise.all([
          fetch('/api/admin/images?page=1&pageSize=5', { credentials: 'include' }),
          fetch('/api/admin/images/analyze', { credentials: 'include' }),
        ]);
        const imgJson = await imgRes.json();
        const anJson = await anRes.json();
        if (!imgRes.ok) {
          setError(imgJson.error || 'Failed to load dashboard');
          return;
        }
        if (!anRes.ok) {
          setDash({
            total: imgJson.total,
            totalBytes: imgJson.totalBytes ?? 0,
            recent: (imgJson.images || []).map(
              (i: { publicUrl: string; path: string; bucket: string }) => ({
                publicUrl: i.publicUrl,
                path: i.path,
                bucket: i.bucket,
              })
            ),
            recommendations: ['Analysis unavailable.'],
          });
          return;
        }
        if (cancelled) return;
        setDash({
          total: imgJson.total,
          totalBytes: imgJson.totalBytes ?? 0,
          recent: (imgJson.images || []).map(
            (i: { publicUrl: string; path: string; bucket: string }) => ({
              publicUrl: i.publicUrl,
              path: i.path,
              bucket: i.bucket,
            })
          ),
          recommendations: anJson.recommendations || [],
        });
      } catch {
        if (!cancelled) setError('Network error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-3xl font-semibold text-accent">Dashboard</h2>
        <p className="mt-1 text-warm-700">Supabase image inventory and quick actions.</p>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      {dash && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-warm-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-warm-600">Total objects</p>
              <p className="mt-2 font-serif text-3xl text-accent">{dash.total}</p>
            </div>
            <div className="rounded-xl border border-warm-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-warm-600">Estimated storage</p>
              <p className="mt-2 font-serif text-3xl text-accent">{formatBytes(dash.totalBytes)}</p>
              <p className="mt-1 text-xs text-warm-500">Free tier reference: 1 GB on Supabase</p>
            </div>
            <div className="rounded-xl border border-warm-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-warm-600">Quick links</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/admin/images/upload" className="text-primary font-medium hover:underline">
                    Upload images
                  </Link>
                </li>
                <li>
                  <Link href="/admin/images" className="text-primary font-medium hover:underline">
                    Browse library
                  </Link>
                </li>
                <li>
                  <Link href="/admin/images/analyze" className="text-primary font-medium hover:underline">
                    Run analysis
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-accent">Recent uploads (newest paths)</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {dash.recent.map((r) => (
                <div key={r.publicUrl}>
                  <ImageCard src={r.publicUrl} alt="" title={r.path} />
                  <p className="mt-1 truncate text-xs font-mono text-warm-600">{r.bucket}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-warm-200 bg-white p-6 shadow-sm">
            <h3 className="font-serif text-xl font-semibold text-accent">Recommendations</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-warm-800">
              {dash.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
