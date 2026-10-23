import { Metadata } from 'next';
import Link from 'next/link';
import DestinationGuide from '@/components/seo/DestinationGuide';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getGuideBySlug } from '@/lib/data/guides';
import { getSiteUrl } from '@/lib/site';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getPublishedTourBySlug } from '@/lib/data/published-tour-catalog';

/** The linked tour facts and departures come from ME's published catalogue. */
export const revalidate = 15;

const SLUG = 'terracotta-warriors-travel-guide';
export async function generateMetadata(): Promise<Metadata> {
  const guide = getGuideBySlug(SLUG);
  if (!guide) return { title: 'Travel Guide | CTS Tours' };

  return buildCtsPageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/${SLUG}`,
    ogImagePath: guide.heroImage,
    ogImageAlt: guide.h1,
    keywords: guide.keywords,
    ogType: 'article',
    openGraphTitle: guide.metaTitle,
    openGraphDescription: guide.metaDescription,
  });
}

export default async function GuidePage() {
  const siteUrl = getSiteUrl();
  const guide = getGuideBySlug(SLUG);
  if (!guide) return <div className="text-center py-20 text-gray-500">Guide not found</div>;

  const taleTour = await getPublishedTourBySlug('china', 'discovery', 'beijing-xian');
  const taleAvailable = taleTour?.isActive && !taleTour.soldOut;
  const taleDepartures = taleTour?.departureDates?.join(' & ');

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.h1,
      description: guide.metaDescription,
      image: `${guide.heroImage.startsWith('http') ? guide.heroImage : `${siteUrl}${guide.heroImage}`}`,
      datePublished: guide.createdAt,
      dateModified: guide.updatedAt,
      author: { '@type': 'Organization', name: 'CTS Tours', url: siteUrl },
      publisher: {
        '@type': 'Organization',
        name: 'CTS Tours',
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: `${siteUrl}/images/cts-logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/${SLUG}` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Travel Guides', item: `${siteUrl}/china-tours` },
        { '@type': 'ListItem', position: 3, name: guide.destinationName, item: `${siteUrl}/${SLUG}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: 'Terracotta Warriors Tour from New Zealand',
      description: 'Xi\'an\'s Terracotta Warriors are the centrepiece of CTS Tours\' Tale of Two Cities itinerary — Beijing + Xi\'an by high-speed train, hand-crafted for Kiwi travellers from our Auckland office, backed by China Travel Service.',
      itinerary: {
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'TouristAttraction', name: 'Terracotta Warriors Museum (Pits 1, 2, 3)' },
          { '@type': 'TouristAttraction', name: 'Emperor Qin Shi Huang\'s Mausoleum' },
          { '@type': 'TouristAttraction', name: 'Xi\'an City Wall' },
          { '@type': 'TouristAttraction', name: 'Muslim Quarter' },
        ],
      },
      touristType: ['Cultural travellers', 'Heritage tourism', 'History enthusiasts'],
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'NZD',
        lowPrice: '3480',
        availability: 'https://schema.org/InStock',
        url: `${siteUrl}/tours/china/discovery/beijing-xian`,
      },
      provider: { '@type': 'Organization', name: 'CTS Tours', url: siteUrl },
    },
  ];

  return (
    <>
      <SchemaMarkup data={schema} />
      {/* Trust signal strip */}
      <section className="bg-warm-50 border-b border-warm-200 py-3">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <span className="font-semibold text-accent">CTS Tours</span>
          {' · '}Trusted by 1,200+ Kiwi travellers
          {' · '}China specialists — Auckland-based, backed by CTS
          {' · '}ATAS accredited
          {' · '}Auckland-based experts
        </div>
      </section>
      <DestinationGuide guide={guide} />
      {/* Specialist expertise section */}
      <section className="bg-warm-50 py-10 border-t border-warm-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">CTS Tours Specialists</p>
          <h3 className="font-serif text-xl font-semibold text-accent mb-4">
            Crafting China tours for Kiwis
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Our Tale of Two Cities itinerary is led by CTS specialists who know the ground in
            China, ensuring our Kiwi travellers experience the Terracotta Warriors with the depth and
            access that mass-market operators simply cannot offer.
          </p>
        </div>
      </section>
      <section className="bg-warm-50 border-t border-warm-200 py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-semibold text-accent mb-3">
            Visit the Terracotta Warriors with CTS
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Our Xi&apos;an packages include guided visits to the Terracotta Army with licensed local guides. NZD pricing, Auckland-based team.
          </p>
          <a
            href="/xian-tours"
            className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Explore Xi&apos;an Tours →
          </a>
        </div>
      </section>
      {/* Next departures CTA */}
      <section className="bg-accent text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-wider mb-2 opacity-80">Current tour availability</p>
          <h2 className="font-serif text-3xl font-semibold mb-3">
            Includes Terracotta Warriors
          </h2>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            {taleAvailable ? <>{taleTour.name} · {taleTour.duration} · {taleTour.price}.{' '}{taleDepartures ? `Departures ${taleDepartures}.` : 'Ask us for the next departure.'} Includes guided Terracotta Warriors visit.</> : 'Explore current Xi’an tours and ask CTS for an active departure.'}{' '}
            <Link href="/china-visa-guide-for-new-zealanders" className="underline opacity-90 hover:opacity-100">
              NZ passport holders enter China visa-free
            </Link>
            {' '}— no application required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={taleAvailable ? '/tours/china/discovery/beijing-xian' : '/xian-tours'}
              className="inline-block bg-white text-accent px-8 py-3 rounded-full font-semibold hover:bg-warm-50 transition"
            >
              {taleAvailable ? `See ${taleTour.name} departures →` : 'Explore Xi’an tours →'}
            </Link>
            <Link
              href="/china-tours-from-new-zealand"
              className="inline-block border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition"
            >
              Browse All China Tours from NZ →
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
