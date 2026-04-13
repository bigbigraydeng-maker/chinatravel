'use client';

import type { ExtractedItineraryRoute, MapTransport } from '@/lib/itinerary-map/extractRouteFromItinerary';
import { CITY_SCHEMATIC_POS } from '@/lib/itinerary-map/extractRouteFromItinerary';
import { calculateMapBounds, calculateSvgViewBox, geoToSvgBatch } from '@/lib/itinerary-map/coordinate-transform';
import { getCityCoord, type CityCoord } from '@/lib/itinerary-map/city-geo-coordinates';

type Props = {
  route?: ExtractedItineraryRoute;
  tourCities?: string[];
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
        <path
          d="M-2 -3 L2 -3 L3 -1 L3 3 L1 4 L1 5 L-1 5 L-1 4 L-3 3 L-3 -1 Z"
          fill="#dc2626"
          transform="scale(1.2)"
        />
      </g>
    );
  }
  if (transport === 'coach') {
    return (
      <g transform={`translate(${x},${y})`} aria-hidden>
        <circle r={r} fill="white" stroke="#dc2626" strokeWidth={1.5} />
        {/* 车辆图标 */}
        <path
          d="M-3 -2 L3 -2 L4 0 L4 2 L3 3 L-3 3 L-4 2 L-4 0 Z M-2 1 L-1 1 M1 1 L2 1"
          fill="#dc2626"
          stroke="#dc2626"
          strokeWidth={0.5}
          strokeLinecap="round"
        />
      </g>
    );
  }
  return (
    <circle cx={x} cy={y} r={r} fill="white" stroke="#dc2626" strokeWidth={1.5} />
  );
}

export default function ItineraryRouteSchematic({ route, tourCities }: Props) {
  // Use parameterized approach if tourCities provided, otherwise fall back to route-based
  const useParameterized = tourCities && tourCities.length > 0;

  if (!useParameterized && (!route || route.segments.length === 0)) {
    return (
      <div className="text-center text-gray-500 p-4">
        Unable to render route map
      </div>
    );
  }

  // Parameterized map rendering
  if (useParameterized && tourCities) {
    const bounds = calculateMapBounds(tourCities);
    const viewBox = calculateSvgViewBox(bounds);

    // Convert city IDs to geographic coordinates and then to SVG coordinates
    const geoCoords = tourCities
      .map(id => getCityCoord(id))
      .filter((coord): coord is CityCoord => coord !== null)
      .map(coord => ({ lon: coord.lon, lat: coord.lat }));

    const svgCoords = geoToSvgBatch(geoCoords, bounds, viewBox);

    // Create city position lookup for consistent rendering
    const cityPositions: Record<string, { x: number; y: number }> = {};
    tourCities.forEach((cityId, idx) => {
      const coord = svgCoords[idx];
      if (coord) {
        cityPositions[cityId] = { x: coord.x, y: coord.y };
      }
    });

    const viewBoxString = `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;

    return (
      <div className="w-full flex justify-center bg-white p-4 rounded-lg shadow-sm">
        <svg
          viewBox={viewBoxString}
          className="w-full max-w-2xl"
          style={{ aspectRatio: `${viewBox.width} / ${viewBox.height}` }}
          role="img"
          aria-label="Tour Route Map"
        >
          {/* Background */}
          <rect
            x={viewBox.x}
            y={viewBox.y}
            width={viewBox.width}
            height={viewBox.height}
            fill="#fafafa"
            stroke="#e5e7eb"
            strokeWidth="1"
          />

          {/* Route segments */}
          {tourCities.map((cityId, idx) => {
            if (idx === 0) return null; // Skip first city as starting point
            const fromId = tourCities[idx - 1];
            const fromPos = cityPositions[fromId];
            const toPos = cityPositions[cityId];

            if (!fromPos || !toPos) return null;

            const bend = idx % 2 === 0 ? 30 : -30;
            const cx1 = fromPos.x + (toPos.x - fromPos.x) * 0.25 + bend;
            const cy1 = fromPos.y + (toPos.y - fromPos.y) * 0.1 - Math.abs(bend) * 0.8;
            const cx2 = fromPos.x + (toPos.x - fromPos.x) * 0.75 + bend * 0.4;
            const cy2 = toPos.y + (fromPos.y - toPos.y) * 0.1 - Math.abs(bend) * 0.4;
            const mx = (fromPos.x + toPos.x) / 2 + bend * 0.6;
            const my = (fromPos.y + toPos.y) / 2 - Math.abs(bend) * 0.7;

            return (
              <g key={`${fromId}-${cityId}-${idx}`}>
                {/* Route curve */}
                <path
                  d={`M ${fromPos.x} ${fromPos.y} C ${cx1} ${cy1} ${cx2} ${cy2} ${toPos.x} ${toPos.y}`}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  markerEnd="url(#arrowhead)"
                />
                {/* Transport icon placeholder */}
                <circle cx={mx} cy={my} r={14} fill="white" stroke="#dc2626" strokeWidth={1.5} />
              </g>
            );
          })}

          {/* City nodes */}
          {tourCities.map(cityId => {
            const pos = cityPositions[cityId];
            if (!pos) return null;
            return (
              <g key={cityId}>
                <circle cx={pos.x} cy={pos.y} r="5" fill="#1e293b" />
                <circle cx={pos.x} cy={pos.y} r="8" fill="none" stroke="#1e293b" strokeWidth="1" opacity="0.3" />
              </g>
            );
          })}

          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#dc2626" />
            </marker>
          </defs>
        </svg>
      </div>
    );
  }

  // Route-based rendering (original approach)
  const cities = route!.segments.map(s => [s.fromId, s.toId]).flat();
  const uniqueCities = Array.from(new Set(cities));

  // 计算viewBox
  const xCoords = uniqueCities.map(id => pos(id).x);
  const yCoords = uniqueCities.map(id => pos(id).y);
  const minX = Math.min(...xCoords);
  const maxX = Math.max(...xCoords);
  const minY = Math.min(...yCoords);
  const maxY = Math.max(...yCoords);

  const padding = 80;
  const viewBoxX = minX - padding;
  const viewBoxY = minY - padding;
  const viewBoxWidth = maxX - minX + padding * 2;
  const viewBoxHeight = maxY - minY + padding * 2;

  return (
    <div className="w-full flex justify-center bg-white p-4 rounded-lg shadow-sm">
      <svg
        viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full max-w-2xl"
        style={{ aspectRatio: `${viewBoxWidth} / ${viewBoxHeight}` }}
        role="img"
        aria-label="Tour Route Map"
      >
        {/* 背景 */}
        <rect
          x={viewBoxX}
          y={viewBoxY}
          width={viewBoxWidth}
          height={viewBoxHeight}
          fill="#fafafa"
          stroke="#e5e7eb"
          strokeWidth="1"
        />

        {/* 路线段 */}
        {route!.segments.map((segment, idx) => {
          const fromPos = pos(segment.fromId);
          const toPos = pos(segment.toId);
          const bend = idx % 2 === 0 ? 30 : -30;
          const { cx1, cy1, cx2, cy2, mx, my } = curvePoints(
            fromPos.x,
            fromPos.y,
            toPos.x,
            toPos.y,
            bend
          );

          return (
            <g key={`${segment.fromId}-${segment.toId}-${idx}`}>
              {/* 路线曲线 */}
              <path
                d={`M ${fromPos.x} ${fromPos.y} C ${cx1} ${cy1} ${cx2} ${cy2} ${toPos.x} ${toPos.y}`}
                fill="none"
                stroke="#dc2626"
                strokeWidth="2.5"
                strokeLinecap="round"
                markerEnd="url(#arrowhead)"
              />
              {/* 交通方式图标 */}
              <SegmentIcon transport={segment.transport} x={mx} y={my} />
            </g>
          );
        })}

        {/* 城市节点 */}
        {uniqueCities.map(cityId => {
          const { x, y } = pos(cityId);
          return (
            <g key={cityId}>
              <circle cx={x} cy={y} r="5" fill="#1e293b" />
              <circle cx={x} cy={y} r="8" fill="none" stroke="#1e293b" strokeWidth="1" opacity="0.3" />
            </g>
          );
        })}

        {/* 箭头定义 */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#dc2626" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
