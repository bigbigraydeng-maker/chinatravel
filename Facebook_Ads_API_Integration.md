# Facebook Ads API 集成文档

**项目：** ChinaTravel  
**版本：** 1.0  
**日期：** 2026-05-05  
**目标受众：** Magic Engine 工程师团队  
**状态：** 待实现

---

## 目录

1. [执行摘要](#执行摘要)
2. [系统架构](#系统架构)
3. [API 接入规范](#api-接入规范)
4. [数据库设计](#数据库设计)
5. [实现步骤](#实现步骤)
6. [代码示例](#代码示例)
7. [部署与配置](#部署与配置)
8. [监控与报告](#监控与报告)
9. [安全考虑](#安全考虑)

---

## 执行摘要

### 目标
将 Facebook Marketing API v18.0 集成到 ChinaTravel Next.js 应用中，实现以下功能：
- ✅ 程序化创建和管理广告活动（Campaign、Ad Set、Ad）
- ✅ 实时获取广告性能指标（支出、展示、点击、转化）
- ✅ 自动化出价优化（基于 ROAS 目标）
- ✅ 受众管理（创建自定义受众、相似受众、retargeting）
- ✅ 与现有 Meta Pixel 追踪系统集成

### 关键集成点
| 系统 | 接触点 | 说明 |
|------|--------|------|
| Meta Pixel | 事件追踪 | 咨询/预订事件数据源 |
| Supabase | 广告配置存储 | 存储活动参数、预算、目标受众 |
| Next.js API Routes | 后端接口 | 与 Facebook API 通信 |
| TourCard / TourHero | 前端 | 广告创建时关联产品 |

### 预期成果
- 减少手动广告管理时间 90%
- 实现基于 CPI（Cost Per Inquiry）的自动出价
- 获得完整的广告性能数据集成到仪表板
- 支持多货币（NZD、CNY）和多市场

---

## 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                        Meta (Facebook)                       │
│  - Marketing API v18.0                                      │
│  - Pixel Events (InitiateCheckout, etc.)                   │
│  - Audience Manager                                         │
└────────────────────┬────────────────────────────────────────┘
                     │ Graph API Calls
                     ↓
┌─────────────────────────────────────────────────────────────┐
│           ChinaTravel Next.js Application                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Frontend (React)                                    │   │
│  │  - TourCard / TourHero (UI for ad creation)         │   │
│  │  - AdDashboard (performance metrics)                │   │
│  │  - AudienceManager (segment creation)               │   │
│  └────────┬─────────────────────────────────────────────┘   │
│           │ HTTP POST/GET
│           ↓
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Routes (/api/facebook/*)                        │   │
│  │  - POST /campaigns (create)                          │   │
│  │  - GET /campaigns/:id/insights (metrics)             │   │
│  │  - POST /audiences (create segments)                 │   │
│  │  - PUT /adsets/:id/budget (optimize)                │   │
│  └────────┬─────────────────────────────────────────────┘   │
│           │
│  ┌────────▼─────────────────────────────────────────────┐   │
│  │  Service Layer                                       │   │
│  │  - FacebookAdsService (API wrapper)                  │   │
│  │  - BiddingOptimizer (ROAS-based logic)              │   │
│  │  - AudienceManager (segment logic)                  │   │
│  └────────┬──────────────┬──────────────┬───────────────┘   │
│           │              │              │
│  ┌────────▼──┐  ┌────────▼──┐  ┌────────▼──┐                │
│  │ Supabase  │  │ Cache     │  │ Logger    │                │
│  │ (config)  │  │ (Redis)   │  │ (Pino)    │                │
│  └───────────┘  └───────────┘  └───────────┘                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
     │                           │
     └───────────────────────────┘
              Render Deployment
```

---

## API 接入规范

### 1. 身份验证

#### Access Token 类型
```
类型：User Access Token (长期有效 ~60 天)
格式：Bearer token
获取方式：Meta Developer Dashboard → Apps → [App] → Tools → Access Tokens

必需权限（Scopes）：
- ads_management          (创建/编辑广告)
- ads_read               (读取广告数据)
- business_management    (管理商务账户)
- pages_manage_metadata  (Pixel 追踪)
```

#### Token 存储策略
```env
# .env.local (本地开发)
FACEBOOK_ACCESS_TOKEN=eaa...xyz
FACEBOOK_BUSINESS_ACCOUNT_ID=123456789
FACEBOOK_AD_ACCOUNT_ID=act_123456789
FACEBOOK_APP_ID=123456789
FACEBOOK_APP_SECRET=abc123xyz

# Render 环境变量（CI/CD）
# 通过 Render Dashboard 设置为 Secret
```

### 2. API 端点规范

#### Base URL
```
https://graph.facebook.com/v18.0
```

#### 核心端点

| 功能 | 端点 | 方法 | 说明 |
|------|------|------|------|
| 创建活动 | `/{BUSINESS_ACCOUNT_ID}/campaigns` | POST | 新建广告活动 |
| 读取活动 | `/{CAMPAIGN_ID}` | GET | 获取活动详情 |
| 更新活动 | `/{CAMPAIGN_ID}` | POST | 修改活动参数 |
| 活动报告 | `/{CAMPAIGN_ID}/insights` | GET | 性能指标 |
| 创建广告组 | `/{CAMPAIGN_ID}/adsets` | POST | 新建广告组 |
| 创建广告 | `/{AD_SET_ID}/ads` | POST | 新建广告创意 |
| 创建受众 | `/{AD_ACCOUNT_ID}/audiences` | POST | 自定义受众 |
| 获取受众 | `/{AUDIENCE_ID}` | GET | 受众详情 |

### 3. 请求/响应格式

#### 创建活动请求示例
```json
{
  "name": "Oct-2026-Discovery-NZ",
  "objective": "CONVERSIONS",
  "special_ad_categories": ["TRAVEL"],
  "status": "PAUSED",
  "daily_budget": 5000,
  "billing_event": "IMPRESSIONS",
  "campaign_budget_optimization": true,
  "access_token": "eaa..."
}
```

#### 响应格式
```json
{
  "id": "23843789034",
  "name": "Oct-2026-Discovery-NZ",
  "objective": "CONVERSIONS",
  "created_time": "2026-05-05T10:30:00+0000",
  "updated_time": "2026-05-05T10:30:00+0000",
  "status": "PAUSED"
}
```

#### 错误响应
```json
{
  "error": {
    "message": "Invalid currency",
    "type": "OAuthException",
    "code": 100,
    "fbtrace_id": "xyz123"
  }
}
```

---

## 数据库设计

### Supabase Schema

#### 1. 广告活动表
```sql
CREATE TABLE facebook_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_name TEXT NOT NULL,
  facebook_campaign_id VARCHAR(50) UNIQUE,
  objective TEXT NOT NULL, -- CONVERSIONS, TRAFFIC, LEAD_GENERATION
  daily_budget INTEGER, -- 以分（cents）为单位
  currency TEXT DEFAULT 'NZD',
  status TEXT DEFAULT 'PAUSED', -- ACTIVE, PAUSED, ARCHIVED
  tour_ids UUID[] DEFAULT '{}', -- 关联的 tour IDs
  target_audience JSONB, -- 目标受众定义
  conversion_event TEXT DEFAULT 'InitiateCheckout', -- 优化事件
  target_cpi NUMERIC, -- 目标成本 (NZD)
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  
  CONSTRAINT valid_objective CHECK (objective IN ('CONVERSIONS', 'TRAFFIC', 'LEAD_GENERATION'))
);

CREATE INDEX idx_facebook_campaign_id ON facebook_campaigns(facebook_campaign_id);
CREATE INDEX idx_campaign_status ON facebook_campaigns(status);
```

#### 2. 广告组表
```sql
CREATE TABLE facebook_adsets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES facebook_campaigns(id) ON DELETE CASCADE,
  adset_name TEXT NOT NULL,
  facebook_adset_id VARCHAR(50) UNIQUE,
  
  -- 定位参数
  targeting_spec JSONB, -- ages, geo_locations, interests, behaviors
  billing_event TEXT DEFAULT 'IMPRESSIONS', -- IMPRESSIONS, CLICKS, ACTIONS
  optimization_goal TEXT DEFAULT 'LINK_CLICKS', -- 优化目标
  
  -- 预算和出价
  daily_budget INTEGER,
  bid_amount INTEGER,
  bid_strategy TEXT DEFAULT 'LOWEST_COST_WITH_BID_CAP',
  
  status TEXT DEFAULT 'PAUSED',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_adset_campaign ON facebook_adsets(campaign_id);
```

#### 3. 广告创意表
```sql
CREATE TABLE facebook_ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  adset_id UUID REFERENCES facebook_adsets(id) ON DELETE CASCADE,
  ad_name TEXT NOT NULL,
  facebook_ad_id VARCHAR(50) UNIQUE,
  
  creative_spec JSONB, -- {image_hash, title, body, call_to_action_type}
  landing_page_url TEXT NOT NULL,
  status TEXT DEFAULT 'PAUSED',
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 4. 性能指标表
```sql
CREATE TABLE facebook_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES facebook_campaigns(id),
  adset_id UUID REFERENCES facebook_adsets(id),
  
  date DATE NOT NULL,
  spend NUMERIC, -- 花费 (NZD)
  impressions INTEGER,
  clicks INTEGER,
  ctr NUMERIC, -- 点击率 %
  actions INTEGER, -- 转化数
  action_value NUMERIC, -- 转化价值
  cost_per_action NUMERIC, -- CPA/CPI
  roas NUMERIC, -- ROAS = action_value / spend
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(campaign_id, adset_id, date)
);

CREATE INDEX idx_insights_date ON facebook_insights(date);
CREATE INDEX idx_insights_campaign ON facebook_insights(campaign_id);
```

#### 5. 受众管理表
```sql
CREATE TABLE facebook_audiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  audience_name TEXT NOT NULL,
  facebook_audience_id VARCHAR(50) UNIQUE,
  audience_type TEXT NOT NULL, -- CUSTOM, LOOKALIKE, DYNAMIC_RULE
  
  definition JSONB, -- 受众定义规则
  size INTEGER, -- 受众规模
  status TEXT DEFAULT 'ACTIVE',
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 迁移脚本
```sql
-- migration_001_create_facebook_tables.sql
-- 执行：supabase migration up
```

---

## 实现步骤

### Phase 1: 基础集成（第 1-2 周）

#### Step 1.1: 设置 Meta 开发者账户
- [ ] 创建 Meta Business Account
- [ ] 创建 App（Marketing 类型）
- [ ] 获取 Business Account ID、Ad Account ID
- [ ] 生成长期 Access Token

#### Step 1.2: 环境配置
```bash
# 1. 在 Render Dashboard 添加环境变量
Settings → Environment → Add Secret
- FACEBOOK_ACCESS_TOKEN
- FACEBOOK_BUSINESS_ACCOUNT_ID
- FACEBOOK_AD_ACCOUNT_ID

# 2. 本地 .env.local 配置
cp .env.example .env.local
```

#### Step 1.3: 数据库初始化
```bash
# 创建 Supabase migration
supabase migration new create_facebook_tables

# 在生成的文件中粘贴上面的 SQL Schema

# 执行迁移
supabase migration up
```

#### Step 1.4: 依赖安装
```bash
npm install axios pino dotenv-safe
```

---

### Phase 2: 核心服务实现（第 2-3 周）

#### Step 2.1: 创建 Facebook API 服务

**文件：** `src/lib/facebook/client.ts`
```typescript
import axios, { AxiosInstance } from 'axios';

const API_VERSION = 'v18.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

export class FacebookAdsClient {
  private axiosInstance: AxiosInstance;
  private businessAccountId: string;
  private accessToken: string;

  constructor(businessAccountId: string, accessToken: string) {
    this.businessAccountId = businessAccountId;
    this.accessToken = accessToken;

    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 添加 access token 到所有请求
    this.axiosInstance.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        access_token: this.accessToken,
      };
      return config;
    });

    // 错误处理
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const fbError = error.response?.data?.error;
        if (fbError) {
          console.error(`Facebook API Error [${fbError.code}]: ${fbError.message}`);
        }
        throw error;
      }
    );
  }

  // 创建活动
  async createCampaign(payload: {
    name: string;
    objective: 'CONVERSIONS' | 'TRAFFIC' | 'LEAD_GENERATION';
    special_ad_categories?: string[];
    daily_budget?: number;
    status?: 'ACTIVE' | 'PAUSED';
  }) {
    const response = await this.axiosInstance.post(
      `/${this.businessAccountId}/campaigns`,
      payload
    );
    return response.data;
  }

  // 获取活动详情
  async getCampaign(campaignId: string, fields: string[] = ['name', 'objective', 'status']) {
    const response = await this.axiosInstance.get(`/${campaignId}`, {
      params: {
        fields: fields.join(','),
      },
    });
    return response.data;
  }

  // 更新活动
  async updateCampaign(
    campaignId: string,
    updates: Record<string, any>
  ) {
    const response = await this.axiosInstance.post(`/${campaignId}`, updates);
    return response.data;
  }

  // 获取活动报告（insights）
  async getCampaignInsights(
    campaignId: string,
    options: {
      fields?: string[];
      date_preset?: 'last_7d' | 'last_30d' | 'last_90d';
      since?: string;
      until?: string;
    } = {}
  ) {
    const {
      fields = ['spend', 'impressions', 'clicks', 'actions', 'action_values'],
      date_preset = 'last_7d',
      since,
      until,
    } = options;

    const params: Record<string, any> = {
      fields: fields.join(','),
    };

    if (date_preset && !since && !until) {
      params.date_preset = date_preset;
    }
    if (since) params.since = since;
    if (until) params.until = until;

    const response = await this.axiosInstance.get(`/${campaignId}/insights`, {
      params,
    });
    return response.data.data;
  }

  // 创建广告组 (Ad Set)
  async createAdSet(campaignId: string, payload: {
    name: string;
    targeting: Record<string, any>;
    daily_budget?: number;
    billing_event?: string;
    optimization_goal?: string;
    status?: 'ACTIVE' | 'PAUSED';
  }) {
    const response = await this.axiosInstance.post(
      `/${campaignId}/adsets`,
      payload
    );
    return response.data;
  }

  // 创建受众 (Custom Audience)
  async createAudience(
    adAccountId: string,
    payload: {
      name: string;
      subtype: 'CUSTOM' | 'LOOKALIKE' | 'ENGAGEMENT';
      description?: string;
      rule?: Record<string, any>;
    }
  ) {
    const response = await this.axiosInstance.post(
      `/${adAccountId}/audiences`,
      payload
    );
    return response.data;
  }
}

export default FacebookAdsClient;
```

#### Step 2.2: 创建业务逻辑服务

**文件：** `src/lib/facebook/services/CampaignService.ts`
```typescript
import { createClient } from '@supabase/supabase-js';
import FacebookAdsClient from '../client';
import { logger } from '@/lib/logger';

interface CreateCampaignInput {
  name: string;
  objective: 'CONVERSIONS' | 'TRAFFIC' | 'LEAD_GENERATION';
  daily_budget_nzd: number;
  tour_ids: string[];
  target_audience: {
    age_min: number;
    age_max: number;
    geos: string[]; // ['NZ']
    interests?: string[];
  };
  conversion_event: string;
  target_cpi: number;
}

export class CampaignService {
  private facebookClient: FacebookAdsClient;
  private supabase: ReturnType<typeof createClient>;

  constructor(facebookClient: FacebookAdsClient, supabase: ReturnType<typeof createClient>) {
    this.facebookClient = facebookClient;
    this.supabase = supabase;
  }

  async createCampaign(input: CreateCampaignInput, userId: string) {
    try {
      // Step 1: 在 Facebook 创建活动
      const fbCampaign = await this.facebookClient.createCampaign({
        name: input.name,
        objective: input.objective,
        daily_budget: Math.round(input.daily_budget_nzd * 100), // 转换为分
        special_ad_categories: ['TRAVEL'],
        status: 'PAUSED', // 默认暂停
      });

      logger.info(`Campaign created on Facebook: ${fbCampaign.id}`);

      // Step 2: 在 Supabase 保存配置
      const { data, error } = await this.supabase
        .from('facebook_campaigns')
        .insert({
          campaign_name: input.name,
          facebook_campaign_id: fbCampaign.id,
          objective: input.objective,
          daily_budget: Math.round(input.daily_budget_nzd * 100),
          currency: 'NZD',
          status: 'PAUSED',
          tour_ids: input.tour_ids,
          target_audience: input.target_audience,
          conversion_event: input.conversion_event,
          target_cpi: input.target_cpi,
          created_by: userId,
        })
        .select()
        .single();

      if (error) throw error;

      logger.info(`Campaign saved to Supabase: ${data.id}`);

      return {
        success: true,
        campaign: {
          id: data.id,
          facebook_id: fbCampaign.id,
          name: input.name,
        },
      };
    } catch (error) {
      logger.error(`Campaign creation failed: ${error}`);
      throw error;
    }
  }

  async getCampaignMetrics(campaignId: string) {
    const { data: campaign, error: dbError } = await this.supabase
      .from('facebook_campaigns')
      .select('facebook_campaign_id')
      .eq('id', campaignId)
      .single();

    if (dbError || !campaign) {
      throw new Error(`Campaign not found: ${campaignId}`);
    }

    // 获取 Facebook insights
    const insights = await this.facebookClient.getCampaignInsights(
      campaign.facebook_campaign_id,
      {
        date_preset: 'last_30d',
      }
    );

    // 计算聚合指标
    const aggregated = insights.reduce(
      (acc: Record<string, number>, insight: any) => {
        acc.spend = (acc.spend || 0) + parseFloat(insight.spend || 0);
        acc.impressions = (acc.impressions || 0) + (insight.impressions || 0);
        acc.clicks = (acc.clicks || 0) + (insight.clicks || 0);
        acc.actions = (acc.actions || 0) + (insight.actions?.[0]?.value || 0);
        return acc;
      },
      {}
    );

    // 计算关键 KPI
    const metrics = {
      ...aggregated,
      ctr: aggregated.clicks / aggregated.impressions,
      cpc: aggregated.spend / aggregated.clicks,
      cpi: aggregated.spend / aggregated.actions, // Cost Per Inquiry
      roas: aggregated.actions > 0 ? aggregated.spend / aggregated.actions : 0,
    };

    // 保存到 insights 表
    await this.supabase.from('facebook_insights').insert({
      campaign_id: campaignId,
      date: new Date().toISOString().split('T')[0],
      ...metrics,
    });

    return metrics;
  }

  async optimizeBidding(campaignId: string) {
    // 获取当前 CPI
    const { data: campaign } = await this.supabase
      .from('facebook_campaigns')
      .select('target_cpi, daily_budget, facebook_campaign_id')
      .eq('id', campaignId)
      .single();

    const metrics = await this.getCampaignMetrics(campaignId);

    // 如果当前 CPI > 目标 CPI，降低预算 10%
    if (metrics.cpi > campaign.target_cpi) {
      const newBudget = Math.round(campaign.daily_budget * 0.9);
      await this.facebookClient.updateCampaign(campaign.facebook_campaign_id, {
        daily_budget: newBudget,
      });

      logger.info(`Budget reduced: ${campaign.daily_budget} → ${newBudget}`);
    }

    // 如果当前 CPI < 目标 CPI，增加预算 10%
    if (metrics.cpi < campaign.target_cpi * 0.8) {
      const newBudget = Math.round(campaign.daily_budget * 1.1);
      await this.facebookClient.updateCampaign(campaign.facebook_campaign_id, {
        daily_budget: newBudget,
      });

      logger.info(`Budget increased: ${campaign.daily_budget} → ${newBudget}`);
    }

    return { success: true };
  }
}

export default CampaignService;
```

---

### Phase 3: API Routes & Frontend（第 3-4 周）

#### Step 3.1: 创建 API Routes

**文件：** `src/app/api/facebook/campaigns/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import FacebookAdsClient from '@/lib/facebook/client';
import CampaignService from '@/lib/facebook/services/CampaignService';
import { getUser } from '@/lib/auth';
import { logger } from '@/lib/logger';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const facebookClient = new FacebookAdsClient(
  process.env.FACEBOOK_BUSINESS_ACCOUNT_ID!,
  process.env.FACEBOOK_ACCESS_TOKEN!
);

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const campaignService = new CampaignService(facebookClient, supabase);
    const result = await campaignService.createCampaign(body, user.id);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    logger.error(`POST /api/facebook/campaigns failed: ${error}`);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('id');

    if (!campaignId) {
      return NextResponse.json(
        { error: 'Campaign ID required' },
        { status: 400 }
      );
    }

    const campaignService = new CampaignService(facebookClient, supabase);
    const metrics = await campaignService.getCampaignMetrics(campaignId);

    return NextResponse.json(metrics);
  } catch (error) {
    logger.error(`GET /api/facebook/campaigns failed: ${error}`);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}
```

**文件：** `src/app/api/facebook/campaigns/[id]/optimize/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import CampaignService from '@/lib/facebook/services/CampaignService';
import { logger } from '@/lib/logger';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const campaignService = new CampaignService(facebookClient, supabase);
    const result = await campaignService.optimizeBidding(params.id);

    return NextResponse.json(result);
  } catch (error) {
    logger.error(`Bid optimization failed: ${error}`);
    return NextResponse.json(
      { error: 'Optimization failed' },
      { status: 500 }
    );
  }
}
```

#### Step 3.2: 创建前端组件

**文件：** `src/components/admin/AdCampaignForm.tsx`
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CreateCampaignFormData {
  name: string;
  objective: 'CONVERSIONS' | 'TRAFFIC' | 'LEAD_GENERATION';
  daily_budget_nzd: number;
  tour_ids: string[];
  target_cpi: number;
}

export function AdCampaignForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateCampaignFormData>({
    name: '',
    objective: 'CONVERSIONS',
    daily_budget_nzd: 50,
    tour_ids: [],
    target_cpi: 150, // NZD
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/facebook/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          target_audience: {
            age_min: 25,
            age_max: 65,
            geos: ['NZ'],
          },
          conversion_event: 'InitiateCheckout',
        }),
      });

      if (!response.ok) throw new Error('Failed to create campaign');

      const result = await response.json();
      router.push(`/admin/campaigns/${result.campaign.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">活动名称</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Oct-2026-Discovery-NZ"
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">目标受众</label>
        <select
          value={formData.objective}
          onChange={(e) =>
            setFormData({
              ...formData,
              objective: e.target.value as any,
            })
          }
          className="w-full px-3 py-2 border rounded"
        >
          <option value="CONVERSIONS">转化（咨询）</option>
          <option value="TRAFFIC">流量</option>
          <option value="LEAD_GENERATION">潜在客户</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">日预算 (NZD)</label>
        <input
          type="number"
          value={formData.daily_budget_nzd}
          onChange={(e) =>
            setFormData({
              ...formData,
              daily_budget_nzd: parseFloat(e.target.value),
            })
          }
          min="10"
          step="10"
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">目标 CPI (NZD)</label>
        <input
          type="number"
          value={formData.target_cpi}
          onChange={(e) =>
            setFormData({
              ...formData,
              target_cpi: parseFloat(e.target.value),
            })
          }
          min="50"
          step="10"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <p className="text-xs text-gray-500 mt-1">目标成本/咨询</p>
      </div>

      {error && <div className="bg-red-100 p-3 rounded text-red-800">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? '创建中...' : '创建活动'}
      </button>
    </form>
  );
}
```

---

## 部署与配置

### Render 环境变量清单

```bash
# Render Dashboard → Settings → Environment Variables

# Facebook 凭证
FACEBOOK_ACCESS_TOKEN=eaa1234...xyz
FACEBOOK_BUSINESS_ACCOUNT_ID=123456789
FACEBOOK_AD_ACCOUNT_ID=act_123456789
FACEBOOK_APP_ID=987654321
FACEBOOK_APP_SECRET=abc123...xyz

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# 应用
NODE_ENV=production
LOG_LEVEL=info
```

### 数据库迁移

```bash
# 1. 本地测试
supabase migration up

# 2. 推送到 Git
git add supabase/migrations/
git commit -m "feat: add facebook ads tables"
git push origin main

# 3. Render 自动执行（如果配置了 Supabase 自动迁移）
```

---

## 监控与报告

### 数据同步定时任务

**文件：** `src/lib/cron/sync-facebook-metrics.ts`
```typescript
import { createClient } from '@supabase/supabase-js';
import FacebookAdsClient from '@/lib/facebook/client';
import { logger } from '@/lib/logger';

export async function syncFacebookMetrics() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const facebookClient = new FacebookAdsClient(
    process.env.FACEBOOK_BUSINESS_ACCOUNT_ID!,
    process.env.FACEBOOK_ACCESS_TOKEN!
  );

  // 获取所有活跃活动
  const { data: campaigns, error } = await supabase
    .from('facebook_campaigns')
    .select('id, facebook_campaign_id, status')
    .eq('status', 'ACTIVE');

  if (error) {
    logger.error(`Failed to fetch campaigns: ${error}`);
    return;
  }

  // 为每个活动获取最新指标
  for (const campaign of campaigns || []) {
    try {
      const insights = await facebookClient.getCampaignInsights(
        campaign.facebook_campaign_id,
        { date_preset: 'today' }
      );

      if (insights.length > 0) {
        const insight = insights[0];
        await supabase.from('facebook_insights').insert({
          campaign_id: campaign.id,
          date: new Date().toISOString().split('T')[0],
          spend: parseFloat(insight.spend || 0),
          impressions: insight.impressions || 0,
          clicks: insight.clicks || 0,
          ctr: insight.clicks / insight.impressions,
          actions: insight.actions?.[0]?.value || 0,
          cost_per_action: parseFloat(insight.spend || 0) / (insight.actions?.[0]?.value || 1),
        });
      }
    } catch (err) {
      logger.error(`Sync failed for campaign ${campaign.id}: ${err}`);
    }
  }

  logger.info(`Synced metrics for ${campaigns?.length || 0} campaigns`);
}
```

### Vercel Cron（每天 09:00 UTC）

**文件：** `src/app/api/cron/sync-facebook/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { syncFacebookMetrics } from '@/lib/cron/sync-facebook-metrics';

export async function GET(request: NextRequest) {
  // 验证 Vercel Cron 密钥
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await syncFacebookMetrics();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4kb',
    },
  },
};
```

**Render 定时任务配置**
```yaml
# Render build/run commands
# 方式1：使用 Render 的 Cron（需要付费功能）
# 方式2：使用外部 cron 服务（EasyCron, IFTTT）
```

---

## 安全考虑

### 1. Token 管理

```typescript
// ❌ 不要这样做
const token = 'eaa1234...';  // 硬编码

// ✅ 这样做
const token = process.env.FACEBOOK_ACCESS_TOKEN;

// ✅ 验证 token 有效性
async function validateToken() {
  const response = await axios.get(
    'https://graph.facebook.com/me',
    { params: { access_token: process.env.FACEBOOK_ACCESS_TOKEN } }
  );
  return response.data.id;
}
```

### 2. API 速率限制

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 限制 100 个请求
  message: 'Too many requests',
});

app.use('/api/facebook/', limiter);
```

### 3. 审计日志

```typescript
// 记录所有 API 调用
await supabase.from('facebook_audit_log').insert({
  user_id: userId,
  action: 'CREATE_CAMPAIGN',
  campaign_id: campaignId,
  details: { name, budget },
  timestamp: new Date().toISOString(),
  ip_address: request.ip,
});
```

### 4. 权限控制

```typescript
// 仅允许管理员创建广告
async function requireAdminRole(request: NextRequest) {
  const user = await getUser(request);
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (profile.role !== 'admin') {
    throw new Error('Insufficient permissions');
  }

  return user;
}
```

---

## 常见问题与故障排查

### Q1: "Invalid Access Token"
**原因：** Token 过期或权限不足  
**解决：**
```bash
1. 在 Meta Developer Dashboard 重新生成 token
2. 验证 token 有权限：ads_management, business_management
3. 更新 Render 环境变量
4. 重新部署应用
```

### Q2: 广告组创建失败 - "Account Not Found"
**原因：** Ad Account ID 错误  
**解决：**
```bash
# 1. 验证 Ad Account ID
curl "https://graph.facebook.com/me/adaccounts?access_token=YOUR_TOKEN"

# 2. 确认格式为 "act_123456789"，不要遗漏 "act_" 前缀
```

### Q3: Insights 数据延迟
**原因：** Facebook 可能需要 2-4 小时才能处理数据  
**解决：** 定时任务应在 UTC 09:00 运行，避免检查不完整数据

---

## 总结与后续步骤

### 集成清单
- [ ] Meta Developer 账户设置
- [ ] Supabase 数据库迁移
- [ ] Facebook API 客户端实现
- [ ] CampaignService 业务逻辑
- [ ] API Routes 开发
- [ ] 前端管理界面
- [ ] 定时同步任务
- [ ] 安全审计与日志
- [ ] 本地测试验证
- [ ] Render 部署

### 预期时间表
```
Week 1: 环境 + 数据库 (Phase 1)
Week 2-3: 核心服务 + API (Phase 2)
Week 3-4: 前端 + 部署 (Phase 3)
Week 4: 测试与优化

总计：4 周
```

### 技术栈验证
| 组件 | 版本 | 状态 |
|------|------|------|
| Next.js | 14.x | ✅ |
| TypeScript | 5.x | ✅ |
| Supabase | Latest | ✅ |
| Axios | 1.x | 需安装 |
| Pino | 8.x | 需安装 |

---

## 联系与支持

**问题反馈：** 提交 GitHub Issue  
**更新日志：** 见本文档版本历史  
**维护者：** ChinaTravel 技术团队  

**文档最后更新：** 2026-05-05
