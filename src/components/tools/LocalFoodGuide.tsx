'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  localFoods,
  getLocalFoodsByDestination,
  getLocalFoodsByFlavor,
  getAllDestinationsWithFood,
  type LocalFood,
} from '@/lib/data/local-foods';

const FLAVOR_OPTIONS = [
  { value: 'all', label: 'All Flavors' },
  { value: 'spicy', label: 'Spicy' },
  { value: 'savory', label: 'Savory' },
  { value: 'sweet', label: 'Sweet' },
  { value: 'umami', label: 'Umami' },
  { value: 'sour', label: 'Sour' },
];

const DIFFICULTY_OPTIONS = [
  { value: 'all', label: 'All Levels' },
  { value: 'must-try', label: 'Must Try' },
  { value: 'recommended', label: 'Recommended' },
  { value: 'adventurous', label: 'Adventurous' },
];

const ITEMS_PER_PAGE = 12;

interface LocalFoodGuideProps {
  defaultDestination?: string;
}

export default function LocalFoodGuide({
  defaultDestination = 'beijing',
}: LocalFoodGuideProps) {
  const [selectedDestination, setSelectedDestination] = useState(defaultDestination);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get unique destinations with foods
  const destinations = useMemo(() => {
    const allDests = getAllDestinationsWithFood();
    return [
      { value: 'all', label: 'All Regions' },
      ...allDests
        .sort()
        .map((dest) => ({
          value: dest,
          label: dest.charAt(0).toUpperCase() + dest.slice(1),
        })),
    ];
  }, []);

  // Debounced search handler
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  // Filter and search foods
  const filteredFoods = useMemo(() => {
    setIsLoading(true);
    setError(null);

    try {
      let filtered = [...localFoods];

      // Filter by destination
      if (selectedDestination !== 'all') {
        filtered = filtered.filter(
          (food) => food.destination === selectedDestination
        );
      }

      // Filter by flavor
      if (selectedFlavor !== 'all') {
        filtered = filtered.filter((food) => food.flavor === selectedFlavor);
      }

      // Filter by difficulty
      if (selectedDifficulty !== 'all') {
        filtered = filtered.filter(
          (food) => food.difficulty === selectedDifficulty
        );
      }

      // Search by name or Chinese name
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (food) =>
            food.name.toLowerCase().includes(query) ||
            food.chineseName.toLowerCase().includes(query) ||
            food.description.toLowerCase().includes(query)
        );
      }

      setIsLoading(false);
      return filtered;
    } catch (err) {
      setError('Failed to filter foods');
      setIsLoading(false);
      return [];
    }
  }, [selectedDestination, selectedFlavor, selectedDifficulty, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredFoods.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFoods = useMemo(
    () => filteredFoods.slice(startIndex, endIndex),
    [filteredFoods, startIndex, endIndex]
  );

  // Reset page when filters change
  const handleDestinationChange = (destination: string) => {
    setSelectedDestination(destination);
    setCurrentPage(1);
  };

  const handleFlavorChange = (flavor: string) => {
    setSelectedFlavor(flavor);
    setCurrentPage(1);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedDestination(defaultDestination);
    setSelectedFlavor('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
    setCurrentPage(1);
    setError(null);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <main className="bg-white" role="main">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 via-amber-50 to-rose-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">
            Local Food Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover authentic Chinese cuisine and local delicacies from every region.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-warm-100">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {/* Search Bar */}
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-accent mb-3">
                Search Foods
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                data-testid="search-input"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Search foods"
              />
            </div>

            {/* Destination Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="destination" className="block text-sm font-semibold text-accent mb-3">
                  Region
                </label>
                <select
                  id="destination"
                  value={selectedDestination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  data-testid="destination-selector"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Select region"
                >
                  {destinations.map((dest) => (
                    <option key={dest.value} value={dest.value}>
                      {dest.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Flavor Filter */}
              <div>
                <label htmlFor="flavor" className="block text-sm font-semibold text-accent mb-3">
                  Flavor Profile
                </label>
                <select
                  id="flavor"
                  value={selectedFlavor}
                  onChange={(e) => handleFlavorChange(e.target.value)}
                  data-testid="flavor-selector"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Select flavor"
                >
                  {FLAVOR_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-semibold text-accent mb-3">
                  Difficulty Level
                </label>
                <select
                  id="difficulty"
                  value={selectedDifficulty}
                  onChange={(e) => handleDifficultyChange(e.target.value)}
                  data-testid="difficulty-selector"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Select difficulty"
                >
                  {DIFFICULTY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reset Button */}
            <div>
              <button
                onClick={handleResetFilters}
                data-testid="reset-filters-button"
                className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                aria-label="Reset all filters"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}–{Math.min(endIndex, filteredFoods.length)} of{' '}
              {filteredFoods.length} items
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
              role="alert"
              data-testid="error-message"
            >
              <p className="font-semibold">Error: {error}</p>
              <button
                onClick={handleResetFilters}
                className="mt-2 text-red-600 underline hover:text-red-800"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredFoods.length === 0 && (
            <div
              className="text-center py-12"
              role="status"
              data-testid="empty-state"
            >
              <p className="text-lg text-gray-500 mb-4">
                No foods found matching your criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div
              className="text-center py-12"
              role="status"
              aria-live="polite"
              data-testid="loading-state"
            >
              <p className="text-lg text-gray-500">Loading foods...</p>
            </div>
          )}

          {/* Food Grid */}
          {!isLoading && filteredFoods.length > 0 && (
            <>
              <ul
                role="list"
                data-testid="food-list"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {paginatedFoods.map((food) => (
                  <li key={food.id} data-testid={`food-item-${food.id}`}>
                    <article className="bg-white border border-warm-100 rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative w-full h-48 bg-gray-200">
                        <Image
                          src={food.imageUrl}
                          alt={`${food.name} - ${food.chineseName}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        {/* Name */}
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold text-accent">
                            {food.name}
                          </h3>
                          <p className="text-sm text-gray-500">{food.chineseName}</p>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mb-4 flex-1">
                          {food.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {food.flavor && (
                            <span
                              className="px-3 py-1 bg-warm-100 text-accent text-xs font-semibold rounded-full"
                              data-testid={`flavor-tag-${food.flavor}`}
                            >
                              {food.flavor}
                            </span>
                          )}
                          {food.difficulty && (
                            <span
                              className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"
                              data-testid={`difficulty-tag-${food.difficulty}`}
                            >
                              {food.difficulty}
                            </span>
                          )}
                        </div>

                        {/* Where to Buy */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-accent mb-2">
                            Where to Buy:
                          </p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {food.whereToBuy.map((place, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{place}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Links */}
                        <div className="flex gap-2 pt-4 border-t border-warm-100">
                          {food.relatedGuideSlug && (
                            <Link
                              href={`/${food.relatedGuideSlug}`}
                              className="flex-1 text-center px-3 py-2 bg-warm-50 text-accent text-xs font-semibold rounded hover:bg-warm-100 transition-colors"
                              data-testid={`guide-link-${food.id}`}
                            >
                              Guide
                            </Link>
                          )}
                          {food.relatedBlogSlug && (
                            <Link
                              href={`/blog/${food.relatedBlogSlug}`}
                              className="flex-1 text-center px-3 py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded hover:bg-blue-100 transition-colors"
                              data-testid={`blog-link-${food.id}`}
                            >
                              Blog
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  className="mt-8 flex flex-col items-center gap-4"
                  data-testid="pagination"
                  role="navigation"
                  aria-label="Food list pagination"
                >
                  <div className="flex gap-2 flex-wrap justify-center">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      data-testid="prev-page-button"
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      aria-label="Previous page"
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          data-testid={`page-${page}-button`}
                          className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                            currentPage === page
                              ? 'bg-primary text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          aria-label={`Go to page ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      )
                    )}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      data-testid="next-page-button"
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </div>

                  {/* Load More Button */}
                  {currentPage < totalPages && (
                    <button
                      onClick={handleLoadMore}
                      data-testid="load-more-button"
                      className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
                      aria-label="Load more items"
                    >
                      Load More
                    </button>
                  )}

                  {/* Current Page Info */}
                  <p className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-primary to-rose-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Ready to Explore These Flavors?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book a China tour or create a custom itinerary that includes these
            culinary experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Browse Tours
            </Link>
            <Link
              href="/tailor-made"
              className="px-8 py-3 bg-white/20 border border-white text-white font-bold rounded-lg hover:bg-white/30 transition-all"
            >
              Custom Itinerary
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
