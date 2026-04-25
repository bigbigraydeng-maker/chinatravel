# PDF 导出功能测试指南

## 功能概述
PDF 导出现在包含目的地风景图片，每次点击"下载精美 PDF"按钮时，都会生成包含图片的精美行程册。

## 测试步骤

### 1. 启动开发服务器
```bash
npm run dev
# 访问 http://localhost:3010/itinerary-generator
```

### 2. 生成行程单
- 填写客户信息（名字、邮箱、电话、人数）
- 选择目的地：**Auckland（奥克兰）** 或其他支持的目的地
- 设置天数：3-7 天
- 输入预算：50,000+ NZD
- 选择客户类型和偏好
- 点击"生成行程"按钮

### 3. 测试 PDF 导出
- 等待右侧预览区显示行程
- 点击"下载精美 PDF"按钮
- 浏览器会打开一个新标签页，显示 HTML 行程册
- **验证：** 顶部应该显示目的地的风景图片

### 4. 保存为 PDF
- 点击浏览器菜单 **文件 → 打印**（或按 `Ctrl+P`）
- 选择"另存为 PDF"
- 点击保存

### 5. 验证内容
打开已保存的 PDF 文件，检查：
- ✅ 标题页包含目的地图片
- ✅ 客户信息显示正确
- ✅ 每日行程安排完整
- ✅ 费用预算表格正确
- ✅ 所有文字、表格、图片打印清晰

## 支持的目的地

| 目的地 | 英文 | 图片来源 |
|--------|------|--------|
| 奥克兰 | Auckland | Unsplash |
| 罗托鲁阿 | Rotorua | Unsplash |
| 皇后镇 | Queenstown | Unsplash |
| 霍比特人村 | Hobbiton | Unsplash |
| 怀托摩 | Waitomo | Unsplash |
| 陶波 | Taupo | Unsplash |

## 技术细节

### 文件位置
- API 路由：`src/app/api/itinerary/export-pdf/route.ts`
- 核心函数：`generateItineraryHTML()`
- 图片映射：`NZ_DESTINATION_IMAGES`

### 关键特性
1. **图片 CDN** - 使用 Unsplash CDN，自动加载，无需本地存储
2. **响应式设计** - 图片自动缩放适配浏览器和打印尺寸
3. **打印优化** - 特殊的 `@media print` CSS 确保图片清晰打印
4. **异步加载** - `generateItineraryHTML()` 现在是 async 函数

### 图片 URL 格式
```
https://images.unsplash.com/photo-XXXXX?w=800&q=80
参数说明：
- w=800    : 宽度 800px（平衡质量和加载速度）
- q=80     : 质量 80%（足够清晰，文件更小）
```

## 常见问题

### Q: 图片加载失败怎么办？
A: 检查网络连接。Unsplash CDN 有时在特定地区可能较慢。可以替换为本地图片 URL。

### Q: 如何更换目的地图片？
A: 编辑 `src/app/api/itinerary/export-pdf/route.ts` 中的 `NZ_DESTINATION_IMAGES` 对象，修改 URL：
```typescript
auckland: {
  url: 'https://your-image-url.jpg',
  alt: 'Your Description',
}
```

### Q: PDF 保存后格式不对怎么办？
A: 建议使用 Chrome、Edge 或 Firefox 的"另存为 PDF"功能，避免使用第三方工具。

## 下一步改进

- [ ] 集成实际 PDF 库（puppeteer 或 pdfkit）生成真实 PDF，而不是通过浏览器打印
- [ ] 为每个 Day 的行程添加对应景点的小缩略图
- [ ] 支持多语言（英文）版本
- [ ] 添加水印和公司 logo
- [ ] 支持邮件发送 PDF 附件

## 联系方式
如有问题，请查看 API 路由文件或咨询开发团队。
