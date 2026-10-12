/**
 * ChongqingCustomEnquiry — after a successful submit the visitor must land on
 * the real /thank-you page (which fires the lead conversion events). The form
 * previously pushed to /enquiry-thank-you, a route that does not exist, so
 * visitors saw a 404 right after enquiring.
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChongqingCustomEnquiry from '../ChongqingCustomEnquiry';

const push = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

describe('ChongqingCustomEnquiry success redirect', () => {
  beforeEach(() => {
    push.mockClear();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    }) as unknown as typeof fetch;
  });

  it('redirects to the existing /thank-you page with source=chongqing-custom', async () => {
    const { container } = render(<ChongqingCustomEnquiry />);
    fireEvent.change(container.querySelector('#cq-name') as HTMLInputElement, {
      target: { name: 'name', value: 'Test Visitor' },
    });
    fireEvent.change(container.querySelector('#cq-email') as HTMLInputElement, {
      target: { name: 'email', value: 'test@example.com' },
    });
    fireEvent.submit(container.querySelector('form') as HTMLFormElement);

    await waitFor(() => expect(push).toHaveBeenCalledTimes(1));
    const target = push.mock.calls[0][0] as string;
    expect(target.startsWith('/thank-you?')).toBe(true);
    expect(new URLSearchParams(target.split('?')[1]).get('source')).toBe('chongqing-custom');
    expect(target).not.toContain('enquiry-thank-you');
    expect(screen.queryByText(/something went wrong/i)).toBeNull();
  });
});
