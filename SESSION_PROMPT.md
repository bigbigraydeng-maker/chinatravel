# 🚀 ChinaTravel Session 快速启动指南

**用于:** 新的 AI Session 快速进入项目上下文  
**目标:** 5 分钟内了解项目背景和当前任务  
**更新时间:** 2026-05-02

---

## 📌 项目概览

**项目名称:** CTS Tours - China Travel Specialists  
**Stack:** Next.js 14 + TypeScript + Tailwind CSS + Supabase + Resend  
**Live Site:** https://www.ctstours.co.nz/  
**Git Repo:** https://github.com/bigbigraydeng-maker/chinatravel.git

**当前阶段:** **Phase 4 - Travel-Tools 优化与 Tailor-Made 集成**  
**计划周期:** 2026-05-01 ~ 2026-06-05 (6 周)  
**最终目标:** 建立工具 → 咨询 → 预订的完整转化路径，预期增加 10-15% 咨询量

---

## 🎯 当前任务分配

### 如果你被分配 Phase 4.1 (Tailor-Made 集成)
**任务:** 在 Tailor-Made 页面中深度集成 Travel-Tools，建立"工具 → 咨询"明确路径

**核心交付物:**
1. ✅ 页面顶部"推荐流程"区域（工具快速入口）
2. ✅ 表单内部工具提示（字段级帮助）
3. ✅ 强转化 CTA（"立即咨询"按钮）
4. ✅ 移动端浮动 CTA（固定底部）

**关键文件:**
- 编辑: `src/app/tailor-made/page.tsx`
- 新增: `src/components/tailor-made/ToolsRecommendationBanner.tsx`
- 新增: `src/components/tailor-made/FormToolTips.tsx`
- 新增: `src/components/tailor-made/MobileFloatingCTA.tsx`

**预期工作量:** 1-2 周 | **优先级:** ⭐⭐⭐ (最高)

**详细需求:** → 读 `ROADMAP_PHASE4_TOOLS_OPTIMIZATION.md` 的 "Phase 4.1" 部分

---

### 如果你被分配 Phase 4.2 (Travel-Tools 重构)
**任务:** 重构 `/travel-tools` 页面，建立清晰的工具架构

**核心交付物:**
1. ✅ Hero 区域 + 工具分类导航
2. ✅ 工具卡片网格（3 列布局，5 个工具）
3. ✅ 工具详情展开式设计
4. ✅ 相关资源链接（指南 + 博客）
5. ✅ 强转化 CTA

**关键文件:**
- 编辑: `src/app/travel-tools/page.tsx`
- 新增: `src/components/travel-tools/ToolsHero.tsx`
- 新增: `src/components/travel-tools/ToolsCategoryNav.tsx`
- 新增: `src/components/travel-tools/ToolCard.tsx`
- 新增: `src/components/travel-tools/ToolsGrid.tsx`
- 新增: `src/components/travel-tools/ToolDetailSection.tsx`

**预期工作量:** 2-3 周 | **优先级:** ⭐⭐⭐

**详细需求:** → 读 `ROADMAP_PHASE4_TOOLS_OPTIMIZATION.md` 的 "Phase 4.2" 部分

---

### 如果你被分配 Phase 4.3 (工具实施)
**任务:** 实施 5 个高优先级工具，覆盖用户旅行规划的核心需求

**核心工具:**
1. ✅ **Best Time to Visit China** (已有，需优化)
2. 🔲 **Cost Calculator** (Week 1: May 1-5)
3. 🔲 **Visa Checker** (Week 2: May 8-12)
4. 🔲 **Itinerary Builder** (Week 3-4: May 15-25)
5. 🔲 **Distance Calculator** (Week 4: May 26-31)

**关键文件:**
- 创建: `src/lib/data/tools-data.ts` (工具元数据)
- 创建: `src/lib/data/visa-requirements.ts` (签证数据)
- 创建: `src/lib/data/travel-distances.ts` (城市距离数据)
- 新增: `src/components/tools/CostCalculator.tsx`
- 新增: `src/components/tools/VisaChecker.tsx`
- 新增: `src/components/tools/ItineraryBuilder.tsx`
- 新增: `src/components/tools/DistanceCalculator.tsx`

**预期工作量:** 2-3 周（取决于分配工具数） | **优先级:** ⭐⭐⭐

**详细需求:** → 读 `ROADMAP_PHASE4_TOOLS_OPTIMIZATION.md` 的 "Phase 4.3" 部分

---

### 如果你被分配 Phase 4.4 (Analytics)
**任务:** 建立完整的数据监控系统，衡量工具转化率和用户旅程

**核心交付物:**
1. ✅ GA4 事件跟踪系统
2. ✅ Google Search Console 配置
3. ✅ 数据报告仪表盘

**关键文件:**
- 创建: `src/lib/analytics/track-tools.ts` (GA4 事件函数)
- 创建: `src/app/marketing/campaign/tools-analytics.tsx` (仪表盘)

**预期工作量:** 1 周 | **优先级:** ⭐⭐

**详细需求:** → 读 `ROADMAP_PHASE4_TOOLS_OPTIMIZATION.md` 的 "Phase 4.4" 部分

---

## 📚 快速参考

### 关键文件结构
```
src/
├── app/
│   ├── tailor-made/page.tsx          ← Phase 4.1 入口
│   └── travel-tools/page.tsx         ← Phase 4.2 & 4.3 入口
├── components/
│   ├── tailor-made/                  ← Phase 4.1 组件
│   └── travel-tools/                 ← Phase 4.2 & 4.3 组件
└── lib/
    ├── data/
    │   ├── tools-data.ts              ← 工具元数据（必读）
    │   ├── visa-requirements.ts
    │   ├── travel-distances.ts
    │   └── faq-pages.ts               ← FAQ 数据（参考）
    ├── analytics/
    │   └── track-tools.ts
    └── seo-metadata.ts                ← SEO 函数
```

### 常用命令
```bash
# 开发
npm run dev              # 启动开发服务器 (localhost:3010)
npm run dev:alt          # 备用端口 (localhost:3055)

# 构建和测试
npm run build            # 生产构建
npm test                 # 运行测试
npm run type-check       # TypeScript 检查

# 代码浏览
grep -r "Tailor" src/   # 查找 Tailor-Made 相关代码
find src -name "*tool*" # 查找工具相关文件
```

### 快速设计参考

**颜色系统:**
- `primary` = 暖橙/琥珀色（主品牌色）
- `secondary` = 绿松石/绿色（强调色）
- `accent` = 深海军蓝（暗色文本）
- `warm-50/100/200` = 米色调（背景）

**响应式网格:**
```tsx
// 桌面 3 列 → 平板 2 列 → 手机 1 列
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## 🔑 核心数据结构

### 工具数据接口 (tools-data.ts)
```typescript
export interface Tool {
  slug: string;                    // 'cost-calculator'
  title: string;                   // 'China Trip Cost Calculator'
  description: string;             // 简短说明
  icon: string;                    // '💰' 或 SVG ref
  category: 'seasonal' | 'practical' | 'planning';
  priority: number;                // 1-5，高优先级
  keywords: string[];              // SEO 关键词
  relatedGuides: string[];         // 关联目的地指南的 slug
  relatedFAQs: string[];          // 关联 FAQ 的 slug
}
```

### Tailor-Made 数据参考
```typescript
// 从 src/lib/data/tours.ts 参考
interface Tour {
  slug: string;
  destination: string;
  tier: 'signature' | 'discovery' | 'stopover';
  duration: number;
  price: number;
  highlights: string[];
  itinerary: DayItinerary[];
}
```

---

## ✅ 快速清单

**开始前确认：**
- [ ] 已读 ROADMAP_PHASE4_TOOLS_OPTIMIZATION.md
- [ ] 已找到分配的具体任务部分
- [ ] 已确认关键文件位置
- [ ] 已运行 `npm run dev` 成功启动
- [ ] 已查看当前页面在浏览器中的效果

**开始编码前：**
- [ ] 已创建新分支 (例: `feat/phase4-tailor-made-integration`)
- [ ] 已阅读相关组件的现有代码风格
- [ ] 已确认 TypeScript 类型定义
- [ ] 已设置好编辑器的 Prettier 格式化

**完成后验收：**
- [ ] 功能完全实现，无 TODO 注释留存
- [ ] 页面在桌面、平板、手机上都可用
- [ ] 已运行 `npm run build` 无错误
- [ ] 已提交代码审查（见下方）

---

## 📋 代码审查流程

**提交前必做：**
1. 运行 `npm test --coverage` → 确保 ≥80% 覆盖率
2. 运行 `npm run build` → 无 build 错误
3. 运行 `npm run type-check` → 无 TypeScript 错误
4. 检查 `npm audit` → 无高危漏洞

**提交代码：**
```bash
git add src/...
git commit -m "feat: [具体功能]"
git push origin feat/phase4-[task-name]
```

**Commit Message 格式：**
```
feat: add tools recommendation banner to Tailor-Made page

- Add ToolsRecommendationBanner component
- Integrate with existing form
- Add GA4 event tracking for tool clicks
```

**触发代码审查：**
- 已有 code-reviewer agent（项目规则）
- 审查会自动检查：安全性、代码质量、性能

---

## 🎓 项目语境与最佳实践

### 项目哲学

1. **数据集中管理** - 所有内容数据存在 `src/lib/data/` 中的单个文件，避免重复
2. **组件复用** - 使用 FAQPageTemplate、HubHero 等通用组件
3. **动态路由** - 路由从数据自动生成
4. **SEO 优先** - 所有页面都有 JSON-LD schema 和元数据

### 避免的错误

- ❌ 为每个功能创建新的数据文件
- ❌ 为类似功能创建新的组件（应该复用或扩展现有组件）
- ❌ Hardcode 数据（应该从 src/lib/data/ 引入）
- ❌ 忽略 SEO（每个页面都应有适当的元数据和 schema）
- ❌ 不做响应式设计（必须支持 mobile/tablet/desktop）

### 代码风格

```typescript
// ✅ 好的：使用 TypeScript 接口
interface Props {
  toolName: string;
  onSubmit: (data: FormData) => void;
}

// ✅ 好的：清晰的变量名
const relatedGuides = guides.filter(g => g.slug === toolSlug);

// ❌ 避免：过大的组件（>50 行则拆分）
// ❌ 避免：深嵌套（>4 层则重构）

// ✅ 好的：Tailwind 类名的组合
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## 🔗 进一步阅读

**必读（按优先级）:**
1. `ROADMAP_PHASE4_TOOLS_OPTIMIZATION.md` - 完整计划 (30 分钟)
2. `CLAUDE.md` - 项目指南和常见任务 (20 分钟)
3. `src/components/seo/FAQPageTemplate.tsx` - 学习组件模式 (10 分钟)

**参考（按需）:**
4. `PHASE_3_4_IMPLEMENTATION_STATUS.md` - Phase 3 进度报告
5. `src/lib/data/faq-pages.ts` - 学习数据结构
6. `src/lib/data/tours.ts` - 学习复杂数据处理

---

## 💬 问题排查

**Q: 我不确定我的任务是什么**  
A: 找 Zhong，告诉他你的 session ID，他会告诉你分配的 Phase

**Q: 我找不到某个文件**  
A: 运行 `find src -name "*filename*"` 或查看上面的"快速参考"部分

**Q: Build 出错，怎么办？**  
A: 运行 `npm run build` 看完整错误信息，然后参考 CLAUDE.md 的"常见 Bug"部分

**Q: 我需要添加新的工具数据，怎么做？**  
A: 编辑 `src/lib/data/tools-data.ts`，遵循现有的 Tool 接口定义

**Q: 如何测试工具的转化漏斗？**  
A: 打开 GA4，检查 event 'tool_opened' 和 'enquiry_submitted' 的转化

---

## 🎯 成功指标

你的工作完成时应该满足：

✅ **功能完整性**
- 所有分配的交付物已完成
- 无留存的 TODO 或 FIXME 注释
- 功能在所有设备上正常工作

✅ **代码质量**
- TypeScript strict 模式通过
- 无 linting 错误
- Test coverage ≥ 80%（如有测试）

✅ **用户体验**
- 页面加载时间 < 2s
- Lighthouse 分数 > 90
- 移动端友好和可访问性检查通过

✅ **文档和沟通**
- 提交了代码审查
- 审查批准后才合并

---

## 📞 联系方式

**项目负责人:** Zhong  
**Git Repo:** https://github.com/bigbigraydeng-maker/chinatravel.git  
**Live Site:** https://www.ctstours.co.nz/

---

**准备好了吗？开始你的任务吧！** 🚀

**下一步:** 打开你分配 Phase 的详细需求，开始编码！
