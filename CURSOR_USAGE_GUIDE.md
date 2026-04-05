# Cursor 快速使用指南

## 🚀 如何在 Cursor 中使用这些新功能

### 核心提示词模板（已实现，供参考）

#### P0-1: GTM/GA4 转化跟踪（✅ 已完成）
```
Act as a Data Analyst and Frontend Developer. I need to implement a robust conversion tracking system for our Google Ads campaign.
1. In the `@layout.tsx`, inject the Google Tag Manager (GTM) script. ✅
2. Create a high-order component or a utility function to trigger a `conversion` event when a user successfully submits the inquiry form on the `@TourEnquiry.tsx`. ✅
3. Ensure we are tracking: 'Form Submission', 'Click-to-Call (0800)', and 'Itinerary Download'. ✅
4. Use environment variables for all Tracking IDs. ✅
```

#### P0-2: 落地页 CRO 优化（✅ 已完成）
```
Act as a UI/UX Designer and Frontend Developer. Optimize the `@tour page` to maximize conversion for our October departures.
1. Add a high-visibility 'Check Availability' floating CTA button for mobile users. ✅
2. Insert a 'Trust Bar' below the hero section featuring the 'CTS 100-Year Heritage' and 'Auckland Local Office' badges. ✅
3. Add a 'Limited Availability' tag near the price component (e.g., 'Only 5 seats left for Oct 14'). ✅
4. Ensure the inquiry form is simplified to 3 fields: Name, Email, and Phone. ✅
```

#### P1-1: JSON-LD 结构化数据（✅ 已完成）
```
Act as an Information Architect. I need to implement structured data to enhance our search snippets and AI search visibility (GEO).
1. Create a `StructuredData` component that generates `Product` and `TouristTrip` Schema in JSON-LD format. ✅
2. It must dynamically pull data from our itinerary objects, including: 'name', 'description', 'itinerary steps', 'offers' (price and currency), and 'provider' (CTS NZ). ✅
3. Inject this component into the `<head>` of all route-based pages in `@app/tours/[destination]/[tier]/[tour]`. ✅
4. Verify that the output follows Google's latest documentation for Vacation Rentals/Travel search. ✅
```

#### P1-2: Metadata 优化（✅ 已完成）
```
Review the metadata strategy for our tour pages.
1. Update the `generateMetadata` function to follow this pattern: '[Tour Name] | [Duration] | [Departure Date] | CTS NZ'. ✅
2. Ensure every image in the itinerary has a descriptive `alt` tag including target keywords like 'China Tour from New Zealand'. ✅
3. Implement a proper H1-H3 heading hierarchy on the tour detail pages to improve scannability for both users and crawlers. ✅
```

#### P2-1: FAQ 模块（✅ 已完成）
```
Act as a Content Strategist. To improve our ranking in AI search engines (like Perplexity/Gemini), we need an FAQ section.
1. Add a 'Frequently Asked Questions' section to the bottom of the `@tour page`. ✅
2. Use data-driven questions: 'How to apply for a China visa from NZ?', 'What is the best time to visit Shanghai?', etc. ✅
3. Ensure the FAQ uses `FAQPage` Schema to increase the chance of appearing in search rich snippets. ✅
4. Styling should be a clean, accessible accordion using Tailwind CSS. ✅
```

---

## 📁 关键文件快速定位

在 Cursor 中使用 `@` 符号快速引用以下文件：

### 核心组件
- `@GoogleTagManager.tsx` - GTM 集成
- `@ConversionTracker.tsx` - 转化追踪
- `@FloatingCta.tsx` - 浮动 CTA
- `@TrustBar.tsx` - 信任条
- `@AvailabilityBadge.tsx` - 库存提示
- `@FAQSection.tsx` - FAQ 模块
- `@SchemaMarkup.tsx` - Schema 生成器

### 页面文件
- `@layout.tsx` - 根布局
- `@tour page` - 旅游详情页面 (`src/app/tours/[destination]/[tier]/[tour]/page.tsx`)

### 配置文件
- `@.env.example` - 环境变量模板

---

## 🔧 下一步优化建议

### 1. 添加更多转化追踪点
```
在 Cursor 中输入：
"Add click tracking to all 'Enquire Now' buttons on @TourHero.tsx using the @GoogleTagManager utility"
```

### 2. A/B 测试支持
```
在 Cursor 中输入：
"Create an A/B testing component to test different CTA button texts on @TourEnquiry.tsx"
```

### 3. 性能优化
```
在 Cursor 中输入：
"Optimize the scroll event listener in @FloatingCta.tsx to use requestAnimationFrame for better performance"
```

### 4. 添加更多 Schema 类型
```
在 Cursor 中输入：
"Add Review and AggregateRating schema to @SchemaMarkup.tsx to display star ratings in search results"
```

### 5. 增强 FAQ 内容
```
在 Cursor 中输入：
"Add 5 more FAQs to @FAQSection.tsx focusing on visa requirements, payment methods, and cancellation policies"
```

---

## 🎯 验证清单

### 开发环境验证
```bash
# 1. 启动开发服务器
npm run dev

# 2. 访问任意 tour 页面
http://localhost:3000/tours/beijing/signature/imperial-beijing

# 3. 打开浏览器开发者工具
# - Console: 检查是否有错误
# - Network: 检查 GTM 请求
# - Application > Data Layer: 检查事件
```

### SEO 验证工具
1. **Google Rich Results Test**
   - 访问：https://search.google.com/test/rich-results
   - 输入你的 URL 或代码片段
   - 验证 Schema.org 结构化数据

2. **Google Tag Assistant**
   - 安装 Chrome 扩展
   - 访问你的网站
   - 检查 GTM/GA4 配置

3. **Lighthouse**
   - 在 Chrome DevTools 中运行
   - 检查 SEO 分数（目标：90+）
   - 检查可访问性（目标：90+）

---

## 💡 高级技巧

### 1. 使用 Cursor Composer (Cmd+I / Ctrl+I)
在 Composer 中输入：
```
@tour page Add a sticky header with phone number and enquiry button that appears when user scrolls past the hero section
```

### 2. 使用 Cursor Chat
在 Chat 中输入：
```
Review @TourEnquiry.tsx and suggest 3 improvements to increase form conversion rate
```

### 3. 批量修改
```
Update all image alt tags across @TourHero.tsx, @TourGallery.tsx, and @TourItinerary.tsx to include "China Tour from New Zealand" keyword
```

### 4. 添加新功能
```
Create a exit-intent popup component that offers a 10% discount when users are about to leave the tour page
```

---

## 📊 监控与分析

### Google Analytics 4 配置
在 GA4 中配置以下事件：
1. `form_submission` - 表单提交
2. `click_to_call` - 电话点击
3. `check_availability_click` - CTA 点击
4. `faq_expand` - FAQ 展开（可选）

### Google Ads 转化配置
1. 导入 GA4 转化事件
2. 设置转化价值
3. 配置归因模型

---

## 🚨 常见问题

### Q: GTM 没有触发？
A: 检查 `.env.local` 文件中 `NEXT_PUBLIC_GTM_ID` 是否正确配置

### Q: Schema 验证失败？
A: 使用 Google Rich Results Test 验证 JSON-LD 格式

### Q: 浮动 CTA 不显示？
A: 检查页面是否有 `#enquiry` 元素，并确保滚动超过 Hero 区域

### Q: FAQ Schema 没有显示？
A: 确保 FAQSection 组件已渲染，并使用 Google Rich Results Test 验证

---

**🎉 现在你可以在 Cursor 中高效地使用这些提示词进行进一步优化了！**
