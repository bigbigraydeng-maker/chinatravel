'use client';

interface TourHighlightsProps {
  highlights: string[];
}

export default function TourHighlights({ highlights }: TourHighlightsProps) {
  return (
    <section id="highlights" className="scroll-mt-24">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
        Tour Highlights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((highlight, index) => (
          <div 
            key={index}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700">{highlight}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
