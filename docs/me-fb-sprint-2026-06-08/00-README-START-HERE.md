# 📍 START HERE — ME Facebook Sprint (2026-06-08)

> 这是 ChinaTravel 项目里 ME (Magic Engine) 下达的 Facebook 战线启动任务
> **范围**：全套 Facebook 作战 — organic 内容 + paid ads + Lookalike 受众 + Meta Pixel 验证 + Publer 排期
> **当前状态**：PM 已确认 Best of China (Essentials) 是 2026 主推团；Fire & Fuzz 已移除；Token 待 PM 跑 SOP；FB Page 现有 post 风格按 master_brief 重新定调

---

## 🚀 启动提示词（粘贴到新 Claude Code 窗口）

```
我在 ChinaTravel 项目里要做 ME 下达的 Facebook 战线启动任务。完整 spec 在
docs/me-fb-sprint-2026-06-08/ 目录下。

任务规模：全套 Facebook 作战
- C4 organic 内容矩阵（28 篇 post，4 周排期）
- C1 paid ads 创意池（3 个 Campaign 骨架 + 18 个 ad creative）
- Lookalike 受众建立（依赖 CTS 历史客户名单）
- Meta Pixel 健康验证
- Publer 排期发布

**第一步**：读 docs/me-fb-sprint-2026-06-08/00-README-START-HERE.md 理解任务范围
+ 业务约束 + R1 业务真实性验证清单

**第二步**：读 R1 baseline (PM 已拍板)
- 读 docs/me-fb-sprint-2026-06-08/R1-audit-baseline.md
- PM 在 2026-06-08 已经一次性拍板了 5 个业务点 + 1 套通用规则
- **不要重新问 PM 同样的问题** — 直接按 baseline 执行
- 只在以下情况 ping PM:
  1. 发现新业务点不在 baseline 列表 (例如新客户名 / 新数字 / 新出发日)
  2. master_brief 跟 baseline 矛盾 (告诉 PM 但以 baseline 为准)
  3. 选题表 / 每周 post 完成时
- 然后访问 https://www.facebook.com/CTSTOURS/ 看过去 60 天 post 风格 (审视觉 tone)
- 跟 baseline 里 R1 audit pending 的项目 (Margaret&John / Sarah) 验证

**第三步**：跟我确认从哪个 Wave 开始：
- Wave 1: 28 篇 organic post (4 周 / Best of China 70%+) — 不卡 Token，立刻干
- Wave 2: 18 个 paid ad creative — 不卡 Token（creative 本质是内容），但启动需要 Token
- Wave 3: Lookalike + Pixel + Publer 排期（看 PM SOP 进度）

**约束清单**（必读，违反一条 = 整个改动作废）：

1. **R1 业务真实性 — 红线**
   - 任何提到具体客户名 / 具体团友数 / 具体年份数字 / 具体出发日 / 具体价格
     → 必须能在 master_brief 或 src/lib/data/tours.ts 或 src/lib/campaigns/*.ts 找到来源
   - **绝不写编造数据**：例如"剩 4 座 Fire & Fuzz"、"Sarah captured this sunrise"
     等如果你不能证明是真实业务，统统改成通用表述或换主题
   - 不知道就停下问我，不要瞎填

2. **Read before write** — 任何资产生成前，先读：
   - master_brief（content_pillars + keyword_seeds）
   - 当前要推广的 tour data：getTourBySlug('china','discovery','essentials') 主推
     + 'beijing-xian' (Tale of Two Cities) + 'shanghai-surroundings' 辅助
   - src/lib/campaigns/october-2026-discovery.ts (Oct 两团 campaign config)
   - **不要读 src/lib/campaigns/fire-fuzz.ts**（已从本轮推广移除）

3. **Best of China = 2026 主推团**（PM 2026-06-08 拍板）
   - URL: /tours/china/discovery/essentials
   - 出发: 2026-09-03（距今最近最热）
   - 价格: NZD $4,539 / 15 天
   - 行程: Beijing + Xi'an Terracotta + Puyuan 水乡 + Hangzhou 西湖 + Shanghai
   - **28 篇 post 70%+ 主线绕这团**，Oct 两团各占 10%，品牌故事占 10%

4. **Fire & Fuzz 已移除**（PM 2026-06-08 决定不在本轮推广）
   - 不要在任何 post / ad creative / Lookalike 受众里出现 Chongqing / Chengdu / Fire & Fuzz
   - master_brief 里有 example "Only 4 seats left: Fire & Fuzz" 是过时数据，不能用

5. **风格按 master_brief 重新定调**
   - FB Page 现有 post 是旧风格，不参考连贯性
   - 5 pillar 配比走 master_brief：35/25/20/15/5（但 Best of China 主推权重穿透 70%+）

6. **assets 资产管理**
   - 28 篇 post 文案 → 写到 docs/me-fb-sprint-2026-06-08/wave1-organic-posts/
   - ad creative concepts → docs/me-fb-sprint-2026-06-08/wave2-paid-ads/
   - 不要写到 src/ 代码目录 — 这是营销资产不是代码

7. **测试**
   - 不需要跑 npm run build（不涉及代码改动）
   - 但每篇 post / 每个 ad copy 写完，自己读一遍：是否包含编造数据？是否符合 5 pillar？

我的角色：PM。在并行跑 CTS Google Ads (左窗口) + ChinaTravel 落地页 sprint (第三窗口) 
+ ME 后台改动 (子牙窗口)。你跑 Wave 1 独立干，每完成 7 篇 (1 周) 找我汇报一次。
遇到 spec 没写清楚或 R1 不能证明的，停下来列出选项问我，不要自己拍板。
```

---

## 📋 业务约束（PM 已拍板，新窗口必读）

### 2026 推广团池（截至 2026-06-08）

**主推**（70%+ 内容权重）：
- **Best of China (Essentials)** — 9/3 出发，NZD $4,539 / 15 天
- URL: `/tours/china/discovery/essentials`
- 行程: Beijing + Xi'an Terracotta + Puyuan 水乡 + Hangzhou 西湖 + Shanghai
- 团数据: `getTourBySlug('china','discovery','essentials')`

**辅助**（Oct 两团各 10%）：
- **Tale of Two Cities** — 10/15 出发, NZD $3,480 / 10 天, `/campaigns/october-2026/tale-of-two-cities`
- **Shanghai & Surroundings** — 10/14 出发, NZD $3,399 / 10 天, `/campaigns/october-2026/shanghai-surroundings`

**已移除**：
- Fire & Fuzz (Chongqing × Chengdu) — PM 2026-06-08 决定不在本轮推广

### Master Brief 5 Content Pillars（出自 master_brief.content_pillars）

| Pillar | 配比 | 内容类型 |
|---|---|---|
| **destination_inspiration** | 35% (10 posts) | China 景点视觉灵感 — Great Wall sunrise / Terracotta / Beijing hutongs / Hangzhou West Lake / 等 |
| **educational_planning** | 25% (7 posts) | 实用攻略 — visa-free 政策 / best time / 文化礼仪 / 行程对比 |
| **expertise_heritage** | 20% (6 posts) | CTS 1928 历史 + Baker Gu 等专家 + 直营操作优势 |
| **social_proof_celebration** | 15% (4 posts) | 真实客户故事、纪念日庆祝、UGC（**R1 红线：客户名 / 团友数必须能证实**）|
| **promotional_urgency** | 5% (1 post) | 限座 / 早鸟 / 出发提醒（**R1 红线：座位数 / 出发日必须真实**）|

**Best of China 70% 主线穿透**：5 pillar 里都可以有 Best of China 内容，不是只有 promotional pillar。
- destination_inspiration: 9-10 篇 → 至少 6-7 篇围绕 Best of China 5 节点（Beijing / Xi'an / Puyuan / Hangzhou / Shanghai）
- educational_planning: 7 篇 → 至少 4 篇关联 Best of China（"why 15 天" / "Beijing+Xi'an+Hangzhou+Shanghai 路线对比" / "为什么 Puyuan 水乡值得"）
- expertise_heritage: 6 篇 → 至少 3 篇用 Best of China 出发 SH/BJ 上车团友为切入
- social_proof_celebration: 4 篇 → 至少 2 篇绕 Best of China 历史团友（**需 PM 确认有真实案例**）
- promotional_urgency: 1 篇 → Best of China 9/3 出发 spotlight

合计 Best of China 内容： **6+4+3+2+1 = 16-18 篇** (~ 60-65%)
Oct 两团内容：~ 5-6 篇 (~ 20%)
通用品牌故事：~ 5-6 篇 (~ 20%)

### Master Brief 15 真实 keyword_seeds（出自 master_brief.keyword_seeds）

```
china tours from new zealand / china travel specialists nz / great wall tours / 
terracotta warriors xi'an / beijing tours kiwi / china visa free entry nz / 
small group china tours / guilin li river tours / chengdu panda tours / 
zhangjiajie avatar mountains / china cultural tours / shanghai tours from auckland / 
best time visit china / china travel guide new zealanders / authentic china experiences
```

⚠️ **chengdu panda tours / zhangjiajie / guilin** 在 keyword_seeds 但不是本轮主推团 — 可以做 educational content 但不引向 Fire & Fuzz / Yunnan / Zhangjiajie tour pages。

---

## 🚨 R1 业务真实性 audit（新窗口第一件事）

子牙在主窗口已经把 master_brief 全部读完，但 **3 个具体业务点不确定真假**，需要新窗口验证：

### 验证清单（PM 反馈"让新窗口去查"）

| # | 业务点 | 验证方式 |
|---|---|---|
| 1 | **"Margaret & John 50th anniversary surprise in a Beijing courtyard"** | ① 访问 https://www.facebook.com/CTSTOURS/ 搜过去 1 年的 post 看有没有这对客户 ② 问 PM 是否真实授权 ③ 如不能证实 → **不写进 social_proof pillar**，换主题 |
| 2 | **"1,200+ Kiwi travellers since 1928"** | ① 检查 FB Page about section 是否有这数字 ② 检查 master_brief proof_points ③ 如不能证实 → 改用 "since 1928" 不带具体数字 / 改用 "thousands of Kiwi travellers" 模糊表述 |
| 3 | **"Sarah captured this sunrise at Zhangjiajie's Avatar peaks"** (master_brief social_proof example_topic) | ① FB Page 历史搜 Sarah / Zhangjiajie ② 如不能证实 → **不写**，改 destination_inspiration pillar 主题 |
| 4 | **"Only 4 seats left: Fire & Fuzz"** (master_brief promotional example) | **PM 已确认 Fire & Fuzz 移除** — 不写 |
| 5 | **"2027 Yunnan Discovery bookings open Monday"** (master_brief promotional example) | ① 检查 src/lib/data/tours.ts 看有没有 yunnan-discovery / yunnan-explorer 2027 团 ② 问 PM 是不是真业务 ③ 如不能证实 → **不写**，换成 Best of China 9/3 出发 spotlight |

### 检查方法

```bash
# 1. FB Page 历史 post 风格 + 真实客户案例
# 浏览器打开 https://www.facebook.com/CTSTOURS/
# Posts 标签 → 倒序看过去 60 天 post，截图前 10 个

# 2. tour data 真实 tours
Read src/lib/data/tours.ts (找 slug="essentials" / "beijing-xian" / "shanghai-surroundings" 的真实 data)
Read src/lib/data/departure-schedule.ts (找 2026 / 2027 所有 active 出发安排)

# 3. 4 件不确定业务点 → PM 一次问完
列清单给 PM 一次性回答，不要每问一个 chip 一次
```

---

## 📂 任务文件清单

```
docs/me-fb-sprint-2026-06-08/
├── 00-README-START-HERE.md             ← 你正在读这个
├── R1-audit-baseline.md                ⭐ PM 已拍板 R1 baseline，新窗口必读
├── 01-wave1-organic-posts.md           ← Wave 1: 28 篇 organic post 选题 + 文案模板
├── 02-wave2-paid-ads-creative.md       ← Wave 2: 18 个 paid ad creative (3 Campaign × 6)
├── 03-wave3-lookalike-pixel-publer.md  ← Wave 3: Lookalike 受众 + Pixel 验证 + Publer 排期
├── wave1-organic-posts/                ← Wave 1 产出落地（28 篇 post 文案 markdown）
│   ├── week1/                          (W1 7 篇)
│   ├── week2/
│   ├── week3/
│   └── week4/
└── wave2-paid-ads/                     ← Wave 2 产出落地（3 Campaign creative）
    ├── campaign-best-of-china/
    ├── campaign-tale-of-two-cities/
    └── campaign-shanghai-surroundings/
```

---

## 🎯 启动节奏建议

### Phase 1 — R1 audit + Wave 1 启动（今晚-明天）
- 验证 5 个业务点
- 开 Wave 1 28 篇 post 选题表（第一稿）给 PM 审
- PM 批准后开始写第 1 周 7 篇 post 文案 + 图描述

### Phase 2 — Wave 1 推进 + Wave 2 创意池（PM SOP 跑 Token 时并行）
- 第 1 周 post 写完后丢 PM review
- 同时开 Wave 2 创意池（18 个 ad creative 文案 + 图描述）

### Phase 3 — Token 到位后 Wave 3 launch（PM Token 配 Render 后）
- Lookalike 上传
- Pixel 验证
- Publer 排期 / Meta Ads Manager creative 上传
- 6/15 启动 Best of China 主推 + 6/15 Oct 两团转 ACTIVE

---

## 🛑 子牙待命

新窗口启动后，**新窗口 Claude 跟 PM 主线沟通**，子牙在主窗口待命：
- 数据库改动需求 → PM 转给子牙
- 业务点验证 R1 → 新窗口 Claude 直接问 PM
- 跨战线协调 → PM 决定，子牙记录到 ME 数据库
- ME 后台 content engine / visual studio 触发 → 子牙这边操作

---

## 📞 协作模式

- PM 在并行：左窗口 Sonnet (Google Ads) + 子牙主窗口 (ME) + ChinaTravel 落地页窗口 + Facebook 窗口
- Facebook 窗口跑 Wave 1 时独立干，2-3 小时找 PM 汇报一次
- 不要自己拍板 R1 不确定点
- 每完成 Wave 写 summary：写了多少篇、用了哪些真实业务点、哪些没用为啥
