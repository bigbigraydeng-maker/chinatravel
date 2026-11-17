import Link from 'next/link';
import type { BrochureCard } from '@/lib/brochure/picker';
import type { StopoverRow } from '@/lib/brochure/view';
import { EYEBROW_RED, GOLD_ON_LIGHT, LEDE, LINE, LINK, SERIF, TITLE, WRAP } from './styles';

export function Stopovers({ rows }: { rows: StopoverRow[] }) {
  if (rows.length === 0) return null;
  return (
    <section id="stopovers" aria-labelledby="stopovers-title" className={`${WRAP} scroll-mt-24 py-14 sm:py-20`}>
      <p className={EYEBROW_RED}>China Stopover · {rows.length} {rows.length === 1 ? 'route' : 'routes'}</p>
      <h2 id="stopovers-title" className={`${TITLE} mt-3`}>
        Turn the transit into the <span className="text-primary">trip.</span>
      </h2>
      <p className={`${LEDE} mt-4`}>
        Flying to Europe, Japan, South Korea or home to New Zealand? Add a short guided stay in one Chinese city:
        hotel, guide, transfers and admissions arranged. Stopovers are a land package; the international airfare is
        arranged separately. Prices per person, twin share.
      </p>
      <ul className={`mt-8 border-t ${LINE} bg-white sm:grid sm:grid-cols-2 sm:gap-x-8 sm:border-0 sm:bg-transparent`}>
        {rows.map((r) => (
          <li key={r.path} className={`border-b ${LINE} bg-white sm:bg-transparent`}>
            <Link href={r.path} className="grid min-h-[56px] grid-cols-[4.5rem_1fr_auto] items-center gap-3 px-3 py-3 text-[17px] hover:bg-surface">
              <span className={`${SERIF} font-bold ${GOLD_ON_LIGHT}`}>{r.days > 0 ? `${r.days} days` : ''}</span>
              <span className="font-semibold text-ink underline-offset-4 hover:underline">{r.place}</span>
              <span className={`${SERIF} whitespace-nowrap text-right font-bold text-ink`}>{r.price}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AsiaCards({ cards }: { cards: BrochureCard[] }) {
  if (cards.length === 0) return null;
  return (
    <section aria-labelledby="asia-title" className={`${WRAP} pb-14 sm:pb-20`}>
      <h2 id="asia-title" className={TITLE}>
        Japan and <span className="text-primary">Vietnam.</span>
      </h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {cards.map((c) => (
          <article key={c.path} className={`flex flex-col border ${LINE} bg-white p-6`}>
            <h3 className={`${SERIF} text-[1.4rem] font-bold leading-tight text-ink`}>{c.name}</h3>
            <p className="mt-2 text-[17px]">
              {c.duration} · from <b className="text-primary">{c.price}</b> per person, twin share
            </p>
            <p className="mt-2 flex-1 text-[17px] text-ink-muted">
              {c.departures.length > 0
                ? `Departures: ${c.departures.join(', ')}${c.moreDepartures > 0 ? ` + ${c.moreDepartures} more` : ''}`
                : 'Ask us for upcoming dates'}
            </p>
            <Link href={c.path} className={`mt-4 inline-flex min-h-[44px] items-center text-[17px] ${LINK}`}>
              See this tour
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
