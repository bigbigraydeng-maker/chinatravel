/** @jest-environment node */
// WHY: the tour enquiry form now asks when the visitor plans to travel (`travelWindow`) and their budget per
// person (`budgetBand`). They are required on the PAGE only; the API keeps them optional so a visitor whose page
// was loaded before the change can still submit (a 400 would lose that lead). A value that is not a known code
// (an option renamed or removed after the visitor's page loaded) is ignored for the same reason: the lead is kept
// and the email simply has no row for that answer. The notification email gets two extra rows at the END of its
// table, after every existing row, and shows human labels (never codes); the subject and every existing row stay
// byte-for-byte as before, because the CRM on the other side parses them.
const sent: Array<{ html: string; subject: string; to: string; replyTo?: string }> = [];
jest.mock('resend', () => ({
  Resend: class {
    emails = {
      send: async (m: { html: string; subject: string; to: string; replyTo?: string }) => {
        sent.push(m);
        return { error: null };
      },
    };
  },
}));
jest.mock('@/lib/data/tours', () => ({ getTourBySlug: () => null }));

import { POST } from '../route';
import goldenRaw from './fixtures/email-before-travel-fields.json';

/** The emails the route produced before these fields existed (the fixture has no replyTo for the phone-only case). */
const golden = goldenRaw as Record<'plain' | 'withAttribution' | 'phoneOnly', { subject: string; html: string; replyTo?: string }>;

const base = { name: 'Test Person', email: 't@example.com', phone: '', tourName: 'Tour X', tourSlug: 'x', destination: 'china', tier: 'discovery', source: 'Tour Page Enquiry', message: 'hi' };
const call = (body: unknown) =>
  POST(new Request('http://x/api/tour-enquiry', { method: 'POST', body: JSON.stringify(body) }) as never);

beforeEach(() => { sent.length = 0; process.env.RESEND_API_KEY = 're_test'; });

afterEach(() => { jest.useRealTimers(); });

const withAttribution = {
  ...base,
  utm: { utm_source: 'facebook', utm_campaign: 'oct', utm_content: 'c1', fbclid: 'IwAR_abc-1.2' },
  attribution: {
    first_landing_path: '/beijing-travel-guide',
    submit_path: '/tours/china/discovery/x',
    referrer_host: 'www.google.com',
    viewed_tour_paths: ['/tours/china/discovery/x'],
  },
};
const phoneOnly = { ...base, email: '', phone: '021 123 456', message: undefined };

const TRAVEL_ROW = '\n    <tr><td style="font-weight:bold;">Travel window</td><td>June – September 2027</td></tr>';
const BUDGET_ROW = '\n    <tr><td style="font-weight:bold;">Budget per person (NZD)</td><td>$5,000 – $8,000</td></tr>';

describe('POST /api/tour-enquiry — travel window and budget', () => {
  it('a request without the new fields gets exactly the same email as before (older pages keep working)', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-20T03:00:00.000Z').getTime());

    const scenarios: Array<{ name: 'plain' | 'withAttribution' | 'phoneOnly'; payload: unknown }> = [
      { name: 'plain', payload: base },
      { name: 'withAttribution', payload: withAttribution },
      { name: 'phoneOnly', payload: phoneOnly },
    ];

    for (const scenario of scenarios) {
      sent.length = 0;
      const res = await call(scenario.payload);
      expect(res.status).toBe(200);
      expect(sent).toHaveLength(1);
      expect(sent[0].subject).toBe(golden[scenario.name].subject);
      expect(sent[0].html).toBe(golden[scenario.name].html);
      expect(sent[0].replyTo).toBe(golden[scenario.name].replyTo);
    }
  });

  it('known codes are accepted and show as two extra rows with human labels', async () => {
    const res = await call({ ...base, travelWindow: 'jun_sep_2027', budgetBand: '5000_8000' });
    expect(res.status).toBe(200);
    const html = sent[0].html;
    expect(html).toContain('<tr><td style="font-weight:bold;">Travel window</td><td>June – September 2027</td></tr>');
    expect(html).toContain('<tr><td style="font-weight:bold;">Budget per person (NZD)</td><td>$5,000 – $8,000</td></tr>');
    expect(html).not.toContain('jun_sep_2027');
    expect(html).not.toContain('5000_8000');
    expect(sent[0].subject).toBe('Tour enquiry: Tour X — Test Person');
  });

  it('the two rows come after every existing row', async () => {
    const res = await call({ ...withAttribution, travelWindow: 'jun_sep_2027', budgetBand: '5000_8000' });
    expect(res.status).toBe(200);
    const html = sent[0].html;
    const submitted = html.indexOf('Submitted</td>');
    const firstLanding = html.indexOf('First landing page');
    const fbclid = html.indexOf('Facebook click ID');
    const travel = html.indexOf('Travel window');
    const budget = html.indexOf('Budget per person (NZD)');
    const tableEnd = html.indexOf('</table>');
    expect(submitted).toBeGreaterThanOrEqual(0);
    expect(firstLanding).toBeGreaterThan(submitted);
    expect(fbclid).toBeGreaterThan(firstLanding);
    expect(travel).toBeGreaterThan(fbclid);
    expect(budget).toBeGreaterThan(travel);
    expect(travel).toBeLessThan(tableEnd);
    expect(budget).toBeLessThan(tableEnd);
  });

  it('everything else in the email is unchanged when the rows are added', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-20T03:00:00.000Z').getTime());

    const res = await call({ ...withAttribution, travelWindow: 'jun_sep_2027', budgetBand: '5000_8000' });
    expect(res.status).toBe(200);
    const stripped = sent[0].html.replace(TRAVEL_ROW, '').replace(BUDGET_ROW, '');
    expect(stripped).toBe(golden.withAttribution.html);
  });

  it('either answer can arrive alone', async () => {
    const travelOnly = await call({ ...base, travelWindow: 'oct_dec_2027' });
    expect(travelOnly.status).toBe(200);
    expect(sent[0].html).toContain('October – December 2027');
    expect(sent[0].html).not.toContain('Budget per person (NZD)');

    sent.length = 0;
    const budgetOnly = await call({ ...base, budgetBand: 'above_8000' });
    expect(budgetOnly.status).toBe(200);
    expect(sent[0].html).toContain('Above $8,000');
    expect(sent[0].html).not.toContain('Travel window');
  });

  it('empty or null values count as not sent', async () => {
    const res = await call({ ...base, travelWindow: '', budgetBand: null });
    expect(res.status).toBe(200);
    expect(sent[0].html).not.toContain('Travel window');
    expect(sent[0].html).not.toContain('Budget per person (NZD)');
  });

  describe('an unknown value is ignored and the lead is still sent', () => {
    const badTravelWindows: unknown[] = ['lt_3000', 'gt_8000', 'MAR_MAY_2027', 'March – May 2027', 'constructor', '__proto__', 5, ['mar_may_2027'], { code: 'mar_may_2027' }, true];
    it.each(badTravelWindows)('ignores travelWindow %p', async (value) => {
      sent.length = 0;
      const res = await call({ ...base, travelWindow: value });
      expect(res.status).toBe(200);
      expect(sent).toHaveLength(1);
      expect(sent[0].html).not.toContain('Travel window');
    });

    const badBudgetBands: unknown[] = ['lt_3000', 'gt_8000', 'UNDER_3000', 'Under $3,000', 'constructor', '__proto__', 5, ['under_3000'], { code: 'under_3000' }, true];
    it.each(badBudgetBands)('ignores budgetBand %p', async (value) => {
      sent.length = 0;
      const res = await call({ ...base, budgetBand: value });
      expect(res.status).toBe(200);
      expect(sent).toHaveLength(1);
      expect(sent[0].html).not.toContain('Budget per person (NZD)');
    });

    it('keeps the answer that is valid when the other one is unknown', async () => {
      const retiredWindow = await call({ ...base, travelWindow: 'retired_option', budgetBand: '5000_8000' });
      expect(retiredWindow.status).toBe(200);
      expect(sent[0].html).not.toContain('Travel window');
      expect(sent[0].html).toContain('$5,000 – $8,000');

      sent.length = 0;
      const retiredBudget = await call({ ...base, travelWindow: 'jun_sep_2027', budgetBand: 'retired_option' });
      expect(retiredBudget.status).toBe(200);
      expect(sent[0].html).toContain('June – September 2027');
      expect(sent[0].html).not.toContain('Budget per person (NZD)');
    });

    it('gives exactly the email an older page gets, as if the unknown values had not been sent', async () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-10-20T03:00:00.000Z').getTime());

      const res = await call({ ...base, travelWindow: 'retired_option', budgetBand: 'retired_option' });
      expect(res.status).toBe(200);
      expect(sent[0].subject).toBe(golden.plain.subject);
      expect(sent[0].html).toBe(golden.plain.html);
    });

    it('never puts an unknown value into the email', async () => {
      await call({ ...base, travelWindow: '<b>retired</b>', budgetBand: 'drop table leads' });
      expect(sent[0].html).not.toContain('retired');
      expect(sent[0].html).not.toContain('drop table leads');
    });
  });

  it('the existing required-field rule is unchanged', async () => {
    const res = await call({ ...base, name: '' });
    expect(res.status).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toBe('Missing required fields.');
  });
});
