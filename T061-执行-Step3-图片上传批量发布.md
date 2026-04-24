# T061 步骤3：上传图片到 Supabase + 填充 URLs + 批量发布

**预计时间：45 分钟**
**状态：准备就绪**

---

## 第一阶段：Supabase 准备工作

### 1.1 访问 Supabase
1. 登录 https://supabase.com
2. 找到你的 ChinaTravel project
3. 左侧点击 **Storage**

### 1.2 创建 Bucket
1. 点击 **Create a new bucket**
2. 命名：`social-media-content`
3. 勾选 **Public bucket**（允许公开访问）
4. 点击 **Create bucket**

### 1.3 创建文件夹
1. 打开 **social-media-content** bucket
2. 点击 **Create folder** 按钮
3. 命名：`april-2026`

---

## 第二阶段：生成 15 张 LoveArt 图片

### 2.1 使用 LoveArt 生成图片
对 CSV 中的每一条帖子，按以下步骤：

1. 打开 [LoveArt](https://loveart.ai) 或你的 AI 生图工具
2. 复制 CSV 中该行的 **LoveArt_Prompt_EN** 内容
3. 设置尺寸：
   - **Reel（9:16）**：1080×1920px
   - **Feed（4:5）**：1080×1350px
4. 点击 **Generate**
5. 下载为 **高分辨率 JPG**

### 2.2 命名规则
下载后，用以下格式命名图片：

```
apr{日期}__{内容描述}.jpg

示例：
- apr21__shanghai_reel.jpg          (Post 1)
- apr21__visa_education_feed.jpg    (Post 2)
- apr22__first_china_trip_reel.jpg  (Post 3)
- apr23__modern_classic_feed.jpg    (Post 4)
- apr23__october_packing_reel.jpg   (Post 5)
- apr24__ancient_warriors_reel.jpg  (Post 6)
- apr25__beijing_xian_feed.jpg      (Post 7)
- apr25__shanghai_energy_reel.jpg   (Post 8)
- apr26__visa_faq_reel.jpg          (Post 9)
- apr27__testimonial_feed.jpg       (Post 10)
- apr27__packing_smart_reel.jpg     (Post 11)
- apr28__high_speed_rail_reel.jpg   (Post 12)
- apr29__suzhou_west_lake_feed.jpg  (Post 13)
- apr29__jiangnan_food_reel.jpg     (Post 14)
- apr30__final_visa_reminder_feed.jpg (Post 15)
```

---

## 第三阶段：上传图片到 Supabase

### 3.1 逐个上传
1. 在 Supabase **social-media-content/april-2026** 文件夹中
2. 点击 **Upload** 按钮
3. 选择生成好的图片文件
4. 等待上传完成（显示绿色 checkmark）
5. 重复上传所有 15 张图片

### 3.2 获取公开 URL
上传完成后，对每张图片：
1. 点击图片名称
2. 右侧会显示 **URL**
3. 复制这个 URL（格式：`https://[project].supabase.co/storage/v1/object/public/social-media-content/april-2026/...`）

---

## 第四阶段：填充 Airtable Image_URL

### 4.1 在 Airtable 中填充 URLs
1. 打开 Airtable Base
2. 打开 **Grid** 视图（看到所有 15 条记录）
3. 对每一行，点击 **Image_URL** 字段
4. 粘贴对应的 Supabase public URL

**对应关系：**

| Row | Date | 图片文件名 | URL 来源 |
|-----|------|----------|---------|
| 1 | Apr 21 | apr21__shanghai_reel.jpg | Supabase apr21__shanghai_reel.jpg 的 URL |
| 2 | Apr 21 | apr21__visa_education_feed.jpg | Supabase apr21__visa_education_feed.jpg 的 URL |
| ... | ... | ... | ... |
| 15 | Apr 30 | apr30__final_visa_reminder_feed.jpg | Supabase apr30__final_visa_reminder_feed.jpg 的 URL |

### 4.2 验证 URLs
完成填充后，点击 Airtable 中的 URL 字段，确保：
- ✓ 链接有效（点击后能打开图片）
- ✓ 图片能正常加载

---

## 第五阶段：批量改 Status 为 "ready" + 启动发布

### 5.1 改 Status（推荐方式：批量更新）
1. 打开 **By Status** 视图
2. 看到所有状态为 "draft" 的记录
3. 逐条改为 **"ready"**（或使用 Airtable 的批量编辑功能）

**方式 A：逐条改**
- 点击每行的 Status 字段 → 选择 "ready"

**方式 B：批量改（如果支持）**
- Airtable 付费版本支持批量更新，免费版可能需要逐条修改

### 5.2 Make 自动触发
一旦 Status 改为 "ready"：
- Make 的 Watch Records trigger 会检测到变化
- Filter 会匹配 Status = "ready"
- Buffer action 会自动发送 post
- Update Record 会自动改为 "published"

**监控过程：**
1. 改一条 Status 为 "ready"
2. 等待 1-5 分钟（Make 的检测间隔）
3. 检查 Buffer 后台是否出现新的 scheduled post
4. 如果成功，继续改其他记录

---

## 第六阶段：验证 + 最终检查

### 6.1 检查 Buffer 后台
1. 登录 Buffer 账户
2. 查看 **Pending Posts** 或 **Scheduled**
3. 确认 15 条帖子都出现在排期中
4. 检查每条帖的：
   - ✓ 文案是否正确
   - ✓ 图片是否加载成功
   - ✓ 发布时间是否正确（NZST）
   - ✓ 平台是否正确（Facebook / Instagram）

### 6.2 检查 Airtable
1. 所有帖子 Status 都应该显示 **"published"**
2. 每行的 **Image_URL** 都应该有值（而不是空）
3. 时间戳、Platform、Product 等字段都应该填充完整

---

## ✅ Step 3 完成检查清单

- [ ] Supabase bucket "social-media-content" 已创建
- [ ] 文件夹 "april-2026" 已创建
- [ ] 15 张 LoveArt 图片已生成
- [ ] 所有图片已上传到 Supabase
- [ ] 所有 Supabase 图片 URLs 已获取
- [ ] 所有 15 行的 Image_URL 字段已填充
- [ ] URLs 验证有效（可以打开并看到图片）
- [ ] 所有 15 条帖子的 Status 已改为 "ready"
- [ ] Make 工作流已自动执行（观察 Airtable Status 变为 "published"）
- [ ] Buffer 后台出现 15 条 scheduled posts
- [ ] 每条 Buffer post 的文案、图片、时间都正确

---

## 🎉 整个流程完成！

✅ **Airtable Base** 已创建 + 15 条帖子导入完成  
✅ **Make 工作流** 已配置 + 自动化已启动  
✅ **图片** 已上传到 Supabase + URLs 已填充  
✅ **Buffer** 已接收 15 条排期帖子  
✅ **April 21-30** 的有机社交媒体内容已完全就绪

### 📅 发布日程
- **Apr 21**：Post 1（Instagram）+ Post 2（Facebook）
- **Apr 22-30**：继续按日期发布
- **所有帖子** 已在 Buffer 中排期，自动按时发布

---

**时间戳：2026-04-20**  
**创建者：Claude**
