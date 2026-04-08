'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Row = {
  publicUrl: string;
  path: string;
  bucket: string;
  category: string;
  alt: string;
  tags: string[];
  description: string;
};

export default function EditImagePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [row, setRow] = useState<Row | null>(null);
  const [alt, setAlt] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/admin/images/${encodeURIComponent(id)}`, { credentials: 'include' });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || 'Not found');
          return;
        }
        setRow(json);
        setAlt(json.alt || '');
        setTags((json.tags || []).join(', '));
        setDescription(json.description || '');
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const save = async () => {
    setSaving(true);
    setMsg('');
    setError('');
    try {
      const res = await fetch(`/api/admin/images/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          alt: alt.trim(),
          tags: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          description: description.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Save failed');
        return;
      }
      setMsg('Saved.');
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm('Delete this file from Supabase Storage?')) return;
    try {
      const res = await fetch(`/api/admin/images/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Delete failed');
        return;
      }
      router.push('/admin/images');
    } catch {
      setError('Network error');
    }
  };

  if (loading) return <p className="text-sm text-warm-600">Loading…</p>;
  if (error && !row) return <p className="text-sm text-red-700">{error}</p>;
  if (!row) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-semibold text-accent">Edit metadata</h2>
        <p className="mt-1 font-mono text-xs text-warm-600 break-all">
          {row.bucket} / {row.path}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={row.publicUrl} alt="" className="w-full rounded-lg border border-warm-200 object-contain max-h-96" />
        <div className="space-y-4 text-sm">
          <div>
            <label className="font-medium text-warm-900">Alt text</label>
            <input value={alt} onChange={(e) => setAlt(e.target.value)} className="mt-1 w-full rounded border border-warm-300 px-3 py-2" />
          </div>
          <div>
            <label className="font-medium text-warm-900">Tags (comma-separated)</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="mt-1 w-full rounded border border-warm-300 px-3 py-2" />
          </div>
          <div>
            <label className="font-medium text-warm-900">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 w-full rounded border border-warm-300 px-3 py-2" />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={remove}
              className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-50"
            >
              Delete from storage
            </button>
          </div>
          {msg && <p className="text-sm text-secondary">{msg}</p>}
          {error && <p className="text-sm text-red-700">{error}</p>}
          <p className="text-xs text-warm-500">
            Metadata is stored in <code>tour-images/.admin/image-meta.json</code> (admin JSON, not embedded in image binary).
          </p>
        </div>
      </div>
    </div>
  );
}
