import { parseMeetingBoardMd } from '../parseMeetingBoardMd';

describe('parseMeetingBoardMd', () => {
  it('parses front matter and checklists', () => {
    const raw = `---
lastUpdated: "2026-04-01"
subtitle: "Test"
---

## 会议纪要
Hello **world**.

## 待办
- [ ] A
- [x] B

## 开发事项
- [X] Done dev
`;
    const r = parseMeetingBoardMd(raw);
    expect(r.lastUpdated).toBe('2026-04-01');
    expect(r.subtitle).toBe('Test');
    expect(r.meetingNotesMd).toContain('Hello');
    expect(r.todos).toEqual([
      { text: 'A', done: false },
      { text: 'B', done: true },
    ]);
    expect(r.devItems).toEqual([{ text: 'Done dev', done: true }]);
    expect(r.followUpItems).toEqual([]);
    expect(r.followUpLogMd).toBe('');
  });

  it('parses nextMeeting and follow-up sections', () => {
    const raw = `---
nextMeeting: "2026-04-21 10:00 NZ"
---

## 会前 Follow-up
- [ ] 核对 Resend 是否已配置
- [x] 周会时间已确认

## 定期跟进
- **W1** 已邮件催甲方主图列表，未回复。

## 待办
- [ ] Z
`;
    const r = parseMeetingBoardMd(raw);
    expect(r.nextMeeting).toBe('2026-04-21 10:00 NZ');
    expect(r.followUpItems).toEqual([
      { text: '核对 Resend 是否已配置', done: false },
      { text: '周会时间已确认', done: true },
    ]);
    expect(r.followUpLogMd).toContain('W1');
    expect(r.todos).toEqual([{ text: 'Z', done: false }]);
  });

  it('extracts 如何使用 as usageMd', () => {
    const raw = `## 如何使用
Step one.

## 待办
- [ ] x
`;
    const r = parseMeetingBoardMd(raw);
    expect(r.usageMd).toContain('Step one');
    expect(r.todos).toHaveLength(1);
    expect(r.extraSections).toHaveLength(0);
  });
});
