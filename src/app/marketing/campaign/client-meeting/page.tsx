import type { Metadata } from 'next';
import Link from 'next/link';
import { MeetingBoardMarkdown } from '@/components/marketing/MeetingBoardMarkdown';
import type { ChecklistItem } from '@/lib/client-meeting-board/parseMeetingBoardMd';
import { loadMeetingBoard } from '@/lib/client-meeting-board/loadMeetingBoard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Client meeting board | CTS Tours',
  description:
    'Meeting notes, action items, and dev tasks synced from docs/client-meeting-board.md — same access as campaign dashboard.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

function ChecklistCard({
  title,
  items,
  embedded,
}: {
  title: string;
  items: ChecklistItem[];
  /** 嵌在外层 section 内时不重复卡片边框 */
  embedded?: boolean;
}) {
  const open = items.filter(i => !i.done).length;
  const shell = embedded
    ? 'rounded-xl border border-warm-100 bg-warm-50/40 p-4'
    : 'rounded-2xl border border-warm-200 bg-white p-5 shadow-soft';
  return (
    <section className={shell}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        {title ? <h2 className="font-serif text-lg font-semibold text-accent">{title}</h2> : null}
        <span className={`text-xs text-gray-500 ${title ? '' : 'ml-auto'}`}>
          {items.length === 0 ? '无条目' : `未完成 ${open} / 共 ${items.length}`}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="mt-3 text-sm italic text-gray-500">在文档对应章节下使用 `- [ ]` 添加条目。</p>
      ) : (
        <ul className="mt-4 space-y-2" role="list">
          {items.map((item, idx) => (
            <li
              key={`${title || 'list'}-${idx}-${item.text.slice(0, 40)}`}
              className="flex gap-3 rounded-lg border border-warm-100 bg-warm-50/50 px-3 py-2 text-sm text-gray-800"
            >
              <span
                className="mt-0.5 shrink-0 font-mono text-xs text-gray-500"
                aria-hidden
                title={item.done ? '已完成' : '未完成'}
              >
                {item.done ? '☑' : '☐'}
              </span>
              <span className={item.done ? 'text-gray-500 line-through' : ''}>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default async function ClientMeetingBoardPage() {
  let board;
  let loadError: string | null = null;
  try {
    board = await loadMeetingBoard();
  } catch {
    loadError = '无法读取 docs/client-meeting-board.md，请确认文件已提交到仓库。';
    board = {
      followUpItems: [],
      followUpLogMd: '',
      meetingNotesMd: '',
      todos: [],
      devItems: [],
      extraSections: [],
    };
  }

  return (
    <main className="min-h-screen bg-warm-50 text-accent">
      <div className="border-b border-warm-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">CTS Tours · 甲方会议看板</p>
            <h1 className="font-serif text-2xl font-semibold text-accent sm:text-3xl">会议记录 · 待办 · 跟进</h1>
            <p className="mt-1 text-sm text-gray-600">
              数据源：<code className="rounded bg-warm-100 px-1.5 py-0.5 text-xs">docs/client-meeting-board.md</code>
              {board.lastUpdated ? (
                <>
                  {' '}
                  · 版本日期 <span className="font-medium">{board.lastUpdated}</span>
                </>
              ) : null}
            </p>
            {board.nextMeeting ? (
              <p className="mt-2 inline-flex flex-wrap items-center gap-2 rounded-lg border border-secondary/40 bg-secondary/10 px-3 py-1.5 text-sm font-medium text-accent">
                <span className="text-primary">下次会议</span>
                <span>{board.nextMeeting}</span>
              </p>
            ) : null}
            {board.subtitle ? <p className="mt-2 text-sm text-gray-700">{board.subtitle}</p> : null}
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link
              href="/marketing/campaign"
              className="rounded-lg border border-warm-200 bg-white px-3 py-2 font-medium text-accent hover:border-primary/30 hover:text-primary"
            >
              战役统筹看板
            </Link>
            <Link href="/marketing" className="rounded-lg border border-warm-200 bg-white px-3 py-2 hover:border-primary/30">
              营销入口
            </Link>
            <Link href="/" className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 font-medium text-primary">
              网站首页
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-10">
        {loadError ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
            {loadError}
          </p>
        ) : null}
        {board.usageMd ? (
          <section className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5">
            <h2 className="font-serif text-base font-semibold text-amber-950">如何使用</h2>
            <div className="mt-3 text-amber-950/90">
              <MeetingBoardMarkdown markdown={board.usageMd} />
            </div>
          </section>
        ) : null}

        <section className="rounded-2xl border-2 border-secondary/50 bg-white p-5 shadow-soft ring-1 ring-secondary/20">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-serif text-lg font-semibold text-accent">会前 Follow-up</h2>
            <span className="text-xs font-medium text-primary">下次开会前先过一遍</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            把「待办 / 开发」里要在会上汇报的项抄成核对清单；会中勾掉、会后把结论写进「定期跟进」或「会议纪要」。
          </p>
          <div className="mt-4">
            <ChecklistCard title="" items={board.followUpItems} embedded />
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <ChecklistCard title="待办（甲方 / 双方）" items={board.todos} />
          <ChecklistCard title="开发事项" items={board.devItems} />
        </div>

        {board.followUpLogMd.trim() ? (
          <section className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
            <h2 className="font-serif text-xl font-semibold text-accent">定期跟进</h2>
            <p className="mt-1 text-sm text-gray-600">周间更新：电话/邮件确认进度后在此记一行，便于下次会前扫一眼。</p>
            <div className="mt-4">
              <MeetingBoardMarkdown markdown={board.followUpLogMd} />
            </div>
          </section>
        ) : null}

        <section className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-xl font-semibold text-accent">会议纪要</h2>
          <div className="mt-4">
            <MeetingBoardMarkdown
              markdown={board.meetingNotesMd}
              emptyHint="在文档「会议纪要」或「会议记录」章节填写正文；支持 Markdown 标题与列表。"
            />
          </div>
        </section>

        {board.extraSections.length > 0 ? (
          <div className="space-y-8">
            {board.extraSections.map((s, idx) => (
              <section key={`${idx}-${s.title}`} className="rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
                <h2 className="font-serif text-xl font-semibold text-accent">{s.title}</h2>
                <div className="mt-4">
                  <MeetingBoardMarkdown markdown={s.bodyMd} />
                </div>
              </section>
            ))}
          </div>
        ) : null}

        <footer className="border-t border-warm-200 pb-8 pt-6 text-center text-xs text-gray-500">
          工作流：开会记「会议纪要」→ 拆成「待办 / 开发」→ 周间写「定期跟进」→ 会前填「会前 Follow-up」并更新 YAML 里的{' '}
          <code className="rounded bg-warm-100 px-1">nextMeeting</code>。可让 AI 按章节整理后再粘贴提交部署。
        </footer>
      </div>
    </main>
  );
}
