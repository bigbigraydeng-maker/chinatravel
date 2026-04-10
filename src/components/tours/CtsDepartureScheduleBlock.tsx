import Link from 'next/link';
import {
  CHINA_DISCOVERY_DEPARTURES,
  CHINA_SIGNATURE_DEPARTURES,
  tourPath,
  type DepartureScheduleRow,
} from '@/lib/data/departure-schedule';

interface CtsDepartureScheduleBlockProps {
  /** Highlight the current tour row on detail pages */
  currentSlug?: string;
  className?: string;
}

function RowGrid({
  rows,
  currentSlug,
}: {
  rows: DepartureScheduleRow[];
  currentSlug?: string;
}) {
  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const active = currentSlug === row.slug;
        return (
          <div
            key={row.slug}
            className={`grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-6 py-3 px-4 rounded-xl border transition-colors ${
              active
                ? 'bg-primary/5 border-primary/40 ring-1 ring-primary/20'
                : 'bg-white border-warm-100 hover:border-warm-200'
            }`}
          >
            <div className="min-w-0">
              <Link
                href={tourPath(row)}
                className={`font-serif font-semibold text-base hover:text-primary transition-colors ${
                  active ? 'text-primary' : 'text-gray-900'
                }`}
              >
                {row.label}
              </Link>
              <p className="text-xs text-gray-500 mt-0.5 capitalize">
                {row.tier} · China
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end sm:items-center">
              {row.dates.map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center text-sm font-medium px-3 py-1 rounded-full bg-warm-50 text-gray-800 border border-warm-100"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CtsDepartureScheduleBlock({
  currentSlug,
  className = '',
}: CtsDepartureScheduleBlockProps) {
  return (
    <section
      id="cts-departure-schedule"
      className={`rounded-2xl border border-warm-200 bg-gradient-to-b from-warm-50/80 to-white p-6 md:p-8 shadow-sm ${className}`}
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
          CTS Tours departure schedule
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Group departures from New Zealand (dates as published). Contact us to reserve a seat or request a private
          departure.
        </p>
      </div>

      <div className="space-y-10">
        <div>
          <h3 className="text-lg font-serif font-bold text-amber-800 mb-4 flex items-center gap-2">
            <span aria-hidden>⭐</span>
            Signature series departures
          </h3>
          <RowGrid rows={CHINA_SIGNATURE_DEPARTURES} currentSlug={currentSlug} />
        </div>

        <div>
          <h3 className="text-lg font-serif font-bold text-blue-800 mb-4 flex items-center gap-2">
            <span aria-hidden>⭐</span>
            Discovery series departures
          </h3>
          <RowGrid rows={CHINA_DISCOVERY_DEPARTURES} currentSlug={currentSlug} />
        </div>
      </div>
    </section>
  );
}
