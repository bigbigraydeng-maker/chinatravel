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

/** 计算贝塞尔曲线控制点，弧度方向交替 */
function curvePoints(
  x1: number, y1: number,
  x2: number, y2: number,
  bend: number
) {
  const cx1 = x1 + (x2 - x1) * 0.25 + bend;
  const cy1 = y1 + (y2 - y1) * 0.1 - Math.abs(bend) * 0.8;
  const cx2 = x1 + (x2 - x1) * 0.75 + bend * 0.4;
  const cy2 = y2 + (y1 - y2) * 0.1 - Math.abs(bend) * 0.4;
  // 图标中点
  const mx = (x1 + x2) / 2 + bend * 0.6;
  const my = (y1 + y2) / 2 - Math.abs(bend) * 0.7;
  return { cx1, cy1, cx2, cy2, mx, my };
}

/** 交通方式图标 */
function SegmentIcon({ transport, x, y }: { transport: MapTransport; x: number; y: number }) {
  const r = 14;
  if (transport === 'flight') {
    return (
      <g transform={`translate(${x},${y})`} aria-hidden>
        <circle r={r} fill="white" stroke="#dc2626" strokeWidth={1.5} />
        {/* 飞机图标 */}
        <path
          d="M-1 -6 L2 -2 L7 -3 L6 -1 L2 0 L3 4 L5 4 L5 6 L1 5 L-3 6 L-3 4 L-1 4 L-2 0 L-6 -1 L-7 -3 L-1 -2 Z"
          fill="#dc2626"
          transform="scale(0.8) rotate(-45)"
        />
      </g>
    );
  }
  if (transport === 'high-speed-train' || transport === 'train') {
    return (
      <g transform={`translate(${x},${y})`} aria-hidden>
        <circle r={r} fill="white" stroke="#dc2626" strokeWidth={1.5} />
        {/* 高铁图标 */}
        <rect x={-7} y={-4} width={14} height={8} rx={2} fill="#dc2626" />
        <rect x={-5} y={-7} width={10} height={5} rx={1} fill="#dc2626" />
        <line x1={-4} y1={1} x2={4} y2={1} stroke="white" strokeWidth={1} />
      </g>
    );
  }
  return (
    <g transform={`translate(${x},${y})`} aria-hidden>
      <circle r={r} fill="white" stroke="#64748b" strokeWidth={1.5} />
      <rect x={-5} y={-3} width={10} height={7} rx={1} fill="#64748b" />
    </g>
  );
}

/**
 * 中国大陆轮廓（示意图，非精确投影）
 * 路径节点参考 CITY_SCHEMATIC_POS 坐标系（viewBox 1000×640）
 * 顺时针，从东北角开始
 */
function ChinaSilhouette() {
  return (
    <path
      fill="white"
      stroke="#94a3b8"
      strokeWidth={1.2}
      d="
        M 850 120
        Q 840 138 820 158
        Q 800 178 778 198
        Q 745 212 700 218
        Q 728 238 758 268
        Q 788 284 810 300
        Q 800 324 778 340
        Q 774 360 778 380
        Q 798 395 820 410
        Q 808 432 798 452
        Q 778 472 768 492
        Q 752 508 738 522
        Q 722 538 718 552
        Q 698 562 678 572
        Q 648 581 618 590
        Q 588 598 558 600
        Q 518 598 478 590
        Q 448 584 418 578
        Q 382 570 348 558
        Q 318 546 288 528
        Q 258 508 228 488
        Q 198 463 168 428
        Q 146 398 138 358
        Q 128 318 98 278
        Q 118 243 148 208
        Q 174 183 198 158
        Q 248 138 298 118
        Q 362 106 428 93
        Q 503 86 578 88
        Q 638 90 698 98
        Q 743 105 788 108
        Q 820 113 850 120 Z
      "
    />
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
  return { x: base.x + dup * 28, y: base.y - dup * 22 };
}

/** 根据城市位置自动选择标签对齐方向，避免超出边界 */
function labelAnchor(x: number): 'start' | 'middle' | 'end' {
  if (x < 300) return 'start';
  if (x > 700) return 'end';
  return 'middle';
}

function labelOffset(x: number): { dx: number; dy: number } {
  if (x < 300) return { dx: 18, dy: 5 };
  if (x > 700) return { dx: -18, dy: 5 };
  return { dx: 0, dy: -20 };
}

export default function ItineraryRouteSchematic({ route }: Props) {
  const { stops, segments } = route;
  const vbW = 1000;
  const vbH = 640;

  const summary = stops
    .map(s => `${s.label.replace(/'/g, '\u2019')} (${s.nights}N)`)
    .join(' — ');

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-md">
      <div className="relative aspect-[5/3] min-h-[280px] w-full md:min-h-[340px]">
        <svg
          viewBox={`0 0 ${vbW} ${vbH}`}
          className="h-full w-full"
          role="img"
          aria-label="Tour route map across China"
        >
          <defs>
            {/* 海洋渐变：蓝绿色，与参考图一致 */}
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a8d8ea" />
              <stop offset="100%" stopColor="#7ec8e3" />
            </linearGradient>
            {/* 箭头 marker */}
            <marker
              id="arrowRed"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L8,3 z" fill="#dc2626" />
            </marker>
          </defs>

          {/* 海洋背景 */}
          <rect width={vbW} height={vbH} fill="url(#oceanGrad)" />

          {/* 中国大陆 */}
          <ChinaSilhouette />

          {/* CHINA 文字标签 */}
          <text
            x={420}
            y={370}
            textAnchor="middle"
            fill="#94a3b8"
            style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.18em', opacity: 0.6 }}
          >
            CHINA
          </text>

          {/* 路线弧线 */}
          {stops.slice(0, -1).map((_, i) => {
            const a = displayCoords(stops, i);
            const b = displayCoords(stops, i + 1);
            const seg = segments[i];
            const bend = (i % 2 === 0 ? 1 : -1) * 55;
            const { cx1, cy1, cx2, cy2, mx, my } = curvePoints(a.x, a.y, b.x, b.y, bend);
            const d = `M ${a.x} ${a.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${b.x} ${b.y}`;
            return (
              <g key={`edge-${stops[i].cityId}-${i}`}>
                <path
                  d={d}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeDasharray="none"
                  markerEnd="url(#arrowRed)"
                  opacity={0.9}
                />
                {seg ? <SegmentIcon transport={seg.transport} x={mx} y={my} /> : null}
              </g>
            );
          })}

          {/* 城市标记 */}
          {stops.map((s, i) => {
            const { x, y } = displayCoords(stops, i);
            const anchor = labelAnchor(x);
            const { dx, dy } = labelOffset(x);
            return (
              <g key={`${s.cityId}-${s.firstDay}`}>
                {/* 黑色实心圆点（参考图样式） */}
                <circle cx={x} cy={y} r={7} fill="#1e293b" />
                <circle cx={x} cy={y} r={10} fill="none" stroke="#1e293b" strokeWidth={1.5} opacity={0.3} />
                {/* 城市名 + 天数 */}
                <text
                  x={x + dx}
                  y={y + dy}
                  textAnchor={anchor}
                  fill="#1e293b"
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textShadow: '0 0 4px white, 0 0 4px white',
                  }}
                >
                  {s.label}
                </text>
                <text
                  x={x + dx}
                  y={y + dy + 16}
                  textAnchor={anchor}
                  fill="#dc2626"
                  style={{ fontSize: '11px', fontWeight: 600 }}
                >
                  ({s.nights}N)
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* 底部摘要栏 */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-center text-xs font-semibold tracking-wide text-gray-600 md:text-sm">
        {summary}
      </div>
    </div>
  );
}
