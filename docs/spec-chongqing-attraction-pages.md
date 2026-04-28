# Spec: 重庆两个景点专项页 + 打包清单

**任务类型：** 新 SEO 专项页 × 2  
**优先级：** 高（Fire & Fuzz SEO 集群完整化）  
**预计工时：** 4–5 小时（两页合并执行）  
**执行人：** Claude Code CLI  
**数据来源：** master brief t045 + 关键词竞品分析 2026-04-25

---

## 整体背景

这两个页面和 `/chengdu-panda-sanctuary` 构成 **Fire & Fuzz SEO 三件套**：

| 页面 | 目标词 | 竞品格局 | 产品导向 |
|------|--------|---------|---------|
| `/chengdu-panda-sanctuary` | chengdu panda sanctuary (SV 320) | #1 非旅游商 | Fire & Fuzz Day 7 |
| `/liziba-station-chongqing` | liziba station chongqing | #1 媒体报道 | Fire & Fuzz Day 1 |
| `/hongyadong-chongqing` | hongyadong chongqing | TripAdvisor 为主 | Fire & Fuzz Day 4 |

三页上线后，任何搜索 Chongqing/Chengdu 具体景点的 NZ/AU 用户，都会命中 CTS 页面并看到 Fire & Fuzz CTA。

---

---

# 页面 1：/liziba-station-chongqing

## 背景

Liziba Station（李子坝站）是全球唯一一座建在居民楼内部的轻轨站，列车穿越一栋19层住宅楼的6–8层运行。被 BBC、CNN、National Geographic 等媒体广泛报道，是重庆最高传播量的城市奇观。

**核心机会：** 搜索词竞品全部是媒体报道页（BBC、Time、ViralNova），没有任何旅游商建过专项落地页。

---

## Meta 数据

### `title`
```
Liziba Station Chongqing: The Train That Runs Through a Building | CTS Tours NZ
```

### `description`
```
Liziba Station in Chongqing is the world's only monorail station built inside a residential tower — trains pass through the 6th floor of a 19-storey building. How to visit, best viewing spots, and how to include it in a Chongqing tour from New Zealand.
```

### `h1`
```
Liziba Station, Chongqing: A Complete Visitor Guide
```

---

## 页面结构

### Hero
- Title: `h1` 如上
- Subtitle: `The world's only monorail station inside a residential building · Chongqing Rail Transit Line 2 · Free to watch from street level`
- Hero image: Supabase `tour-images/chongqing-travel-guide.jpg` 或 `chongqing-night-skyline-hongyadong.jpg`（暂用，后续替换为 Liziba 专属图）

### Intro（约200词）

内容要点：
- 正式名称：李子坝站（Lǐzǐbà Zhàn），重庆轨道交通2号线
- 建成时间：2004年3月竣工，2005年6月通车
- 结构：跨座式单轨，站台建于19层住宅楼的6–8层，楼下为商业空间，楼上为居民住宅
- 低噪音橡胶轮胎设计，对住户干扰极低
- 重庆极端地形（山地城市）和高密度建设的产物——非改建，建筑与车站同步建造
- 每天有大量游客在街头观看，也可以直接乘坐列车穿越体验

### 实用参观信息（卡片区）

| 项目 | 内容 |
|------|------|
| 地址 | 重庆市渝中区李子坝正街 |
| 轨道交通 | 2号线 李子坝站 |
| 观看费用 | 免费（街头观看）；乘车需购票约 CNY 4 |
| 最佳观看位置 | 李子坝站下方街道（设有专属观景区） |
| 列车频率 | 约5–10分钟一班 |
| 建议停留 | 30–60分钟（等待2–3班次，拍照） |
| 最佳时段 | 下午3–6时（光线好，人流适中）|
| 周边 | 步行可达磁器口古镇（约20分钟） |

### What Makes It Unique（内容区块）

- 全球唯一建在住宅楼内的轨道交通站
- 建筑与车站同步建造（非改建），工程奇迹
- 低噪音橡胶轮胎系统让楼内住户几乎感受不到振动
- 重庆"魔幻山城"城市规划的缩影：地形限制倒逼建筑创新

### CTS Tour CTA Section

标题：**See Liziba Station as Part of Our Chongqing & Chengdu Tour**

内容：
- Fire & Fuzz 行程 Day 1 下午安排 Liziba 参观（含专业导览解说）
- 10天，NZD $2,999 起
- 同线还包含：洪崖洞、大足石窟 UNESCO、大熊猫基地、高铁城际
- 按钮：`View Fire & Fuzz Itinerary →` → `/tours/china/discovery/chongqing-chengdu`

### FAQ Section

```typescript
faqs: [
  {
    question: 'What is Liziba Station in Chongqing?',
    answer: 'Liziba Station (李子坝站) is a monorail station on Chongqing Rail Transit Line 2 that is built directly inside a 19-storey residential and commercial tower. Trains on Line 2 pass through the 6th to 8th floors of the building at regular intervals. It is the only station of its kind in the world, and has become one of Chongqing\'s most photographed attractions.'
  },
  {
    question: 'How do I get to Liziba Station Chongqing?',
    answer: 'Take Chongqing Rail Transit Line 2 directly to Liziba Station — the station itself is the attraction. Alternatively, walk to the observation area on the street below the station (Li Zi Ba Zheng Jie) to watch trains passing through the building from the outside. The street-level viewing area is free and clearly signposted.'
  },
  {
    question: 'Is Liziba Station free to visit?',
    answer: 'Watching from the street-level observation area is completely free. To ride the train through the building, you need a standard Chongqing Metro ticket (approximately CNY 4, roughly NZD 1). Most visitors combine both — watching from outside first, then riding through to experience it from inside the train.'
  },
  {
    question: 'Why was Liziba Station built inside a building?',
    answer: 'Chongqing is a mountainous city with extremely limited flat land. The station was co-constructed with the building simultaneously in 2004 — not retrofitted — as a solution to the city\'s terrain constraints and high urban density. The trains use rubber tyres rather than steel wheels, significantly reducing noise and vibration for building residents.'
  },
  {
    question: 'Is Liziba Station included in CTS tours?',
    answer: 'Yes. Liziba Station is one of the signature experiences in CTS Tours\' Fire & Fuzz 10-day Chongqing and Chengdu Discovery tour. Day 1 includes a guided visit to Liziba, with time to watch from the observation area and ride through on the train. The guide provides full context on why the station was built this way and what makes Chongqing\'s urban planning so distinctive.'
  },
  {
    question: 'What else is near Liziba Station?',
    answer: 'Ciqikou Ancient Town (磁器口), a well-preserved Song Dynasty commercial street known for Sichuan street food and traditional crafts, is approximately a 20-minute walk from Liziba. Hongyadong, the iconic illuminated clifftop complex, is about 3km away and best visited after dark. Both are included in the Fire & Fuzz itinerary.'
  }
]
```

### Schema
- `WebPage` + `BreadcrumbList` + `FAQPage`
- Breadcrumbs: `Home → Tours → China → Chongqing → Liziba Station`

---

## 需要创建/修改的文件

### 1. `src/lib/data/seo-pages.ts`

新增（在 `chengduPandaSanctuaryMeta` 之后）：

```typescript
export const lizibastationChongqingMeta: SeoPageMeta = {
  slug: 'liziba-station-chongqing',
  title: 'Liziba Station Chongqing: The Train That Runs Through a Building | CTS Tours NZ',
  description: 'Liziba Station in Chongqing is the world\'s only monorail station built inside a residential tower — trains pass through the 6th floor of a 19-storey building. How to visit, best viewing spots, and how to include it in a Chongqing tour from New Zealand.',
  h1: 'Liziba Station, Chongqing: A Complete Visitor Guide',
  heroSubtitle: 'The world\'s only monorail station inside a residential building · Chongqing Rail Transit Line 2 · Free to watch from street level',
  introText:
    'Liziba Station (李子坝站) is one of the most extraordinary pieces of urban infrastructure on earth. A working monorail station on Chongqing Rail Transit Line 2, it is built directly inside the 6th to 8th floors of a 19-storey residential and commercial tower in Yuzhong District. Trains pass through the building multiple times per hour. Residents live above and below the tracks. The building was co-constructed with the station simultaneously in 2004 — not retrofitted — as an engineering solution to Chongqing\'s mountainous terrain and extreme urban density.\n\nThe station has become one of China\'s most viral travel images, featured by BBC, CNN, National Geographic, and virtually every major travel publication. Low-noise rubber-tyred trains mean residents are minimally disturbed — the system works, and has worked continuously since it opened in June 2005.\n\nFor visitors, the experience works on two levels: watching from the dedicated street-level observation area as trains glide through the building above, and riding Line 2 through the station to experience it from inside the train. CTS Tours includes a Liziba visit on Day 1 of the Fire & Fuzz Chongqing and Chengdu tour.',
  faqs: [
    {
      question: 'What is Liziba Station in Chongqing?',
      answer: 'Liziba Station (李子坝站) is a monorail station on Chongqing Rail Transit Line 2 that is built directly inside a 19-storey residential and commercial tower. Trains pass through the 6th to 8th floors of the building at regular intervals. It is the only station of its kind in the world, and has become one of Chongqing\'s most photographed attractions.'
    },
    {
      question: 'How do I get to Liziba Station Chongqing?',
      answer: 'Take Chongqing Rail Transit Line 2 directly to Liziba Station — the station itself is the attraction. Alternatively, walk to the observation area on the street below the station (Li Zi Ba Zheng Jie) to watch trains passing through the building from the outside. The street-level viewing area is free and clearly signposted.'
    },
    {
      question: 'Is Liziba Station free to visit?',
      answer: 'Watching from the street-level observation area is completely free. To ride the train through the building, you need a standard Chongqing Metro ticket (approximately CNY 4, roughly NZD 1). Most visitors combine both — watching from outside first, then riding through to experience it from inside the train.'
    },
    {
      question: 'Why was Liziba Station built inside a building?',
      answer: 'Chongqing is a mountainous city with extremely limited flat land. The station was co-constructed with the building simultaneously in 2004 — not retrofitted — as a solution to the city\'s terrain constraints and high urban density. The trains use rubber tyres rather than steel wheels, significantly reducing noise and vibration for building residents.'
    },
    {
      question: 'Is Liziba Station included in CTS tours?',
      answer: 'Yes. Liziba Station is one of the signature experiences in CTS Tours\' Fire & Fuzz 10-day Chongqing and Chengdu Discovery tour. Day 1 includes a guided visit to Liziba, with time to watch from the observation area and ride through on the train. The guide provides full context on why the station was built this way and what makes Chongqing\'s urban planning so distinctive.'
    },
    {
      question: 'What else is near Liziba Station?',
      answer: 'Ciqikou Ancient Town (磁器口), a well-preserved Song Dynasty commercial street known for Sichuan street food, is approximately a 20-minute walk from Liziba. Hongyadong, the iconic illuminated clifftop complex, is about 3km away and best visited after dark. Both are included in the Fire & Fuzz itinerary.'
    }
  ]
};
```

### 2. `src/app/liziba-station-chongqing/page.tsx`
基于 `/china-tours-from-new-zealand/page.tsx` 模板，加入实用参观信息卡片区（同 chengdu-panda-sanctuary 结构）。

### 3. `src/app/sitemap.ts`
在 `hubPages` 数组加入 `'liziba-station-chongqing'`

### 4. `src/lib/data/guides.ts`
在 `chongqing-travel-guide` 的相关链接中加入内链：
`{ label: 'Liziba Station — The Train Through a Building', href: '/liziba-station-chongqing' }`

---

---

# 页面 2：/hongyadong-chongqing

## 背景

洪崖洞（Hongyadong）是重庆的标志性夜景——11层吊脚楼式建筑群，依崖而建，入夜后万灯齐亮，被誉为"现实版千与千寻"。是 Instagram/小红书传播量最高的重庆画面，也是 Fire & Fuzz 行程的视觉主角。

**核心机会：** 竞品以 TripAdvisor、Expedia 为主，均为通用目录页，无旅游商专项内容页。CTS 可用深度内容+产品导向页填补这个空白。

---

## Meta 数据

### `title`
```
Hongyadong Chongqing: The Cliffside Night Market That Looks Like a Miyazaki Film | CTS Tours NZ
```

### `description`
```
Hongyadong is Chongqing's most iconic landmark — an 11-storey stilted building complex glowing on the clifftop above the Jialing River. Best visited after dark. Complete visitor guide plus how to see it as part of a Chongqing tour from New Zealand.
```

### `h1`
```
Hongyadong, Chongqing: Visitor Guide to the Clifftop Night Market
```

---

## 页面结构

### Hero
- Title: `h1` 如上
- Subtitle: `11-storey cliffside complex · Best after dark · The defining image of Chongqing`
- Hero image: `public/blog/chongqing-night-skyline-hongyadong.jpg`（本地已有）

### Intro（约200词）

内容要点：
- 洪崖洞（Hóng Yá Dòng）是重庆渝中区嘉陵江畔的标志性建筑群
- 吊脚楼（diaojiaolou）传统建筑风格，直接建于崖壁之上
- 11层楼，内含餐厅、酒吧、茶馆、纪念品店，多层之间以楼梯和电梯连接
- 日落后亮灯，红金两色灯光覆盖整栋建筑，配合江水倒影，极具层次感
- 最佳拍摄位置：千厮门大桥（Qiansimen Bridge）对岸，可看全景
- 常被比作宫崎骏动画《千与千寻》中的汤屋，是全球传播最广的重庆画面之一

### 实用参观信息（卡片区）

| 项目 | 内容 |
|------|------|
| 地址 | 重庆市渝中区嘉陵江滨江路88号 |
| 开放时间 | 全天开放（商家营业至约22:00）|
| 入场费 | 免费入场 |
| 最佳时段 | 日落后（约19:00–22:00），灯光全开 |
| 最佳拍摄点 | 千厮门大桥（步行约10分钟） |
| 建议停留 | 1.5–2小时 |
| 周边 | 解放碑步行街（步行约10分钟）、江上夜游船 |
| 轨道交通 | 1/6号线 小什字站，步行约8分钟 |

### The Miyazaki Connection（内容区块）

- 2019年，日本网友在社交媒体发现洪崖洞与《千与千寻》汤屋的相似性，帖子病毒式传播
- 吉卜力工作室从未官方确认，但视觉相似度极高：层叠的灯光窗户、依水而建的结构、蒸腾的烟火气
- 这一比较为重庆带来了大量日本、韩国及欧美游客，推动重庆成为中国增长最快的旅游目的地之一

### 夜游建议（Evening Itinerary Suggestion）

建议与火锅晚餐组合：
1. 18:30 解放碑附近的正宗重庆火锅（CTS 导游推荐本地馆子）
2. 20:00 步行至洪崖洞，内部探索 + 千厮门大桥拍摄全景
3. 21:00 可选：嘉陵江夜游船（45–60分钟，从江面看洪崖洞+全城夜景）

> Fire & Fuzz 行程 Day 4 晚上安排洪崖洞夜游，含嘉陵江夜游船。

### CTS Tour CTA Section

标题：**See Hongyadong After Dark on Our 10-Day Chongqing & Chengdu Tour**

内容：
- Fire & Fuzz Day 4 晚上包含洪崖洞 + 嘉陵江夜游船
- 10天，NZD $2,999 起
- 同线包含：李子坝穿楼地铁、大足石窟 UNESCO、大熊猫基地、高铁
- 按钮：`View Fire & Fuzz Itinerary →` → `/tours/china/discovery/chongqing-chengdu`

### FAQ Section

```typescript
faqs: [
  {
    question: 'What is Hongyadong in Chongqing?',
    answer: 'Hongyadong (洪崖洞) is an 11-storey stilted building complex built directly into the clifftop above the Jialing River in central Chongqing. It houses restaurants, bars, teahouses, and shops across multiple levels, connected by stairs and lifts. The complex is famous for its spectacular night lighting — thousands of red and golden lights that illuminate the cliffside after dark, making it the most photographed landmark in Chongqing.'
  },
  {
    question: 'When is the best time to visit Hongyadong?',
    answer: 'After dark — ideally between 7:30pm and 10:00pm. The full lighting effect is only visible once the sun goes down, and the reflection in the Jialing River adds a second layer to the visual. The complex itself is open all day, but daytime visits miss the defining atmosphere entirely. CTS Tours schedules the Hongyadong visit on Day 4 evening, after a full day in the city.'
  },
  {
    question: 'Is Hongyadong like Spirited Away?',
    answer: 'Many visitors, particularly from Japan and South Korea, have noted the strong visual similarity between Hongyadong and the bathhouse in Studio Ghibli\'s Spirited Away — the layered glowing windows, the cliffside water setting, and the overall atmosphere. Studio Ghibli has never officially confirmed any connection, but the comparison went viral in 2019 and significantly boosted Chongqing\'s international tourism profile.'
  },
  {
    question: 'Where is the best viewpoint for Hongyadong?',
    answer: 'The best full-building view is from Qiansimen Bridge (千厮门大桥), approximately a 10-minute walk from Hongyadong. From the bridge, you can see the entire 11-storey lit facade reflected in the Jialing River. For a different perspective, the Jialing River night cruise (included in the Fire & Fuzz tour) passes directly in front of Hongyadong — the water view at night is the most dramatic angle.'
  },
  {
    question: 'Is Hongyadong included in CTS tours?',
    answer: 'Yes. Hongyadong is included in CTS Tours\' Fire & Fuzz 10-day Chongqing and Chengdu Discovery tour. Day 4 includes an evening visit to Hongyadong followed by a Jialing River night cruise, which passes in front of the lit complex from the water. The full itinerary also includes Liziba Station, the Dazu Rock Carvings UNESCO site, and the Chengdu Panda Base.'
  },
  {
    question: 'Is entry to Hongyadong free?',
    answer: 'Entry to the Hongyadong complex is free. Individual restaurants, bars, and shops inside charge normal prices. The Jialing River night cruise, which is included in the Fire & Fuzz tour, is a separate ticketed experience — CTS handles all bookings as part of the package.'
  }
]
```

### Schema
- `WebPage` + `BreadcrumbList` + `FAQPage`
- Breadcrumbs: `Home → Tours → China → Chongqing → Hongyadong`

---

## 需要创建/修改的文件

### 1. `src/lib/data/seo-pages.ts`

新增（在 `lizibastationChongqingMeta` 之后）：

```typescript
export const hongyadongChongqingMeta: SeoPageMeta = {
  slug: 'hongyadong-chongqing',
  title: 'Hongyadong Chongqing: The Cliffside Night Market That Glows Like a Miyazaki Film | CTS Tours NZ',
  description: 'Hongyadong is Chongqing\'s most iconic landmark — an 11-storey stilted building complex glowing on the clifftop above the Jialing River. Best visited after dark. Complete visitor guide plus how to see it as part of a Chongqing tour from New Zealand.',
  h1: 'Hongyadong, Chongqing: Visitor Guide to the Clifftop Night Market',
  heroSubtitle: '11-storey cliffside complex · Best after dark · The defining image of Chongqing',
  introText:
    'Hongyadong (洪崖洞) is the image most people picture when they think of Chongqing. An 11-storey stilted building complex — built in the traditional diaojiaolou style — constructed directly into the clifftop above the Jialing River in Yuzhong District. After dark, the entire facade illuminates in red and gold, its layers of windows and balconies reflected in the river below.\n\nThe complex houses restaurants, bars, teahouses, and shops across multiple levels, connected by staircases and lifts. It is open all day, but a daytime visit misses the point entirely — the atmosphere that has made Hongyadong one of China\'s most shared travel images only exists after sunset.\n\nIn 2019, social media users noted the striking visual similarity between Hongyadong at night and the bathhouse in Studio Ghibli\'s Spirited Away. The comparison spread globally, and Chongqing\'s international visitor numbers accelerated sharply. CTS Tours includes a Hongyadong evening visit — followed by a Jialing River night cruise past the lit facade — on Day 4 of the Fire & Fuzz Chongqing and Chengdu tour.',
  faqs: [
    {
      question: 'What is Hongyadong in Chongqing?',
      answer: 'Hongyadong (洪崖洞) is an 11-storey stilted building complex built directly into the clifftop above the Jialing River in central Chongqing. It houses restaurants, bars, teahouses, and shops across multiple levels. The complex is famous for its spectacular night lighting — thousands of red and golden lights that illuminate the cliffside after dark, making it the most photographed landmark in Chongqing.'
    },
    {
      question: 'When is the best time to visit Hongyadong?',
      answer: 'After dark — ideally between 7:30pm and 10:00pm. The full lighting effect is only visible once the sun goes down, and the reflection in the Jialing River adds a second layer to the visual. The complex is open all day, but daytime visits miss the defining atmosphere entirely. CTS Tours schedules the Hongyadong visit on Day 4 evening.'
    },
    {
      question: 'Is Hongyadong like Spirited Away?',
      answer: 'Many visitors have noted the strong visual similarity between Hongyadong and the bathhouse in Studio Ghibli\'s Spirited Away — the layered glowing windows, the cliffside water setting, and the overall atmosphere. Studio Ghibli has never officially confirmed any connection, but the comparison went viral in 2019 and significantly boosted Chongqing\'s international tourism profile.'
    },
    {
      question: 'Where is the best viewpoint for Hongyadong?',
      answer: 'The best full-building view is from Qiansimen Bridge (千厮门大桥), approximately a 10-minute walk away. From the bridge you can see the entire 11-storey lit facade reflected in the Jialing River. The Jialing River night cruise (included in the Fire & Fuzz tour) passes directly in front of Hongyadong — the water view at night is the most dramatic angle.'
    },
    {
      question: 'Is Hongyadong included in CTS tours?',
      answer: 'Yes. Hongyadong is included in CTS Tours\' Fire & Fuzz 10-day Chongqing and Chengdu Discovery tour. Day 4 includes an evening visit to Hongyadong followed by a Jialing River night cruise. The full itinerary also includes Liziba Station, the Dazu Rock Carvings UNESCO site, and the Chengdu Panda Base.'
    },
    {
      question: 'Is entry to Hongyadong free?',
      answer: 'Entry to the Hongyadong complex is free. Individual restaurants, bars, and shops charge normal prices. The Jialing River night cruise, included in the Fire & Fuzz tour, is a separate ticketed experience — CTS handles all bookings as part of the package.'
    }
  ]
};
```

### 2. `src/app/hongyadong-chongqing/page.tsx`
基于 `/china-tours-from-new-zealand/page.tsx` 模板，加入实用参观信息卡片区 + "The Miyazaki Connection" 内容区块。

### 3. `src/app/sitemap.ts`
在 `hubPages` 数组加入 `'hongyadong-chongqing'`

### 4. `src/lib/data/guides.ts`
在 `chongqing-travel-guide` 相关链接加入两条内链：
```
{ label: 'Liziba Station — The Train Through a Building', href: '/liziba-station-chongqing' }
{ label: 'Hongyadong Night Market Guide', href: '/hongyadong-chongqing' }
```

---

---

# 打包执行清单（Code 执行顺序）

## 需要修改的文件汇总

```
src/lib/data/seo-pages.ts          ← 新增 3 个 meta 条目（panda已有，加 liziba + hongyadong）
src/app/chengdu-panda-sanctuary/   ← 新建（来自独立spec）
src/app/liziba-station-chongqing/  ← 新建
src/app/hongyadong-chongqing/      ← 新建
src/app/sitemap.ts                 ← 加 3 个新 URL
src/lib/data/guides.ts             ← chongqing guide 加2条内链，chengdu guide 加1条内链
```

## 所有新页面共用的结构模式

每个页面照抄 `/china-tours-from-new-zealand/page.tsx`，差异只在：
1. meta import 名称
2. breadcrumbs 数据
3. 中间加"实用参观信息"卡片区（info grid）
4. `featuredTours`：全部过滤到 `chongqing-chengdu` 这个 slug，只展示 Fire & Fuzz

```typescript
// 三个页面都用这个 filter
const featuredTours = allTours.filter(t => t.slug === 'chongqing-chengdu');
```

## Git Commit（三页一次提交）

```bash
git add src/lib/data/seo-pages.ts
git add src/app/chengdu-panda-sanctuary/
git add src/app/liziba-station-chongqing/
git add src/app/hongyadong-chongqing/
git add src/app/sitemap.ts
git add src/lib/data/guides.ts
git commit -m "feat: add Fire & Fuzz SEO cluster — chengdu-panda-sanctuary + liziba-station-chongqing + hongyadong-chongqing (3 attraction pages, all CTA to Fire & Fuzz tour)"
git push origin main
```

## 验证步骤

```bash
npm run build
# 确认无 TypeScript 错误，无缺失 import

# 检查三个页面的 title 和 description
curl -s http://localhost:3010/chengdu-panda-sanctuary | grep -i "title"
curl -s http://localhost:3010/liziba-station-chongqing | grep -i "title"
curl -s http://localhost:3010/hongyadong-chongqing | grep -i "title"

# 检查内链
curl -s http://localhost:3010/chongqing-travel-guide | grep "liziba\|hongyadong"
curl -s http://localhost:3010/chengdu-travel-guide | grep "panda-sanctuary"
```
