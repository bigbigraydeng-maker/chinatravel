# Wave 1 — 28 篇 organic post 排期 + 文案模板

> **目标**：4 周 28 篇 Facebook + Instagram post，Best of China 主推团权重穿透 60-65%
> **预计耗时**：8-12 小时（含 R1 audit + 选题表 + 28 篇文案 + 28 张图描述 prompt）
> **风险等级**：低（不动代码，只产文案 + 图描述）

---

## ⏪ Step 0: R1 业务真实性 audit（必做，先于一切）

参考 README "R1 业务真实性 audit" 章节，先验证 5 个业务点，**结果写到 `docs/me-fb-sprint-2026-06-08/wave1-organic-posts/R1-audit-result.md`** 给 PM 看：

```markdown
# R1 Audit Result (2026-06-08)

## 验证清单结果

| # | 业务点 | 验证 | 可否使用 |
|---|---|---|---|
| 1 | Margaret & John 50th anniversary | 已查 FB Page 60 天 / 问 PM 已授权 | ✅ 可用 / ❌ 替换为通用故事 |
| 2 | 1,200+ Kiwi travellers | 已查 FB Page about / master_brief proof_points | ✅ 真实可用 / ⚠️ 改 "thousands of Kiwis" |
| 3 | Sarah at Zhangjiajie sunrise | 已查 FB Page 历史搜 Sarah | ✅/❌ |
| 4 | Fire & Fuzz Only 4 seats | PM 已确认移除 | ❌ 不写 |
| 5 | 2027 Yunnan Discovery | 已查 tours.ts | ✅/❌ |

## FB Page 风格观察（过去 30 天 / 60 天 post）

- 平均频率: X post/wk
- 主导 pillar: ?
- 文案 tone: ?
- 视觉风格: ?
- 互动率高的 post 共性: ?

## 建议风格调整

PM 已确认按 master_brief 重新定调 — 但要避免突兀。建议：
- 保留 [X 风格元素] 维持品牌连贯
- 调整 [Y 风格元素] 向 master_brief 5 pillar 靠拢
```

⚠️ 5 个业务点 audit **没完成不进 Step 1**。

---

## 📊 Step 1: 28 篇选题表（先给 PM 审稿才能写文案）

按 README 配比：Best of China 主推 60-65% + Oct 两团 20% + 通用品牌 20%。

### 输出格式

```markdown
# 28 篇 organic post 选题表 (W1-W4)

## W1 (6/15-6/21)

| # | Pillar | 类型 | 主推团 | 标题 | 钩子 | 落地链接 |
|---|---|---|---|---|---|---|
| 1 | destination_inspiration | photo essay | Best of China | "5 cities in 15 days — what Best of China actually shows you" | Beijing/Xi'an/Puyuan/Hangzhou/Shanghai 5 张图带过 | /tours/china/discovery/essentials |
| 2 | educational_planning | how-to | Best of China | "Why a 15-day China itinerary beats 10 days (told by someone who's tried both)" | 多 5 天 = Puyuan + West Lake = 不旁征博引 | /tours/china/discovery/essentials |
| 3 | expertise_heritage | brand story | 通用 | "Since 1928. What '98 years of China specialists' really means for your trip" | direct operations 真实含义 | /experts |
| ... | ... | ... | ... | ... | ... | ... |

## W2 (6/22-6/28)
...

## W3 (6/29-7/5)
...

## W4 (7/6-7/12)
...

## Pillar 统计
- destination_inspiration: 10/28 = 35% ✓
- educational_planning: 7/28 = 25% ✓
- expertise_heritage: 6/28 = ~21% ✓
- social_proof_celebration: 4/28 = ~14% ✓ (R1 audit 验证后才能定具体内容)
- promotional_urgency: 1/28 = ~4% ✓

## 主推团权重统计
- Best of China: 18/28 = 64% ✓ (符合 70%+ 目标±)
- Tale of Two Cities: 3/28 = ~11%
- Shanghai & Surroundings: 3/28 = ~11%
- 通用品牌故事: 4/28 = 14%
```

**提交给 PM** 后等他批准，再下手写文案。

---

## 📝 Step 2: 写 28 篇 post 文案（PM 批准选题后）

### 文件落地

每篇 post 一个独立 markdown 文件：

```
docs/me-fb-sprint-2026-06-08/wave1-organic-posts/
├── week1/
│   ├── w1-d1-post01-essentials-5cities.md
│   ├── w1-d2-post02-15days-vs-10days.md
│   ├── w1-d3-post03-since-1928.md
│   ├── w1-d4-post04-...
│   ├── w1-d5-post05-...
│   ├── w1-d6-post06-...
│   └── w1-d7-post07-...
├── week2/...
├── week3/...
└── week4/...
```

### 每篇文件 template

```markdown
# Post W1-D1 #01 — Essentials 5 cities

## Meta
- **Pillar**: destination_inspiration
- **主推**: Best of China (Essentials)
- **CTA URL**: https://www.ctstours.co.nz/tours/china/discovery/essentials
- **发布日**: 2026-06-15 (Sun) 09:00 NZST
- **平台**: Facebook + Instagram (carousel)
- **格式**: 5 张图 carousel + 长文案
- **UTM**: ?utm_source=facebook&utm_medium=organic&utm_campaign=cts_essentials_2026&utm_content=w1d1_5cities

## 文案 (Facebook 主文案 — 800-1200 字符以内)

[文案内容]

主推 Best of China 团信息嵌入：
- 9/3 出发
- NZD $4,539 / 15 天
- Beijing → Xi'an → Puyuan → Hangzhou → Shanghai
- 1928 since heritage 不强调具体数字（除非 R1 audit 通过）

## 文案 (Instagram caption — 2,200 字符以内 + 30 hashtag)

[文案内容 + hashtag]

## 5 张图描述 (carousel)

### 图 1 — Beijing 大召
- 视觉概念: ...
- ChatGPT image prompt: "..."
- 备注: 不出现人脸 (R1 红线)

### 图 2 — Xi'an Terracotta
- ...

[5 张]

## R1 业务真实性 check
- 团名 / 出发日 / 价格 / 行程节点: tours.ts slug='essentials' ✅
- 1928 since: master_brief ✅
- 提到任何客户名 / 团友数: 无 / 有但 R1 验证通过 ✅
- 提到任何团队成员: Baker Gu (master_brief expertise_heritage 已确认) ✅

## 风险点
[列出 reviewer 应该关注什么]
```

### 文案 tone 准则（PM 已批准的 master_brief 风格）

- **destination_inspiration**: 视觉描述 + 文化深度 + 唤起好奇心
- **educational_planning**: 实用 + 解决具体问题 + 不卖团
- **expertise_heritage**: 历史叙事 + 专家身份 + 反 mass-market 立场
- **social_proof_celebration**: 真实客户故事（R1 验证）+ FOMO 暗示
- **promotional_urgency**: 限座 / 早鸟 / 出发日（**R1 红线：数字必须真**）

---

## 🎨 Step 3: 视觉资产策略

### 不要 AI 编人脸

R1 红线：FB post 不允许出现编造的客户 / 团友面孔。
- AI 生成的"客户"面孔 → 不允许
- AI 生成的风景 / 文物 / 建筑 / 街景 → 允许（master_brief visual style: lantern/heritage gold + dusty teal）
- 真实照片来源（CTS 历史 / 客户授权 / stock photo）→ 优先

### ChatGPT image prompts

每篇 post 的图描述写完整的 ChatGPT prompt（参考 ChinaTravel 项目可能有的 `reels-image-prompts` skill），让 PM 直接复制到 ChatGPT 出图。

格式：
```
ChatGPT Image Prompt:
"A misty sunrise over the Mutianyu section of Great Wall, golden light hitting 
the ancient stones, traveler silhouette small in distance (no face visible), 
warm gold and teal color palette, photorealistic editorial style, 16:9 aspect ratio"
```

---

## ✅ Step 4: 提交给 PM 的汇报模板

```markdown
# Wave 1 W1 完成 (2026-06-15 - 06-21)

## 完成
- 7 篇 post 文案落地: docs/me-fb-sprint-2026-06-08/wave1-organic-posts/week1/
- 7 套图描述 ChatGPT prompt 已包含

## R1 audit 状态
- 5 个业务点验证完成: docs/me-fb-sprint-2026-06-08/wave1-organic-posts/R1-audit-result.md
- 未通过验证的业务点: [列表] — 已从 post 移除/替换

## 主推团权重
- Best of China: X 篇
- Tale of Two Cities: Y 篇
- Shanghai & Surroundings: Z 篇
- 通用: W 篇

## Pillar 配比
[5 pillar 实际数量]

## 待 PM review
- [ ] 文案 tone 是否符合 master_brief
- [ ] 5 个 R1 audit 结果是否需要 PM 进一步澄清
- [ ] 图描述 prompt 你是否能直接 ChatGPT 出图

## 下一步
- W2 7 篇 post 是否继续？等 PM 批准
```

---

## ⏭️ 下一步

Wave 1 W1 写完 → PM check → 推进 W2 W3 W4 / 同时启动 Wave 2 paid ads
