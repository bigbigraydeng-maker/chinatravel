import Image from 'next/image';
import { CTS_PHONE_DISPLAY, CTS_PHONE_HOURS, CTS_PHONE_HREF } from '@/lib/site';
import { BTN_GOLD, BTN_ON_DARK, EYEBROW_GOLD, PDF_FILENAME, PDF_HREF, SERIF, WRAP } from './styles';

export default function ClosingBand({ pdfSize }: { pdfSize: string | null }) {
  return (
    <section aria-labelledby="closing-title" className="bg-[#1A1815] py-14 text-white sm:py-20">
      <div className={`${WRAP} grid items-center gap-8 md:grid-cols-[200px_1fr]`}>
        <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-secondary md:h-48 md:w-48">
          <Image src="/images/baker-gu-portrait.jpg" alt="Baker Gu, China Travel Specialist" fill sizes="192px" className="object-cover" />
        </div>
        <div>
          <p className={EYEBROW_GOLD}>Your China specialist</p>
          <h2 id="closing-title" className={`${SERIF} mt-3 text-[2.25rem] font-bold leading-tight sm:text-5xl`}>
            Talk to the person who built the <span className="text-secondary">trip.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[19px] leading-relaxed text-white/90">
            Baker Gu personally designs and quality-checks every CTS journey. When you enquire, you are not
            talking to a call centre: you are talking to the person who built the trip.
          </p>
          <p className="mt-6">
            <a href={CTS_PHONE_HREF} className={`${SERIF} text-[2rem] font-bold text-secondary underline-offset-4 hover:underline`}>
              {CTS_PHONE_DISPLAY}
            </a>
            <span className="ml-3 text-[17px] text-white/80">{CTS_PHONE_HOURS}</span>
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={CTS_PHONE_HREF} className={BTN_GOLD}>
              Call us
            </a>
            <a href={PDF_HREF} download={PDF_FILENAME} className={`${BTN_ON_DARK} flex-wrap`}>
              <span>Download the PDF brochure</span>
              {pdfSize && <span className="whitespace-nowrap text-[15px] font-normal text-white/80">(PDF · {pdfSize})</span>}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
