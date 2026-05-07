'use client';

import { useState } from 'react';

interface MonthData {
  label: string;
  short: string;
  season: string;
  seasonEmoji: string;
  weather: string;
  crowds: 'Low' | 'Moderate' | 'High' | 'Very High';
  highlights: string;
  bestFor: string[];
  rating: 1 | 2 | 3 | 4 | 5;
}

const MONTHS: MonthData[] = [
  {
    label: 'January', short: 'Jan', season: 'Winter', seasonEmoji: '❄️',
    weather: 'Cold north (Beijing –5°C), mild south (Yunnan 15–20°C)',
    crowds: 'Low', highlights: 'Clear skies, crisp air, great for photography',
    bestFor: ['Photography', 'Great Wall', 'Yunnan'], rating: 3,
  },
  {
    label: 'February', short: 'Feb', season: 'Chinese New Year', seasonEmoji: '🎆',
    weather: 'Cold north, mild south — Lunar New Year period',
    crowds: 'Very High', highlights: 'Festive celebrations, lantern festivals, unique atmosphere',
    bestFor: ['Cultural immersion', 'Festivals', 'Family trips'], rating: 3,
  },
  {
    label: 'March', short: 'Mar', season: 'Early Spring', seasonEmoji: '🌱',
    weather: 'Warming up (10–20°C), spring flowers starting',
    crowds: 'Low', highlights: 'Plum blossoms, comfortable for hiking, fewer crowds',
    bestFor: ['Hiking', 'Photography', 'Guilin'], rating: 4,
  },
  {
    label: 'April', short: 'Apr', season: 'Spring', seasonEmoji: '🌸',
    weather: 'Mild and pleasant (15–25°C), cherry blossoms in full bloom',
    crowds: 'Moderate', highlights: 'Best for cherry blossoms, green landscapes, perfect temps',
    bestFor: ['All regions', 'Hiking', 'Photography'], rating: 5,
  },
  {
    label: 'May', short: 'May', season: 'Late Spring', seasonEmoji: '☀️',
    weather: 'Warm (20–30°C), occasional rain beginning in the south',
    crowds: 'Moderate', highlights: 'Lush greenery, perfect weather before summer heat',
    bestFor: ['General tourism', 'Outdoor activities', 'Xi\'an'], rating: 5,
  },
  {
    label: 'June', short: 'Jun', season: 'Early Summer', seasonEmoji: '🌤️',
    weather: 'Hot in cities (28–35°C), rainy season south',
    crowds: 'Moderate', highlights: 'Shoulder season, good for mountains and Yunnan',
    bestFor: ['Yunnan', 'Zhangjiajie', 'Mountain areas'], rating: 3,
  },
  {
    label: 'July', short: 'Jul', season: 'Summer', seasonEmoji: '🌞',
    weather: 'Hot and humid (30–38°C), frequent rain',
    crowds: 'High', highlights: 'Summer school holidays, lush scenery post-rain',
    bestFor: ['Chengdu pandas', 'Northern grasslands', 'Cool highlands'], rating: 2,
  },
  {
    label: 'August', short: 'Aug', season: 'Summer', seasonEmoji: '☀️',
    weather: 'Very hot and humid (30–38°C), peak summer',
    crowds: 'High', highlights: 'Rice terraces at their greenest in Yunnan and Guilin',
    bestFor: ['Yunnan terraces', 'Guilin waterways'], rating: 2,
  },
  {
    label: 'September', short: 'Sep', season: 'Early Autumn', seasonEmoji: '🍃',
    weather: 'Cooling down (20–28°C), less rain, clearer skies',
    crowds: 'Moderate', highlights: 'Ideal conditions return, harvest season, crisp air',
    bestFor: ['Beijing', 'Xi\'an', 'Photography'], rating: 5,
  },
  {
    label: 'October', short: 'Oct', season: 'Autumn', seasonEmoji: '🍁',
    weather: 'Cool and clear (15–22°C), autumn foliage begins',
    crowds: 'Very High', highlights: 'Golden Week holiday (first week), then quieter with stunning colour',
    bestFor: ['Foliage viewing', 'All regions', 'Photography'], rating: 4,
  },
  {
    label: 'November', short: 'Nov', season: 'Late Autumn', seasonEmoji: '🍂',
    weather: 'Cool to cold (8–18°C), dry and clear',
    crowds: 'Low', highlights: 'Autumn foliage peak, minimal crowds, great value',
    bestFor: ['Guilin', 'Yunnan', 'Chengdu'], rating: 4,
  },
  {
    label: 'December', short: 'Dec', season: 'Winter', seasonEmoji: '⛄',
    weather: 'Cold north (Beijing –5 to 5°C), mild south',
    crowds: 'Low', highlights: 'Fewer tourists, good value, Christmas–New Year tours',
    bestFor: ['Yunnan warmth', 'Off-season exploration', 'Value travel'], rating: 3,
  },
];

const CROWD_CONFIG: Record<MonthData['crowds'], { label: string; colour: string; bars: number }> = {
  Low:       { label: 'Low',       colour: 'bg-green-400',  bars: 1 },
  Moderate:  { label: 'Moderate',  colour: 'bg-yellow-400', bars: 2 },
  High:      { label: 'High',      colour: 'bg-orange-400', bars: 3 },
  'Very High': { label: 'Very High', colour: 'bg-red-400',  bars: 4 },
};

const RATING_LABEL: Record<number, string> = {
  1: 'Not recommended',
  2: 'Possible, but challenging',
  3: 'Good',
  4: 'Very good',
  5: 'Excellent',
};

export default function MonthPickerWidget() {
  const [selected, setSelected] = useState<number | null>(null);
  const month = selected !== null ? MONTHS[selected] : null;
  const crowd = month ? CROWD_CONFIG[month.crowds] : null;

  return (
    <section
      id="month-picker"
      className="bg-warm-50 border-y border-warm-200 py-10 px-4 scroll-mt-24"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-6">
          <p className="text-primary font-semibold uppercase tracking-wider text-xs mb-1">
            Interactive guide
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
            When Are You Planning to Travel?
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Select a month to see weather, crowds, and what to expect.
          </p>
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-1.5 mb-6">
          {MONTHS.map((m, i) => (
            <button
              key={m.short}
              onClick={() => setSelected(i === selected ? null : i)}
              aria-pressed={i === selected}
              className={`flex flex-col items-center gap-0.5 rounded-xl py-2 px-1 text-xs font-medium border-2 transition-all ${
                i === selected
                  ? 'border-primary bg-primary text-white shadow-md'
                  : 'border-warm-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <span className="text-base">{m.seasonEmoji}</span>
              <span>{m.short}</span>
              <div className="flex gap-0.5 mt-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <div
                    key={s}
                    className={`w-1 h-1 rounded-full ${
                      s < m.rating
                        ? i === selected ? 'bg-white' : 'bg-primary'
                        : i === selected ? 'bg-primary/30' : 'bg-warm-200'
                    }`}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {month && crowd ? (
          <div className="bg-white rounded-2xl border border-warm-200 shadow-sm p-6 animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  {month.seasonEmoji} {month.label} — {month.season}
                </h3>
                <p className="text-sm text-primary font-medium mt-0.5">
                  Overall: {RATING_LABEL[month.rating]}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-xs text-gray-500 mb-1">Crowd level</p>
                <div className="flex gap-1 justify-end">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-5 rounded-sm ${i < crowd.bars ? crowd.colour : 'bg-warm-100'}`}
                    />
                  ))}
                </div>
                <p className="text-xs font-medium text-gray-700 mt-1">{crowd.label}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-warm-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Weather</p>
                <p className="text-sm text-gray-700">{month.weather}</p>
              </div>
              <div className="bg-warm-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Highlights</p>
                <p className="text-sm text-gray-700">{month.highlights}</p>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Best for</p>
              <div className="flex flex-wrap gap-2">
                {month.bestFor.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="/tailor-made"
              className="inline-flex items-center justify-center w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition"
            >
              Plan a {month.label} trip with CTS →
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-warm-300 p-8 text-center text-gray-400 text-sm">
            Select a month above to see your travel window
          </div>
        )}
      </div>
    </section>
  );
}
