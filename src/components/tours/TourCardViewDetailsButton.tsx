'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TourCardViewDetailsButton({ href }: { href: string }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link
      href={href}
      onClick={() => setIsLoading(true)}
      className={`px-6 py-2 bg-primary text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
        isLoading
          ? 'opacity-75 cursor-wait pointer-events-none'
          : 'hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20'
      }`}
    >
      {isLoading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        'View Details'
      )}
    </Link>
  );
}
