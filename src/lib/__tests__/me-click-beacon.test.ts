import { ME_CLICK_ENDPOINT, planBeacon, sendBeacon, type BeaconInput } from '@/lib/me-click-beacon';

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
