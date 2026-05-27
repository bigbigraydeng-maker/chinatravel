import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export type Ga4DailyRow = {
  date: string;
  sessions: number;
  totalUsers: number;
  engagedSessions: number;
  conversions: number;
};

export type Ga4TopRow = {
  key: string;
  sessions: number;
  totalUsers: number;
};

export type Ga4Summary = {
  sessions: number;
  totalUsers: number;
  engagedSessions: number;
  conversions: number;
  engagementRate: number;
  avgSessionDurationSec: number;
  daily: Ga4DailyRow[];
  topPages: Ga4TopRow[];
  topSources: Ga4TopRow[];
  rowCount: number;
};

/**
 * Aggregate `public.ga4_traffic` for the dashboard.
 *
 * Note: totalUsers is summed across (path × source × day) rows, so the headline
 * "users" number is an over-count of unique users. For a true unique-user count
 * we'd need a separate GA4 query without those dimensions. This is good enough
 * for trend-spotting on the marketing board.
 */
export async function getGa4Summary(days = 7): Promise<Ga4Summary> {
  const supabase = getSupabase();

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);
  const from = fromDate.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('ga4_traffic')
    .select('date, page_path, source_medium, sessions, total_users, engaged_sessions, avg_session_duration_sec, conversions')
    .gte('date', from);

  if (error) throw error;

  const rows = data ?? [];

  // Totals
  let sessions = 0;
  let totalUsers = 0;
  let engagedSessions = 0;
  let conversions = 0;
  let durationWeighted = 0;

  // Per-day rollup
  const dailyMap = new Map<string, Ga4DailyRow>();
  // Per-page rollup
  const pageMap = new Map<string, { sessions: number; totalUsers: number }>();
  // Per-source rollup
  const sourceMap = new Map<string, { sessions: number; totalUsers: number }>();

  for (const r of rows) {
    const s = r.sessions ?? 0;
    const u = r.total_users ?? 0;
    const es = r.engaged_sessions ?? 0;
    const c = r.conversions ?? 0;
    const d = r.avg_session_duration_sec ?? 0;

    sessions += s;
    totalUsers += u;
    engagedSessions += es;
    conversions += c;
    durationWeighted += d * s;

    // daily
    if (!dailyMap.has(r.date)) {
      dailyMap.set(r.date, { date: r.date, sessions: 0, totalUsers: 0, engagedSessions: 0, conversions: 0 });
    }
    const day = dailyMap.get(r.date)!;
    day.sessions += s;
    day.totalUsers += u;
    day.engagedSessions += es;
    day.conversions += c;

    // pages
    if (!pageMap.has(r.page_path)) pageMap.set(r.page_path, { sessions: 0, totalUsers: 0 });
    const p = pageMap.get(r.page_path)!;
    p.sessions += s;
    p.totalUsers += u;

    // sources
    if (!sourceMap.has(r.source_medium)) sourceMap.set(r.source_medium, { sessions: 0, totalUsers: 0 });
    const src = sourceMap.get(r.source_medium)!;
    src.sessions += s;
    src.totalUsers += u;
  }

  const daily = Array.from(dailyMap.values()).sort((a, b) => a.date.localeCompare(b.date));

  const topPages: Ga4TopRow[] = Array.from(pageMap.entries())
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 10);

  const topSources: Ga4TopRow[] = Array.from(sourceMap.entries())
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 8);

  return {
    sessions,
    totalUsers,
    engagedSessions,
    conversions,
    engagementRate: sessions > 0 ? engagedSessions / sessions : 0,
    avgSessionDurationSec: sessions > 0 ? durationWeighted / sessions : 0,
    daily,
    topPages,
    topSources,
    rowCount: rows.length,
  };
}
