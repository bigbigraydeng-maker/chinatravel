'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DestinationGuide } from '@/lib/data/guides';

type Category = 'all' | 'cities' | 'yunnan' | 'landmarks' | 'regions' | 'discovery';

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: 'all',       label: 'All Guides',     emoji: '' },
  { id: 'cities',    label: 'Major Cities',   emoji: '🏙️' },
  { id: 'yunnan',    label: 'Yunnan',         emoji: '🌄' },
  { id: 'landmarks', label: 'Landmarks',      emoji: '🏯' },
  { id: 'regions',   label: 'Scenic Regions', emoji: '🛶' },
  { id: 'discovery', label: 'Discovery Tours',emoji: '✈️' },
];

const SLUG_CATEGORY: Record<string, Category> = {
  'beijing-travel-guide':                    'cities',
  'xian-travel-guide':                       'cities',
  'shanghai-travel-guide':                   'cities',
  'chengdu-travel-guide':                    'cities',
  'guilin-travel-guide':                     'cities',
  'zhangjiajie-travel-guide':               'cities',
  'yunnan-travel-guide':                     'yunnan',
  'lijiang-travel-guide':                    'yunnan',
  'dali-travel-guide':                       'yunnan',
  'kunming-travel-guide':                    'yunnan',
  'shangri-la-travel-guide':                 'yunnan',
  'great-wall-travel-guide':                 'landmarks',
  'forbidden-city-travel-guide':             'landmarks',
  'terracotta-warriors-travel-guide':        'landmarks',
  'leshan-buddha-travel-guide':              'landmarks',
  'tianmen-mountain-travel-guide':           'landmarks',
  'yangshuo-travel-guide':                   'regions',
  'li-river-travel-guide':                   'regions',
  'hangzhou-travel-guide':                   'regions',
  'suzhou-travel-guide':                     'regions',
  'chongqing-travel-guide':                  'regions',
  'beijing-xian-discovery-guide':            'discovery',
  'chongqing-chengdu-discovery-guide':       'discovery',
  'shanghai-surroundings-discovery-guide':   'discovery',
};

const FEATURED_SLUGS = [
  'zhangjiajie-travel-guide',
  'guilin-travel-guide',
  'beijing-travel-guide',
];

function GuideCard({ guide, featured = false }: { guide: DestinationGuide; featured?: boolean }) {
  const categoryLabel = CATEGORIES.find(c => c.id === SLUG_CATEGORY[guide.slug])?.label ?? 'Guide';

  return (
    <Link
      href={`/${guide.slug}`}
      className="block group relative overflow-hidden rounded-2xl shadow-md bg-gray-900"
    >
      <div className={`relative w-full overflow-hidden ${featured ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
        <Image
          src={guide.heroImage}
          alt={guide.destinationName}
          fill
          sizes={
            featured
              ? '(max-width: 768px) 100vw, 33vw'
              : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
          }
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${guide.heroImageClassName ?? ''}`}
          loading="lazy"
        />

        {/* gradient overlay — always visible for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        {/* category badge */}
        <span className="absolute top-3 left-3 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
          {categoryLabel}
        </span>

        {/* text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3
            className={`font-serif font-bold text-white leading-tight ${
              featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
            }`}
          >
            {guide.destinationName}
          </h3>
          <p className="text-white/75 text-sm mt-0.5 line-clamp-1">
            {guide.heroSubtitle}
          </p>
          <span className="inline-flex items-center gap-1 mt-2 text-amber-300 text-xs font-medium group-hover:gap-2 transition-all duration-200">
            Explore guide <span>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

interface Props {
  guides: DestinationGuide[];
}

export default function GuideExplorer({ guides }: Props) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const isDefault = search === '' && activeCategory === 'all';

  const filtered = useMemo(() => {
    return guides.filter(g => {
      const matchesCategory = activeCategory === 'all' || SLUG_CATEGORY[g.slug] === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        q === '' ||
        g.destinationName.toLowerCase().includes(q) ||
        g.heroSubtitle.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [guides, search, activeCategory]);

  const featured = useMemo(
    () =>
      FEATURED_SLUGS.map(slug => guides.find(g => g.slug === slug)).filter(
        Boolean
      ) as DestinationGuide[],
    [guides]
  );

  // When showing default view, feature 3 up top and exclude them from the main grid
  const gridGuides = isDefault
    ? filtered.filter(g => !FEATURED_SLUGS.includes(g.slug))
    : filtered;

  return (
    <div>
      {/* ── Sticky search + filter bar ────────────────────────── */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md border-b border-warm-100 py-3">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search input */}
            <div className="relative w-full sm:w-60 flex-shrink-0">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search destinations…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-warm-50"
              />
            </div>

            {/* Category tabs — horizontally scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-0.5 flex-1 min-w-0">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-warm-50 text-gray-600 hover:bg-warm-100'
                  }`}
                >
                  {cat.emoji && <span className="mr-1">{cat.emoji}</span>}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="container py-12 pb-24">
        {/* Featured — only on default (no search, no filter) */}
        {isDefault && featured.length > 0 && (
          <div className="mb-14">
            <div className="flex items-baseline gap-3 mb-5">
              <h2 className="text-2xl font-bold font-serif text-accent">Featured Destinations</h2>
              <span className="text-sm text-gray-400">Most inspiring journeys</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featured.map(g => (
                <GuideCard key={g.id} guide={g} featured />
              ))}
            </div>
          </div>
        )}

        {/* Results count when filtering */}
        {!isDefault && (
          <p className="text-sm text-gray-500 mb-6">
            {filtered.length} guide{filtered.length !== 1 ? 's' : ''} found
            {search && (
              <>
                {' '}for &ldquo;<span className="font-medium text-accent">{search}</span>&rdquo;
              </>
            )}
          </p>
        )}

        {/* Section heading for default view */}
        {isDefault && (
          <div className="flex items-baseline gap-3 mb-5">
            <h2 className="text-2xl font-bold font-serif text-accent">Browse All 24 Guides</h2>
            <span className="text-sm text-gray-400">Complete library</span>
          </div>
        )}

        {/* Guide grid */}
        {gridGuides.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gridGuides.map(g => (
              <GuideCard key={g.id} guide={g} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-semibold text-accent mb-2">No guides found</p>
            <p className="text-gray-500 text-sm mb-4">
              Try a different search term or browse all categories.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('all'); }}
              className="text-primary text-sm underline underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-warm-50 to-warm-100 rounded-2xl text-center">
          <h3 className="text-2xl font-bold font-serif text-accent mb-3">Ready to Plan Your Journey?</h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm md:text-base">
            Our China specialists are ready to craft your perfect itinerary — tailored to your dates, interests, and pace.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/china-tours"
              className="bg-primary text-white px-8 py-3 rounded-full hover:shadow-lg transition-shadow font-medium text-sm"
            >
              View China Tours
            </Link>
            <Link
              href="/contact"
              className="border-2 border-primary text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-colors font-medium text-sm"
            >
              Talk to a Specialist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
