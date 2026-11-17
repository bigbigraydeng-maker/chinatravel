import type { Metadata } from 'next';
import BrochureClient from '@/components/brochure/BrochureClient';
import { groupTours, toBrochureCard } from '@/lib/brochure/picker';
import { getPublishedActiveTours } from '@/lib/data/published-tour-catalog';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { aucklandToday } from '@/lib/tour-discovery';

export const revalidate = 15;

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'CTS Tours 2027 China Tours | Online Brochure',
    description:
      'All our 2027 China tours in one place: length, price per person twin share and open departure dates. Answer three questions and we will suggest two tours.',
    path: '/brochure',
    ogImagePath: '/images/baker-gu-portrait.jpg',
    ogType: 'website',
    robots: { index: false, follow: true },
  });
}

function callDays(today: string, count: number): Array<{ value: string; label: string }> {
  const base = new Date(`${today}T00:00:00Z`);
  const formatter = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const days: Array<{ value: string; label: string }> = [];
  for (let i = 0; i < count; i += 1) {
    const d = new Date(base);
    d.setUTCDate(base.getUTCDate() + i);
    const parts = formatter.formatToParts(d);
    const weekday = parts.find((p) => p.type === 'weekday')?.value ?? '';
    const day = parts.find((p) => p.type === 'day')?.value ?? '';
    const month = parts.find((p) => p.type === 'month')?.value ?? '';
    days.push({ value: d.toISOString().slice(0, 10), label: `${weekday} ${day} ${month}` });
  }
  return days;
}

export default async function BrochurePage() {
  const tours = await getPublishedActiveTours();
  const today = aucklandToday();
  const groups = groupTours(tours).map((g) => ({
    key: g.key,
    title: g.title,
    cards: g.tours.map((t) => toBrochureCard(t, today)),
  }));
  const candidates = groups
    .filter((g) => g.key !== 'stopover' && g.key !== 'asia')
    .flatMap((g) => g.cards);
  return <BrochureClient groups={groups} candidates={candidates} today={today} days={callDays(today, 14)} />;
}
