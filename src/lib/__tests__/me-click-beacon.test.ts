import { ME_CALLBACK_ENDPOINT, ME_CLICK_ENDPOINT, isTrackedPage, planBeacon, planCallback, planPageView, sendBeacon, tokenToRemember, type BeaconInput } from '@/lib/me-click-beacon';

const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1';

function input(url: string, over: Partial<BeaconInput> = {}, headers: Record<string, string> = {}): BeaconInput {
  const h = new Map(Object.entries({ 'user-agent': UA, 'sec-fetch-mode': 'navigate', 'sec-fetch-dest': 'document', ...headers }));
  return { host: 'www.ctstours.co.nz', url: new URL(url), method: 'GET', headers: { get: (n) => h.get(n.toLowerCase()) ?? null }, ...over };
}

describe('planBeacon', () => {
  it('reports the click and redirects to the same address without the token', () => {
    const plan = planBeacon(input('https://www.ctstours.co.nz/tours/china/discovery/essentials?date=2027-03-11&me=AbC123xyZ789'));
    expect(plan?.cleanUrl.toString()).toBe('https://www.ctstours.co.nz/tours/china/discovery/essentials?date=2027-03-11');
    expect(plan?.report).toEqual({
      token: 'AbC123xyZ789',
      path: '/tours/china/discovery/essentials?date=2027-03-11',
      method: 'GET',
      ua: UA,
      fetchSite: null,
      fetchMode: 'navigate',
      fetchDest: 'document',
    });
  });

  it('works for the brochure PDF', () => {
    const plan = planBeacon(input('https://www.ctstours.co.nz/brochures/CTS-Tours-2026-2027-Brochure.pdf?me=AbC123xyZ789'));
    expect(plan?.cleanUrl.toString()).toBe('https://www.ctstours.co.nz/brochures/CTS-Tours-2026-2027-Brochure.pdf');
    expect(plan?.report?.path).toBe('/brochures/CTS-Tours-2026-2027-Brochure.pdf');
  });

  it('does nothing without a token', () => {
    expect(planBeacon(input('https://www.ctstours.co.nz/china-tours'))).toBeNull();
  });

  it('does nothing on any host but the production one (staging, previews, local)', () => {
    for (const host of ['staging.chinatravel.co.nz', 'localhost:3010', 'ctstours.co.nz', null]) {
      expect(planBeacon(input('https://x/a?me=AbC123xyZ789', { host }))).toBeNull();
    }
  });

  it('a later PDF chunk is not reported (only the first request of an opening counts)', () => {
    expect(planBeacon(input('https://www.ctstours.co.nz/b.pdf?me=AbC123xyZ789', {}, { range: 'bytes=65536-131071' }))?.report).toBeNull();
    expect(planBeacon(input('https://www.ctstours.co.nz/b.pdf?me=AbC123xyZ789', {}, { range: 'bytes=0-' }))?.report).not.toBeNull();
  });

  it('a malformed token is still removed from the address, but never reported', () => {
    const plan = planBeacon(input('https://www.ctstours.co.nz/a?me=<script>'));
    expect(plan?.cleanUrl.toString()).toBe('https://www.ctstours.co.nz/a');
    expect(plan?.report).toBeNull();
  });
});

describe('sendBeacon', () => {
  it('posts the report to Magic Engine', async () => {
    const calls: Array<[unknown, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return new Response(null, { status: 204 });
    };
    await sendBeacon({ token: 'AbC123xyZ789' }, fetcher);
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toBe(ME_CLICK_ENDPOINT);
    expect(calls[0][1]).toEqual(expect.objectContaining({ method: 'POST', body: JSON.stringify({ token: 'AbC123xyZ789' }) }));
  });

  it('never throws, whatever Magic Engine does', async () => {
    const failing: typeof fetch = async () => {
      throw new Error('down');
    };
    await expect(sendBeacon({ token: 'AbC123xyZ789' }, failing)).resolves.toBeUndefined();
  });
});

// Why: after the first click, staff want to know which tours the guest went on to read — but only for guests who came
// in through our own mail, only tour pages, and never a token that could belong to someone else's site.
describe('remembering the guest after the first click', () => {
  it('remembers a well-formed token on the production host only', () => {
    expect(tokenToRemember(input('https://www.ctstours.co.nz/brochures/b.pdf?me=AbC123xyZ789'))).toBe('AbC123xyZ789');
    expect(tokenToRemember(input('https://www.ctstours.co.nz/brochures/b.pdf?me=AbC123xyZ789', { host: 'staging.chinatravel.co.nz' }))).toBeNull();
    expect(tokenToRemember(input('https://www.ctstours.co.nz/brochures/b.pdf?me=short'))).toBeNull();
    expect(tokenToRemember(input('https://www.ctstours.co.nz/brochures/b.pdf'))).toBeNull();
  });
});

describe('planPageView', () => {
  const base = { host: 'www.ctstours.co.nz', token: 'AbC123xyZ789', ua: UA };

  it('reports a tour page view as kind page_view (Magic Engine judges it without a document navigation)', () => {
    expect(planPageView({ ...base, path: '/tours/china/discovery/essentials' })).toEqual({
      token: 'AbC123xyZ789',
      path: '/tours/china/discovery/essentials',
      method: 'GET',
      ua: UA,
      fetchSite: null,
      fetchMode: null,
      fetchDest: null,
      kind: 'page_view',
    });
  });

  it('does not report pages that are not about tours, other hosts, missing or bad tokens, or junk paths', () => {
    expect(planPageView({ ...base, path: '/about' })).toBeNull();
    expect(planPageView({ ...base, path: '/contact' })).toBeNull();
    expect(planPageView({ ...base, host: 'staging.chinatravel.co.nz', path: '/tours/china/discovery/essentials' })).toBeNull();
    expect(planPageView({ ...base, token: null, path: '/tours/china/discovery/essentials' })).toBeNull();
    expect(planPageView({ ...base, token: 'bad!token!!!', path: '/tours/china/discovery/essentials' })).toBeNull();
    expect(planPageView({ ...base, path: 'https://evil.example/tours/x' })).toBeNull();
    expect(planPageView({ ...base, path: 42 })).toBeNull();
    expect(planPageView({ ...base, path: `/tours/${'x'.repeat(400)}` })).toBeNull();
  });

  it('tracked pages are the tour pages, the tour lists and the brochure', () => {
    expect(['/tours', '/tours/china/discovery/essentials', '/china-tours', '/brochure', '/brochures/b.pdf'].every(isTrackedPage)).toBe(true);
    expect(['/', '/about', '/blog/x', '/admin', '/brochure/x', '/brochurex'].some(isTrackedPage)).toBe(false);
  });
});

describe('planCallback', () => {
  const base = { host: 'www.ctstours.co.nz', token: 'AbC123xyZ789', ua: UA };
  const body = {
    date: '2026-11-20',
    window: 'afternoon',
    tourPath: '/tours/china/discovery/essentials',
    quiz: { length: '10', firstVisit: true, pace: 'easy', picks: ['/tours/china/discovery/a', '/tours/china/signature/b'] },
  };

  it('forwards a good request', () => {
    expect(planCallback({ ...base, body })).toEqual({
      token: 'AbC123xyZ789',
      date: '2026-11-20',
      window: 'afternoon',
      tourPath: '/tours/china/discovery/essentials',
      quiz: body.quiz,
      ua: UA,
    });
  });

  it('accepts "Any tour" with no quiz', () => {
    const result = planCallback({ ...base, body: { ...body, tourPath: null, quiz: undefined } });
    expect(result).toEqual(expect.objectContaining({ tourPath: null, quiz: null }));
  });

  it('rejects anything it cannot vouch for', () => {
    expect(planCallback({ ...base, host: 'staging.chinatravel.co.nz', body })).toBeNull();
    expect(planCallback({ ...base, host: null, body })).toBeNull();
    expect(planCallback({ ...base, token: null, body })).toBeNull();
    expect(planCallback({ ...base, token: 'bad!token!!!', body })).toBeNull();
    expect(planCallback({ ...base, body: null })).toBeNull();
    expect(planCallback({ ...base, body: 'text' })).toBeNull();
    expect(planCallback({ ...base, body: [body] })).toBeNull();
    expect(planCallback({ ...base, body: { ...body, date: '20 Nov 2026' } })).toBeNull();
    expect(planCallback({ ...base, body: { ...body, date: 42 } })).toBeNull();
    expect(planCallback({ ...base, body: { ...body, window: 'night' } })).toBeNull();
    const { window: _window, ...withoutWindow } = body;
    expect(planCallback({ ...base, body: withoutWindow })).toBeNull();
    expect(planCallback({ ...base, body: { ...body, tourPath: '/about' } })).toBeNull();
    expect(planCallback({ ...base, body: { ...body, tourPath: 'https://evil.example/tours/x' } })).toBeNull();
    expect(planCallback({ ...base, body: { ...body, tourPath: `/tours/${'x'.repeat(300)}` } })).toBeNull();
    const { tourPath: _tourPath, ...withoutTourPath } = body;
    expect(planCallback({ ...base, body: withoutTourPath })).toBeNull();
  });

  it('trims a long user agent to 400 characters', () => {
    const result = planCallback({ ...base, ua: 'x'.repeat(1000), body });
    expect((result?.ua as string).length).toBe(400);
  });

  it('the endpoint is Magic Engine\'s callback endpoint', () => {
    expect(ME_CALLBACK_ENDPOINT).toBe('https://app.magicengine.com.au/api/public/crm/site-callback-request');
  });
});
