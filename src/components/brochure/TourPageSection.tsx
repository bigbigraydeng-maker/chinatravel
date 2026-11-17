'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { DepartureRow, TourPage } from '@/lib/brochure/view';
import { CallAction, OpenPanel, type CallMeState, type QuizPayload } from './CallMe';
import { BTN_RED, GOLD_ON_LIGHT, LINE, LINK, PDF_FILENAME, PDF_HREF, SECT, SERIF } from './styles';

function Stat({ label, value, detail }: { label: string; value: React.ReactNode; detail: React.ReactNode }) {
  return (
    <div className="border-t-[5px] border-secondary bg-surface px-3 pb-4 pt-3 sm:px-4">
      <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-muted">{label}</p>
      <p className={`${SERIF} mt-1 whitespace-nowrap text-[1.2rem] font-bold leading-tight text-ink sm:text-[1.6rem]`}>{value}</p>
      <p className="mt-1 text-[16px] leading-snug text-ink-muted">{detail}</p>
    </div>
  );
}

function DepartureTable({ rows }: { rows: DepartureRow[] }) {
  const showReturns = rows.every((r) => r.returns !== null);
  return (
    <table className="w-full border-collapse text-left text-[17px]">
      <thead>
        <tr className="border-b-2 border-secondary bg-surface text-[13px] uppercase tracking-[0.14em] text-ink-muted">
          <th scope="col" className="px-2 py-2 font-bold sm:px-3">Departs Auckland</th>
          {showReturns && <th scope="col" className="hidden px-3 py-2 font-bold sm:table-cell">Returns</th>}
          <th scope="col" className="px-2 py-2 text-right font-bold sm:px-3">Per person</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={`${r.date}-${i}`} className={`border-b ${LINE}`}>
            <td className="px-2 py-3 sm:px-3">
              <span className="block whitespace-nowrap font-semibold">{r.departs}</span>
              {showReturns && <span className="block whitespace-nowrap text-[16px] text-ink-muted sm:hidden">Returns {r.returns}</span>}
            </td>
            {showReturns && <td className="hidden whitespace-nowrap px-3 py-3 sm:table-cell">{r.returns}</td>}
            <td className={`${SERIF} whitespace-nowrap px-2 py-3 text-right align-top font-bold text-primary sm:px-3 sm:align-middle`}>{r.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function TourPageSection({ tour, call, quiz }: { tour: TourPage; call: CallMeState; quiz: QuizPayload | null }) {
  const origin = tour.anchor;
  const titleId = `${tour.anchor}-title`;
  return (
    <article id={tour.anchor} aria-labelledby={titleId} className={`scroll-mt-24 overflow-hidden border ${LINE} bg-white`}>
      <div className="relative isolate flex min-h-[300px] items-end bg-[#1A1815] sm:min-h-[360px]">
        <Image src={tour.heroImage} alt="" fill sizes="(min-width: 1024px) 1024px, 100vw" className="-z-20 object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,18,16,.62)_0%,rgba(20,18,16,.10)_34%,rgba(20,18,16,.72)_72%,rgba(20,18,16,.96)_100%)]"
        />
        <p className="absolute left-0 top-0 bg-secondary py-2 pl-5 pr-5 text-[13px] font-bold uppercase tracking-[0.18em] text-[#2A2009] sm:pl-8">
          {tour.flag}
        </p>
        <div className="w-full px-5 pb-6 pt-16 text-white sm:px-8 sm:pb-8">
          <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-white/80">
            Tour {String(tour.index).padStart(2, '0')} · {tour.collection}
          </p>
          <h3 id={titleId} className={`${SERIF} mt-2 text-[2.1rem] font-bold leading-[1.08] sm:text-[2.75rem]`}>
            {tour.name}
          </h3>
          <p className="mt-2 text-[17px] leading-snug text-white/90">
            {tour.days > 0 && `${tour.days} days · `}From Auckland ·{' '}
            <b className="font-semibold text-secondary">{tour.when ?? 'Enquire for dates'}</b>
          </p>
          {tour.route && <p className="mt-1 text-[17px] text-white/85">{tour.route}</p>}
        </div>
      </div>

      <div className="px-5 py-7 sm:px-8 sm:py-9">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="From" value={tour.fromPrice} detail="per person, twin share" />
          {tour.solo && <Stat label="Solo room" value={tour.solo.price} detail={tour.solo.note ?? 'private room, full tour'} />}
          {tour.meals && (
            <Stat
              label="Meals"
              value={`${tour.meals.total} included`}
              detail={`${tour.meals.breakfast} B · ${tour.meals.lunch} L · ${tour.meals.dinner} D`}
            />
          )}
          {tour.hotels && (
            <Stat label="Hotels" value={tour.hotels.stars} detail={tour.hotels.orSimilar ? 'or similar' : ''} />
          )}
        </div>

        <div className="mt-9 grid gap-9 md:grid-cols-[1.35fr_1fr]">
          {tour.highlights.length > 0 && (
            <div>
              <h4 className={SECT}>Highlights{tour.days > 0 ? ` across ${tour.days} days` : ''}</h4>
              <ol className="space-y-3">
                {tour.highlights.map((h, i) => (
                  <li key={`${i}-${h}`} className="grid grid-cols-[2rem_1fr] text-[17px] leading-relaxed">
                    <span className={`${SERIF} font-bold ${GOLD_ON_LIGHT}`} aria-hidden="true">{i + 1}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div>
            {tour.inclusions.length > 0 && (
              <>
                <h4 className={SECT}>Fully included</h4>
                <ul className="space-y-2.5">
                  {tour.inclusions.map((x, i) => (
                    <li key={`${i}-${x}`} className="relative pl-6 text-[17px] leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-2.5 before:w-2.5 before:rounded-full before:bg-primary">
                      {x}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {tour.exclusions.length > 0 && (
              <>
                <h4 className={`${SECT} mt-7`}>Not included</h4>
                <ul className="space-y-2.5">
                  {tour.exclusions.map((x, i) => (
                    <li key={`${i}-${x}`} className="relative pl-6 text-[17px] leading-relaxed text-ink-muted before:absolute before:left-0 before:top-[0.6em] before:h-2.5 before:w-2.5 before:rounded-full before:bg-[#C3BAAE]">
                      {x}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="mt-9">
          <h4 className={SECT}>
            {tour.departures.length > 0 ? 'Scheduled departures' : 'Departures'}
          </h4>
          {tour.departures.length > 0 ? (
            <div className="overflow-x-auto">
              <DepartureTable rows={tour.departures} />
            </div>
          ) : (
            <p className="border-l-4 border-secondary bg-surface px-5 py-4 text-[17px]">
              <b>No departure is scheduled yet.</b> Call us and we will tell you the next available date.
            </p>
          )}
          <p className="mt-3 text-[16px] text-ink-muted">
            Prices per person, twin share, NZ dollars. Scheduled group departures, confirm at booking.
          </p>
        </div>

        <div className={`mt-8 flex flex-col gap-3 border-t ${LINE} pt-6 sm:flex-row sm:flex-wrap sm:items-center`}>
          <Link href={tour.path} className={BTN_RED}>
            See full itinerary
          </Link>
          <CallAction call={call} origin={origin} tourPath={tour.path} tourName={tour.name} label="Ask Baker to call me about this tour" />
          <a href={PDF_HREF} download={PDF_FILENAME} className={`inline-flex min-h-[48px] items-center px-2 text-[17px] ${LINK}`}>
            Download the PDF brochure
          </a>
        </div>
        <OpenPanel call={call} origin={origin} quiz={quiz} />
      </div>
    </article>
  );
}

