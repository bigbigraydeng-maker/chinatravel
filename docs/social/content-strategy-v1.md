# CTS 社媒内容策略 v1
**日期**: 2026-04-26
**版本**: v1 — 4+1 Content Pillar + 多 tour 并发
**用途**: 给 Claude Code 实施自动化用 / 给 CTS 团队执行参照

---

## 1. 当前 stack（已确定）

| 层 | 工具 | 状态 |
|---|---|---|
| 内容源 | Airtable base `appEqUz46L20wy3JX` table `tblrAqd8d8aFG7qQI` | ✅ 53 条记录 |
| 图片存储 | Supabase `qbturrydultenhlfmdcm.supabase.co` | ✅ |
| 视频生成 | **Kling v2** (中国背景理解最佳) | 🆕 决定 |
| 图片生成 | **Wavespeed (API)** — 全部走这个，已拿到 API key | 🆕 决定 |
| 排期发布 | **Publer Bulk CSV** (绕过 Zapier) | ✅ 方案 C |
| Zapier | **永久 OFF** | ✅ 已止血 |

---

## 2. 4+1 Content Pillar 框架（经客户确认）

| Pillar | 描述 | 主格式 | 占比 | 难度 |
|---|---|---|---|---|
| **1. 景点航拍** Destination Showcase | 城市/景点动感 Reel · 无人机航拍 · 12s 内 | **Reel 9:16** | 40% | 中（Kling AI 生成）|
| **2. 用户怎么说** Customer Voice | 真实游客图 + 引言 + 5 星评价 | **Feed 4:5 / Story** | 25% | 易（要素材积累）|
| **3. 各地美食** Food Series | 图文形式介绍菜品 + 店家 | **Carousel 4:5 / Reel** | 20% | 中（Wavespeed 食物图）|
| **4. 实用 Tips** Travel Tips | 签证、打包、时差、货币、文化 | **Feed 4:5 + Story** | 10% | 易（信息图模板）|
| **+1. 节日/时事** Topical Hook | **NZ 用户视角的假期节点**（见下表）| 任意 | 5% | 高（机会主义）|

### Topical Hook — NZ 假期日历（2026）

只关注 NZ 用户视角的节假日，不做中国内地节日借势（除非影响 NZ 客旅游决策，如 Golden Week 提示避开）。

| 日期 | 假期 | 借势角度 |
|---|---|---|
| 2026-04-25 (Sat) | **Anzac Day** | 安静尊重，可以"long weekend planning your next trip" 角度，避免商业化感 |
| 2026-06-01 (Mon) | **Queen's Birthday** | "Plan your spring escape — China autumn ready in 4 months" |
| 2026-07-10 (Fri) | **Matariki** | NZ 新年序章，反思 + 旅行规划 |
| 2026-10-26 (Mon) | **Labour Day Long Weekend** | "Last chance to grab October China spots" |
| 2026-12-25-26 | **Christmas / Boxing Day** | "Treat yourself: 2027 China booking + payment plans" |
| 2027-01-01 | **New Year** | "New year, new continent" hook |
| 2027-02-06 (Sat) | **Waitangi Day** | NZ identity + cross-cultural travel |
| Easter (variable) | **Easter Long Weekend** | "Long weekend = perfect time to research your big trip" |

### 中国节日只用作"避开提示"
| 中国节日 | NZ 用户用法 |
|---|---|
| **Chinese New Year** (Feb) | "Avoid for tourist crush, but cultural experience opportunity" |
| **Qingming** (Apr 4-6) | Mention if NZ's autumn travel coincides |
| **May Day Golden Week** (May 1-5) | **AVOID booking advice** — domestic tourist peak |
| **Mid-Autumn Festival** (Sep) | Cultural angle for moon cake content |
| **National Day Golden Week** (Oct 1-7) | **AVOID booking advice** — biggest tourist peak; pivot to "after Oct 7 is gold" |

### Airtable Content_Pillar 字段值（已设置）
- `Destination Showcase`
- `Customer Voice`
- `Food Series`
- `Travel Tips`
- `Topical Hook`

---

## 3. 三个产品（tours）现状

| Tour | Brief | Slug | 价格 | 出发 | 当前 Airtable 条数 |
|---|---|---|---|---|---|
| **Tale of Two Cities** | T043 | `beijing-xian` | NZD $3,480 | Oct 2026 | 13 |
| **Shanghai & Surroundings** | T044 | `shanghai-surroundings` | NZD $2,999 | Oct 2026 | 13 |
| **Fire & Fuzz** (Chongqing+Chengdu) | T045 | `chongqing-chengdu` | **NZD $2,999** ⚠️ brief 写 $2,750 是错的 | **1 Nov 2026** | 8 (新加) |

**注意 brief 错误**：T045 master brief 显示 NZD $2,750 但**实际是 $2,999**。所有 Fire & Fuzz 内容用 $2,999。

---

## 4. 数量目标 & 分配

**目标：每天 8+ 条，3 tour 平衡覆盖**

### 当前状况
- 53 条 ÷ 9 天 = ~6 条/天 → **不够**
- Fire & Fuzz 才 8 条 → 比例不够

### 扩充计划（下周完成）

每个 tour 至少 **20-25 条**储备，三个 tour 共 60-75 条 → 每天 8 条 × 9 天 = 72 条。

| Tour | 当前 | 目标 | 缺口 |
|---|---|---|---|
| Tale of Two Cities | 13 | 22 | +9 |
| Shanghai & Surroundings | 13 | 22 | +9 |
| Fire & Fuzz | 8 | 22 | +14 |
| **共享/通用** (visa, NZ, October Tips) | ~14 | 8 | -6（保留 8 条精华即可）|
| **Total** | 48 | 74 | +28 待补 |

### 每日发布节奏（建议）

```
07:00 — 实用 Tips / 景点航拍 (开启早通勤注意力)
09:00 — 景点航拍 / 美食
11:00 — 用户怎么说 / 行程
14:00 — 美食 / 景点
17:00 — 景点 (傍晚阳光内容)
19:00 — Reel / 美食 (晚饭时间)
21:00 — Story / 互动 (夜间)
22:00 — Topical / 收尾
```

---

## 5. Reel & Image Prompt 规范（v3）

### Reel (Kling v2)
```
KLING v2 | 9:16 vertical · 12s · NO TEXT/LOGOS

VISUAL: [single concise scene]
CAMERA: [motion type]
STYLE: [photoreal/cinematic/documentary]
PALETTE: [colors]
LIGHTING: [time/mood]
SUBJECT: [primary element]
NEGATIVE: text, letters, captions, logos, watermarks, lowres, distorted
```

### Image (Wavespeed / Lovart)
```
4:5 Feed image [1080×1350]. NO TEXT/LETTERS/LOGOS. Leave bottom 25% empty.

SCENE: [main visual description]
MOOD: [mood keywords]
PALETTE: [brand colors]
NEGATIVE: text, letters, captions, logos, watermarks, [scene-specific]
```

### 文字叠加（CapCut/Premiere/Canva 后期）
所有文字内容存在 Airtable **`Video_Text_Overlay` 字段**（多行文本），格式：
```
[0-1s intro] CTS logo centered 400px on crimson + gold frame.
[2-5s lower third] 'Headline' (Playfair Display Bold, gold #D6A756, 80pt, navy shadow).
[6-9s lower third] 'Sub' (Inter Bold white 48pt on navy 30% bar).
[10-12s outro] CTS logo 300px + 'CTA →' (Playfair gold) + 'ctstours.co.nz' (Inter cream).
```

**关键规则**：
- AI 生成阶段 **绝对不出文字**（Kling/Wavespeed 写 "NO TEXT" 在 prompt 和 negative 都强调）
- 所有文字、Logo、CTA 在后期人工/自动化叠加
- Logo 透明 PNG 强制：图片右上角 ~120px / Reel 中心 0-1s + 10-12s

---

## 6. Brand Tokens（来源 tailwind.config.ts）

```
primary    #B61E2E  crimson
secondary  #D6A756  gold
accent     #1F2937  navy
cream      #FFF9F5  light bg
warm-100   #FFF3EB  beige
serif      Playfair Display  (headlines)
sans       Inter             (body)
```

---

## 7. 周流程 SOP（手动版）

```
Mon 早 (15 min)
  → 看 Airtable Zapier_Ready 视图，挑 8-10 条本周要发的
  → Status 改 ready
Mon-Tue (3-5 hrs)
  → Lovart/Wavespeed/Kling 出图/视频
  → 上传 Supabase tour-images/ social-images/
  → 回 Airtable 填 Image_URL
Wed 下午 (15 min)
  → CapCut 后期叠加文字 (用 Video_Text_Overlay 字段)
  → 导出最终视频/图片
Thu 早 (15 min)
  → Airtable 视图导 CSV
  → Excel 模板转换 (cts-publer-csv-converter.xlsx)
  → 上传 Publer Bulk Import → 检查预览 → Schedule
Thu-Fri
  → 帖子陆续自动发出
Fri 晚 (10 min)
  → Publer Analytics 看本周表现
  → 标记 top performer 在 Airtable (Internal_Notes)
```

总投入 **~5-7 hours/周**，能产出 8 条/天 × 7 天 = 56 条。

---

## 8. 自动化 Roadmap (给 Claude Code 看)

### Phase 1 (现在已完成)
- ✅ Airtable 数据结构
- ✅ Excel 转换模板
- ✅ Brand system docs
- ✅ Caption + Prompt 体系
- ✅ Publer 手动批量上传流程

### Phase 2 (下一步实施)
- [ ] Wavespeed API 接入：脚本读 Airtable 中"待生成"记录 → 调 Wavespeed → 自动上传 Supabase → 回填 Image_URL
- [ ] Kling API 接入（如果有 API 开放）：同上但视频
- [ ] CSV 自动生成：脚本读 Airtable Zapier_Ready → 直接输出 Publer-ready CSV（取代 Excel）
- [ ] Publer API 直发（绕过 CSV 上传）：脚本调 Publer API 创建 scheduled posts

### Phase 3 (中长期)
- [ ] 内容生成 AI agent：给 master brief 自动产出 20+ 条草稿入 Airtable
- [ ] 图片管家页面（已有 spec：`docs/image-manager-spec.md`）
- [ ] 数据回流：Publer Analytics API → Airtable 互动数据
- [ ] Top performer 自动建议投放 Paid Ads

---

## 9. 已知 bug & 修复待办

### Caption 事实错误
- [ ] `Discovery Shanghai: What 8 Days Actually Looks Like` —— 应为 **10 days, 5 cities** (Suzhou+Wuxi+Xinshi+Hangzhou+Shanghai)
- [ ] `The Forbidden City in 90 Seconds` —— "980 rooms" 应为 "980 buildings, 8,700+ rooms"
- [ ] `Top 5 Chinese Dishes Beijing` —— 开头 emoji 🥲 改 🥢
- [ ] `Shanghai Night Markets` —— 开头 emoji 🥲 改 🌃

### 占位图待替换
所有 8 条 Fire & Fuzz 记录的 `Image_URL` 都是 Unsplash 占位图，待生产真图后替换。

---

## 10. 给 Claude Code 的开工清单

实施 Phase 2 的优先级：

1. **最高 P0**: Airtable → Publer CSV 自动生成脚本
   - 输入：Airtable Zapier_Ready 视图
   - 输出：符合 Publer 12 列格式的 CSV 文件
   - 替代当前 Excel 模板手工操作
   - 预计 0.5 天

2. **高 P1**: Wavespeed API 接入图片生成
   - 输入：Airtable 待生成记录的 LoveArt_Prompt_EN
   - 处理：调 Wavespeed → 上传 Supabase
   - 输出：回填 Airtable Image_URL
   - 预计 1.5 天

3. **中 P2**: Kling API 接入视频生成 (等 API 开放)
   - 同 Wavespeed 但视频
   - 预计 2 天

4. **中 P3**: 图片管家 Web 页面（已有 spec）
   - 见 `docs/image-manager-spec.md`
   - 预计 1-2 天

---

**End of Strategy v1**

任何修改请保留版本号 + 日期 + 在 Airtable Internal_Notes 留 trace。
