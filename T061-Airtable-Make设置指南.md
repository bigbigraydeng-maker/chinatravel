# T061 Airtable + Make 自动化设置完整指南

**预计总时间：60-90分钟**  
**难度：⭐⭐（中等偏简单）**

---

## 阶段1：Airtable设置（15-20分钟）

### 步骤1.1：创建Airtable账户和Base

1. 打开 [airtable.com](https://airtable.com)
2. 点击 **Sign up** → 用邮箱注册
3. 创建新Base → 选择 **Start from scratch** → 命名为 `CTS T061 April Social`
4. 删除默认的 "Table 1" 表

### 步骤1.2：导入数据

**最简单的方法（推荐）：**

1. 打开新Base，点击左侧 **+ Add a table**
2. 选择 **Import data** → **CSV**
3. 上传文件：`T061-Airtable-导入数据.csv`（我刚创建的）
4. Airtable会自动识别字段 → 点击 **Import**
5. ✅ 15条帖子数据自动导入完成

### 步骤1.3：检查字段类型（5分钟）

导入后，检查每列的字段类型。点击列名 → **Edit field**：

| 字段名 | 应该是 | 检查 |
|--------|--------|------|
| Date | Date | 格式：2026-04-21 ✓ |
| Time_NZST | Single line text | 格式：08:00 ✓ |
| Platform | Single select | 包含：Facebook、Instagram ✓ |
| Product | Single select | 包含：Shanghai、Tale、Visa-Free等 ✓ |
| Status | Single select | 选项：draft、ready、published ✓ |
| Image_URL | URL | 留空待填 |
| Caption_EN | Long text | 自动识别 ✓ |

**如果字段类型不对，手动修改一下。**

### 步骤1.4：创建Views（5分钟）

创建以下视图便于管理：

1. **Timeline View**（按日期）
   - 左侧 + 符号 → **Grid** → **Calendar**
   - 选择 Date 字段 → **Create view** → 命名 `Timeline`

2. **By Platform View**（按平台）
   - 左侧 + 符号 → **Grid**
   - 点击 **Filter** → Date is on or after 2026-04-21
   - **Group by**: Platform → **Create view** → 命名 `By Platform`

3. **By Status View**（按状态）
   - 左侧 + 符号 → **Grid**
   - **Filter**: Status is not empty
   - **Group by**: Status → **Create view** → 命名 `By Status`

✅ **Airtable完成！**

---

## 阶段2：Make账户设置（10分钟）

### 步骤2.1：创建Make账户

1. 打开 [make.com](https://make.com)
2. 点击 **Sign up** → 用邮箱注册
3. 选择 **Free plan**（1000 operations/月足够了）
4. 验证邮箱 → 完成注册

### 步骤2.2：授权连接Airtable

1. 在Make dashboard，点击 **Create a new scenario**
2. 搜索 **Airtable** → 选择 **Airtable** module
3. 点击 **Create a connection**
4. 命名连接：`CTS Airtable`
5. 复制你的 **Airtable Personal Access Token**：
   - 去 airtable.com → 右上角 **Account**
   - **Develop** → **API tokens** 
   - 创建新token，名称：`CTS-Make`
   - 权限选择：data.records:read, data.records:write
   - **Generate token** → 复制token
6. 粘贴到Make的连接框 → **Save**

✅ **Airtable连接完成！**

---

## 阶段3：Make Workflow配置（40-50分钟）

### 步骤3.1：创建Trigger（监听Airtable）

**在Make Scenario中：**

1. 点击 **Search apps** → 搜索 **Airtable**
2. 选择 **Watch Records**
3. 配置：
   - **Connection**: CTS Airtable（刚创建的）
   - **Base ID**: `appXXXXXXXXXXXXX`（从Airtable URL复制）
     - Airtable URL: `https://airtable.com/appXXXXXXXX/tblYYYYYYYY`
     - 复制 `appXXXXXXXX` 部分
   - **Table**: `Table 1`（或你导入的表名）
   - **View**: `By Status`（或任意view）
   - **Trigger on**: **All records**
4. 点击 **OK** → **Run once** 测试

✅ **Trigger配置完成！**

---

### 步骤3.2：添加Filter（只处理"ready"状态的帖）

1. 点击Trigger下的 **+** → 搜索 **Router**
2. 在Router下添加 **Filter**
3. 配置：
   - **Condition**: Status (from Airtable) **equals** ready
4. 这样只有Status = "ready"的帖才会继续流程

✅ **Filter配置完成！**

---

### 步骤3.3：添加Buffer Action（发布到社交平台）

1. 在Filter下点击 **+** → 搜索 **Buffer**
2. 选择 **Create Post**
3. **Create a connection**：
   - 命名：`CTS Buffer`
   - 授权Buffer账户（Buffer会弹窗要求权限）
   - 授权成功后，选择你的 CTS Facebook/Instagram 账户
4. 配置Buffer Post字段：

**以下是字段映射（重点！）：**

```
Profile ID:     [手动选择 Facebook 或 Instagram 账户]

Text:           {Caption_EN}  ← 从Airtable拿

Media:          {Image_URL}   ← 图片URL（需要提前上传到网络）

Scheduled Time: {Date} + {Time_NZST}  
                ← Make可能需要用formatter转换时间格式
```

**时间格式处理（重要）：**

1. 在Buffer action前插入 **Text Aggregator** 或 **Array Aggregator**
2. 创建一个 ISO 8601 格式的时间戳：
   ```
   {Date}T{Time_NZST}:00+12:00
   ```
   例如：`2026-04-21T08:00:00+12:00`（NZST是UTC+12）

3. 在Buffer的 **Scheduled Time** 字段粘贴这个格式化后的时间

✅ **Buffer Action配置完成！**

---

### 步骤3.4：添加Update Record（标记已发布）

1. 在Buffer action下点击 **+** → 搜索 **Airtable**
2. 选择 **Update a Record**
3. 配置：
   - **Base ID**: 同上
   - **Table**: `Table 1`
   - **Record ID**: {ID} ← 从trigger的Airtable记录自动获取
   - **Fields to update**:
     - Status: `published`
     - 添加时间戳或备注（可选）

✅ **Workflow完全配置完成！**

---

## 阶段4：测试（15-20分钟）

### 步骤4.1：准备测试数据

在Airtable中：

1. 找到 **Post 1** (Apr 21, Shanghai Reel)
2. 编辑 **Image_URL** 字段，粘贴一个测试图片URL：
   ```
   https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80
   ```
3. 把Status改为 **ready**
4. 保存

### 步骤4.2：运行Workflow

1. 回到Make Scenario
2. 点击 **Run once** → 观察执行过程
3. 检查结果：
   - ✓ Airtable记录成功读取？
   - ✓ Filter条件是否匹配（Status = ready）？
   - ✓ Buffer是否收到Post请求？
   - ✓ Airtable的Status是否自动改为"published"？

### 步骤4.3：检查Buffer

1. 登录Buffer后台
2. 查看 **Pending Posts** 或 **Scheduled**
3. 确认Post 1已出现在排期中
4. 检查内容、图片、发布时间是否正确

✅ **测试完成！如果一切正常，可以批量导入其他14条帖了。**

---

## 阶段5：批量导入（10-15分钟）

### 步骤5.1：上传图片

这是最关键的一步。你有两个选择：

**选项A：用Airtable的Attachments字段**
1. 在Airtable创建新字段 **Image_File**（类型：Attachments）
2. 逐一上传15张LoveArt生成的图片
3. Make可以自动获取attachment的URL

**选项B：先上传到免费图床，然后填URL**
- 使用 Imgur、Cloudinary或Supabase的public bucket
- 把public URL填到 **Image_URL** 字段

**推荐：选项A**（用Airtable Attachments，因为不依赖外部图床）

### 步骤5.2：批量改Status为ready

1. 在Airtable的 **By Status** view
2. 逐条检查（或批量更新）Status字段为 **ready**
3. Make会自动为每条记录运行workflow

### 步骤5.3：监测发布

1. Make会每5-10分钟检查一次Airtable
2. 每当发现Status = "ready"的记录，就会推送到Buffer
3. Buffer排期显示所有帖子

✅ **全部完成！**

---

## 🎯 最终检查清单

**Airtable:**
- [ ] Base创建 + 15条记录导入
- [ ] 字段类型检查无误
- [ ] Timeline、By Platform、By Status三个views已创建
- [ ] Image_URL或Image_File字段已填充

**Make:**
- [ ] 账户创建 + Airtable授权
- [ ] Trigger: Watch Records (Base + Table正确)
- [ ] Filter: Status = ready
- [ ] Buffer Action: 字段映射正确，特别是时间格式
- [ ] Update Record: 发布后自动改Status为published

**Buffer:**
- [ ] 账户已授权给Make
- [ ] Facebook和Instagram账户都已连接

**测试：**
- [ ] Post 1成功发送到Buffer
- [ ] 时间、文案、图片都正确
- [ ] Airtable自动更新为published

---

## 🚨 常见问题解决

| 问题 | 症状 | 解决方案 |
|------|------|--------|
| **时间格式错误** | Buffer显示错误的发布时间 | 确保时间格式是 ISO 8601 (YYYY-MM-DDTHH:MM:SS+12:00) |
| **图片URL失效** | Buffer显示图片加载失败 | 检查URL是否有效（直接在浏览器打开URL） |
| **Make连接失败** | "Connection error" | 检查Airtable token是否有效，或重新生成 |
| **Buffer拒绝Post** | "Invalid field" | 检查必填字段（Profile ID、Text、Scheduled Time） |
| **Workflow没有运行** | 15分钟后还是draft | 检查Filter条件，确认Status确实改为ready |

---

## 📞 关键API信息

**你需要的三个关键信息：**

1. **Airtable Base ID**
   - 从URL: `https://airtable.com/appXXXXXXXX/tblYYYYYYYY`
   - Base ID = `appXXXXXXXX`

2. **Airtable Personal Access Token**
   - 去 Account → Develop → API tokens
   - 权限：data.records:read, data.records:write

3. **Buffer API**
   - Make已内置Buffer集成，不需要手动配置API
   - 只需授权账户即可

---

## ✅ 成功标志

当你看到以下情况，说明一切正常：

✅ Airtable显示15条记录，Status字段为draft  
✅ 改一条为ready后，1-5分钟内Make自动运行  
✅ Buffer后台出现新的scheduled post  
✅ Post的文案、图片、发布时间都正确  
✅ Airtable自动更新该记录为published  

---

**现在开始吧！预计1-1.5小时内可以完全setup好。有问题随时问我！** 🚀

