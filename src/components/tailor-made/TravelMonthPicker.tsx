'use client';

import { useEffect, useId, useRef, useState } from 'react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Brand-styled month picker; year selection is explicit, not an OS date popup. */
export default function TravelMonthPicker({ value, min, onChange }: {
  value: string; min: string; onChange: (value: string) => void;
}) {
  const minYear = Number(min.slice(0, 4));
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(minYear);
  const [choosingYear, setChoosingYear] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const yearButton = useRef<HTMLButtonElement>(null);
  const popupId = useId();
  const yearStart = minYear + Math.floor((year - minYear) / 12) * 12;
  const close = () => { setOpen(false); trigger.current?.focus(); };

  useEffect(() => {
    if (!open) return;
    yearButton.current?.focus({preventScroll:true});
    const frame = requestAnimationFrame(() => popup.current?.scrollIntoView?.({block:'nearest'}));
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => { cancelAnimationFrame(frame); document.removeEventListener('pointerdown', outside); };
  }, [open]);

  const label = value ? `${MONTHS[Number(value.slice(5, 7)) - 1]} ${value.slice(0, 4)}` : 'Choose month and year';
  return <div ref={root} className="relative font-sans text-base text-ink" onKeyDown={e => {
    if (e.key === 'Escape' && open) { e.preventDefault(); e.stopPropagation(); close(); }
  }} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
    <input type="hidden" name="travelDate" value={value} />
    <button id="tm-date" ref={trigger} type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls={popupId}
      onClick={() => { setYear(value ? Math.max(minYear, Number(value.slice(0, 4))) : minYear); setChoosingYear(false); setOpen(!open); }}
      className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-left font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <span className={value ? '' : 'text-ink-muted'}>{label}</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0 text-primary"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18"/></svg>
    </button>
    {open && <div ref={popup} id={popupId} role="dialog" aria-label="Choose travel month and year" className="absolute left-0 top-full z-30 mt-2 max-h-[calc(100dvh-12rem)] w-full min-w-0 scroll-mt-40 scroll-mb-6 overflow-y-auto rounded-xl border border-warm-200 bg-white p-4 font-sans shadow-xl">
      <div className="mb-4 flex items-center justify-between gap-2">
        <button type="button" aria-label={choosingYear ? 'Earlier years' : 'Previous year'} disabled={choosingYear ? yearStart <= minYear : year <= minYear} onClick={() => setYear(y => Math.max(minYear, y - (choosingYear ? 12 : 1)))} className="h-10 w-10 rounded-lg text-primary hover:bg-surface disabled:opacity-30">←</button>
        <button ref={yearButton} type="button" onClick={() => setChoosingYear(v => !v)} aria-expanded={choosingYear} className="rounded-lg bg-surface px-4 py-2 font-sans text-base font-semibold text-ink focus-visible:ring-2 focus-visible:ring-primary">{choosingYear ? `${yearStart}–${yearStart + 11}` : year} <span aria-hidden="true">⌄</span></button>
        <button type="button" aria-label={choosingYear ? 'Later years' : 'Next year'} onClick={() => setYear(y => y + (choosingYear ? 12 : 1))} className="h-10 w-10 rounded-lg text-primary hover:bg-surface">→</button>
      </div>
      <p className="mb-3 text-xs text-ink-muted">{choosingYear ? 'Choose a year' : 'Select a month · tap the year above to change it'}</p>
      <div className="grid grid-cols-3 gap-2">{choosingYear ? Array.from({length:12},(_,i)=>yearStart+i).map(y =>
        <button key={y} type="button" onClick={() => { setYear(y); setChoosingYear(false); yearButton.current?.focus(); }} className="min-h-11 rounded-lg px-2 py-3 font-sans text-sm hover:bg-surface focus-visible:ring-2 focus-visible:ring-primary">{y}</button>
      ) : MONTHS.map((month, index) => {
        const date = `${year}-${String(index + 1).padStart(2, '0')}`;
        return <button key={month} type="button" disabled={date < min} aria-pressed={value === date} onClick={() => { onChange(date); close(); }} className={`min-h-11 rounded-lg px-1 py-3 font-sans text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-30 ${value === date ? 'bg-primary text-white' : 'text-ink hover:bg-surface'}`}>{month.slice(0,3)}</button>;
      })}</div>
      <div className="mt-4 flex items-center justify-between border-t border-warm-200 pt-3"><button type="button" onClick={() => { onChange(''); close(); }} className="px-2 py-2 text-sm text-ink-muted">Clear</button><button type="button" onClick={close} className="px-2 py-2 text-sm font-semibold text-primary">Close</button></div>
    </div>}
  </div>;
}
