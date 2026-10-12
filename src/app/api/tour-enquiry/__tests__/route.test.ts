/** @jest-environment node */
const sent: Array<{ html: string; subject: string; to: string }> = [];
jest.mock('resend', () => ({
  Resend: class {
    emails = { send: async (m: { html: string; subject: string; to: string }) => { sent.push(m); return { error: null }; } };
  },
}));
jest.mock('@/lib/data/tours', () => ({ getTourBySlug: () => null }));

import { POST } from '../route';

const base = { name: 'Test Person', email: 't@example.com', phone: '', tourName: 'Tour X', tourSlug: 'x', destination: 'china', tier: 'discovery', source: 'Tour Page Enquiry', message: 'hi' };
const call = (body: unknown) =>
  POST(new Request('http://x/api/tour-enquiry', { method: 'POST', body: JSON.stringify(body) }) as never);

beforeEach(() => { sent.length = 0; process.env.RESEND_API_KEY = 're_test'; });

describe('POST /api/tour-enquiry — attribution rows', () => {
  it('unchanged email when no attribution is sent (older cached pages still work)', async () => {
    const res = await call(base);
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(1);
    expect(sent[0].subject).toBe('Tour enquiry: Tour X — Test Person');
    expect(sent[0].html).not.toContain('First landing page');
    expect(sent[0].html).toContain('Ad source');
  });

  it('adds first landing page / submit page / tour pages viewed AFTER the existing rows', async () => {
    const res = await call({ ...base, attribution: { first_landing_path: '/beijing-travel-guide', submit_path: '/tours/china/discovery/x', referrer_host: 'www.google.com', viewed_tour_paths: ['/tours/china/discovery/x'] } });
    expect(res.status).toBe(200);
    const html = sent[0].html;
    expect(html).toContain('First landing page');
    expect(html).toContain('/beijing-travel-guide');
    expect(html.indexOf('Submitted</td>')).toBeLessThan(html.indexOf('First landing page'));
  });

  it('malicious or malformed attribution can neither break nor inject into the email — the enquiry still goes out', async () => {
    const res = await call({ ...base, attribution: { first_landing_path: '/<script>alert(1)</script>', submit_path: 5, viewed_tour_paths: 'nope' } });
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(1);
    expect(sent[0].html).not.toContain('<script>');
  });
});
