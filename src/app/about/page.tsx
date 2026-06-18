import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import FAQSection from '@/components/FAQSection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { migratedSite, tourImage } from '@/lib/site-media';
import { generateBreadcrumbListSchema } from '@/lib/schema-seo';

export const metadata: Metadata = {
  title: 'About CTS Tours | China Travel Specialists since 1928',
  description:
    "Learn about CTS Tours — New Zealand's dedicated China travel specialist with nearly 100 years of heritage, TAANZ membership, and direct operations in China. Meet our expert team.",
  alternates: { canonical: '/about' },
};

// FAQs surfaced on the About page — also rendered into FAQPage schema for Google
// AI Overview and People-Also-Ask. Every claim below is verifiable from page
// content (1928 heritage / TAANZ / IATA / Auckland / Lisa Li MNZM / Asiascape Holidays).
const ABOUT_FAQS = [
  {
    question: 'How long has CTS Tours been operating in New Zealand?',
    answer:
      "CTS Tours New Zealand was established in 2000 by Lisa Li, MNZM. We are the New Zealand arm of China Travel Service, a group founded in 1928 — making us one of Aotearoa's longest-running specialists for China travel. Our roots in China-outbound travel span nearly 100 years.",
  },
  {
    question: 'Is CTS Tours a TAANZ-bonded travel agency?',
    answer:
      'Yes. CTS Tours is a member of the Travel Agents Association of New Zealand (TAANZ), which provides professional standards and financial protection for travellers. We are also IATA-accredited, a member of the Tourism Export Council of New Zealand, Tourism Industry Aotearoa (TIA), and the Auckland Business Chamber, and recognised by Qualmark.',
  },
  {
    question: 'Where is CTS Tours based?',
    answer:
      'Our New Zealand office is in Auckland, with consultants on the ground for face-to-face meetings, phone, and video consultations. Customers anywhere in New Zealand — Wellington, Christchurch, Dunedin, regional towns — book with our Auckland team and receive the same NZD pricing on the international tour package. Auckland (AKL) is the only NZ airport with direct flights to mainland China, so for clients based outside Auckland we arrange a connecting domestic flight to Auckland — the connecting leg is quoted separately at additional cost and is not included in the headline tour price.',
  },
  {
    question: 'Does CTS Tours operate its own China tours, or resell them?',
    answer:
      'We design and operate our own China tours in-house. As the New Zealand branch of China Travel Service, we have direct China operations — our Auckland consultants work with CTS ground teams in China, not a third-party reseller chain. This is also how our sister brand, Asiascape Holidays, runs ground operations across the wider Asia region.',
  },
  {
    question: 'Who runs CTS Tours New Zealand?',
    answer:
      'CTS Tours New Zealand was founded by Lisa Li, MNZM (Member of the New Zealand Order of Merit), who serves as Managing Director and brings over 25 years of experience connecting New Zealand and Asia through travel. Our China Travel Specialist Baker Gu adds another 15+ years of expertise in Chinese destinations and cultures.',
  },
  {
    question: 'What destinations does CTS Tours cover?',
    answer:
      'Our core specialty is China — Beijing, Xi\'an, Shanghai, Guilin, Chengdu, Chongqing, Yunnan, the Silk Road, and the Yangtze. Through our sister brand Asiascape Holidays, we also arrange travel across the wider Asia region. All itineraries are designed for New Zealand travellers with NZD pricing and Auckland-based support.',
  },
  {
    question: 'What is the difference between CTS Tours and Asiascape Holidays?',
    answer:
      'Both brands are operated by the same Auckland team. CTS Tours focuses on China — escorted tours, tailor-made trips, and stopover packages — while Asiascape Holidays covers our specialised travel experiences across the wider Asia region. They share the same direct operations, the same TAANZ-bonded protection, and the same consultants.',
  },
];

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ];

  const schemas = [
    generateBreadcrumbListSchema(breadcrumbs),
    // Note: FAQPage schema is auto-emitted by <FAQSection /> below.
  ];

  return (
    <div className="min-h-screen bg-white">
      <SchemaMarkup data={schemas} />

      <ImmersivePageHero
        eyebrow="About"
        title="About CTS Tours"
        subtitle="Connecting New Zealanders to the wonders of Asia for over 20 years"
        imageSrc={tourImage('forbidden-city-aerial.jpg')}
        imageAlt="Forbidden City Beijing — about CTS Tours, China travel specialists for New Zealand"
        priority
      />

      {/* Quick Answer (LLM-friendly TL;DR for AI Overview citation) */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-10">
          <aside
            aria-label="Quick answer"
            className="max-w-4xl mx-auto border-l-4 border-primary bg-warm-50/60 rounded-r-lg p-5 md:p-6"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-primary mb-2">
              Quick answer
            </p>
            <p className="text-gray-800 leading-relaxed">
              CTS Tours New Zealand is Aotearoa&apos;s dedicated China travel specialist — the local arm
              of China Travel Service, a group founded in 1928. We are TAANZ-bonded, IATA-accredited,
              Auckland-based, and design and operate every China holiday package in-house with direct
              China operations (not resold from third parties). Founded in NZ in 2000 by Lisa Li, MNZM.
            </p>
          </aside>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Company Overview</h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-800 mb-8 leading-relaxed border-l-4 border-primary pl-4">
                CTS Tours New Zealand is Aotearoa&apos;s dedicated{' '}
                <strong>China travel specialist</strong>: a{' '}
                <Link href="/about#credentials" className="text-primary font-semibold hover:underline">
                  TAANZ member and IATA-accredited
                </Link>{' '}
                agency with consultants in Auckland and direct access to China Travel Service operations in-market. For itineraries and departures, see our{' '}
                <Link href="/china-tours" className="text-primary font-semibold hover:underline">
                  China tours hub
                </Link>{' '}
                and{' '}
                <Link href="/china-visa-guide-for-new-zealanders" className="text-primary font-semibold hover:underline">
                  NZ passport entry guide
                </Link>
                .
              </p>
              <h3 className="text-2xl font-bold mb-4">Who We Are</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                CTS Tours is the New Zealand branch of China Travel Service, one of the world's leading travel organizations. Established in 2000 by Lisa Li, MNZM, we have grown to become a trusted name in travel between New Zealand and Asia.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Our History</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our roots trace back to the China Travel Service Group, founded in 1928. With nearly a century of experience in the travel industry, we bring unparalleled expertise to every journey we create.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Our Brands</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                In addition to CTS Tours, we also operate under the Asiascape Holidays brand, offering specialized travel experiences across Asia. Both brands share our commitment to quality, authenticity, and customer satisfaction.
              </p>
              <Link href="/about/asian-escapes" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                Learn more about Asiascape Holidays
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Lisa Li */}
            <Link href="/experts/lisa-li" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-72 overflow-hidden bg-gray-200">
                  <Image
                    src={migratedSite('lisa-li-portrait.jpg')}
                    alt="Lisa Li, Managing Director"
                    fill
                    sizes="(max-width: 768px) 100vw, 432px"
                    className="object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Lisa Li, MNZM</h3>
                  <p className="text-primary font-semibold mb-4">Managing Director, CTS Tours</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Founder of CTS Tours New Zealand and Member of the New Zealand Order of Merit (MNZM) with over 25 years of experience connecting New Zealand and Asia through travel.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Baker Gu */}
            <Link href="/experts/baker-gu" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-72 overflow-hidden bg-gray-200">
                  <Image
                    src="/images/baker-gu-portrait.jpg"
                    alt="Baker Gu, China Specialist"
                    fill
                    sizes="(max-width: 768px) 100vw, 432px"
                    className="object-cover object-[center_40%] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Baker Gu</h3>
                  <p className="text-primary font-semibold mb-4">China Travel Specialist</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    With over 15 years of experience in the travel industry, Baker brings unparalleled expertise in Chinese destinations and cultures.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Credentials */}
      <section id="credentials" className="scroll-mt-24 py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Credentials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 mr-4 shrink-0">
                  <Image
                    src={migratedSite('credentials-taanz.png')}
                    alt="TAANZ Membership"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold">TAANZ Membership</h3>
              </div>
              <p className="text-gray-700">Member of the Travel Agents Association of New Zealand, ensuring professional standards and ethical business practices.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 mr-4 shrink-0">
                  <Image
                    src={migratedSite('credentials-iata.png')}
                    alt="IATA Certification"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold">IATA Certification</h3>
              </div>
              <p className="text-gray-700">International Air Transport Association certified, providing access to global airfares and industry resources.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 mr-4 shrink-0">
                  <Image
                    src={migratedSite('credentials-tourism-export-council.png')}
                    alt="Tourism Export Council"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold">Tourism Export Council</h3>
              </div>
              <p className="text-gray-700">Member of the Tourism Export Council of New Zealand, supporting sustainable tourism growth.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 mr-4 shrink-0">
                  <Image
                    src={migratedSite('credentials-auckland-business-chamber.png')}
                    alt="Auckland Business Chamber"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold">Auckland Business Chamber</h3>
              </div>
              <p className="text-gray-700">Active member of the Auckland Business Chamber, contributing to the local business community.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 mr-4 shrink-0">
                  <Image
                    src={migratedSite('credentials-qualmark.png')}
                    alt="Qualmark"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold">Qualmark</h3>
              </div>
              <p className="text-gray-700">Recognized by Qualmark, New Zealand's official tourism quality assurance organization.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-24 h-16 mr-4 shrink-0">
                  <Image
                    src="/credentials-tia.png"
                    alt="Tourism Industry Aotearoa"
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold">Tourism Industry Aotearoa</h3>
              </div>
              <p className="text-gray-700">Member of <a href="https://www.tia.org.nz/about" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Tourism Industry Aotearoa (TIA)</a>, New Zealand's peak tourism industry body representing businesses across the visitor economy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose CTS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Why Choose CTS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="bg-primary text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">20+ Years Experience</h3>
                <p className="text-gray-700">Serving Kiwi travellers since 2000, with a deep understanding of both New Zealand and Asian markets.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Direct Asia Operations</h3>
                <p className="text-gray-700">On-the-ground presence and partnerships throughout China, Japan, and Vietnam, ensuring seamless travel experiences via our Asiascape Holidays ground operations brand.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Fully Inclusive Packages</h3>
                <p className="text-gray-700">Comprehensive packages that include flights, accommodation, meals, and activities for stress-free travel.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">NZ-Only Groups</h3>
                <p className="text-gray-700">Small, exclusive groups with only New Zealand travelers for a more personalized experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTS vs Competitors */}
      <section className="py-16 bg-warm-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-4 text-center">How CTS Compares</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Kiwi travellers often compare us to other China tour operators. Here&apos;s how CTS stacks up on the factors that matter most.
          </p>
          <div className="overflow-x-auto max-w-4xl mx-auto">
            <table className="w-full text-sm border-collapse bg-white rounded-xl overflow-hidden shadow-md">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">CTS Tours NZ</th>
                  <th className="px-6 py-4 text-center font-semibold">Wendy Wu Tours</th>
                  <th className="px-6 py-4 text-center font-semibold">Generic OTA</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['NZ-based team', '✅ Auckland office', '❌ AU/UK-based', '❌ No local team'],
                  ['NZ dollar pricing', '✅ All prices in NZD', '❌ AUD pricing', '❌ USD/AUD'],
                  ['NZ-only tour groups', '✅ Kiwis only', '❌ Mixed AU/NZ/UK groups', '❌ Global groups'],
                  ['Flights from NZ included', '✅ Return flights from AKL', '✅ Flights included', '❌ Land-only'],
                  ['Direct China operations', '✅ Own ground team in China', '✅ Own operations', '❌ Third-party agents'],
                  ['TAANZ bonded', '✅ TAANZ member since 1928', '❌ Not TAANZ', '❌ Not TAANZ'],
                  ['Small group size', '✅ Max 16 (Signature)', '⚠️ Up to 30+', '❌ Varies widely'],
                  ['Years in NZ market', '✅ 98 years (est. 1928)', '⚠️ ~15 years', '❌ New entrant'],
                ].map(([feature, cts, wendy, ota], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-3 font-medium text-gray-800">{feature}</td>
                    <td className="px-6 py-3 text-center text-green-700 font-medium">{cts}</td>
                    <td className="px-6 py-3 text-center text-gray-600">{wendy}</td>
                    <td className="px-6 py-3 text-center text-gray-600">{ota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">Comparison based on publicly available information as of 2026. Details subject to change.</p>
        </div>
      </section>

      {/* FAQs — also emits FAQPage schema for Google AI Overview / People-Also-Ask */}
      <FAQSection faqs={ABOUT_FAQS} />
    </div>
  );
}
