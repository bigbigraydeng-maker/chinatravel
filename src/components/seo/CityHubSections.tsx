// Extra sections for destination hub pages (Chengdu, Xi'an, Guilin): prose with inline links,
// the departures table and a sample itinerary. Uses the same type scale and panels as CityTourHub.

import React from 'react';
import Link from 'next/link';
import type { HubDepartureRow, HubProseSection, HubSampleItinerary, RichPart } from '@/lib/data/destination-hubs';
import { H2_SECTION, H3_CARD, PANEL } from '@/lib/ui/typography';

function RichParagraph({ parts }: { parts: RichPart[] }) {
  return (
    <p className="text-lg text-muted-foreground leading-relaxed">
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <React.Fragment key={i}>{part}</React.Fragment>
        ) : (
          <Link key={i} href={part.href} className="text-primary font-medium underline-offset-2 hover:underline">
            {part.text}
          </Link>
        )
      )}
    </p>
  );
}

export function HubProse({ sections }: { sections: HubProseSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <h2 className={H2_SECTION}>{section.heading}</h2>
          {section.paragraphs.map((parts, i) => (
            <RichParagraph key={i} parts={parts} />
          ))}
        </section>
      ))}
    </>
  );
}

export function HubDepartures({ cityName, rows }: { cityName: string; rows: HubDepartureRow[] }) {
  if (rows.length === 0) return null;
  return (
    <section id="departures" className="scroll-mt-24">
      <h2 className={H2_SECTION}>{cityName} group departures</h2>
      <p className="text-muted-foreground mb-6">
        Upcoming group departures from New Zealand that include {cityName}, as published on each tour page. Prices are per
        person; open a tour for what is included.
      </p>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.slug} className={`${PANEL} p-4 space-y-3`}>
            <div className="min-w-0">
              <Link href={row.href} className={`${H3_CARD} hover:text-primary transition-colors`}>
                {row.name}
              </Link>
              <p className="text-sm text-muted-foreground mt-0.5">
                {row.duration} · {row.price}
                {row.cityDays ? ` · Passes through ${cityName}: ${row.cityDays}` : ''}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {row.dates.map((d) => (
                <span
                  key={d.label}
                  className="inline-flex items-center text-sm font-medium px-3 py-1 rounded-full bg-warm-50 text-gray-800 border border-warm-100"
                >
                  {d.label}
                  {d.returnDate && <span className="text-gray-500"> – {d.returnDate}</span>}
                  {d.price !== row.price && <span className="text-gray-500"> · {d.price}</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HubSampleItineraryBlock({ sample }: { sample: HubSampleItinerary }) {
  return (
    <section id="sample-itinerary" className="scroll-mt-24">
      <h2 className={H2_SECTION}>{sample.heading}</h2>
      <p className="text-muted-foreground mb-6">
        {sample.intro}{' '}
        <Link href={sample.tourHref} className="text-primary font-medium underline-offset-2 hover:underline">
          {sample.tourName}
        </Link>{' '}
        ({sample.price}).
      </p>
      <ol className="space-y-4">
        {sample.days.map((day) => (
          <li key={day.day} className={`${PANEL} p-4`}>
            <h3 className={H3_CARD}>
              Day {day.day}: {day.title}
            </h3>
            <p className="text-muted-foreground mt-1">{day.description}</p>
            {day.meals.length > 0 && <p className="text-sm text-muted-foreground mt-2">Meals: {day.meals.join(', ')}</p>}
          </li>
        ))}
      </ol>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className={`${PANEL} p-4`}>
          <h3 className={H3_CARD}>Included</h3>
          <ul className="mt-2 list-disc pl-5 text-muted-foreground space-y-1">
            {sample.inclusions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={`${PANEL} p-4`}>
          <h3 className={H3_CARD}>Not included</h3>
          <ul className="mt-2 list-disc pl-5 text-muted-foreground space-y-1">
            {sample.exclusions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
