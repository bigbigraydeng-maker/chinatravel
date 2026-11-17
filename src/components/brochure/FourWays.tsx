import Link from 'next/link';
import type { BrochureView, CollectionSummary } from '@/lib/brochure/view';
import { EYEBROW_RED, LEDE, LINE, LINK, SERIF, TITLE, WRAP } from './styles';

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}

function Card({ label, title, href, linkText, children }: {
  label: string;
  title: string;
  href: string;
  linkText: string;
  children: React.ReactNode;
}) {
  return (
    <article className={`flex flex-col border ${LINE} bg-white p-6 sm:p-7`}>
      <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">{label}</p>
      <h3 className={`${SERIF} mt-2 text-[1.6rem] font-bold leading-tight text-ink`}>{title}</h3>
      <p className="mt-3 flex-1 text-[17px] leading-relaxed text-ink-muted">{children}</p>
      <Link href={href} className={`mt-4 inline-flex min-h-[44px] items-center text-[17px] ${LINK}`}>
        {linkText}
      </Link>
    </article>
  );
}

function collectionLabel(c: CollectionSummary): string {
  return `${plural(c.tours, 'tour')} · ${plural(c.departures, 'departure')}`;
}

export default function FourWays({ view }: { view: BrochureView }) {
  const { discovery, signature } = view;
  return (
    <section aria-labelledby="four-ways" className={`${WRAP} py-14 sm:py-20`}>
      <p className={EYEBROW_RED}>How this brochure works</p>
      <h2 id="four-ways" className={`${TITLE} mt-3`}>
        Four ways to travel with <span className="text-primary">CTS.</span>
      </h2>
      <p className={`${LEDE} mt-4`}>
        Guided tours with scheduled departures, short stopovers, and a tailor-made desk if none of them is quite
        your trip. Here is the quickest way to narrow it down.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {discovery && (
          <Card label={collectionLabel(discovery)} title="Discovery Collection" href="#discovery-collection" linkText="See the Discovery tours">
            The classic routes, {discovery.minDays} to {discovery.maxDays} days. This is where most first trips to
            China start. From <b className="text-ink">{discovery.fromPrice}</b> per person.
          </Card>
        )}
        {signature && (
          <Card label={collectionLabel(signature)} title="Signature Collection" href="#signature-collection" linkText="See the Signature tours">
            Longer and further: {signature.minDays} to {signature.maxDays} days, river cruises and first-class
            high-speed rail on selected journeys. From <b className="text-ink">{signature.fromPrice}</b> per person.
          </Card>
        )}
        {view.stopoverCount > 0 && (
          <Card label={plural(view.stopoverCount, 'route')} title="Stopovers" href="#stopovers" linkText="See the stopovers">
            {view.stopoverMinDays} to {view.stopoverMaxDays} days in one Chinese city, to slot into a journey to
            Europe, Japan, South Korea or home to New Zealand.
            {view.stopoverFrom && (
              <>
                {' '}From <b className="text-ink">{view.stopoverFrom}</b> per person, land package.
              </>
            )}
          </Card>
        )}
        <Card label="Your own trip" title="Tailor-made" href="/tailor-made" linkText="Start a tailor-made trip">
          Your dates, your pace, your interests. A specialist shapes the route with you before anything is booked.
          No obligation.
        </Card>
      </div>
    </section>
  );
}
