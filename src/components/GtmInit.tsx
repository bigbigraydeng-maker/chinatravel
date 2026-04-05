'use client';

import { useGtmTracking } from '@/components/GoogleTagManager';

export default function GtmInit() {
  useGtmTracking();
  return null;
}
