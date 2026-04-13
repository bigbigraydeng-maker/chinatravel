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
