# Stash 保留说明

> 子牙 2026-06-09 关窗口前留给 PM 的备忘。

## stash@{1} — PM 自己的改动（保留不动）

**含 3 个文件**：

| 文件 | 类型 | 大小变化 |
|---|---|---|
| `docs/google-ads-appeal-2026-06-08.md` | 新建 (untracked) | +255 行 |
| `tours/2027 - Silk_Road Version2(4).docx` | 新建 (untracked) | +52,577 bytes |
| `tours/Silk Road famil April 2026.docx` | 修改 (tracked) | 16,591 → 52,577 bytes |

**创建时间**：2026-06-09T01:27:54+12:00 NZST

**保留原因**：PM 决定保留，可能后续审阅。

**捡回命令**：
```bash
cd "C:/Users/Zhong/Documents/Claude Big Ray/ChinaTravel"
git stash pop stash@{1}
```

⚠️ pop 前先 `git status` 确认工作区干净。pop 后改动回到当前 branch (`feat/ga4-dashboard-integration`)，再决定 commit / push / 丢弃。

---

## stash@{0} — 子牙临时 stash（可以丢）

子牙今晚 commit 时 stash 的老 `docs/me-landing-page-sprint-2026-06-08/` md 文件 — **PR #31 已 merge 新版本，这版本不需要**。

**丢弃命令**：
```bash
git stash drop stash@{0}
```

或者保留也无害，不会污染分支。

---

## 子牙这次 PR 留下的 stash 操作记录

1. **stash@{1}**（PM 改动）：`git stash push -u -m "PM uncommitted (docx + appeal)" -- "tours/Silk Road famil April 2026.docx" "tours/2027 - Silk_Road Version2(4).docx" "docs/google-ads-appeal-2026-06-08.md"`
2. **stash@{0}**（子牙临时）：`git stash push -u -m "ziya temp - keep landing docs untracked" -- "docs/me-landing-page-sprint-2026-06-08/"`

两个 stash 都是 untracked-included（`-u`），所以 untracked 新文件也在 stash 里。
