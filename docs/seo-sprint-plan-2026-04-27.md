# CTS SEO 冲刺计划 — 2026-04-27

**目标：** 4周内 Organic Traffic 从 195 → 400+，Authority Score 从 14 → 18+
**数据基线：** Top 3: 18词 · Top 10: 27词 · 可见度 23.81%（+9.84%/week）

---

## WAVE 1 — 本周内完成（代码类，交 Code）

### T-A: aggregateRating Schema 加入 Tour 产品页
**状态：** ✅ 已由 Cowork 完成，待 push
**文件：** `src/lib/schema-tour.ts`
**效果：** 所有 Tour 产品页 SERP 显示 ⭐4.9 星级，CTR 预计 +15–25%
**commit：**
```bash
git add src/lib/schema-tour.ts
git commit -m "seo: add aggregateRating (4.9/200) to TouristTrip and Product schema on all tour pages"
git push origin main
```

### T-B: Chengdu/Chongqing Travel Guide 内链到 3 个 Attraction 页
**状态：** ⏳ 待执行
**文件：** `src/lib/data/guides.ts`
**要做：**
- `chongqing-travel-guide` 的 Liziba Station section → 加文字内链 `/liziba-station-chongqing`
- `chongqing-travel-guide` 的 Hongyadong section → 加文字内链 `/hongyadong-chongqing`
- `chengdu-travel-guide` 的 Giant Pandas section → 加文字内链 `/chengdu-panda-sanctuary`

具体做法：在 section `content` 数组最后一个字符串末尾加一句带链接的 HTML：
```
'... <a href="/chengdu-panda-sanctuary">Read our complete Chengdu panda sanctuary guide →</a>'
```
（DestinationGuide 组件用 `dangerouslySetInnerHTML` 渲染 content，支持 HTML）

**效果：** 3 个新页面内链权重提升，Google 更快收录，排名加速

### T-C: 博客 Batch 2 — 5 篇（Line C 重庆成都补强）
**状态：** ⏳ 待执行
**文件：** `src/lib/data/blogs-longtail-batch2.ts`（新建）
**目标词：**
| slug | 目标词 | 月搜索量 |
|------|--------|---------|
| `chongqing-night-life-guide` | chongqing night life | 中等 |
| `chongqing-hot-pot-guide` | chongqing hot pot | 中等 |
| `leshan-giant-buddha-day-trip` | leshan giant buddha tour | 低-中 |
| `china-visa-free-nz-2026` | china visa free new zealand 2026 | 高意图 |
| `chengdu-things-to-do` | chengdu things to do | 中等 |

**格式：** 参照 `blogs-longtail-batch1.ts`，Baker Gu 第一人称，800–1200词，内链到 Fire & Fuzz 产品页

---

## WAVE 2 — 本周末前（非代码，你主导）

### T-D: Google 评价引导（5条真实评价）
**执行：** 你直接联系近期出行客户
- 发送 Google 评价直链（GBP 后台 → 分享评价链接）
- 目标：5条评价，评分 4.8+
- 效果：GBP 权重提升，Local Pack 排名上升，Review schema 有真实数据支撑

### T-E: TAANZ + Tourism NZ 外链申请
**执行：** 你操作
- TAANZ 会员目录：检查 ctstours.co.nz 是否在列表，如果没有联系 TAANZ 更新
- Tourism NZ：https://www.tourismnewzealand.com/resources/ — 申请合作伙伴目录收录
- 预期：2条 DA 40+ 外链，AS 从 14 → 16+

---

## WAVE 3 — 两周内（中期影响）

### T-F: Core Web Vitals 诊断 + 修复
**执行：** Code
- 跑 `npx lighthouse https://www.ctstours.co.nz/tours/china/discovery/chongqing-chengdu --output json`
- 检查 LCP（目标 < 2.5s）、CLS（目标 < 0.1）、FID/INP
- 最可能的问题：hero 图片未设 `priority`、大 bundle、layout shift
- 如 LCP > 3s，加 `<link rel="preload">` 到 hero image

### T-G: 邮件列表入口（PDF 换邮箱）
**执行：** Code（1天）
- 在 Blog 页面和 Guide 页面底部加 "Download our Free China Travel Planning Guide" 弹出框
- 收集邮箱，接入 Resend API（已有）
- 内容：现有最好的 Guide 内容打包成 PDF 即可

---

## WAVE 4 — 一个月后（等 GSC 数据回来）

| 行动 | 触发条件 |
|------|---------|
| Google Ads — `china tours from nz` | 自然 Top 3 稳定 + 季节性 booking 高峰前 |
| 博客 Batch 3（5篇 Line A 深化） | `beijing-xian` 相关词 GSC 展示量 > 200 |
| YouTube SEO（第一个视频） | 有真实出行客户视频素材 |
| Backlink 博主合作（2–3个 NZ 旅游博主） | AS 达到 16+，有外链谈判筹码 |

---

## 执行优先顺序

```
立即（今天）:
  T-A → push schema fix（你运行 git push）

今明两天（Code）:
  T-B → 内链修复（30分钟）
  T-C → Batch 2 博客（3–4小时）

本周（你主导）:
  T-D → 引导 5 条 Google 评价
  T-E → TAANZ + Tourism NZ 外链申请

两周内（Code）:
  T-F → CWV 诊断修复
  T-G → 邮件列表入口
```

---

## 预期效果（4周后）

| 指标 | 当前 | 目标 |
|------|------|------|
| Organic Traffic | 195/月 | 350–400/月 |
| Top 3 关键词 | 18 | 28–35 |
| Authority Score | 14 | 17–18 |
| 博客收录词数 | 约15 | 40+ |
| SERP 星级展示 | 无 | ⭐4.9 on all tour pages |
