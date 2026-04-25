# T061 步骤1：Airtable Base 创建 + 数据导入

**预计时间：15 分钟**
**状态：准备就绪**

---

## 第一阶段：创建 Airtable Base

### 1.1 注册 / 登录 Airtable
- 打开 https://airtable.com
- 用邮箱登录或新注册

### 1.2 创建新 Base
1. 点击 **Create** (或主页 "New")
2. 选择 **Start from scratch**
3. 命名：`CTS T061 April Social`
4. 点击 **Create base**

### 1.3 删除默认表格
- 右键点击左侧默认的 "Table 1" → **Delete table** → 确认删除

---

## 第二阶段：导入 CSV 数据

### 2.1 新建并导入
1. 左侧点击 **+** (Add a table)
2. 选择 **Import data** → **CSV**
3. 上传文件：`T061-Airtable-导入数据.csv`
4. Airtable 预览 CSV 字段 → 检查无误
5. 点击 **Import**

✅ **15 条帖子数据自动导入完成**

---

## 第三阶段：检查字段类型（重要！）

导入后，检查每个字段的类型。点击列名 → 右侧 **Edit field** → 验证类型：

| 字段名 | 应该的类型 | 检查项 |
|--------|---------|--------|
| **Date** | Date | 格式显示为 2026-04-21 ✓ |
| **Day_of_Week** | Single line text | Monday, Tuesday... ✓ |
| **Time_NZST** | Single line text | 08:00, 10:30... ✓ |
| **Platform** | Single select | 选项：Instagram, Facebook ✓ |
| **Product** | Single select | Shanghai & Surroundings, A Tale of Two Cities, Visa-Free Education, Planning Tips, Social Proof |
| **Format** | Single select | Reel, Feed, Story |
| **Ratio** | Single line text | 9:16, 4:5 ✓ |
| **Headline_EN** | Single line text | ✓ |
| **Caption_EN** | Long text | ✓ |
| **Hashtags_IG** | Single line text | ✓ |
| **URL_Organic_UTM** | URL | 格式检查 ✓ |
| **LoveArt_Prompt_EN** | Long text | ✓ |
| **Image_URL** | URL | 目前为空（待填充） |
| **Status** | Single select | 选项：draft, ready, published |
| **Internal_Notes_ZH** | Long text | 中文备注 ✓ |

**如果类型不对，点击列名 → Edit field → 改正类型**

---

## 第四阶段：创建 Views（便于管理）

在 Airtable 中创建 3 个视图，方便后续操作：

### 4.1 Timeline View（按日期）
1. 左侧 **+** → 选择 **Calendar**
2. 选择日期字段：**Date**
3. 点击 **Create view** → 命名：`Timeline`

### 4.2 By Status View（按状态分组）
1. 左侧 **+** → 选择 **Grid**
2. 点击 **Group** → 选择 **Status**
3. 点击 **Create view** → 命名：`By Status`

### 4.3 By Platform View（按平台分组）
1. 左侧 **+** → 选择 **Grid**
2. 点击 **Group** → 选择 **Platform**
3. 点击 **Create view** → 命名：`By Platform`

---

## ✅ Step 1 完成检查清单

- [ ] Base "CTS T061 April Social" 已创建
- [ ] 15 条帖子数据已导入
- [ ] 所有字段类型已验证
- [ ] Timeline、By Status、By Platform 三个视图已创建
- [ ] 所有帖子的 Status 目前为 "draft"
- [ ] Image_URL 字段为空（待 Step 3 填充）

---

## 🔗 下一步

完成后，开始 **Step 2：配置 Make.com 自动化工作流**

---

**时间戳：2026-04-20**  
**创建者：Claude**
