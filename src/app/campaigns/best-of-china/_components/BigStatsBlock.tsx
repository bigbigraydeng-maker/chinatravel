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
  /** Optional extra line under `sub` (the early bird label). */
  note?: string;
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
];

/** The lead-in price card: its numeral and note follow the price the page is showing. */
function leadInStat(price: string, priceNote?: string): Stat {
  return {
    number: price.replace(/^NZD\s*/i, ''),
    label: 'NZD lead-in',
    sub: 'Auckland return flights included',
    note: priceNote,
  };
}

interface BigStatsBlockProps {
  /** Lead-in price in site format (the early bird price while that promotion is open). */
  price: string;
  /** Small label shown under an early bird price. */
  priceNote?: string;
}

export default function BigStatsBlock({ price, priceNote }: BigStatsBlockProps) {
  const stats = [...STATS, leadInStat(price, priceNote)];
  return (
    <section
      aria-label="Best of China at a glance"
      className="bg-white py-12 md:py-16 border-y border-warm-100"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 max-w-6xl mx-auto">
          {stats.map((s, idx) => (
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
              {s.note && <p className="mt-1 text-xs md:text-sm text-primary leading-snug">{s.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
