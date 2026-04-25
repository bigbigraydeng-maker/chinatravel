# T061 LoveArt 图片/视频资产管理方案

**目标：** 完整的版本控制 + 质量管理 + 存档系统

---

## 📁 存储结构（Supabase）

```
social-media-content/
├── april-2026/                          # 当前活动
│   ├── originals/                       # 原始生成文件
│   │   ├── apr21__shanghai_reel_v1.jpg
│   │   ├── apr21__shanghai_reel_v2.jpg  # 版本迭代
│   │   └── ...
│   ├── approved/                        # 审核通过版本
│   │   ├── apr21__shanghai_reel.jpg     # 最终版
│   │   ├── apr21__visa_education_feed.jpg
│   │   └── ...
│   └── performance/                     # 性能数据（截图/分析）
│       ├── apr21__shanghai_engagement.png
│       └── ...
│
├── archive/                             # 历史活动
│   ├── march-2026/
│   │   ├── originals/
│   │   └── approved/
│   └── february-2026/
│       ├── originals/
│       └── approved/
```

---

## 📝 命名规范

### **原始版本（未审核）**
```
apr21__shanghai_reel_v1.jpg
apr21__shanghai_reel_v2.jpg  ← 重新生成的迭代版本

格式：MMDD__描述_v{版本号}.jpg
```

### **最终版本（已审核）**
```
apr21__shanghai_reel.jpg      ← 无版本号，表示最终版

格式：MMDD__描述.jpg
```

### **视频**（如果后续需要）
```
apr21__shanghai_reel_v1.mp4
apr21__shanghai_reel.mp4      ← 最终版

格式：同上，后缀 .mp4
```

---

## 🔄 生成和审核流程

```
Step 1：生成初稿
  ↓
LoveArt 生成图片 → 保存到 originals/ → 命名为 {名称}_v1.jpg
  ↓
Step 2：Airtable 关联（临时）
  ↓
Image_URL_Draft = https://...social-media-content/april-2026/originals/apr21__shanghai_reel_v1.jpg
Status = "review_pending"
  ↓
Step 3：质量检查清单（你来做）
  ├─ □ 颜色准确？（暖橙 + 深海军蓝）
  ├─ □ 文字清晰？
  ├─ □ 品牌 watermark 在位？
  ├─ □ 尺寸正确？（1080×1920 for Reel / 1080×1350 for Feed）
  ├─ □ 是否有不要的元素？（如：不该出现的人物、logo）
  └─ □ 是否符合 LoveArt 提示词要求？
  ↓
Step 4A：通过 ✅
  ↓
  - 从 originals/ 复制到 approved/
  - 更新 Airtable：
    Image_URL = https://...social-media-content/april-2026/approved/apr21__shanghai_reel.jpg
    Status = "image_ready"
    Image_Approval_Date = 今天
  ↓
Step 4B：不通过 ❌
  ↓
  - 重新在 LoveArt 生成（调整提示词）
  - 保存为 apr21__shanghai_reel_v2.jpg
  - 重复 Step 3
  ↓
Step 5：发送到 Buffer（Make 自动触发）
  ↓
Status = "published"
```

---

## 🗂️ Airtable 字段补充

在 **Organic Content** 表中添加这些字段来追踪资产：

```
Image_URL_Draft (URL)
  ↓ 初稿 URL，指向 originals/ 版本

Image_URL (URL)  ← 现有字段
  ↓ 最终 URL，指向 approved/ 版本

Image_Approval_Status (Single select)
  选项：Pending、Approved、Rejected、Revision_Needed

Image_Approval_Date (Date)
  审核通过日期

Image_Version (Single line text)
  记录最终版本号，例如：v1、v2、v3

Image_Notes (Long text)
  记录修改历史，例如：
  "v1: 颜色不够暖 | v2: 文字太小 | v3: ✅ 通过"

LoveArt_Prompt_Final (Long text)
  最终使用的提示词（如有调整）
```

---

## 📊 质量控制清单（每张图）

创建一个单独的 **Assets QA** 表（可选）：

```
Post_ID (Link to Organic Content)
Platform (Facebook / Instagram)
Format (Reel / Feed)
File_Name (apr21__shanghai_reel.jpg)
Version (v1, v2, v3...)
Status (Generated, In Review, Approved, Rejected)

QA Checks:
□ Color Accuracy (暖橙 #D97706 + 深海军蓝 #1F2937)
□ Text Legibility (字体、大小、对比度)
□ Watermark Present (CTS logo)
□ Dimensions Correct (1080×1920 or 1080×1350)
□ No Unwanted Elements
□ Matches Prompt

Approver (你的名字)
Approval_Date
Rejection_Reason (if rejected)
Revision_Notes (修改建议)
```

---

## 📈 性能追踪

发布后，在 `performance/` 文件夹中保存：

```
apr21__shanghai_reel_performance_week1.csv
  ├─ Impressions
  ├─ Engagements (likes, comments, shares)
  ├─ CTR (Click-through rate)
  └─ Save/Share rate

apr21__shanghai_reel_performance_week2.csv
  └─ ...

这样可以分析：哪些图片表现最好 → 用于付费广告优化
```

---

## 🔐 备份 + 归档

### **每周备份**
```
每周五，导出：
- Airtable 全表 (CSV)
- Supabase approved/ 文件夹列表 (文本)
保存到本地 / Google Drive
```

### **活动结束后归档**
```
April 活动结束（5月1日）
  ↓
1. 将 april-2026/ 整个文件夹复制到 archive/april-2026/
2. 在 Airtable 中标记所有记录：Campaign_Status = "archived"
3. 清理原 april-2026/originals/ 中的版本迭代（保留最终版）
4. 更新 Airtable：Image_URL 指向 archive/ 路径（或保持不变，如果要查阅历史）
```

---

## 🛠️ 常见问题处理

| 情况 | 处理方案 |
|------|---------|
| **生成的图片颜色不对** | 回到 LoveArt，调整提示词中的色彩要求，重新生成 v2 |
| **文字太小看不清** | 修改 LoveArt 提示词中的"Large serif font"或"增加字体大小"，重新生成 |
| **品牌 watermark 不在** | 检查 LoveArt 提示词是否包含"CTS logo watermark"，重新生成 |
| **需要修改现有图片** | 不要覆盖 approved/ 版本，而是重新生成到 originals/，新建 v2 版本 |
| **想要替换已发布的图片** | 在 Supabase 中上传新版本，更新 Airtable 的 Image_URL，但标记 Status = "revision" |

---

## 📋 实施检查清单

- [ ] 创建 Supabase 文件夹结构：originals/、approved/、performance/
- [ ] 定义命名规范（v1、v2...最终版）
- [ ] 在 Airtable Organic Content 中添加补充字段（Image_URL_Draft、Image_Approval_Status、Image_Version、Image_Notes）
- [ ] 创建 Assets QA 表（可选）用于质量控制
- [ ] 建立每周备份流程
- [ ] 明确归档规则（活动结束后）

---

## 🎯 快速参考

**生成 → 审核 → 发布的路径：**

```
LoveArt 生成 (originals/v1)
  ↓ 检查质量
  ↓ 通过 ✅
  ↓ 复制到 approved/（无版本号）
  ↓ Airtable Image_URL 指向 approved/ 版本
  ↓ Status = "image_ready"
  ↓ Make 自动读取 → Buffer 发布
  ↓ Status = "published"
```

---

**现在就按这个方案开始管理吧！** 🚀

