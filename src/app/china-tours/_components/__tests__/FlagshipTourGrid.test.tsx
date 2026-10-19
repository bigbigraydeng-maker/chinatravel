import { render } from '@testing-library/react';
import FlagshipTourGrid from '../FlagshipTourGrid';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img alt="" {...props} />,
}));

describe('FlagshipTourGrid', () => {
  // No tour is featured at the moment: the section must disappear instead of leaving an empty band
  // (or a stub card) on a page that paid traffic lands on.
  it('renders nothing while the roster is empty', () => {
    const { container } = render(<FlagshipTourGrid />);
    expect(container.innerHTML).toBe('');
  });

  it('also renders nothing for the lead-follow-up variant while the roster is empty', () => {
    const { container } = render(
      <FlagshipTourGrid limit={2} mobileLimit={1} heading="Find your next journey" intro="Our team will help." />,
    );
    expect(container.innerHTML).toBe('');
  });
});
