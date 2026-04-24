# CTS Guide QA 审查工作表
**审查日期:** 2026-04-24  
**审查人:** Zhong  
**周期:** Week 1 of Phase 8

---

## 审查说明

请依次打开每个guide页面，按以下7个维度检查。完成后复制结果给Claude。

### 检查维度

| # | 维度 | 检查点 | 检查方式 |
|---|------|--------|--------|
| 1 | **内容** | 无placeholder文本、无AI生成痕迹、完整的guide信息 | 阅读页面文本 |
| 2 | **图片** | Hero图片加载 ✅、Gallery图片加载 ✅ | F12检查HTTP状态，应该都是200 |
| 3 | **SEO元数据** | Title标签、Meta Description、Schema.org JSON-LD | F12 → Elements → 查看<head>部分 |
| 4 | **响应式** | 桌面显示 ✅、平板显示 ✅、手机显示 ✅ | 用F12切换设备尺寸检查 |
| 5 | **内链** | 内部链接有效、anchor text相关性 | 点击几个关键链接测试 |
| 6 | **CTAs** | "咨询按钮"可点、"查看相关tour"功能正常 | 点击按钮测试 |
| 7 | **性能** | Lighthouse > 85（Performance分数） | 用Chrome DevTools → Lighthouse跑一遍 |

---

## 审查模板

每个guide一份，复制这个模板：

```
### [Guide名称]
**URL:** https://www.ctstours.co.nz/guides/[slug]
**检查时间:** [时间]

| 维度 | 状态 | 备注 |
|------|------|------|
| 1️⃣ 内容 | ✅ / ⚠️ / ❌ | [如果有问题，描述] |
| 2️⃣ 图片 | ✅ / ⚠️ / ❌ | [Hero: ✅] [Gallery: ✅] 或 [哪些图片404] |
| 3️⃣ SEO | ✅ / ⚠️ / ❌ | [Title正确] [Meta完整] [JSON-LD有效] 或 [缺少什么] |
| 4️⃣ 响应式 | ✅ / ⚠️ / ❌ | [桌面✅] [平板✅] [手机✅] 或 [在哪个尺寸有问题] |
| 5️⃣ 内链 | ✅ / ⚠️ / ❌ | [链接正常] 或 [哪个链接坏] |
| 6️⃣ CTAs | ✅ / ⚠️ / ❌ | [按钮可点] 或 [哪个CTA不工作] |
| 7️⃣ 性能 | ✅ / ⚠️ / ❌ | Lighthouse: 88 (如果 < 85 标记⚠️) |

**发现的问题清单:**
- 问题1
- 问题2
- ...
```

---

## 21个Guides清单

### 主要城市 (7)

- [ ] Beijing → /guides/beijing
- [ ] Xi'an → /guides/xian
- [ ] Shanghai → /guides/shanghai
- [ ] Chengdu → /guides/chengdu
- [ ] Guilin → /guides/guilin
- [ ] Zhangjiajie → /guides/zhangjiajie
- [ ] Yunnan → /guides/yunnan

### 云南子页 (4)

- [ ] Lijiang → /guides/lijiang
- [ ] Dali → /guides/dali
- [ ] Kunming → /guides/kunming
- [ ] Shangri-La → /guides/shangri-la

### 国家地标 (4)

- [ ] Great Wall → /guides/great-wall
- [ ] Forbidden City → /guides/forbidden-city
- [ ] Terracotta Warriors → /guides/terracotta-warriors
- [ ] Leshan Buddha → /guides/leshan-buddha

### 地区景点 (6)

- [ ] Yangshuo → /guides/yangshuo
- [ ] Li River → /guides/li-river
- [ ] Hangzhou → /guides/hangzhou
- [ ] Suzhou → /guides/suzhou
- [ ] Chongqing → /guides/chongqing
- [ ] Tianmen Mountain → /guides/tianmen-mountain

---

## 审查开始

### Beijing ✅
**URL:** https://www.ctstours.co.nz/guides/beijing
**检查时间:** 2026-04-24

| 维度 | 状态 | 备注 |
|------|------|------|
| 1️⃣ 内容 | ✅ | 内容完整，无placeholder |
| 2️⃣ 图片 | ✅ | Hero: silk-road-wall.jpg ✅ Gallery: 全部HTTP 200 ✅ |
| 3️⃣ SEO | ⚠️ | Title正确，Meta Description较短（需要扩展） |
| 4️⃣ 响应式 | ✅ | 桌面✅ 平板✅ 手机✅ |
| 5️⃣ 内链 | ✅ | 所有内链有效 |
| 6️⃣ CTAs | ✅ | "咨询按钮"✅ "查看Beijing tours"✅ |
| 7️⃣ 性能 | ✅ | Lighthouse: 92 |

**发现的问题清单:**
- Meta Description字数可以扩展到155-160字符，增加搜索展示

---

## 下一步

完成所有21个guides的审查后：
1. 把结果汇总给Claude
2. Claude生成【问题清单】
3. 启动Phase 9修复
4. 更新Task状态为completed
