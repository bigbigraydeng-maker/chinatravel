'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

export type ImageRow = {
  id: string;
  bucket: string;
  category: string;
  path: string;
  name: string;
  size: number;
  updatedAt: string | null;
  publicUrl: string;
  alt: string;
};

type ListResponse = {
  images: ImageRow[];
  total: number;
  totalBytes?: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageList() {
  const [search, setSearch] = useState('');
  const [bucket, setBucket] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(
    async (pageOverride?: number) => {
      setLoading(true);
      setError('');
      const effectivePage = pageOverride ?? page;
      const params = new URLSearchParams({
        page: String(effectivePage),
        pageSize: '20',
      });
      if (search.trim()) params.set('search', search.trim());
      if (bucket) params.set('bucket', bucket);
      try {
        const res = await fetch(`/api/admin/images?${params}`, { credentials: 'include' });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || 'Failed to load');
          setData(null);
          return;
        }
        setData(json);
      } catch {
        setError('Network error');
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [page, search, bucket]
  );

  useEffect(() => {
    load();
  }, [load]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (!data?.images.length) return;
    if (selected.size === data.images.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(data.images.map((i) => i.id)));
    }
  };

  const deleteSelected = async () => {
    if (!selected.size) return;
    if (!confirm(`Delete ${selected.size} image(s) from storage? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      for (const id of Array.from(selected)) {
        const res = await fetch(`/api/admin/images/${encodeURIComponent(id)}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!res.ok) {
          const j = await res.json();
          throw new Error(j.error || 'Delete failed');
        }
      }
      setSelected(new Set());
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-3">
          <div>
            <label className="block text-xs font-medium text-warm-700">Search</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (setPage(1), load(1))}
              placeholder="Path or bucket"
              className="mt-1 rounded border border-warm-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-warm-700">Bucket</label>
            <select
              value={bucket}
              onChange={(e) => {
                setBucket(e.target.value);
                setPage(1);
              }}
              className="mt-1 rounded border border-warm-300 px-3 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="tour-images">tour-images</option>
              <option value="guide-images">guide-images</option>
              <option value="credential-images">credential-images</option>
            </select>
          </div>
          <button
            type="button"
            className="rounded-md border border-warm-300 bg-white px-4 py-2 text-sm font-medium hover:bg-warm-50"
            onClick={() => {
              setPage(1);
              load(1);
            }}
          >
            Apply
          </button>
        </div>
        {selected.size > 0 && (
          <button
            type="button"
            disabled={deleting}
            onClick={deleteSelected}
            className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50"
          >
            {deleting ? 'Deleting…' : `Delete selected (${selected.size})`}
          </button>
        )}
      </div>

      {loading && <p className="text-sm text-warm-600">Loading…</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      {data && (
        <>
          <p className="text-sm text-warm-700">
            Showing {data.images.length} of {data.total} objects
            {data.totalBytes != null && ` · ${formatBytes(data.totalBytes)} total`}
          </p>
          <div className="overflow-x-auto rounded-lg border border-warm-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-warm-100 text-warm-900">
                <tr>
                  <th className="p-2 w-10">
                    <input type="checkbox" checked={selected.size === data.images.length && data.images.length > 0} onChange={toggleAll} />
                  </th>
                  <th className="p-2">Preview</th>
                  <th className="p-2">Path</th>
                  <th className="p-2">Bucket</th>
                  <th className="p-2">Size</th>
                  <th className="p-2">Updated</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.images.map((row) => (
                  <tr key={row.id} className="border-t border-warm-200">
                    <td className="p-2 align-top">
                      <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggle(row.id)} />
                    </td>
                    <td className="p-2 w-24">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={row.publicUrl} alt="" className="h-14 w-20 object-cover rounded" />
                    </td>
                    <td className="p-2 align-top font-mono text-xs break-all max-w-md">{row.path}</td>
                    <td className="p-2 align-top">{row.bucket}</td>
                    <td className="p-2 align-top whitespace-nowrap">{formatBytes(row.size)}</td>
                    <td className="p-2 align-top text-xs whitespace-nowrap">{row.updatedAt || '—'}</td>
                    <td className="p-2 align-top whitespace-nowrap">
                      <Link href={`/admin/images/${encodeURIComponent(row.id)}`} className="text-primary font-medium hover:underline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded border border-warm-300 px-3 py-1 text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-warm-700">
              Page {data.page} / {data.totalPages}
            </span>
            <button
              type="button"
              disabled={page >= data.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded border border-warm-300 px-3 py-1 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
