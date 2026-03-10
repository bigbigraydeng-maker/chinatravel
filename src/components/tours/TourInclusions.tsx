'use client';

interface TourInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export default function TourInclusions({ inclusions, exclusions }: TourInclusionsProps) {
  return (
    <section id="inclusions" className="scroll-mt-24">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
        What&apos;s Included
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inclusions */}
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Included
          </h3>
          <ul className="space-y-3">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions */}
        <div className="bg-red-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Not Included
          </h3>
          <ul className="space-y-3">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
