# ⚡ OP 行程生成器 — 快速开始（5 分钟）

## ✅ 前置检查

```bash
# 1. 确保所有文件已创建
ls src/lib/itinerary/
ls src/app/admin/itinerary-generator/
ls src/components/admin/
ls src/app/api/itinerary/

# 2. 验证 Next.js 版本（应为 14+）
npm list next

# 3. 清理并重装依赖（如有问题）
rm -rf node_modules package-lock.json
npm install
```

## 🔧 配置

### 步骤 1：设置环境变量

编辑 `.env.local`：

```env
# 必需：OP 界面密码
ITINERARY_ADMIN_PASSWORD=SecurePassword@2026

# 可选：Resend 邮件 API（后期配置）
# RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

### 步骤 2：启动开发服务器

```bash
npm run dev

# 输出应该显示：
# ▲ Next.js 14.0.0
# - Local:        http://localhost:3010
```

### 步骤 3：访问 OP 工作台

在浏览器打开：
```
http://localhost:3010/admin/itinerary-generator?key=SecurePassword@2026
```

## 🎯 第一次使用（测试行程）

### 表单填写示例

| 字段 | 值 |
|------|-----|
| 客户姓名 | 张三 |
| 邮箱 | zhangsan@example.com |
| 电话 | +64-20-1234567 |
| 人数 | 4 |
| 目的地 | 北京 |
| 天数 | 5 |
| 预算 | 120000 |
| 客户类型 | 奖励旅游 |
| 偏好 | ✓ 文化遗产、✓ 美食体验 |

### 点击"生成行程"

稍等 2-3 秒，右侧应该出现：
- ✅ 行程标题（张三的 5 日北京行程）
- ✅ 费用分解表
- ✅ 每日行程安排（5 天卡片）
- ✅ 三个导出按钮

### 测试导出

1. **下载 PDF**
   - 点击"下载精美 PDF"
   - 浏览器自动下载 HTML 文件
   - 用 Chrome 打开 → 按 Ctrl+P 转换为 PDF

2. **复制 JSON**
   - 点击"复制 JSON 数据"
   - 验证剪贴板有数据

3. **邮件发送**（需配置 Resend）
   - 当前会报错（Resend API Key 未设置）
   - 这是正常的

---

## 📧 配置 Resend 邮件（可选，后期做）

### 获取 API Key

1. 访问 https://resend.com
2. Sign Up → 创建账户
3. 在 Dashboard 获取 API Key（格式：`re_xxxxxxxxxxxxxxxx`）

### 配置域名

1. 在 Resend 中添加域名：`ctstours.co.nz`
2. 按照指示添加 DNS 记录（CNAME）
3. 验证成功后，邮件发送就能工作

### 更新环境变量

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

---

## 🚀 部署到 Render

### 第 1 步：推送到 GitHub

```bash
git add src/lib/itinerary src/app/api/itinerary src/components/admin src/app/admin
git add ITINERARY_GENERATOR_GUIDE.md ITINERARY_QUICK_START.md
git commit -m "feat: add OP itinerary generator system"
git push origin main
```

### 第 2 步：在 Render 设置环境变量

1. 登录 Render Dashboard
2. 进入你的 ChinaTravel 服务
3. Settings → Environment Variables
4. 添加：
   ```
   ITINERARY_ADMIN_PASSWORD = [your-password]
   RESEND_API_KEY = [your-resend-api-key]
   ```
5. 保存 → Render 自动重新部署

### 第 3 步：验证生产环境

访问：
```
https://www.ctstours.co.nz/admin/itinerary-generator?key=[your-password]
```

---

## 🔍 故障排查

### 页面显示 404

**原因：** 路由未创建  
**解决：** 检查文件路径
```bash
ls src/app/admin/itinerary-generator/page.tsx
```

### 表单提交报错

**原因：** API 端点有问题  
**解决：** 检查浏览器开发者工具（F12）→ Network 标签，查看 POST 请求响应

### 邮件发送失败

**原因：** 
1. Resend API Key 未设置
2. 邮件域名未验证

**解决：** 
1. 检查 `.env.local` 中 `RESEND_API_KEY` 是否正确
2. 在 Resend Dashboard 验证域名

---

## 📊 工作流完整示例

```
OP 打开 /admin/itinerary-generator
           ↓
   填表（5分钟）← 客户信息、行程参数
           ↓
   点击生成行程
           ↓
   系统返回行程（2秒）
           ↓
   网页预览行程
           ↓
   选择导出方式
       ├─ PDF 下载（完整排版）
       ├─ 邮件发送（HTML格式）
       └─ JSON 复制（备份数据）
           ↓
   客户收到行程方案
           ↓
   OP 与客户确认细节
           ↓
   行程预订确认
```

---

## 💡 Pro Tips

### 快速复用行程数据

如果需要给同一客户重新生成行程：

1. 点击"复制 JSON 数据"
2. 保存到文本编辑器
3. 修改必要字段（如日期、预算）
4. 用 JSON 重新提交（目前需手动调用 API，UI 暂未支持）

### 批量生成行程

使用 JavaScript 脚本：

```javascript
// 在浏览器控制台运行
const customers = [
  { name: '李四', email: 'li@example.com', groupSize: 2, days: 3, budget: 50000 },
  { name: '王五', email: 'wang@example.com', groupSize: 4, days: 5, budget: 120000 }
]

for (const customer of customers) {
  const response = await fetch('/api/itinerary/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: { ...customer, phone: '', email: customer.email },
      destination: 'beijing',
      customerType: 'family',
      preferences: ['cultural', 'food']
    })
  })
  console.log(`生成 ${customer.name} 的行程完成`)
}
```

---

## 🎓 系统内部工作原理（对 OP 可选了解）

### 行程生成算法

```
输入：天数、预算、偏好
    ↓
1. 计算人均预算
    ↓
2. 按偏好筛选景点
    ↓
3. 按"性价比"排序景点（价格/时长）
    ↓
4. 为每一天选择 2-3 个景点（不超预算）
    ↓
5. 为每个城市分配对应等级的酒店
    ↓
6. 分配餐食（早/午/晚）
    ↓
输出：完整行程（7 个字段 × N 天）
```

### 费用分配逻辑

```
总预算 = ¥120,000
人数 = 4 人
人均 = ¥30,000

分配：
  景点（40%）= ¥48,000 → 人均 ¥12,000
  住宿（35%）= ¥42,000 → 5晚 × ¥8,400/晚
  餐食（20%）= ¥24,000 → 人均 ¥6,000/5天
  其他（5%）  = ¥6,000 → 交通、导游
```

---

## 📞 需要帮助？

### 常见问题

**Q: 如何更改景点或价格？**  
A: 编辑 `src/lib/itinerary/engine.ts` → `initializeData()` 方法

**Q: 如何支持多城市组合（如 Beijing-Xi'an-Shanghai）？**  
A: 见 ITINERARY_GENERATOR_GUIDE.md → "后续优化方向"

**Q: 如何保存行程历史？**  
A: 需要迁移到 Supabase 数据库（后期升级）

### 反馈与建议

- 邮件：support@ctstours.co.nz
- GitHub Issues：提交 bug 报告

---

## ✨ 下一步

- [ ] 本地测试 ✅ (现在做这个)
- [ ] 配置 Resend 邮件 (后期)
- [ ] 部署到 Render
- [ ] OP 团队培训
- [ ] 生产环境 Go Live

**预计时间表：**
- 开发：完成 ✅
- 测试：1-2 天
- 部署：1 天
- 培训：1 小时

---

**版本：** v1.0  
**最后更新：** 2026-04-21  
**状态：** 🟢 就绪
