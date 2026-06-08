# R1 业务真实性 Baseline (2026-06-08 PM 已确认)

> 这是 **PM 直接拍板的 R1 baseline**，新窗口 Claude 不要再问 PM 同样问题。
> 后续遇到新业务点 (新客户名 / 新数字 / 新出发日) 才需要 PM 验证。
>
> **重要**：master_brief 已经按这里的判定**校准过**（2026-06-08）。如果你看到任何跟这里不一致的 master_brief example_topics，**以本文档为准**。

---

## ✅ PM 已拍板的业务点 (5 + 通用)

### 1. Fire & Fuzz (Chongqing-Chengdu)

- **状态**: 真实业务，但**已从本轮推广退场**
- **后果**: 
  - ❌ 不写进 28 篇 organic post
  - ❌ 不写进 18 个 paid ad creative
  - ❌ Lookalike / Pixel 不针对这团做受众
  - ⚠️ master_brief promotional_urgency pillar 原 example "Only 4 seats left: Fire & Fuzz" 已删除
- **替换**: Best of China 9/3 出发 或 Oct 两团 (Tale of Two Cities / Shanghai & Surroundings)

### 2. 2027 Yunnan Discovery

- **状态**: **示例占位** — 从来没真实跑过
- **后果**:
  - ❌ 不写进任何 post / ad creative
  - ❌ 不引用 "2027 Yunnan Discovery"
  - ⚠️ master_brief promotional_urgency pillar 原 example 已删除
- **替换**: 改用 **2027 Silk Road Discovery** (这条 master_brief brand_name 历史 + tour 数据有真实 2027 Silk Road 团 docx 文件) — 但**新窗口先验证 tour data 里有 silk-road slug 再用**

### 3. "1,200+ Kiwi travellers" 具体数字

- **状态**: 数字**估算 / 不准 / 别在 FB post 里强调**
- **后果**:
  - ❌ 不写 "1,200+ Kiwi" / "1,200+ travellers" / 任何具体数字
  - ❌ 不写 ".... since 1928" + 具体客户数组合 (例如 "Since 1928 we've helped 1,500 Kiwis...")
  - ✅ 可以用模糊表述: "thousands of Kiwi travellers" / "thousands of Kiwis" / "generations of Kiwi families"
  - ✅ "since 1928" 单独使用 OK (这是公司成立时间真实)
- **替换示例**:
  - ❌ "1,200+ Kiwi travellers trusted us"
  - ✅ "Thousands of Kiwi travellers have trusted us since 1928"
  - ✅ "Generations of Kiwi families have chosen CTS for their China adventure"

### 4. "Margaret & John 50th anniversary in a Beijing courtyard"

- **状态**: **R1 audit pending** (PM 没确认真假，让新窗口去查)
- **新窗口必做**:
  - 访问 https://www.facebook.com/CTSTOURS/
  - 历史 post 搜 "Margaret" / "anniversary" / "50th" → 看有没有这对真客户
  - 问 PM 是否真实并授权 (一次性问，不要重复)
- **PM 未确认前**:
  - ❌ 不写到 28 篇 organic post 或 ad creative
  - ✅ 可以用通用 "anniversary celebrations in heritage cities" 等模糊概念

### 5. "Sarah captured Zhangjiajie sunrise"

- **状态**: **R1 audit pending** (PM 没确认真假)
- **新窗口必做**: 同上
- **PM 未确认前**: 同上不写

### 6. (通用) 1928 / 98 years

- **状态**: ✅ **真实**，可用
- **使用**: "Since 1928" / "98 years of China specialists" / "NZ's longest-running China travel specialist" 都 OK

### 7. (通用) Baker Gu "20+ years specialist"

- **状态**: ✅ master_brief 已确认是真实专家
- **使用**: "Meet Baker Gu" / "20+ years crafting China tours" 都 OK

### 8. (通用) Direct on-ground China operations

- **状态**: ✅ master_brief core_proposition 已确认是真实差异化
- **使用**: 反 mass-market 立场可以放心用

---

## 📋 2026 推广团池 (PM 已拍板，2026-06-09 校准)

**主推**:
- **Best of China (Essentials)** — **11/3 出发 NZD $3,880 per person / 15 天**
- URL: `/tours/china/discovery/essentials`
- 行程: Beijing + Xi'an Terracotta + Puyuan 水乡 + Hangzhou 西湖 + Shanghai
- ⚠️ **2026-06-09 修正**：原 R1 baseline 写 9/3 出发 + $4,539 是错的，FB Sprint grep tours.ts 校正

**辅助 Oct 两团**:
- **Tale of Two Cities** (Beijing+Xi'an) — 10/15 出发 NZD $3,480 / 10 天
- **Shanghai & Surroundings** — 10/14 出发 NZD $3,399 / 10 天

**已移除**:
- Fire & Fuzz (Chongqing × Chengdu) — 真实业务但本轮退场

**待 audit (可能真也可能占位)**:
- 2027 Silk Road Discovery — tour data 有 docx，需新窗口验证 slug 是否在 tours.ts
- 2027 Yunnan Discovery — 占位，不用

---

## 🎯 R1 红线 (新窗口必背)

### 必背 5 条

1. **数字红线**: 不写具体客户数 ("1,200+" 等)，用模糊表述
2. **客户名红线**: Margaret&John / Sarah 等具体客户名 audit 通过才能用
3. **出发日红线**: 只用真实 tour data 的出发日 (Best of China 9/3 / Tale of Two Cities 10/15 / Shanghai 10/14)
4. **价格红线**: 只用 src/lib/data/tours.ts + src/lib/campaigns/october-2026-discovery.ts 真实价
5. **团名红线**: 只用 PM 拍板的 3 团 (Best of China + Tale of Two Cities + Shanghai & Surroundings)，不写 Fire & Fuzz / Yunnan / Zhangjiajie tour names

### 遇到新业务点 (不在本文档列表) 的判定流程

```
新业务点出现 (例如某个新客户名 / 某个新数字 / 某个新出发日)
   ↓
能在 master_brief / tours.ts / campaign config 找到来源？
   ├── 是 → ✅ 可用
   └── 否 → ⚠️ 必须 audit:
              1. 查 FB Page 历史 post 有没有
              2. 一次性列清单问 PM
              3. PM 确认前 → 不写，用通用替换
```

### 不要再问 PM 第二遍

PM 已经在 2026-06-08 答过的，本文档已落地。新窗口遇到这些**直接按本文档执行**，不要重新问。

---

## 📊 28 篇 Post Pillar 配比 (master_brief 原)

| Pillar | 配比 | Best of China 主线穿透 |
|---|---|---|
| destination_inspiration | 35% (10 posts) | 6-7 篇绕 Best of China 5 节点 |
| educational_planning | 25% (7 posts) | 4 篇关联 Best of China |
| expertise_heritage | 20% (6 posts) | 3 篇切入 Best of China |
| social_proof_celebration | 15% (4 posts) | 2 篇绕 Best of China (R1 audit 通过后) |
| promotional_urgency | 5% (1 post) | 1 篇 Best of China spotlight |

**Best of China 主线穿透合计**: 16-18 篇 ≈ 60-65%
**Oct 两团内容**: 5-6 篇 ≈ 20%
**通用品牌故事**: 4-6 篇 ≈ 15-20%

---

## 🔁 PM 信任路径

PM 通过本文档**一次性**拍板了 5 个具体业务点 + 1 套通用规则。新窗口不再 ping PM 重复同样问题。

新窗口只在以下情况 ping PM：
1. 发现新业务点不在本文档列表
2. master_brief 跟本文档**矛盾** (本文档为准但要告诉 PM)
3. Wave 1 选题表完成 → PM review
4. Wave 1 每周 7 篇 post 完成 → PM review
