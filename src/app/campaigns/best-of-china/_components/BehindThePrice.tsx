import { Icon, type IconName } from '@/components/ui/Icon';
import type { Tour } from '@/lib/data/tours';

const ICONS: IconName[] = ['plane', 'building', 'users', 'utensils'];
const ACCENTS = [
  'from-sky-50 to-sky-100 border-sky-100',
  'from-amber-50 to-amber-100 border-amber-100',
  'from-emerald-50 to-emerald-100 border-emerald-100',
  'from-rose-50 to-rose-100 border-rose-100',
];

export default function BehindThePrice({ tour }: { tour: Tour }) {
  const inclusions = tour.inclusions.map((body, index) => ({
    body,
    icon: ICONS[index % ICONS.length],
    accent: ACCENTS[index % ACCENTS.length],
  }));
  return (
    <section aria-label={`What's included in ${tour.price}`} className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-primary mb-2">Tour inclusions</p>
        <h2 className="text-center text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
          What {tour.price} includes
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">Current inclusions published for {tour.name}.</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {inclusions.map((item, index) => (
            <li key={`${index}-${item.body}`} className={`relative bg-gradient-to-br ${item.accent} border rounded-2xl p-6 flex flex-col`}>
              <div className="w-11 h-11 rounded-full bg-white/80 backdrop-blur flex items-center justify-center mb-3 shadow-sm">
                <Icon name={item.icon} className="w-5 h-5 text-gray-800" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>
        {tour.exclusions.length > 0 && (
          <p className="text-center text-xs text-gray-500 mt-8 max-w-3xl mx-auto">
            Not included: {tour.exclusions.join(' · ')}
          </p>
        )}
      </div>
    </section>
  );
}
