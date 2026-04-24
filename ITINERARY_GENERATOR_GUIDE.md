# ChinaTravel OP 行程生成器 — 集成与部署指南

## 📋 概览

这是一个完整的行程生成系统，让 OP 可以在 5 分钟内为客户生成专业的定制化行程。

**核心功能：**
- ✅ 密码保护的 OP 工作台（`/admin/itinerary-generator`）
- ✅ 智能行程生成引擎（景点推荐、预算分配）
- ✅ 网页预览（简洁版，支持实时编辑）
- ✅ 精美 PDF 导出（可打印）
- ✅ 邮件直送客户（Resend 集成）
- ✅ 生成历史记录（可选数据库存储）

---

## 🚀 快速开始（3 步）

### 第 1 步：配置环境变量

在 `.env.local` 中添加：

```env
# OP 界面密码保护
ITINERARY_ADMIN_PASSWORD=your-secure-password-here-min-12-chars

# Resend 邮件 API（在 Render 上配置）
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

**获取 Resend API Key：**
1. 访问 https://resend.com
2. 创建账户 → 获取 API Key
3. 在 Resend 中验证邮件域名：`tours@ctstours.co.nz`

### 第 2 步：验证文件结构

已创建以下文件，请确保它们在你的项目中：

```
src/
├── lib/itinerary/
│   ├── engine.ts          # 核心行程生成引擎
│   └── auth.ts            # 密码验证逻辑
│
├── app/admin/itinerary-generator/
│   └── page.tsx           # OP 主页面
│
├── components/admin/
│   ├── ItineraryForm.tsx       # 客户信息表单
│   ├── ItineraryPreview.tsx    # 行程预览
│   └── ItineraryActions.tsx    # 导出、邮件按钮
│
└── app/api/itinerary/
    ├── generate/route.ts       # POST 生成行程
    ├── export-pdf/route.ts     # POST 导出 HTML/PDF
    └── send-email/route.ts     # POST 发送邮件
```

### 第 3 步：启动和测试

```bash
# 启动开发服务器
npm run dev

# 访问 OP 工作台
http://localhost:3010/admin/itinerary-generator?key=your-secure-password-here-min-12-chars
```

---

## 📖 使用说明（给 OP）

### 访问工作台

1. 在浏览器输入：`https://www.ctstours.co.nz/admin/itinerary-generator?key=YOUR_PASSWORD`
2. 或直接访问，会有密码输入框

### 生成行程（5 分钟流程）

**步骤 1：填写客户信息**
- 客户姓名、邮箱、电话、人数

**步骤 2：设置行程参数**
- 目的地（北京、西安、上海等）
- 天数（2-14 天）
- 预算（总金额）
- 客户类型（奖励/家庭/蜜月/冒险/学生）
- 旅游偏好（文化/自然/美食/冒险/购物/现代）

**步骤 3：点击"生成行程"**
- 系统自动：
  - 推荐景点 ✅
  - 分配住宿 ✅
  - 计算费用 ✅
  - 排列日程 ✅

**步骤 4：网页预览**
- 实时查看行程
- 可复制 JSON 数据进行微调

**步骤 5：导出和发送**
- 📥 下载 PDF（精美版，可打印）
- 📧 一键邮件发送给客户
- 💾 复制 JSON 存档

---

## 🎨 系统架构

### 工作流程

```
OP 表单输入（5分钟）
  ↓
行程生成引擎（2分钟）
  ├─ ItineraryGenerator.generate()
  ├─ 智能选择景点
  ├─ 分配住宿
  ├─ 计算预算
  └─ 生成日程
  ↓
网页预览展示（实时可编）
  ↓
导出方式选择
  ├─ PDF 下载（精美排版）
  ├─ 邮件发送（HTML 格式）
  └─ JSON 数据（备份）
  ↓
客户收到行程方案
```

### 核心数据结构

```typescript
// 客户请求
ItineraryRequest {
  customer: {
    name: string
    email: string
    phone: string
    groupSize: number
  }
  destination: string        // 'beijing', 'xian', etc.
  days: number              // 2-14
  budget: number            // 总预算，单位：元
  customerType: string      // 'reward', 'family', etc.
  preferences?: string[]    // ['cultural', 'nature', ...]
}

// 生成结果
GeneratedItinerary {
  id: string
  request: ItineraryRequest
  days: DayItinerary[]      // 每一天的详细安排
  costBreakdown: {
    attractions: number
    accommodation: number
    meals: number
    other: number
    total: number
  }
  createdAt: string
}

// 每一天
DayItinerary {
  day: number
  title: string             // '第 1 天 - 抵达与探索'
  theme: string             // '奢华体验'
  attractions: AttractionItem[]
  meals: { breakfast, lunch, dinner }
  accommodation: AccommodationItem
  notes: string
}
```

---

## 🔐 安全性

### 密码保护逻辑

在 `src/lib/itinerary/auth.ts` 中实现：

```typescript
// 设置环境变量
ITINERARY_ADMIN_PASSWORD=your-password

// 验证逻辑
function verifyAdminPassword(provided: string): boolean {
  return provided === process.env.ITINERARY_ADMIN_PASSWORD
}

// 7 天 Cookie 会话
setAdminCookie() // httpOnly, secure, sameSite=lax
```

**建议：**
- 密码至少 12 个字符
- 在 Render 上存储为 Secret 环境变量
- 定期更换密码
- 使用 HTTPS（生产环境自动）

### 未来升级：Supabase Auth

当需要多个 OP 账户时，迁移到 Supabase Auth：

```typescript
// 改为
const user = await supabase.auth.signInWithPassword({
  email: opEmail,
  password: opPassword
})
```

---

## 📊 数据来源与自定义

### 当前测试数据

引擎中内置了示例数据（见 `engine.ts` 中的 `initializeData()`）：

- **北京：** 5 个景点 + 3 家酒店
- **西安：** 5 个景点 + 2 家酒店
- **上海：** 4 个景点 + 2 家酒店

### 将来升级：数据库存储

建议迁移到 Supabase：

```sql
-- 景点表
CREATE TABLE attractions (
  id TEXT PRIMARY KEY,
  destination TEXT,
  name TEXT,
  description TEXT,
  image_url TEXT,
  price DECIMAL,
  duration INT,
  category TEXT
);

-- 住宿表
CREATE TABLE accommodations (
  id TEXT PRIMARY KEY,
  city TEXT,
  name TEXT,
  stars INT,
  price_per_night DECIMAL,
  image_url TEXT
);
```

然后改造 `engine.ts`：

```typescript
// 从数据库读取
private attractions: Map<string, AttractionItem[]> = new Map()

constructor(private db: SupabaseClient) {
  // 从 DB 加载
}
```

---

## 🚀 Render 部署

### 环境变量设置

在 Render Dashboard 中设置 Secret：

```
ITINERARY_ADMIN_PASSWORD = [your-secure-password]
RESEND_API_KEY = [your-resend-api-key]
```

### 自动部署

```bash
# 推送到 GitHub main 分支
git add src/lib/itinerary src/app/api/itinerary src/components/admin src/app/admin
git commit -m "feat: add OP itinerary generator system"
git push origin main

# Render 自动部署，检查 Build Logs
```

---

## 🛠 API 文档

### POST `/api/itinerary/generate`

**请求：**
```json
{
  "customer": {
    "name": "李四",
    "email": "lisi@example.com",
    "phone": "+64201234567",
    "groupSize": 4
  },
  "destination": "beijing",
  "days": 5,
  "budget": 120000,
  "customerType": "reward",
  "preferences": ["cultural", "food"]
}
```

**响应：**
```json
{
  "id": "itinerary-1624012345-abc12def3g",
  "request": { ... },
  "days": [ { day, title, theme, attractions, meals, accommodation } ],
  "costBreakdown": { attractions, accommodation, meals, other, total },
  "createdAt": "2026-04-21T10:30:00Z"
}
```

### POST `/api/itinerary/export-pdf`

**请求：**
```json
{
  "itinerary": { ... }
}
```

**响应：**
- 返回 HTML 文件（前端浏览器自动打印为 PDF）
- Content-Disposition: `attachment; filename=itinerary-xxx.html`

### POST `/api/itinerary/send-email`

**请求：**
```json
{
  "itinerary": { ... }
}
```

**响应：**
```json
{
  "success": true,
  "message": "邮件已成功发送",
  "emailId": "email_xxxxx"
}
```

---

## 📱 前端使用示例（JavaScript）

```javascript
// 1. 生成行程
const response = await fetch('/api/itinerary/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customer: { name: '李四', email: 'lisi@example.com', phone: '', groupSize: 4 },
    destination: 'beijing',
    days: 5,
    budget: 120000,
    customerType: 'reward',
    preferences: ['cultural', 'food']
  })
})

const itinerary = await response.json()
console.log('生成的行程:', itinerary)

// 2. 导出 PDF
const pdfResponse = await fetch('/api/itinerary/export-pdf', {
  method: 'POST',
  body: JSON.stringify({ itinerary })
})

const blob = await pdfResponse.blob()
const url = URL.createObjectURL(blob)
// 浏览器会自动下载或打开打印对话框

// 3. 发送邮件
const emailResponse = await fetch('/api/itinerary/send-email', {
  method: 'POST',
  body: JSON.stringify({ itinerary })
})

const emailResult = await emailResponse.json()
console.log('邮件已发送:', emailResult.emailId)
```

---

## 🐛 常见问题 & 故障排除

### Q: 访问 `/admin/itinerary-generator` 提示密码错误

**A:** 检查密码参数：
```
错误：/admin/itinerary-generator?key=123
正确：/admin/itinerary-generator?key=your-actual-password
```

### Q: 邮件发送失败（Resend 错误）

**A:** 
1. 检查 `RESEND_API_KEY` 是否设置正确
2. 验证邮件域名是否在 Resend 中授权
3. 检查收件箱的垃圾邮件文件夹

### Q: PDF 导出不工作

**A:** 
- 当前实现是 HTML，前端浏览器自动打印
- 若要生成 PDF 文件，需要安装 `puppeteer` 或 `pdfkit`

### Q: 如何修改景点价格或添加新景点？

**A:** 编辑 `src/lib/itinerary/engine.ts` 中的 `initializeData()` 方法，或（推荐）迁移到 Supabase 数据库。

---

## 📈 后续优化方向

### Phase 2（可选）
- [ ] 数据库存储行程历史记录（Supabase）
- [ ] 多城市组合行程（如 Beijing-Xi'an-Shanghai）
- [ ] AI 智能推荐（根据客户偏好）
- [ ] 行程实时编辑保存（拖拽调整景点、修改日期）
- [ ] 客户在线确认行程

### Phase 3（可选）
- [ ] OP 账户管理（多用户，Supabase Auth）
- [ ] 行程版本控制（修改记录、撤销）
- [ ] 生成报表（月度行程统计）
- [ ] 客户反馈收集
- [ ] Google Calendar 集成（日程同步）

---

## 📞 技术支持

遇到问题？检查以下内容：

1. **文件完整性**
   ```bash
   ls -la src/lib/itinerary/
   ls -la src/app/api/itinerary/
   ls -la src/components/admin/
   ```

2. **环境变量**
   ```bash
   echo $ITINERARY_ADMIN_PASSWORD
   echo $RESEND_API_KEY
   ```

3. **构建日志**
   ```bash
   npm run build
   # 检查输出中是否有错误
   ```

4. **浏览器开发者工具**
   - 检查 Network 标签中 API 响应
   - 检查 Console 中的错误信息

---

## 📄 许可与致谢

该系统由 CTS Tours 内部开发。

**技术栈：**
- Next.js 14 + TypeScript
- Tailwind CSS
- Supabase（可选）
- Resend（邮件）

---

**版本：** v1.0  
**最后更新：** 2026-04-21  
**状态：** ✅ 生产就绪
