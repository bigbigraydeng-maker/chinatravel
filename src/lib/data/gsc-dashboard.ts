import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  // Use service role key to bypass RLS for server-side admin queries
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function getTopKeywords(limit = 20) {
  const supabase = getSupabase();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const fromDate = sevenDaysAgo.toISOString().split('T')[0];

  // Fetch all rows for the period (no page dedup yet)
  const { data, error } = await supabase
    .from('gsc_search_analytics')
    .select('query, clicks, impressions, position, date')
    .gte('date', fromDate);

  if (error) throw error;

  // Aggregate by query: sum clicks/impressions, impression-weighted avg position
  const map = new Map<string, { clicks: number; impressions: number; positionSum: number; date: string }>();
  for (const row of data ?? []) {
    const key = (row.query ?? '').toLowerCase();
    if (!map.has(key)) map.set(key, { clicks: 0, impressions: 0, positionSum: 0, date: '' });
    const agg = map.get(key)!;
    agg.clicks     += row.clicks     ?? 0;
    agg.impressions += row.impressions ?? 0;
    agg.positionSum += (row.position ?? 0) * (row.impressions ?? 1);
    if ((row.date ?? '') > agg.date) agg.date = row.date ?? '';
  }

  return Array.from(map.entries())
    .map(([query, agg]) => ({
      query,
      clicks:      agg.clicks,
      impressions: agg.impressions,
      ctr:         agg.impressions > 0 ? agg.clicks / agg.impressions : 0,
      position:    agg.impressions > 0 ? agg.positionSum / agg.impressions : 0,
      date:        agg.date,
    }))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, limit);
}

export async function getKeywordTrend(query: string, days = 30) {
  const supabase = getSupabase();

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const { data, error } = await supabase
    .from('gsc_search_analytics')
    .select('date, clicks, impressions, position')
    .eq('query', query)
    .gte('date', fromDate.toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) throw error;
  return data ?? [];
}
