import { fireEvent, render, screen } from '@testing-library/react';
import ItineraryActions from '@/components/tours/ItineraryActions';

jest.mock('@/components/GoogleTagManager', () => ({ triggerGtmEvent: jest.fn() }));

const props = { tourName: 'China Panorama', tourSlug: 'grand-tour', destination: 'china', tier: 'signature' };

describe('ItineraryActions and the chosen route', () => {
  let open: jest.SpyInstance;
  beforeEach(() => { open = jest.spyOn(window, 'open').mockImplementation(() => null); });
  afterEach(() => open.mockRestore());

  it('opens the plain print page for the tour\'s own route', () => {
    render(<ItineraryActions {...props} />);
    fireEvent.click(screen.getByText('Print / PDF'));
    expect(open).toHaveBeenCalledWith('/tours/china/signature/grand-tour/print', '_blank', 'noopener,noreferrer');
  });

  it('opens the print page for the chosen alternative route', () => {
    render(<ItineraryActions {...props} route="oct-2027" />);
    fireEvent.click(screen.getByText('Print / PDF'));
    expect(open).toHaveBeenCalledWith('/tours/china/signature/grand-tour/print?route=oct-2027', '_blank', 'noopener,noreferrer');
  });

  it('sends the chosen route with the email request, and nothing extra for the default route', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    (global as unknown as { fetch: unknown }).fetch = fetchMock;
    const sent = async (route?: string) => {
      fetchMock.mockClear();
      const { unmount } = render(<ItineraryActions {...props} route={route} />);
      fireEvent.click(screen.getByText('Email Me This'));
      fireEvent.change(screen.getByLabelText(/Email/i, { selector: 'input' }), { target: { value: 'a@b.co' } });
      fireEvent.submit(screen.getByLabelText(/Email/i, { selector: 'input' }).closest('form') as HTMLFormElement);
      await new Promise((r) => setTimeout(r, 0));
      unmount();
      return JSON.parse(fetchMock.mock.calls[0][1].body);
    };
    expect(await sent('oct-2027')).toMatchObject({ tourSlug: 'grand-tour', route: 'oct-2027' });
    expect(await sent()).not.toHaveProperty('route');
  });
});
