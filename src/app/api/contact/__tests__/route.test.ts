/** @jest-environment node */
const sent: Array<{ html: string; subject: string }> = [];
jest.mock('resend', () => ({
  Resend: class {
    emails = { send: async (m: { html: string; subject: string }) => { sent.push(m); return { error: null }; } };
  },
}));

import { POST } from '../route';

const base = { name: 'Test Person', email: 't@example.com', phone: '', travel_interest: 'China tours', message: 'hello' };
const call = (body: unknown) =>
  POST(new Request('http://x/api/contact', { method: 'POST', body: JSON.stringify(body) }) as never);

beforeEach(() => { sent.length = 0; process.env.RESEND_API_KEY = 're_test'; });

describe('POST /api/contact — attribution rows', () => {
  it('unchanged email without attribution', async () => {
    expect((await call(base)).status).toBe(200);
    expect(sent[0].subject).toBe('Contact form: China tours — Test Person');
    expect(sent[0].html).not.toContain('First landing page');
  });
  it('adds the first-landing and submit pages', async () => {
    expect((await call({ ...base, attribution: { first_landing_path: '/china-visa-guide-for-new-zealanders', submit_path: '/contact', referrer_host: 'www.google.com', viewed_tour_paths: [] } })).status).toBe(200);
    expect(sent[0].html).toContain('/china-visa-guide-for-new-zealanders');
    expect(sent[0].html).toContain('Submitted from');
  });
  it('still rejects a request with missing required fields (validation untouched)', async () => {
    expect((await call({ name: 'x' })).status).toBe(400);
    expect(sent).toHaveLength(0);
  });
});
