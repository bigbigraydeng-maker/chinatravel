# CTS Tours SEO 项目仪表板 v2.0
**Date:** 2026-04-24  
**Timeline:** Apr 24 - Jul 23, 2026 (90天)  
**主要成果:** 11个优先关键词 → TOP 3-10排名

---

## 📊 仪表板文件说明

### 1. **CTS_SEO_Project_Dashboard_v2.xlsx** (完整仪表板)

#### Sheet 1: 項目概覽 (Project Overview)
- **目的:** 90天项目的6个阶段概览
- **内容:** Phase名称、时间表、关键词数、目标、完成度
- **使用:** 周会汇报、进度追踪

#### Sheet 2: 關鍵指標 (Key Metrics)
- **7个核心指标:**
  1. GSC Impressions (展现) — 基线 → 90天目标: 800+
  2. GSC Clicks (点击) — 基线 → 90天目标: 200+
  3. GSC Average Position (平均排名) — 基线 → 90天目标: <25
  4. 已优化页面数 — 0 → 11
  5. 已获得反链数 — 0 → 15+
  6. TOP 10排名数 — 0 → 8-10
  7. 平均关键词排名 — 基线 → <25

- **目标里程碑:** 2周、4周、8周、90天
- **责任人:** 标注哪些是Semrush、GSC API、还是代码集成负责

#### Sheet 3: 90天時間表 (Detailed Timeline)
- **6个阶段 × 12周，周任务拆解**
  - Week 1-2: 基础设施 (GSC导入、反链清单、内容审计)
  - Week 3-4: 快速赢 (3个关键词优化)
  - Week 5-8: 核心优化 (4个产品词深化)
  - Week 9-10: 支持内容 (4个长尾词)
  - Week 11: 反链集中 (10-15条高质量反链)
  - Week 12: 监测优化

- **每周包含:** 任务说明、关键词数、完成度追踪

#### Sheet 4: 11個關鍵詞追踪 (Keyword Tracking)
- **重新排序的11个优先关键词 (按Phase执行顺序)**

| 优先级 | 关键词 | 产品线 | 搜索量 | 难度 | CPC | 当前 | 4周 | 8周 | 90天 | 策略 |
|--------|--------|--------|---------|------|------|------|------|------|------|------|
| P1 | Chengdu panda sanctuary | Fire Fuzz | 320 | 35 | 0.59 | ? | 15 | 8 | 3 | 新专题+视频+反链 |
| P1 | China tours | General | 260 | 15 | 1.57 | ? | 8 | 5 | 2 | Hub重构+Schema |
| P1 | China vacation packages | General | 30 | 10 | 1.03 | ? | 5 | 3 | 1 | Tier 1页面 |
| ... (11行) |

**新增特性：** 
- 当前排名 = "待查"（需从GSC导入）
- 优化策略 = 具体战术（新建页、反链、Schema等）

#### Sheet 5: 反鏈建設計劃 (Backlink Strategy)
- **8个反链来源，按优先级 P1→P3**

| 优先级 | 来源类型 | 目标数 | 难度 | 执行期 | 步骤 | 质量 | ROI |
|--------|---------|--------|------|--------|------|------|------|
| P1 | NZ旅游博客 | 5 | 简单 | W2-W4 | 识别30+博客、发送outreach | 中等 | 高 |
| P1 | Lonely Planet/TripAdvisor | 3 | 中等 | W5-W8 | 提交评论、合作获取 | 高质 | 高 |
| P1 | NZ新闻媒体 | 2 | 中等 | W3-W5 | 新闻稿、媒体关系 | 高质 | 高 |
| P2 | 旅游聚合网站 | 2 | 中等 | W6-W11 | 提交商家、联盟合作 | 中等 | 中 |
| P2 | NZ旅游局 | 1 | 困难 | W5-W12 | 合作项目、品牌代理 | 很高 | 中 |
| P2 | 航空/酒店 | 1 | 困难 | W8-W12 | 联合营销、品牌合作 | 很高 | 中 |
| P3 | 大学/企业CSR | 1 | 极难 | W9-W12 | 研究合作、教育项目 | 极高 | 低 |
| P3 | 行业论坛/目录 | - | 简单 | W6-W12 | 提交目录、社区参与 | 低-中 | 中 |

**总目标:** 15+条高质量反链，集中在Week 11完成验证

#### Sheet 6: 技術實現路線圖 ⭐ (NEW)
- **9个代码开发模块，定义Semrush无法做的功能**

| 功能 | 优先级 | 工作量 | 技术栈 | Semrush能做? | 依赖 |
|------|--------|--------|--------|-------------|------|
| GSC数据实时导入 | P0 | 12h | Next.js API + GSC API | ❌ | 无 |
| 排名周追踪 | P1 | 16h | Node.js cron | ⚠️ 部分 | GSC导入 |
| CTS网站爬虫 | P1 | 20h | Puppeteer + Node.js | ❌ | 无 |
| 反链获取验证 | P2 | 16h | Node.js + Backlink API | ❌ | 无 |
| 排名变化告警 | P2 | 12h | Cron + Slack API | ❌ | GSC导入 |
| 内容性能仪表板 | P2 | 24h | React + GA4 API | ⚠️ 部分 | 网站爬虫 |
| 反链机会发现 | P3 | 20h | Python ML + Semrush API | ⚠️ 部分 | - |
| AI内容优化建议 | P3 | 24h | Claude API | ❌ | 网站爬虫 |
| 竞争对手排名监测 | P3 | 16h | Semrush API | ✅ 全覆盖 | - |

**总工作量:** 160小时 = 4周全职开发

#### Sheet 7: Semrush-vs-代碼 (Strategy)
- **功能对比和优化策略**

| 功能 | Semrush能做 | 代码能做 | 优化策略 |
|------|------------|---------|----------|
| 关键词研究 | ✅ 完全 | ❌ | 使用Semrush库 + GSC验证 |
| 竞争对手分析 | ✅ 完全 | ❌ | 使用Semrush数据 + CTS对标 |
| 反链分析 | ✅ 完全 | ✅ 验证 | Semrush数据 + 自动验证系统 |
| 排名追踪 | ⚠️ 限制 | ✅ 实时 | 融合GSC + Semrush |
| 内容优化建议 | ❌ | ✅ AI驱动 | Claude API分析 |
| 反链验证 | ❌ | ✅ | Backlink API检查 |
| 排名告警 | ❌ | ✅ Slack | 自动化通知 |

---

### 2. **CTS_SEO_Tech_Specs.json** (技术规格)
- **9个开发模块的完整API设计**
- **每个模块包含:**
  - 描述、优先级、时间表
  - API端点、技术栈、依赖关系
  - 实现步骤、输出格式
  - Supabase表结构

**用途:** 交给开发团队（Claude Code）使用

---

## 🎯 核心关键词（按Phase执行）

### Phase 2: 快速赢 (W3-4)
```
1. China vacation packages     (10 KD, $1.03 CPC) ← 最简单
2. Guilin yangshuo tour        (9 KD, $0.00 CPC)  ← 零CPC = 低竞争
3. Solo travel china           (10 KD, $0.79 CPC)
```

### Phase 3: 核心产品优化 (W5-8)
```
4. 🔴 Chengdu panda sanctuary  (35 KD, 0.59 CPC) ← Fire Fuzz核心，新产品
5. China tours (Hub)           (15 KD, $1.57 CPC) ← 主品牌
6. Beijing xi'an tour          (28 KD)
7. Terracotta warriors tour    (26 KD, $1.52 CPC)
```

### Phase 4: 支持内容 (W9-10)
```
8. China tour packages         (13 KD, $0.79 CPC)
9. Panda tour new zealand      (15 KD)
10. Three gorges tour          (14 KD)
11. Shanghai tour              (12 KD, $0.92 CPC)
```

---

## 🚀 下一步行动清单

### Week 1 (Apr 24-28)
- [ ] **GSC导入:** 设置GSC API连接到Supabase，导入3个月基线数据
  - **你需要:** 在GSC中查看当前11个关键词的排名，记录baseline
  - **截图位置:** Performance → 移除过滤器 → Export
  
- [ ] **竞争对手反链源识别:** 从Semrush已有数据中，提取TOP 3竞争对手反链来源
  - **数据来源:** 5个CSV SERP文件
  
- [ ] **内容审计:** 列出CTS现有的11个相关页面，检查字数/内部链接

### Week 2 (Apr 29-May 5)
- [ ] **网站爬虫配置:** 定义爬虫范围和数据收集字段
- [ ] **反链清单生成:** 30+个NZ博客候选名单
- [ ] **排名告警系统:** 配置Slack #seo-alerts频道

### Week 3-4 (May 6-19)
- [ ] **快速赢优化启动:** China vacation packages + Guilin yangshuo + Solo travel
- [ ] **GSC数据验证:** 确保导入的排名数据准确

---

## 📈 成功指标（90天目标）

| 指标 | 基线 | 90天目标 | 月均 |
|------|------|---------|------|
| GSC展现 | 0-3 | 800+ | 266/月 |
| GSC点击 | 0 | 200+ | 66/月 |
| 平均排名 | N/A | <25 | 逐周改善 |
| TOP 10排名数 | 0 | 8-10 | 70-100%覆盖 |
| 反链 | 0 | 15+ | 1-2/周 |
| 已优化页面 | 0 | 11 | 100% |

---

## 🔧 技术栈概览

```
Frontend Dashboard:
  ├─ React (ranking tracker, content performance)
  ├─ Chart.js (visualization)
  └─ Tailwind CSS

Backend APIs:
  ├─ Next.js (/api/seo/*)
  ├─ Node.js cron (daily, weekly jobs)
  └─ Puppeteer (site crawler)

Data Integration:
  ├─ Google Search Console API
  ├─ GA4 API
  ├─ Semrush API (optional, for backlink gap)
  ├─ Claude API (content optimization AI)
  └─ Backlink APIs (Moz, Ahrefs)

Data Storage:
  └─ Supabase (PostgreSQL)

Notifications:
  └─ Slack API

Deployment:
  └─ Render (Next.js + Node.js services)
```

---

## 📋 Semrush vs 代码集成决策矩阵

**Semrush做什么（付费）:**
- ✅ 关键词排名、搜索量、难度评分
- ✅ SERP分析（TOP 10竞争对手）
- ✅ 反链分析（已有的反链）
- ✅ 竞争对手排名追踪（高级功能）

**代码做什么（开发）:**
- ✅ GSC实时数据导入（Semrush无法访问用户GSC）
- ✅ 排名变化告警（Semrush有但收费）
- ✅ 网站内部链接分析（Semrush无法爬取客户网站）
- ✅ 反链验证和去重（Semrush数据可能过期）
- ✅ AI驱动内容优化（Semrush无此功能）
- ✅ 反链机会发现（Semrush Backlink Gap有，但需API调用优化）
- ✅ 自动化报告生成（定制化，Semrush为通用模板）

---

## 🎓 使用指南

### 对于Zhong（项目负责人）:
1. 每周查看"項目概覽"确认Phase进度
2. 每周Review"關鍵指標"中的目标达成情况
3. 每周从"90天時間表"中选择本周执行的任务

### 对于开发团队（Claude Code）:
1. 参考"技術實現路線圖"确定开发顺序（P0→P1→P2→P3）
2. 从"CTS_SEO_Tech_Specs.json"获取完整API设计
3. 按照"執行階段"设定的里程碑交付

### 对于SEO执行者（内容/反链团队）:
1. 从"11個關鍵詞追踪"了解本周优化目标
2. 从"反鏈建設計劃"了解反链执行步骤
3. 每周更新"當前排名"（从GSC导入）

---

## ✅ 项目完成条件

**Phase 6 (W12) 完成条件:**
- [ ] 所有11个关键词排名 < TOP 20
- [ ] 至少8-10个关键词进入TOP 10
- [ ] 获得15+条验证的高质量反链
- [ ] GSC点击量达到200+/月
- [ ] 所有自动化系统正常运行
- [ ] 交付完整的SEO仪表板和运维手册

---

**修订历史:**
- v1.0: 2026-04-10 (初始版本)
- v2.0: 2026-04-24 (整合SERP数据 + 技术路线图)
  - 新增11个优先关键词重排
  - 新增技術實現路線圖工作表
  - 新增Semrush-vs-代碼对比
  - 新增CTS_SEO_Tech_Specs.json

**下载文件:**
- CTS_SEO_Project_Dashboard_v2.xlsx
- CTS_SEO_Tech_Specs.json
- CTS_SEO_PROJECT_README.md (本文件)

---

*项目所有者: Zhong / CTS Tours*  
*最后更新: 2026-04-24*

