import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import SectionTitle from '@/components/SectionTitle';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import RelatedGuides from '@/components/seo/RelatedGuides';
import HubHero from '@/components/seo/HubHero';
import VisaGuideOctoberCampaignCtas from '@/components/seo/VisaGuideOctoberCampaignCtas';
import { generateArticleSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { chinaVisaGuideMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: chinaVisaGuideMeta.title,
    description: chinaVisaGuideMeta.description,
    path: '/china-visa-guide-for-new-zealanders',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg',
    ogImageAlt: 'China visa-free entry for New Zealand passport holders — requirements and documents',
    keywords: ['China visa free New Zealand', 'NZ passport China entry', 'China visa requirements', '30 day visa free China', 'China travel documents'],
    ogType: 'article',
  });
}

export default function ChinaVisaGuidePage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/china-tours' },
    { name: 'NZ entry guide', url: '/china-visa-guide-for-new-zealanders' }
  ];

  const schemas = [
    generateArticleSchema(
      chinaVisaGuideMeta.title,
      chinaVisaGuideMeta.description,
      '/china-visa-guide-for-new-zealanders'
    ),
    generateBreadcrumbListSchema(breadcrumbs)
  ];

  const relatedGuides = [
    {
      title: 'Best Time to Visit China',
      slug: 'best-time-to-visit-china',
      description: 'Month-by-month guide for planning your trip'
    },
    {
      title: 'All China Tours',
      slug: 'china-tours',
      description: 'Browse our complete Signature, Discovery, and Stopover collections'
    }
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && <span className="text-gray-400">/</span>}
                <a href={crumb.url} className="hover:text-primary transition-colors">
                  {crumb.name}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <HubHero
        title={chinaVisaGuideMeta.h1}
        subtitle={chinaVisaGuideMeta.heroSubtitle}
      />

      {/* Main Content */}
      <article className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Introduction */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Overview
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {chinaVisaGuideMeta.introText}
                </p>
              </section>

              {/* Visa-Free Entry Requirements */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  ✅ Visa-Free Entry: What You Need
                </h2>
                <div className="bg-green-50 border-l-4 border-green-600 p-8 rounded-r-lg mb-8">
                  <p className="text-lg text-green-900 font-semibold mb-3">
                    🎉 Good news: You don't need a visa application!
                  </p>
                  <p className="text-green-900">
                    Simply show these documents at immigration when you arrive in China. No forms, no processing fees, no waiting time.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      📋 Required at Immigration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          step: 1,
                          item: 'Valid Passport',
                          detail: 'New Zealand passport valid for your stay (no specific 6-month requirement for visa-free entry, but recommended)',
                          required: true
                        },
                        {
                          step: 2,
                          item: 'Return Flight Booking',
                          detail: 'Proof of onward/return flight. Must be dated within 30 days of entry.',
                          required: true
                        },
                        {
                          step: 3,
                          item: 'Proof of Accommodation',
                          detail: 'Hotel booking, CTS tour itinerary, Airbnb reservation, or invitation letter showing you have a place to stay.',
                          required: true
                        },
                        {
                          step: 4,
                          item: 'Sufficient Funds',
                          detail: 'Be prepared to show you can support yourself (credit cards, cash). Officials may ask informally but usually don\'t require bank statements for visa-free entry.',
                          required: false
                        }
                      ].map((doc) => (
                        <div key={doc.step} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                              {doc.step}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-bold text-gray-900">
                              {doc.item}
                              {doc.required && <span className="text-red-600 ml-2">*</span>}
                            </h4>
                            <p className="text-sm text-gray-700">{doc.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">* = Essential</p>
                  </div>
                </div>
              </section>

              {/* Before You Travel */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  ✈️ Before You Travel
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      action: 'Check Passport Validity',
                      detail: 'Ensure your NZ passport is valid and has blank pages for entry stamps.'
                    },
                    {
                      action: 'Book Your Flights',
                      detail: 'When booking, look for flights to major hubs: Beijing, Shanghai, Guangzhou, Xi\'an, Chengdu. All have visa-free immigration processing.'
                    },
                    {
                      action: 'Book CTS Tour or Accommodation',
                      detail: 'Secure your CTS tour booking or hotel reservation to present at immigration.'
                    },
                    {
                      action: 'Arrange Travel Insurance',
                      detail: 'While visa-free, comprehensive travel insurance is still strongly recommended (covers medical, cancellations, etc.)'
                    },
                    {
                      action: 'Download Useful Apps',
                      detail: 'WeChat Pay, Alipay (for payments), Baidu Maps (Google Maps doesn\'t work in China), Pleco (translation)'
                    },
                    {
                      action: 'Notify Your Bank',
                      detail: 'Let your NZ bank know your travel dates so they don\'t block international transactions.'
                    }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                      <div className="font-bold text-primary whitespace-nowrap min-w-fit">{step.action}</div>
                      <div className="text-gray-700">{step.detail}</div>
                    </div>
                  ))}
                </div>
              </section>

              <VisaGuideOctoberCampaignCtas />

              {/* Eligibility & Exceptions */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  ⚠️ When You Still Need a Visa
                </h2>
                <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg mb-6">
                  <p className="text-amber-900 font-semibold">
                    The visa-free policy applies to tourism, business, family visits, and transit only.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      type: 'Work or Employment',
                      description: 'If you\'re being employed in China or working remotely for a Chinese company, you need a Z-Visa (Work Visa).',
                      solution: 'Apply at the Embassy before you travel. Allow 4-6 weeks.'
                    },
                    {
                      type: 'Study or Internship',
                      description: 'Students enrolled in Chinese institutions need an X-Visa (Study Visa) regardless of duration.',
                      solution: 'Your school will provide acceptance letter and JW202 form. Apply at the Embassy.'
                    },
                    {
                      type: 'Staying Longer Than 30 Days',
                      description: 'If your itinerary exceeds 30 days, you can\'t use visa-free entry. You\'d need to apply for an L-Visa or other category.',
                      solution: 'Book a shorter tour (30 days max), or apply for an L-Visa before departure.'
                    },
                    {
                      type: 'Residence or Long-Term Stay',
                      description: 'Moving to China, starting a business, or settling requires a residence permit, which needs a visa first.',
                      solution: 'Consult the Embassy on appropriate visa category. Allow 2-3 months.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="border-l-4 border-amber-400 pl-6 py-4 bg-white border-r-0 rounded-r-lg">
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{item.type}</h4>
                      <p className="text-gray-700 mb-2">{item.description}</p>
                      <p className="text-sm text-gray-600">
                        <strong>Solution:</strong> {item.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Key Facts */}
                <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">✅ Visa-Free Facts</h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p><strong>Duration:</strong> Up to 30 days</p>
                    <p><strong>Valid Until:</strong> 31 Dec 2026</p>
                    <p><strong>Cost:</strong> FREE ($0)</p>
                    <p><strong>Processing:</strong> Instant at immigration</p>
                    <p className="text-xs text-green-900 mt-4 pt-4 border-t-2 border-green-200">
                      No application forms, no waiting, no embassy visits required!
                    </p>
                  </div>
                </div>

                {/* Simple Checklist */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">📋 What to Bring</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Passport (NZ)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Return flight booking</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Hotel/CTS itinerary</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Credit card or cash</span>
                    </li>
                  </ul>
                  <p className="text-xs text-blue-900 mt-4 pt-4 border-t border-blue-200">
                    That's it! No forms, photos, or employment letters needed.
                  </p>
                </div>

                {/* CTS Support Box */}
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">💬 Need Help?</h4>
                  <p className="text-sm text-gray-700 mb-4">
                    Have questions about visa-free entry or need travel documents? Our team is here to help.
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm w-full text-center"
                  >
                    Contact CTS
                  </a>
                </div>

                {/* Useful Links */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">📍 Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="https://nz.china-embassy.gov.cn/eng/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Chinese Embassy (NZ) ↗
                      </a>
                    </li>
                    <li>
                      <a
                        href="/best-time-to-visit-china"
                        className="text-primary hover:underline"
                      >
                        Best Time to Visit ↗
                      </a>
                    </li>
                    <li>
                      <a
                        href="/china-tours"
                        className="text-primary hover:underline"
                      >
                        Browse Tours ↗
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* FAQs */}
      <FAQSection faqs={chinaVisaGuideMeta.faqs} />

      {/* Related Resources */}
      <RelatedGuides guides={relatedGuides} />

      {/* Final CTA */}
      <CTASection
        title="Ready to Visit China Visa-Free?"
        description="Book your CTS tour today. No visa application needed—just bring your passport and start your China adventure. We're here to help at every step."
        primaryButtonText="Browse CTS Tours"
        primaryButtonLink="/china-tours"
        secondaryButtonText="Contact Our Team"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
