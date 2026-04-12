'use client';

import { useState } from 'react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateFAQSchema } from '@/lib/schema-tour';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQ[];
  variant?: 'default' | 'compact';
}

const defaultFaqs: FAQ[] = [
  {
    question: 'Do New Zealand passport holders need a visa for China?',
    answer:
      'For most CTS holidays, no. New Zealand ordinary passport holders can usually enter China visa-free for up to 30 days for tourism (and other permitted purposes), under policy currently published to 31 December 2026. Bring a valid passport, return or onward tickets, and accommodation or tour confirmation. Longer stays, work, study, or other cases may still need a visa — see our China entry guide for NZ travellers and confirm the latest rules before departure.',
  },
  {
    question: 'What is the best time to visit China?',
    answer: 'The best time to visit China depends on the regions you plan to visit. Generally, spring (April-May) and autumn (September-October) offer the most pleasant weather across most regions. Summer can be hot and humid, while winter is cold in northern China but mild in southern regions like Guilin and Yangshuo.',
  },
  {
    question: 'Are meals included in the tour price?',
    answer: 'Most of our tours include daily breakfast at your hotel. Some tours also include select lunches and dinners, as specified in the itinerary. All meals during the tour will feature authentic local cuisine. We can accommodate dietary requirements with advance notice.',
  },
  {
    question: 'What type of accommodation can I expect?',
    answer: 'We use 4-5 star hotels or local heritage properties depending on the tour tier. Our Signature collection features luxury 5-star properties, while Discovery tours use comfortable 4-star hotels. All accommodations are carefully selected for quality, location, and authentic character.',
  },
  {
    question: 'Is travel insurance included?',
    answer: 'Travel insurance is not included in the tour price but is highly recommended. We can provide quotes for comprehensive travel insurance that covers medical expenses, trip cancellation, and baggage loss. New Zealand residents should also ensure they have appropriate coverage for overseas travel.',
  },
  {
    question: 'What is the group size for these tours?',
    answer: 'Our small group tours typically have a maximum of 16-20 passengers to ensure a personalized experience. Private tours can be arranged for any group size. We also offer tailor-made itineraries for families or groups who prefer exclusive travel arrangements.',
  },
  {
    question: 'Are airport transfers included?',
    answer: 'Yes, all our tours include complimentary airport transfers on arrival and departure days. Our representative will meet you at the airport with a sign and assist with your transfer to the hotel. This service is included for all tour participants.',
  },
  {
    question: 'Can I extend my stay or add extra destinations?',
    answer: 'Absolutely! We can arrange pre or post-tour extensions to add extra cities or extend your stay. Popular extensions include Hong Kong, Macau, or additional nights in Beijing or Shanghai. Contact our travel specialists to customize your itinerary.',
  },
];

export default function FAQSection({ faqs = defaultFaqs, variant = 'default' }: FAQSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <SchemaMarkup data={generateFAQSchema(faqs)} />
      
      <section id="faq" className="scroll-mt-24 py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about traveling to China with CTS
            </p>
          </div>

          <div className={`max-w-4xl mx-auto space-y-4 ${variant === 'compact' ? 'space-y-2' : ''}`}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={expandedIndex === index}
                >
                  <span className="font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {expandedIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Have more questions?
            </p>
            <a
              href="#enquiry"
              className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact Our Specialists
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
