'use client';

import { useCallback, useLayoutEffect, useState, type ReactNode } from 'react';

type Props = {
  id: string;
  title: string;
  description?: string;
  badge?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
  /** 外层大卡片 vs 任务表内嵌模块 */
  variant?: 'section' | 'nested';
};

export default function CampaignCollapsibleSection({
  id,
  title,
  description,
  badge,
  defaultOpen = false,
  children,
  className = '',
  variant = 'section',
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const syncHash = useCallback(() => {
    if (typeof window === 'undefined') return;
    const h = window.location.hash.slice(1);
    if (!h) return;
    if (h === id || h.startsWith(`${id}-`)) {
      setOpen(true);
    }
  }, [id]);

  useLayoutEffect(() => {
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [syncHash]);

  const nested = variant === 'nested';
  const btnClass = nested
    ? 'flex w-full items-start justify-between gap-2 border-b border-warm-100 bg-warm-50/50 px-4 py-3 text-left hover:bg-warm-50'
    : 'flex w-full items-start justify-between gap-3 border-b border-warm-100 bg-gradient-to-r from-warm-50/80 to-white px-5 py-4 text-left transition hover:bg-warm-50';

  const titleClass = nested
    ? 'font-serif text-lg font-semibold text-accent'
    : 'font-serif text-xl font-semibold text-accent sm:text-2xl';

  const contentPad = nested ? 'p-4 pt-3' : 'p-6 pt-4';
  const radius = nested ? 'rounded-xl' : 'rounded-2xl';

  return (
    <section id={id} className={`scroll-mt-28 ${radius} border border-warm-200 bg-white shadow-soft overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={btnClass}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {nested ? <h3 className={titleClass}>{title}</h3> : <h2 className={titleClass}>{title}</h2>}
            {badge ? (
              <span className="rounded-full border border-warm-200 bg-white px-2 py-0.5 text-xs font-medium text-gray-600">
                {badge}
              </span>
            ) : null}
          </div>
          {description ? <p className="mt-1 text-sm text-gray-500">{description}</p> : null}
        </div>
        <span
          className={`mt-0.5 shrink-0 text-gray-400 transition-transform duration-200 print:hidden ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          ▼
        </span>
      </button>
      <div id={`${id}-panel`} className={open ? contentPad : `hidden print:block ${contentPad}`}>
        {children}
      </div>
    </section>
  );
}
