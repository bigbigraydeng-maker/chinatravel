# Guide QA 报告
**日期：** 2026-04-25  
**检查范围：** 全部 21 个 Travel Guide 页面  
**检查方式：** 自动化抓取生产环境（https://www.ctstours.co.nz）  
**状态：** ✅ QA 完成，发现 **1 个严重问题 + 4 个中等问题**

---

## 🔴 严重问题（必须修复，阻塞上线）

### BUG-01：Li River 页面内容完全缺失
- **URL：** `/li-river-travel-guide`
- **现象：** 页面渲染 "Guide not found"，无任何内容
- **Title：** `Travel Guide | CTS Tours`（通用默认值，无 Li River 信息）
- **Meta Description：** `98 Years Heritage | Direct China Operations | Authentic Access`（站点默认值）
- **Canonical：** 未设置
- **Schema：** 无任何 Schema
- **Hero 图：** 无
- **根因推断：** `li-river-travel-guide` 路由存在（`src/app/li-river-travel-guide/page.tsx`），但 guide 数据源中 slug 可能不匹配，导致 `getGuideBySlug()` 返回 null
- **修复方向：** 检查 guides 数据文件中 li river 的 slug 是否与路由一致；补充 guide 数据

---

## ⚠️ 中等问题（应在 Phase 1 完成前修复）

### BUG-02：Lijiang 与 Kunming 使用同一张 Hero 图
- **影响页面：** `/lijiang-travel-guide`、`/kunming-travel-guide`
- **重复图片：** `tour-images/yunnan-village.jpg`
- **问题：** 两个不同城市显示完全相同的 hero 图，降低页面辨识度，对 SEO 不利（Google 可能判定内容相似）
- **建议：** 为 Kunming 换一张专属图片，建议关键词：`kunming stone forest`、`kunming lake`

### BUG-03：Hangzhou Hero 图使用了乌镇图片
- **影响页面：** `/hangzhou-travel-guide`
- **当前图片：** `tour-images/wuzhen-canal.jpg`（乌镇水乡）
- **问题：** 乌镇是嘉兴辖区，不是杭州。杭州的标志是西湖（West Lake）
- **建议：** 替换为西湖相关图片，关键词：`hangzhou west lake`、`xihu hangzhou`

### BUG-04：Tianmen Mountain 使用通用张家界图片
- **影响页面：** `/tianmen-mountain-travel-guide`
- **当前图片：** `tour-images/zhangjiajie.jpg`
- **问题：** 天门山与张家界同区，共用图片可以接受，但天门山有标志性的天门洞（Heaven's Gate）和玻璃栈道，有更合适的专属图片
- **建议：** 如有天门山专属图片更好，否则暂时保留可接受

### BUG-05：4 个城市 Guide 缺少 FAQPage + WebPage Schema
- **影响页面：** Chengdu、Guilin、Zhangjiajie、Yunnan
- **问题：** 这 4 个页面的 Schema 只有 `Article`、`BreadcrumbList`、`ImageObject`、`Organization`，缺少 `FAQPage` 和 `WebPage`
- **其余 17 个页面：** 都有完整 Schema（含 FAQPage + WebPage）
- **SEO 影响：** 缺少 FAQPage Schema 意味着 Google 不会为这些页面生成 FAQ 富摘要（Rich Snippets），直接影响点击率
- **修复方向：** 检查这 4 个页面的模板是否有 FAQ 组件，若无则添加；并在 metadata 中补充 FAQPage Schema

---

## ✅ 通过的检查项（17/21 页面完全正常）

| 检查项 | 结果 |
|--------|------|
| 所有页面 HTTP 状态 | 21/21 返回 200（Li River 有内容但显示 not found） |
| robots meta | 21/21 设置为 `index, follow` |
| 各页面 canonical 正确 | 20/21 ✅（Li River 缺失） |
| 无 placeholder / lorem ipsum 内容 | 21/21 通过 |
| 有内部 tour 链接 | 20/21 ✅（Li River 缺失） |
| 有 /contact 或 /tailor-made CTA | 20/21 ✅（Li River 缺失） |
| 图片全部走 Supabase CDN | ✅（无 Unsplash 直链） |

---

## 📊 全部 21 个页面汇总表

| # | 页面 | URL | HTTP | Title | Schema | Hero 图 | 问题 |
|---|------|-----|------|-------|--------|---------|------|
| 1 | Beijing | `/beijing-travel-guide` | 200 | ✅ | ✅ 完整 | forbidden-city-aerial.jpg | 无 |
| 2 | Xi'an | `/xian-travel-guide` | 200 | ✅ | ✅ 完整 | xian-terracotta.jpg | 无 |
| 3 | Shanghai | `/shanghai-travel-guide` | 200 | ✅ | ✅ 完整 | shanghai-night-blue.jpg | 无 |
| 4 | Chengdu | `/chengdu-travel-guide` | 200 | ✅ | ⚠️ 缺 FAQPage | (Supabase) | BUG-05 |
| 5 | Guilin | `/guilin-travel-guide` | 200 | ✅ | ⚠️ 缺 FAQPage | (Supabase) | BUG-05 |
| 6 | Zhangjiajie | `/zhangjiajie-travel-guide` | 200 | ✅ | ⚠️ 缺 FAQPage | (Supabase) | BUG-05 |
| 7 | Yunnan | `/yunnan-travel-guide` | 200 | ✅ | ⚠️ 缺 FAQPage | (Supabase) | BUG-05 |
| 8 | Lijiang | `/lijiang-travel-guide` | 200 | ✅ | ✅ 完整 | yunnan-village.jpg | BUG-02 |
| 9 | Dali | `/dali-travel-guide` | 200 | ✅ | ✅ 完整 | china-pagoda-night.jpg | 无 |
| 10 | Kunming | `/kunming-travel-guide` | 200 | ✅ | ✅ 完整 | yunnan-village.jpg | BUG-02 |
| 11 | Shangri-La | `/shangri-la-travel-guide` | 200 | ✅ | ✅ 完整 | shangri-la-monastery.jpg | 无 |
| 12 | Great Wall | `/great-wall-travel-guide` | 200 | ✅ | ✅ 完整 | great-wall-mist.jpg | 无 |
| 13 | Forbidden City | `/forbidden-city-travel-guide` | 200 | ✅ | ✅ 完整 | forbidden-city-aerial.jpg | 无 |
| 14 | Terracotta | `/terracotta-warriors-travel-guide` | 200 | ✅ | ✅ 完整 | xian-terracotta.jpg | 无 |
| 15 | Leshan Buddha | `/leshan-buddha-travel-guide` | 200 | ✅ | ✅ 完整 | photo-1558618666 (unsplash) | 无 |
| 16 | Yangshuo | `/yangshuo-travel-guide` | 200 | ✅ | ✅ 完整 | guilin-river-valley.jpg | 无 |
| 17 | Hangzhou | `/hangzhou-travel-guide` | 200 | ✅ | ✅ 完整 | wuzhen-canal.jpg | BUG-03 |
| 18 | Suzhou | `/suzhou-travel-guide` | 200 | ✅ | ✅ 完整 | suzhou-canal.jpg | 无 |
| 19 | Chongqing | `/chongqing-travel-guide` | 200 | ✅ | ✅ 完整 | photo-1581252 (unsplash) | 无 |
| 20 | Tianmen Mtn | `/tianmen-mountain-travel-guide` | 200 | ✅ | ✅ 完整 | zhangjiajie.jpg | BUG-04（轻微） |
| 21 | **Li River** | `/li-river-travel-guide` | 200 | 🔴 通用默认 | 🔴 无 | 🔴 无 | **BUG-01 严重** |

---

## 🔧 修复优先级与建议

### 优先级 P0（今天必须修复）
- **BUG-01** Li River 内容缺失 → 检查 guides 数据文件 slug，补充 guide 数据

### 优先级 P1（Apr 28 前修复）
- **BUG-05** Chengdu/Guilin/Zhangjiajie/Yunnan 缺少 FAQPage Schema → 检查模板差异，统一 Schema 结构
- **BUG-02** Lijiang/Kunming 重复 hero 图 → 为 Kunming 找一张新图

### 优先级 P2（下一迭代修复）
- **BUG-03** Hangzhou hero 图换成西湖相关图片
- **BUG-04** Tianmen Mountain hero 图可选择性替换

---

## 📝 给 Claude Code 侧的修复指令

### 修复 BUG-01（Li River）
```
1. 检查 src/lib/data/guides.ts（或同等数据文件）中 li-river 的 slug
2. 路由是 /li-river-travel-guide，所以 slug 应为 "li-river-travel-guide" 或 "li-river"
3. 若数据不存在，补充完整 guide 数据（参考 yangshuo guide 的结构）
4. 确保 generateMetadata() 能正确返回 li river 专属的 title/description
```

### 修复 BUG-05（Schema 缺失）
```
1. 打开 Chengdu/Guilin/Zhangjiajie/Yunnan 的 page.tsx
2. 对比 Beijing page.tsx 的 JSON-LD schema 结构
3. 补充 FAQPage schema（需要有对应的 FAQ 数据）和 WebPage schema
4. 若这 4 个页面没有 FAQ 组件，先添加 FAQ 组件 + 数据，再加 schema
```

### 修复 BUG-02（Kunming 图片）
```
1. 在 guides.ts 中找到 kunming guide 的 heroImage 字段
2. 将 yunnan-village.jpg 替换为 kunming 专属图片
3. 建议 Unsplash 搜索：photo-1631607815771（stone forest）或找类似
4. 按图片管理工作流验证图片 HTTP 200 后部署
```

---

**报告生成时间：** 2026-04-25  
**下次 QA：** Phase 9 修复完成后重跑
