import Image from 'next/image';
import Link from 'next/link';

const MILESTONES = [
  { date: '24 Dec', label: 'Christmas Eve', place: 'Shanghai' },
  { date: '25 Dec', label: 'Christmas Day', place: 'Zhujiajiao' },
  { date: '31 Dec', label: "New Year’s Eve", place: "Xi’an" },
];

export default function FestiveChinaPreview() {
  return (
    <section id="festive-china" className="scroll-mt-24 overflow-hidden bg-ink text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="relative grid h-[440px] grid-cols-[1.08fr_0.92fr] gap-3 sm:h-[520px]">
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="/images/campaigns/christmas-new-year/shanghai-christmas-street.webp"
              alt="Shanghai Nanjing Road illuminated at night during the festive season"
              fill
              sizes="(max-width: 1024px) 55vw, 24vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-3 py-8">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/campaigns/christmas-new-year/great-wall-winter-light.webp"
                alt="The Great Wall in clear winter light"
                fill
                sizes="(max-width: 1024px) 40vw, 20vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/campaigns/christmas-new-year/xian-new-year-night.webp"
                alt="Lantern-lit streets in Xi'an at night"
                fill
                sizes="(max-width: 1024px) 40vw, 20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            A Kiwi guide to festive China
          </span>
          <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            China in winter, without the guesswork.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Worried it will be too cold? See how the journey balances Shanghai lights, Beijing&apos;s crisp winter
            landmarks and a lively New Year&apos;s Eve in Xi&apos;an — plus exactly what to pack.
          </p>

          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-3">
            {MILESTONES.map((item) => (
              <div key={item.date} className="bg-white/[0.06] px-5 py-5 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">{item.date}</p>
                <p className="mt-2 font-serif text-lg">{item.label}</p>
                <p className="mt-1 text-sm text-white/60">{item.place}</p>
              </div>
            ))}
          </div>

          <Link
            href="/christmas-new-year-china"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-lg transition-colors hover:bg-red-700"
          >
            See the festive journey <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
