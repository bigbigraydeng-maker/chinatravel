import React from 'react';
import Link from 'next/link';

export interface GuideLinkCard {
  label: string;
  href: string;
  description?: string;
  emoji?: string;
}

interface GuideLinksProps {
  title?: string;
  links: GuideLinkCard[];
}

const GuideLinksSection: React.FC<GuideLinksProps> = ({
  title = 'Destination Travel Guides',
  links,
}) => {
  if (!links.length) return null;

  return (
    <section className="bg-warm-50 py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group block bg-white rounded-xl border border-warm-100 p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                {link.emoji && (
                  <span className="text-2xl leading-none mt-0.5 flex-shrink-0">{link.emoji}</span>
                )}
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                    {link.label}
                  </p>
                  {link.description && (
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">{link.description}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuideLinksSection;
