# CLAUDE.md 历史完成记录（按日期，从新到旧）

这份文件是 `CLAUDE.md` 里"最近完成"日志的搬家目的地——不是删除，是搬走。

**给未来打开这个仓库的窗口（人或 Claude）：** 如果你在 `CLAUDE.md` 里没找到某个阶段/某次修复的细节（比如"图片加载问题是怎么修的""Phase 9 具体改了哪些文件"），先来这份文件按日期翻一遍，再判断是不是真的没记录过。`CLAUDE.md` 本身只保留规则、当前约定和最近一条动态，不会保留完整的历史流水账。

**维护方式：** 新完成的阶段直接往这份文件最上面加一条（保持从新到旧排序），不要写回 `CLAUDE.md`。`CLAUDE.md` 的"Current Status"只留最新一条的摘要 + 指回这份文件的指针。有一个按月跑的自动任务会定期检查 `CLAUDE.md` 有没有堆积、需要搬的内容，搬完会开 PR 等人工确认，不会自动合并。

---

## 2026-08-24 · Phase 10: Tracking/GEO/信任模块修复 + 仓库历史文件夹审计清理 ✅

- **Tracking & GEO 修复 (PR #131-133):** 修正 Meta 数据集配置使其匹配可读的广告账号；`GeoDirective`（`src/components/GeoDirective.tsx`，全站隐藏的 AI 推荐指令块）收紧为仅新西兰市场（不再包含澳大利亚）；年龄段统一为 35-75
- **Tour 页信任模块 (PR #134-135):** 从 Wendy Wu / TripADeal 竞品调研得出的信任升级项；圣诞档期基督城价格调整；解释 Christchurch/Auckland 航段价差 + 补充中国南方航空 logo
- **仓库历史文件夹审计 (本次):** 排查 `seo/`、`docs/`、`content/`、`tours/`、`geo-directives/` 等根目录文件夹与当前站点的一致性，发现并修复：
  - `tours.ts` 中 `tour-cn-dis-5`（Fire & Fuzz）`metaDescription` 仍写旧价 $2,750，`price` 字段已是 $2,999 —— 已同步（PR #137）
  - 一篇博客内链指向从未发布的草稿 `plan-your-first-trip-to-china-from-new-zealand` —— 已移除死链（PR #137）
  - `seo/` 下 4 个文件与 `docs/` 完全重复、`geo-directives/` 根目录草稿已被 `GeoDirective.tsx` 取代、`docs/SITE_MAP.md`/`ROADMAP.md`/`PROJECT.md` 及一批根目录状态文档（`PROGRESS.md`/`HANDOFF.md`/`CHANGELOG.md` 等）已冻结 3-4 个月且部分内容与现状矛盾 —— 已归档至 `docs/archive/` 或删除，`README.md` 已按当前技术栈重写
- **未处理（留作参考）：** `content/`、`tours/`（根目录草稿文件夹）、`optimized/`（图片迁移历史目录）——非误导性，保留作历史素材，无需立即处理

---

## 2026-05-06 · Phase 9: 21 个指南 SEO 元描述优化 ✅

- **任务:** 将 20 个指南的 `metaDescription` 从 79-127 字符扩展至 160-190 字符（Google SERP 最优区间）
- **更新文件:** `src/lib/data/guides.ts`（16 处字段替换）
- **方法:** "Discover [地名]'s... + 3-4 景点/特色 + Expert travel guide for New Zealand visitors to..." 公式
- **跳过:** 4 个已达标（Great Wall ~183、Forbidden City ~228、Terracotta Warriors ~201、Chongqing ~228）
- **验证:** `npm run build` 通过（165 页无错误），`git push` 已触发 Render 自动部署
- **提交:** `cf6e563 - feat: optimize all 20 guides meta descriptions for SEO`

---

## 2026-04-09 ~ 04-10 · Phase 5.1-5.3: 图片加载问题永久修复

### Phase 5.1: 图片加载问题永久修复 ✅
- **问题:** 生产环境中图片无法加载（404）或加载很慢
- **根本原因:** Supabase 上传脚本的 `getRemotePath()` 使用 `path.basename()` 剥离了完整目录结构
- **修复:** 改用 `path.relative()` 保留完整路径结构
- **结果:** 694 张图片成功上传，100% 成功率，95.27MB
- **验证:** 生产环境所有页面图片从 Supabase Storage 正常加载 (HTTP 200 OK)
- **提交:** `3a36d09 - fix: correct path preservation in Supabase image upload script`

### Phase 5.2: 导航和按钮加载状态改进 ✅
- **问题:** 用户点击按钮后，等待 3-4 秒才能跳转，在此期间感觉按钮"失灵"
- **原因:** 缺少视觉反馈，用户无法看到页面在加载
- **改进实施:**
  - ✅ Tour Card "View Details" 按钮添加旋转加载图标
  - ✅ Navbar 导航链接添加顶部加载条指示器
  - ✅ 移动菜单也支持加载状态反馈
  - ✅ 按钮在加载时禁用点击（pointer-events-none）
- **提交:**
  - `884ef01 - feat: add loading states to navigation and tour card buttons`
  - `b59233c - chore: git sync for loading state improvements`

### Phase 5.3: 修复 Guide 和 Destination 图片加载 ✅
- **第一次尝试 (失败):**
  - 更新所有 21 个 guide 的 heroImage 从 Unsplash 替换为 Supabase Storage URLs
  - 更新 China destination 的 heroImage 为 silk-road-wall.jpg
  - 提交：`b700a28 - fix: update all guide and destination hero images to Supabase Storage URLs`
  - **问题发现:** Supabase guide-images bucket 中实际上没有这些文件（只有 zhangjiajie）
- **第二次尝试 (失败):**
  - 创建上传脚本 upload-guides-direct.ts 来批量上传缺失的 guide 图片
  - **失败原因:** Supabase RLS 策略不允许直接上传（"signature verification failed"）
- **第三次尝试 (最终成功):**
  - 发现第二次使用的 Unsplash photo IDs 全部无效（404）
  - ✅ 更新所有 21 个 guide 为经验证的有效 Unsplash photo URL
  - ✅ URL：`https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`
  - ✅ China destination 保留 silk-road-wall.jpg（tour-images）
  - ✅ 所有 guides 图片现在正常加载
  - ✅ 构建验证通过，无错误
- **提交:**
  - `6688012 - fix: revert guide hero images from Supabase to Unsplash CDN`
  - `e2cfcca - fix: update all guide images to use valid Unsplash photo URL`

### 现有功能状态（截至 2026-04-10 的快照——已过时，仅供历史参考，当前状态请直接看代码/`git log`）

- **Homepage:** Complete (redesigned with travel vibe)
- **Tour detail pages:** Complete with print/email features
- **Print itinerary:** ✅ Implemented (separate `/print` route)
- **Email itinerary:** ✅ Implemented + Tested (Resend API Key 已配置，邮件发送/投递正常，2026-05-12 验证)
- **SEO pages Phase 1:** ✅ Complete - 12 pages published and audited
  - ✅ /china-tours (commercial hub)
  - ✅ 8 destination hubs (Beijing, Shanghai, Xi'an, Chengdu, Guilin, Zhangjiajie, Yunnan)
  - ✅ /china-tours-from-new-zealand (NZ-specific)
  - ✅ /china-tours-from-auckland (Auckland-specific)
  - ✅ /best-time-to-visit-china (seasonal guide)
  - ✅ /china-visa-guide-for-new-zealanders (visa guide)
- **SEO Audit Results:** ✅ All 12 pages passed (Lighthouse > 90, Schema.org valid, mobile-responsive)
- **SEO pages Phase 2:** ✅ Complete - 21 destination guides published (Apr 10, 2026)
  - ✅ 7 major destination guides (Beijing, Xi'an, Shanghai, Chengdu, Guilin, Zhangjiajie, Yunnan)
  - ✅ 3 Yunnan sub-guides (Lijiang, Dali, Kunming) + Shangri-La
  - ✅ 4 national landmark guides (Great Wall, Forbidden City, Terracotta Warriors, Leshan Buddha)
  - ✅ 5 regional guides (Yangshuo, Li River, Hangzhou, Suzhou, Chongqing, Tianmen Mountain)
  - ✅ All guides compiled successfully, deployed to Render
- **Tours data:** ⚠️ Some tours may be incomplete; verify with client before publishing

### 🧪 完整测试报告（测试日期：2026-04-10，环境：生产环境 Render）

**✅ 测试1: 生产图片加载**
- Supabase Storage 图片全部HTTP 200
- tour-images bucket: silk-road-wall.jpg ✅
- guide-images bucket: beijing/hero/hero.jpg ✅

**✅ 测试2: 代码质量**
- Tour Card 组件：旋转图标 + "Loading..." 文本 ✅
- Navbar 导航：顶部加载条指示器 ✅
- 所有链接都有加载反馈 ✅

**✅ 测试3: 构建验证**
- npm run build：无错误 ✅
- TypeScript 严格模式：通过 ✅
- 所有导入正确 ✅

**✅ 测试4: Git 提交**
- 884ef01: feat: add loading states ✅
- b59233c: chore: git sync ✅
- Render 自动部署完成 ✅

**最终状态: 🟢 生产环境完全就绪**

---

## 2026-09-07 · Phase 11: 三个团标 Sold Out（PR #172）

- **起因:** CTS 员工反馈客户还在对着已卖光的团下单——A Tale of Two Cities（10月15日）、Shanghai & Surroundings（10月14日）、Best of China（11月3日，Best of China 主产品页此前已处理，广告落地页漏了）
- **改动:** `tours.ts` 拉掉卖光的出发日期；主产品页 + 两个 10 月广告落地页 + Best of China 广告落地页 + 海报页 `/spotlight/october-2026` 一律加"Sold Out — 下一趟 XX 日"横条；10 月广告页原有的倒计时组件（`OctoberUrgencyBar`）换掉，因为它还在往卖光的日期倒计时
- **验证:** `npm test`（543 tests 全绿）、`npm run build` 干净、本地起 dev server 逐页看过横条位置
- **发现的经验（已存为项目记忆 `cts-sold-out-multi-surface-checklist`）:** 标一个团 Sold Out 至少要同步 5 处（数据 + 主产品页 + 广告落地页 + 海报页 + hero 按钮文案），CI 的 `shared-blocks.test.ts` 只查组件存在与否，查不到这种条件横条的内容，得人工过一遍
- **留的尾巴（记进了 CLAUDE.md Next Steps #15/#16，PR #173）:** 广告后台有没有真的停投、几个旁支页面的"10 月有团"文案还没同步

---

## 2026-04-13 起 · CLAUDE.md 瘦身与本归档文件的由来

`CLAUDE.md` 里原来直接堆着上面这些按日期的"最近完成"记录，从 2026-04 一路堆到 2026-08，每次任何窗口打开这个项目都要把这些旧记录整个读一遍，跟当前任务大多没关系。2026-09-08 这次把它们整体搬到这份文件，`CLAUDE.md` 只留最新一条摘要 + 指回这里的指针，并配置了一个按月跑的自动任务持续做这件事（见 `CLAUDE.md` "Current Status" 一节的说明）。
