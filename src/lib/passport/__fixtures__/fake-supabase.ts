/**
 * Minimal in-memory stand-in for the Supabase client, covering only the query
 * shapes store.ts uses. Lets the flow tests run without a database.
 */
import { randomUUID } from 'crypto';

type Row = Record<string, unknown>;
type Filter = (r: Row) => boolean;

export interface FakeDb {
  tables: Record<string, Row[]>;
  files: Map<string, Buffer>;
  client: unknown;
}

export function createFakeSupabase(): FakeDb {
  const tables: Record<string, Row[]> = {};
  const files = new Map<string, Buffer>();
  const t = (name: string) => (tables[name] ??= []);

  function query(table: string) {
    let op: 'select' | 'insert' | 'update' | 'upsert' = 'select';
    let payload: Row | Row[] | null = null;
    let conflict: string[] = [];
    const filters: Filter[] = [];
    let single: 'one' | 'maybe' | null = null;
    let returning = false;
    let limitN: number | null = null;

    const run = () => {
      const rows = t(table);
      let result: Row[] = [];
      if (op === 'insert') {
        const list = (Array.isArray(payload) ? payload : [payload]) as Row[];
        result = list.map((r) => ({ id: randomUUID(), created_at: new Date().toISOString(), ...r }));
        rows.push(...result);
      } else if (op === 'upsert') {
        const r = payload as Row;
        const hit = rows.find((x) => conflict.every((k) => x[k] === r[k]));
        if (hit) Object.assign(hit, r);
        else rows.push({ ...r });
        result = [hit ?? r];
      } else {
        result = rows.filter((r) => filters.every((f) => f(r)));
        if (op === 'update') result.forEach((r) => Object.assign(r, payload));
      }
      if (limitN !== null) result = result.slice(0, limitN);
      if (op !== 'select' && !returning) return { data: null, error: null };
      if (single === 'one') return result.length === 1 ? { data: result[0], error: null } : { data: null, error: { message: `expected 1 row, got ${result.length}` } };
      if (single === 'maybe') return { data: result[0] ?? null, error: null };
      return { data: result, error: null };
    };

    const b = {
      select: () => {
        if (op !== 'select') returning = true;
        return b;
      },
      insert: (p: Row | Row[]) => ((op = 'insert'), (payload = p), b),
      update: (p: Row) => ((op = 'update'), (payload = p), b),
      upsert: (p: Row, o?: { onConflict?: string }) => ((op = 'upsert'), (payload = p), (conflict = (o?.onConflict ?? 'id').split(',')), b),
      eq: (k: string, v: unknown) => (filters.push((r) => r[k] === v), b),
      in: (k: string, v: unknown[]) => (filters.push((r) => v.includes(r[k])), b),
      lte: (k: string, v: string) => (filters.push((r) => String(r[k]) <= v), b),
      gte: (k: string, v: string) => (filters.push((r) => String(r[k]) >= v), b),
      is: (k: string, v: null) => (filters.push((r) => (r[k] ?? null) === v), b),
      or: () => b,
      order: () => b,
      limit: (n: number) => ((limitN = n), b),
      single: () => ((single = 'one'), b),
      maybeSingle: () => ((single = 'maybe'), b),
      then: (resolve: (v: unknown) => void, reject: (e: unknown) => void) => {
        try {
          resolve(run());
        } catch (e) {
          reject(e);
        }
      },
    };
    return b;
  }

  const client = {
    from: query,
    storage: {
      from: () => ({
        upload: async (path: string, body: Buffer) => (files.set(path, body), { data: { path }, error: null }),
        download: async (path: string) => {
          const f = files.get(path);
          return f ? { data: new Blob([new Uint8Array(f)]), error: null } : { data: null, error: { message: 'not found' } };
        },
        remove: async (paths: string[]) => (paths.forEach((p) => files.delete(p)), { data: null, error: null }),
      }),
    },
  };
  return { tables, files, client };
}
