/**
 * @jest-environment node
 *
 * WHY — the browser sends the first-touch UTM store (including gclid) with every enquiry; the
 * email is the only lead record, so Google's click id must be in it, or Google Ads leads cannot
 * be matched back to their ad click.
 */
const sent: Array<{ html: string; subject: string; to: string }> = [];
jest.mock('resend', () => ({
  Resend: class {
    emails = { send: async (m: { html: string; subject: string; to: string }) => { sent.push(m); return { error: null }; } };
  },
}));
jest.mock('@/lib/data/tours', () => ({ getTourBySlug: () => null }));

import { POST } from '@/app/api/tour-enquiry/route';

const base = { name: 'Test Person', email: 't@example.com', phone: '', tourName: 'Tour X', tourSlug: 'x', destination: 'china', tier: 'discovery', source: 'Tour Page Enquiry', message: 'hi' };
const call = (body: unknown) =>
  POST(new Request('http://x/api/tour-enquiry', { method: 'POST', body: JSON.stringify(body) }) as never);

beforeEach(() => { sent.length = 0; process.env.RESEND_API_KEY = 're_test'; });

describe('POST /api/tour-enquiry — Google click ID row', () => {
  it('adds a Google click ID row with the gclid the browser sent', async () => {
    const res = await call({ ...base, utm: { utm_source: 'google', utm_medium: 'cpc', gclid: 'Cj0KCQjw_abc-DEF' } });
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(1);
    expect(sent[0].html).toContain('Google click ID');
    expect(sent[0].html).toContain('Cj0KCQjw_abc-DEF');
  });

  it('puts the new row after every existing row and before the message, leaving existing labels in place', async () => {
    const res = await call({ ...base, utm: { utm_source: 'google', utm_medium: 'cpc', gclid: 'Cj0KCQjw_abc-DEF' } });
    expect(res.status).toBe(200);
    const html = sent[0].html;
    expect(html.indexOf('Submitted</td>')).toBeLessThan(html.indexOf('Google click ID'));
    expect(html.indexOf('Google click ID')).toBeLessThan(html.indexOf('Message</strong>'));
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
      utm: { utm_source: 'google', utm_medium: 'cpc', gclid: 'Cj0KCQjw_abc-DEF' },
    });
    expect(res.status).toBe(200);
    const html = sent[0].html;
    expect(html.indexOf('Tour pages viewed')).toBeLessThan(html.indexOf('Google click ID'));
  });

  it('adds no row when there is no gclid (organic or Facebook visitors)', async () => {
    const res1 = await call(base);
    expect(res1.status).toBe(200);
    expect(sent[0].html).not.toContain('Google click ID');

    const res2 = await call({ ...base, utm: { utm_source: 'facebook', fbclid: 'IwAR2x_abc' } });
    expect(res2.status).toBe(200);
    expect(sent[1].html).not.toContain('Google click ID');
  });

  it('drops a malformed gclid instead of putting it in the email, and the enquiry still goes out', async () => {
    const res = await call({ ...base, utm: { utm_source: 'google', gclid: '<script>alert(1)</script>' } });
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(1);
    expect(sent[0].html).not.toContain('<script>');
    expect(sent[0].html).not.toContain('Google click ID');
  });

  it('ignores a non-string gclid', async () => {
    const res = await call({ ...base, utm: { utm_source: 'google', gclid: 12345 } });
    expect(res.status).toBe(200);
    expect(sent[0].html).not.toContain('Google click ID');
  });

  it('keeps both click ids when the browser sent both', async () => {
    const res = await call({ ...base, utm: { utm_source: 'facebook', fbclid: 'IwAR2x_abc', gclid: 'Cj0KCQjw_abc' } });
    expect(res.status).toBe(200);
    const html = sent[0].html;
    expect(html).toContain('Facebook click ID');
    expect(html).toContain('IwAR2x_abc');
    expect(html).toContain('Google click ID');
    expect(html).toContain('Cj0KCQjw_abc');
    expect(html.indexOf('Facebook click ID')).toBeLessThan(html.indexOf('Google click ID'));
    expect(html.indexOf('Google click ID')).toBeLessThan(html.indexOf('Message</strong>'));
  });

  it('a gclid alone adds no Facebook row, and an fbclid alone adds no Google row', async () => {
    const res1 = await call({ ...base, utm: { utm_source: 'google', gclid: 'Cj0KCQjw_abc' } });
    expect(res1.status).toBe(200);
    expect(sent[0].html).toContain('Google click ID');
    expect(sent[0].html).not.toContain('Facebook click ID');

    const res2 = await call({ ...base, utm: { utm_source: 'facebook', fbclid: 'IwAR2x_abc' } });
    expect(res2.status).toBe(200);
    expect(sent[1].html).toContain('Facebook click ID');
    expect(sent[1].html).not.toContain('Google click ID');
  });
});
