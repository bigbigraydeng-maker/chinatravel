/**
 * @jest-environment node
 *
 * End-to-end business flow against an in-memory database (no AI key, so the
 * MRZ is entered by hand — the path CTS uses if AI is ever switched off).
 * Encodes the PM decisions: one profile per passport number + DOB, every view
 * logged, links single-use, photos deleted 6 months after the tour returns.
 */
import { randomBytes } from 'crypto';
import { createFakeSupabase, type FakeDb } from '../__fixtures__/fake-supabase';

let fake: FakeDb;
jest.mock('@/lib/supabase-admin', () => ({ getSupabaseAdmin: () => fake.client }));

import * as store from '../store';
import { decryptText } from '../crypto';
import { EMPTY_FIELDS, type PassportFields } from '../record';

const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3, 4]);
const FIELDS: PassportFields = {
  ...EMPTY_FIELDS,
  surname: 'SMITH',
  givenNames: 'JANE',
  sex: 'F',
  dateOfBirth: '1960-05-14',
  nationality: 'NZL',
  passportNumber: 'LA1234567',
  expiryDate: '2030-03-01',
};

beforeEach(() => {
  fake = createFakeSupabase();
  process.env.PASSPORT_ENCRYPTION_KEY = randomBytes(32).toString('base64');
  delete process.env.ANTHROPIC_API_KEY;
});

const actions = () => fake.tables.passport_audit_log.map((r) => r.action);

describe('staff upload → confirm', () => {
  it('stores the photo encrypted and never the plaintext number', async () => {
    const r = await store.processUpload({ bytes: JPEG, mime: 'image/jpeg', source: 'staff', uploadedBy: 'Lisa' });
    const stored = fake.files.get(`scans/${r.scanId}.bin`);
    expect(stored).toBeDefined();
    expect(stored?.includes(JPEG)).toBe(false);
    // No AI configured → staff are told to enter it by hand, and the MRZ is flagged unread.
    expect(r.aiUsed).toBe(false);
    expect(r.warnings.map((w) => w.code)).toContain('mrz_unreadable');

    await store.confirmScan(r.scanId, { fields: FIELDS }, 'Lisa');
    const traveller = fake.tables.passport_travellers[0];
    expect(JSON.stringify(traveller)).not.toContain('LA1234567');
    expect(decryptText(traveller.passport_number_enc as string)).toBe('LA1234567');
    expect(traveller.passport_last4).toBe('4567');
  });

  it('merges a second upload of the same passport into one profile', async () => {
    const a = await store.processUpload({ bytes: JPEG, mime: 'image/jpeg', source: 'staff', uploadedBy: 'Lisa' });
    const first = await store.confirmScan(a.scanId, { fields: FIELDS }, 'Lisa');
    const b = await store.processUpload({ bytes: JPEG, mime: 'image/jpeg', source: 'staff', uploadedBy: 'Tom' });
    const second = await store.confirmScan(b.scanId, { fields: { ...FIELDS, passportNumber: 'la 1234567', placeOfIssue: 'WELLINGTON' } }, 'Tom');
    expect(second.merged).toBe(true);
    expect(second.travellerId).toBe(first.travellerId);
    expect(fake.tables.passport_travellers).toHaveLength(1);
    expect(fake.tables.passport_travellers[0].place_of_issue).toBe('WELLINGTON');
    expect(actions()).toEqual(expect.arrayContaining(['traveller_create', 'traveller_merge']));
  });

  it('refuses to save without the required fields', async () => {
    const r = await store.processUpload({ bytes: JPEG, mime: 'image/jpeg', source: 'staff', uploadedBy: 'Lisa' });
    await expect(store.confirmScan(r.scanId, { fields: EMPTY_FIELDS }, 'Lisa')).rejects.toThrow(store.PassportInputError);
  });

  it('rejects non-image uploads', async () => {
    await expect(store.processUpload({ bytes: JPEG, mime: 'application/pdf', source: 'staff', uploadedBy: 'Lisa' })).rejects.toThrow(store.PassportInputError);
  });
});

describe('logging', () => {
  it('logs revealing the full number and viewing the photo', async () => {
    const r = await store.processUpload({ bytes: JPEG, mime: 'image/jpeg', source: 'staff', uploadedBy: 'Lisa' });
    const { travellerId } = await store.confirmScan(r.scanId, { fields: FIELDS }, 'Lisa');
    expect(await store.revealPassportNumber(travellerId, 'Tom')).toBe('LA1234567');
    const img = await store.getScanImage(r.scanId, { name: 'Tom', type: 'staff' });
    expect(img?.bytes.equals(JPEG)).toBe(true);
    const log = fake.tables.passport_audit_log;
    expect(log.find((e) => e.action === 'number_reveal')?.actor).toBe('Tom');
    expect(log.find((e) => e.action === 'image_view')?.actor).toBe('Tom');
  });
});

describe('departure, links and retention', () => {
  it('runs the customer self-upload flow once per link', async () => {
    const dep = await store.createDeparture({ tourName: 'China Discovery', departureDate: '2027-05-13', returnDate: '2027-05-28' }, 'Lisa');
    const link = await store.createLink(dep.id, { travellerLabel: 'Jane Smith', email: 'jane@example.com' }, 'Lisa');
    expect(fake.tables.passport_upload_links[0].token_hash).not.toBe(link.token);

    const open = await store.findOpenLink(link.token);
    expect(open?.tourName).toBe('China Discovery');
    expect(await store.recordCustomerAttempt(open!.id)).toBe(true);
    const scan = await store.processUpload({ bytes: JPEG, mime: 'image/jpeg', source: 'customer', uploadedBy: 'Jane Smith', linkId: open!.id, departureId: dep.id });
    await store.customerConfirmScan(open!.id, scan.scanId, FIELDS);

    // Single use: the link is closed once submitted.
    expect(await store.findOpenLink(link.token)).toBeNull();
    const queue = await store.listReviewQueue();
    expect(queue.map((q) => q.id)).toContain(scan.scanId);

    const detail = await store.getDepartureDetail(dep.id, 'Lisa');
    expect(detail?.links[0].status).toBe('submitted');

    // Staff confirm → photo is due for deletion 6 months after the tour returns.
    await store.confirmScan(scan.scanId, { fields: FIELDS }, 'Lisa');
    const row = fake.tables.passport_scans.find((s) => s.id === scan.scanId);
    expect(row?.image_delete_after).toBe('2027-11-28');

    expect(await store.purgeExpiredImages(new Date(Date.UTC(2027, 10, 27)), 'system')).toBe(0);
    expect(await store.purgeExpiredImages(new Date(Date.UTC(2027, 10, 28)), 'system')).toBe(1);
    expect(fake.files.has(`scans/${scan.scanId}.bin`)).toBe(false);
    // The confirmed text record stays.
    expect(fake.tables.passport_travellers).toHaveLength(1);
  });

  it('a reminder replaces the link so the old one stops working', async () => {
    const dep = await store.createDeparture({ tourName: 'China Discovery', departureDate: '2027-05-13', returnDate: '2027-05-28' }, 'Lisa');
    const link = await store.createLink(dep.id, { travellerLabel: 'Jane Smith' }, 'Lisa');
    const { token } = await store.reissueLink(link.linkId, 'Lisa');
    expect(await store.findOpenLink(link.token)).toBeNull();
    expect(await store.findOpenLink(token)).not.toBeNull();
  });

  it('stops a customer after the attempt limit', async () => {
    const dep = await store.createDeparture({ tourName: 'X', departureDate: '2027-05-13', returnDate: '2027-05-28' }, 'Lisa');
    const link = await store.createLink(dep.id, { travellerLabel: 'Jane Smith' }, 'Lisa');
    for (let i = 0; i < store.MAX_CUSTOMER_ATTEMPTS; i += 1) expect(await store.recordCustomerAttempt(link.linkId)).toBe(true);
    expect(await store.recordCustomerAttempt(link.linkId)).toBe(false);
  });

  it('exports full numbers for the departure and logs it', async () => {
    const dep = await store.createDeparture({ tourName: 'X', departureDate: '2027-05-13', returnDate: '2027-05-28' }, 'Lisa');
    const r = await store.processUpload({ bytes: JPEG, mime: 'image/jpeg', source: 'staff', uploadedBy: 'Lisa' });
    await store.confirmScan(r.scanId, { fields: FIELDS, departureId: dep.id, orderRef: 'B-1' }, 'Lisa');
    const out = await store.exportDepartureRows(dep.id, 'Ops');
    expect(out?.rows[0].passportNumber).toBe('LA1234567');
    expect(out?.rows[0].orderRef).toBe('B-1');
    expect(fake.tables.passport_audit_log.find((e) => e.action === 'departure_export')?.actor).toBe('Ops');
  });
});
