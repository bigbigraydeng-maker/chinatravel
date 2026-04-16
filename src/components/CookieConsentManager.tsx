'use client';

import { useEffect, useState } from 'react';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleTagManager from '@/components/GoogleTagManager';
import GtmInit from '@/components/GtmInit';

type ConsentState = 'accepted' | 'rejected' | null;

const CONSENT_STORAGE_KEY = 'cts_cookie_consent';

export default function CookieConsentManager() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (saved === 'accepted' || saved === 'rejected') {
      setConsent(saved);
    }
    setIsHydrated(true);
  }, []);

  const saveConsent = (value: Exclude<ConsentState, null>) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    setConsent(value);
  };

  return (
    <>
      {consent === 'accepted' && (
        <>
          <GoogleAnalytics />
          <GoogleTagManager />
          <GtmInit />
        </>
      )}

      {isHydrated && consent === null && (
        <div className="fixed bottom-4 left-4 right-4 z-[100] rounded-xl border border-warm-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:left-auto sm:max-w-md">
          <p className="text-sm text-accent">
            We use cookies for site functionality and analytics. You can accept or reject analytics cookies.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => saveConsent('accepted')}
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => saveConsent('rejected')}
              className="rounded-md border border-warm-200 bg-white px-3 py-2 text-sm font-medium text-accent hover:bg-warm-50"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </>
  );
}
