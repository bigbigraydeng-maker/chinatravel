import { getSupabaseAdmin } from '@/lib/supabase-admin';
import {
  buildQuoteRef,
  createBlankItinerary,
  type TailorMadeItinerary,
  type TailorMadeRecord,
  type TailorMadeStatus,
  type TailorMadeSummary,
} from './types';

/**
 * tailor_made_itineraries 表的读写。服务端专用（service role key）。
 * 建表 SQL：supabase/migrations/20260728_create_tailor_made_itineraries.sql
 */

const TABLE = 'tailor_made_itineraries';
const SUMMARY_COLUMNS =
  'id, quote_ref, client_name, trip_title, status, consultant_name, consultant_email, sent_at, created_at, updated_at';

export async function listItineraries(includeArchived = false): Promise<TailorMadeSummary[]> {
  let query = getSupabaseAdmin().from(TABLE).select(SUMMARY_COLUMNS).order('updated_at', { ascending: false });

  if (!includeArchived) query = query.neq('status', 'archived');

  const { data, error } = await query;
  if (error) throw new Error(`读取行程单列表失败：${error.message}`);
  return (data ?? []) as unknown as TailorMadeSummary[];
}

export async function getItinerary(id: string): Promise<TailorMadeRecord | null> {
  const { data, error } = await getSupabaseAdmin().from(TABLE).select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(`读取行程单失败：${error.message}`);
  return (data as TailorMadeRecord) ?? null;
}

/**
 * 生成下一个报价编号。
 *
 * 取当年最大序号 +1。并发下有撞号的可能，但 quote_ref 上有 unique 约束会挡住，
 * 且现实中只有个位数顾问在用 —— 不值得为此上一张序列表。
 */
export async function nextQuoteRef(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `CTS-${year}-`;

  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .select('quote_ref')
    .like('quote_ref', `${prefix}%`)
    .order('quote_ref', { ascending: false })
    .limit(1);

  if (error) throw new Error(`生成报价编号失败：${error.message}`);

  const last = data?.[0]?.quote_ref as string | undefined;
  const lastSeq = last ? parseInt(last.slice(prefix.length), 10) : 0;
  return buildQuoteRef(year, (Number.isFinite(lastSeq) ? lastSeq : 0) + 1);
}

/**
 * 新建。传 source 则以它为蓝本复制（tailor-made 大部分新单都是老单改出来的），
 * 但客户信息和报价号不继承 —— 复制过来的客户名发错人是最尴尬的事故。
 */
export async function createItinerary(source?: TailorMadeItinerary): Promise<TailorMadeRecord> {
  const quoteRef = await nextQuoteRef();

  const payload: TailorMadeItinerary = source
    ? {
        ...structuredClone(source),
        meta: { ...structuredClone(source.meta), quoteRef },
        client: { name: '', travellers: source.client.travellers },
      }
    : createBlankItinerary(quoteRef);

  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .insert({
      quote_ref: quoteRef,
      client_name: payload.client.name,
      trip_title: payload.trip.title,
      status: 'draft' satisfies TailorMadeStatus,
      payload,
      consultant_name: payload.meta.consultant.name || null,
      consultant_email: payload.meta.consultant.email || null,
    })
    .select('*')
    .single();

  if (error) throw new Error(`新建行程单失败：${error.message}`);
  return data as TailorMadeRecord;
}

export async function saveItinerary(
  id: string,
  payload: TailorMadeItinerary,
  status?: TailorMadeStatus
): Promise<TailorMadeRecord> {
  const patch: Record<string, unknown> = {
    // 列表页字段跟着 payload 走，保持一致
    quote_ref: payload.meta.quoteRef,
    client_name: payload.client.name,
    trip_title: payload.trip.title,
    payload,
    consultant_name: payload.meta.consultant.name || null,
    consultant_email: payload.meta.consultant.email || null,
  };
  if (status) patch.status = status;
  if (status === 'sent') patch.sent_at = new Date().toISOString();

  const { data, error } = await getSupabaseAdmin().from(TABLE).update(patch).eq('id', id).select('*').single();
  if (error) throw new Error(`保存行程单失败：${error.message}`);
  return data as TailorMadeRecord;
}

export async function setStatus(id: string, status: TailorMadeStatus): Promise<void> {
  const patch: Record<string, unknown> = { status };
  if (status === 'sent') patch.sent_at = new Date().toISOString();

  const { error } = await getSupabaseAdmin().from(TABLE).update(patch).eq('id', id);
  if (error) throw new Error(`更新状态失败：${error.message}`);
}

export async function deleteItinerary(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin().from(TABLE).delete().eq('id', id);
  if (error) throw new Error(`删除行程单失败：${error.message}`);
}
