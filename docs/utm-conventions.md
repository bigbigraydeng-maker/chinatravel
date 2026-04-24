# CTS 全站 UTM 规范（Tour / Guide / Blog 投流）

面向 **Google Ads、Meta、EDM、Newsletter、合作外链** 等「可控链接」。自然搜索、直接打开、无参数引荐流量在 GA4 的 *Session manual campaign name* 中会是 `(not set)`，属正常现象。

**Canonical：** 页面 `<link rel="canonical">` 与站内分享使用 **无 `?utm_*` 的干净 URL**；UTM **只加在对外投放/邮件/广告最终点击 URL** 上（与 `GA4_SETUP.md`、SITE_MAP.md 一致）。

---

## 1. 五个参数分工

| 参数 | 必填（投流/追踪） | 作用 | 取值风格 |
|------|-------------------|------|----------|
| `utm_source` | 是 | 广告或流量平台 | 小写、无空格：`google`、`facebook`、`instagram`、`linkedin`、`newsletter`、`partner` |
| `utm_medium` | 是 | 付费/触达类型 | `cpc`、`paid_social`、`display`、`email`、`newsletter`、`print` |
| `utm_campaign` | 是 | **在 GA4 里汇总「这一拨活动」的主键** | 小写 **`snake_case`**，见下文 **产品线前缀** |
| `utm_content` | 强烈建议 | 创意、版位、广告组、帖文 ID、具体落地 slug | 小写 `snake_case`，见 §3 |
| `utm_term` | 搜索选填 | 搜索广告关键词（若平台支持动态插入） | 与 Ads 关键字策略一致即可 |

---

## 2. 产品线：`utm_campaign` 前缀（核心约定）

今后 **Tour、Guide、Blog 分开投流** 时，**所有新建活动的 `utm_campaign` 必须以产品线开头**，便于在 GA4 探索或 BigQuery 里用前缀筛选：

| 产品线 | `utm_campaign` 必须以…开头 | 典型落地 |
|--------|----------------------------|----------|
| **Tour** | `tour_` | `/tours/...`、`/campaigns/...` 产品/战役页 |
| **Guide** | `guide_` | `/guides/...` 或 SEO 目的地指南路径 |
| **Blog** | `blog_` | `/blog/...`（若上线后路径不同，以实际 canonical 为准） |

**命名骨架（新建活动建议统一）：**

```text
{line}_{initiative}_{yyyymm}
```

- **`line`**：`tour` | `guide` | `blog`（与上表一致）
- **`initiative`**：短英文 token，说明目的或主题，如 `discovery`、`visa_push`、`pmax_hub`
- **`yyyymm`**：主要预算或上线月份，如 `202610`

**示例：**

- Tour 十月 Discovery 搜索：`tour_discovery_oct2026`（可与历史 `oct26_discovery` 并存；新物料优先用本规范）
- Guide 签证指南加投：`guide_visa_nz_oct2026`
- Blog 某主题系列：`blog_china_unlocked_apr2026`

同一拨活动、多平台投放时：**同一 `utm_campaign`**，用 **`utm_source` + `utm_medium` + `utm_content`** 区分平台与创意（与现有 `docs/october-2026-discovery-seo-ads-plan.md` 思路一致）。

---

## 3. `utm_content`：落到「哪一页 / 哪一条创意」

在 **`utm_campaign` 已表达「哪一拨」** 的前提下，`utm_content` 负责细粒度：

| 场景 | 建议格式 | 示例 |
|------|----------|------|
| 标准产品页 | `{tier}_{slug}` 或 `slug` | `discovery_beijing_xian` |
| 战役落地页 | `campaign_{slug}` | `campaign_tale_of_two_cities` |
| Guide | `guide_{slug}` | `guide_great_wall` |
| Blog | `post_{slug}` | `post_best_time_china` |
| 与内部表对齐 | 执行表 ID | 社媒发帖 `S02`…`S16`（与 `social-posting-plan-2026.ts` 一致） |

**原则：** 能与你方排期表、广告系列名或素材编号 **一一对应**，复盘时不必猜。

---

## 4. `utm_source` / `utm_medium` 常用枚举

**Source（示例，可按实际平台增减）：**

`google`、`facebook`、`instagram`、`meta`、`linkedin`、`microsoft`、`newsletter`、`klaviyo`、`resend`、`partner`、`nz_newspaper`

**Medium：**

| 场景 | `utm_medium` |
|------|----------------|
| 搜索广告 | `cpc` |
| 购物 / Performance Max 等（若统一归搜索类） | `cpc` 或 `ppc`（**全站选其一，不要混用**） |
| Meta / FB / IG 付费 | `paid_social` |
| 展示网络 | `display` |
| EDM / 营销邮件 | `email` |
| 订阅简报 | `newsletter` |
| 报刊印刷 | `print` |
| 社媒不付费发帖 | `organic` |

---

## 5. 完整 URL 示例（复制改参数即可）

**假设站点：** `https://www.ctstours.co.nz`

1. **Tour · Google 搜索 → Discovery 产品页**

   `https://www.ctstours.co.nz/tours/china/discovery/beijing-xian?utm_source=google&utm_medium=cpc&utm_campaign=tour_discovery_oct2026&utm_content=discovery_beijing_xian&utm_term=beijing+xian+tour`

2. **Guide · Meta 付费 → 签证指南**

   `https://www.ctstours.co.nz/china-visa-guide-for-new-zealanders?utm_source=facebook&utm_medium=paid_social&utm_campaign=guide_visa_nz_oct2026&utm_content=meta_feed_visa`

3. **Blog · Newsletter → 单篇文章**

   `https://www.ctstours.co.nz/blog/example-slug?utm_source=newsletter&utm_medium=email&utm_campaign=blog_china_unlocked_apr2026&utm_content=issue_12_cta_primary`

4. **Tour · 报刊印刷 — 十月双 Discovery 统一入口（单 QR）**

   落地页为双产品海报：`/spotlight/october-2026`（页内再分流至各战役页）。与 `marketing-plan-2026` 报刊任务、`oct2026_spotlight` 口径一致。

   `https://www.ctstours.co.nz/spotlight/october-2026?utm_source=nz_newspaper&utm_medium=print&utm_campaign=oct2026_spotlight&utm_content=spotlight_poster_dual`

---

## 6. 与仓库内现有命名对齐

| 位置 | 当前 `utm_campaign` 示例 | 说明 |
|------|--------------------------|------|
| `GA4_SETUP.md`、T018 CSV、`october-2026-discovery-seo-ads-plan.md` | `oct26_discovery` | 十月双 Discovery **未加** `tour_` 前缀；**历史数据保留**，新系列可采用 `tour_discovery_oct2026` 逐步统一 |
| `src/lib/data/social-posting-plan-2026.ts` | `oct2026_dual` | 社媒有机/付费与发帖表对齐；**改名需同步**执行表与 GA4 对比口径 |
| `src/lib/data/marketing-plan-2026.ts`（报刊） | `oct2026_spotlight` | 平面投放独立战役名 |

**建议：** 新开的 Tour / Guide / Blog 投流 **从本文件 §2 前缀起命名**；旧活动仅在复盘需要「同比」时继续沿用旧 `utm_campaign`，避免中途改名导致报表断层。

---

## 7. 执行清单（发链接前勾一下）

- [ ] 落地 URL 是否为 **HTTPS** 正式域、路径与 canonical 一致（无多余重定向链）
- [ ] 是否已设 `utm_source`、`utm_medium`、`utm_campaign`
- [ ] `utm_campaign` 是否以 `tour_` / `guide_` / `blog_` 开头（新建活动）
- [ ] 是否已设 `utm_content`（或搜索广告已设 `utm_term`）
- [ ] 同一活动跨平台是否 **共用同一 `utm_campaign`**
- [ ] 站内/搜索引擎是否 **未**把带 UTM 的 URL 当作 canonical

---

## 8. 可选工具

- Google 官方：[Campaign URL Builder](https://ga-dev-tools.google/campaign-url-builder/)（生成后按上文核对前缀与命名）
- 复杂排期：用表格维护「活动代号 ↔ `utm_campaign` ↔ 各平台 `utm_content`」，与 `marketing-plan-2026`、社媒发帖表同一口径更新。
