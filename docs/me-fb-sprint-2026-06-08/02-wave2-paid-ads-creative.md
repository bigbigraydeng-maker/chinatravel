# Wave 2 — 18 个 paid ad creative (3 Campaign × 6)

> **目标**：18 个 FB Ads creative (3 Campaign 各 6) — Best of China 主推 + Tale of Two Cities + Shanghai & Surroundings
> **预计耗时**：4-6 小时
> **风险等级**：低（creative 本质是内容，启动需要 Token 但内容可先做）

---

## 📊 3 Campaign 结构

| Campaign | 主推团 | 受众 | 预算占比 | Landing |
|---|---|---|---|---|
| **Campaign A — Best of China (Essentials 主推)** | Essentials 9/3 NZD $4,539 | NZ 45-70 文化深度游 + 1% LAL of past 2yr buyers | **60%** (NZD 1,260) | `/tours/china/discovery/essentials` |
| **Campaign B — Tale of Two Cities** | Beijing+Xi'an 10/15 NZD $3,480 | NZ 50-70 culture seekers + lookalike past 2yr | 20% (NZD 420) | `/campaigns/october-2026/tale-of-two-cities` |
| **Campaign C — Shanghai & Surroundings** | Shanghai 10/14 NZD $3,399 | NZ 40-60 first-timer travelers | 20% (NZD 420) | `/campaigns/october-2026/shanghai-surroundings` |

---

## 🎯 18 个 ad creative 分布

每个 Campaign 6 个 creative，分为：

| Creative 类型 | 数量/Campaign | 主线 |
|---|---|---|
| Hero image + lead form | 2 | 主图 + 直接 CTA |
| Carousel (5 张) | 1 | 多节点深度展示 |
| Video (15-30s) | 1 | 行程精华 reel |
| Testimonial / heritage 故事 | 1 | 1928 since / 1,200+ Kiwi (R1 验证后) |
| Urgency / scarcity | 1 | 出发日 / 限座 (R1 验证后) |

**注意：每个 Campaign 6 个 creative，3 Campaign 合计 18 个。**

---

## 📝 文件结构

```
docs/me-fb-sprint-2026-06-08/wave2-paid-ads/
├── campaign-best-of-china/         (6 creative)
│   ├── creative-01-hero-5cities.md
│   ├── creative-02-hero-baker-gu.md
│   ├── creative-03-carousel-5days.md
│   ├── creative-04-video-15s-reel.md
│   ├── creative-05-heritage-1928.md
│   └── creative-06-urgency-sept3.md
├── campaign-tale-of-two-cities/    (6 creative)
└── campaign-shanghai-surroundings/ (6 creative)
```

### 每个 creative 文件 template

```markdown
# Campaign A Creative 01 — Hero: 5 Cities in 15 Days

## Meta
- **Campaign**: Best of China (Essentials 主推)
- **Ad set**: NZ 45-70 文化深度游 + 1% LAL
- **Format**: Single image
- **Objective**: Leads
- **Landing URL**: https://www.ctstours.co.nz/tours/china/discovery/essentials?utm_source=facebook&utm_medium=paid&utm_campaign=cts_essentials_2026&utm_content=A_creative01_5cities
- **预算优先级**: Top 3 内
- **R1 status**: ✅ 已验证

## Primary text (FB Ads primary text, max 125 chars optimal)

[文案]

## Headline (max 27 chars optimal)

[标题]

## Description (max 27 chars optimal)

[描述]

## CTA button

Learn More / Book Now / Get Quote — 选一个

## Image description / prompt

[图描述 + ChatGPT prompt]

## R1 业务真实性 check
- 团名 / 出发日 / 价格: ✅ tours.ts essentials
- 1928 / 1,200+ Kiwi: ✅/⚠️ (audit 状态)
- 客户名 / 团友: 无 / 有 R1 已验证

## A/B variant 建议
[后续可拆的变量]
```

---

## 🎨 视觉资产规则

参考 Wave 1 spec — R1 红线：**不允许 AI 编客户面孔**。
- 风景 / 建筑 / 文物 / 团队 stylized illustration → 允许
- 客户面孔 → 必须真实授权照片
- Baker Gu 等专家 → 如果 master_brief 有真实照片授权 → 用真实

---

## ⚠️ Token 依赖

Wave 2 creative 内容可以**立即写**（不依赖 Token）。但**实际推到 Meta Ads Manager**需要：
- `META_SYSTEM_USER_TOKEN_CTS` 配 Render（PM 跑 Meta SOP）
- ME 后台 Meta Ads API 调用通过

**所以 Wave 2 节奏**：
1. 现在: 写完 18 个 creative md 文件 (4-6 小时)
2. Token 到位后: PM (or 子牙在 ME 后台调 API) 把 creative 推到 Meta Ads Manager 创建 Campaign 骨架 (PAUSED 状态)
3. 6/15 (按 ME 数据库 C1 计划): Campaign 转 ACTIVE

---

## ✅ 提交 PM 的汇报模板

```markdown
# Wave 2 完成 — 18 ad creative

## 完成
- Campaign A Best of China: 6 creative ✅ docs/me-fb-sprint-2026-06-08/wave2-paid-ads/campaign-best-of-china/
- Campaign B Tale of Two Cities: 6 creative ✅
- Campaign C Shanghai & Surroundings: 6 creative ✅

## R1 audit 状态
- Wave 1 R1 audit 结果应用到 Wave 2 ad copy: ✅ 一致
- 新出现的业务点: [列表] — 已验证

## 主推权重
- Campaign A 60% (Best of China 主推)
- Campaign B 20% (Tale of Two Cities)
- Campaign C 20% (Shanghai & Surroundings)

## 待 PM 决策
- [ ] 18 个 creative 文案是否批准
- [ ] 视觉素材 — PM 找设计 / vibe-code / ChatGPT 出图？
- [ ] Token 何时到位（C1 启动卡这）

## 下一步
- 等 Token 到位 → 推 creative 到 Meta Ads Manager
- 或 推进 Wave 3 (Lookalike + Pixel + Publer 排期)
```

---

## ⏭️ 下一步

Wave 2 完成 → PM check → 等 Token → Wave 3 launch
