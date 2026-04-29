'use client';

import React from 'react';

interface FlipbookSectionProps {
  flipbookId: string;
  title?: string;
  initialSearch?: string;
}

export default function FlipbookSection({
  flipbookId,
  title = "Interactive Guide",
  initialSearch
}: FlipbookSectionProps) {
  return (
    <section id="flipbook-guide" className="bg-gradient-to-br from-warm-50 to-white py-12 rounded-2xl border border-warm-200">
      {/* Beta Badge */}
      <div className="flex items-center justify-between mb-6 px-6">
        <h2 className="text-3xl font-serif font-bold text-gray-900">
          {title}
        </h2>
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 border border-amber-400 rounded-full text-xs font-semibold text-amber-900">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
          </span>
          Flipbook Beta
        </span>
      </div>

      {/* Flipbook Embed */}
      <div className="px-6">
        <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center" style={{ aspectRatio: '16/10', minHeight: '400px' }}>
          <iframe
            src={`https://flipbook.page/n/${flipbookId}${initialSearch ? `?q=${encodeURIComponent(initialSearch)}` : ''}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="fullscreen"
            style={{ border: 'none' }}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-4 px-6 text-sm text-gray-600">
        <p>
          💡 <strong>Tip:</strong> Click anywhere on the page to expand, or use the navigation arrows to flip through chapters.
        </p>
      </div>
    </section>
  );
}
