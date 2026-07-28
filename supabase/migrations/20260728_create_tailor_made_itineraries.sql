-- ============================================================================
--  Tailor-made 行程单：存储表
-- ----------------------------------------------------------------------------
--  用途：/admin/tailor-made 顾问工作台。一行 = 一份客户行程单。
--  行程内容整体存 payload (jsonb)，schema 见
--    templates/tailor-made-itinerary/README.md
--  常用字段（客户名/标题/状态/报价号）提到列上，供列表页排序筛选，不必解 JSON。
--  日期：2026-07-28
-- ============================================================================

create type tailor_made_status as enum (
  'draft',      -- 草稿，顾问还在改
  'sent',       -- 已发给客户
  'confirmed',  -- 客户已确认成交
  'archived'    -- 归档（不再出现在默认列表）
);

create table tailor_made_itineraries (
  id                uuid primary key default gen_random_uuid(),

  -- 列表页要用的字段（与 payload 内同名字段保持同步，由服务端写入时同时更新）
  quote_ref         text not null unique,               -- 报价编号，如 CTS-2027-0142
  client_name       text not null default '',
  trip_title        text not null default '',
  status            tailor_made_status not null default 'draft',

  -- 完整行程数据
  payload           jsonb not null,

  -- 归属与投递
  consultant_name   text,
  consultant_email  text,
  sent_at           timestamptz,                        -- 发送给客户的时间

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 索引
-- ----------------------------------------------------------------------------

-- 列表页默认视图：非归档，按最近修改倒序
create index idx_tailor_made_status_updated
  on tailor_made_itineraries (status, updated_at desc);

-- 按客户名搜索（顾问最常见的找单方式）
create index idx_tailor_made_client_name
  on tailor_made_itineraries (lower(client_name));

-- ----------------------------------------------------------------------------
-- updated_at 自动更新
-- ----------------------------------------------------------------------------

create or replace function tailor_made_itineraries_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tailor_made_itineraries_updated_at
  before update on tailor_made_itineraries
  for each row
  execute function tailor_made_itineraries_set_updated_at();

-- ----------------------------------------------------------------------------
-- RLS
-- ----------------------------------------------------------------------------
-- 内部工具，只经服务端 API 访问（service_role 自动绕过 RLS）。
-- 启用 RLS 且不建任何 policy = 匿名/authenticated 一律拒绝。
-- 与 itinerary_products 的做法一致。

alter table tailor_made_itineraries enable row level security;

-- ----------------------------------------------------------------------------
-- 注释
-- ----------------------------------------------------------------------------

comment on table tailor_made_itineraries is 'Tailor-made 客户行程单（/admin/tailor-made）';
comment on column tailor_made_itineraries.quote_ref is '报价编号，对客户可见，出现在封面和每页页头';
comment on column tailor_made_itineraries.payload is '完整行程 JSON，schema 见 templates/tailor-made-itinerary/README.md';
comment on column tailor_made_itineraries.status is 'draft 草稿 | sent 已发送 | confirmed 已成交 | archived 归档';
comment on column tailor_made_itineraries.sent_at is '首次发送给客户的时间';
