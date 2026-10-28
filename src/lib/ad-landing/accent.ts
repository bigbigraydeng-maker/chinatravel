import type { AccentId } from './types';

/**
 * Decorative classes per accent. They live in src/lib so Tailwind (which scans src/lib) emits them. The enquiry
 * buttons never use these: they stay brand red on every page, so the call to action looks the same everywhere.
 */
export interface AccentClasses {
  chip: string;
  dot: string;
  rule: string;
  soft: string;
  text: string;
}

export const ACCENT_CLASSES: Record<AccentId, AccentClasses> = {
  teal: {
    chip: 'bg-teal-50 text-teal-900 ring-1 ring-teal-200',
    dot: 'bg-teal-600 text-white',
    rule: 'bg-teal-600',
    soft: 'bg-teal-50',
    text: 'text-teal-800',
  },
  emerald: {
    chip: 'bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200',
    dot: 'bg-emerald-600 text-white',
    rule: 'bg-emerald-600',
    soft: 'bg-emerald-50',
    text: 'text-emerald-800',
  },
  slate: {
    chip: 'bg-slate-100 text-slate-900 ring-1 ring-slate-300',
    dot: 'bg-slate-700 text-white',
    rule: 'bg-slate-700',
    soft: 'bg-slate-100',
    text: 'text-slate-800',
  },
};
