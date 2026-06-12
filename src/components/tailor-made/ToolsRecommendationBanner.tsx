'use client';

import { trackToolClick } from '@/lib/analytics/track-tools';
import { BANNER_TOOLS } from '@/lib/data/tools-data';
import { Icon } from '@/components/ui/Icon';

interface ToolsRecommendationBannerProps {
  onToolClick?: (toolName: string) => void;
}

export default function ToolsRecommendationBanner({ onToolClick }: ToolsRecommendationBannerProps) {
  return (
    <section className="bg-warm-50 border-y border-warm-200 py-10 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-1">
            Plan smarter
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
            Not sure where to start?
          </h2>
          <p className="text-gray-600 mt-2 text-sm max-w-xl mx-auto">
            Use our free planning tools to nail down dates, budget and visa — then come back to tell us what you have in mind.
          </p>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {BANNER_TOOLS.map((tool, index) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackToolClick(tool.id, 'tailor-made-banner');
                onToolClick?.(tool.id);
              }}
              aria-label={`Open ${tool.title} in a new tab`}
              className="flex items-start gap-4 p-5 bg-white rounded-xl border border-warm-200 hover:border-primary hover:shadow-md transition-all group"
            >
              <Icon name={tool.icon} className="w-8 h-8 text-primary flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                    {tool.title}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {tool.description}
                </p>
                <span className="inline-block mt-2 text-xs text-primary font-medium group-hover:underline">
                  Open tool →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom prompt */}
        <div className="text-center">
          <p className="text-gray-500 text-sm inline-flex items-center gap-1.5 flex-wrap justify-center">
            <Icon name="sparkles" className="w-4 h-4 text-primary" />
            Done researching?{' '}
            <a
              href="#enquiry-form"
              className="text-primary font-semibold hover:underline"
            >
              Scroll down to start your enquiry
            </a>
            <Icon name="arrow-down" className="w-4 h-4 text-primary" />
          </p>
        </div>
      </div>
    </section>
  );
}
