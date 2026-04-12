'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { MarketingTask } from '@/lib/data/marketing-plan-2026';
import { statusBadgeClass, taskStatusLabel } from '@/lib/data/marketing-plan-2026';

const PREVIEW_COUNT = 6;

type Props = {
  tasks: MarketingTask[];
  weekRangeLabel: string;
  anchorIso: string;
};

export default function TodayW1Panel({ tasks, weekRangeLabel, anchorIso }: Props) {
  const [panelOpen, setPanelOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const visibleTasks = showAll ? tasks : tasks.slice(0, PREVIEW_COUNT);
  const hiddenCount = Math.max(0, tasks.length - PREVIEW_COUNT);

  return (
    <section id="today" className="scroll-mt-28 rounded-2xl border border-primary/30 bg-gradient-to-br from-amber-50 to-white p-6 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-primary/20 pb-3">
        <h2 className="font-serif text-2xl font-semibold text-accent">今日工作（W1 起始任务）</h2>
        <button
          type="button"
          onClick={() => setPanelOpen(v => !v)}
          className="shrink-0 rounded-full border border-warm-300 bg-white px-4 py-1.5 text-sm font-medium text-accent shadow-sm hover:bg-warm-50"
          aria-expanded={panelOpen}
        >
          {panelOpen ? '收起' : `展开（共 ${tasks.length} 条）`}
        </button>
      </div>

      {panelOpen ? (
        <>
          <p className="mt-3 text-sm text-gray-700">
            锚点周一 <span className="font-mono font-medium">{anchorIso}</span>（W1）；下列为 <strong>startWeek = W1</strong> 的全部任务，已按{' '}
            <strong>P0 → P1 → P2</strong> 与 ID 排序。默认展示前 {PREVIEW_COUNT} 条，其余可展开。
          </p>
          <p className="mt-1 text-xs text-gray-500">周区间：{weekRangeLabel}</p>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-gray-800">
            {visibleTasks.map(t => (
              <li key={t.id} className="marker:font-semibold marker:text-primary">
                <span className="font-mono text-xs text-gray-500">{t.id}</span>
                {' · '}
                <span className="font-medium">{t.name}</span>
                <span className="ml-2 inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold text-gray-700">
                  {t.priority}
                </span>
                <span
                  className={`ml-2 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusBadgeClass(t.status)}`}
                >
                  {taskStatusLabel(t.status)}
                </span>
                <span className="mt-1 block pl-0 text-xs text-gray-600">
                  <span className="text-gray-500">交付：</span>
                  {t.deliverable}
                  {t.notes ? (
                    <>
                      {' '}
                      <span className="text-gray-500">备注：</span>
                      {t.notes}
                    </>
                  ) : null}
                </span>
                {t.reviewLinks?.length ? (
                  <span className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 pl-0 text-xs">
                    {t.reviewLinks.map(link => (
                      <Link
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        className="font-medium text-primary underline-offset-2 hover:underline"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          {hiddenCount > 0 && !showAll ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="mt-4 text-sm font-semibold text-primary underline-offset-2 hover:underline"
            >
              显示其余 {hiddenCount} 条任务
            </button>
          ) : null}
          {hiddenCount > 0 && showAll ? (
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="mt-4 text-sm font-medium text-gray-600 underline-offset-2 hover:underline"
            >
              仅显示前 {PREVIEW_COUNT} 条
            </button>
          ) : null}
        </>
      ) : (
        <p className="mt-3 text-sm text-gray-600">
          共 <strong>{tasks.length}</strong> 条 W1 起始任务；点击右上角「展开」查看（展开后默认先列出前 {Math.min(PREVIEW_COUNT, tasks.length)} 条）。
        </p>
      )}
    </section>
  );
}
