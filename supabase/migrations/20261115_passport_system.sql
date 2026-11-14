-- ============================================================================
--  Passport management system (护照识别管理系统)
-- ----------------------------------------------------------------------------
--  NOT APPLIED. This file is reviewed in the PR and applied to production only
--  after the PM explicitly approves (A-grade change: sensitive personal data).
--
--  Security model
--  - Every table has RLS enabled and NO policies: the anon/public key can read
--    or write nothing. Only server routes using the service role touch these.
--  - Passport numbers are stored AES-256-GCM encrypted (app layer, key in
--    PASSPORT_ENCRYPTION_KEY). Lookups/dedupe use an HMAC, never plaintext.
--    Only the last 4 characters are stored in clear, for the masked display.
--  - Passport photos live in the private `passport-images` bucket, encrypted
--    before upload. They are deleted 6 months after the tour returns
--    (image_delete_after); the confirmed text record is kept.
--  - Every view, edit, export, link and reminder goes to passport_audit_log.
-- ============================================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- Departures: one tour on one date. Return date drives photo deletion.
-- ----------------------------------------------------------------------------
create table if not exists passport_departures (
  id uuid primary key default gen_random_uuid(),
  tour_name text not null,
  departure_date date not null,
  return_date date not null,
  notes text,
  created_by text not null,
  created_at timestamptz not null default now(),
  constraint passport_departures_dates check (return_date >= departure_date)
);

-- ----------------------------------------------------------------------------
-- Traveller profiles: one row per passport, keyed on passport number + DOB.
-- A second upload of the same passport merges into the same row.
-- ----------------------------------------------------------------------------
create table if not exists passport_travellers (
  id uuid primary key default gen_random_uuid(),
  passport_number_lookup text not null,   -- HMAC-SHA256 of the normalised number
  date_of_birth date not null,
  passport_number_enc text not null,      -- AES-256-GCM ciphertext
  passport_last4 text not null,
  surname text not null,
  given_names text not null default '',
  chinese_name text,
  sex text check (sex in ('M', 'F', 'X')),
  nationality text,                       -- ISO 3166 alpha-3 as printed in the MRZ
  issuing_state text,
  issue_date date,
  expiry_date date not null,
  place_of_issue text,
  contact_email text,
  contact_phone text,
  agent_name text,
  confirmed_by text not null,
  confirmed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint passport_travellers_identity unique (passport_number_lookup, date_of_birth)
);

-- ----------------------------------------------------------------------------
-- Which traveller is on which departure (and under which external order).
-- ----------------------------------------------------------------------------
create table if not exists passport_departure_travellers (
  departure_id uuid not null references passport_departures(id) on delete cascade,
  traveller_id uuid not null references passport_travellers(id) on delete cascade,
  order_ref text,
  added_by text not null,
  added_at timestamptz not null default now(),
  primary key (departure_id, traveller_id)
);

-- ----------------------------------------------------------------------------
-- Customer self-upload links: one per expected traveller, single use, expiring.
-- Only the SHA-256 of the token is stored; the raw token exists in the email.
-- ----------------------------------------------------------------------------
create table if not exists passport_upload_links (
  id uuid primary key default gen_random_uuid(),
  departure_id uuid not null references passport_departures(id) on delete cascade,
  traveller_label text not null,          -- name as on the booking
  email text,
  order_ref text,
  token_hash text not null unique,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  submitted_at timestamptz,
  scan_attempts integer not null default 0,
  reminder_count integer not null default 0,
  last_reminded_at timestamptz,
  created_by text not null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Every uploaded photo and what was read from it, waiting for staff review.
-- extraction_enc holds the AI/MRZ reading (contains the passport number) encrypted.
-- ----------------------------------------------------------------------------
create table if not exists passport_scans (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('staff', 'customer')),
  uploaded_by text not null,
  upload_link_id uuid references passport_upload_links(id) on delete set null,
  departure_id uuid references passport_departures(id) on delete set null,
  order_ref text,
  status text not null default 'pending_review'
    check (status in ('awaiting_customer', 'pending_review', 'confirmed', 'rejected')),
  image_path text,
  image_mime text,
  image_delete_after date not null,
  image_deleted_at timestamptz,
  extraction_enc text,
  mrz_valid boolean not null default false,
  warning_codes text[] not null default '{}',
  display_name text,                      -- surname/given names for the review queue
  ai_input_tokens integer,
  ai_output_tokens integer,
  traveller_id uuid references passport_travellers(id) on delete set null,
  confirmed_by text,
  confirmed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists passport_scans_status_idx on passport_scans (status, created_at desc);
create index if not exists passport_scans_purge_idx on passport_scans (image_delete_after) where image_deleted_at is null;

-- ----------------------------------------------------------------------------
-- Audit log: who viewed, edited, exported, linked or reminded — append only.
-- ----------------------------------------------------------------------------
create table if not exists passport_audit_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor text not null,
  actor_type text not null check (actor_type in ('staff', 'customer', 'system')),
  action text not null,
  traveller_id uuid,
  scan_id uuid,
  departure_id uuid,
  link_id uuid,
  detail jsonb not null default '{}'::jsonb
);

create index if not exists passport_audit_log_at_idx on passport_audit_log (at desc);

-- ----------------------------------------------------------------------------
-- RLS on, no policies: nothing is reachable with the public anon key.
-- ----------------------------------------------------------------------------
alter table passport_departures enable row level security;
alter table passport_travellers enable row level security;
alter table passport_departure_travellers enable row level security;
alter table passport_upload_links enable row level security;
alter table passport_scans enable row level security;
alter table passport_audit_log enable row level security;

-- Private bucket for the encrypted photos.
insert into storage.buckets (id, name, public)
values ('passport-images', 'passport-images', false)
on conflict (id) do nothing;
