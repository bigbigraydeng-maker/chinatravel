/** @jest-environment node */
const mockSend = jest.fn().mockResolvedValue({ error: null });
jest.mock('resend', () => ({ Resend: jest.fn().mockImplementation(() => ({ emails: { send: mockSend } })) }));
jest.mock('@/lib/site', () => ({ getSiteUrl: () => 'https://example.test' }));
jest.mock('@/lib/data/published-tour-catalog', () => ({
  getPublishedTourBySlug: jest.fn().mockResolvedValue({
    isActive: true, title: 'China Panorama', duration: '27 Days', price: 'NZD $10,899', inclusions: ['Flights'], exclusions: [],
    itinerary: [{ day: 1, title: 'May route day', description: 'd', meals: [] }],
    routeVariants: [{ id: 'oct-2027', label: '16 October 2027', note: 'Zhangjiajie replaces Yunnan.', departureDates: ['16 October 2027'],
      itinerary: [{ day: 1, title: 'Oct route day', description: 'd', meals: [] }] }],
  }),
}));

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/send-itinerary/route';

const call = (extra: Record<string, unknown>) =>
  POST(new NextRequest('http://x/api/send-itinerary', {
    method: 'POST', body: JSON.stringify({ email: 'a@b.co', tourSlug: 'grand-tour', destination: 'china', tier: 'signature', ...extra }),
  }));

describe('send-itinerary and routes', () => {
  beforeEach(() => { process.env.RESEND_API_KEY = 'test'; mockSend.mockClear(); });

  it('emails the tour\'s own itinerary when no route is given', async () => {
    expect((await call({})).status).toBe(200);
    const { html, subject } = mockSend.mock.calls[0][0];
    expect(html).toContain('May route day');
    expect(html).not.toContain('Oct route day');
    expect(subject).not.toContain('departure');
  });

  it('emails the alternative route itinerary and says which departure it is for', async () => {
    expect((await call({ route: 'oct-2027' })).status).toBe(200);
    const { html, subject } = mockSend.mock.calls[0][0];
    expect(html).toContain('Oct route day');
    expect(html).not.toContain('May route day');
    expect(html).toContain('16 October 2027');
    expect(subject).toContain('16 October 2027 departure');
  });

  it('falls back to the default route for an unknown route id', async () => {
    await call({ route: 'nope' });
    expect(mockSend.mock.calls[0][0].html).toContain('May route day');
  });
});
