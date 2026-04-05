import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import SectionTitle from '@/components/SectionTitle';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import RelatedGuides from '@/components/seo/RelatedGuides';
import HubHero from '@/components/seo/HubHero';
import { generateArticleSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { chinaVisaGuideMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: chinaVisaGuideMeta.title,
    description: chinaVisaGuideMeta.description,
    path: '/china-visa-guide-for-new-zealanders',
    ogImagePath: '/images/tours/forbidden-city-aerial.jpg',
    ogImageAlt: 'China Visa Guide for New Zealanders - Requirements and Application',
    keywords: ['China visa New Zealand', 'China visa requirements', 'NZ passport China visa', 'China travel documents'],
    ogType: 'article',
  });
}

export default function ChinaVisaGuidePage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/china-tours' },
    { name: 'Visa Guide', url: '/china-visa-guide-for-new-zealanders' }
  ];

  const schemas = [
    generateArticleSchema(
      chinaVisaGuideMeta.title,
      chinaVisaGuideMeta.description,
      '/china-visa-guide-for-new-zealanders'
    ),
    generateBreadcrumbListSchema(breadcrumbs),
    generateFAQPageSchema('/china-visa-guide-for-new-zealanders', chinaVisaGuideMeta.faqs)
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

              {/* Visa Types */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  China Visa Types for NZ Citizens
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      type: 'L-Visa (Tourist Visa)',
                      duration: '30 days (single-entry) or 60 days (double-entry)',
                      description: 'The most common visa for tourists visiting China for sightseeing.',
                      valid: 'Valid for 3-6 months from issue; single entries must be used before expiry',
                      cost: 'NZD $150-200 (varies by visa service)',
                      processing: '4-6 weeks standard; 1-2 weeks expedited',
                      best_for: 'Most CTS tour clients'
                    },
                    {
                      type: 'F-Visa (Business Visitor Visa)',
                      duration: '30 days (single or double-entry)',
                      description: 'For business meetings, conferences, or trade activities.',
                      valid: 'Valid for 3 months from issue',
                      cost: 'NZD $150-200',
                      processing: '4-6 weeks standard',
                      best_for: 'Business travel (not typical for leisure tours)'
                    },
                    {
                      type: 'X-Visa (Student Visa)',
                      duration: '30, 90, 180, or 365 days',
                      description: 'For students enrolled in Chinese educational institutions.',
                      valid: 'Valid according to study duration',
                      cost: 'Varies',
                      processing: '4-6 weeks',
                      best_for: 'Study abroad programs'
                    },
                    {
                      type: '72-Hour Visa-Free Transit',
                      duration: '72 hours',
                      description: 'Available in Shanghai, Beijing, Chengdu for connecting to a third country.',
                      valid: 'Must not leave international zone; requires onward ticket',
                      cost: 'FREE',
                      processing: 'Instant at airport',
                      best_for: 'Short stopovers with onward flights'
                    }
                  ].map((visa, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-6 py-4 bg-warm-50 rounded-r-lg px-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{visa.type}</h3>
                      <div className="space-y-2 text-gray-700">
                        <p><strong>Duration:</strong> {visa.duration}</p>
                        <p><strong>Description:</strong> {visa.description}</p>
                        <p><strong>Validity:</strong> {visa.valid}</p>
                        <p><strong>Cost:</strong> {visa.cost}</p>
                        <p><strong>Processing Time:</strong> {visa.processing}</p>
                        <p><strong>Best For:</strong> {visa.best_for}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* L-Visa Detailed Guide */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  L-Visa: Complete Step-by-Step Guide
                </h2>

                {/* Requirements */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    📋 Required Documents
                  </h3>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
                    <p className="text-sm text-blue-900 mb-4">
                      <strong>Note:</strong> Requirements may vary. The Chinese Embassy may request additional documents based on your circumstances.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        step: 1,
                        item: 'Valid Passport',
                        detail: 'Must be valid for at least 6 months beyond your intended stay'
                      },
                      {
                        step: 2,
                        item: 'Completed Visa Application Form',
                        detail: 'Form V.201 available at Chinese Embassy website'
                      },
                      {
                        step: 3,
                        item: 'Passport-Sized Photo',
                        detail: '4x6 cm (or 35x45mm), white background, taken within 6 months'
                      },
                      {
                        step: 4,
                        item: 'Invitation Letter or Hotel Booking',
                        detail: 'Proof of accommodation (hotel reservation from CTS, Airbnb, etc.)'
                      },
                      {
                        step: 5,
                        item: 'Return Flight Booking',
                        detail: 'Proof of onward/return flight (can be refundable booking)'
                      },
                      {
                        step: 6,
                        item: 'Proof of Employment',
                        detail: 'Employment letter from employer or business registration (if self-employed)'
                      },
                      {
                        step: 7,
                        item: 'Financial Proof',
                        detail: 'Bank statements (3-6 months) showing adequate funds for your stay'
                      },
                      {
                        step: 8,
                        item: 'Visa Fee',
                        detail: 'NZD $150-200 (amount varies; check current fees)'
                      }
                    ].map((doc) => (
                      <div key={doc.step} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                            {doc.step}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-gray-900">{doc.item}</h4>
                          <p className="text-sm text-gray-700">{doc.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Processing Steps */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    ⏱️ Processing Steps & Timeline
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        week: '3 Months Before',
                        action: 'Start planning. Book your flights and accommodation. Gather documents.'
                      },
                      {
                        week: '2 Months Before',
                        action: 'Prepare all required documents. Take new passport photo if needed.'
                      },
                      {
                        week: '6-8 Weeks Before',
                        action: 'Submit visa application to Chinese Embassy in Wellington or via visa service'
                      },
                      {
                        week: '4-6 Weeks',
                        action: 'Standard processing time. Track application status if possible.'
                      },
                      {
                        week: '2-3 Weeks Before',
                        action: 'Collect your visa or receive it by mail. Verify all details are correct.'
                      },
                      {
                        week: '1 Week Before',
                        action: 'Prepare final travel documents. Arrange airport transfers. Confirm with CTS.'
                      },
                      {
                        week: 'Departure',
                        action: 'Travel with your visa! Have a wonderful China adventure.'
                      }
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                        <div className="font-bold text-primary whitespace-nowrap">{step.week}</div>
                        <div className="text-gray-700">{step.action}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Cost Breakdown */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  💰 Visa Cost Breakdown
                </h2>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-warm-100">
                      <th className="border p-4 text-left font-bold">Item</th>
                      <th className="border p-4 text-left font-bold">Approx. Cost</th>
                      <th className="border p-4 text-left font-bold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-4">L-Visa Embassy Fee</td>
                      <td className="border p-4 font-bold">NZD $150-200</td>
                      <td className="border p-4">Changes annually; verify with Embassy</td>
                    </tr>
                    <tr>
                      <td className="border p-4">Visa Service Handling</td>
                      <td className="border p-4">NZD $20-50</td>
                      <td className="border p-4">If using a visa service agency</td>
                    </tr>
                    <tr>
                      <td className="border p-4">Expedited Processing</td>
                      <td className="border p-4">+NZD $50-100</td>
                      <td className="border p-4">Optional; reduces processing to 1-2 weeks</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border p-4 font-bold">Total (Standard)</td>
                      <td className="border p-4 font-bold">~NZD $180-250</td>
                      <td className="border p-4">Plus any postal/courier fees</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* Common Questions */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  ❓ Common Visa Questions
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      q: 'How long is a China visa valid?',
                      a: 'Issued visas are typically valid for 3-6 months from the date of issue. You must enter China within this validity period. Once you enter, the visa validity starts.'
                    },
                    {
                      q: 'Can I apply for a multi-entry L-Visa?',
                      a: 'Yes! A double-entry L-Visa allows two separate entries to China within the 60-day validity window. Costs slightly more. Perfect if you plan to leave and re-enter China.'
                    },
                    {
                      q: 'What if my application is rejected?',
                      a: 'The Embassy will advise why. Common reasons: missing documents, insufficient funds proof, or employment verification issues. You can reapply after addressing these concerns. CTS can advise on common rejection causes.'
                    },
                    {
                      q: 'Can I apply from outside Wellington?',
                      a: 'You can apply directly to the Embassy by mail or submit via an authorized visa service agency in your city. Most visa services accept applications from all NZ locations and mail documents to the Embassy.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="border-l-4 border-secondary pl-6 py-4">
                      <h4 className="font-bold text-lg text-gray-900 mb-2">{item.q}</h4>
                      <p className="text-gray-700">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTS Support */}
              <section className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  💬 CTS Visa Support
                </h3>
                <p className="text-gray-700 mb-4">
                  While CTS does not process visas directly, our team provides expert guidance throughout the application process. When you book a tour with us, we'll give you a detailed visa checklist and assist with any questions about requirements or timelines.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Contact CTS for Visa Guidance
                </a>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Timeline */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">⏰ Quick Timeline</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Standard:</strong> 4-6 weeks</p>
                    <p><strong>Expedited:</strong> 1-2 weeks</p>
                    <p className="text-xs text-amber-900 mt-3 pt-3 border-t border-amber-200">
                      🔔 Apply at least 6-8 weeks before your tour departure!
                    </p>
                  </div>
                </div>

                {/* Documents Checklist */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">✓ Checklist</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span>☐</span>
                      <span>Valid passport (6+ months)</span>
                    </li>
                    <li className="flex gap-2">
                      <span>☐</span>
                      <span>Application form V.201</span>
                    </li>
                    <li className="flex gap-2">
                      <span>☐</span>
                      <span>Passport photo (4x6cm)</span>
                    </li>
                    <li className="flex gap-2">
                      <span>☐</span>
                      <span>Hotel booking/invite</span>
                    </li>
                    <li className="flex gap-2">
                      <span>☐</span>
                      <span>Return flight proof</span>
                    </li>
                    <li className="flex gap-2">
                      <span>☐</span>
                      <span>Employment letter</span>
                    </li>
                    <li className="flex gap-2">
                      <span>☐</span>
                      <span>Bank statements</span>
                    </li>
                    <li className="flex gap-2">
                      <span>☐</span>
                      <span>Visa fee</span>
                    </li>
                  </ul>
                </div>

                {/* Useful Links */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">📍 Key Contacts</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="https://www.chinaembassy.org.nz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Embassy of China (NZ) ↗
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="text-primary hover:underline"
                      >
                        CTS Visa Support ↗
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
        title="Ready to Apply for Your China Visa?"
        description="Book your CTS tour first, then apply for your visa with our guidance. We'll help every step of the way."
        primaryButtonText="Browse Tours"
        primaryButtonLink="/china-tours"
        secondaryButtonText="Contact CTS"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
