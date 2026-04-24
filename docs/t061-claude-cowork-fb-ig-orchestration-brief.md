# T061 — Claude Cowork 总控任务说明（FB / Instagram 有机内容）

**项目：** ChinaTravel (CTSTours) — 新西兰客源中国高端团  
**更新：** 2026-04-19  
**仓库任务 ID：** T061（见 `src/lib/data/marketing-plan-2026.ts`）  
**关联：** T043、T044（Master brief）、T026（Meta 冷流量/创意角度）、T045–T046（模板任务）

---

## 1. 你的角色（Claude Cowork）

你是 **有机社媒内容的总编排**：根据下方「事实源」与「四月下旬槽位」，批量产出可直接交给下游使用的交付物。

**不负责：** 在 Meta 广告后台建计划、像素调试、Buffer 账号绑定（由运营者操作）。  
**负责：** 结构化提示词、英文主文案、版式说明、链接与 UTM 规则、验收清单。

---

## 2. 工具分工（固定）

| 环节 | 工具 | 产出 |
|------|------|------|
| 提示词 + 英文 caption 统筹 | **Claude Cowork**（本会话） | 按日/按帖的提示词包、caption 草案、合规检查 |
| 图片设计与导出 | **LoveArt** | 4:5 / 1:1 / 9:16 等规格视觉；品牌感与主色与站点一致 |
| 定时发布 | **Buffer** | 排期表；FB 与 INS 分账号/分队列 |

Cowork 输出应让 LoveArt **无需再猜**「画什么、几张、比例、主标题英文字」。

---

## 3. 事实源（必须遵守，禁止编造）

### 3.1 Master brief（产品口径）

| 产品 | 文档 | 核心事实 |
|------|------|----------|
| **A Tale of Two Cities**（北京 + 西安，无上海） | `docs/t043-beijing-xian-master-brief.md` | 10 天；lead-in **NZD $3,480**；北京→西安高铁；**无上海、无江南**；视觉：长城、故宫、兵马俑、胡同、火车 |
| **Shanghai & Surroundings**（长三角 loop） | `docs/t044-shanghai-surroundings-master-brief.md` | 10 天；**NZD $2,999** pp twin；**无北京、无兵马俑**；视觉：外滩、西湖、园林、水乡质感 |

**禁止串线：** 北方线帖子里不写 Terracotta 以外的江南地标；江南线不写长城/兵马俑。

### 3.2 关键词优先级（有机内容）

1. **Visa free**（或 *visa-free*）— 作标题、封面大字或 Reels 前 3 秒字幕  
2. 产品差异（北方历史 vs 江南节奏）  
3. NZ / Auckland / October departure（与页面一致）

**合规句式（每条推广向内容至少出现一次）：**

`Many NZ passport holders may qualify for visa-free entry — confirm for your itinerary before booking.`

不得写「人人免签」；详见 brief 内 FAQ。

### 3.3 落地 URL

- 北京西安线优先：`https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities`  
- 江南线优先：`https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings`  
- 深链锚点（文内说明用）：`#visa-nudge`、`#faq`、`#planning-resources`

### 3.4 有机帖 vs 付费广告（UTM）

- **公共主页自发帖（有机）：** 使用统筹页「内容支点」中的 **Facebook 有机** UTM 规则（`utm_medium=social`，`utm_campaign=oct2026_discovery_fb_organic` 等），见 `/marketing/campaign#ad-urls`。  
- **付费广告：** 用 T026 / 统筹页 **paid_social** 链接；**不要**把付费 UTM 贴到纯有机帖。

### 3.5 创意角度与 Hook

扩展阅读：`docs/t026-meta-cold-video-brief.md`（Outcome / 焦虑 / 信任框架）。

---

## 4. 四月下旬内容窗口（与营销计划对齐）

- **规划起点：** 2026-04-21（周一）至 **04-30**  
- **占比：** 两条 Discovery 相关内容 **≥60%** 主槽；其余为签证指南、其他线路或证言等（见已与运营对齐的周历）。

Cowork 需为 **每一主槽** 输出一行结构化记录（见 §6 模板）。

---

## 5. 交付物清单（Cowork 在一次「编排任务」中应产出）

1. **LoveArt 提示词表**（CSV 或表格）  
   - 列建议：`date`、`platform`、`format`（Feed 4:5 / Reels 9:16 / Story）、`product`（Tale / Shanghai / Brand / Visa-edu）、`headline_en`（封面英文）、`visual_brief`（场景与禁忌）、`loveart_prompt_en`（完整英文提示词）

2. **英文 caption 包**  
   - FB：可含 2–4 段 + CTA + link  
   - IG Feed：首行 hook + 正文 + hashtags（适量）  
   - IG Reels：前 3 秒口播/字幕句 + 短说明

3. **链接行**  
   - 完整带 UTM 的 URL（有机规则）

4. **合规自检表**（布尔）  
   - [ ] 免签免责声明已含  
   - [ ] 产品线无串线  
   - [ ] 价格/天数与 T043/T044 一致  
   - [ ] 未使用「§」符号（项目规则）

5. **Buffer 导入说明**  
   - 建议发布时间（NZ 时区）、先 FB 后 IG 或同一素材改编（注明）

---

## 6. 单帖输出模板（复制使用）

```text
Slot ID: APR2026-__
Date (NZ): ____-__-__
Platform: Facebook | Instagram Feed | Instagram Reels | Stories
Product: Tale of Two Cities | Shanghai & Surroundings | Supporting (visa / other tour)
Ratio: 4:5 | 1:1 | 9:16

Headline (EN, for image):
LoveArt prompt (EN):
Primary text (EN):
CTA (EN):
URL (organic UTM, full):
Hashtags (IG, optional):
Compliance line (visa):
Internal notes (ZH, for team):
```

---

## 7. 验收标准（T061 完成定义）

- [ ] 4/21–4/30 每个主槽均有 LoveArt 提示词 + 英文正文 + 有机链接  
- [ ] Discovery 占比 ≥60%（主槽计数）  
- [ ] Visa-free 在主力帖中可见（标题或首句）  
- [ ] T045/T046 可据此定稿「模板」（Cowork 产出即第一版实例库）

---

## 8. 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-19 | 初版：对接 Cowork + LoveArt + Buffer；纳入营销计划 T061 |
