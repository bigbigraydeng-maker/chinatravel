/**
 * @jest-environment node
 *
 * WHY — the browser sends the first-touch UTM store (including fbclid) with every enquiry; the
 * email is the only lead record, so the click id must be in it.
 */
const sent: Array<{ html: string; subject: string; to: string }> = [];
jest.mock('resend', () => ({
  Resend: class {
    emails = { send: async (m: { html: string; subject: string; to: string }) => { sent.push(m); return { error: null }; } };
  },
}));
jest.mock('@/lib/data/published-tour-catalog', () => ({
  getPublishedTourBySlug: async () => ({ isActive: true, soldOut: false }),
}));

import { POST } from '@/app/api/tour-enquiry/route';

const base = { name: 'Test Person', email: 't@example.com', phone: '', tourName: 'Tour X', tourSlug: 'x', destination: 'china', tier: 'discovery', source: 'Tour Page Enquiry', message: 'hi' };
const call = (body: unknown) =>
  POST(new Request('http://x/api/tour-enquiry', { method: 'POST', body: JSON.stringify(body) }) as never);

beforeEach(() => { sent.length = 0; process.env.RESEND_API_KEY = 're_test'; });

describe('POST /api/tour-enquiry — Facebook click ID row', () => {
  it('adds a Facebook click ID row with the fbclid the browser sent', async () => {
    const res = await call({ ...base, utm: { utm_source: 'facebook', fbclid: 'IwAR2x_abc-DEF' } });
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(1);
    expect(sent[0].html).toContain('Facebook click ID');
    expect(sent[0].html).toContain('IwAR2x_abc-DEF');
  });

  it('puts the new row after every existing row and before the message, leaving existing labels in place', async () => {
    const res = await call({ ...base, utm: { utm_source: 'facebook', fbclid: 'IwAR2x_abc-DEF' } });
    expect(res.status).toBe(200);
    const html = sent[0].html;
    expect(html.indexOf('Submitted</td>')).toBeLessThan(html.indexOf('Facebook click ID'));
    expect(html.indexOf('Facebook click ID')).toBeLessThan(html.indexOf('Message</strong>'));
    for (const label of ['Name', 'Email', 'Phone', 'Tour', 'URL', 'Source', 'Ad source', 'Submitted']) {
      expect(html.includes(`bold;">${label}</td>`)).toBe(true);
    }
  });

  it('adds the row after the attribution rows when attribution is also sent', async () => {
    const res = await call({
      ...base,
      attribution: {
        first_landing_path: '/beijing-travel-guide',
        submit_path: '/tours/china/discovery/x',
        referrer_host: 'www.google.com',
        viewed_tour_paths: [],
      },
      utm: { utm_source: 'facebook', fbclid: 'IwAR2x_abc-DEF' },
    });
    expect(res.status).toBe(200);
    const html = sent[0].html;
    expect(html.indexOf('Tour pages viewed')).toBeLessThan(html.indexOf('Facebook click ID'));
  });

  it('adds no row when there is no fbclid (organic or Google visitors)', async () => {
    const res1 = await call(base);
    expect(res1.status).toBe(200);
    expect(sent[0].html).not.toContain('Facebook click ID');

    const res2 = await call({ ...base, utm: { utm_source: 'google' } });
    expect(res2.status).toBe(200);
    expect(sent[1].html).not.toContain('Facebook click ID');
  });

  it('drops a malformed fbclid instead of putting it in the email, and the enquiry still goes out', async () => {
    const res = await call({ ...base, utm: { utm_source: 'facebook', fbclid: '<script>alert(1)</script>' } });
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(1);
    expect(sent[0].html).not.toContain('<script>');
    expect(sent[0].html).not.toContain('Facebook click ID');
  });

  it('ignores a non-string fbclid', async () => {
    const res = await call({ ...base, utm: { utm_source: 'facebook', fbclid: 12345 } });
    expect(res.status).toBe(200);
    expect(sent[0].html).not.toContain('Facebook click ID');
  });
});
