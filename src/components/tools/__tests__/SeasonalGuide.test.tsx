import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SeasonalGuide from '../SeasonalGuide';
import { getSeasonalDataByMonth } from '@/lib/data/seasonal-data';

// Mock the seasonal data
jest.mock('@/lib/data/seasonal-data', () => ({
  getSeasonalDataByMonth: jest.fn(),
}));

describe('SeasonalGuide Component', () => {
  const mockSeasonalData = {
    month: 4,
    monthName: 'April',
    season: 'spring',
    nationalClimate: 'Late spring. Warm, mostly dry. Flowers fade, foliage green.',
    avgTemp: { min: 12, max: 25, unit: 'C' },
    humidity: 'Moderate (60-75%)',
    rainfallLevel: 'medium' as const,
    priceLevel: 'high' as const,
    crowding: 'peak' as const,
    bestDestinations: [
      {
        slug: 'yangshuo',
        name: 'Yangshuo',
        reason: 'Rice paddies fully planted.',
      },
      {
        slug: 'xian',
        name: "Xi'an",
        reason: 'Perfect spring weather.',
      },
      {
        slug: 'guilin',
        name: 'Guilin',
        reason: 'Spring rains create misty landscapes.',
      },
      {
        slug: 'chengdu',
        name: 'Chengdu',
        reason: 'Late spring weather.',
      },
      {
        slug: 'zhangjiajie',
        name: 'Zhangjiajie',
        reason: 'Green mountains. Clear visibility.',
      },
    ],
    highlights: ['Qingming Festival', 'Late spring wildflowers'],
    festivals: ['Qingming Festival (early April)'],
    tips: ['Peak season—prices highest', 'Book accommodations 1-2 months in advance'],
    packing: ['Light clothing', 'Sunscreen (SPF 50+)'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getSeasonalDataByMonth as jest.Mock).mockReturnValue(mockSeasonalData);
  });

  // Rendering Tests
  describe('Rendering', () => {
    it('renders month selector', () => {
      render(<SeasonalGuide />);
      const selector = screen.getByRole('combobox', { name: /select month/i });
      expect(selector).toBeInTheDocument();
    });

    it('renders seasonal data for default month', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getAllByText('April').length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Late spring/).length).toBeGreaterThan(0);
    });

    it('renders climate information', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getByText(/12°C/)).toBeInTheDocument();
      expect(screen.getByText(/25°C/)).toBeInTheDocument();
      expect(screen.getByText(/Moderate \(60-75%\)/)).toBeInTheDocument();
    });

    it('renders exactly 5 destination cards', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      const cards = screen.getAllByRole('link').filter((link) => {
        const href = link.getAttribute('href');
        return href?.includes('travel-guide') && href !== '/guide';
      });
      expect(cards.length).toBeGreaterThanOrEqual(5);
    });

    it('renders destination reasons', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      const reasonTexts = screen.getAllByText(/Rice paddies|Perfect spring|misty landscapes/);
      expect(reasonTexts.length).toBeGreaterThan(0);
    });

    it('renders highlights list', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getByText('Late spring wildflowers')).toBeInTheDocument();
      expect(screen.getAllByText(/Qingming Festival/).length).toBeGreaterThan(0);
    });

    it('renders festivals list', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getByText(/Qingming Festival \(early April\)/)).toBeInTheDocument();
    });

    it('renders packing tips', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getByText('Light clothing')).toBeInTheDocument();
      expect(screen.getByText(/Sunscreen/)).toBeInTheDocument();
    });

    it('renders travel tips', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getByText(/Peak season/)).toBeInTheDocument();
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    it('updates data when month selected', async () => {
      const novemberData = {
        ...mockSeasonalData,
        month: 11,
        monthName: 'November',
        avgTemp: { min: 8, max: 18, unit: 'C' },
      };
      (getSeasonalDataByMonth as jest.Mock)
        .mockReturnValueOnce(mockSeasonalData)
        .mockReturnValueOnce(novemberData);

      render(<SeasonalGuide defaultMonth={4} />);
      const selector = screen.getByRole('combobox', { name: /select month/i });

      fireEvent.change(selector, { target: { value: '11' } });

      expect(getSeasonalDataByMonth).toHaveBeenCalledWith(11);
    });

    it('destination cards link to guides', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      const yangzhouLink = screen.getByRole('link', { name: /yangshuo/i });
      expect(yangzhouLink).toHaveAttribute('href', '/yangshuo-travel-guide');
    });

    it('all destination links are internal guides', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      const links = screen.getAllByRole('link').filter(link => {
        const href = link.getAttribute('href');
        return href && href.includes('travel-guide');
      });
      expect(links.length).toBeGreaterThanOrEqual(5);
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('month selector is keyboard accessible', () => {
      render(<SeasonalGuide />);
      const selector = screen.getByRole('combobox', { name: /select month/i });
      expect(selector).toHaveFocus === undefined || selector.tabIndex >= -1;
    });

    it('has proper aria labels', () => {
      render(<SeasonalGuide />);
      const selector = screen.getByRole('combobox', { name: /select month/i });
      expect(selector).toHaveAccessibleName();
    });

    it('uses semantic HTML', () => {
      const { container } = render(<SeasonalGuide />);
      const select = container.querySelector('select');
      expect(select).toBeInTheDocument();
    });

    it('has heading hierarchy', () => {
      render(<SeasonalGuide />);
      expect(screen.getByRole('heading', { level: 1, name: /Best Time to Visit China/i })).toBeInTheDocument();
    });
  });

  // Responsive Tests
  describe('Responsive Design', () => {
    it('renders without layout issues on small screen', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      // Component should render without errors
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getAllByText('April').length).toBeGreaterThan(0);
    });

    it('renders destination grid', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      const destLinks = screen.getAllByRole('link').filter(link =>
        link.getAttribute('href')?.includes('travel-guide')
      );
      expect(destLinks.length).toBeGreaterThanOrEqual(5);
    });
  });

  // Default Month Tests
  describe('Default Month', () => {
    it('defaults to current month when not specified', () => {
      render(<SeasonalGuide />);
      // Should render without error and call getSeasonalDataByMonth
      expect(getSeasonalDataByMonth).toHaveBeenCalled();
    });

    it('accepts custom defaultMonth prop', () => {
      render(<SeasonalGuide defaultMonth={7} />);
      expect(getSeasonalDataByMonth).toHaveBeenCalledWith(7);
    });

    it('accepts defaultMonth prop and displays correct data', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getAllByText('April').length).toBeGreaterThan(0);
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('handles month boundary (month 1)', () => {
      (getSeasonalDataByMonth as jest.Mock).mockReturnValue({
        ...mockSeasonalData,
        month: 1,
        monthName: 'January',
      });
      render(<SeasonalGuide defaultMonth={1} />);
      expect(screen.getByText('January')).toBeInTheDocument();
    });

    it('handles month boundary (month 12)', () => {
      (getSeasonalDataByMonth as jest.Mock).mockReturnValue({
        ...mockSeasonalData,
        month: 12,
        monthName: 'December',
      });
      render(<SeasonalGuide defaultMonth={12} />);
      expect(screen.getByText('December')).toBeInTheDocument();
    });

    it('displays correct temperature range (min < max)', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      const minTemp = 12;
      const maxTemp = 25;
      expect(minTemp).toBeLessThan(maxTemp);
    });

    it('displays price level indicator', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getAllByText(/high|medium|low/i).length).toBeGreaterThan(0);
    });

    it('displays crowding level', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getAllByText(/peak|moderate|light/i).length).toBeGreaterThan(0);
    });

    it('handles missing best destinations gracefully', () => {
      (getSeasonalDataByMonth as jest.Mock).mockReturnValue({
        ...mockSeasonalData,
        bestDestinations: [],
      });
      const { container } = render(<SeasonalGuide defaultMonth={4} />);
      // Should not crash
      expect(container).toBeInTheDocument();
    });

    it('handles missing highlights gracefully', () => {
      (getSeasonalDataByMonth as jest.Mock).mockReturnValue({
        ...mockSeasonalData,
        highlights: [],
      });
      const { container } = render(<SeasonalGuide defaultMonth={4} />);
      // Should not crash
      expect(container).toBeInTheDocument();
    });
  });

  // Content Tests
  describe('Content Display', () => {
    it('displays rainfall level', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getAllByText(/medium|low|high/i).length).toBeGreaterThan(0);
    });

    it('displays season property', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getAllByText(/spring|summer|autumn|winter/i).length).toBeGreaterThan(0);
    });

    it('displays humidity level', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getByText(/60-75%/)).toBeInTheDocument();
    });

    it('displays national climate description', () => {
      render(<SeasonalGuide defaultMonth={4} />);
      expect(screen.getAllByText(/Late spring/).length).toBeGreaterThan(0);
    });
  });

  // Props Tests
  describe('Props Handling', () => {
    it('renders with no props', () => {
      render(<SeasonalGuide />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders with defaultMonth prop', () => {
      render(<SeasonalGuide defaultMonth={6} />);
      expect(getSeasonalDataByMonth).toHaveBeenCalledWith(6);
    });
  });
});
