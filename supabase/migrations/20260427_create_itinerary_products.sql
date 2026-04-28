-- ============================================================================
--  Itinerary Builder: 产品库 schema
-- ----------------------------------------------------------------------------
--  用途：OP 行程生成器的产品库。
--  涵盖：景点/活动 (attraction) + 酒店住宿 (accommodation)
--  关联：/itinerary-builder 选品页 + 现有 export-docx Word 导出
--  作者：Phase 1 Step 1A
--  日期：2026-04-27
-- ============================================================================

-- ----------------------------------------------------------------------------
-- enums
-- ----------------------------------------------------------------------------

create type itinerary_product_type as enum ('attraction', 'accommodation');

-- 景点分类（基于 engine.ts 现有数据集）
create type itinerary_product_category as enum (
  'modern',     -- 现代/城市地标
  'adventure',  -- 冒险/刺激
  'nature',     -- 自然风光
  'cultural',   -- 文化/历史
  'wellness',   -- 温泉/疗愈
  'family',     -- 亲子/家庭
  'food'        -- 美食/餐饮
);

-- 城市（与 itinerary destination 对齐）
create type itinerary_city as enum (
  'auckland',
  'rotorua',
  'queenstown',
  'hobbiton',
  'waitomo',
  'taupo',
  'wellington',
  'christchurch'
);

-- ----------------------------------------------------------------------------
-- products 表
-- ----------------------------------------------------------------------------

create table itinerary_products (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,                -- 'sky-tower', 'auckland-hilton'
  type          itinerary_product_type not null,
  name_zh       text not null,
  name_en       text,
  description   text not null default '',
  city          itinerary_city not null,

  -- attraction 字段
  category      itinerary_product_category,          -- attraction 必填，accommodation 留空
  duration_hours numeric(4, 1),                       -- 例如 2.5h；accommodation 留空

  -- accommodation 字段
  stars         smallint check (stars between 1 and 5), -- accommodation 必填

  -- 共用字段
  price         numeric(10, 2) not null default 0,    -- attraction: 每人价；accommodation: 每晚价
  currency      char(3) not null default 'NZD',
  image_url     text,                                  -- Unsplash CDN 或 Supabase Storage
  tags          text[] not null default '{}',          -- 自由打标签：['outdoor', 'wheelchair-friendly']

  -- 元数据
  is_active     boolean not null default true,        -- 软下架
  display_order int not null default 100,             -- 同 city + type 内的排序
  notes         text,                                  -- OP 内部备注
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 数据完整性约束
alter table itinerary_products add constraint itinerary_products_attraction_complete
  check (
    type <> 'attraction'
    or (category is not null and duration_hours is not null and duration_hours > 0)
  );

alter table itinerary_products add constraint itinerary_products_accommodation_complete
  check (
    type <> 'accommodation'
    or stars is not null
  );

-- ----------------------------------------------------------------------------
-- 索引（针对选品 UI 的常见查询）
-- ----------------------------------------------------------------------------

-- 按类型 + 城市筛选（最常用：左侧产品列表的主筛选）
create index idx_itinerary_products_type_city
  on itinerary_products (type, city)
  where is_active = true;

-- 按 category 筛选（attraction 副筛选）
create index idx_itinerary_products_category
  on itinerary_products (category)
  where is_active = true and type = 'attraction';

-- 全文搜索（搜产品名）
create index idx_itinerary_products_search
  on itinerary_products
  using gin (to_tsvector('simple', coalesce(name_zh, '') || ' ' || coalesce(name_en, '')));

-- ----------------------------------------------------------------------------
-- updated_at 自动更新触发器
-- ----------------------------------------------------------------------------

create or replace function itinerary_products_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger itinerary_products_updated_at
  before update on itinerary_products
  for each row
  execute function itinerary_products_set_updated_at();

-- ----------------------------------------------------------------------------
-- RLS（Row Level Security）策略
-- ----------------------------------------------------------------------------
-- 这是 OP 内部工具，目前不开放给客户端。前端只通过服务端 API 访问。
-- 启用 RLS 但只给 service_role 全权访问，匿名/authenticated 都不可读写。
-- 后续如果做 admin UI 用 Supabase Auth，再开 authenticated 的 select 权限。

alter table itinerary_products enable row level security;

-- 默认拒绝所有匿名/authenticated 访问（不建任何 policy 即默认拒绝）
-- service_role 自动绕过 RLS，服务端代码用 service_role key 即可访问

-- ----------------------------------------------------------------------------
-- 注释（Supabase Dashboard 里更友好）
-- ----------------------------------------------------------------------------

comment on table itinerary_products is '行程生成器产品库：景点 + 酒店';
comment on column itinerary_products.slug is '英文 ID，对外稳定，例如 sky-tower';
comment on column itinerary_products.type is 'attraction 景点/活动 | accommodation 酒店';
comment on column itinerary_products.duration_hours is '游览时长（小时）。仅 attraction 必填';
comment on column itinerary_products.stars is '酒店星级 1-5。仅 accommodation 必填';
comment on column itinerary_products.price is 'attraction: 每人价格；accommodation: 每晚房价';
comment on column itinerary_products.tags is '自由打标签数组，用于灵活筛选';
comment on column itinerary_products.is_active is '软下架开关。设为 false 时选品 UI 不显示';
comment on column itinerary_products.display_order is '同 city+type 内的展示顺序，数值越小越靠前';
