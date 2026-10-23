/** @jest-environment node */
import { NextRequest } from 'next/server';
import { POST } from '../route';

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));

import { revalidatePath, revalidateTag } from 'next/cache';

const originalSecret = process.env.CTS_TOUR_CATALOG_REVALIDATE_SECRET;
const originalClient = process.env.CTS_TOUR_CATALOG_CLIENT_ID;

function request(secret: string, clientId = 'client-cts-1') {
  return new NextRequest('https://cts.example.test/api/revalidate', {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId }),
  });
}

beforeEach(() => {
  process.env.CTS_TOUR_CATALOG_REVALIDATE_SECRET = 'test-secret';
  process.env.CTS_TOUR_CATALOG_CLIENT_ID = 'client-cts-1';
  jest.clearAllMocks();
});

afterAll(() => {
  if (originalSecret === undefined) delete process.env.CTS_TOUR_CATALOG_REVALIDATE_SECRET;
  else process.env.CTS_TOUR_CATALOG_REVALIDATE_SECRET = originalSecret;
  if (originalClient === undefined) delete process.env.CTS_TOUR_CATALOG_CLIENT_ID;
  else process.env.CTS_TOUR_CATALOG_CLIENT_ID = originalClient;
});

describe('POST /api/revalidate', () => {
  it('invalidates the shared feed and the main product route patterns for the configured client', async () => {
    const response = await POST(request('test-secret'));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, revalidated: true });
    expect(revalidateTag).toHaveBeenCalledWith('cts-published-tour-catalog');
    expect(revalidatePath).toHaveBeenCalledWith('/tours/[destination]/[tier]/[tour]', 'page');
    expect(revalidatePath).toHaveBeenCalledWith('/sitemap.xml');
  });

  it('rejects an invalid secret or a different client without invalidating cache', async () => {
    expect((await POST(request('wrong-secret'))).status).toBe(401);
    expect((await POST(request('test-secret', 'other-client'))).status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
