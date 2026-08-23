# 🔄 会话切换清单 — 上下文恢复协议

**项目：** CTS Tours 用户行为优化  
**用途：** Master Session 与 Phase Session 之间的无缝切换  
**最后更新：** 2026-04-28

---

## 何时使用此清单？

**场景 1：** Master Session 启动新 Phase Session
```
Master Session（周一）→ 【启动 Phase 1 Session】→ Phase 1 Session（周二）
↓
使用此清单准备交接信息
```

**场景 2：** Phase Session 完成，切换回 Master Session
```
Phase 1 Session（周四）→ 【切回 Master Session】→ Master Session（周五汇总）
↓
使用此清单恢复上下文
```

**场景 3：** 对话过长，启动新 Session 继续同一任务
```
Session A（token 接近上限）→ 【启动 Session B 继续】→ Session B（新窗口）
↓
使用此清单保证连续性
```

---

## 🔴 启动新 Session 前 — Master 检查清单

**时间：** 启动新 Phase Session 前 5 分钟

### Step 1：更新 PROGRESS.md（如有进展）
```markdown
- [ ] 更新当前完成度百分比
- [ ] 更新 Phase 状态（⏳ 进行中 → ✅ 完成）
- [ ] 更新关键指标进度
- [ ] 记录任何新发现的风险或机会
```

**命令：** "更新 PROGRESS.md 当前进度"

---

### Step 2：生成交接文档
在新 Session 启动消息中粘贴以下内容：

```markdown
【新 Session 启动 — Phase 1】

【恢复上下文】
[粘贴最新 PROGRESS.md 完整内容]

【当前任务】
- 任务：[例如 Task 1.1 — 修复 404 错误]
- 状态：🔴 等待启动 / ⏳ 进行中 / ✅ 完成
- 预计时间：[X 天]

【上周完成】
[列举上周完成的任务]

【本周目标】
[列举本周要完成的 1-3 个关键任务]

【技术背景】
- 代码库位置：https://github.com/bigbigraydeng-maker/chinatravel.git
- 现有文件：[列举相关文件]
- 关键库函数：getTourBySlug(), getGuideDynamicData()
- 已知限制：[任何已知的技术债或限制]

【与 Master Session 的连接】
- 本 Session 处理：Phase 1（任务 1.1 - 1.4）
- 预计完成：2026-05-12
- 完成后返回 Master 进行：周报告 + Phase 2 规划
```

---

## 🟢 启动新 Session 时 — Phase 检查清单

**时间：** Phase Session 首条消息

### Step 1：粘贴上下文（必须）
```
在第一条消息中粘贴：
1. 最新 PROGRESS.md
2. 相关的 OPTIMIZATION_ROADMAP.md 章节
3. 当前 Phase 的 DECISIONS_LOG.md 记录
```

### Step 2：声明当前任务
```
【当前 Phase】Phase 1: Critical Optimizations
【当前任务】Task 1.1: 修复 404 错误
【任务状态】🔴 等待启动
【预计时间】2 天
【依赖关系】无
```

### Step 3：运行需要的技能
```bash
# 根据 Phase 类型，运行相应技能：

Phase 1（代码优化）→ /plan → /tdd-guide → /code-reviewer
Phase 3（内容创作）→ /plan → /tavily-research → /code-reviewer
Phase 4（自动化）→ /plan → /code-reviewer
```

---

## 📋 在 Phase Session 中保持进度同步

**每日检查（下午 17:00）**
```
进度检查清单：
- [ ] 完成的任务数
- [ ] 遇到的阻碍
- [ ] 需要从 Master 获得的信息
- [ ] 预计明天完成的内容
```

**任务完成时**
```
// 更新 PROGRESS.md（在 Phase Session 中）
- [ ] 标记任务为 ✅ 完成
- [ ] 更新完成度百分比
- [ ] 记录关键指标变化
- [ ] 添加任何发现的新问题

命令："更新 PROGRESS.md — Task 1.1 完成"
```

---

## 🔵 切回 Master Session 前 — Phase 检查清单

**时间：** Phase Session 完成前

### Step 1：生成阶段总结
```markdown
【Phase 1 工作总结 — 2026-05-12】

完成任务：
- ✅ Task 1.1 修复 404 错误（2 天）
- ✅ Task 1.2 首页 CTA 优化（4 天）
- ✅ Task 1.3 元数据优化（2 天）
- ✅ Task 1.4 测试和审查（3 天）

关键成果：
- 首页停留时间：2.11 → 3.2 分钟（目标：3.5）
- 404 页面浏览：140 → 45（目标：<50）
- 搜索 CTR：1.9% → 2.8%（目标：3.0%）

遇到的问题：
[列举任何技术债、bug、需要返工的内容]

建议：
[给 Master 的建议，用于决定 Phase 2 策略]
```

**命令：** "生成 Phase 1 总结"

### Step 2：确保所有代码已提交
```bash
git status          # 检查是否有未提交的更改
git log --oneline -5  # 查看最近 5 个提交

git add .
git commit -m "Phase 1 完成：修复 404、优化首页、元数据优化"
git push origin main
```

### Step 3：准备交接给 Master

在 Phase Session 完成时，发送：
```
【Phase 1 完成 — 准备切回 Master Session】

完成度：✅ 100% 完成

关键指标：
- 首页停留时间：2.11 → 3.2 分钟（目标 3.5，差距 8%）
- 404 页面：140 → 45（目标 <50，超额完成）
- 搜索 CTR：1.9% → 2.8%（目标 3.0，差距 7%）

下一步（Master 需要）：
1. 审查 Phase 1 成果
2. 调整 Phase 2 策略（October 页面优化）
3. 启动 Phase 2 Session

建议：
[任何对项目方向的建议]
```

---

## 🟣 切回 Master 时 — Master 检查清单

**时间：** Phase Session 完成，切回 Master Session

### Step 1：恢复上下文（必须）
在 Master Session 首条消息粘贴：
```
【Phase 1 完成 — 返回 Master】

【最新进度】
[粘贴更新后的 PROGRESS.md]

【Phase 1 总结】
[粘贴 Phase 1 工作总结]

【审查点】
- 代码质量是否达标？
- 关键指标是否达到目标？
- Phase 2 是否可以启动？
```

### Step 2：更新 PROGRESS.md（Master 检查）
```
- [ ] 将 Phase 1 状态更新为 ✅ 完成
- [ ] 整体进度从 10% → 30%（Phase 1 完成）
- [ ] 更新关键指标基准线
- [ ] 检查是否需要调整 Phase 2 目标
```

### Step 3：生成周报告
```markdown
【周报告 — Week 1】
文件：WEEKLY_REPORTS/Week-01-Summary.md

内容：
- Phase 1 完成情况
- 关键指标进展
- 发现的问题和解决方案
- 下周计划（Phase 2 启动）
```

**命令：** "生成 Week 1 周报告"

### Step 4：规划下一 Phase
```
【Phase 2 规划讨论】
- 当前成果回顾
- October 页面优化方案
- 资源分配
- 启动时间
```

---

## ⚠️ 常见问题 — Session 切换时

**Q1：" 我切到新 Session 时，Claude 问我整个项目的背景"**
```
A：这是正常的。新 Session 没有之前对话的记忆。
   解决：在新 Session 首条消息粘贴 PROGRESS.md + OPTIMIZATION_ROADMAP.md 相关章节
```

**Q2："为什么有时候 Claude 对之前的决策不一致？"**
```
A：Session 之间没有自动连接。每个 Session 都是新的"大脑"。
   解决：使用 DECISIONS_LOG.md 记录所有决策，新 Session 时粘贴相关决策
```

**Q3："如何确保不会重复工作？"**
```
A：PROGRESS.md 记录了所有完成的任务。检查 ✅ 标记。
   解决：每次新 Session 开始，先读 PROGRESS.md 的"任务细目"章节
```

**Q4："如果一个 Session 很长，中途需要切换怎么办？"**
```
A：对话接近 30,000 token 时，启动新 Session。
   步骤：
   1. 更新 PROGRESS.md（当前 Session 中）
   2. 复制更新后的 PROGRESS.md
   3. 新 Session 首条消息粘贴
   4. 继续未完成的任务
```

---

## 快速参考 — Session 类型与流程

```
┌──────────────────────────────────────────────────────┐
│  Master Session（周一、周五）                       │
├──────────────────────────────────────────────────────┤
│ 启动新 Phase Session → 粘贴 PROGRESS.md + 任务说明  │
│ 接收 Phase Session 汇总 → 审查成果 → 更新周报告    │
│ 规划下一 Phase → 生成新决策                          │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  Phase Session（周二-周四）                          │
├──────────────────────────────────────────────────────┤
│ 启动 → 粘贴 PROGRESS.md（恢复上下文）              │
│ 运行 /plan, /tdd-guide 等技能 → 执行任务           │
│ 日常 → 更新进度、遇到问题时请求 Master 协助       │
│ 完成 → 生成总结 → 准备切回 Master                   │
└──────────────────────────────────────────────────────┘
```

---

## 文件位置参考

```
C:\Users\Zhong\Documents\trae_projects\ChinaTravel\
├── PROGRESS.md                          ← 【必读】实时进度
├── OPTIMIZATION_ROADMAP.md              ← 总体规划
├── DECISIONS_LOG.md                     ← 决策记录
├── HANDOFF.md                           ← 本文件
├── WEEKLY_REPORTS/
│   ├── Week-01-Summary.md
│   ├── Week-02-Summary.md
│   └── ...
└── PHASE_SUMMARIES/
    ├── Phase-01-Summary.md
    ├── Phase-02-Summary.md
    └── ...
```

---

**版本：** v1.0  
**创建：** 2026-04-28  
**最后修改：** 2026-04-28  

🔄 **使用频率：** 每次启动新 Session 时参考此清单
