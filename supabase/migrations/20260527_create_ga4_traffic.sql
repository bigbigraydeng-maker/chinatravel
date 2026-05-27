-- GA4 traffic data cached from GA4 Data API (Analytics Data API v1beta)
-- Source: properties/{GA4_PROPERTY_ID}/runReport
-- Synced daily via POST /api/ga4/sync (cron)
-- Mirror of GSC pattern: dashboard reads from Supabase, never calls Google directly

create table if not exists public.ga4_traffic (
  date                       date    not null,
  page_path                  text    not null,
  source_medium              text    not null default '(none)',
  sessions                   integer not null default 0,
  total_users                integer not null default 0,
  engaged_sessions           integer not null default 0,
  avg_session_duration_sec   numeric(10,2) not null default 0,
  conversions                numeric(10,2) not null default 0,
  synced_at                  timestamptz not null default now(),
  primary key (date, page_path, source_medium)
);

create index if not exists ga4_traffic_date_idx on public.ga4_traffic (date desc);
create index if not exists ga4_traffic_path_idx on public.ga4_traffic (page_path);

-- RLS on: service role bypasses, nobody else can read by default
alter table public.ga4_traffic enable row level security;

comment on table  public.ga4_traffic                          is 'Cached GA4 daily traffic, synced from analytics.googleapis.com Data API via /api/ga4/sync.';
comment on column public.ga4_traffic.date                     is 'GA4 date dimension (YYYY-MM-DD)';
comment on column public.ga4_traffic.page_path                is 'GA4 pagePath dimension';
comment on column public.ga4_traffic.source_medium            is 'GA4 sessionSourceMedium dimension (e.g. "google / organic")';
comment on column public.ga4_traffic.avg_session_duration_sec is 'GA4 averageSessionDuration metric (seconds)';
comment on column public.ga4_traffic.conversions              is 'GA4 conversions metric (sum of key events)';
