# T061 Airtable 表格结构：有机内容 + 付费广告分离管理

**方案：2 个独立表格 + 1 个汇总视图**

---

## 📋 表格 1：Organic Content（当前）

**名称：** `Organic Content`（已有）

**15 条帖子字段（保持不变）：**
1. Date - Date
2. Day_of_Week - Single line text
3. Time_NZST - Single line text
4. Platform - Single select (Instagram, Facebook)
5. Product - Single select (Shanghai & Surroundings, A Tale of Two Cities, Visa-Free Education, Planning Tips, Social Proof)
6. Format - Single select (Reel, Feed, Story)
7. Ratio - Single line text
8. Headline_EN - Single line text
9. Caption_EN - Long text
10. Hashtags_IG - Single line text
11. URL_Organic_UTM - URL
12. LoveArt_Prompt_EN - Long text
13. Image_URL - URL
14. Status - Single select (draft, ready, published)
15. Internal_Notes_ZH - Long text

**View：By Status**（用于 Make 自动化）

---

## 📋 表格 2：Paid Ads（新建）

**名称：** `Paid Ads`

**Airtable 建表提示词：**

```
创建一个付费广告管理表格，名称：Paid Ads

需要以下字段：

1. Ad_ID (广告ID) - Single line text
   例如：PAD-001、PAD-FB-001

2. Campaign_Name (活动名称) - Single line text
   例如：Oct2026_Discovery_FB_Paid、Oct2026_Discovery_IG_Paid

3. Product (产品线) - Single select
   选项：Shanghai & Surroundings、A Tale of Two Cities、Visa-Free Education、Social Proof

4. Platform (平台) - Single select
   选项：Facebook、Instagram

5. Ad_Type (广告类型) - Single select
   选项：Feed Post、Reel、Story、Carousel、Collection

6. Creative_Source (创意来源) - Link to Organic Content
   关联到 Organic Content 表格中的帖子（可选）

7. Budget_NZD (预算) - Currency，单位 NZD
   例如：100、500、1000

8. Ad_Start_Date (开始日期) - Date

9. Ad_End_Date (结束日期) - Date

10. Ad_Status (广告状态) - Single select
    选项：Draft、Scheduled、Active、Paused、Completed、Failed

11. Daily_Budget_NZD (日预算) - Currency

12. Target_Audience (目标受众) - Single line text
    例如：NZ, 25-50, interested in travel

13. Performance_Notes (性能备注) - Long text
    例如：CPM、CTR、CPC、Impressions

14. Ad_Manager_URL (Ad Manager 链接) - URL
    指向 Facebook/Instagram Ads Manager 中的广告链接

15. Created_Date (创建日期) - Date
    自动填充当前日期

16. Created_By (创建者) - Single line text
    例如：Zhong

17. Internal_Notes (内部备注) - Long text
```

---

## 🔗 表格关系

**Organic Content ↔ Paid Ads 的关联：**

当你想根据有机帖子创建付费广告时：
1. 在 Paid Ads 表中，新建记录
2. 在 **Creative_Source** 字段中，链接到 Organic Content 中的对应帖子
3. 这样可以追踪：哪个有机帖转换成了付费广告，表现如何

---

## 👁️ Views（视图）

### Organic Content 表中：
- **Timeline**（按发布日期）
- **By Status**（按状态，用于 Make 自动化）
- **By Platform**（按平台）

### Paid Ads 表中：
- **Active Campaigns**（Status = Active）
- **By Platform**（分 Facebook / Instagram）
- **By Budget**（按预算排序）
- **Performance**（按开始日期，用于监测）

---

## 🤖 Make 工作流更新

现在有 2 个表格，Make 工作流需要分别配置：

### **Scenario 1：Organic Content 自动化**（已有）
```
Trigger: Organic Content - Watch Records (Status = ready)
↓
Filter: Image_URL not empty
↓
Buffer: Create Post
↓
Airtable: Update Record (Status → published)
```

### **Scenario 2：Paid Ads 自动化**（后续配置）
```
Trigger: Paid Ads - Watch Records (Status = Scheduled)
↓
Filter: Ad_Start_Date = Today
↓
Facebook Ads / Instagram Ads API: Create Campaign
↓
Airtable: Update Record (Status → Active)
```

---

## 📊 汇总仪表板（可选）

在 Airtable 中创建 3rd 表 **Dashboard** 用于汇总统计：
- 有机帖子总数 / 发布进度
- 付费广告总预算 / 活跃数量
- 两者的 Product 分布

---

## ✅ 实施步骤

1. **现在做：** 保持 Organic Content 表不变（已正常运行）
2. **立即做：** 创建 Paid Ads 表（用上面提示词）
3. **后续做：** 在 Make 中配置 Scenario 2（付费广告自动化）

---

## 📌 关键点

- **Organic Content** 表 + **Make Scenario 1** 负责有机发布（当前进行）
- **Paid Ads** 表是独立的，后续投流时使用
- 两个表可以通过 **Product** 和 **Platform** 进行关联分析
- Make 会分别管理两个表的自动化流程

---

**现在就创建 Paid Ads 表吧！** 🚀

