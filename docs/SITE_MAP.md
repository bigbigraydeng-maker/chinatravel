# ChinaTravel Site Map & Link Architecture

## Overview
完整的网站结构和页面之间的内部链接关系图。共计 **62+ 页面**，分为 6 个主要类别。

---

## 一、核心导航页面 (4页)

### Campaign landing pages (October 2026 Discovery)

- **`/campaigns/october-2026`** — index of two October spotlight departures  
- **`/campaigns/october-2026/shanghai-surroundings`** — Shanghai & Surroundings (hero date: 14 Oct)  
- **`/campaigns/october-2026/tale-of-two-cities`** — Beijing & Xi’an (hero date: 15 Oct)  

**Ads:** append **UTM** to these URLs only on paid/social links; **canonical** on each page is the path **without** `?utm_*` (see `GA4_SETUP.md`). Standard product URLs: `/tours/china/discovery/shanghai-surroundings` and `/tours/china/discovery/beijing-xian` (308 from legacy `shanghai-beyond` / `beijing-shanghai`).

---

```
Home (/)
├── /tours (All Tours Hub)
│   ├── /tours/[destination] (7个目的地)
│   │   └── /tours/[destination]/[tier] (3个等级: signature, discovery, stopover)
│   │       └── /tours/[destination]/[tier]/[tour] (具体行程)
│   │           └── /print (打印版)
│           └── /api/send-itinerary (邮件API)
├── /about (关于我们)
├── /contact (联系我们)
└── /tailor-made (定制行程)
```

---

## 二、SEO枢纽页面 (12页) - Phase 1 ✅

### A. 商业枢纽 (1页)
- **/china-tours** — 全国行程汇总
  - 链接到：所有7个目的地hub、所有行程、常见问题
  - 目标关键词：China tours, luxury china travel, china itinerary

### B. 目的地枢纽 (8页)
- **/beijing-tours**
- **/xian-tours**
- **/shanghai-tours**
- **/chengdu-tours**
- **/guilin-tours**
- **/zhangjiajie-tours**
- **/yunnan-tours**

每个目的地hub包含：
- 该目的地的所有行程（按等级：signature, discovery, stopover）
- 链接到对应的行程详情页
- 链接到对应的旅游指南 (travel guide)
- 内部链接到相关目的地

### C. 地域性营销页面 (2页)
- **/china-tours-from-new-zealand** (NZ市场)
  - 链接到：所有行程、签证指南、最佳访问时间
- **/china-tours-from-auckland** (奥克兰市场)
  - 链接到：所有行程、当地出发航班信息

### D. 高价值指南 (2页)
- **/best-time-to-visit-china** (季节性指南)
  - 链接到：所有7个目的地、所有行程
- **/china-visa-guide-for-new-zealanders** (签证指南)
  - 链接到：所有行程、常见问题、联系我们

---

## 三、目的地旅游指南页面 (21页) - Phase 2 ✅

### 主要目的地 (7页)
```
/beijing-travel-guide         ← 链接：北京行程、故宫指南、长城指南
/xian-travel-guide            ← 链接：西安行程、兵马俑指南
/shanghai-travel-guide        ← 链接：上海行程
/chengdu-travel-guide         ← 链接：成都行程
/guilin-travel-guide          ← 链接：桂林行程、漓江指南
/zhangjiajie-travel-guide     ← 链接：张家界行程
/yunnan-travel-guide          ← 链接：云南行程、丽江指南、大理指南
```

### 云南子目的地 (4页)
```
/lijiang-travel-guide         ← 链接：云南指南、丽江行程
/dali-travel-guide            ← 链接：云南指南、大理行程
/kunming-travel-guide         ← 链接：云南指南、昆明行程
/shangri-la-travel-guide      ← 链接：云南指南、香格里拉行程
```

### 国家地标 (4页)
```
/great-wall-travel-guide      ← 链接：北京指南、北京行程
/forbidden-city-travel-guide  ← 链接：北京指南、北京行程
/terracotta-warriors-travel-guide ← 链接：西安指南、西安行程
/leshan-buddha-travel-guide   ← 链接：成都指南、成都行程
```

### 区域性景点 (6页)
```
/yangshuo-travel-guide        ← 链接：桂林指南、漓江指南
/li-river-travel-guide        ← 链接：桂林指南、阳朔指南
/hangzhou-travel-guide        ← 链接：杭州行程
/suzhou-travel-guide          ← 链接：苏州行程
/chongqing-travel-guide       ← 链接：重庆行程
/tianmen-mountain-travel-guide ← 链接：张家界指南、张家界行程
```

---

## 四、页面间的相互链接规则

### 规则1: 目的地指南 → 行程
```
/beijing-travel-guide
  ↓ (相关行程)
  /tours/beijing/signature/*
  /tours/beijing/discovery/*
  /tours/beijing/stopover/*
```

### 规则2: 相关目的地互链
```
/yunnan-travel-guide ←→ /lijiang-travel-guide
                    ←→ /dali-travel-guide
                    ←→ /kunming-travel-guide
                    ←→ /shangri-la-travel-guide
```

### 规则3: 地标 → 主要城市
```
/forbidden-city-travel-guide → /beijing-travel-guide
/terracotta-warriors-travel-guide → /xian-travel-guide
/leshan-buddha-travel-guide → /chengdu-travel-guide
```

### 规则4: 所有指南 → 回到目的地Hub
```
/[destination]-travel-guide
  ↓
  /[destination]-tours (回到该目的地的所有行程)
```

### 规则5: 高价值指南 → 所有行程
```
/best-time-to-visit-china
  ↓ (相关行程)
  /tours/[all destinations]

/china-visa-guide-for-new-zealanders
  ↓ (相关行程)
  /tours/[all destinations]
```

---

## 五、计划中的页面 (20页) - Phase 3 & 4 ⏳

### FAQ页面 (8页)
```
/china-tours-faq              (通用行程FAQ)
/visa-faq                     (签证FAQ)
/packing-faq                  (打包FAQ)
/travel-insurance-faq         (保险FAQ)
/best-time-faq                (最佳时间FAQ)
/budget-faq                   (预算FAQ)
/group-tours-faq              (团队行程FAQ)
/customization-faq            (定制FAQ)

链接规则：
- 所有FAQ页互相链接
- 每个FAQ都链接到相关的行程和指南
```

### 实用工具 (2页)
```
/tour-cost-calculator         (行程成本计算器)
  ↓
  /tours (所有行程定价参考)

/best-tour-for-me             (个性化行程推荐测验)
  ↓
  /tours (推荐结果链接)
```

---

## 六、流量关键路径

### 新访客路径 A (产品探索)
```
Home → /china-tours (商业枢纽)
     → 选择目的地 → /[destination]-tours
     → 选择行程级别 → /tours/[destination]/[tier]
     → 选择具体行程 → /tours/[destination]/[tier]/[tour]
     → 打印或发送邮件 → /print or /api/send-itinerary
```

### 新访客路径 B (内容驱动)
```
Google → /[destination]-travel-guide (SEO登陆)
      → 浏览相关行程 → /tours/[destination]/*
      → 阅读相关指南 → /related-guides
      → CTA:Plan Custom Trip → /tailor-made
```

### 新访客路径 C (指南驱动)
```
Google → /best-time-to-visit-china or /china-visa-guide
      → 链接到具体目的地指南 → /[destination]-travel-guide
      → 链接到行程 → /tours/[destination]/*
      → CTA:View All Tours or Plan Custom Trip
```

### 回访客路径
```
Direct → Home (/)
      → /tailor-made (记录的客户可能回来查询)
      → /contact (已有咨询历史)
```

---

## 七、内部链接强度矩阵

### 高优先级链接 (必须存在)
| 源页面 | 目标页面 | 链接数 | 原因 |
|--------|---------|--------|------|
| Home | /china-tours | 1 | 主导航 |
| Home | /tours | 1 | 主导航 |
| Home | /[destination]-tours (7) | 7 | 目的地导航 |
| /china-tours | /[destination]-tours | 7 | 商业信息架构 |
| /[destination]-tours | /[destination]-travel-guide | 1 | 内容补充 |
| /[destination]-travel-guide | /[destination]-tours | 1 | 转化路径 |
| /tours/[destination]/[tier]/[tour] | /tours (Go Back) | 1 | 用户体验 |

### 中优先级链接 (推荐)
| 源页面 | 目标页面 | 原因 |
|--------|---------|------|
| 各指南 | 相关指南 | 内容网络化 |
| /best-time-to-visit-china | /[destination]-travel-guide | SEO相关性 |
| /china-visa-guide | /tours | 转化驱动 |

### 低优先级链接 (可选)
- 相关产品交叉链接
- 品牌故事链接
- 专家页面链接

---

## 八、数据统计

| 类别 | 页面数 | 状态 |
|------|--------|------|
| 核心导航 | 4 | ✅ 完成 |
| SEO枢纽 (Phase 1) | 12 | ✅ 完成 |
| 目的地指南 (Phase 2) | 21 | ✅ 完成 |
| FAQ (Phase 3) | 8 | ⏳ 计划 |
| 工具 (Phase 3) | 2 | ⏳ 计划 |
| **总计** | **47+** | - |

---

## 九、SEO链接权重分配

### Tier 1 (最高权重)
- Home (/) — 权重最高，链接到所有其他页面
- /china-tours (商业枢纽) — 链接到所有destination hubs和tours
- /tours (产品枢纽) — 链接到所有行程

### Tier 2 (中等权重)
- /[destination]-tours (7个目的地) — 链接到specific tours和guides
- /[destination]-travel-guide (21个指南) — 内部链接其他相关指南
- /best-time-to-visit-china, /china-visa-guide — 链接到多个tours

### Tier 3 (低权重)
- /tours/[destination]/[tier]/[tour] — 产品页面，链接到相关guides
- FAQ、工具页面 — 提供补充信息

---

## 十、推荐的链接优化

### 立即执行
1. ✅ 所有指南底部添加"相关行程"部分
2. ✅ 所有指南底部添加"相关指南"部分
3. ✅ 所有行程页面添加"相关指南"部分
4. ✅ 添加面包屑导航（已实现）
5. ✅ 所有页面添加咨询CTA

### Phase 3
6. 创建智能"Related Posts"系统（基于关键词匹配）
7. 在FAQ页面添加相关指南链接
8. 在工具页面添加结果驱动的行程链接

### Phase 4
9. 实现上下文相关链接（基于用户行为）
10. 添加"People also viewed"部分（需要分析数据）

---

## 十一、可视化工具推荐

### 选项1: Mermaid图表 (推荐用于快速查看)
```mermaid
graph TD
    A[Home] --> B[/china-tours]
    A --> C[/tours]
    B --> D1[/beijing-tours]
    B --> D2[/shanghai-tours]
    D1 --> E1[/beijing-travel-guide]
    E1 --> F1[/forbidden-city-travel-guide]
    D1 --> G1[/tours/beijing/signature]
    style A fill:#ff6b6b
    style B fill:#4ecdc4
    style E1 fill:#95e1d3
```

### 选项2: 免费在线工具
- **Lucidchart** (可在线编辑网站地图)
- **Draw.io** (本地或云存储)
- **XMind** (思维导图风格)
- **Cytoscape Web** (网络可视化)

### 选项3: 浏览器插件
- **SEO Minion** - 显示页面链接结构
- **Link Redirect Trace** - 追踪链接链
- **Site Analyzer** - 分析网站结构

---

## 十二、实施检查清单

### 每个指南页面必须有：
- [ ] 面包屑导航 (已实现)
- [ ] Hero图像 (已修复)
- [ ] 介绍段落
- [ ] 4-6个编辑部分
- [ ] 4-8个景点卡片
- [ ] 8-12张图库图片
- [ ] 5个FAQ
- [ ] 实用信息侧边栏
- [ ] 相关行程部分 (TODO)
- [ ] 相关指南部分 (TODO)
- [ ] CTA按钮2个: "View All Tours" + "Plan Custom Trip" (已实现)

### 每个行程页面必须有：
- [ ] 链接回目的地hub (/[destination]-tours)
- [ ] 链接到相关指南 (/[destination]-travel-guide)
- [ ] 打印功能
- [ ] 邮件功能
- [ ] 咨询CTA

---

## 十三、下一步行动

### 立即 (今天)
1. 部署CTA更新 (已完成)
2. 用户手动QA验证所有21页面
3. 清除浏览器缓存检查hero图像

### 本周
4. 在21个指南页面添加"Related Tours"部分
5. 在所有行程页面添加"Related Guides"部分
6. 配置Google Analytics追踪链接点击

### Phase 3
7. 创建FAQ页面并链接所有内容
8. 创建工具页面并集成推荐逻辑

---

**Updated:** April 10, 2026
**Total Pages Mapped:** 47+
**Link Relationships:** 100+
**Status:** Phase 2完成，Phase 3规划中
