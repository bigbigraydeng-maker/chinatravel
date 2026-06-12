import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTourBySlug } from '@/lib/data/tours';
import TrustBar from '@/components/TrustBar';
import TourEnquiry from '@/components/tours/TourEnquiry';
import Testimonials from '@/components/Testimonials';
import ChongqingCustomEnquiry from '@/components/campaigns/ChongqingCustomEnquiry';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Icon, type IconName } from '@/components/ui/Icon';
import { getSiteUrl } from '@/lib/site';

const HERO_IMAGE =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/migrated/unsplash/photo-1581252584837-95f73fd23574.jpg';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'Chongqing Tours from New Zealand | Packages & Custom Itineraries | CTS Tours',
    description:
      'Explore Chongqing with CTS Tours — China\'s cyberpunk mountain city. Choose our 10-day Chongqing & Chengdu package, or build a custom itinerary with Beijing, Shanghai, and more. NZ-based experts.',
    path: '/campaigns/chongqing',
    ogImagePath: HERO_IMAGE,
    ogImageAlt: 'Chongqing night skyline — Hongyadong cliffside buildings',
    keywords: [
      'Chongqing tours New Zealand',
      'Chongqing travel package NZ',
      'custom China itinerary Chongqing',
      'Chongqing Chengdu tour',
      'Hongyadong tour',
      'Liziba Station tour',
    ],
  });
}

const WHY_CARDS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'building',
    title: 'Cyberpunk skyline',
    body: 'A city of 32 million people built vertically into river gorges — neon cliffs, metro through a building, sky bridges at 250m.',
  },
  {
    icon: 'utensils',
    title: 'Hotpot capital of China',
    body: 'Birthplace of Chinese hotpot. Beef tallow, Sichuan pepper, split pots for non-spicy — this is the original.',
  },
  {
    icon: 'landmark',
    title: 'Ancient temples in a modern city',
    body: 'Luohan Temple\'s 524 individual Buddhist statues sit minutes from glass skyscrapers. Nowhere else does contrast like this.',
  },
  {
    icon: 'bridge',
    title: 'Best night views in China',
    body: 'Hongyadong lit gold above the river. Nanfeng Cliff looking back at the peninsula. The skyline after dark is extraordinary.',
  },
];

type FaqItem = { q: string; a: string; link?: { label: string; href: string } };

const FAQS: FaqItem[] = [
  {
    q: 'Is all the food spicy? What if I can\'t eat spicy food?',
    a: 'No. Most hotpot restaurants offer a split pot (鸳鸯锅) — spicy on one side, mild chicken broth on the other. The mild side is genuinely mild. Noodles, dumplings, and plenty of non-spicy dishes are widely available.',
  },
  {
    q: 'Can I combine Chongqing with Beijing or Shanghai?',
    a: 'Absolutely — that\'s what our tailor-made option is for. Popular combinations are Beijing + Chongqing (10 days) and Beijing + Chongqing + Shanghai (14 days). Just describe your idea in the enquiry form and we\'ll build a quote.',
  },
  {
    q: 'Where can I see pandas near Chongqing?',
    a: 'Giant pandas are in Chengdu, about 90 minutes by high-speed train. Our Fire & Fuzz tour includes both cities. Or we can add Chengdu to your custom itinerary.',
  },
  {
    q: 'Do New Zealanders need a visa for China?',
    a: 'NZ passport holders currently enter China visa-free for up to 30 days (policy valid to 31 Dec 2026). Always verify the latest requirements before booking.',
    link: { label: 'China visa guide for NZ travellers →', href: '/china-visa-guide-for-new-zealanders' },
  },
];

export default function ChongqingLandingPage() {
  const tour = getTourBySlug('china', 'discovery', 'chongqing-chengdu');
  const siteUrl = getSiteUrl();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'CTS Tours',
    url: siteUrl,
    description: 'New Zealand\'s specialist China tour operator — packages and custom itineraries.',
  };

  return (
    <>
      <SchemaMarkup data={[schema]} />

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Chongqing night skyline — Hongyadong cliffside buildings above the Jialing River"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
            CTS Tours · New Zealand
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Chongqing — China&apos;s Most Electrifying City
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
            Hongyadong · Liziba Monorail · Raffles Sky Bridge · Hot Pot Capital of the World
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#packages"
              className="inline-block bg-primary text-white font-semibold px-7 py-3 rounded-lg hover:opacity-90 transition text-base"
            >
              View Tour Packages →
            </a>
            <a
              href="#custom"
              className="inline-block bg-white/15 border border-white/50 text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/25 transition text-base backdrop-blur-sm"
            >
              Plan a Custom Trip
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <TrustBar />

      {/* ── Why Chongqing ── */}
      <section className="py-16 bg-warm-50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-center text-accent mb-2">
            Why Chongqing?
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
            It went viral on social media for a reason. Here&apos;s what actually makes it worth your travel days.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100 hover:shadow-md transition"
              >
                <Icon name={card.icon} className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-serif font-bold text-lg text-accent mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/chongqing-travel-guide"
              className="text-primary font-semibold hover:underline text-sm"
            >
              Read the full Chongqing travel guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tour Packages ── */}
      <section id="packages" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-center text-accent mb-2">
            Two Ways to Explore Chongqing
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            A ready-to-book package, or a custom itinerary built around your interests.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* ── Packaged tour card ── */}
            <div className="rounded-2xl border-2 border-primary/20 overflow-hidden flex flex-col">
              <div className="relative h-52">
                <Image
                  src={HERO_IMAGE}
                  alt="China Discovery — Fire & Fuzz: Chongqing & Chengdu"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Packaged Tour
                </span>
                <span className="absolute bottom-3 right-3 bg-white text-accent text-sm font-bold px-3 py-1 rounded-full">
                  {tour?.price ?? 'From NZD $2,999'}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl font-bold text-accent mb-1">
                  China Discovery — Fire &amp; Fuzz
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {tour?.duration ?? '10 Days'} · Chongqing + Chengdu · Small group
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                  Chongqing&apos;s neon skyline, Liziba monorail, and UNESCO Dazu Rock Carvings — then Chengdu&apos;s giant pandas by bullet train. Expert English guide throughout. Departs 1 November 2026.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 mb-5">
                  <li className="flex items-start gap-2"><Icon name="check" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Hongyadong, Liziba &amp; Raffles City</li>
                  <li className="flex items-start gap-2"><Icon name="check" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Dazu Rock Carvings (UNESCO)</li>
                  <li className="flex items-start gap-2"><Icon name="check" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Giant Panda Base, Chengdu</li>
                  <li className="flex items-start gap-2"><Icon name="check" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> Bullet train between cities</li>
                  <li className="flex items-start gap-2"><Icon name="check" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> NZD pricing, NZ-based team</li>
                </ul>
                <div className="space-y-2">
                  <Link
                    href="/campaigns/fire-fuzz"
                    className="block text-center bg-primary text-white font-semibold py-3 px-5 rounded-lg hover:opacity-90 transition"
                  >
                    View Tour Details →
                  </Link>
                  <Link
                    href="/tours/china/discovery/chongqing-chengdu"
                    className="block text-center border border-primary/30 text-primary font-semibold py-2.5 px-5 rounded-lg hover:bg-primary/5 transition text-sm"
                  >
                    Full itinerary &amp; dates
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Tailor-made card ── */}
            <div id="custom" className="rounded-2xl border-2 border-gray-200 overflow-hidden flex flex-col scroll-mt-20">
              <div className="bg-accent px-6 py-5">
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                  Tailor-Made
                </span>
                <h3 className="font-serif text-xl font-bold text-white mb-1">
                  Build Your Custom Itinerary
                </h3>
                <p className="text-white/80 text-sm">
                  Want Beijing + Chongqing? Add Shanghai? Travel at New Year?
                  Tell us your idea — we&apos;ll design it.
                </p>
              </div>
              <div className="p-6 flex-1">
                <div className="flex flex-wrap gap-2 mb-5">
                  {['Beijing + Chongqing', 'Chongqing + Shanghai', '+Chengdu pandas', 'New Year trip', 'Family group', 'Couple'].map((tag) => (
                    <span key={tag} className="text-xs bg-warm-50 border border-warm-200 text-gray-600 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <ChongqingCustomEnquiry />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Tour Enquiry sidebar (packaged) ── */}
      {tour && (
        <section className="py-12 bg-warm-50 border-t border-warm-100">
          <div className="container mx-auto px-4 max-w-lg">
            <h2 className="font-serif text-2xl font-bold text-center text-accent mb-2">
              Enquire About the Fire &amp; Fuzz Tour
            </h2>
            <p className="text-center text-gray-600 text-sm mb-6">
              Questions about the packaged Chongqing &amp; Chengdu tour? Send us a message.
            </p>
            <TourEnquiry
              tourName={tour.name}
              tourSlug={tour.slug}
              destination={tour.destination}
              tier={tour.tier}
              source="Landing Page — Chongqing Campaign"
            />
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-center text-accent mb-10">
            Common Questions
          </h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-b border-gray-100 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                {faq.link && (
                  <Link href={faq.link.href} className="text-primary text-sm font-medium hover:underline mt-1 inline-block">
                    {faq.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/chongqing-travel-guide#faqs"
              className="text-primary font-semibold hover:underline text-sm"
            >
              More questions answered in the Chongqing travel guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials variant="full" tourFilter="discovery" />
    </>
  );
}
