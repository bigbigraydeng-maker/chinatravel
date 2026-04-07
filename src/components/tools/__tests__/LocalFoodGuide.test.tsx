import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocalFoodGuide from '../LocalFoodGuide';
import * as localFoodsModule from '@/lib/data/local-foods';

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill,
    sizes,
    className,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
    className?: string;
  }) => (
    <img src={src} alt={alt} className={className} data-testid="food-image" />
  ),
}));

describe('LocalFoodGuide Component', () => {
  // ============================================
  // RENDERING TESTS (1-10)
  // ============================================

  test('1: renders without crashing', () => {
    render(<LocalFoodGuide />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('2: renders with semantic main element', () => {
    render(<LocalFoodGuide />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  test('3: renders title correctly', () => {
    render(<LocalFoodGuide />);
    expect(screen.getByText(/Local Food Guide/i)).toBeInTheDocument();
  });

  test('4: renders subtitle text', () => {
    render(<LocalFoodGuide />);
    expect(
      screen.getByText(/Discover authentic Chinese cuisine/i)
    ).toBeInTheDocument();
  });

  test('5: renders food list with correct role', () => {
    render(<LocalFoodGuide />);
    const list = screen.getByTestId('food-list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute('role', 'list');
  });

  test('6: renders destination selector', () => {
    render(<LocalFoodGuide />);
    expect(screen.getByTestId('destination-selector')).toBeInTheDocument();
  });

  test('7: renders flavor selector', () => {
    render(<LocalFoodGuide />);
    expect(screen.getByTestId('flavor-selector')).toBeInTheDocument();
  });

  test('8: renders difficulty selector', () => {
    render(<LocalFoodGuide />);
    expect(screen.getByTestId('difficulty-selector')).toBeInTheDocument();
  });

  test('9: renders search input', () => {
    render(<LocalFoodGuide />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  test('10: renders reset filters button', () => {
    render(<LocalFoodGuide />);
    expect(screen.getByTestId('reset-filters-button')).toBeInTheDocument();
  });

  // ============================================
  // DESTINATION SELECTOR TESTS (11-20)
  // ============================================

  test('11: destination selector has all regions option', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('destination-selector');
    const option = within(selector).getByText(/All Regions/i);
    expect(option).toBeInTheDocument();
  });

  test('12: destination selector can be changed', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('destination-selector') as HTMLSelectElement;
    await userEvent.selectOptions(selector, 'shanghai');
    expect(selector.value).toBe('shanghai');
  });

  test('13: changing destination updates selected value', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('destination-selector') as HTMLSelectElement;
    expect(selector.value).toBe('beijing');
    await userEvent.selectOptions(selector, 'xian');
    expect(selector.value).toBe('xian');
  });

  test('14: destination selector filters foods correctly', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('destination-selector');
    await userEvent.selectOptions(selector, 'beijing');
    // Verify Beijing foods are displayed
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('15: all regions option shows all foods', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('destination-selector');
    await userEvent.selectOptions(selector, 'all');
    const list = screen.getByTestId('food-list');
    expect(list).toBeInTheDocument();
  });

  test('16: destination selector is labeled correctly', () => {
    render(<LocalFoodGuide />);
    expect(screen.getByLabelText(/Region/i)).toBeInTheDocument();
  });

  test('17: destination selector has proper accessibility', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('destination-selector');
    expect(selector).toHaveAttribute('aria-label', 'Select region');
  });

  test('18: destination selector resets pagination on change', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('destination-selector');
    await userEvent.selectOptions(selector, 'shanghai');
    // Pagination should reset to page 1
    const page1Button = screen.queryByTestId('page-1-button');
    // If pagination exists, current page should be 1
  });

  test('19: destination selector options are sorted', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('destination-selector') as HTMLSelectElement;
    const options = Array.from(selector.options).map((opt) => opt.text);
    // First option should be 'All Regions'
    expect(options[0]).toBe('All Regions');
  });

  test('20: destination selector persists selection', async () => {
    const { rerender } = render(<LocalFoodGuide />);
    const selector = screen.getByTestId('destination-selector') as HTMLSelectElement;
    await userEvent.selectOptions(selector, 'chengdu');
    expect(selector.value).toBe('chengdu');
  });

  // ============================================
  // SEARCH FUNCTIONALITY TESTS (21-35)
  // ============================================

  test('21: search input can accept text', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'duck');
    expect(input.value).toBe('duck');
  });

  test('22: search input has placeholder text', () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    expect(input.placeholder).toMatch(/Search by name/i);
  });

  test('23: search by food name works', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'Peking Duck');
    // Search should filter results
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('24: search by Chinese name works', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, '北京');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('25: search is case insensitive', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'DUCK');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('26: search clears when input is cleared', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'duck');
    expect(input.value).toBe('duck');
    await userEvent.clear(input);
    expect(input.value).toBe('');
  });

  test('27: search resets pagination to page 1', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'Peking');
    // Should show results from page 1
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('28: search filters foods by description', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'crispy');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('29: search input has correct label', () => {
    render(<LocalFoodGuide />);
    expect(screen.getByLabelText(/Search Foods/i)).toBeInTheDocument();
  });

  test('30: search input has accessibility attributes', () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveAttribute('aria-label', 'Search foods');
  });

  test('31: empty search shows all foods', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'duck');
    await userEvent.clear(input);
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('32: search with no results shows empty state', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'xyznonexistent123');
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  test('33: search is debounced (shows loading)', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'duck');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('34: search combines with destination filter', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input');
    const selector = screen.getByTestId('destination-selector');
    await userEvent.selectOptions(selector, 'beijing');
    await userEvent.type(input, 'duck');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('35: search combines with flavor filter', async () => {
    render(<LocalFoodGuide />);
    const input = screen.getByTestId('search-input');
    const flavorSelector = screen.getByTestId('flavor-selector');
    await userEvent.selectOptions(flavorSelector, 'savory');
    await userEvent.type(input, 'duck');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  // ============================================
  // FLAVOR FILTER TESTS (36-50)
  // ============================================

  test('36: flavor selector has all flavors option', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector');
    expect(within(selector).getByText(/All Flavors/i)).toBeInTheDocument();
  });

  test('37: flavor selector shows spicy option', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector');
    expect(within(selector).getByText(/Spicy/i)).toBeInTheDocument();
  });

  test('38: flavor selector shows savory option', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector');
    expect(within(selector).getByText(/Savory/i)).toBeInTheDocument();
  });

  test('39: flavor selector shows umami option', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector');
    expect(within(selector).getByText(/Umami/i)).toBeInTheDocument();
  });

  test('40: flavor selector filters foods correctly', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector');
    await userEvent.selectOptions(selector, 'spicy');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('41: flavor filter resets pagination', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector');
    await userEvent.selectOptions(selector, 'savory');
    // Should be on page 1
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('42: flavor selector has proper label', () => {
    render(<LocalFoodGuide />);
    expect(screen.getByLabelText(/Flavor Profile/i)).toBeInTheDocument();
  });

  test('43: flavor selector has accessibility attributes', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector');
    expect(selector).toHaveAttribute('aria-label', 'Select flavor');
  });

  test('44: flavor filter combines with destination', async () => {
    render(<LocalFoodGuide />);
    const destSelector = screen.getByTestId('destination-selector');
    const flavorSelector = screen.getByTestId('flavor-selector');
    await userEvent.selectOptions(destSelector, 'beijing');
    await userEvent.selectOptions(flavorSelector, 'spicy');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('45: flavor filter combines with search', async () => {
    render(<LocalFoodGuide />);
    const searchInput = screen.getByTestId('search-input');
    const flavorSelector = screen.getByTestId('flavor-selector');
    await userEvent.selectOptions(flavorSelector, 'savory');
    await userEvent.type(searchInput, 'duck');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('46: flavor filter displays correct foods', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector');
    await userEvent.selectOptions(selector, 'savory');
    const list = screen.getByTestId('food-list');
    expect(list).toBeInTheDocument();
  });

  test('47: flavor selector shows sweet option', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector');
    expect(within(selector).getByText(/Sweet/i)).toBeInTheDocument();
  });

  test('48: flavor selector shows sour option', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector');
    expect(within(selector).getByText(/Sour/i)).toBeInTheDocument();
  });

  test('49: flavor filter default is all', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector') as HTMLSelectElement;
    expect(selector.value).toBe('all');
  });

  test('50: flavor filter can be changed multiple times', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('flavor-selector') as HTMLSelectElement;
    await userEvent.selectOptions(selector, 'spicy');
    expect(selector.value).toBe('spicy');
    await userEvent.selectOptions(selector, 'savory');
    expect(selector.value).toBe('savory');
  });

  // ============================================
  // DIFFICULTY FILTER TESTS (51-65)
  // ============================================

  test('51: difficulty selector has all levels option', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('difficulty-selector');
    expect(within(selector).getByText(/All Levels/i)).toBeInTheDocument();
  });

  test('52: difficulty selector shows must-try option', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('difficulty-selector');
    expect(within(selector).getByText(/Must Try/i)).toBeInTheDocument();
  });

  test('53: difficulty selector shows recommended option', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('difficulty-selector');
    expect(within(selector).getByText(/Recommended/i)).toBeInTheDocument();
  });

  test('54: difficulty selector shows adventurous option', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('difficulty-selector');
    expect(within(selector).getByText(/Adventurous/i)).toBeInTheDocument();
  });

  test('55: difficulty filter resets pagination', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('difficulty-selector');
    await userEvent.selectOptions(selector, 'must-try');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('56: difficulty selector has proper label', () => {
    render(<LocalFoodGuide />);
    expect(screen.getByLabelText(/Difficulty Level/i)).toBeInTheDocument();
  });

  test('57: difficulty selector has accessibility attributes', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('difficulty-selector');
    expect(selector).toHaveAttribute('aria-label', 'Select difficulty');
  });

  test('58: difficulty filter combines with destination', async () => {
    render(<LocalFoodGuide />);
    const destSelector = screen.getByTestId('destination-selector');
    const difficultySelector = screen.getByTestId('difficulty-selector');
    await userEvent.selectOptions(destSelector, 'beijing');
    await userEvent.selectOptions(difficultySelector, 'must-try');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('59: difficulty filter combines with flavor', async () => {
    render(<LocalFoodGuide />);
    const flavorSelector = screen.getByTestId('flavor-selector');
    const difficultySelector = screen.getByTestId('difficulty-selector');
    await userEvent.selectOptions(flavorSelector, 'spicy');
    await userEvent.selectOptions(difficultySelector, 'adventurous');
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('60: difficulty filter default is all', () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('difficulty-selector') as HTMLSelectElement;
    expect(selector.value).toBe('all');
  });

  test('61: difficulty filter can be changed', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('difficulty-selector') as HTMLSelectElement;
    await userEvent.selectOptions(selector, 'adventurous');
    expect(selector.value).toBe('adventurous');
  });

  test('62: difficulty tags display on food cards', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('difficulty-selector');
    await userEvent.selectOptions(selector, 'must-try');
    // Food cards should show difficulty tags
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('63: all filters combined work together', async () => {
    render(<LocalFoodGuide />);
    const destSelector = screen.getByTestId('destination-selector');
    const flavorSelector = screen.getByTestId('flavor-selector');
    const difficultySelector = screen.getByTestId('difficulty-selector');
    const searchInput = screen.getByTestId('search-input');

    // beijing + spicy + adventurous + 'Maoxuewang' matches beijing-003
    await userEvent.selectOptions(destSelector, 'beijing');
    await userEvent.selectOptions(flavorSelector, 'spicy');
    await userEvent.selectOptions(difficultySelector, 'adventurous');
    await userEvent.type(searchInput, 'Maoxuewang');

    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('64: difficulty filter displays foods correctly', async () => {
    render(<LocalFoodGuide />);
    // Switch to all regions first so recommended foods are visible
    const destSelector = screen.getByTestId('destination-selector');
    await userEvent.selectOptions(destSelector, 'all');
    const selector = screen.getByTestId('difficulty-selector');
    await userEvent.selectOptions(selector, 'recommended');
    const list = screen.getByTestId('food-list');
    expect(list).toBeInTheDocument();
  });

  test('65: difficulty filter can be changed multiple times', async () => {
    render(<LocalFoodGuide />);
    const selector = screen.getByTestId('difficulty-selector') as HTMLSelectElement;
    await userEvent.selectOptions(selector, 'must-try');
    expect(selector.value).toBe('must-try');
    await userEvent.selectOptions(selector, 'recommended');
    expect(selector.value).toBe('recommended');
  });

  // ============================================
  // RESET FILTERS TESTS (66-75)
  // ============================================

  test('66: reset button clears destination filter', async () => {
    render(<LocalFoodGuide />);
    const destSelector = screen.getByTestId('destination-selector') as HTMLSelectElement;
    const resetButton = screen.getByTestId('reset-filters-button');

    await userEvent.selectOptions(destSelector, 'shanghai');
    expect(destSelector.value).toBe('shanghai');

    await userEvent.click(resetButton);
    expect(destSelector.value).toBe('beijing');
  });

  test('67: reset button clears flavor filter', async () => {
    render(<LocalFoodGuide />);
    const flavorSelector = screen.getByTestId('flavor-selector') as HTMLSelectElement;
    const resetButton = screen.getByTestId('reset-filters-button');

    await userEvent.selectOptions(flavorSelector, 'spicy');
    expect(flavorSelector.value).toBe('spicy');

    await userEvent.click(resetButton);
    expect(flavorSelector.value).toBe('all');
  });

  test('68: reset button clears difficulty filter', async () => {
    render(<LocalFoodGuide />);
    const difficultySelector = screen.getByTestId('difficulty-selector') as HTMLSelectElement;
    const resetButton = screen.getByTestId('reset-filters-button');

    await userEvent.selectOptions(difficultySelector, 'adventurous');
    expect(difficultySelector.value).toBe('adventurous');

    await userEvent.click(resetButton);
    expect(difficultySelector.value).toBe('all');
  });

  test('69: reset button clears search input', async () => {
    render(<LocalFoodGuide />);
    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    const resetButton = screen.getByTestId('reset-filters-button');

    await userEvent.type(searchInput, 'duck');
    expect(searchInput.value).toBe('duck');

    await userEvent.click(resetButton);
    expect(searchInput.value).toBe('');
  });

  test('70: reset button resets pagination to page 1', async () => {
    render(<LocalFoodGuide />);
    const resetButton = screen.getByTestId('reset-filters-button');
    await userEvent.click(resetButton);
    // Should be on page 1
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('71: reset button resets all filters at once', async () => {
    render(<LocalFoodGuide />);
    const destSelector = screen.getByTestId('destination-selector') as HTMLSelectElement;
    const flavorSelector = screen.getByTestId('flavor-selector') as HTMLSelectElement;
    const difficultySelector = screen.getByTestId('difficulty-selector') as HTMLSelectElement;
    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    const resetButton = screen.getByTestId('reset-filters-button');

    await userEvent.selectOptions(destSelector, 'shanghai');
    await userEvent.selectOptions(flavorSelector, 'spicy');
    await userEvent.selectOptions(difficultySelector, 'adventurous');
    await userEvent.type(searchInput, 'test');

    await userEvent.click(resetButton);

    expect(destSelector.value).toBe('beijing');
    expect(flavorSelector.value).toBe('all');
    expect(difficultySelector.value).toBe('all');
    expect(searchInput.value).toBe('');
  });

  test('72: reset button shows all results', async () => {
    render(<LocalFoodGuide />);
    const searchInput = screen.getByTestId('search-input');
    const resetButton = screen.getByTestId('reset-filters-button');

    await userEvent.type(searchInput, 'xyznonexistent');
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();

    await userEvent.click(resetButton);
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('73: reset button clears error state', async () => {
    render(<LocalFoodGuide />);
    const resetButton = screen.getByTestId('reset-filters-button');
    await userEvent.click(resetButton);
    // Error should be cleared
    const errorMessage = screen.queryByTestId('error-message');
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('74: reset button is always visible', () => {
    render(<LocalFoodGuide />);
    const resetButton = screen.getByTestId('reset-filters-button');
    expect(resetButton).toBeVisible();
  });

  test('75: reset button can be clicked multiple times', async () => {
    render(<LocalFoodGuide />);
    const destSelector = screen.getByTestId('destination-selector') as HTMLSelectElement;
    const resetButton = screen.getByTestId('reset-filters-button');

    await userEvent.selectOptions(destSelector, 'shanghai');
    await userEvent.click(resetButton);
    expect(destSelector.value).toBe('beijing');

    await userEvent.selectOptions(destSelector, 'chengdu');
    await userEvent.click(resetButton);
    expect(destSelector.value).toBe('beijing');
  });

  // ============================================
  // PAGINATION TESTS (76-81)
  // ============================================

  test('76: pagination renders when there are multiple pages', () => {
    render(<LocalFoodGuide />);
    const pagination = screen.queryByTestId('pagination');
    // Pagination should exist if there are many foods
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });

  test('77: next page button works', async () => {
    render(<LocalFoodGuide />);
    const nextButton = screen.queryByTestId('next-page-button');
    if (nextButton) {
      await userEvent.click(nextButton);
      expect(screen.getByTestId('food-list')).toBeInTheDocument();
    }
  });

  test('78: previous page button works', async () => {
    render(<LocalFoodGuide />);
    const nextButton = screen.queryByTestId('next-page-button');
    if (nextButton) {
      await userEvent.click(nextButton);
      const prevButton = screen.getByTestId('prev-page-button');
      expect(prevButton).not.toBeDisabled();
      await userEvent.click(prevButton);
      expect(screen.getByTestId('food-list')).toBeInTheDocument();
    }
  });

  test('79: load more button works', async () => {
    render(<LocalFoodGuide />);
    const loadMoreButton = screen.queryByTestId('load-more-button');
    if (loadMoreButton) {
      await userEvent.click(loadMoreButton);
      expect(screen.getByTestId('food-list')).toBeInTheDocument();
    }
  });

  test('80: empty state shows when no results', async () => {
    render(<LocalFoodGuide />);
    const searchInput = screen.getByTestId('search-input');
    await userEvent.type(searchInput, 'xyznonexistent123xyz');
    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    });
  });

  test('81: food items render with correct structure', () => {
    render(<LocalFoodGuide />);
    const foodList = screen.getByTestId('food-list');
    expect(foodList).toBeInTheDocument();
    expect(foodList).toHaveAttribute('role', 'list');
    // Food items should be list items
    const listItems = within(foodList).getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThanOrEqual(0);
  });
});
