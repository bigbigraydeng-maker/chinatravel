# T018 关键词结构 V2（可投放版）

Last updated: 2026-04-14  
Based on: `docs/t018-keyword-structure-v1.md`

## 1) V2 相比 V1 的新增

- 为关键词增加匹配类型执行规范（Exact / Phrase）
- 提供可直接导入模板：`docs/t018-keyword-import-v2.csv`
- 补齐核心 RSA 文案包（按 campaign 分组）
- 明确 URL 与 UTM 约定，减少上线偏差

## 2) 匹配类型规范（启动期）

- Exact: 收割高意向，控制 CPC 与转化稳定性
- Phrase: 拓量但可控，适合探索真实搜索词
- Broad: 启动期先不开；首轮优化后仅在高表现 ad group 小范围测试

建议配比（每个 ad group）：
- 40% Exact
- 60% Phrase

## 3) Final URL 约定

- Brand: `https://www.ctstours.co.nz/about`
- Visa Free: `https://www.ctstours.co.nz/china-visa-guide-for-new-zealanders`
- Product BJ/XA: `https://www.ctstours.co.nz/campaigns/october-2026/tale-of-two-cities`
- Product SH: `https://www.ctstours.co.nz/campaigns/october-2026/shanghai-surroundings`
- Generic: `https://www.ctstours.co.nz/china-tours`

UTM 统一：
- `utm_source=google`
- `utm_medium=cpc`
- `utm_campaign=oct26_discovery`
- `utm_content=<campaign_or_ag_name>`

## 4) RSA 文案包（核心组）

### A) Brand（Search_Brand_CTS）

Headlines
- CTS Tours New Zealand
- China Travel Specialists NZ
- Trusted China Tour Operator
- CTS Auckland Team Support
- China Tours From New Zealand
- Speak With A China Expert
- 10-Day China Discovery Tours
- Visa Guidance For NZ Travellers
- Great Wall To Water Towns
- Enquire CTS China Tours Today

Descriptions
- Plan your China journey with CTS specialists in New Zealand. Guided support from enquiry to arrival.
- Two featured October Discovery tours: Beijing and Xi'an, or Shanghai and Surroundings.
- Trusted local operations and clear pre-departure guidance for NZ travellers.
- Start with a quick enquiry and get the right itinerary for your timeline and budget.

### B) Visa Free（Search_VisaFree_NZ_CN）

Headlines
- China Visa Free For NZ?
- NZ Passport China Entry Guide
- China Visa Free Rules Explained
- Travel China With Clear Steps
- CTS China Entry Guidance
- Check Latest Entry Requirements
- Visa Free China Trip Planning
- Start Your China Journey Safely
- NZ To China Travel Checklist
- Enquire CTS For China Advice

Descriptions
- Understand China visa-free and transit policy options for New Zealand travellers in plain English.
- Get practical next steps, timing advice, and tour options if you want a smooth first trip.
- Combine entry guidance with a fully guided China itinerary from CTS.
- Start from our visa guide, then move to the itinerary that fits your travel goals.

### C) Beijing/Xi'an（Search_Product_BJXA_Oct26）

Headlines
- Beijing and Xi'an In 10 Days
- Great Wall And Terracotta Army
- Best First China Tour Option
- High Value Guided China Tour
- Safe And Easy For NZ Travellers
- October Departure Seats Open
- Classic China Highlights Tour
- History Icons In One Journey
- CTS Fully Guided Discovery
- Enquire Tale Of Two Cities

Descriptions
- First-time China done right: Beijing and Xi'an with iconic highlights and guided logistics.
- See the Great Wall, Forbidden City, and Terracotta Warriors in one efficient itinerary.
- Strong value, clear pacing, and reliable support for New Zealand travellers.
- Enquire now for October departures and detailed day-by-day inclusions.

### D) Shanghai/Surroundings（Search_Product_SH_Oct26）

Headlines
- Shanghai And Surroundings Tour
- Modern City Meets Jiangnan
- Suzhou Hangzhou Water Towns
- East Meets West Experience
- Stylish Yet Cultural China Trip
- October Group Departure
- CTS Shanghai Discovery Route
- City And Heritage In One Tour
- Guided China Delta Journey
- Enquire Shanghai Discovery

Descriptions
- Discover Shanghai's modern skyline and Jiangnan's classical charm in one curated itinerary.
- A balanced route across city style, gardens, canals, and traditional towns.
- Ideal for travellers who want both contemporary China and heritage depth.
- Enquire today for October departures and full inclusion details.

## 5) 否定词执行建议（V2）

- Account-level（全局）：jobs, career, salary, free download, template, cheap flights, hotel only
- Campaign-level（按主题）：  
  - Visa Free 排除：immigration lawyer, visa refusal appeal（若非服务范围）  
  - Product 排除：flight only, hostel, backpacking tips  
  - Brand 排除：customer service complaint（如无投放必要）

## 6) 导入与验证流程

1. 导入 `docs/t018-keyword-import-v2.csv` 到 Google Ads Editor
2. 检查 campaign / ad group 名称映射
3. 粘贴对应 RSA 文案（每组至少 8-10 标题、3-4 描述）
4. 发布前抽检 10 条关键词：match type、URL、UTM 是否正确
5. 上线 7 天后按搜索词报告补否定词并淘汰低质 phrase

