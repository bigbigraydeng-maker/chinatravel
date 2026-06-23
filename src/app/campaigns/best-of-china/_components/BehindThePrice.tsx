import { Icon, type IconName } from '@/components/ui/Icon';

/**
 * Four-card breakdown of what NZD $3,880 actually buys — pre-empts the
 * "is that all-inclusive?" objection that paid visitors quietly ask
 * before filling the lead form. Each card states one inclusion category
 * with a 1-line plain-English answer.
 */
interface Inclusion {
  icon: IconName;
  title: string;
  body: string;
  accent: string;
}

const ITEMS: Inclusion[] = [
  {
    icon: 'plane',
    title: 'Return Flights',
    body: 'International airfares Auckland ↔ China included in the headline price.',
    accent: 'from-sky-50 to-sky-100 border-sky-100',
  },
  {
    icon: 'building',
    title: 'Hotels & Transfers',
    body: '3–4★ hotels across 4 cities · all airport, city & day-tour transfers.',
    accent: 'from-amber-50 to-amber-100 border-amber-100',
  },
  {
    icon: 'users',
    title: 'English Guides',
    body: 'Local CTS guides on the ground in every city, plus a single tour leader end-to-end.',
    accent: 'from-emerald-50 to-emerald-100 border-emerald-100',
  },
  {
    icon: 'utensils',
    title: 'Meals & Entries',
    body: 'Daily breakfasts, most lunches, and all entrance fees per the day-by-day itinerary.',
    accent: 'from-rose-50 to-rose-100 border-rose-100',
  },
];

export default function BehindThePrice() {
  return (
    <section
      aria-label="What's included in the NZD $3,880 price"
      className="bg-white py-12 md:py-16"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-primary mb-2">
          Behind the price
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
          What NZD $3,880 actually covers
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          No add-ons, no FX surprises. This is what every Kiwi booking on Best of China gets,
          confirmed in NZD before you pay a deposit.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {ITEMS.map((it) => (
            <li
              key={it.title}
              className={`relative bg-gradient-to-br ${it.accent} border rounded-2xl p-6 flex flex-col`}
            >
              <div className="w-11 h-11 rounded-full bg-white/80 backdrop-blur flex items-center justify-center mb-3 shadow-sm">
                <Icon name={it.icon} className="w-5 h-5 text-gray-800" />
              </div>
              <h3 className="text-lg md:text-xl font-serif font-bold text-gray-900 mb-2">
                {it.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{it.body}</p>
            </li>
          ))}
        </ul>

        <p className="text-center text-xs text-gray-500 mt-8 max-w-3xl mx-auto">
          Exclusions: travel insurance, personal expenses, tips, single-room supplement.
          Wellington / Christchurch / regional NZ departures use a connecting domestic flight
          to Auckland, quoted separately.
        </p>
      </div>
    </section>
  );
}
