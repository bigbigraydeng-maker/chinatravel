# T061 步骤2：Make.com 自动化工作流配置 + 测试

**预计时间：30 分钟**
**状态：准备就绪**

---

## 第一阶段：Make 账户 + Airtable 连接

### 1.1 创建 / 登录 Make 账户
- 打开 https://make.com
- 用邮箱注册或登录
- 选择 **Free plan**（1000 operations/月足够）

### 1.2 生成 Airtable Personal Access Token
在 Airtable 中：
1. 登录 airtable.com
2. 右上角 **Account settings** (个人头像)
3. 左侧 **Develop** → **API tokens**
4. 点击 **Create new token**
5. 命名：`CTS-Make`
6. 权限选择：
   - ✓ data.records:read
   - ✓ data.records:write
7. 点击 **Generate token** → 复制 token（保存在记事本）

---

## 第二阶段：创建 Make Scenario

### 2.1 新建 Scenario
1. 在 Make dashboard，点击 **Create a new scenario**
2. 命名：`CTS Social Media Automation`

### 2.2 添加 Airtable Trigger
1. 搜索 **Airtable**
2. 选择 **Watch Records**
3. 点击 **Create a connection**
   - 命名连接：`CTS Airtable`
   - 粘贴刚才复制的 Personal Access Token
   - 点击 **Save**

4. 配置 Trigger：
   - **Base ID**：从 Airtable URL 复制
     - 示例：https://airtable.com/**appXXXXXXXXXXXXXX**/...
     - 复制 app 后面的部分
   - **Table**：选择你导入的表名（默认可能是 "imported table" 或自定义名称）
   - **View**：选择 **By Status** (或任意 view)
   - **Trigger on**：**All records**
   - 点击 **OK**

### 2.3 测试 Trigger
1. 点击 **Run once** 按钮
2. 观察右侧 Execution history：
   - ✓ 如果显示绿色，说明成功连接了 Airtable
   - ✓ 应该显示 15 条记录被读取

---

## 第三阶段：添加 Filter（只处理 Status="ready"）

### 3.1 添加 Router
1. 点击 Trigger 模块下的 **+** 按钮
2. 搜索 **Router**
3. 选择 **Router** 模块

### 3.2 添加 Filter
1. 在 Router 下点击 **+** → 搜索 **Filter**
2. 设置条件：
   - **Status** (Airtable 字段) **equals** ready
3. 这样只有 Status = "ready" 的记录才会继续流程

---

## 第四阶段：添加 Buffer Action（发布到社交媒体）

### 4.1 添加 Buffer Module
1. 在 Filter 下点击 **+** → 搜索 **Buffer**
2. 选择 **Create a post**
3. 点击 **Create a connection**
   - 命名：`CTS Buffer`
   - 授权你的 Buffer 账户（会弹窗要求登录 + 权限）
   - 选择 Facebook 或 Instagram 账户
   - 完成后选择一个账户作为默认

### 4.2 配置 Buffer Post 字段

**关键字段映射：**

| 字段 | 值 |
|------|-----|
| **Profile ID** | 手动选择 Facebook 或 Instagram 账户 |
| **Text** | `{Caption_EN}` ← 从 Airtable 自动获取 |
| **Media** | `{Image_URL}` ← 图片 URL（Step 3 时填充） |
| **Scheduled Time** | `{ISO8601_DateTime}` ← 使用格式化的时间戳 |

### 4.3 处理时间格式（重要！）

Buffer 需要 ISO 8601 格式的时间戳。在 Buffer action 之前，添加时间格式化：

1. 在 Buffer 上面点击 **+** → 搜索 **Text Aggregator**
2. 设置：
   ```
   formatDate(parseDate({Date}; "YYYY-MM-DD"); "YYYY-MM-DD") + "T" + {Time_NZST} + ":00+12:00"
   ```
   例如：`2026-04-21T08:00:00+12:00`

3. 在 Buffer 的 **Scheduled Time** 字段，粘贴这个格式化的时间戳

---

## 第五阶段：添加 Update Record Action（标记已发布）

### 5.1 添加 Update Action
1. 在 Buffer 下点击 **+** → 搜索 **Airtable**
2. 选择 **Update a Record**

### 5.2 配置更新字段
- **Connection**：CTS Airtable（已有）
- **Base ID**：同上
- **Table**：同上
- **Record ID**：`{ID}` ← 自动从 Airtable 获取
- **Fields to update**：
  - **Status**：`published`（固定值）
  - （可选）添加其他字段，如发布时间戳

---

## 第六阶段：测试整个工作流

### 6.1 准备测试数据
在 Airtable 中：
1. 找到 **Post 1**（Apr 21, Shanghai Reel）
2. 先不填 Image_URL（因为还没上传）
3. 把 **Status** 改为 **"ready"**
4. 保存

### 6.2 运行 Make Scenario
1. 回到 Make dashboard
2. 点击 **Run once** 按钮
3. 观察执行过程：
   - ✓ Trigger：是否读取到 Post 1？
   - ✓ Filter：Status 条件是否匹配？
   - ✓ Buffer：是否收到 Post 请求？（可能报错，因为还没有图片 URL）
   - ✓ Update Record：是否自动改为 "published"？

### 6.3 调试（如果出错）
- 检查 Airtable Base ID 是否正确
- 检查 Buffer 连接是否授权成功
- 检查时间格式是否符合 ISO 8601
- 查看 Make 的 Execution history 中的错误信息

---

## ✅ Step 2 完成检查清单

- [ ] Make 账户已创建
- [ ] Airtable Token 已生成并连接
- [ ] Trigger（Watch Records）已配置
- [ ] Filter（Status = ready）已添加
- [ ] Buffer action 已连接并配置
- [ ] 时间格式化已设置
- [ ] Update Record 已配置
- [ ] 整个工作流已测试（至少运行一次）
- [ ] Airtable 的 Post 1 已改为 "published"（表示工作流成功）

---

## 🔗 下一步

完成后，开始 **Step 3：上传图片到 Supabase + 填充 URLs + 批量发布**

---

**时间戳：2026-04-20**  
**创建者：Claude**
