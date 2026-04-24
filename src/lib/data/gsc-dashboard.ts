import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getTopKeywords(limit = 20) {
  const supabase = getSupabase();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const fromDate = sevenDaysAgo.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('gsc_search_analytics')
    .select('query, clicks, impressions, ctr, position, date')
    .gte('date', fromDate)
    .order('impressions', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
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
