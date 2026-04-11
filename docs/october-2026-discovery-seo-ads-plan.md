# October 2026 Discovery 双线 — SEO 与广告执行计划

**范围：**两条 China Discovery 产品（主推团期 **2026-10-14** 与 **2026-10-15**）。  
**正式域：**`https://www.ctstours.co.nz`（与 Render `NEXT_PUBLIC_SITE_URL` 一致）。

---

## 一、产品事实速查（对外口径须与行程页一致）

| 项目 | Shanghai & Surroundings | A Tale of Two Cities |
|------|-------------------------|------------------------|
| **数据 slug** | `shanghai-beyond` | `beijing-shanghai`（行程为 **北京 + 西安**，非北京+上海） |
| **主产品 URL** | `/tours/china/discovery/shanghai-beyond` | `/tours/china/discovery/beijing-shanghai` |
| **活动 LP（策略 A：首页+广告同路径）** | `/campaigns/october-2026/shanghai-surroundings` | `/campaigns/october-2026/tale-of-two-cities` |
| **天数 / 价格** | 10 天 · NZD $2,999 pp | 10 天 · From NZD $3,480 |
| **主推出发日** | 14 October（另有 3 August） | 15 October（另有 13 Aug、2 Nov） |
| **一句话差异** | 长三角 + 上海深度 | 帝都 + 西安兵马俑 + **高铁** |

---

## 二、SEO 计划

### 2.1 目标与分工

| 目标 | 主承担 URL | 说明 |
|------|------------|------|
| **自然搜索「产品+意图」** | 两条 **主 tour 页** | 长期收录与内链权重仍以 `/tours/...` 为主；活动页自 canonical 已指向自身，适合投放与活动季，自然词可双页但避免重复段落堆砌。 |
| **活动季转化与统一叙事** | 两条 **活动 LP** | 与首页 Discovery 卡片、广告最终到达一致。 |

### 2.2 关键词簇（英文主市场，可映射到页面 H2/FAQ）

**Shanghai & Surroundings**

- 核心：*China tour from New Zealand*, *Yangtze Delta tour*, *Suzhou Hangzhou Shanghai tour*, *small group China*, *China discovery tour NZ*  
- 长尾：*Shanghai Suzhou Wuxi itinerary*, *West Lake tour from NZ*, *China group tour October*  
- 本地：*China tours Auckland*, *CTS China tour*（品牌防御）

**A Tale of Two Cities（务必含 Beijing + Xi’an）**

- 核心：*Beijing Xi'an tour*, *China high speed train tour*, *Terracotta Warriors tour from New Zealand*, *Forbidden City Great Wall tour package*  
- 澄清型（FAQ 好素材）：*tale of two cities China which cities* → 明确 **Beijing & Xi’an**  
- 长尾：*10 day China first time*, *China imperial tour NZ*

### 2.3 站内 SEO 动作清单（建议 2–3 周内完成）

1. **主 tour 页**  
   - 核对 `title` / `meta description` 是否含 **价格区间、天数、NZ**；与活动页勿矛盾。  
   - **H1** 下增加一句副标题澄清「两城」线（北京+西安），减少跳出误解。  
2. **活动 LP**  
   - 已有加长块与 canonical；检查 **Open Graph** 在分享时是否正常（主域 + HTTPS）。  
3. **内链**  
   - 从 `/china-tours`、`/china-tours-from-new-zealand`、`/shanghai-tours`、`/xian-tours`（若存在）各加 **1 条上下文链接** 指向对应主 tour 或活动索引 `/campaigns/october-2026`。  
4. **FAQ / 结构化数据**  
   - 两条线各补 2–3 个 FAQ：签证、是否含国际段、小费、**「两城」是否含上海**（仅 Tale 线）。  
   - 确认主 tour 页 **Product / FAQ JSON-LD** 仍合法（Search Console 富媒体结果）。  
5. **Google Search Console**  
   - 提交 sitemap 后观察 **活动 URL** 与 **主 tour URL** 的展示与点击率；若活动页抢词过多，可评估是否将部分内链改回只指主 tour（策略 B，与当前首页策略无关）。  
6. **图片**  
   - `alt` 含目的地+「China tour NZ」自然语言；控制单图体积（已有 Supabase 图则检查 `sizes`）。

### 2.4 内容节奏（可选，与 AI 协作）

| 周次 | 动作 |
|------|------|
| W1 | 主 tour 页 FAQ + 内链；GSC 检查索引。 |
| W2 | 博客或指南页 1 篇：《First-time China: Delta vs Beijing–Xi’an in 10 days》链到两主 tour。 |
| W3 | 客户证言或顾问引言（若授权）嵌入活动 LP 或主 tour。 |

---

## 三、广告计划

### 3.1 统一约定

- **最终到达 URL（策略 A）：** 与首页一致，使用 **活动 LP** + **UTM**（canonical 不带 UTM）。  
- **示例域名：** `https://www.ctstours.co.nz`  
- **UTM 命名建议：** `utm_campaign=oct26_discovery`；用 `utm_content` 区分创意/版位/产品线。  
- **代码辅助：** `buildOctober2026CampaignAdUrl()` — `src/lib/campaigns/october-2026-discovery.ts`  
- **GA4：** 确保 `tour_enquiry_submit` 等关键事件可用；活动询盘邮件里已有 `Campaign LP: Oct 2026 — …` 来源标识。

### 3.2 Google Ads（搜索为主）

| 维度 | Shanghai 线 | Tale 线 |
|------|---------------|---------|
| **Campaign** | `Search_ZH_Delta_Oct26`（示例名） | `Search_CN_BJXA_Oct26` |
| **地域** | New Zealand；语言 English | 同上 |
| **匹配类型** | 品牌 + 短语/完全匹配高意向词起步 | 同上；**Terracotta / Xi'an / high speed train** 单独 ad group |
| **落地页** | `.../shanghai-surroundings?utm_...` | `.../tale-of-two-cities?utm_...` |
| **转化** | 导入 GA4「询盘提交」或 Thank-you 页（若有） | 同上 |

**RSA 标题方向（英文，每条 3 条轮换测试）：**

- Shanghai：*10 Days Yangtze Delta · From NZD $2,999* · *Oct 14 Group Departure* · *CTS Auckland · China from NZ*  
- Tale：*Beijing & Xi’an by Train* · *Terracotta Warriors + Great Wall* · *From NZD $3,480 · Oct 15*

**描述行：** 各突出 **含机票/英语导游/陆地交通**（以行程页「Included」为准，勿超写）。

### 3.3 Meta（Facebook / Instagram）

| 维度 | 建议 |
|------|------|
| **目标** | 流量或潜在客户表单（若网站询盘为主，可用「流量」+ 网站转化优化） |
| **受众** | NZ · 40+ 可叠兴趣 Travel / National Geographic 等；再营销：网站访客 30/60 天 |
| **创意** | 15–30s 竖屏：证言 > 顾问口播 > 目的地 B-roll；文案点出 **接机牌 / 同一地面体系**（与 Asiascape 叙事可呼应但本计划聚焦 China Discovery） |
| **落地页** | 与 Google 相同活动 URL + 不同 `utm_content`（如 `meta_feed_shanghai`） |

### 3.4 UTM 矩阵（复制用）

```
# Shanghai — Google
https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings?utm_source=google&utm_medium=cpc&utm_campaign=oct26_discovery&utm_content=pmax_or_search_shanghai

# Tale — Google
https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities?utm_source=google&utm_medium=cpc&utm_campaign=oct26_discovery&utm_content=pmax_or_search_tale

# Shanghai — Meta
https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct26_discovery&utm_content=meta_feed_shanghai

# Tale — Meta
https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities?utm_source=facebook&utm_medium=paid_social&utm_campaign=oct26_discovery&utm_content=meta_feed_tale
```

搜索广告可加 `utm_term={keyword}`（若平台支持动态插入）。

### 3.5 预算与节奏（占位，由你们填数字）

| 阶段 | 周期 | 动作 |
|------|------|------|
| **学习期** | 7–14 天 | 每条线每日小额；RSA 至少 8–10 标题、3–4 描述；否定词：免费、招聘、签证代办诈骗词等 |
| **扩量** | 第 3 周起 | CPA 或询盘成本达标则加预算或开 Performance Max（需监测搜索词报告） |
| **再营销** | 并行 | 活动 LP 访客未提交询盘 — Meta + Google Display（可选） |

### 3.6 合规与库存

- 广告文案中的 **日期、价格、余位** 须与网站同步；「Only X seats」类若使用须与库存一致。  
- 「两城」线广告中 **不得** 写「上海」若行程不含上海。

---

## 四、衡量指标（周报用）

| 指标 | 工具 |
|------|------|
| 活动 LP 会话 / 跳出率 / 平均时长 | GA4 |
| 询盘数、按 `source` 邮件字段 | 邮箱 + GA4 `tour_enquiry_submit` |
| 广告 CPA、转化率、展示份额 | Google Ads / Meta Ads Manager |
| 自然搜索点击、平均排名（主 tour URL） | Search Console |

---

## 五、相关仓库文件

- 活动配置：`src/lib/campaigns/october-2026-discovery.ts`  
- 活动页面：`src/app/campaigns/october-2026/[slug]/page.tsx`  
- 加长英文参考：`docs/october-discovery-extended-copy.en.md`  
- GA4 / UTM 说明：`GA4_SETUP.md`  
- 站点结构：`SITE_MAP.md`（含 `/campaigns` 段）

---

*文档版本：与代码库同步创建；执行时以 `tours.ts` 与线上行程页为准更新价格与日期。*
