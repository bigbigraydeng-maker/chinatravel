'use client';

import ReactMarkdown from 'react-markdown';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { StagingContent, StagingStatus } from '@/lib/types/staging';
import {
  LINKEDIN_SOFT_MAX,
  WEIBO_SOFT_MAX,
  XHS_SOFT_MAX,
  charCountAscii,
  charCountWeibo,
  filterStagingItems,
  slugifyStagingTitle,
  sortStagingItems,
  stagingFromGenBlogJson,
  stagingNowIso,
} from '@/lib/blog-staging/staging-utils';

const STATUS_OPTIONS: (StagingStatus | 'all')[] = [
  'all',
  'draft',
  'pending-review',
  'approved',
  'published',
];

const CATEGORY_OPTIONS = ['all', 'travel-tips', 'experience', 'destination', 'culture'] as const;

const TYPE_OPTIONS = ['all', 'blog', 'social'] as const;

export interface StagingPanelProps {
  initialItems: StagingContent[];
}

export default function StagingPanel({ initialItems }: StagingPanelProps) {
  const [items, setItems] = useState<StagingContent[]>(() => [...initialItems]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<StagingStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<(typeof TYPE_OPTIONS)[number]>('all');
  const [filterCategory, setFilterCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>('all');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'createdAt' | 'updatedAt'>('updatedAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [socialTab, setSocialTab] = useState<'blog' | 'linkedin' | 'xiaohongshu' | 'weibo'>('blog');
  const slugManual = useRef<Record<string, boolean>>({});
  const [importJson, setImportJson] = useState('');
  const [publishNotice, setPublishNotice] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      sortStagingItems(
        filterStagingItems(items, {
          status: filterStatus,
          type: filterType,
          category: filterCategory,
          search,
        }),
        sortKey,
        sortDir
      ),
    [items, filterStatus, filterType, filterCategory, search, sortKey, sortDir]
  );

  const expanded = useMemo(
    () => items.find((i) => i.id === expandedId) ?? null,
    [items, expandedId]
  );

  const publishHistory = useMemo(
    () =>
      [...items]
        .filter((i) => i.status === 'published' && i.publishedAt)
        .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')),
    [items]
  );

  const patchItem = useCallback((id: string, patch: Partial<StagingContent>) => {
    setItems((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch, updatedAt: stagingNowIso() } : row))
    );
  }, []);

  const onTitleBlur = useCallback(
    (id: string, title: string, currentSlug: string) => {
      if (slugManual.current[id]) return;
      const next = slugifyStagingTitle(title);
      if (next && next !== currentSlug) {
        patchItem(id, { slug: next });
      }
    },
    [patchItem]
  );

  const updateSocial = useCallback(
    (id: string, key: 'linkedin' | 'xiaohongshu' | 'weibo', value: string) => {
      setItems((prev) =>
        prev.map((row) => {
          if (row.id !== id) return row;
          const social = { ...row.socialVersions };
          social[key] = value;
          return { ...row, socialVersions: social, updatedAt: stagingNowIso() };
        })
      );
    },
    []
  );

  const handleImportJson = useCallback(() => {
    const row = stagingFromGenBlogJson(importJson, 'Import');
    if (!row) return;
    setItems((prev) => [...prev, row]);
    setImportJson('');
    setExpandedId(row.id);
  }, [importJson]);

  const handleDelete = useCallback((id: string) => {
    if (!window.confirm('Remove this staging row?')) return;
    setItems((prev) => prev.filter((r) => r.id !== id));
    setExpandedId((cur) => (cur === id ? null : cur));
    delete slugManual.current[id];
  }, []);

  const handlePublish = useCallback(
    async (row: StagingContent) => {
      try {
        const res = await fetch('/api/blog-staging-publish', { method: 'POST' });
        const data = (await res.json()) as { success?: boolean; message?: string };
        setPublishNotice(data.message ?? 'Publish acknowledged');
      } catch {
        setPublishNotice('Network error calling publish API');
      }
      patchItem(row.id, {
        status: 'published',
        publishedAt: stagingNowIso(),
        approvedBy: 'CTS Editor',
      });
    },
    [patchItem]
  );

  return (
    <div className="min-h-screen bg-warm-50/80">
      <div className="border-b border-warm-200 bg-white px-4 py-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="font-serif text-2xl font-bold text-accent md:text-3xl">Blog staging panel</h1>
          <p className="mt-2 max-w-3xl text-gray-600">
            Internal content workspace — not indexed by search engines. Edit drafts, social copies, then
            merge to production via PR when API sync is ready.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl space-y-8 px-4 py-8">
        {publishNotice && (
          <div
            className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            role="status"
          >
            {publishNotice}
            <button
              type="button"
              className="ml-3 font-semibold underline"
              onClick={() => setPublishNotice(null)}
            >
              Dismiss
            </button>
          </div>
        )}

        <section className="rounded-xl border border-warm-200 bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-accent">Import /gen-blog JSON</h2>
          <p className="mt-1 text-sm text-gray-600">
            Paste a single JSON object with a <code className="rounded bg-warm-100 px-1">blog</code> field.
          </p>
          <textarea
            className="mt-3 w-full rounded-lg border border-gray-300 p-3 font-mono text-sm"
            rows={4}
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            placeholder='{"blog":{"title":"...","slug":"...","content":"# ...","metadata":{...}}}'
            aria-label="Import JSON"
          />
          <button
            type="button"
            className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-95"
            onClick={handleImportJson}
          >
            Parse & add row
          </button>
        </section>

        <section className="rounded-xl border border-warm-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-4">
            <label className="flex flex-col text-sm">
              <span className="font-medium text-gray-700">Status</span>
              <select
                className="mt-1 rounded border border-gray-300 px-2 py-1"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as StagingStatus | 'all')}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col text-sm">
              <span className="font-medium text-gray-700">Type</span>
              <select
                className="mt-1 rounded border border-gray-300 px-2 py-1"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as (typeof TYPE_OPTIONS)[number])}
              >
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col text-sm">
              <span className="font-medium text-gray-700">Category</span>
              <select
                className="mt-1 rounded border border-gray-300 px-2 py-1"
                value={filterCategory}
                onChange={(e) =>
                  setFilterCategory(e.target.value as (typeof CATEGORY_OPTIONS)[number])
                }
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col text-sm">
              <span className="font-medium text-gray-700">Sort by</span>
              <select
                className="mt-1 rounded border border-gray-300 px-2 py-1"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as 'createdAt' | 'updatedAt')}
              >
                <option value="createdAt">Created</option>
                <option value="updatedAt">Updated</option>
              </select>
            </label>
            <label className="flex flex-col text-sm">
              <span className="font-medium text-gray-700">Order</span>
              <select
                className="mt-1 rounded border border-gray-300 px-2 py-1"
                value={sortDir}
                onChange={(e) => setSortDir(e.target.value as 'asc' | 'desc')}
              >
                <option value="desc">Newest first</option>
                <option value="asc">Oldest first</option>
              </select>
            </label>
            <label className="flex min-w-[200px] flex-1 flex-col text-sm">
              <span className="font-medium text-gray-700">Search title / slug</span>
              <input
                className="mt-1 rounded border border-gray-300 px-2 py-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search by title or slug"
              />
            </label>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-warm-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-warm-100/80 text-accent">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No rows match filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr
                      key={row.id}
                      className={`border-t border-warm-100 ${expandedId === row.id ? 'bg-primary/5' : ''}`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">{row.title}</td>
                      <td className="px-4 py-3">{row.type}</td>
                      <td className="px-4 py-3">{row.metadata.category}</td>
                      <td className="px-4 py-3 capitalize">{row.status.replace('-', ' ')}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(row.createdAt).toLocaleString('en-NZ')}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="font-semibold text-primary hover:underline"
                          onClick={() => setExpandedId((id) => (id === row.id ? null : row.id))}
                        >
                          {expandedId === row.id ? 'Close' : 'Edit'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {expanded && (
          <section
            className="rounded-xl border-2 border-primary/30 bg-white p-4 shadow-lg md:p-6"
            aria-label="Editor"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-xl font-bold text-accent">Editor & preview</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium hover:bg-warm-50"
                  onClick={() => patchItem(expanded.id, {})}
                >
                  Save draft
                </button>
                <button
                  type="button"
                  className="rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-semibold text-secondary hover:bg-secondary/30"
                  onClick={() => patchItem(expanded.id, { status: 'pending-review' })}
                >
                  Submit review
                </button>
                <button
                  type="button"
                  className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-900"
                  onClick={() => patchItem(expanded.id, { status: 'approved', approvedBy: 'CTS Editor' })}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="rounded-full bg-gradient-to-r from-primary to-red-500 px-4 py-1.5 text-sm font-semibold text-white"
                  onClick={() => handlePublish(expanded)}
                >
                  Publish (API placeholder)
                </button>
                <button
                  type="button"
                  className="rounded-full border border-red-200 px-4 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(expanded.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mb-4 flex gap-2 border-b border-warm-200 pb-2">
              {(['blog', 'linkedin', 'xiaohongshu', 'weibo'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`rounded-t-lg px-3 py-2 text-sm font-medium ${
                    socialTab === tab
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-warm-100'
                  }`}
                  onClick={() => setSocialTab(tab)}
                >
                  {tab === 'blog' ? 'Blog' : tab === 'xiaohongshu' ? '小红书' : tab}
                </button>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                {socialTab === 'blog' ? (
                  <>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                      <input
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                        value={expanded.title}
                        onChange={(e) => patchItem(expanded.id, { title: e.target.value })}
                        onBlur={() => onTitleBlur(expanded.id, expanded.title, expanded.slug)}
                      />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                      Slug
                      <input
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm"
                        value={expanded.slug}
                        onChange={(e) => {
                          slugManual.current[expanded.id] = true;
                          patchItem(expanded.id, { slug: e.target.value });
                        }}
                      />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                      Markdown body
                      <textarea
                        className="mt-1 min-h-[280px] w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm"
                        value={expanded.content}
                        onChange={(e) => patchItem(expanded.id, { content: e.target.value })}
                      />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                      Meta description
                      <textarea
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        rows={3}
                        value={expanded.metadata.description}
                        onChange={(e) =>
                          patchItem(expanded.id, {
                            metadata: { ...expanded.metadata, description: e.target.value },
                          })
                        }
                      />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                      Keywords (comma-separated)
                      <input
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                        value={expanded.metadata.keywords.join(', ')}
                        onChange={(e) =>
                          patchItem(expanded.id, {
                            metadata: {
                              ...expanded.metadata,
                              keywords: e.target.value
                                .split(',')
                                .map((k) => k.trim())
                                .filter(Boolean),
                            },
                          })
                        }
                      />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                      <select
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                        value={expanded.metadata.category}
                        onChange={(e) =>
                          patchItem(expanded.id, {
                            metadata: {
                              ...expanded.metadata,
                              category: e.target.value as StagingContent['metadata']['category'],
                            },
                          })
                        }
                      >
                        {(['travel-tips', 'experience', 'destination', 'culture'] as const).map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>
                  </>
                ) : (
                  <label className="block text-sm font-medium text-gray-700">
                    {socialTab} copy
                    <textarea
                      className="mt-1 min-h-[320px] w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      value={
                        expanded.socialVersions?.[socialTab === 'linkedin' ? 'linkedin' : socialTab] ?? ''
                      }
                      onChange={(e) => {
                        if (socialTab === 'linkedin') updateSocial(expanded.id, 'linkedin', e.target.value);
                        if (socialTab === 'xiaohongshu')
                          updateSocial(expanded.id, 'xiaohongshu', e.target.value);
                        if (socialTab === 'weibo') updateSocial(expanded.id, 'weibo', e.target.value);
                      }}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Chars:{' '}
                      {socialTab === 'linkedin' &&
                        `${charCountAscii(expanded.socialVersions?.linkedin ?? '')} (soft max ${LINKEDIN_SOFT_MAX})`}
                      {socialTab === 'xiaohongshu' &&
                        `${charCountWeibo(expanded.socialVersions?.xiaohongshu ?? '')} (guide ≤ ${XHS_SOFT_MAX})`}
                      {socialTab === 'weibo' &&
                        `${charCountWeibo(expanded.socialVersions?.weibo ?? '')} (guide ≤ ${WEIBO_SOFT_MAX})`}
                    </p>
                  </label>
                )}
              </div>

              <div>
                <div className="mb-3 flex gap-2">
                  <button
                    type="button"
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      previewViewport === 'desktop' ? 'bg-accent text-white' : 'bg-warm-100 text-gray-700'
                    }`}
                    onClick={() => setPreviewViewport('desktop')}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      previewViewport === 'mobile' ? 'bg-accent text-white' : 'bg-warm-100 text-gray-700'
                    }`}
                    onClick={() => setPreviewViewport('mobile')}
                  >
                    Mobile
                  </button>
                </div>
                {socialTab === 'blog' ? (
                  <div
                    data-testid="preview-wrap"
                    className={`rounded-xl border border-warm-200 bg-warm-50/50 p-4 ${
                      previewViewport === 'mobile' ? 'mx-auto max-w-sm' : ''
                    }`}
                  >
                    <article className="max-w-none text-gray-800 [&_a]:text-primary [&_h1]:font-serif [&_h2]:mt-6 [&_h2]:font-serif [&_h2]:text-xl [&_p]:mt-3 [&_strong]:font-semibold">
                      <h1 className="font-serif text-2xl font-bold text-accent">{expanded.title}</h1>
                      <ReactMarkdown>{expanded.content}</ReactMarkdown>
                    </article>
                    <div className="mt-6 rounded-lg bg-white p-3 text-xs text-gray-600">
                      <p className="font-semibold text-accent">Meta preview</p>
                      <p className="mt-1 font-medium">{expanded.title} | CTS Tours</p>
                      <p className="mt-1 line-clamp-3">{expanded.metadata.description}</p>
                      <p className="mt-1 text-gray-500">
                        {expanded.metadata.keywords.slice(0, 8).join(', ')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-warm-200 bg-warm-50/50 p-4 text-sm whitespace-pre-wrap">
                    {expanded.socialVersions?.[
                      socialTab === 'linkedin' ? 'linkedin' : socialTab
                    ] ?? '—'}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="rounded-xl border border-warm-200 bg-white p-4 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-accent">Publish history</h2>
          <ul className="mt-3 divide-y divide-warm-100 text-sm">
            {publishHistory.length === 0 ? (
              <li className="py-4 text-gray-500">No published rows yet.</li>
            ) : (
              publishHistory.map((row) => (
                <li key={row.id} className="flex flex-wrap justify-between gap-2 py-3">
                  <span className="font-medium text-gray-900">{row.title}</span>
                  <span className="text-gray-600">
                    {row.publishedAt ? new Date(row.publishedAt).toLocaleString('en-NZ') : '—'}
                  </span>
                  <span className="w-full text-xs text-gray-500">
                    /blog/{row.slug} · {row.approvedBy ?? '—'}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
