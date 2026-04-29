# 📊 Phase 1 — GA4 数据验证清单

**项目：** CTS Tours 优化 Phase 1  
**用途：** 实时验证关键指标进展  
**创建：** 2026-04-28  
**更新频率：** 每天 09:00 NZ 时间 + Task 完成后

---

## 🎯 Phase 1 关键指标目标

| 指标 | 当前基准 | Phase 1 目标 | 验证方式 |
|------|---------|-----------|---------|
| **首页停留时间** | 2.11 分钟 | 3.5+ 分钟 | GA4 > Engagement > Pages and Screens |
| **404 页面浏览** | 140/月 | <50/月 | GA4 > Engagement > Pages (filter: /404) |
| **搜索 CTR** | 1.9% | 3.0%+ | GSC > Search Analytics (query filter) |
| **Hero CTA 点击** | 基准 0（新指标） | 基准设立 + 5%+ 周增长 | GA4 > Events > hero_cta_click 系列 |

---

## 📱 GA4 自定义事件设置（需要配置一次）

### 步骤 1：配置 Hero CTA 事件追踪

在 `src/components/Hero.tsx` 中添加 GA4 事件埋点：

```tsx
// 需要在 Hero.tsx 中配置这些事件
import { useEffect } from 'react';

useEffect(() => {
  // 方式 A：如果已有 gtag 全局对象
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'hero_cta_primary_click', {
      button_text: 'Browse Our China Tours',
      destination_url: '/tours/find',
      event_category: 'engagement',
      event_label: 'hero_primary_cta',
    });
  }
}, []);
```

**四个核心事件：**
1. `hero_cta_primary_click` — "Browse Our China Tours →" 点击
2. `hero_cta_secondary_click` — "Chat with a Kiwi Travel Expert" 点击
3. `hero_search_submit` — 搜索框提交
4. `hero_trust_strip_impression` — Trust strip 显示（用于计算可见率）

### 步骤 2：在 GA4 中创建自定义事件

**GA4 设置路径：**
```
GA4 > 事件 > 创建事件
  ├─ 事件名称：hero_cta_primary_click
  ├─ 匹配条件：page_path = / AND button_text = "Browse Our China Tours"
  └─ 保存
```

**重复上述步骤创建其他 3 个事件。**

### 步骤 3：在 GA4 中创建转化（可选但推荐）

将 Hero CTA 点击标记为转化，便于追踪转化漏斗：

```
GA4 > 转化 > 新转化事件
  ├─ 事件名称：hero_cta_click
  ├─ 说明：User clicked primary CTA on homepage hero
  └─ 标记为转化
```

---

## 🔍 Phase 1 数据检查协议

### 每日检查（上午 09:00）

**日期：** ___________  
**检查人：** ___________

#### 首页停留时间
```
GA4 > Engagement > Pages and Screens
  ├─ 筛选：page_path = /
  ├─ 指标：Engagement rate, Avg. session duration
  ├─ 当前：_____ 分钟（上周平均：2.11 分钟）
  └─ 变化：📈 向上 / 📉 向下 / ➡️ 持平 by ____%
```

#### 404 页面访问
```
GSC 或 GA4 > Engagement > Pages
  ├─ 筛选：page_path CONTAINS "404" OR page_title CONTAINS "not found"
  ├─ 指标：Users, Sessions, Bounce rate
  ├─ 当前：_____ 次浏览（上周平均：140/月 ≈ 3.2/天）
  └─ 变化：📈 向上 / 📉 向下 / ➡️ 持平 by ____%
```

#### Hero CTA 点击
```
GA4 > Events > hero_cta_primary_click
  ├─ 指标：Event count, Event count per session
  ├─ 当前：_____ 次点击（本周目标：设立基准）
  └─ 备注：___________

GA4 > Events > hero_cta_secondary_click
  ├─ 指标：Event count
  ├─ 当前：_____ 次点击
  └─ 备注：___________
```

#### SearchBar 使用
```
GA4 > Events > hero_search_submit
  ├─ 指标：Event count, top search queries
  ├─ 当前：_____ 次提交
  └─ 热搜词：1. ______ 2. ______ 3. ______
```

---

### Task 完成时检查（关键里程碑）

#### Task 1.1 完成后（404 修复）
```
日期：2026-04-29
验证点：
  ✅ 原 404 URL 是否返回 308 重定向？
  ✅ GSC 抓取队列是否移除 404 错误（刷新后）？
  ✅ not-found.tsx 自定义 404 页是否正常渲染？

GA4 指标：
  ├─ 404 页面浏览：140 → ____ （预期下降 30%+ 到 98 以下）
  ├─ 404 页面跳出率：____ （预期上升，说明用户转向其他页面）
  └─ not-found 页面停留时间：____ 秒
```

#### Task 1.2 完成后（首页 CTA 优化）
```
日期：2026-05-01
部署内容：
  ✅ Hero 新 CTA 文案："Browse Our China Tours" + "Chat with a Kiwi Expert"
  ✅ 新增 Trust Strip（4.9★ · From NZD $875 · Visa-free）
  ✅ SearchBar 目的地重排

GA4 指标（对比优化前 3 天 vs 优化后 3 天）：
  
  【CTA 点击转化】
  ├─ hero_cta_primary_click：____ → ____ (变化：+____%)
  ├─ hero_cta_secondary_click：____ → ____ (变化：+____%)
  └─ 两个 CTA 的点击比例：主 __% : 副 __%

  【首页参与度】
  ├─ 首页停留时间：2.11 分钟 → ____ 分钟 (目标：3.5)
  ├─ 首页参与率（Engagement rate）：____ → ____ %
  └─ 首页跳出率：____ % → ____ %

  【搜索使用】
  ├─ hero_search_submit 事件数：____ (周均值)
  ├─ 搜索提交后的行为：
  │   ├─ → 点击热搜词：____ %
  │   ├─ → 访问 /tours/find：____ %
  │   └─ → 离开网站：____ %
  └─ 热搜词 Top 3：1. ____ 2. ____ 3. ____

  【设备/浏览器】
  ├─ 移动端 vs 桌面端 CTA 点击率对比：____
  └─ 最高点击来源：[Google / Direct / Social / Other]
```

#### Task 1.3 完成后（元数据优化）
```
日期：2026-05-02
部署内容：
  ✅ 首页 title 和 description 优化
  ✅ JSON-LD Schema 添加

GA4 指标（自然搜索相关）：
  
  【自然搜索流量】
  ├─ 来自自然搜索的首页流量：____ 用户（周均值）
  ├─ 首页来自搜索的参与率：____ %
  └─ 停留时间（仅搜索用户）：____ 分钟

  【搜索排名（需从 GSC 验证）】
  ├─ 首页平均排名位置：____ （目标：<10）
  ├─ 首页印象数：____ （周均值）
  ├─ 首页点击数：____ （周均值）
  └─ 首页 CTR：____ % （目标：>3%）
```

---

## 📈 GA4 仪表盘快捷查询

### 快速视图 1：首页转化漏斗

```
GA4 > Exploration > Funnel exploration

Funnel steps:
  1️⃣ Page view: page_path = /
  2️⃣ Event: hero_cta_primary_click OR hero_cta_secondary_click
  3️⃣ Event: page_view (destination: /tours/find OR /tailor-made)
  4️⃣ Event: form_submit (enquiry form)

目标：查看从首页到表单提交的转化漏斗
```

### 快速视图 2：Hero 部分参与热力

```
GA4 > Exploration > Cohort analysis

创建 Cohort：
  ├─ 名称："Hero 交互用户"
  ├─ 条件：hero_cta_click OR hero_search_submit
  ├─ 时间窗口：过去 7 天
  └─ 观察其后续行为：访问深度、停留时长、转化率

目标：理解 Hero 交互用户的行为模式
```

### 快速视图 3：搜索热词分析

```
GA4 > Events > hero_search_submit
  ├─ 按事件参数 search_query 分组
  ├─ 显示频率最高的搜索词
  └─ 关联搜索词与下游转化

目标：优化 Popular searches 标签 + 改进 SearchBar
```

---

## ⚠️ 异常情况处理

### 如果 404 浏览量不降反升？
```
诊断步骤：
1. 检查重定向规则是否生效（curl -I 老 URL）
2. 检查是否有新的死链产生
3. 检查外部反向链接是否指向错误的 URL
4. 等待 GSC 重新抓取（可手动提交 sitemap 加速）

预期：重定向部署后 3-7 天内会显著下降
```

### 如果 CTA 点击率在 +0% 到 -10% 之间？
```
可能原因：
  1. 文案改动还未完全展现效果（需要 1-2 周数据稳定）
  2. Hero 可见率下降（检查 viewport 高度改动）
  3. 竞争对手或季节性因素影响流量

建议：
  ✅ 继续观察 7-14 天
  ✅ 检查浏览器控制台是否有 GA4 埋点错误
  ✅ 对比不同设备/浏览器的表现
```

### 如果首页停留时间反而下降？
```
可能原因：
  1. 用户更快找到需要的内容（实际上转化好转）→ 检查转化漏斗
  2. 新增内容吸引了更多"快速浏览"用户
  3. 搜索流量占比变化

诊断：
  ✅ 对比不同 traffic source 的停留时长
  ✅ 查看首页跳出率是否也下降（如是，则用户更快做决策 = 好信号）
  ✅ 检查参与率（Engagement rate）而非仅看停留时长
```

---

## 📋 周报数据采样模板

**周报日期：** Week 1（2026-04-28 ~ 2026-05-04）

### GA4 关键指标汇总
```
【首页核心指标】
停留时间：2.11 min → ____ min
参与率：____ % (目标：>60%)
跳出率：____ % (目标：<50%)

【CTA 转化】
Primary CTA 点击：____ 次 (周均)
Secondary CTA 点击：____ 次 (周均)
CTA 点击后的转化率：____ %

【404 & 搜索】
404 页面浏览：140 → ____ (周均)
搜索提交数：____ 次 (周均)
搜索热词 Top 3：1. ____ 2. ____ 3. ____

【流量来源变化】
来自有机搜索：____ 用户（周平均）
来自直接流量：____ 用户
来自推荐/社媒：____ 用户
```

---

## 🔗 相关文档链接

- PROGRESS.md — 整体进度看板
- OPTIMIZATION_ROADMAP.md — Phase 1 详细规划
- PHASE_1_IMPLEMENTATION.md — Task 具体步骤（待生成）

---

**使用说明：** 每日 09:00 打开此文件，填入 GA4 数据。周五汇总到周报告中。
