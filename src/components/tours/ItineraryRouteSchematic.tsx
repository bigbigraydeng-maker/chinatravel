'use client';

import type { ExtractedItineraryRoute, MapTransport } from '@/lib/itinerary-map/extractRouteFromItinerary';
import { CITY_SCHEMATIC_POS } from '@/lib/itinerary-map/extractRouteFromItinerary';

type Props = {
  route: ExtractedItineraryRoute;
};

function pos(id: string) {
  const p = CITY_SCHEMATIC_POS[id];
  if (!p) return { x: 500, y: 320 };
  return p;
}

function midPointCurve(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend: number
): { mx: number; my: number; cx1: number; cy1: number; cx2: number; cy2: number } {
  const mx = (x1 + x2) / 2 + bend;
  const my = (y1 + y2) / 2 - Math.abs(bend) * 0.35;
  return {
    mx,
    my,
    cx1: x1 + (x2 - x1) * 0.35 + bend * 0.5,
    cy1: y1 - 40,
    cx2: x1 + (x2 - x1) * 0.65 - bend * 0.3,
    cy2: y2 - 30,
  };
}

function SegmentIcon({ transport, x, y }: { transport: MapTransport; x: number; y: number }) {
  const s = 22;
  if (transport === 'flight') {
    return (
      <g transform={`translate(${x - s / 2},${y - s / 2})`} aria-hidden>
        <circle cx={s / 2} cy={s / 2} r={s / 2 + 2} fill="white" stroke="#e5e7eb" strokeWidth={1} />
        <path
          d="M6 14 L11 9 L9 8 L14 5 L15 7 L10 10 L12 11 L7 16 Z"
          fill="#b91c1c"
          transform={`translate(3,2) scale(1.1)`}
        />
      </g>
    );
  }
  if (transport === 'high-speed-train' || transport === 'train') {
    return (
      <g transform={`translate(${x - s / 2},${y - s / 2})`} aria-hidden>
        <circle cx={s / 2} cy={s / 2} r={s / 2 + 2} fill="white" stroke="#e5e7eb" strokeWidth={1} />
        <rect x={4} y={8} width={14} height={8} rx={2} fill="#b91c1c" />
        <rect x={6} y={5} width={10} height={5} rx={1} fill="#b91c1c" />
        <line x1={7} y1={12} x2={15} y2={12} stroke="white" strokeWidth={1} />
      </g>
    );
  }
  return (
    <g transform={`translate(${x - s / 2},${y - s / 2})`} aria-hidden>
      <circle cx={s / 2} cy={s / 2} r={s / 2 + 2} fill="white" stroke="#e5e7eb" strokeWidth={1} />
      <rect x={5} y={7} width={12} height={9} rx={1} fill="#64748b" />
    </g>
  );
}

/** Stylised mainland silhouette (schematic, not cartographic).
 *  Path scaled 0.7×, translated so centroid aligns with city cluster (530, 380).
 *  City x range: 340–720  y range: 260–500  → silhouette bbox: ~285–775 × 261–499
 */
function ChinaSilhouette() {
  return (
    <g transform="translate(173, 93) scale(0.7)">
      <path
        fill="#e8eaed"
        stroke="#d1d5db"
        strokeWidth={1.5}
        d="M 180 420 Q 220 300 360 260 T 620 240 T 820 300 Q 860 380 840 480 Q 780 560 600 580 Q 400 600 260 540 Q 160 500 180 420 Z"
      />
    </g>
  );
}

function displayCoords(
  stops: { cityId: string }[],
  index: number
): { x: number; y: number } {
  const s = stops[index];
  const base = pos(s.cityId);
  let dup = 0;
  for (let j = 0; j < index; j++) {
    if (stops[j].cityId === s.cityId) dup += 1;
  }
  return { x: base.x + dup * 26, y: base.y - dup * 20 };
}

export default function ItineraryRouteSchematic({ route }: Props) {
  const { stops, segments } = route;
  const vbW = 1000;
  const vbH = 640;

  const summary = stops.map(s => `${s.label.replace(/'/g, '’')} (${s.nights}N)`).join(' — ');

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-sky-50/60 shadow-inner">
      <div className="relative aspect-[5/3] min-h-[280px] w-full md:min-h-[320px]">
        <svg viewBox={`0 0 ${vbW} ${vbH}`} className="h-full w-full" role="img" aria-label="Tour route schematic across China">
          <defs>
            <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
          </defs>
          <rect width={vbW} height={vbH} fill="url(#seaGrad)" />
          <g transform="translate(0, 20) scale(0.95)">
            <ChinaSilhouette />
          </g>

          {stops.slice(0, -1).map((_, i) => {
            const a = displayCoords(stops, i);
            const b = displayCoords(stops, i + 1);
            const seg = segments[i];
            const bend = (i % 2 === 0 ? 1 : -1) * 45;
            const { mx, my, cx1, cy1, cx2, cy2 } = midPointCurve(a.x, a.y, b.x, b.y, bend);
            const d = `M ${a.x} ${a.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${b.x} ${b.y}`;
            return (
              <g key={`edge-${stops[i].cityId}-${i}`}>
                <path d={d} fill="none" stroke="#dc2626" strokeWidth={3.5} strokeLinecap="round" opacity={0.92} />
                {seg ? <SegmentIcon transport={seg.transport} x={mx} y={my} /> : null}
              </g>
            );
          })}

          {stops.map((s, i) => {
            const { x, y } = displayCoords(stops, i);
            return (
              <g key={`${s.cityId}-${s.firstDay}`} transform={`translate(${x}, ${y})`}>
                <circle r={14} fill="white" stroke="#dc2626" strokeWidth={3} />
                <text
                  y={-22}
                  textAnchor="middle"
                  className="fill-gray-900 font-bold"
                  style={{ fontSize: '13px', letterSpacing: '0.04em' }}
                >
                  {s.label} ({s.nights}N)
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="border-t border-secondary/30 bg-secondary/15 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-accent md:text-sm">
        {summary}
      </div>
    </div>
  );
}
