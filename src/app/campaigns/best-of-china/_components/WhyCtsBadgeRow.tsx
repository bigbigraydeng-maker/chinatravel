import { Icon, type IconName } from '@/components/ui/Icon';

/**
 * Five-icon trust badge row sitting just below the hero on the Best of China
 * campaign LP. Conveys the differentiation message in a single visual scan:
 * who we are + why we're trustworthy + what's tangible (NZD pricing, NZ team).
 * Mirrors the angle that won on RSA-3a in Google Ads ("4 China Tours, 25
 * Years NZ, backed by CTS since 1928") but in visual form.
 */
interface Badge {
  icon: IconName;
  title: string;
  body: string;
}

const BADGES: Badge[] = [
  {
    icon: 'shield',
    title: 'TAANZ-Bonded',
    body: 'Financial protection on every booking',
  },
  {
    icon: 'sparkles',
    title: '25 Years in NZ',
    body: 'Backed by CTS — global brand since 1928',
  },
  {
    icon: 'heart',
    title: 'Kiwi-Led, Auckland Office',
    body: 'NZ team handles every booking end-to-end',
  },
  {
    icon: 'star',
    title: 'Direct China Operations',
    body: 'Our China team, not a reseller chain',
  },
  {
    icon: 'check',
    title: 'NZD Pricing · No FX Surprises',
    body: 'Final price, in your currency, up front',
  },
];

export default function WhyCtsBadgeRow() {
  return (
    <section
      aria-label="Why book with CTS"
      className="bg-gradient-to-b from-warm-50 to-white border-y border-warm-100 py-10"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-primary mb-6">
          Why book Best of China with CTS
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
          {BADGES.map((b) => (
            <li
              key={b.title}
              className="bg-white rounded-xl border border-warm-100 px-4 py-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center mb-2.5">
                <Icon name={b.icon} filled className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 leading-snug">
                {b.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{b.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
