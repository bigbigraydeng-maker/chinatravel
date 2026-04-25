# China Travel 数字增长方案 - 测试验证清单

## ✅ 功能测试清单

### P0-1: GTM/GA4 转化跟踪

#### 测试步骤：
1. **环境配置检查**
   ```bash
   # 检查 .env.local 文件是否存在
   ls -la .env.local
   
   # 检查 GTM ID 是否配置
   grep NEXT_PUBLIC_GTM_ID .env.local
   ```

2. **GTM 加载测试**
   - [ ] 打开浏览器开发者工具
   - [ ] 访问首页 `http://localhost:3000`
   - [ ] 查看 Network 标签
   - [ ] 搜索 "googletagmanager"
   - [ ] 确认 GTM 脚本成功加载（状态码 200）

3. **数据层（Data Layer）测试**
   - [ ] 在 Console 中输入：`window.dataLayer`
   - [ ] 确认 dataLayer 数组存在
   - [ ] 检查是否有 `pageview` 事件

4. **表单提交追踪测试**
   - [ ] 访问任意 tour 页面
   - [ ] 滚动到 enquiry 表单
   - [ ] 填写表单并提交
   - [ ] 在 Console 中输入：`window.dataLayer`
   - [ ] 查找 `form_submission` 事件
   - [ ] 验证事件包含：`tour_name`, `tour_slug`

5. **电话点击追踪测试**
   - [ ] 在页面中找到电话号码链接
   - [ ] 点击电话号码
   - [ ] 检查 dataLayer 中是否有 `click_to_call` 事件

6. **下载追踪测试**
   - [ ] 点击 "Print / PDF" 或 "Email Me This" 按钮
   - [ ] 检查 dataLayer 中是否有 `download` 事件

---

### P0-2: 落地页 CRO 优化

#### 测试步骤：

1. **TrustBar 测试**
   - [ ] 访问 tour 页面
   - [ ] 确认 TrustBar 在 Hero 下方显示
   - [ ] 验证 4 个信任徽章都正确显示
   - [ ] 检查徽章图标和文字是否清晰

2. **AvailabilityBadge 测试**
   - [ ] 检查 Hero 区域是否显示库存提示
   - [ ] 验证 "Only 5 seats left" 标签
   - [ ] 检查倒计时是否正常工作（天、时、分）
   - [ ] 确认出发日期格式正确

3. **Floating CTA 测试**
   - [ ] 使用手机模式或调整浏览器窗口到移动端尺寸
   - [ ] 向下滚动页面，超过 Hero 区域
   - [ ] 确认浮动 CTA 按钮出现
   - [ ] 点击按钮，确认平滑滚动到 enquiry 表单
   - [ ] 检查 Console 是否有点击事件追踪

4. **简化表单测试**
   - [ ] 检查 enquiry 表单是否只有 3 个字段
   - [ ] 验证字段：Name, Email, Phone Number
   - [ ] 确认 Message 字段已移除
   - [ ] 检查 CTA 按钮文案："Check Availability"
   - [ ] 提交表单，验证成功消息显示

5. **响应式设计测试**
   - [ ] 在桌面端（1920x1080）测试
   - [ ] 在平板端（768x1024）测试
   - [ ] 在移动端（375x667）测试
   - [ ] 确认所有组件在各尺寸下正常显示

---

### P1-1: JSON-LD 结构化数据

#### 测试步骤：

1. **Schema 标记验证**
   - [ ] 访问 tour 页面
   - [ ] 查看页面源代码（Ctrl+U）
   - [ ] 搜索 `application/ld+json`
   - [ ] 确认有 3 个 script 标签（TouristTrip, Product, Breadcrumb）

2. **Google Rich Results 测试**
   - [ ] 访问：https://search.google.com/test/rich-results
   - [ ] 输入页面 URL 或复制 JSON-LD 代码
   - [ ] 运行测试
   - [ ] 验证以下 Schema 类型：
     - [ ] TouristTrip ✅
     - [ ] Product ✅
     - [ ] BreadcrumbList ✅

3. **Schema 内容验证**
   - [ ] 检查 TouristTrip Schema 包含：
     - [ ] name（tour 标题）
     - [ ] description（简短描述）
     - [ ] image（hero 图片）
     - [ ] offers（价格和货币）
     - [ ] itinerary（行程列表）
     - [ ] provider（CTS Tours 信息）
   - [ ] 检查 Product Schema 包含：
     - [ ] brand（CTS Tours）
     - [ ] offers（价格信息）
     - [ ] additionalProperty（duration, tier, destination）

---

### P1-2: Metadata 优化

#### 测试步骤：

1. **Title 标签测试**
   - [ ] 访问 tour 页面
   - [ ] 查看浏览器标签页标题
   - [ ] 验证格式：`[Tour Name] | [Duration] | [Departure Date] | CTS NZ`
   - [ ] 示例：`Imperial Beijing | 5 Days | Oct 14, 2025 | CTS NZ`

2. **Meta Description 测试**
   - [ ] 查看页面源代码
   - [ ] 搜索 `<meta name="description"`
   - [ ] 验证 description 内容正确

3. **Open Graph 测试**
   - [ ] 使用 Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - [ ] 输入页面 URL
   - [ ] 验证 OG title, description, image 正确显示

4. **图片 Alt 标签测试**
   - [ ] 查看 Hero 图片
   - [ ] 检查 alt 属性包含关键词
   - [ ] 示例：`Imperial Beijing - China Tour from New Zealand | Signature Collection`

5. **Heading 层次结构测试**
   - [ ] 使用 Lighthouse 检查
   - [ ] 验证 H1 只有一个（tour 标题）
   - [ ] 验证 H2 用于主要章节
   - [ ] 验证 H3 用于子章节

---

### P2-1: FAQ 模块

#### 测试步骤：

1. **FAQ 显示测试**
   - [ ] 滚动到页面底部
   - [ ] 确认 FAQ 章节在 RelatedTours 之后显示
   - [ ] 验证标题："Frequently Asked Questions"
   - [ ] 检查 8 个默认问题都显示

2. **手风琴交互测试**
   - [ ] 点击问题，验证答案展开
   - [ ] 再次点击，验证答案收起
   - [ ] 检查动画是否流畅
   - [ ] 验证键盘导航（Tab, Enter）

3. **FAQ Schema 测试**
   - [ ] 查看页面源代码
   - [ ] 搜索 `FAQPage`
   - [ ] 验证 JSON-LD 包含所有 8 个问题
   - [ ] 使用 Google Rich Results Test 验证

4. **CTA 链接测试**
   - [ ] 点击 "Contact Our Specialists" 按钮
   - [ ] 验证页面平滑滚动到 enquiry 表单

---

## 🧪 综合测试场景

### 场景 1：完整用户旅程
1. 用户从 Google 搜索进入 tour 页面
2. 看到优化的 title 和 description ✅
3. 页面加载，GTM 追踪 pageview ✅
4. 看到 TrustBar，建立信任 ✅
5. 看到 AvailabilityBadge，产生紧迫感 ✅
6. 滚动页面，Floating CTA 出现 ✅
7. 点击 CTA，滚动到表单 ✅
8. 填写简化表单并提交 ✅
9. 触发 form_submission 事件 ✅

### 场景 2：AI 搜索优化验证
1. Google 爬虫抓取页面 ✅
2. 解析 JSON-LD Schema ✅
3. 识别 TouristTrip 和 Product 信息 ✅
4. 提取 FAQ 内容 ✅
5. 在 AI 搜索结果中展示丰富摘要 ✅

---

## 📊 性能测试

### Lighthouse 测试
```bash
# 在 Chrome DevTools 中
# 1. 打开 DevTools (F12)
# 2. 选择 Lighthouse 标签
# 3. 选择所有类别
# 4. 点击 "Analyze page load"
```

**目标分数：**
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 95+

### 核心 Web 指标
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

---

## 🔍 浏览器兼容性测试

### 桌面浏览器
- [ ] Chrome (最新版)
- [ ] Firefox (最新版)
- [ ] Safari (最新版)
- [ ] Edge (最新版)

### 移动浏览器
- [ ] Safari iOS (iPhone)
- [ ] Chrome Android
- [ ] Samsung Internet

---

## ✅ 上线前检查清单

### 代码检查
- [ ] 所有 TypeScript 类型定义完整
- [ ] 无 Console 错误
- [ ] 无 Console 警告
- [ ] 环境变量已配置
- [ ] .env.local 已添加到 .gitignore

### 功能检查
- [ ] GTM 追踪正常工作
- [ ] 所有转化事件触发正确
- [ ] Schema 验证通过
- [ ] Metadata 优化完成
- [ ] FAQ 模块正常工作

### 性能检查
- [ ] Lighthouse 分数达标
- [ ] 页面加载时间 < 3s
- [ ] 图片已优化
- [ ] 无内存泄漏

### SEO 检查
- [ ] Google Search Console 验证
- [ ] robots.txt 配置正确
- [ ] sitemap.xml 已更新
- [ ] canonical URL 正确设置

---

## 🐛 已知问题与解决方案

### 问题 1: GTM 在本地环境不加载
**原因**: NEXT_PUBLIC_GTM_ID 未配置
**解决**: 创建 .env.local 文件并填入 GTM ID

### 问题 2: Floating CTA 在桌面端显示
**原因**: 滚动逻辑判断问题
**解决**: 检查 isVisible 逻辑，确保只在移动端显示

### 问题 3: Schema 验证失败
**原因**: JSON-LD 格式错误
**解决**: 使用 JSON 验证工具检查格式

### 问题 4: FAQ 展开动画卡顿
**原因**: CSS transition 配置问题
**解决**: 优化动画性能，使用 transform 而非 height

---

## 📝 测试报告模板

```markdown
## 测试报告

**测试日期**: YYYY-MM-DD
**测试人员**: [姓名]
**测试环境**: [本地/生产]

### P0-1: GTM/GA4 转化跟踪
- [ ] GTM 加载：通过/失败
- [ ] 表单追踪：通过/失败
- [ ] 电话追踪：通过/失败
- [ ] 下载追踪：通过/失败

### P0-2: CRO 优化
- [ ] TrustBar: 通过/失败
- [ ] AvailabilityBadge: 通过/失败
- [ ] Floating CTA: 通过/失败
- [ ] 简化表单：通过/失败

### P1-1: Schema 数据
- [ ] TouristTrip: 通过/失败
- [ ] Product: 通过/失败
- [ ] Breadcrumb: 通过/失败

### P1-2: Metadata
- [ ] Title: 通过/失败
- [ ] Description: 通过/失败
- [ ] OG Tags: 通过/失败

### P2-1: FAQ 模块
- [ ] 显示：通过/失败
- [ ] 交互：通过/失败
- [ ] Schema: 通过/失败

### Lighthouse 分数
- Performance: XX
- Accessibility: XX
- Best Practices: XX
- SEO: XX

### 备注
[记录任何发现的问题或建议]
```

---

**🎉 完成所有测试后，你的网站就已经准备好迎接流量转化了！**
