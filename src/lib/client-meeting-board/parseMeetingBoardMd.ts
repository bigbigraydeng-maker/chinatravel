/**
 * Parses docs/client-meeting-board.md — front matter + ## sections.
 * Checklist lines: - [ ] / - [x] / - [X]
 */

export interface ChecklistItem {
  text: string;
  done: boolean;
}

export interface MeetingBoardParsed {
  lastUpdated?: string;
  subtitle?: string;
  /** 下次会议日期或说明（YAML `nextMeeting`，会前投屏用） */
  nextMeeting?: string;
  /** 「如何使用」等说明（展示在页顶） */
  usageMd?: string;
  /** 下次会前要逐条核对的清单（`- [ ]`） */
  followUpItems: ChecklistItem[];
  /** 周间/会间跟进 prose（Markdown） */
  followUpLogMd: string;
  /** Freeform markdown (会议记录、备注等) */
  meetingNotesMd: string;
  todos: ChecklistItem[];
  devItems: ChecklistItem[];
  /** 其余 ## 节（如 AI 整理提示） */
  extraSections: { title: string; bodyMd: string }[];
}

const FM_LAST = /^lastUpdated:\s*(.+)\s*$/im;
const FM_SUB = /^subtitle:\s*(.+)\s*$/im;
const FM_NEXT = /^nextMeeting:\s*(.+)\s*$/im;

function stripCheckbox(line: string): { done: boolean; text: string } | null {
  const m = /^\s*-\s*\[([ xX])\]\s*(.+)\s*$/.exec(line);
  if (!m) return null;
  const done = m[1].toLowerCase() === 'x';
  return { done, text: m[2].trim() };
}

function isMeetingSection(title: string): boolean {
  const t = title.trim();
  return /纪要|会议记录|同步记录|会议备忘/.test(t);
}

function isTodoSection(title: string): boolean {
  return /^待办/.test(title.trim()) || /待办事项/.test(title.trim());
}

function isDevSection(title: string): boolean {
  const t = title.trim();
  return /^开发/.test(t) || /技术项|开发任务/.test(t);
}

/** 下次会前 Follow-up 核对清单 */
function isFollowUpChecklistSection(title: string): boolean {
  const t = title.trim();
  return /follow[\s-]?up/i.test(t) || /会前跟进|下次会前|会前核对/.test(t);
}

/** 定期跟进 / 周间记录（Markdown 正文） */
function isFollowUpLogSection(title: string): boolean {
  const t = title.trim();
  return /^定期跟进/.test(t) || /跟进记录|周间同步|跟进日志/.test(t);
}

function parseChecklist(body: string): ChecklistItem[] {
  const out: ChecklistItem[] = [];
  for (const line of body.split('\n')) {
    const row = stripCheckbox(line);
    if (row) out.push({ text: row.text, done: row.done });
  }
  return out;
}

/**
 * @param raw — full file contents including optional YAML front matter
 */
export function parseMeetingBoardMd(raw: string): MeetingBoardParsed {
  let body = raw;
  let lastUpdated: string | undefined;
  let subtitle: string | undefined;
  let nextMeeting: string | undefined;

  const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (fm) {
    const fmBlock = fm[1];
    body = fm[2];
    const lu = FM_LAST.exec(fmBlock);
    const su = FM_SUB.exec(fmBlock);
    const nx = FM_NEXT.exec(fmBlock);
    if (lu) lastUpdated = lu[1].trim().replace(/^["']|["']$/g, '');
    if (su) subtitle = su[1].trim().replace(/^["']|["']$/g, '');
    if (nx) nextMeeting = nx[1].trim().replace(/^["']|["']$/g, '');
  }

  const sections: { title: string; body: string }[] = [];
  const lines = body.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const hm = /^\s*##\s+(.+)\s*$/.exec(line);
    if (!hm) {
      i += 1;
      continue;
    }
    const title = hm[1].trim();
    i += 1;
    const buf: string[] = [];
    while (i < lines.length && !/^\s*##\s+/.test(lines[i])) {
      buf.push(lines[i]);
      i += 1;
    }
    sections.push({ title, body: buf.join('\n').trimEnd() });
  }

  let meetingNotesMd = '';
  let followUpLogMd = '';
  let usageMd: string | undefined;
  const followUpItems: ChecklistItem[] = [];
  const todos: ChecklistItem[] = [];
  const devItems: ChecklistItem[] = [];
  const extraSections: { title: string; bodyMd: string }[] = [];

  for (const s of sections) {
    if (isMeetingSection(s.title)) {
      meetingNotesMd = meetingNotesMd ? `${meetingNotesMd}\n\n## ${s.title}\n\n${s.body}` : s.body;
      continue;
    }
    if (isFollowUpChecklistSection(s.title)) {
      followUpItems.push(...parseChecklist(s.body));
      continue;
    }
    if (isFollowUpLogSection(s.title)) {
      followUpLogMd = followUpLogMd ? `${followUpLogMd}\n\n## ${s.title}\n\n${s.body}` : s.body;
      continue;
    }
    if (isTodoSection(s.title)) {
      todos.push(...parseChecklist(s.body));
      continue;
    }
    if (isDevSection(s.title)) {
      devItems.push(...parseChecklist(s.body));
      continue;
    }
    if (/^如何使用/.test(s.title.trim())) {
      usageMd = usageMd ? `${usageMd}\n\n## ${s.title}\n\n${s.body}` : s.body;
      continue;
    }
    extraSections.push({ title: s.title, bodyMd: s.body });
  }

  return {
    lastUpdated,
    subtitle,
    nextMeeting,
    usageMd,
    followUpItems,
    followUpLogMd,
    meetingNotesMd,
    todos,
    devItems,
    extraSections,
  };
}
