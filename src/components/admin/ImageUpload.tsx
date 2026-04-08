'use client';

import { useCallback, useState } from 'react';

type Props = {
  onUploaded?: (url: string) => void;
};

export default function ImageUpload({ onUploaded }: Props) {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState('tour');
  const [pathPrefix, setPathPrefix] = useState('');
  const [alt, setAlt] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const onFile = useCallback((f: File | null) => {
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  }, [preview]);

  const submit = async () => {
    if (!file) {
      setMessage('Choose a file first.');
      return;
    }
    setProgress('uploading');
    setMessage('');
    const form = new FormData();
    form.append('file', file);
    form.append('category', category);
    if (pathPrefix.trim()) form.append('path', pathPrefix.trim());
    if (alt.trim()) form.append('alt', alt.trim());
    if (tags.trim()) form.append('tags', tags.trim());
    if (description.trim()) form.append('description', description.trim());

    try {
      const res = await fetch('/api/admin/images', {
        method: 'POST',
        body: form,
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setProgress('error');
        setMessage(data.error || 'Upload failed');
        return;
      }
      setProgress('done');
      setMessage(`Uploaded: ${data.url}`);
      onUploaded?.(data.url as string);
      onFile(null);
      setAlt('');
      setTags('');
      setDescription('');
    } catch {
      setProgress('error');
      setMessage('Network error');
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`rounded-xl border-2 border-dashed p-8 text-center transition ${
          drag ? 'border-primary bg-primary/5' : 'border-warm-300 bg-warm-50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f);
        }}
      >
        <p className="text-warm-800 mb-4">Drag an image here, or choose a file.</p>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="mx-auto block text-sm"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {preview && file && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="max-h-64 rounded-lg border border-warm-200 object-contain" />
          <div className="space-y-3 text-sm">
            <div>
              <label className="block font-medium text-warm-900">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded border border-warm-300 px-3 py-2"
              >
                <option value="tour">Tour images</option>
                <option value="guide">Guide images</option>
                <option value="credential">Credential images</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-warm-900">Optional subfolder (under bucket)</label>
              <input
                value={pathPrefix}
                onChange={(e) => setPathPrefix(e.target.value)}
                placeholder="e.g. uploads/my-batch"
                className="mt-1 w-full rounded border border-warm-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium text-warm-900">Alt text</label>
              <input
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                className="mt-1 w-full rounded border border-warm-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium text-warm-900">Tags (comma-separated)</label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-1 w-full rounded border border-warm-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium text-warm-900">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded border border-warm-300 px-3 py-2"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={submit}
          disabled={!file || progress === 'uploading'}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95 disabled:opacity-50"
        >
          {progress === 'uploading' ? 'Uploading…' : 'Upload to Supabase'}
        </button>
        {progress === 'done' && <span className="text-sm text-secondary">Done</span>}
        {progress === 'error' && <span className="text-sm text-red-700">Failed</span>}
      </div>
      {message && <p className="text-sm text-warm-800">{message}</p>}
    </div>
  );
}
