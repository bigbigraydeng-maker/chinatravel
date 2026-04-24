import { getGscClient } from './client';
import { createClient } from '@supabase/supabase-js';

const SITE_URL = process.env.GSC_SITE_URL ?? 'sc-domain:ctstours.co.nz';

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export async function syncGscData(targetDate?: string) {
  // GSC data has 2-3 day delay; default to 3 days ago
  const date = targetDate ?? daysAgo(3);

  const gsc = getGscClient();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const res = await gsc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: date,
      endDate: date,
      dimensions: ['query', 'page'],
      rowLimit: 1000,
      dataState: 'all',
    },
  });

  const rows = res.data.rows ?? [];
  if (rows.length === 0) {
    console.log(`[GSC Sync] No data for ${date}`);
    return { date, inserted: 0, skipped: 0 };
  }

  const records = rows.map((row) => ({
    date,
    query: row.keys?.[0] ?? '',
    page: row.keys?.[1] ?? null,
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }));

  const { error } = await supabase
    .from('gsc_search_analytics')
    .upsert(records, {
      onConflict: 'date,query,page,country,device',
      ignoreDuplicates: true,
    });

  if (error) throw new Error(`Supabase upsert failed: ${error.message}`);

  console.log(`[GSC Sync] ${date}: ${records.length} rows synced`);
  return { date, inserted: records.length };
}
