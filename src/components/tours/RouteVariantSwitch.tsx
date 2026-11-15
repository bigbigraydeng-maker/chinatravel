'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

/** Id of the tour's own (default) route. */
export const BASE_ROUTE_ID = 'base';

export interface RouteChoice {
  id: string;
  /** Button text, e.g. "8 May 2027". */
  label: string;
  /** One line shown under the buttons when this route is selected. */
  note?: string;
  /** Departure dates (same text as the departure list) that run this route. */
  departureDates: string[];
}

interface RouteVariantState {
  choices: RouteChoice[];
  selected: string;
  /** False during server render and the first client render, so both match. */
  mounted: boolean;
  choose: (id: string) => void;
}

const RouteVariantContext = createContext<RouteVariantState | null>(null);

/**
 * Which route a link asks for: `?route=<id>`, or `?departure=<date text>` (any date that belongs to
 * a route). Returns null when the link says nothing, or names something unknown.
 */
export function routeFromSearch(search: string, choices: readonly RouteChoice[]): string | null {
  const params = new URLSearchParams(search);
  const route = params.get('route');
  if (route && choices.some((choice) => choice.id === route)) return route;
  const departure = params.get('departure')?.trim().toLowerCase();
  if (departure) {
    const match = choices.find((choice) => choice.departureDates.some((date) => date.toLowerCase() === departure));
    if (match) return match.id;
  }
  return null;
}

export function RouteVariantProvider({ choices, children }: { choices: RouteChoice[]; children: ReactNode }) {
  const [selected, setSelected] = useState(BASE_ROUTE_ID);
  const [mounted, setMounted] = useState(false);
  const key = choices.map((choice) => choice.id).join('|');

  useEffect(() => {
    const fromLink = routeFromSearch(window.location.search, choices);
    if (fromLink) setSelected(fromLink);
    setMounted(true);
    // `choices` is rebuilt on every server render; its ids are what matter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const choose = useCallback((id: string) => {
    setSelected(id);
    const url = new URL(window.location.href);
    url.searchParams.delete('departure');
    if (id === BASE_ROUTE_ID) url.searchParams.delete('route');
    else url.searchParams.set('route', id);
    window.history.replaceState(window.history.state, '', url);
  }, []);

  return (
    <RouteVariantContext.Provider value={{ choices, selected, mounted, choose }}>
      {children}
    </RouteVariantContext.Provider>
  );
}

/** The route picker. Shows nothing for a tour with a single route. */
export function RouteVariantSwitcher() {
  const state = useContext(RouteVariantContext);
  if (!state || state.choices.length < 2) return null;
  const current = state.choices.find((choice) => choice.id === state.selected);

  return (
    <section aria-label="Choose your departure" className="border-b border-warm-200 bg-warm-50">
      <div className="container mx-auto px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          This tour runs a different route on some departures. Choose yours:
        </p>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Departure route">
          {state.choices.map((choice) => {
            const active = choice.id === state.selected;
            return (
              <button
                key={choice.id}
                type="button"
                aria-pressed={active}
                onClick={() => state.choose(choice.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 bg-white text-gray-800 hover:border-primary hover:text-primary'
                }`}
              >
                {choice.label}
              </button>
            );
          })}
        </div>
        {current?.note ? <p className="mt-2 text-sm text-gray-700">{current.note}</p> : null}
      </div>
    </section>
  );
}

interface RouteVariantViewProps {
  /** One pre-rendered block per route, keyed by route id (BASE_ROUTE_ID for the default). */
  views: Record<string, ReactNode>;
  /**
   * The element id the base block carries (e.g. "itinerary"). When a variant is shown instead,
   * its wrapper takes this id so links like #itinerary still land on it.
   */
  anchorId?: string;
}

/**
 * Shows the block of the selected route. Before the page is live in the browser every route's
 * block is in the HTML (so search engines read them all) and only the default one is visible;
 * afterwards only the selected block stays in the page.
 */
export function RouteVariantView({ views, anchorId }: RouteVariantViewProps) {
  const state = useContext(RouteVariantContext);
  const selected = state?.selected ?? BASE_ROUTE_ID;
  const mounted = state?.mounted ?? false;
  const entries = Object.entries(views);

  return (
    <>
      {entries.map(([id, node]) => {
        const isSelected = id === selected || (!state && id === BASE_ROUTE_ID);
        if (mounted && !isSelected) return null;
        const takesAnchor = Boolean(anchorId) && mounted && isSelected && id !== BASE_ROUTE_ID;
        return (
          <div
            key={id}
            hidden={!isSelected}
            id={takesAnchor ? anchorId : undefined}
            className={takesAnchor ? 'scroll-mt-24' : undefined}
          >
            {node}
          </div>
        );
      })}
    </>
  );
}
