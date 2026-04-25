# LocalFoodGuide - Quick Reference Guide

## Component Location
```
/src/components/tools/LocalFoodGuide.tsx (534 lines)
```

## Usage

### Basic Usage
```tsx
import LocalFoodGuide from '@/components/tools/LocalFoodGuide';

export default function Page() {
  return <LocalFoodGuide />;
}
```

### With Default Destination
```tsx
<LocalFoodGuide defaultDestination="shanghai" />
```

## Component Props

```typescript
interface LocalFoodGuideProps {
  defaultDestination?: string; // Default: 'beijing'
}
```

## Features at a Glance

| Feature | Status | Details |
|---------|--------|---------|
| Region Selector | ✅ | Dropdown with all destinations |
| Search Input | ✅ | Debounced, searches name/Chinese/description |
| Flavor Filter | ✅ | 5 options: spicy, savory, sweet, umami, sour |
| Difficulty Filter | ✅ | 3 options: must-try, recommended, adventurous |
| Food Grid | ✅ | Responsive 1-2-3 columns (mobile-tablet-desktop) |
| Food Cards | ✅ | Image, name, Chinese name, description, tags |
| Where to Buy | ✅ | Locations/restaurant names |
| Related Links | ✅ | Links to guide and blog posts |
| Reset Filters | ✅ | Clears all filters and search |
| Pagination | ✅ | 12 items per page, next/prev/load more |
| Empty State | ✅ | Shows when no results found |
| Loading State | ✅ | Shows during filtering |
| Error State | ✅ | Shows errors with retry button |

## Data Requirements

The component requires data from `/src/lib/data/local-foods.ts`:

```typescript
// Foods array
localFoods: LocalFood[]

// Helper functions
getLocalFoodsByDestination(destination: string): LocalFood[]
getAllDestinationsWithFood(): string[]

// Interface
interface LocalFood {
  id: string;
  name: string;
  chineseName: string;
  destination: string;
  destinationName: string;
  description: string;
  imageUrl: string;
  whereToBuy: string[];
  flavor: 'spicy' | 'savory' | 'sweet' | 'umami' | 'sour';
  difficulty: 'must-try' | 'recommended' | 'adventurous';
  relatedBlogSlug?: string;
  relatedGuideSlug?: string;
  season?: string;
}
```

## State Variables

```typescript
selectedDestination: string           // Current region filter
searchQuery: string                   // Search text
selectedFlavor: string                // Flavor filter value
selectedDifficulty: string            // Difficulty filter value
currentPage: number                   // Pagination page
isLoading: boolean                    // Loading state
error: string | null                  // Error message
```

## Constants

```typescript
const FLAVOR_OPTIONS = [
  'all', 'spicy', 'savory', 'sweet', 'umami', 'sour'
]

const DIFFICULTY_OPTIONS = [
  'all', 'must-try', 'recommended', 'adventurous'
]

const ITEMS_PER_PAGE = 12
```

## Test File Location
```
/src/components/tools/__tests__/LocalFoodGuide.test.tsx (688 lines, 81 tests)
```

## Test Categories

1. **Rendering (10 tests)** - Component structure, accessibility
2. **Destination Selector (10 tests)** - Filter selection, state
3. **Search (15 tests)** - Text search, filtering
4. **Flavor Filter (15 tests)** - All 5 flavors, combinations
5. **Difficulty Filter (15 tests)** - All 3 levels, combinations
6. **Reset Filters (10 tests)** - Complete state reset
7. **Pagination (6 tests)** - Navigation, empty states

## Accessibility Features

- Semantic HTML (main, section, article, ul, li)
- ARIA labels on all controls
- Role attributes (main, list, status, navigation, alert)
- aria-current for active page
- aria-live for dynamic updates
- Keyboard navigation (Tab, Enter)
- Focus management
- WCAG AA compliant colors

## Performance Optimizations

- useMemo for filtered results
- useMemo for destination list
- useMemo for paginated foods
- useCallback for event handlers
- Pagination (12 items per page)
- Next.js Image optimization
- No unnecessary re-renders

## Styling

- Tailwind CSS throughout
- Design tokens:
  - `primary` - orange/amber
  - `accent` - dark navy
  - `warm-50`, `warm-100`, `warm-200` - beige tones
- Responsive padding: `px-4` (mobile) to `px-4 container` (desktop)
- Touch-friendly buttons: minimum 48px
- Hover states on all interactive elements

## Data Flow

```
User Input (filters/search)
         ↓
React State Update
         ↓
useMemo recalculates filteredFoods
         ↓
Pagination applied
         ↓
UI renders paginatedFoods
```

## Common Tasks

### Change Default Destination
```tsx
<LocalFoodGuide defaultDestination="xian" />
```

### Change Items Per Page
Edit `const ITEMS_PER_PAGE = 12` in component (line 26)

### Add New Flavor
1. Add to `localFoods.ts`: `flavor: 'new-flavor'`
2. Add to `FLAVOR_OPTIONS` in component

### Add New Difficulty Level
1. Add to `localFoods.ts`: `difficulty: 'new-level'`
2. Add to `DIFFICULTY_OPTIONS` in component

## Error Handling

The component handles:
- Empty search results (shows empty state)
- No foods for destination (shows empty state)
- Filter errors (shows error message)
- Retry functionality (reset filters button)

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers
- Screen readers

## Known Limitations

- Search is text-only (no pinyin)
- No rating system
- No price filtering
- No dietary restriction filters

## Build & Deployment

```bash
# Build
npm run build

# Verify
npm run build

# Check
# If successful, ready to deploy to Render
```

## File Organization

```
src/
├── components/
│   ├── tools/
│   │   ├── LocalFoodGuide.tsx         (Component)
│   │   └── __tests__/
│   │       └── LocalFoodGuide.test.tsx (Tests)
├── lib/
│   ├── data/
│   │   └── local-foods.ts            (Data)
├── app/
│   └── local-food-guide/
│       └── page.tsx                  (Page route)
```

## Page Routes

- **Live:** `https://chinatravel-zloe.onrender.com/local-food-guide`
- **Local Dev:** `http://localhost:3000/local-food-guide`

## Environment

- Next.js 14.0.0
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.0

## Testing (Once Jest is configured)

```bash
npm test -- LocalFoodGuide
npm test -- LocalFoodGuide --coverage
```

## Quick Checklist for Updates

- [ ] Update data in `local-foods.ts`
- [ ] Run `npm run build` to verify
- [ ] Check component renders correctly
- [ ] Test filters work with new data
- [ ] Verify no TypeScript errors
- [ ] Check responsive design
- [ ] Deploy to Render (auto-deploys on git push)

## Support

For issues or questions:
1. Check test file for expected behavior
2. Review data structure in `local-foods.ts`
3. Verify component props
4. Check browser console for errors
5. Test with different filters/searches
