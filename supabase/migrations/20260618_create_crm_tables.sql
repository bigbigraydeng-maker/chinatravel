-- CTS WhatsApp/Messenger CRM
-- Contacts: one row per unique customer (merged across channels)
CREATE TABLE IF NOT EXISTS crm_contacts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT,
  email           TEXT,
  phone           TEXT,
  whatsapp_id     TEXT UNIQUE,            -- wa_id from WhatsApp Cloud API
  messenger_id    TEXT UNIQUE,            -- PSID from Messenger
  source          TEXT NOT NULL DEFAULT 'website', -- 'whatsapp'|'messenger'|'website'|'instagram'
  status          TEXT NOT NULL DEFAULT 'new',     -- 'new'|'contacted'|'qualified'|'proposal'|'booked'|'closed'|'lost'
  tour_interest   TEXT,                   -- tour name / destination they asked about
  travel_date     TEXT,                   -- rough travel date they mentioned
  party_size      INT,
  budget          TEXT,
  tags            TEXT[] DEFAULT '{}',
  notes           TEXT,
  assigned_to     TEXT,
  first_contact_at TIMESTAMPTZ DEFAULT NOW(),
  last_contact_at  TIMESTAMPTZ DEFAULT NOW(),
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations: one per channel session
CREATE TABLE IF NOT EXISTS crm_conversations (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id             UUID NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
  channel                TEXT NOT NULL,   -- 'whatsapp'|'messenger'|'instagram'|'email'
  channel_conversation_id TEXT,           -- thread/conversation ID from the platform
  status                 TEXT NOT NULL DEFAULT 'open', -- 'open'|'pending'|'closed'
  last_message_at        TIMESTAMPTZ DEFAULT NOW(),
  created_at             TIMESTAMPTZ DEFAULT NOW()
);

-- Messages: individual messages within a conversation
CREATE TABLE IF NOT EXISTS crm_messages (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id    UUID NOT NULL REFERENCES crm_conversations(id) ON DELETE CASCADE,
  contact_id         UUID NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
  direction          TEXT NOT NULL,       -- 'inbound'|'outbound'
  content            TEXT NOT NULL,
  message_type       TEXT DEFAULT 'text', -- 'text'|'image'|'template'|'note'
  channel_message_id TEXT,               -- message ID from the platform (for deduplication)
  is_automated       BOOLEAN DEFAULT false,
  sent_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-reply templates (editable from admin)
CREATE TABLE IF NOT EXISTS crm_auto_replies (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  trigger_keywords TEXT[] NOT NULL DEFAULT '{}',
  channel          TEXT DEFAULT 'all',   -- 'all'|'whatsapp'|'messenger'
  content          TEXT NOT NULL,
  priority         INT DEFAULT 0,        -- higher = checked first
  delay_seconds    INT DEFAULT 0,
  is_active        BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS crm_contacts_status_idx ON crm_contacts(status);
CREATE INDEX IF NOT EXISTS crm_contacts_source_idx ON crm_contacts(source);
CREATE INDEX IF NOT EXISTS crm_contacts_last_contact_idx ON crm_contacts(last_contact_at DESC);
CREATE INDEX IF NOT EXISTS crm_conversations_contact_idx ON crm_conversations(contact_id);
CREATE INDEX IF NOT EXISTS crm_messages_conversation_idx ON crm_messages(conversation_id);
CREATE INDEX IF NOT EXISTS crm_messages_sent_at_idx ON crm_messages(sent_at DESC);

-- Seed default auto-reply templates
INSERT INTO crm_auto_replies (name, trigger_keywords, channel, content, priority, is_active) VALUES
(
  '欢迎消息 / Welcome',
  ARRAY['hi','hello','hey','kia ora','enquire','enquiry','info','information','start','help','您好','你好'],
  'all',
  '👋 Kia ora! Welcome to CTS Tours — New Zealand''s luxury China travel specialists.

We organise premium group & private tours across Beijing, Xi''an, Shanghai, Chengdu, Guilin, Zhangjiajie & Yunnan.

Reply with:
🇨🇳 *1* — View our 2026 tours & pricing
✈️ *2* — Visa-free entry info for NZ passport holders
🎒 *3* — Request a tailor-made itinerary
📞 *4* — Speak to a travel consultant

Or type your question and we''ll get back to you within 2 hours! 🕐',
  100,
  true
),
(
  '行程/价格查询 / Tours & Pricing',
  ARRAY['tour','tours','price','pricing','cost','how much','itinerary','package','2026','deal','offer','1'],
  'all',
  '🌏 *Our 2026 China Tour Packages*

🔸 *Discovery Tours* (10–12 days from ~NZD $4,990pp)
  • Beijing & Xi''an — Forbidden City + Terracotta Warriors
  • Shanghai & Surroundings — Modern China + water towns

🔸 *Signature Tours* (14–16 days from ~NZD $7,490pp)
  • Classic China — Beijing, Xi''an, Shanghai, Guilin
  • Golden Triangle+ — Plus Chengdu & Giant Pandas

🔸 *Stopover Tours* (3–5 days — perfect add-on!)
  • Beijing, Shanghai, or Xi''an city breaks

👉 Full details: https://www.ctstours.co.nz/china-tours

*Which destination interests you most?* 😊',
  90,
  true
),
(
  '免签信息 / Visa-Free Info',
  ARRAY['visa','passport','nz passport','requirement','visa-free','free visa','visa free','2'],
  'all',
  '✅ *Great news for NZ passport holders!*

China now offers *visa-free entry* for New Zealand citizens (up to 30 days per visit)!

📋 What you need:
• Valid NZ passport (6+ months remaining)
• Return flight booking
• Hotel reservations

📖 Full visa guide: https://www.ctstours.co.nz/china-visa-guide-for-new-zealanders

Our team handles all the paperwork guidance included in every tour package! 🎉',
  80,
  true
),
(
  '定制行程 / Tailor-Made',
  ARRAY['tailor','custom','private','private tour','bespoke','my own','personalised','3'],
  'all',
  '🎨 *Tailor-Made China Tours*

We specialise in completely personalised itineraries — your dates, your pace, your budget!

✔️ Private guides & transport
✔️ Handpicked boutique hotels
✔️ Off-the-beaten-path experiences
✔️ Family, honeymoon & group specialists

To get started, tell us:
• How many travellers?
• Preferred travel dates?
• Which destinations interest you?
• Any special interests (food, photography, hiking...)?

Or fill in our detailed planner: https://www.ctstours.co.nz/tailor-made',
  75,
  true
),
(
  '联系顾问 / Contact Consultant',
  ARRAY['call','phone','speak','consultant','agent','contact','talk','4'],
  'all',
  '📞 *Talk to a China Travel Specialist*

Our team is based in Auckland and available:
🕐 Mon–Fri: 9am–5:30pm (NZT)
📱 WhatsApp: This chat
📧 Email: info@ctstours.co.nz
🌐 Website: https://www.ctstours.co.nz

We''ll respond within 2 business hours. For urgent enquiries during business hours, leave your phone number and we''ll call you back! 😊',
  70,
  true
),
(
  '北京相关 / Beijing',
  ARRAY['beijing','great wall','forbidden city','peking','bj'],
  'all',
  '🏯 *Beijing Tours with CTS*

Experience the grandeur of China''s ancient capital!

✨ Highlights:
• Great Wall at Mutianyu (private section, less crowded)
• Forbidden City & Tiananmen Square
• Temple of Heaven & Summer Palace
• Hutong alley rickshaw tour

🔗 Beijing tours: https://www.ctstours.co.nz/destinations/beijing

Would you like pricing for a Beijing tour? 😊',
  60,
  true
),
(
  '通用回复 / Default Fallback',
  ARRAY[]::TEXT[],
  'all',
  '😊 Thanks for your message! Our China travel team has received your enquiry.

We''ll get back to you within *2 business hours* (Mon–Fri, NZT).

In the meantime, explore our 2026 tours: https://www.ctstours.co.nz/china-tours

📞 Urgent? Call us: 0800 CTS 888',
  0,
  true
);

-- Row Level Security: only service role can read/write CRM data
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_auto_replies ENABLE ROW LEVEL SECURITY;

-- Service role bypass (admin API with service role key)
CREATE POLICY "service_role_all" ON crm_contacts FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON crm_conversations FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON crm_messages FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON crm_auto_replies FOR ALL TO service_role USING (true) WITH CHECK (true);
