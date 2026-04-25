# SEO 下一步行动清单（按 ROI 排序）

**更新日期：** 2026-04-25  
**数据来源：** GSC 实测 90天 + Semrush AU/NZ 数据库

---

## 第一优先：修复 CTR（排名好但没人点）

**Spec 文件：** `docs/spec-ctr-fix-meta-titles.md`  
**预计效果：** 无需改排名，直接提升月点击 30–40 次  
**工时：** 1 小时

涉及页面：
- `/forbidden-city-travel-guide` — 排名 3，75次展示，0点击
- `/china-tours` — 排名 4.5，42次展示，0点击（holiday packages词）
- `/china-tours-from-new-zealand` — 排名 7，196次展示，CTR仅2%

---

## 第二优先：建 /china-tours-from-australia

**Spec 文件：** `docs/spec-china-tours-from-australia.md`  
**状态：** ✅ 已由 Code 完成并部署  
**目标词：** `china tours from australia` SV 720, KD 25

---

## 第三优先：查 `china trips` 排名 60 的页面

**背景：** GSC 显示 `china trips` 有 151 次展示但排名第 60，说明某页面被 Google 关联到这个词但内容不够强。

**行动：**
1. 登录 GSC → Performance → 按页面过滤 `china trips` 关键词 → 找出是哪个 URL
2. 打开那个页面，检查 H1 / 正文是否有 "china trips" 语义
3. 在 H1 或第一段加入 "china trips" 相关表达
4. 预计可从排名 60 推进到排名 20–30，获得真实点击

---

## 中期行动（4周后 GSC 数据回来再决定）

| 行动 | 触发条件 |
|------|---------|
| 给 Line C 加更多长尾文章 | `chongqing city tour` 出现 GSC 展示量 |
| 给 Line A 加 `terracotta warriors tour` 内容 | `/terracotta-warriors-travel-guide` CTR 提升后 |
| 给 Line B 加 `shanghai day trips` 内容 | `hangzhou things to see` (AU SV 260) 出现展示 |
| 考虑 Google Ads 投 `china tours from nz` | 自然排名稳定在 Top 5 后 |

---

## 内链修复（已完成）

已于 2026-04-25 修复 `DestinationGuide.tsx`：

- 8 个 Guide 页面新增 Spotlight tour 卡片
- Beijing / Xian / Great Wall / Forbidden City / Terracotta → A Tale of Two Cities
- Chongqing / Chengdu / Leshan Buddha → Fire & Fuzz

⚠️ 注意：`src/components/seo/DestinationGuide.tsx` 的改动已写入文件但 **index.lock 问题导致未 commit**。Code 执行 CTR spec 时请一并 add 这个文件：

```bash
git add src/components/seo/DestinationGuide.tsx
```
