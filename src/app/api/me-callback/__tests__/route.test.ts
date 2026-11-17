/** @jest-environment node */
// Why this exists: only guests who came from a Magic Engine mail can ask for a call, and Magic Engine must get their
// token, never anyone else's.
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/me-callback/route';
import { ME_CALLBACK_ENDPOINT } from '@/lib/me-click-beacon';

const TOKEN = 'AbC123xyZ789';
const GOOD = { date: '2026-11-20', window: 'morning', tourPath: '/tours/china/discovery/essentials', quiz: null };

function request(body: string, cookie: string | null = TOKEN): NextRequest {
  const headers: Record<string, string> = {
    host: 'www.ctstours.co.nz',
    'content-type': 'application/json',
    'user-agent': 'test-agent',
  };
  if (cookie !== null) headers.cookie = `cts_me=${cookie}`;
  return new NextRequest('https://www.ctstours.co.nz/api/me-callback', { method: 'POST', headers, body });
}

const mockFetch = jest.fn<Promise<Response>, Parameters<typeof fetch>>();
const realFetch = global.fetch;

beforeEach(() => {
  mockFetch.mockReset();
  Object.defineProperty(global, 'fetch', { value: mockFetch, writable: true, configurable: true });
});

afterAll(() => {
  Object.defineProperty(global, 'fetch', { value: realFetch, writable: true, configurable: true });
});

describe('POST /api/me-callback', () => {
  it('rejects a request with no cts_me cookie without calling Magic Engine', async () => {
    const response = await POST(request(JSON.stringify(GOOD), null));

    expect(response.status).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('rejects a body that is not JSON without calling Magic Engine', async () => {
    const response = await POST(request('{not json'));

    expect(response.status).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('rejects an invalid call window without calling Magic Engine', async () => {
    const response = await POST(request(JSON.stringify({ ...GOOD, window: 'night' })));

    expect(response.status).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('rejects a body longer than 1024 characters with 413', async () => {
    const response = await POST(request(JSON.stringify({ ...GOOD, pad: 'x'.repeat(1100) })));

    expect(response.status).toBe(413);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('forwards the remembered token and body to Magic Engine and returns 204 when accepted', async () => {
    mockFetch.mockResolvedValue(new Response(null, { status: 204 }));

    const response = await POST(request(JSON.stringify(GOOD)));

    expect(response.status).toBe(204);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe(ME_CALLBACK_ENDPOINT);
    expect(JSON.parse(String(mockFetch.mock.calls[0][1]?.body))).toEqual({
      token: TOKEN,
      date: '2026-11-20',
      window: 'morning',
      tourPath: '/tours/china/discovery/essentials',
      quiz: null,
      ua: 'test-agent',
    });
  });

  it('ignores a token supplied in the body and forwards the cookie token', async () => {
    mockFetch.mockResolvedValue(new Response(null, { status: 204 }));

    const response = await POST(request(JSON.stringify({ ...GOOD, token: 'ZZZZZZZZZZZZ' })));

    expect(response.status).toBe(204);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const forwarded = JSON.parse(String(mockFetch.mock.calls[0][1]?.body)) as { token: string };
    expect(forwarded.token).toBe(TOKEN);
  });

  it('returns 502 when Magic Engine answers with a non-204 status', async () => {
    mockFetch.mockResolvedValue(new Response(null, { status: 503 }));

    const response = await POST(request(JSON.stringify(GOOD)));

    expect(response.status).toBe(502);
  });

  it('returns 502 when the fetch to Magic Engine rejects', async () => {
    mockFetch.mockRejectedValue(new Error('network down'));

    const response = await POST(request(JSON.stringify(GOOD)));

    expect(response.status).toBe(502);
  });
});
