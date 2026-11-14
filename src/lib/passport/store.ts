/**
 * Server-only data access for the passport system. Every function that
 * reveals, changes or exports passport data writes an audit entry.
 * Never import from a client component.
 */
import { randomUUID } from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { decryptBytes, decryptText, encryptBytes, encryptText, lastFour, maskPassportNumber, newLinkToken, hashLinkToken, passportLookup, normalisePassportNumber } from './crypto';
import { tryParseTd3 } from './mrz';
import { computeWarnings, imageDeleteAfter, mergeReading, validateForSave, type AiReading, type PassportFields, type Warning } from './record';
import { isAiReadConfigured, readPassportImage, PassportReadError, ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES, type PassportImageMime } from './ai-read';
import type { ExportRow } from './export-csv';

const BUCKET = 'passport-images';
export const LINK_VALID_DAYS = 14;
export const MAX_CUSTOMER_ATTEMPTS = 5;

export class PassportInputError extends Error {}

type ActorType = 'staff' | 'customer' | 'system';

// ---------------------------------------------------------------------------
// Row shapes (mirror supabase/migrations/20261115_passport_system.sql)
// ---------------------------------------------------------------------------
export interface DepartureRow {
  id: string;
  tour_name: string;
  departure_date: string;
  return_date: string;
  notes: string | null;
  created_by: string;
  created_at: string;
}

interface TravellerRow {
  id: string;
  passport_number_enc: string;
  passport_last4: string;
  surname: string;
  given_names: string;
  chinese_name: string | null;
  sex: string | null;
  date_of_birth: string;
  nationality: string | null;
  issuing_state: string | null;
  issue_date: string | null;
  expiry_date: string;
  place_of_issue: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  agent_name: string | null;
  confirmed_by: string;
  confirmed_at: string;
}

interface LinkRow {
  id: string;
  departure_id: string;
  traveller_label: string;
  email: string | null;
  order_ref: string | null;
  expires_at: string;
  revoked_at: string | null;
  submitted_at: string | null;
  scan_attempts: number;
  reminder_count: number;
  last_reminded_at: string | null;
  created_at: string;
}

interface ScanRow {
  id: string;
  source: 'staff' | 'customer';
  uploaded_by: string;
  upload_link_id: string | null;
  departure_id: string | null;
  order_ref: string | null;
  status: 'awaiting_customer' | 'pending_review' | 'confirmed' | 'rejected';
  image_path: string | null;
  image_mime: string | null;
  image_delete_after: string;
  image_deleted_at: string | null;
  extraction_enc: string | null;
  mrz_valid: boolean;
  warning_codes: string[];
  display_name: string | null;
  traveller_id: string | null;
  created_at: string;
}

/** What is kept (encrypted) about a scan until its photo is deleted. */
export interface Extraction {
  reading: AiReading | null;
  aiError: string | null;
  fields: PassportFields;
  customerConfirmed: boolean;
}

// Public shapes returned to pages
export interface TravellerSummary {
  id: string;
  surname: string;
  givenNames: string;
  chineseName: string | null;
  sex: string | null;
  dateOfBirth: string;
  nationality: string | null;
  maskedNumber: string;
  issueDate: string | null;
  expiryDate: string;
  placeOfIssue: string | null;
  contactEmail: string | null;
  agentName: string | null;
  confirmedBy: string;
  confirmedAt: string;
}

function db() {
  return getSupabaseAdmin();
}

function fail(context: string, error: { message: string } | null): never {
  throw new Error(`[passport] ${context}: ${error?.message ?? 'unknown error'}`);
}

function summary(r: TravellerRow): TravellerSummary {
  return {
    id: r.id,
    surname: r.surname,
    givenNames: r.given_names,
    chineseName: r.chinese_name,
    sex: r.sex,
    dateOfBirth: r.date_of_birth,
    nationality: r.nationality,
    maskedNumber: maskPassportNumber(r.passport_last4),
    issueDate: r.issue_date,
    expiryDate: r.expiry_date,
    placeOfIssue: r.place_of_issue,
    contactEmail: r.contact_email,
    agentName: r.agent_name,
    confirmedBy: r.confirmed_by,
    confirmedAt: r.confirmed_at,
  };
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------
export interface AuditEntry {
  actor: string;
  actorType: ActorType;
  action: string;
  travellerId?: string | null;
  scanId?: string | null;
  departureId?: string | null;
  linkId?: string | null;
  detail?: Record<string, unknown>;
}

/** Audit writes are not optional: if the log cannot be written, the action fails. */
export async function audit(e: AuditEntry): Promise<void> {
  const { error } = await db()
    .from('passport_audit_log')
    .insert({
      actor: e.actor,
      actor_type: e.actorType,
      action: e.action,
      traveller_id: e.travellerId ?? null,
      scan_id: e.scanId ?? null,
      departure_id: e.departureId ?? null,
      link_id: e.linkId ?? null,
      detail: e.detail ?? {},
    });
  if (error) fail('audit', error);
}

export interface AuditView {
  at: string;
  actor: string;
  actorType: string;
  action: string;
  travellerId: string | null;
  scanId: string | null;
  departureId: string | null;
  detail: Record<string, unknown>;
}

export async function listAudit(limit = 200): Promise<AuditView[]> {
  const { data, error } = await db()
    .from('passport_audit_log')
    .select('at, actor, actor_type, action, traveller_id, scan_id, departure_id, detail')
    .order('at', { ascending: false })
    .limit(limit);
  if (error) fail('listAudit', error);
  return (data ?? []).map((r) => ({
    at: r.at as string,
    actor: r.actor as string,
    actorType: r.actor_type as string,
    action: r.action as string,
    travellerId: (r.traveller_id as string | null) ?? null,
    scanId: (r.scan_id as string | null) ?? null,
    departureId: (r.departure_id as string | null) ?? null,
    detail: (r.detail as Record<string, unknown>) ?? {},
  }));
}

// ---------------------------------------------------------------------------
// Departures
// ---------------------------------------------------------------------------
export async function getDepartureRow(id: string): Promise<DepartureRow | null> {
  const { data, error } = await db().from('passport_departures').select('*').eq('id', id).maybeSingle();
  if (error) fail('getDeparture', error);
  return (data as DepartureRow | null) ?? null;
}

export interface DepartureListItem extends DepartureRow {
  travellerCount: number;
  linkCount: number;
  submittedCount: number;
}

export async function listDepartures(): Promise<DepartureListItem[]> {
  const { data, error } = await db().from('passport_departures').select('*').order('departure_date', { ascending: true });
  if (error) fail('listDepartures', error);
  const rows = (data ?? []) as DepartureRow[];
  if (rows.length === 0) return [];
  const ids = rows.map((r) => r.id);
  const [{ data: links, error: le }, { data: members, error: me }] = await Promise.all([
    db().from('passport_upload_links').select('departure_id, submitted_at, revoked_at').in('departure_id', ids),
    db().from('passport_departure_travellers').select('departure_id').in('departure_id', ids),
  ]);
  if (le) fail('listDepartures.links', le);
  if (me) fail('listDepartures.members', me);
  return rows.map((r) => {
    const own = (links ?? []).filter((l) => l.departure_id === r.id && !l.revoked_at);
    return {
      ...r,
      travellerCount: (members ?? []).filter((m) => m.departure_id === r.id).length,
      linkCount: own.length,
      submittedCount: own.filter((l) => l.submitted_at).length,
    };
  });
}

export async function createDeparture(input: { tourName: string; departureDate: string; returnDate: string; notes?: string }, staff: string): Promise<DepartureRow> {
  if (!input.tourName.trim()) throw new PassportInputError('团名不能为空');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.departureDate) || !/^\d{4}-\d{2}-\d{2}$/.test(input.returnDate)) {
    throw new PassportInputError('出发日和回程日要填 yyyy-mm-dd');
  }
  if (input.returnDate < input.departureDate) throw new PassportInputError('回程日不能早于出发日');
  const { data, error } = await db()
    .from('passport_departures')
    .insert({
      tour_name: input.tourName.trim(),
      departure_date: input.departureDate,
      return_date: input.returnDate,
      notes: input.notes?.trim() || null,
      created_by: staff,
    })
    .select('*')
    .single();
  if (error) fail('createDeparture', error);
  const row = data as DepartureRow;
  await audit({ actor: staff, actorType: 'staff', action: 'departure_create', departureId: row.id, detail: { tourName: row.tour_name } });
  return row;
}

export interface LinkView {
  id: string;
  travellerLabel: string;
  email: string | null;
  orderRef: string | null;
  expiresAt: string;
  status: 'waiting' | 'submitted' | 'expired' | 'revoked';
  reminderCount: number;
  lastRemindedAt: string | null;
  scanAttempts: number;
}

function linkStatus(l: LinkRow, now: Date): LinkView['status'] {
  if (l.revoked_at) return 'revoked';
  if (l.submitted_at) return 'submitted';
  if (new Date(l.expires_at).getTime() < now.getTime()) return 'expired';
  return 'waiting';
}

export interface DepartureDetail {
  departure: DepartureRow;
  travellers: (TravellerSummary & { orderRef: string | null })[];
  links: LinkView[];
}

export async function getDepartureDetail(id: string, staff: string): Promise<DepartureDetail | null> {
  const departure = await getDepartureRow(id);
  if (!departure) return null;
  const [{ data: members, error: me }, { data: links, error: le }] = await Promise.all([
    db().from('passport_departure_travellers').select('traveller_id, order_ref').eq('departure_id', id),
    db().from('passport_upload_links').select('*').eq('departure_id', id).order('created_at', { ascending: true }),
  ]);
  if (me) fail('departureDetail.members', me);
  if (le) fail('departureDetail.links', le);
  const travellerIds = (members ?? []).map((m) => m.traveller_id as string);
  let travellers: DepartureDetail['travellers'] = [];
  if (travellerIds.length) {
    const { data, error } = await db().from('passport_travellers').select('*').in('id', travellerIds);
    if (error) fail('departureDetail.travellers', error);
    travellers = ((data ?? []) as TravellerRow[]).map((t) => ({
      ...summary(t),
      orderRef: ((members ?? []).find((m) => m.traveller_id === t.id)?.order_ref as string | null) ?? null,
    }));
  }
  const now = new Date();
  await audit({ actor: staff, actorType: 'staff', action: 'departure_view', departureId: id, detail: { travellers: travellers.length } });
  return {
    departure,
    travellers,
    links: ((links ?? []) as LinkRow[]).map((l) => ({
      id: l.id,
      travellerLabel: l.traveller_label,
      email: l.email,
      orderRef: l.order_ref,
      expiresAt: l.expires_at,
      status: linkStatus(l, now),
      reminderCount: l.reminder_count,
      lastRemindedAt: l.last_reminded_at,
      scanAttempts: l.scan_attempts,
    })),
  };
}

// ---------------------------------------------------------------------------
// Upload links (customer self-upload)
// ---------------------------------------------------------------------------
function expiry(now: Date): string {
  return new Date(now.getTime() + LINK_VALID_DAYS * 24 * 3600 * 1000).toISOString();
}

export async function createLink(
  departureId: string,
  input: { travellerLabel: string; email?: string; orderRef?: string },
  staff: string
): Promise<{ linkId: string; token: string; expiresAt: string }> {
  if (!input.travellerLabel.trim()) throw new PassportInputError('客人姓名不能为空');
  const email = input.email?.trim() || null;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new PassportInputError('邮箱格式不对');
  const { token, hash } = newLinkToken();
  const expiresAt = expiry(new Date());
  const { data, error } = await db()
    .from('passport_upload_links')
    .insert({
      departure_id: departureId,
      traveller_label: input.travellerLabel.trim(),
      email,
      order_ref: input.orderRef?.trim() || null,
      token_hash: hash,
      expires_at: expiresAt,
      scan_attempts: 0,
      reminder_count: 0,
      created_by: staff,
    })
    .select('id')
    .single();
  if (error) fail('createLink', error);
  const linkId = data.id as string;
  await audit({ actor: staff, actorType: 'staff', action: 'link_create', departureId, linkId, detail: { label: input.travellerLabel.trim() } });
  return { linkId, token, expiresAt };
}

/**
 * Reminders issue a fresh token (the old link stops working) because only the
 * hash of a token is ever stored — we cannot re-send the original.
 */
export async function reissueLink(linkId: string, staff: string): Promise<{ token: string; link: LinkRow; departure: DepartureRow }> {
  const { data, error } = await db().from('passport_upload_links').select('*').eq('id', linkId).maybeSingle();
  if (error) fail('reissueLink.get', error);
  const link = data as LinkRow | null;
  if (!link) throw new PassportInputError('链接不存在');
  if (link.submitted_at) throw new PassportInputError('客人已经提交过了，不用再提醒');
  if (link.revoked_at) throw new PassportInputError('链接已作废');
  const departure = await getDepartureRow(link.departure_id);
  if (!departure) throw new PassportInputError('团期不存在');
  const { token, hash } = newLinkToken();
  const now = new Date();
  const { error: ue } = await db()
    .from('passport_upload_links')
    .update({ token_hash: hash, expires_at: expiry(now), reminder_count: link.reminder_count + 1, last_reminded_at: now.toISOString() })
    .eq('id', linkId);
  if (ue) fail('reissueLink.update', ue);
  await audit({ actor: staff, actorType: 'staff', action: 'link_remind', departureId: link.departure_id, linkId });
  return { token, link, departure };
}

export async function revokeLink(linkId: string, staff: string): Promise<void> {
  const { data, error } = await db().from('passport_upload_links').update({ revoked_at: new Date().toISOString() }).eq('id', linkId).select('departure_id').single();
  if (error) fail('revokeLink', error);
  await audit({ actor: staff, actorType: 'staff', action: 'link_revoke', departureId: data.departure_id as string, linkId });
}

export interface CustomerLink {
  id: string;
  travellerLabel: string;
  orderRef: string | null;
  tourName: string;
  departureDate: string;
  returnDate: string;
  departureId: string;
  attemptsLeft: number;
}

/** Valid = exists, not expired, not revoked, not yet submitted. */
export async function findOpenLink(token: string): Promise<CustomerLink | null> {
  if (!/^[A-Za-z0-9_-]{40,60}$/.test(token)) return null;
  const { data, error } = await db().from('passport_upload_links').select('*').eq('token_hash', hashLinkToken(token)).maybeSingle();
  if (error) fail('findOpenLink', error);
  const link = data as LinkRow | null;
  if (!link || linkStatus(link, new Date()) !== 'waiting') return null;
  const departure = await getDepartureRow(link.departure_id);
  if (!departure) return null;
  return {
    id: link.id,
    travellerLabel: link.traveller_label,
    orderRef: link.order_ref,
    tourName: departure.tour_name,
    departureDate: departure.departure_date,
    returnDate: departure.return_date,
    departureId: departure.id,
    attemptsLeft: Math.max(0, MAX_CUSTOMER_ATTEMPTS - link.scan_attempts),
  };
}

// ---------------------------------------------------------------------------
// Scans
// ---------------------------------------------------------------------------
export interface UploadInput {
  bytes: Buffer;
  mime: string;
  source: 'staff' | 'customer';
  uploadedBy: string;
  linkId?: string | null;
  departureId?: string | null;
  orderRef?: string | null;
}

export interface ScanResult {
  scanId: string;
  fields: PassportFields;
  warnings: Warning[];
  mrzValid: boolean;
  aiUsed: boolean;
  aiError: string | null;
  notes: string;
}

function isAcceptedMime(m: string): m is PassportImageMime {
  return (ACCEPTED_IMAGE_TYPES as string[]).includes(m);
}

export async function processUpload(input: UploadInput): Promise<ScanResult> {
  if (!isAcceptedMime(input.mime)) throw new PassportInputError('只支持 JPG / PNG / WebP 图片。');
  if (input.bytes.length === 0) throw new PassportInputError('图片是空的。');
  if (input.bytes.length > MAX_IMAGE_BYTES) throw new PassportInputError('图片太大（上限 8 MB）。');

  const departure = input.departureId ? await getDepartureRow(input.departureId) : null;
  let orderName: string | null = null;
  if (input.linkId) {
    const { data } = await db().from('passport_upload_links').select('traveller_label').eq('id', input.linkId).maybeSingle();
    orderName = (data?.traveller_label as string | undefined) ?? null;
  }

  let reading: AiReading | null = null;
  let aiError: string | null = null;
  let usage: { inputTokens: number; outputTokens: number } | null = null;
  if (isAiReadConfigured()) {
    try {
      const r = await readPassportImage(input.bytes, input.mime);
      if (!r.isPassport) aiError = 'AI 认为这不是护照资料页。';
      reading = r.reading;
      usage = r.usage;
    } catch (e) {
      if (!(e instanceof PassportReadError)) console.error('[passport] AI read failed:', e instanceof Error ? e.message : 'unknown');
      aiError = e instanceof PassportReadError ? e.message : 'AI 读取失败，请人工录入。';
    }
  } else {
    aiError = 'AI 读取未开启，请对照照片人工录入或粘贴机器码。';
  }

  const mrz = tryParseTd3(reading?.mrzText);
  const fields = mergeReading(mrz, reading);
  const warnings = computeWarnings(fields, { mrz, ai: reading, orderName, departureDate: departure?.departure_date ?? null, today: new Date() });

  const scanId = randomUUID();
  const imagePath = `scans/${scanId}.bin`;
  const { error: se } = await db().storage.from(BUCKET).upload(imagePath, encryptBytes(input.bytes), {
    contentType: 'application/octet-stream',
    upsert: false,
  });
  if (se) fail('upload image', se);

  const extraction: Extraction = { reading, aiError, fields, customerConfirmed: false };
  const { error } = await db()
    .from('passport_scans')
    .insert({
      id: scanId,
      source: input.source,
      uploaded_by: input.uploadedBy,
      upload_link_id: input.linkId ?? null,
      departure_id: departure?.id ?? null,
      order_ref: input.orderRef ?? null,
      status: input.source === 'customer' ? 'awaiting_customer' : 'pending_review',
      image_path: imagePath,
      image_mime: input.mime,
      image_delete_after: imageDeleteAfter(departure?.return_date ?? null, new Date()),
      extraction_enc: encryptText(JSON.stringify(extraction)),
      mrz_valid: mrz?.valid ?? false,
      warning_codes: warnings.map((w) => w.code),
      display_name: [fields.surname, fields.givenNames].filter(Boolean).join(' ') || null,
      ai_input_tokens: usage?.inputTokens ?? null,
      ai_output_tokens: usage?.outputTokens ?? null,
    });
  if (error) {
    await db().storage.from(BUCKET).remove([imagePath]);
    fail('insert scan', error);
  }

  await audit({
    actor: input.uploadedBy,
    actorType: input.source,
    action: 'scan_upload',
    scanId,
    linkId: input.linkId ?? null,
    departureId: departure?.id ?? null,
    detail: { mrzValid: mrz?.valid ?? false, aiUsed: Boolean(reading), warnings: warnings.map((w) => w.code) },
  });

  return { scanId, fields, warnings, mrzValid: mrz?.valid ?? false, aiUsed: Boolean(reading), aiError, notes: reading?.notes ?? '' };
}

export interface QueueItem {
  id: string;
  source: 'staff' | 'customer';
  uploadedBy: string;
  displayName: string | null;
  mrzValid: boolean;
  warningCodes: string[];
  departureId: string | null;
  createdAt: string;
}

export async function listReviewQueue(): Promise<QueueItem[]> {
  const { data, error } = await db()
    .from('passport_scans')
    .select('id, source, uploaded_by, display_name, mrz_valid, warning_codes, departure_id, created_at')
    .eq('status', 'pending_review')
    .order('created_at', { ascending: true })
    .limit(200);
  if (error) fail('listReviewQueue', error);
  return (data ?? []).map((r) => ({
    id: r.id as string,
    source: r.source as 'staff' | 'customer',
    uploadedBy: r.uploaded_by as string,
    displayName: (r.display_name as string | null) ?? null,
    mrzValid: r.mrz_valid as boolean,
    warningCodes: (r.warning_codes as string[]) ?? [],
    departureId: (r.departure_id as string | null) ?? null,
    createdAt: r.created_at as string,
  }));
}

async function getScanRow(id: string): Promise<ScanRow | null> {
  const { data, error } = await db().from('passport_scans').select('*').eq('id', id).maybeSingle();
  if (error) fail('getScan', error);
  return (data as ScanRow | null) ?? null;
}

export interface ScanDetail {
  id: string;
  source: 'staff' | 'customer';
  status: ScanRow['status'];
  uploadedBy: string;
  createdAt: string;
  departureId: string | null;
  orderRef: string | null;
  orderName: string | null;
  hasImage: boolean;
  imageDeleteAfter: string;
  extraction: Extraction | null;
  mrzText: string | null;
}

/** Opening a scan for review shows the passport number in full — logged. */
export async function getScanForReview(id: string, staff: string): Promise<ScanDetail | null> {
  const row = await getScanRow(id);
  if (!row) return null;
  let orderName: string | null = null;
  if (row.upload_link_id) {
    const { data } = await db().from('passport_upload_links').select('traveller_label').eq('id', row.upload_link_id).maybeSingle();
    orderName = (data?.traveller_label as string | undefined) ?? null;
  }
  const extraction = row.extraction_enc ? (JSON.parse(decryptText(row.extraction_enc)) as Extraction) : null;
  await audit({ actor: staff, actorType: 'staff', action: 'scan_view', scanId: id, travellerId: row.traveller_id });
  return {
    id: row.id,
    source: row.source,
    status: row.status,
    uploadedBy: row.uploaded_by,
    createdAt: row.created_at,
    departureId: row.departure_id,
    orderRef: row.order_ref,
    orderName,
    hasImage: Boolean(row.image_path && !row.image_deleted_at),
    imageDeleteAfter: row.image_delete_after,
    extraction,
    mrzText: extraction?.reading?.mrzText ?? null,
  };
}

/** Decrypted photo bytes for the review screen (staff) — logged. */
export async function getScanImage(id: string, actor: { name: string; type: ActorType }): Promise<{ bytes: Buffer; mime: string } | null> {
  const row = await getScanRow(id);
  if (!row || !row.image_path || row.image_deleted_at) return null;
  const { data, error } = await db().storage.from(BUCKET).download(row.image_path);
  if (error || !data) fail('download image', error);
  const bytes = decryptBytes(Buffer.from(await data.arrayBuffer()));
  await audit({ actor: actor.name, actorType: actor.type, action: 'image_view', scanId: id, travellerId: row.traveller_id });
  return { bytes, mime: row.image_mime ?? 'image/jpeg' };
}

/** Customer checks and corrects what was read, then hands it to CTS staff. */
export async function customerConfirmScan(linkId: string, scanId: string, fields: PassportFields): Promise<void> {
  const row = await getScanRow(scanId);
  if (!row || row.upload_link_id !== linkId || row.status !== 'awaiting_customer') throw new PassportInputError('This upload can no longer be changed.');
  const errors = validateForSave(fields);
  if (errors.length) throw new PassportInputError('Please complete the required fields.');
  const previous = row.extraction_enc ? (JSON.parse(decryptText(row.extraction_enc)) as Extraction) : null;
  const extraction: Extraction = { reading: previous?.reading ?? null, aiError: previous?.aiError ?? null, fields, customerConfirmed: true };
  const now = new Date().toISOString();
  const { error } = await db()
    .from('passport_scans')
    .update({
      status: 'pending_review',
      extraction_enc: encryptText(JSON.stringify(extraction)),
      display_name: [fields.surname, fields.givenNames].filter(Boolean).join(' ') || null,
    })
    .eq('id', scanId);
  if (error) fail('customerConfirm', error);
  // Any other unconfirmed photos from this link are discarded.
  const { error: le } = await db().from('passport_upload_links').update({ submitted_at: now }).eq('id', linkId);
  if (le) fail('customerConfirm.link', le);
  await audit({ actor: row.uploaded_by, actorType: 'customer', action: 'customer_submit', scanId, linkId, departureId: row.departure_id });
}

export async function recordCustomerAttempt(linkId: string): Promise<boolean> {
  const { data, error } = await db().from('passport_upload_links').select('scan_attempts').eq('id', linkId).single();
  if (error) fail('attempt.get', error);
  const attempts = data.scan_attempts as number;
  if (attempts >= MAX_CUSTOMER_ATTEMPTS) return false;
  const { error: ue } = await db().from('passport_upload_links').update({ scan_attempts: attempts + 1 }).eq('id', linkId).eq('scan_attempts', attempts);
  if (ue) fail('attempt.update', ue);
  return true;
}

export interface ConfirmInput {
  fields: PassportFields;
  departureId?: string | null;
  orderRef?: string | null;
  agentName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
}

/**
 * Staff confirm a scan → the traveller profile. Same passport number + DOB
 * merges into the existing profile (latest confirmed values win).
 */
export async function confirmScan(scanId: string, input: ConfirmInput, staff: string): Promise<{ travellerId: string; merged: boolean }> {
  const row = await getScanRow(scanId);
  if (!row) throw new PassportInputError('找不到这条上传记录');
  if (row.status === 'confirmed') throw new PassportInputError('这条已经确认过了');
  const f = input.fields;
  const errors = validateForSave(f);
  if (errors.length) throw new PassportInputError(errors.join('；'));

  const number = normalisePassportNumber(f.passportNumber);
  const lookup = passportLookup(number);
  const { data: existing, error: ee } = await db()
    .from('passport_travellers')
    .select('id')
    .eq('passport_number_lookup', lookup)
    .eq('date_of_birth', f.dateOfBirth)
    .maybeSingle();
  if (ee) fail('confirm.lookup', ee);

  const now = new Date().toISOString();
  const values = {
    passport_number_lookup: lookup,
    date_of_birth: f.dateOfBirth,
    passport_number_enc: encryptText(number),
    passport_last4: lastFour(number),
    surname: f.surname.trim().toUpperCase(),
    given_names: f.givenNames.trim().toUpperCase(),
    chinese_name: f.chineseName.trim() || null,
    sex: f.sex || null,
    nationality: f.nationality.trim().toUpperCase() || null,
    issuing_state: f.issuingState.trim().toUpperCase() || null,
    issue_date: f.issueDate || null,
    expiry_date: f.expiryDate,
    place_of_issue: f.placeOfIssue.trim() || null,
    ...(input.contactEmail?.trim() ? { contact_email: input.contactEmail.trim() } : {}),
    ...(input.contactPhone?.trim() ? { contact_phone: input.contactPhone.trim() } : {}),
    ...(input.agentName?.trim() ? { agent_name: input.agentName.trim() } : {}),
    confirmed_by: staff,
    confirmed_at: now,
    updated_at: now,
  };

  let travellerId: string;
  if (existing) {
    travellerId = existing.id as string;
    const { error } = await db().from('passport_travellers').update(values).eq('id', travellerId);
    if (error) fail('confirm.update', error);
  } else {
    const { data, error } = await db().from('passport_travellers').insert(values).select('id').single();
    if (error) fail('confirm.insert', error);
    travellerId = data.id as string;
  }

  const departureId = input.departureId || row.departure_id;
  let deleteAfter = row.image_delete_after;
  if (departureId) {
    const departure = await getDepartureRow(departureId);
    if (!departure) throw new PassportInputError('团期不存在');
    const { error } = await db()
      .from('passport_departure_travellers')
      .upsert(
        { departure_id: departureId, traveller_id: travellerId, order_ref: input.orderRef?.trim() || row.order_ref, added_by: staff },
        { onConflict: 'departure_id,traveller_id' }
      );
    if (error) fail('confirm.link', error);
    const candidate = imageDeleteAfter(departure.return_date, new Date(row.created_at));
    if (candidate > deleteAfter) deleteAfter = candidate;
  }

  const { error: se } = await db()
    .from('passport_scans')
    .update({ status: 'confirmed', traveller_id: travellerId, departure_id: departureId ?? null, confirmed_by: staff, confirmed_at: now, image_delete_after: deleteAfter })
    .eq('id', scanId);
  if (se) fail('confirm.scan', se);

  await audit({ actor: staff, actorType: 'staff', action: existing ? 'traveller_merge' : 'traveller_create', scanId, travellerId, departureId: departureId ?? null });
  return { travellerId, merged: Boolean(existing) };
}

export async function rejectScan(scanId: string, reason: string, staff: string): Promise<void> {
  const { error } = await db().from('passport_scans').update({ status: 'rejected' }).eq('id', scanId);
  if (error) fail('rejectScan', error);
  await audit({ actor: staff, actorType: 'staff', action: 'scan_reject', scanId, detail: { reason: reason.slice(0, 200) } });
}

// ---------------------------------------------------------------------------
// Travellers
// ---------------------------------------------------------------------------
export async function searchTravellers(q: string, staff: string): Promise<TravellerSummary[]> {
  let query = db().from('passport_travellers').select('*').order('updated_at', { ascending: false }).limit(100);
  const term = q.trim();
  if (term) {
    const safe = term.replace(/[%_,()]/g, ' ');
    query = query.or(`surname.ilike.%${safe}%,given_names.ilike.%${safe}%,chinese_name.ilike.%${safe}%,passport_last4.ilike.%${safe}%`);
  }
  const { data, error } = await query;
  if (error) fail('searchTravellers', error);
  await audit({ actor: staff, actorType: 'staff', action: 'traveller_search', detail: { q: term.slice(0, 40), results: (data ?? []).length } });
  return ((data ?? []) as TravellerRow[]).map(summary);
}

/** "查看完整": full number, always logged. */
export async function revealPassportNumber(travellerId: string, staff: string): Promise<string | null> {
  const { data, error } = await db().from('passport_travellers').select('passport_number_enc').eq('id', travellerId).maybeSingle();
  if (error) fail('reveal', error);
  if (!data) return null;
  await audit({ actor: staff, actorType: 'staff', action: 'number_reveal', travellerId });
  return decryptText(data.passport_number_enc as string);
}

export interface ExpiryItem extends TravellerSummary {
  departureDate: string | null;
  tourName: string | null;
}

/** Travellers on upcoming departures, plus everyone whose passport ends within 12 months. */
export async function listExpiryCandidates(staff: string, today: Date): Promise<ExpiryItem[]> {
  const iso = today.toISOString().slice(0, 10);
  const horizon = new Date(Date.UTC(today.getUTCFullYear() + 1, today.getUTCMonth(), today.getUTCDate())).toISOString().slice(0, 10);
  const [{ data: deps, error: de }, { data: soon, error: se }] = await Promise.all([
    db().from('passport_departures').select('id, tour_name, departure_date').gte('departure_date', iso),
    db().from('passport_travellers').select('*').lte('expiry_date', horizon),
  ]);
  if (de) fail('expiry.deps', de);
  if (se) fail('expiry.soon', se);
  const depRows = (deps ?? []) as Pick<DepartureRow, 'id' | 'tour_name' | 'departure_date'>[];
  const out = new Map<string, ExpiryItem>();
  if (depRows.length) {
    const { data: members, error: me } = await db().from('passport_departure_travellers').select('departure_id, traveller_id').in('departure_id', depRows.map((d) => d.id));
    if (me) fail('expiry.members', me);
    const ids = Array.from(new Set((members ?? []).map((m) => m.traveller_id as string)));
    if (ids.length) {
      const { data: trs, error: te } = await db().from('passport_travellers').select('*').in('id', ids);
      if (te) fail('expiry.travellers', te);
      for (const t of (trs ?? []) as TravellerRow[]) {
        for (const m of (members ?? []).filter((x) => x.traveller_id === t.id)) {
          const d = depRows.find((x) => x.id === m.departure_id);
          if (d) out.set(`${t.id}:${d.id}`, { ...summary(t), departureDate: d.departure_date, tourName: d.tour_name });
        }
      }
    }
  }
  for (const t of (soon ?? []) as TravellerRow[]) {
    if (!Array.from(out.keys()).some((k) => k.startsWith(`${t.id}:`))) out.set(t.id, { ...summary(t), departureDate: null, tourName: null });
  }
  await audit({ actor: staff, actorType: 'staff', action: 'expiry_view', detail: { rows: out.size } });
  return Array.from(out.values());
}

export async function exportDepartureRows(departureId: string, staff: string): Promise<{ departure: DepartureRow; rows: ExportRow[] } | null> {
  const departure = await getDepartureRow(departureId);
  if (!departure) return null;
  const { data: members, error: me } = await db().from('passport_departure_travellers').select('traveller_id, order_ref').eq('departure_id', departureId);
  if (me) fail('export.members', me);
  const ids = (members ?? []).map((m) => m.traveller_id as string);
  let rows: ExportRow[] = [];
  if (ids.length) {
    const { data, error } = await db().from('passport_travellers').select('*').in('id', ids);
    if (error) fail('export.travellers', error);
    rows = ((data ?? []) as TravellerRow[]).map((t) => ({
      surname: t.surname,
      givenNames: t.given_names,
      chineseName: t.chinese_name,
      sex: t.sex,
      dateOfBirth: t.date_of_birth,
      nationality: t.nationality,
      passportNumber: decryptText(t.passport_number_enc),
      issueDate: t.issue_date,
      expiryDate: t.expiry_date,
      placeOfIssue: t.place_of_issue,
      orderRef: ((members ?? []).find((m) => m.traveller_id === t.id)?.order_ref as string | null) ?? null,
      agentName: t.agent_name,
    }));
  }
  await audit({ actor: staff, actorType: 'staff', action: 'departure_export', departureId, detail: { rows: rows.length } });
  return { departure, rows };
}

// ---------------------------------------------------------------------------
// Retention: delete photos 6 months after the tour returns
// ---------------------------------------------------------------------------
export async function purgeExpiredImages(today: Date, actor: string): Promise<number> {
  const iso = today.toISOString().slice(0, 10);
  const { data, error } = await db()
    .from('passport_scans')
    .select('id, image_path')
    .lte('image_delete_after', iso)
    .is('image_deleted_at', null)
    .limit(500);
  if (error) fail('purge.list', error);
  const rows = (data ?? []) as { id: string; image_path: string | null }[];
  if (rows.length === 0) return 0;
  const paths = rows.map((r) => r.image_path).filter((p): p is string => Boolean(p));
  if (paths.length) {
    const { error: re } = await db().storage.from(BUCKET).remove(paths);
    if (re) fail('purge.remove', re);
  }
  const { error: ue } = await db()
    .from('passport_scans')
    .update({ image_deleted_at: new Date().toISOString(), image_path: null, extraction_enc: null })
    .in('id', rows.map((r) => r.id));
  if (ue) fail('purge.update', ue);
  await audit({ actor, actorType: 'system', action: 'image_purge', detail: { count: rows.length } });
  return rows.length;
}
