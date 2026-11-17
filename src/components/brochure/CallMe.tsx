'use client';

// "Ask Baker to call me": only for guests who came in from a Magic Engine mail (cookie cts_me_on=1).
// Everyone else gets a plain "Call us" phone link. The request goes to /api/me-callback; only a 204 counts as done.

import { useEffect, useState } from 'react';
import { VIEW_FLAG_COOKIE } from '@/lib/me-click-beacon';
import { CTS_PHONE_DISPLAY, CTS_PHONE_HREF } from '@/lib/site';
import { BTN_OUTLINE, BTN_RED, LINE } from './styles';

export type CallWindow = 'morning' | 'afternoon' | 'evening';

const WINDOW_OPTIONS: Array<{ value: CallWindow; label: string }> = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
];

export interface QuizPayload {
  length: string;
  firstVisit: boolean;
  pace: string;
  picks: string[];
}

interface OpenCall {
  origin: string;
  tourPath: string | null;
  tourName: string;
  nonce: number;
}

export interface CallMeState {
  flagOn: boolean;
  days: Array<{ value: string; label: string }>;
  current: OpenCall | null;
  open: (origin: string, tourPath: string | null, tourName: string) => void;
}

function hasFlagCookie(): boolean {
  return document.cookie.split(';').some((c) => c.trim() === `${VIEW_FLAG_COOKIE}=1`);
}

export function useCallMe(days: Array<{ value: string; label: string }>): CallMeState {
  const [flagOn, setFlagOn] = useState(false);
  useEffect(() => {
    setFlagOn(hasFlagCookie());
  }, []);
  const [current, setCurrent] = useState<OpenCall | null>(null);
  return {
    flagOn,
    days,
    current,
    // A new nonce remounts the panel, so reopening it starts from a clean form, as before.
    open: (origin, tourPath, tourName) =>
      setCurrent((prev) => ({ origin, tourPath, tourName, nonce: (prev?.nonce ?? 0) + 1 })),
  };
}

export function optionClasses(selected: boolean, onRed = false): string {
  const base =
    'flex min-h-[52px] cursor-pointer items-center justify-center rounded border-2 px-4 py-3 text-center text-[17px] font-semibold focus-within:outline focus-within:outline-2 focus-within:outline-offset-2';
  if (onRed) {
    return `${base} focus-within:outline-white ${
      selected ? 'border-white bg-white text-primary' : 'border-white/50 text-white hover:border-white hover:bg-white/10'
    }`;
  }
  return `${base} focus-within:outline-primary ${
    selected ? 'border-primary bg-[#FBF0EF] text-primary' : `${LINE} bg-white text-ink hover:border-primary/50`
  }`;
}

interface CallPanelProps {
  days: Array<{ value: string; label: string }>;
  tourPath: string | null;
  tourName: string;
  quiz: QuizPayload | null;
}

export function CallPanel({ days, tourPath, tourName, quiz }: CallPanelProps) {
  const [day, setDay] = useState<string>(days[0]?.value ?? '');
  const [callWindow, setCallWindow] = useState<CallWindow>('morning');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function confirm() {
    setStatus('sending');
    try {
      const res = await fetch('/api/me-callback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ date: day, window: callWindow, tourPath, quiz }),
      });
      setStatus(res.status === 204 ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const dayLabel = days.find((d) => d.value === day)?.label ?? day;
  const windowLabel = (WINDOW_OPTIONS.find((w) => w.value === callWindow)?.label ?? '').toLowerCase();
  return (
    <div className={`mt-4 rounded border-2 border-primary bg-white p-5 text-[17px] text-ink`} role="group" aria-label="Ask Baker to call me">
      <p>
        Tour: <strong>{tourName}</strong>
      </p>
      <label htmlFor={`call-day-${tourPath ?? 'any'}`} className="mt-3 block font-semibold">
        Which day?
      </label>
      <select
        id={`call-day-${tourPath ?? 'any'}`}
        className={`mt-1 min-h-[48px] w-full max-w-xs rounded border ${LINE} bg-white px-3 text-[17px]`}
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        {days.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>
      <fieldset className="mt-4">
        <legend className="mb-2 font-semibold">Which part of the day?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {WINDOW_OPTIONS.map((opt) => (
            <label key={opt.value} className={optionClasses(callWindow === opt.value)}>
              <input
                type="radio"
                className="sr-only"
                name={`callWindow-${tourPath ?? 'any'}`}
                checked={callWindow === opt.value}
                onChange={() => setCallWindow(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <button type="button" disabled={status === 'sending' || status === 'done'} onClick={confirm} className={`mt-4 ${BTN_RED}`}>
        Confirm
      </button>
      {status === 'done' && (
        <p role="status" className="mt-4 font-semibold">
          Thank you. Baker will call you on {dayLabel} ({windowLabel}).
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="mt-4 font-semibold">
          Sorry, that did not go through. Please call us on {CTS_PHONE_DISPLAY}.
        </p>
      )}
    </div>
  );
}

interface CallActionProps {
  call: CallMeState;
  origin: string;
  tourPath: string | null;
  tourName: string;
  label: string;
  buttonClass?: string;
}

/** The button (or the phone link) plus, when it is the open one, the panel under it. */
export function CallAction({ call, origin, tourPath, tourName, label, buttonClass = BTN_OUTLINE }: CallActionProps) {
  if (!call.flagOn) {
    return (
      <a href={CTS_PHONE_HREF} className={buttonClass}>
        Call us
      </a>
    );
  }
  return (
    <button type="button" className={buttonClass} onClick={() => call.open(origin, tourPath, tourName)}>
      {label}
    </button>
  );
}

export function OpenPanel({ call, origin, quiz }: { call: CallMeState; origin: string; quiz: QuizPayload | null }) {
  const c = call.current;
  if (!call.flagOn || !c || c.origin !== origin) return null;
  return <CallPanel key={c.nonce} days={call.days} tourPath={c.tourPath} tourName={c.tourName} quiz={quiz} />;
}
