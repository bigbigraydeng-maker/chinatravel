// Related guides/resources section for SEO pages
// Displays links to related hub pages and guide pages

import React from 'react';
import Link from 'next/link';

interface Guide {
  title: string;
  slug: string;
  description?: string;
}

interface RelatedGuidesProps {
  guides: Guide[];
  title?: string;
  subtitle?: string;
}

const RelatedGuides: React.FC<RelatedGuidesProps> = ({
  guides,
  title = 'More Guides & Resources',
  subtitle = 'Deepen your China knowledge'
}) => {
  if (guides.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-warm-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/${guide.slug}`}
              className="group bg-white rounded-lg border border-warm-100 hover:border-primary hover:shadow-lg transition-all duration-300 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                {guide.title}
              </h3>
              {guide.description && (
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {guide.description}
                </p>
              )}
              <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                Read More
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedGuides;
