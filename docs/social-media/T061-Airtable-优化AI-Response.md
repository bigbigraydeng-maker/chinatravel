# T061 CTS Social Media Hub — 优化版AI Response

**项目：** CTS Tours October 2026 Discovery Campaign  
**周期：** April 21-30, 2026（15条帖子）  
**平台：** Facebook + Instagram（有机+付费广告）  

---

## 一、核心设计决策

### 1.1 Image存储位置：**Supabase Storage**

**理由：**
- ✅ CTS已使用Supabase（tour-images bucket）
- ✅ 成本低，存储量大
- ✅ 长期可扩展（不受Airtable storage限制）
- ✅ 可与CTS的image pipeline一致
- ✅ 公开URL稳定可靠

**实施方案：**
```
Supabase Bucket: social-media-content/april-2026/
结构：
  ├── apr21_shanghai_reel.jpg
  ├── apr21_visa_feed.jpg
  ├── apr22_tale_reel.jpg
  ... (15张)

Airtable中Image_URL字段存储完整URL：
https://[supabase-project].supabase.co/storage/v1/object/public/social-media-content/april-2026/apr21_shanghai_reel.jpg
```

---

### 1.2 发布格式类型及尺寸规范

| 格式 | 平台 | 尺寸 | 时长 | 说明 |
|------|------|------|------|------|
| **Reel** | Instagram | 9:16 (1080×1920px) | 15-90秒 | 竖屏视频，首先吸引，短视频优先 |
| **Feed Post** | Facebook/Instagram | 4:5 (1080×1350px) | N/A | 方形图片/轮播，长文案友好 |
| **Story** | Instagram/Facebook | 9:16 (1080×1920px) | 5秒默认 | 24小时消失，快速传播 |
| **Video Feed** | Facebook | 16:9 (1280×720px) | 15-240秒 | 横屏视频（可选，目前用Reels替代） |

**当前T061分配：**
- Reels: 9条（Instagram优先）
- Feed Posts: 6条（Facebook+Instagram）
- Stories: 0条（可选）

---

### 1.3 有机 vs 付费广告标记系统

**核心原则：** 同一内容可能既有有机帖，也有付费广告推广

**字段设计：**
```
Post_Type (Single Select):
  ├─ Organic Only（纯有机）
  ├─ Paid Ads Only（纯付费）
  └─ Organic + Paid（既有有机，也做付费推广）

Ad_Campaign (Single Select, 条件显示):
  ├─ None（无付费）
  ├─ T026 Cold Traffic Video（付费视频广告）
  ├─ Remarketing（再营销）
  └─ Lead Gen（潜客转化）

Ad_Status (Single Select, 条件显示):
  ├─ Not Yet（计划中，未启动）
  ├─ Active（广告投放中）
  ├─ Paused（暂停）
  └─ Completed（完成）

Ad_Budget (Currency, 条件显示):
  → 仅当Post_Type包含"Paid"时显示
  → 用于跟踪广告支出

Ad_Performance (Lookup):
  → 关联到外部的Ad Analytics表（未来可扩展）
```

---

## 二、完整的Airtable表结构

### 2.1 Social_Media_Posts 主表

#### **A. 基础信息** 
```
1. Post_ID (Autonumber)
   → 自动递增，唯一标识

2. Post_Title (Single line text)
   → 例：Shanghai Elegance, First China Trip

3. Platform (Single select, required)
   选项：Facebook / Instagram
   → 决定发布目标

4. Format_Type (Single select, required)
   选项：Reel / Feed Post / Story
   → 决定尺寸和发布形式

5. Format_Dimensions (Formula, read-only)
   →自动显示对应尺寸：
     Reel: 9:16 (1080×1920px)
     Feed Post: 4:5 (1080×1350px)
     Story: 9:16 (1080×1920px)
```

#### **B. 产品与内容**
```
6. Product_Category (Single select, required)
   选项：
     ├─ A Tale of Two Cities (北京+西安)
     ├─ Shanghai & Surroundings (江南)
     ├─ Visa-Free Education
     ├─ Planning Tips
     └─ Social Proof

7. Content_Type (Single select)
   选项：Discovery / Supporting
   → 用于内容占比追踪（Discovery ≥60%）

8. Product_Line (Formula, auto-populate)
   → 防止串线验证：
     如果Product=Tale → 不能含["西湖","苏州","江南"]
     如果Product=Shanghai → 不能含["长城","兵马俑"]
```

#### **C. 内容与创意**
```
9. Headline_EN (Single line text, required)
   → 例：Jiangnan Elegance
   → 用于LoveArt提示词 + 图片overlay

10. Caption_Main (Long text, required)
    → 通用文案（Facebook + Instagram通用部分）

11. Caption_Instagram_Specific (Long text, conditional)
    → 仅Instagram（包含hashtags）
    → 当Platform=Instagram时显示

12. Hashtags_IG (Long text, conditional)
    → 仅Instagram
    → 格式：#ChinaTravel #ShanghaiBound...

13. LoveArt_Prompt_EN (Long text)
    → 完整的英文AI图片提示词
    → 例："Create a 9:16 Reel: Elegant Suzhou garden..."

14. Visual_Brief_ZH (Long text)
    → 中文视觉简描
    → 例：苏州园林+水镜+柔和秋光
```

#### **D. 媒体与资源**
```
15. Image_Source (Single select)
    选项：
      ├─ LoveArt Generated
      ├─ Stock Photo
      ├─ CTS Original
      └─ Other

16. Image_Status (Single select)
    选项：
      ├─ Not Generated
      ├─ Generating...
      ├─ Generated (awaiting upload)
      ├─ Uploaded to Supabase
      └─ Failed

17. Image_File_Name (Single line text)
    → 存储位置：社媒内容/2026年4月/apr21_shanghai_reel.jpg
    
18. Image_URL (URL)
    → 完整Supabase URL
    → 例：https://[project].supabase.co/storage/v1/object/public/social-media-content/april-2026/apr21_shanghai_reel.jpg

19. Image_Upload_Date (Date)
    → 何时上传到Supabase

20. UTM_Link_Organic (URL)
    → 有机社媒URL
    → 格式：?utm_source=instagram&utm_medium=social&utm_campaign=oct2026_discovery_ig_organic
```

#### **E. 发布计划**
```
21. Scheduled_Date (Date, required)
    → 例：2026-04-21

22. Scheduled_Time_NZST (Single line text, required)
    → 格式：HH:MM（24小时制）
    → 例：08:00
    → 说明：New Zealand Standard Time

23. Scheduled_DateTime_ISO8601 (Formula, read-only)
    → 自动生成：YYYY-MM-DDTHH:MM:SS+12:00
    → 用于Make/Buffer集成
    → 例：2026-04-21T08:00:00+12:00

24. Time_Zone_Target (Single line text)
    → 默认：NZST (UTC+12)
    → 用于tracking时区准确性
```

#### **F. 工作流状态**
```
25. Status (Single select, required)
    选项（顺序很重要）：
      ├─ 1️⃣  Draft (内容完成，等待图片)
      ├─ 2️⃣  Image Ready (图片已上传，等待发布)
      ├─ 3️⃣  Scheduled (已推送到Buffer，等待自动发布)
      ├─ 4️⃣  Published (已发布到FB/IG)
      ├─ ❌ Failed (Make/Buffer推送失败)
      └─ 🔄 Retry Required (需要手动重试)

26. Status_Updated_Date (Last modified time, read-only)
    → 自动记录Status最后变更时间

27. Error_Message (Long text, conditional)
    → 当Status=Failed时显示
    → 例："Buffer API returned 429 Rate Limit"
```

#### **G. 广告计划与投放**
```
28. Post_Type (Single select, required)
    选项：
      ├─ Organic Only (纯有机)
      ├─ Paid Ads Only (纯付费)
      └─ Organic + Paid (既有有机，也做付费)

29. Ad_Campaign (Single select, conditional)
    → 当Post_Type包含"Paid"时显示
    选项：
      ├─ None
      ├─ T026 Cold Traffic Video (冷启动视频)
      ├─ T026 Paid Reels (付费Reels)
      ├─ Remarketing (再营销)
      └─ Lead Gen (潜客转化)

30. Ad_Status (Single select, conditional)
    → 当Post_Type包含"Paid"时显示
    选项：
      ├─ Not Yet (计划中)
      ├─ Active (投放中)
      ├─ Paused (暂停)
      ├─ Completed (完成)
      └─ Underperforming (表现差，需调整)

31. Ad_Budget_NZD (Currency, conditional)
    → 当Post_Type包含"Paid"时显示
    → 例：50.00 NZD

32. Ad_Start_Date (Date, conditional)
    → 当Ad_Status≠"None"时显示

33. Ad_End_Date (Date, conditional)
    → 当Ad_Status≠"None"时显示

34. Ad_Notes (Long text, conditional)
    → 广告相关说明
    → 例："Testing at 50 NZD/day, target age 35-55"
```

#### **H. 合规与追踪**
```
35. Visa_Free_Disclaimer (Checkbox)
    → ✓ 确认文案包含："Many NZ passport holders may qualify..."

36. Product_Line_Conflict_Check (Formula, read-only)
    → 自动验证：Tale帖不含江南词汇，Shanghai帖不含北方词汇
    → 显示：Pass / Warning

37. UTM_Validation (Formula, read-only)
    → 检查：有机帖用social，付费帖用paid_social
    → 显示：Pass / Warning

38. Content_Calendar_Approved (Checkbox)
    → 管理者确认可发布

39. Internal_Notes_ZH (Long text)
    → 内部备注，中文
    → 例："重点突出十月季节优势"
```

#### **I. 审计日志**
```
40. Created_By (Single line text, auto)
    → 记录创建人

41. Created_Date (Created time, read-only)
    → 自动记录创建时间

42. Last_Modified_By (Single line text, auto)
    → 最后修改者

43. Last_Modified_Date (Last modified time, read-only)
    → 最后修改时间

44. Publish_By (Single line text, conditional)
    → 当Status=Published时填充
    → 记录谁触发了发布

45. Publish_Date_Actual (Date, conditional)
    → 当Status=Published时填充
    → 实际发布时间（来自Buffer反馈）
```

---

## 三、视图设计

### 3.1 主要视图
```
1. Timeline Calendar
   → 类型：Calendar View
   → 按Scheduled_Date显示
   → 彩色编码：Product_Category
   → 用途：一目了然看4月21-30的完整日程

2. Content Management
   → 类型：Grid View
   → Group by: Status
   → Sort by: Scheduled_Date
   → Filter: Status ≠ Published
   → 用途：追踪各阶段帖子进度

3. By Platform
   → 类型：Grid View
   → Filter: Platform = Facebook OR Instagram（两个分开）
   → 用途：各平台内容审查

4. By Product
   → 类型：Grid View
   → Group by: Product_Category
   → 用途：确保Tale vs Shanghai不串线

5. Paid Ads Pipeline
   → 类型：Grid View
   → Filter: Post_Type contains "Paid"
   → Group by: Ad_Status
   → 用途：跟踪广告投放状态

6. Failed / Retry Required
   → 类型：Grid View
   → Filter: Status = Failed OR Retry Required
   → 用途：快速找到需要手动处理的帖子

7. Publishing Dashboard
   → 类型：Gallery View
   → 显示Image_URL缩略图
   → 用途：视觉预览所有帖子
```

---

## 四、自动化Workflow

### 4.1 关键自动化
```
✅ Automation 1: Status = Image Ready时，发邮件给团队
   触发：Status字段更改为"Image Ready"
   动作：发邮件通知"图片已上传，内容已准备好，可推送到Buffer"

✅ Automation 2: Status = Scheduled时，更新时间戳
   触发：Status = Scheduled
   动作：Last_Modified_Date自动更新（Airtable原生）

✅ Automation 3: 广告状态变化时，通知广告经理
   触发：Ad_Status变更
   动作：发邮件给广告负责人（附上预算、日期、绩效等）

✅ Automation 4: 检查截止日期
   触发：每日定时（21:00 NZST）
   条件：Scheduled_Date = 明天 AND Status ≠ Published
   动作：发提醒邮件给marketing team
```

### 4.2 Make.com集成
```
Trigger: Status = Scheduled AND Image_URL不为空
  ↓
Validation: 检查必填字段（Platform、Caption、URL）
  ↓
Format Time: 使用Scheduled_DateTime_ISO8601
  ↓
Push to Buffer: 
  - Profile ID: 根据Platform选择
  - Text: Caption
  - Image: Image_URL
  - Scheduled: Scheduled_DateTime_ISO8601
  ↓
Update Status: 成功后改Status=Published，失败改Status=Failed
```

---

## 五、数据输入表单

### 5.1 Post Creation Form
```
字段显示顺序（优化UX）：

Step 1: 基础信息
  ├─ Post_Title (required)
  ├─ Platform (required)
  ├─ Format_Type (required)
  └─ Scheduled_Date & Scheduled_Time (required)

Step 2: 产品与内容
  ├─ Product_Category (required)
  ├─ Content_Type
  ├─ Headline_EN (required)
  └─ Caption_Main (required)

Step 3: 平台特定内容
  ├─ Caption_Instagram_Specific (conditional)
  └─ Hashtags_IG (conditional)

Step 4: 创意资源
  ├─ LoveArt_Prompt_EN
  ├─ Visual_Brief_ZH
  └─ Image_URL

Step 5: 广告计划
  ├─ Post_Type (required)
  ├─ Ad_Campaign (conditional)
  ├─ Ad_Budget_NZD (conditional)
  └─ Ad_Notes (conditional)

Step 6: 合规检查
  ├─ Visa_Free_Disclaimer (checkbox)
  └─ Internal_Notes_ZH
```

---

## 六、仪表盘页面设计

### 6.1 Overview Dashboard
```
卡片1：April 21-30 Progress
  → Posts by Status: Draft (0) / Image Ready (5) / Scheduled (10) / Published (0)
  → 进度条：15/15

卡片2：Content Mix
  → Discovery vs Supporting pie chart
  → Tale (4) vs Shanghai (5) bar chart

卡片3：Organic vs Paid Split
  → Post_Type分布：Organic Only / Paid Only / Organic+Paid

卡片4：Platform Distribution
  → Facebook (8) vs Instagram (7)
  → Format_Type分布：Reels(9) vs Feed(6)

卡片5：Paid Ads Budget
  → Total Budget: NZD $XXX
  → Active Campaigns: T026 Cold Traffic (3 posts)
  → Ad Performance预览

卡片6：Upcoming Publishes
  → 显示Next 48小时内要发布的帖子
  → 颜色标记：Status, Platform
```

---

## 七、表字段总结

| 类别 | 字段数 | 说明 |
|------|--------|------|
| 基础信息 | 5 | Post_ID, Title, Platform, Format, Dimensions |
| 产品与内容 | 3 | Product_Category, Content_Type, Product_Line_Verification |
| 创意与文案 | 6 | Headline, Caption_Main, Caption_IG_Specific, Hashtags, LoveArt_Prompt, Visual_Brief |
| 媒体资源 | 6 | Image_Source, Image_Status, Image_FileName, Image_URL, Upload_Date, UTM_Link |
| 发布计划 | 4 | Scheduled_Date, Scheduled_Time, ISO8601, TimeZone |
| 工作流状态 | 3 | Status, Status_UpdatedDate, Error_Message |
| 广告投放 | 7 | Post_Type, Ad_Campaign, Ad_Status, Ad_Budget, Ad_Start, Ad_End, Ad_Notes |
| 合规检查 | 3 | Visa_Disclaimer, Conflict_Check, UTM_Validation |
| 其他 | 8 | Approved, Internal_Notes, Created_By, Created_Date, LastMod_By, LastMod_Date, Publish_By, Publish_Date_Actual |

**总计：45个字段**

---

## 八、实施步骤

### 第1天（现在）：建表 + 导入数据
1. 在Airtable创建Base: `CTS Social Media Hub`
2. 按上述字段创建Social_Media_Posts表
3. 导入CSV数据（15条帖子）
4. 创建所有Views（Timeline, Management, Platform等）

### 第2天：配置自动化 + Make集成
5. 创建4个自动化流程（邮件通知、时间戳等）
6. 配置Make.com的Airtable→Buffer workflow
7. 测试1条帖的完整流程（Draft → Image Ready → Scheduled → Published）

### 第3天：上传图片 + 批量发布
8. 所有15张图片上传到Supabase
9. 填充Image_URL字段
10. 批量改Status为"Image Ready"
11. 观察Make自动推送过程
12. 确认所有帖在Buffer中排期正确

---

## 九、关键提示

⚠️ **重点检查：**
1. Image_URL必须是Supabase的公开URL（不是Airtable Attachments）
2. Scheduled_DateTime_ISO8601格式必须正确：`YYYY-MM-DDTHH:MM:SS+12:00`
3. Post_Type字段决定是否显示Ad_*字段，使用Conditional Visibility
4. Product_Line_Conflict_Check自动验证Tale和Shanghai不串线
5. 所有有机帖的utm_medium必须是`social`，付费帖是`paid_social`

✅ **成功标志：**
- 15条帖的Status都能从Draft逐步推进到Published
- Make自动推送的帖在Buffer中时间、文案、图片全部正确
- 广告帖的Ad_Campaign和Ad_Status能独立跟踪
- Dashboard实时显示各个环节的进度

