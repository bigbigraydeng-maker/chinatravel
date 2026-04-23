'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  Copy, Trash2, Pencil, X, ChevronLeft, ChevronRight,
  Check, Upload, Search, Image as ImageIcon, Loader2,
  ChevronDown, ChevronUp,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ImageRow = {
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

type UploadFile = {
  uid: string;
  file: File;
  preview: string;
  category: string;
  subPath: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  error?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1048576).toFixed(2)} MB`;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => undefined);
}

// ─── Copy URL Popover ─────────────────────────────────────────────────────────

function CopyUrlPopover({
  url,
  name,
  onClose,
}: {
  url: string;
  name: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState('');
  const formats = [
    { label: 'Direct URL', value: url },
    { label: 'Markdown', value: `![${name}](${url})` },
    { label: 'Next.js src', value: url },
  ];

  return (
    <div
      className="absolute z-30 right-0 top-full mt-1 rounded-lg border border-warm-200 bg-white shadow-xl p-2 w-52 text-xs"
      onClick={(e) => e.stopPropagation()}
    >
      {formats.map((f) => (
        <button
          key={f.label}
          type="button"
          className="flex w-full items-center justify-between rounded px-2 py-1.5 hover:bg-warm-50 gap-2 text-left"
          onClick={() => {
            copyToClipboard(f.value);
            setCopied(f.label);
            setTimeout(() => setCopied(''), 2000);
          }}
        >
          <span className="text-warm-800">{f.label}</span>
          {copied === f.label ? (
            <Check size={12} className="text-secondary shrink-0" />
          ) : (
            <Copy size={12} className="text-warm-500 shrink-0" />
          )}
        </button>
      ))}
      <hr className="my-1 border-warm-100" />
      <button
        type="button"
        onClick={onClose}
        className="w-full text-center text-warm-500 hover:text-warm-800 py-1 text-xs"
      >
        Close
      </button>
    </div>
  );
}

// ─── Image Card ───────────────────────────────────────────────────────────────

function ImageCard({
  row,
  onDelete,
  onRename,
  onOpen,
}: {
  row: ImageRow;
  onDelete: (id: string) => void;
  onRename: (id: string, path: string) => void;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [showCopy, setShowCopy] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-warm-200 bg-white cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowCopy(false);
      }}
      onClick={onOpen}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={row.publicUrl}
        alt={row.alt || row.name}
        className="h-36 w-full object-cover bg-warm-100"
        loading="lazy"
      />

      <div className="px-2 py-1.5 bg-white">
        <p className="truncate text-xs font-medium text-warm-900" title={row.name}>
          {row.name}
        </p>
        <p className="text-xs text-warm-500">{formatBytes(row.size)}</p>
      </div>

      {hovered && (
        <div
          className="absolute inset-0 bg-accent/75 flex flex-col justify-between p-2.5"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-xs text-white/85 break-all line-clamp-4 leading-relaxed">
            {row.path}
          </p>

          <div className="flex items-center gap-1.5 justify-end relative">
            {/* Copy URL */}
            <div className="relative">
              <button
                type="button"
                title="Copy URL"
                className="rounded p-1.5 bg-white/20 hover:bg-white/40 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCopy((v) => !v);
                }}
              >
                <Copy size={13} />
              </button>
              {showCopy && (
                <CopyUrlPopover
                  url={row.publicUrl}
                  name={row.name}
                  onClose={() => setShowCopy(false)}
                />
              )}
            </div>

            {/* Rename */}
            <button
              type="button"
              title="Rename"
              className="rounded p-1.5 bg-white/20 hover:bg-white/40 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onRename(row.id, row.path);
              }}
            >
              <Pencil size={13} />
            </button>

            {/* Preview */}
            <button
              type="button"
              title="Preview"
              className="rounded p-1.5 bg-white/20 hover:bg-white/40 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
            >
              <ImageIcon size={13} />
            </button>

            {/* Delete */}
            <button
              type="button"
              title="Delete"
              className="rounded p-1.5 bg-red-500/80 hover:bg-red-600 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(row.id);
              }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  idx,
  onClose,
  onPrev,
  onNext,
}: {
  images: ImageRow[];
  idx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const row = images[idx];
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  if (!row) return null;

  const formats = [
    { label: 'Direct URL', value: row.publicUrl },
    { label: 'Markdown', value: `![${row.name}](${row.publicUrl})` },
    { label: 'Next.js src', value: row.publicUrl },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white bg-white/10 rounded-full p-1.5"
      >
        <X size={20} />
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2.5"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2.5"
      >
        <ChevronRight size={22} />
      </button>

      <div
        className="flex flex-col items-center gap-5 max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={row.publicUrl}
          alt={row.alt || row.name}
          className="max-h-[62vh] rounded-xl object-contain shadow-2xl"
        />

        <div className="text-center space-y-1">
          <p className="font-medium text-white">{row.name}</p>
          <p className="text-sm text-white/55">
            {row.path} · {formatBytes(row.size)} · {row.bucket}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {formats.map((f) => (
            <button
              key={f.label}
              type="button"
              className="rounded-md bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 flex items-center gap-1.5 transition"
              onClick={() => {
                copyToClipboard(f.value);
                setCopied(f.label);
                setTimeout(() => setCopied(''), 2000);
              }}
            >
              {copied === f.label ? <Check size={12} /> : <Copy size={12} />}
              {f.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-white/30">
          {idx + 1} / {images.length} · ESC to close · ← → to navigate
        </p>
      </div>
    </div>
  );
}

// ─── Rename Modal ─────────────────────────────────────────────────────────────

function RenameModal({
  imageId,
  currentPath,
  onConfirm,
  onClose,
}: {
  imageId: string;
  currentPath: string;
  onConfirm: (id: string, newPath: string) => Promise<void>;
  onClose: () => void;
}) {
  const lastSlash = currentPath.lastIndexOf('/');
  const dir = lastSlash >= 0 ? currentPath.slice(0, lastSlash + 1) : '';
  const currentName = currentPath.slice(dir.length);
  const [value, setValue] = useState(currentName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (trimmed === currentName) {
      onClose();
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onConfirm(imageId, dir + trimmed);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Rename failed');
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-lg font-semibold text-accent mb-1">Rename image</h3>
        {dir && <p className="text-xs text-warm-500 mb-3">Folder: {dir}</p>}
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
            if (e.key === 'Escape') onClose();
          }}
          className="w-full rounded border border-warm-300 px-3 py-2 text-sm focus:outline-none focus:border-primary"
        />
        {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-warm-300 px-4 py-2 text-sm hover:bg-warm-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={saving || !value.trim()}
            className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
          >
            {saving ? 'Renaming…' : 'Rename'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────

function UploadZone({ onUploaded }: { onUploaded: () => void }) {
  const [dragOver, setDragOver] = useState(false);
  const [queue, setQueue] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const addFiles = useCallback((files: FileList | File[]) => {
    const allowed = new Set(['image/jpeg', 'image/png', 'image/webp']);
    const items: UploadFile[] = Array.from(files)
      .filter((f) => allowed.has(f.type))
      .map((f) => ({
        uid: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file: f,
        preview: URL.createObjectURL(f),
        category: 'tour',
        subPath: '',
        status: 'pending',
      }));
    setQueue((prev) => [...prev, ...items]);
  }, []);

  const removeItem = (uid: string) => {
    setQueue((prev) => {
      const item = prev.find((q) => q.uid === uid);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return prev.filter((q) => q.uid !== uid);
    });
  };

  const updateItem = (uid: string, patch: Partial<UploadFile>) => {
    setQueue((prev) => prev.map((q) => (q.uid === uid ? { ...q, ...patch } : q)));
  };

  const pendingCount = queue.filter((q) => q.status === 'pending').length;
  const doneCount = queue.filter((q) => q.status === 'done').length;

  const uploadAll = async () => {
    if (!pendingCount) return;
    setUploading(true);
    for (const item of queue) {
      if (item.status !== 'pending') continue;
      updateItem(item.uid, { status: 'uploading' });
      const form = new FormData();
      form.append('file', item.file);
      form.append('category', item.category);
      if (item.subPath.trim()) form.append('path', item.subPath.trim());
      try {
        const res = await fetch('/api/admin/images', {
          method: 'POST',
          body: form,
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        updateItem(item.uid, { status: 'done' });
      } catch (e) {
        updateItem(item.uid, {
          status: 'error',
          error: e instanceof Error ? e.message : 'Failed',
        });
      }
    }
    setUploading(false);
    if (doneCount + pendingCount > 0) onUploaded();
  };

  const clearDone = () => {
    setQueue((prev) => {
      prev.filter((q) => q.status === 'done').forEach((q) => URL.revokeObjectURL(q.preview));
      return prev.filter((q) => q.status !== 'done');
    });
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          dragOver ? 'border-primary bg-primary/5' : 'border-warm-300 bg-warm-50 hover:border-warm-400'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
      >
        <Upload size={28} className="mx-auto mb-2 text-warm-400" />
        <p className="text-warm-700 text-sm">
          Drag images here, or{' '}
          <label className="text-primary font-medium cursor-pointer hover:underline">
            click to choose
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
                e.target.value = '';
              }}
            />
          </label>
        </p>
        <p className="text-xs text-warm-500 mt-1">JPG, PNG, WebP · max 50 MB each</p>
      </div>

      {/* File queue */}
      {queue.length > 0 && (
        <div className="space-y-2">
          {queue.map((item) => (
            <div
              key={item.uid}
              className="flex items-center gap-3 rounded-lg border border-warm-200 bg-white p-2.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.preview}
                alt=""
                className="h-12 w-16 rounded object-cover shrink-0 bg-warm-100"
              />
              <div className="flex-1 min-w-0 space-y-1.5">
                <p className="text-xs font-medium text-warm-900 truncate">{item.file.name}</p>
                <div className="flex gap-2 flex-wrap">
                  <select
                    value={item.category}
                    onChange={(e) => updateItem(item.uid, { category: e.target.value })}
                    disabled={item.status !== 'pending'}
                    className="rounded border border-warm-300 px-2 py-1 text-xs disabled:opacity-50"
                  >
                    <option value="tour">tour-images</option>
                    <option value="guide">guide-images</option>
                    <option value="credential">credential-images</option>
                  </select>
                  <input
                    value={item.subPath}
                    onChange={(e) => updateItem(item.uid, { subPath: e.target.value })}
                    disabled={item.status !== 'pending'}
                    placeholder="Subfolder (optional)"
                    className="rounded border border-warm-300 px-2 py-1 text-xs w-40 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="shrink-0 flex items-center gap-1.5">
                {item.status === 'uploading' && (
                  <Loader2 size={14} className="animate-spin text-primary" />
                )}
                {item.status === 'done' && (
                  <Check size={14} className="text-secondary" />
                )}
                {item.status === 'error' && (
                  <span className="text-xs text-red-700" title={item.error}>Error</span>
                )}
                {item.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => removeItem(item.uid)}
                    className="text-warm-400 hover:text-warm-700"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <button
                type="button"
                onClick={uploadAll}
                disabled={uploading}
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50 flex items-center gap-2"
              >
                {uploading && <Loader2 size={14} className="animate-spin" />}
                Upload {pendingCount} file{pendingCount !== 1 ? 's' : ''}
              </button>
            )}
            {doneCount > 0 && (
              <button
                type="button"
                onClick={clearDone}
                className="rounded-md border border-warm-300 px-4 py-2 text-sm text-warm-700 hover:bg-warm-50"
              >
                Clear done ({doneCount})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ImageManager() {
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [draftSearch, setDraftSearch] = useState('');
  const [bucket, setBucket] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [renaming, setRenaming] = useState<{ id: string; path: string } | null>(null);
  const [deleting, setDeleting] = useState<Set<string>>(new Set());

  const PAGE_SIZE = 40;

  const load = useCallback(
    async (pageOverride?: number) => {
      setLoading(true);
      setError('');
      const p = pageOverride ?? page;
      const params = new URLSearchParams({ page: String(p), pageSize: String(PAGE_SIZE) });
      if (search) params.set('search', search);
      if (bucket) params.set('bucket', bucket);
      try {
        const res = await fetch(`/api/admin/images?${params}`, { credentials: 'include' });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || 'Failed to load');
          setData(null);
        } else {
          setData(json);
        }
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

  const applySearch = () => {
    setSearch(draftSearch);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image from storage? This cannot be undone.')) return;
    setDeleting((prev) => new Set(prev).add(id));
    try {
      const res = await fetch(`/api/admin/images/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.error || 'Delete failed');
      }
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          images: prev.images.filter((img) => img.id !== id),
          total: prev.total - 1,
        };
      });
      if (lightboxIdx !== null) setLightboxIdx(null);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setDeleting((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleRename = async (id: string, newPath: string) => {
    const res = await fetch(
      `/api/admin/images/${encodeURIComponent(id)}/move`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPath }),
        credentials: 'include',
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Rename failed');

    const { id: newId, publicUrl } = data as { id: string; publicUrl: string };
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        images: prev.images.map((img) => {
          if (img.id !== id) return img;
          const lastName = newPath.slice(newPath.lastIndexOf('/') + 1);
          return { ...img, id: newId, path: newPath, name: lastName, publicUrl };
        }),
      };
    });
  };

  const images = data?.images ?? [];

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap items-end gap-2">
          <div>
            <label className="block text-xs font-medium text-warm-700 mb-1">Search</label>
            <div className="relative">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-warm-400"
              />
              <input
                value={draftSearch}
                onChange={(e) => setDraftSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applySearch()}
                placeholder="File name…"
                className="rounded border border-warm-300 pl-8 pr-3 py-2 text-sm w-52 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-warm-700 mb-1">Bucket</label>
            <select
              value={bucket}
              onChange={(e) => {
                setBucket(e.target.value);
                setPage(1);
              }}
              className="rounded border border-warm-300 px-3 py-2 text-sm focus:outline-none focus:border-primary"
            >
              <option value="">All buckets</option>
              <option value="tour-images">tour-images</option>
              <option value="guide-images">guide-images</option>
              <option value="credential-images">credential-images</option>
            </select>
          </div>

          <button
            type="button"
            onClick={applySearch}
            className="rounded-md border border-warm-300 bg-white px-4 py-2 text-sm font-medium hover:bg-warm-50"
          >
            Apply
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowUpload((v) => !v)}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-95 self-end"
        >
          <Upload size={14} />
          Upload images
          {showUpload ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Upload zone */}
      {showUpload && (
        <div className="rounded-xl border border-warm-200 bg-warm-50 p-4">
          <UploadZone onUploaded={() => { setPage(1); load(1); }} />
        </div>
      )}

      {/* Stats */}
      {data && (
        <p className="text-sm text-warm-600">
          {data.total} image{data.total !== 1 ? 's' : ''}
          {data.totalBytes != null && ` · ${formatBytes(data.totalBytes)}`}
          {search && ` matching "${search}"`}
        </p>
      )}

      {/* Grid */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={28} className="animate-spin text-warm-400" />
        </div>
      )}
      {error && <p className="text-sm text-red-700">{error}</p>}

      {!loading && !error && images.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-warm-400">
          <ImageIcon size={36} className="mb-2 opacity-40" />
          <p className="text-sm">No images found</p>
        </div>
      )}

      {!loading && images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((row, idx) => (
            <div key={row.id} className={deleting.has(row.id) ? 'opacity-40 pointer-events-none' : ''}>
              <ImageCard
                row={row}
                onDelete={handleDelete}
                onRename={(id, path) => setRenaming({ id, path })}
                onOpen={() => setLightboxIdx(idx)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 rounded border border-warm-300 px-3 py-1.5 text-sm hover:bg-warm-50 disabled:opacity-40"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <span className="text-sm text-warm-700">
            Page {data.page} / {data.totalPages}
          </span>
          <button
            type="button"
            disabled={page >= data.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-1 rounded border border-warm-300 px-3 py-1.5 text-sm hover:bg-warm-50 disabled:opacity-40"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          idx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() =>
            setLightboxIdx((i) => (i !== null ? (i - 1 + images.length) % images.length : null))
          }
          onNext={() =>
            setLightboxIdx((i) => (i !== null ? (i + 1) % images.length : null))
          }
        />
      )}

      {/* Rename modal */}
      {renaming && (
        <RenameModal
          imageId={renaming.id}
          currentPath={renaming.path}
          onConfirm={handleRename}
          onClose={() => setRenaming(null)}
        />
      )}
    </div>
  );
}
