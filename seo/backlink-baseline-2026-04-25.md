# 反链基线报告 + 关键词排名分析
**域名：** ctstours.co.nz  
**数据来源：** Semrush API（AU 数据库）  
**日期：** 2026-04-25  
**用途：** Phase 1 基线存档 + Phase 5 反链建设参考

---

## 一、反链概览

| 指标 | 数值 | 评估 |
|------|------|------|
| Authority Score | **14** | 偏低，竞品通常 25-40，有较大提升空间 |
| 总反链数 | 567 | 数量不少，但质量分散 |
| 来源域数量 | 145 | 平均每域 3.9 条链接 |
| Follow 链接 | 342 (60%) | 比例健康 |
| NoFollow 链接 | 225 (40%) | 主要来自 yellow.co.nz 目录 |

**核心结论：** AS 14 是制约排名的主要瓶颈之一。目标提升至 **AS 25+** 才能在 "china tours" 类竞争词上取得突破。

---

## 二、反链质量分层

### 🟢 A 级：高价值编辑链接（需要维护和复制）

| 来源域 | AS | 类型 | 链接数 | 备注 |
|--------|-----|------|--------|------|
| aucklandnz.com（奥克兰灯节） | 59 | Follow | 3 | NZ 权威活动网站，极高价值 |
| nzherald.co.nz（NZ 先驱报） | 18 | Follow | 6 | NZ 最大媒体，6 篇旅游文章 |
| cccnz.org.nz（NZ 中国商会） | 17 | Follow | 1 | 行业协会，高度相关 |
| tahititourisme.nz（大溪地旅游局） | 14 | Follow | 1 | 旅游局背书，可信度高 |
| elsewhere.co.nz（旅行博客） | 8 | Follow | 1 | 旅游细分内容，相关性强 |

**⚠️ 重要发现：** NZ Herald 的 6 篇文章锚文字均为旧域名 `chinatravel.co.nz`，不是 `ctstours.co.nz`——这些链接的 SEO 价值打折扣，建议联系 NZ Herald 更新链接。

### 🟡 B 级：目录/引用链接（维持即可）

| 来源域 | AS | 类型 | 链接数 | 备注 |
|--------|-----|------|--------|------|
| yellow.co.nz | 10-12 | NoFollow | ~25 | 各地区目录页，品牌引用 |
| hotcity.co.nz（奥克兰市中心协会） | 7 | Follow | ~35 | 锚文字为旧域名，价值受限 |

**注意：** hotcity.co.nz 有 35 条 Follow 链接，但锚文字全是 `www.chinatravel.co.nz`，对 ctstours.co.nz 的排名帮助有限。可联系对方更新。

### 🔴 C 级：垃圾链接（建议 Disavow）

| 来源域 | AS | 类型 | 问题 |
|--------|-----|------|------|
| polaqiawq.blogspot.com | 42 | NoFollow | 明显垃圾博客，无内容 |
| neufeb.blogspot.com | 37 | NoFollow | 垃圾博客 |
| phshiviz.blogspot.com | 36 | NoFollow | 垃圾博客 |
| psysion.blogspot.com | 36 | NoFollow | 垃圾博客 |
| onlinesafetytipsu.blogspot.com | 30 | NoFollow | 垃圾博客 |

虽然都是 NoFollow，但 Google 可能仍会将其纳入质量评估。**建议提交 Disavow 文件**（Google Search Console → 旧版工具 → 拒绝链接）。

---

## 三、关键词排名（AU 数据库）

Semrush AU 数据库仅检测到 **5 个关键词**有排名，全部是品牌词：

| 关键词 | 排名 | 月搜索量(AU) | 说明 |
|--------|------|-------------|------|
| china travel service | 15 | 140 | 品牌词 ✅ |
| china travel service china | 20 | 110 | 品牌词变体 |
| travel agents china | 92 | 50 | 行业词，排名较后 |
| china travel service sydney | 41/50 | 50 | 不相关（非 NZ） |

**重要说明：** 目标关键词（"china tours", "beijing china" 等）在 AU 数据库**均未出现**，原因是：
1. Semrush 对 NZ 市场的爬取覆盖有限（NZ 流量体量较小）
2. NZ 关键词需要通过 **GSC 真实数据** 来追踪，而不是 Semrush

→ 这再次确认了 **#33 GSC API 集成的优先级**——它是追踪真实 NZ 排名的唯一可靠来源。

---

## 四、竞品对比（基于已知信息）

| 指标 | ctstours.co.nz | 目标水平 |
|------|---------------|---------|
| Authority Score | 14 | 25+ |
| 反链来源域 | 145 | 300+ |
| 高质量编辑链接（AS>30） | 2 个域（aucklandnz, nzherald） | 8-10 个域 |
| 媒体提及（DoFollow） | 6 条（NZ Herald） | 20+ 条 |

---

## 五、Phase 5 反链建设机会清单

以下是高价值、可执行的反链获取渠道，按优先级排序：

### P1 — 立即可追的机会

| 机会 | 方式 | 预期 AS | 难度 |
|------|------|---------|------|
| **NZ Herald 旧链接更新** | 联系编辑，将 chinatravel.co.nz 改为 ctstours.co.nz | 18 | 低 |
| **hotcity.co.nz 链接更新** | 联系奥克兰市中心协会更新锚文字 | 7 | 低 |
| **TAANZ（旅行代理商协会）** | 申请成员目录链接：taanz.org.nz | 30+ | 中 |
| **Tourism NZ 合作伙伴目录** | newzealand.com/trade 注册 | 40+ | 中 |

### P2 — 内容驱动的编辑链接

| 机会 | 方式 | 预期 AS | 难度 |
|------|------|---------|------|
| **stuff.co.nz 旅游版块** | 投稿/媒体推广，中国旅游趋势故事 | 35+ | 高 |
| **newshub.co.nz** | 免签政策新闻角度投稿 | 30+ | 高 |
| **NZ Chinese 社区网站** | nzchinese.com, chinesenz.com 目录 | 10-15 | 低 |
| **旅游博客合作** | 联系 elsewhere.co.nz 等 NZ 旅游博主做专题 | 8-15 | 中 |

### P3 — 长期品牌建设

| 机会 | 方式 |
|------|------|
| 赞助 NZ 华人社区活动 | 获得活动网站链接（类似灯节模式） |
| 与 NZ 大学国际学生办公室合作 | 教育机构链接，相关性高 |
| 在 reddit.com/r/newzealand 参与旅行讨论 | 品牌曝光，可能带来自然链接 |

---

## 六、立即行动清单

### Phase 1（本周内，Apr 28 前）
- [ ] 联系 NZ Herald 编辑，请求更新 6 篇文章中的旧链接（从 chinatravel.co.nz 改为 ctstours.co.nz）
- [ ] 联系 hotcity.co.nz 更新目录中的链接和锚文字
- [ ] 准备 Disavow 文件（5 个 blogspot 垃圾域名）
- [ ] 向 TAANZ 提交成员资格申请

### Phase 5（Jun 24 - Jul 7）
- [ ] 执行 P1-P3 反链建设计划
- [ ] 目标：新增 15 条高质量反链（AS > 20 的域名）
- [ ] 目标：AS 从 14 提升至 18+

---

## 七、Disavow 文件（可直接使用）

将以下内容保存为 `disavow.txt` 并上传至 GSC：

```
# CTS Tours Disavow File - 2026-04-25
# 垃圾博客链接拒绝

domain:polaqiawq.blogspot.com
domain:neufeb.blogspot.com
domain:phshiviz.blogspot.com
domain:psysion.blogspot.com
domain:onlinesafetytipsu.blogspot.com
```

上传地址：https://search.google.com/search-console/disavow-links?resource_id=sc-domain%3Actstours.co.nz

---

**报告生成：** 2026-04-25  
**下次更新：** Phase 5 启动时（预计 Jun 24）
