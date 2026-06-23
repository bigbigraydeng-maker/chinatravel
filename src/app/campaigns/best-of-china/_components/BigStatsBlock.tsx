/**
 * Large-numerals visual stat block for /campaigns/best-of-china.
 *
 * Four conversion-relevant data points rendered as oversized serif numerals
 * — designed to read in a single glance and reinforce the headline
 * differentiators that won on the RSA-3a ad angle (price + length + cities
 * + NZ tenure). Sits between the badge row and the Quick Answer so the
 * paid visitor builds the "why this tour, why CTS" picture before scrolling
 * into the longer-form sections.
 */
interface Stat {
  number: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  {
    number: '4',
    label: 'Cities',
    sub: 'Beijing · Xi’an · Hangzhou · Shanghai',
  },
  {
    number: '15',
    label: 'Days',
    sub: 'Comfortable, immersive pace',
  },
  {
    number: '$3,880',
    label: 'NZD lead-in',
    sub: 'Auckland return flights included',
  },
  {
    number: '25',
    label: 'Years in NZ',
    sub: 'Backed by CTS — global since 1928',
  },
];

export default function BigStatsBlock() {
  return (
    <section
      aria-label="Best of China at a glance"
      className="bg-white py-12 md:py-16 border-y border-warm-100"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 max-w-6xl mx-auto">
          {STATS.map((s, idx) => (
            <div
              key={s.label}
              className={`text-center px-4 md:px-6 ${
                idx > 0 ? 'md:border-l md:border-warm-100' : ''
              }`}
            >
              <p className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-b from-amber-600 via-amber-700 to-orange-700 bg-clip-text text-transparent leading-none mb-2">
                {s.number}
              </p>
              <p className="text-sm md:text-base font-bold uppercase tracking-wider text-gray-900 mb-1.5">
                {s.label}
              </p>
              <p className="text-xs md:text-sm text-gray-600 leading-snug">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
