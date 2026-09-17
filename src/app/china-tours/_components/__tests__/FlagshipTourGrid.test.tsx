import { render, screen } from '@testing-library/react';
import FlagshipTourGrid from '../FlagshipTourGrid';
jest.mock('next/image', () => ({ __esModule: true, default: (props: any) => <img {...props} /> }));
describe('December flagship promotion', () => {
  it('promotes both December origins and removes Golden China and spring promotion', () => {
    render(<FlagshipTourGrid />);
    expect(screen.getAllByRole('link').map(el => el.getAttribute('href'))).toEqual([
      '/tours/china/discovery/china-icons-collection',
      '/tours/china/discovery/china-icons-collection-christchurch',
    ]);
    expect(screen.getByText('22 December · Auckland')).toBeInTheDocument();
    expect(screen.getByText('22 December · Christchurch')).toBeInTheDocument();
    expect(screen.getAllByText('Next · Dec 2026')).toHaveLength(2);
    expect(screen.getByText('NZD $7,188')).toBeInTheDocument();
    expect(screen.getByText('NZD $6,188')).toBeInTheDocument();
  });
  it('retains campaign heading overrides and lead-followup limits', () => {
    render(<FlagshipTourGrid limit={1} heading="Find your next journey" intro="Our team will help." />);
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('heading', {name:'Find your next journey'})).toBeInTheDocument();
  });
});
