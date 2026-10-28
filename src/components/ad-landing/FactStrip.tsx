import type { Tour } from '@/lib/data/tours';
import type { HeroFacts } from '@/lib/ad-landing/facts';

/**
 * The four facts a visitor wants before reading anything else, straight from the tour data: how long, when it next
 * leaves, what it costs and what the price includes. A fact the data does not have is left out, never filled in.
 */
export default function FactStrip({ tour, facts }: { tour: Tour; facts: HeroFacts }) {
  const items: { label: string; value: string; note?: string }[] = [{ label: 'Duration', value: tour.duration }];
  if (facts.firstDeparture) {
    items.push({
      label: 'Next departure',
      value: facts.firstDeparture,
      note: facts.firstReturn ? `Returns ${facts.firstReturn}` : undefined,
    });
  }
  if (facts.fromPrice) items.push({ label: 'From', value: facts.fromPrice, note: 'per person, twin share' });
  if (facts.airfareLine) items.push({ label: 'Included', value: facts.airfareLine });

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-warm-200 bg-warm-200 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
      {items.map((item) => (
        <div key={item.label} className="bg-white p-4 [&:last-child:nth-child(odd)]:col-span-2 lg:[&:last-child:nth-child(odd)]:col-span-1">
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{item.label}</dt>
          <dd className="mt-1 font-serif text-lg leading-snug text-gray-900">
            {item.value}
            {item.note ? <span className="mt-0.5 block font-sans text-sm text-gray-600">{item.note}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
