import type { DayItinerary } from '@/lib/data/tours';

export type MapTransport = 'flight' | 'high-speed-train' | 'train' | 'coach' | 'cruise' | 'other';

export interface ItineraryMapStop {
  cityId: string;
  /** Short label for map (uppercase style) */
  label: string;
  nights: number;
  firstDay: number;
  lastDay: number;
}

export interface ItineraryMapSegment {
  fromId: string;
  toId: string;
  transport: MapTransport;
}

/** Normalised positions on a 1000×640 schematic (not geographic accuracy). */
export const CITY_SCHEMATIC_POS: Record<string, { x: number; y: number }> = {
  beijing: { x: 540, y: 260 },
  xian: { x: 470, y: 320 },
  shanghai: { x: 720, y: 380 },
  hangzhou: { x: 690, y: 400 },
  suzhou: { x: 710, y: 360 },
  wuxi: { x: 715, y: 370 },
  nanjing: { x: 680, y: 340 },
  guilin: { x: 560, y: 480 },
  yangshuo: { x: 575, y: 495 },
  chengdu: { x: 410, y: 400 },
  chongqing: { x: 450, y: 430 },
  zhangjiajie: { x: 520, y: 420 },
  lijiang: { x: 380, y: 480 },
  dali: { x: 360, y: 470 },
  kunming: { x: 340, y: 500 },
  hongkong: { x: 600, y: 540 },
  puyuan: { x: 700, y: 390 },
  xinshi: { x: 705, y: 385 },
  yunnan: { x: 360, y: 480 },
};

const CITY_ORDER: { id: string; label: string; patterns: RegExp[] }[] = [
  { id: 'hongkong', label: 'HONG KONG', patterns: [/hong kong/i, /\bHK\b/] },
  { id: 'shanghai', label: 'SHANGHAI', patterns: [/\bShanghai\b/i] },
  { id: 'suzhou', label: 'SUZHOU', patterns: [/\bSuzhou\b/i] },
  { id: 'wuxi', label: 'WUXI', patterns: [/\bWuxi\b/i] },
  { id: 'nanjing', label: 'NANJING', patterns: [/\bNanjing\b/i] },
  { id: 'hangzhou', label: 'HANGZHOU', patterns: [/\bHangzhou\b/i] },
  { id: 'puyuan', label: 'PUYUAN', patterns: [/\bPuyuan\b/i, /\bTongxiang\b/i] },
  { id: 'xinshi', label: 'XINSHI', patterns: [/\bXinshi\b/i] },
  { id: 'guilin', label: 'GUILIN', patterns: [/\bGuilin\b/i] },
  { id: 'yangshuo', label: 'YANGSHUO', patterns: [/\bYangshuo\b/i] },
  { id: 'zhangjiajie', label: 'ZHANGJIAJIE', patterns: [/\bZhangjiajie\b/i] },
  { id: 'chengdu', label: 'CHENGDU', patterns: [/\bChengdu\b/i] },
  { id: 'chongqing', label: 'CHONGQING', patterns: [/\bChongqing\b/i] },
  { id: 'xian', label: "XI'AN", patterns: [/\bXi'an\b/i, /\bXi’an\b/i, /\bXian\b/i, /\bXi\\'an\b/i] },
  { id: 'beijing', label: 'BEIJING', patterns: [/\bBeijing\b/i] },
  { id: 'dali', label: 'DALI', patterns: [/\bDali\b/i] },
  { id: 'lijiang', label: 'LIJIANG', patterns: [/\bLijiang\b/i] },
  { id: 'kunming', label: 'KUNMING', patterns: [/\bKunming\b/i] },
  { id: 'yunnan', label: 'YUNNAN', patterns: [/\bYunnan\b/i, /\bShangri-La\b/i, /\bShangri La\b/i] },
];

function matchCity(text: string): string | null {
  const t = text;
  for (const c of CITY_ORDER) {
    for (const p of c.patterns) {
      if (p.test(t)) return c.id;
    }
  }
  return null;
}

/**
 * City for “where the day belongs”: prefer segment after the dash (e.g. "Shanghai — Suzhou" → Suzhou),
 * else first segment ("Beijing — Auckland" → Beijing).
 */
function primaryLocationFromTitle(title: string): string | null {
  const parts = title.split(/\s*[—–]\s*/);
  const tail = (parts[parts.length - 1] ?? title).replace(/\([^)]*\)/g, '').trim();
  const head = (parts[0] ?? title).replace(/\([^)]*\)/g, '').trim();
  return matchCity(tail) || matchCity(head) || matchCity(title);
}

function cityLabel(id: string): string {
  return CITY_ORDER.find(c => c.id === id)?.label ?? id.toUpperCase();
}

/** Prefer city from accommodation line (hotel city), else primary end-of-day location from title, then full text. */
function nightCityForDay(day: DayItinerary): string | null {
  if (day.accommodation) {
    const m = matchCity(day.accommodation);
    if (m) return m;
  }
  const fromTitleDest = primaryLocationFromTitle(day.title);
  if (fromTitleDest) return fromTitleDest;
  return matchCity(`${day.title} ${day.description}`);
}

function inferTransport(text: string): MapTransport {
  const t = text.toLowerCase();
  if (/\bhigh-speed\b|\bg\d{2,3}\b|bullet train|高铁|second-class seat|2nd-class/i.test(text)) return 'high-speed-train';
  if (/\btrain\b|\brail\b/i.test(text)) return 'train';
  if (/\bflight\b|\bfly\b|\bairport\b|international flight|domestic flight|board your flight/i.test(text)) return 'flight';
  if (/\bcruise\b|\briver\b|boat tour|ferry/i.test(text)) return 'cruise';
  if (/\bbus\b|\bdrive\b|\btransfer to\b|\broad\b/i.test(text)) return 'coach';
  return 'other';
}

export interface ExtractedItineraryRoute {
  stops: ItineraryMapStop[];
  segments: ItineraryMapSegment[];
}

/**
 * Derives a schematic route from free-text itinerary (no extra CMS fields).
 * Returns null if fewer than 2 China stops with known schematic positions.
 */
export function extractRouteFromItinerary(itinerary: DayItinerary[]): ExtractedItineraryRoute | null {
  if (!itinerary.length) return null;

  type Block = { cityId: string; firstDay: number; lastDay: number };
  const blocks: Block[] = [];

  for (const day of itinerary) {
    const city = nightCityForDay(day);
    if (!city) continue;
    if (!CITY_SCHEMATIC_POS[city]) continue;

    const prev = blocks[blocks.length - 1];
    if (prev && prev.cityId === city) {
      prev.lastDay = day.day;
    } else {
      blocks.push({ cityId: city, firstDay: day.day, lastDay: day.day });
    }
  }

  if (blocks.length < 2) return null;

  const stops: ItineraryMapStop[] = blocks.map(b => ({
    cityId: b.cityId,
    label: cityLabel(b.cityId),
    nights: Math.max(1, b.lastDay - b.firstDay + 1),
    firstDay: b.firstDay,
    lastDay: b.lastDay,
  }));

  const segments: ItineraryMapSegment[] = [];
  for (let i = 0; i < blocks.length - 1; i++) {
    const a = blocks[i];
    const b = blocks[i + 1];
    const fromDay = a.lastDay;
    const toDay = b.firstDay;
    const bridgeDays = itinerary.filter(d => d.day >= fromDay && d.day <= toDay);
    const blob = bridgeDays.map(d => `${d.title} ${d.description}`).join(' ');
    segments.push({
      fromId: a.cityId,
      toId: b.cityId,
      transport: inferTransport(blob),
    });
  }

  return { stops, segments };
}

export function canRenderItineraryMap(route: ExtractedItineraryRoute | null): boolean {
  if (!route || route.stops.length < 2) return false;
  return route.stops.every(s => CITY_SCHEMATIC_POS[s.cityId]);
}
