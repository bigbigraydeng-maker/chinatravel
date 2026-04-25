# Spec: /chongqing-travel-guide SEO 优化 — 加入 "chongqing city tour" 关键词

**任务类型：** SEO 优化  
**优先级：** 高  
**预计工时：** 30 分钟  
**执行人：** Claude Code CLI  
**数据来源：** Semrush AU 数据库 2026-04-25

---

## 背景

`chongqing city tour` — AU 数据库 SV 70，KD **17**，当前我们未排名。  
这是 Chongqing/Chengdu Spotlight 线（Fire & Fuzz）目前 Semrush 能找到的**唯一 KD 低于 20 的可攻词**。  
`/chongqing-travel-guide` 页面已有完整内容，只需将目标词植入 meta + 内容结构，成本极低。

---

## 需要修改的文件

### 1. `src/lib/data/guides.ts` — chongqing 条目

#### 1a. `metaTitle` 修改

**当前：**
```
'Chongqing Travel Guide 2025 | Liziba Station, Hongyadong & Things To Do | CTS Tours NZ'
```

**修改为：**
```
'Chongqing City Tour & Travel Guide 2025 | Liziba, Hongyadong, Dazu | CTS Tours NZ'
```

> 原因：将 "city tour" 植入 title tag，同时保留核心地标词。

---

#### 1b. `metaDescription` 修改

**当前：**
```
'Complete Chongqing travel guide: Liziba monorail through a building, Hongyadong cliffside lights, Dazu UNESCO carvings, hot pot, and the 8D cyberpunk city that went viral worldwide.'
```

**修改为：**
```
'Plan your Chongqing city tour: Liziba monorail through a building, Hongyadong cliffside lights, Dazu UNESCO carvings, Sichuan hot pot, and the 8D cyberpunk skyline that took social media by storm. Guided tours from NZ with CTS.'
```

> 原因：首句加入 "Chongqing city tour"，同时保留地标词，结尾加 NZ 地理意图。

---

#### 1c. `keywords` 数组 — 新增两个词

```typescript
keywords: [
  'Chongqing travel guide',
  'Chongqing city tour',       // ← 新增
  'things to do in Chongqing', // ← 新增
  'Liziba Station',
  'Hongyadong',
  'Chongqing things to do',
  'Dazu Rock Carvings',
  'Chongqing tour',
  'cyberpunk Chongqing',
  'Chongqing hot pot',
],
```

---

#### 1d. sections — 在合适位置加一个 H2 含目标词

找到现有 sections 数组，在**最后一个 section 之后、FAQ 之前**，插入一个新 section：

```typescript
{
  title: 'Planning Your Chongqing City Tour',
  content: [
    'A Chongqing city tour typically covers three zones: the Yuzhong Peninsula (city centre, Hongyadong, Jiefangbei), the eastern riverbanks (Liziba Station, Yangtze cableway), and the outlying day trip to Dazu Rock Carvings. Most visitors stay 3–4 nights, which is enough to cover all highlights without rushing.',
    'Getting around is easy — Rail Transit Line 2 connects Liziba, the city centre, and main tourist zones. For Dazu, a guided coach transfer (about 2 hours each way) is the most convenient option. CTS Tours handles all logistics on the Fire & Fuzz 10-day tour, which combines Chongqing with Chengdu via high-speed train.',
    'Best time for a Chongqing city tour: Spring (March–May) and autumn (September–November) offer mild temperatures. Summer is very hot and humid. The famous fog — which makes Hongyadong look even more surreal — is thickest from November through February.',
  ],
},
```

---

### 2. `src/app/chongqing-travel-guide/page.tsx` — 无需修改

页面通过 `getGuideBySlug('chongqing-travel-guide')` 自动读取 guides.ts 数据。meta 修改会自动反映在页面 `<title>` 和 `<meta description>` 中。

---

## 验证步骤

```bash
npm run build
# 确认无错误

# 本地检查 meta
curl -s http://localhost:3010/chongqing-travel-guide | grep -i "chongqing city tour"
# 应在 <title> 和 <meta name="description"> 里各出现一次
```

---

## Git Commit

```bash
git add src/lib/data/guides.ts
git commit -m "seo: add 'chongqing city tour' to meta title, description, keywords and new planning section"
git push origin main
```

---

## 预期效果

- `chongqing city tour` 进入 title tag 和 meta description → Google 将该页面与该词关联
- 新 H2 section 提供词语上下文，增加语义密度
- 4–6 周后 GSC 应出现该词的展示量数据
