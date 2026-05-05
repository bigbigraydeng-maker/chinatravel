'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FAQPage } from '@/lib/data/faq-pages';

interface FAQPageTemplateProps {
  page: FAQPage;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function FAQPageTemplate({ page, breadcrumbs }: FAQPageTemplateProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const defaultBreadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
    { name: page.title, url: `/faq/${page.slug}` }
  ];

  const crumbs = breadcrumbs || defaultBreadcrumbs;

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            {crumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && <span className="text-gray-400">/</span>}
                <Link href={crumb.url} className="hover:text-primary transition-colors">
                  {crumb.name}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16 border-b border-warm-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-accent mb-4">{page.title}</h1>
          <p className="text-lg text-gray-700 max-w-2xl">{page.introText}</p>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Meta Description */}
          <div className="mb-12 p-6 bg-warm-50 border border-warm-100 rounded-lg">
            <p className="text-gray-700">{page.metaDescription}</p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {page.faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-warm-100 rounded-lg overflow-hidden hover:border-primary/40 transition-colors"
              >
                {/* Question - Clickable Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-warm-50 transition-colors text-left group"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-accent group-hover:text-primary transition-colors">
                      {faq.question}
                    </h3>
                    {faq.monthlySearches && (
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>📊 ~{faq.monthlySearches} searches/month</span>
                        {faq.searchIntent && <span>🔍 {faq.searchIntent}</span>}
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-primary transition-transform ${
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
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer - always in DOM for crawlers; overflow-hidden collapses height visually */}
                <div
                  className={`border-t border-warm-100 overflow-hidden transition-all duration-200 ${
                    expandedIndex === index ? 'max-h-[9999px]' : 'max-h-0 border-t-0'
                  }`}
                  aria-hidden={expandedIndex !== index}
                >
                  <div className="px-6 py-6 bg-warm-50">
                    <div
                      className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-primary hover:prose-a:underline"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Related FAQ Questions */}
          {page.relatedFaqs && page.relatedFaqs.length > 0 && (
            <div className="mt-16 pt-12 border-t border-warm-100">
              <h2 className="text-2xl font-serif font-bold text-accent mb-6">Related FAQ Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {page.relatedFaqs.map((faq) => (
                  <Link
                    key={faq.slug}
                    href={`/faq/${faq.slug}`}
                    className="p-4 border border-warm-100 rounded-lg hover:border-primary/40 hover:shadow-md hover:bg-warm-50 transition-all group"
                  >
                    <div className="text-primary font-semibold group-hover:text-primary/80 transition-colors">
                      → {faq.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Guides */}
          {page.relatedGuides && page.relatedGuides.length > 0 && (
            <div className="mt-12 pt-12 border-t border-warm-100">
              <h2 className="text-2xl font-serif font-bold text-accent mb-6">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {page.relatedGuides.map((slug) => (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="p-4 border border-warm-100 rounded-lg hover:border-primary/40 hover:shadow-md hover:bg-warm-50 transition-all group"
                  >
                    <div className="text-primary font-semibold group-hover:text-primary/80 transition-colors">
                      → {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 border-t border-warm-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold text-accent mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-700 mb-6">
            Our China travel specialists are here to help. Let's plan your perfect trip.
          </p>
          <a
            href="/tailor-made"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Consult Our Specialists
          </a>
        </div>
      </section>
    </>
  );
}
