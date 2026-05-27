import { createClient } from '@supabase/supabase-js';
import { getGa4Client, getGa4PropertyPath } from './client';

/**
 * Fetch the last N days of GA4 traffic and upsert into public.ga4_traffic.
 *
 * Dimensions: date, pagePath, sessionSourceMedium
 * Metrics:    sessions, totalUsers, engagedSessions, averageSessionDuration, conversions
 *
 * GA4 data has ~24h processing delay; we sync `daysBack` ago through yesterday.
 */
export async function syncGa4Data(daysBack = 7): Promise<{ rows: number; from: string; to: string }> {
  const ga4 = getGa4Client();
  const property = getGa4PropertyPath();

  const startDate = `${daysBack}daysAgo`;
  const endDate = 'yesterday';

  const res = await ga4.properties.runReport({
    property,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'date' },
        { name: 'pagePath' },
        { name: 'sessionSourceMedium' },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'engagedSessions' },
        { name: 'averageSessionDuration' },
        { name: 'conversions' },
      ],
      limit: '10000',
    },
  });

  const rawRows = res.data.rows ?? [];

  if (rawRows.length === 0) {
    return { rows: 0, from: startDate, to: endDate };
  }

  const records = rawRows.map((row) => {
    // GA4 date dim comes back as YYYYMMDD; normalise to ISO YYYY-MM-DD
    const yyyymmdd = row.dimensionValues?.[0]?.value ?? '';
    const date =
      yyyymmdd.length === 8
        ? `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`
        : yyyymmdd;

    const pagePath = row.dimensionValues?.[1]?.value ?? '(unknown)';
    const sourceMedium = row.dimensionValues?.[2]?.value || '(none)';
    const m = row.metricValues ?? [];

    return {
      date,
      page_path: pagePath,
      source_medium: sourceMedium,
      sessions: parseInt(m[0]?.value ?? '0', 10),
      total_users: parseInt(m[1]?.value ?? '0', 10),
      engaged_sessions: parseInt(m[2]?.value ?? '0', 10),
      avg_session_duration_sec: parseFloat(m[3]?.value ?? '0'),
      conversions: parseFloat(m[4]?.value ?? '0'),
    };
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from('ga4_traffic')
    .upsert(records, { onConflict: 'date,page_path,source_medium' });

  if (error) throw new Error(`Supabase upsert failed: ${error.message}`);

  console.log(`[GA4 Sync] ${startDate} → ${endDate}: ${records.length} rows`);
  return { rows: records.length, from: startDate, to: endDate };
}
