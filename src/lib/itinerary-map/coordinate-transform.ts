/**
 * 坐标转换函数
 * 将地理坐标（经纬度）转换为SVG坐标
 */

import { CITY_GEO_COORDINATES, CityCoord } from './city-geo-coordinates';

export interface MapBounds {
  minLon: number;
  maxLon: number;
  minLat: number;
  maxLat: number;
  centerLon: number;
  centerLat: number;
  spanLon: number;
  spanLat: number;
}

export interface SvgViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SvgCoord {
  x: number;
  y: number;
}

/**
 * 根据城市列表计算地理边界框
 * 添加10%的padding以确保城市不会贴边
 */
export function calculateMapBounds(cityIds: string[]): MapBounds {
  const cities = cityIds
    .map((id) => CITY_GEO_COORDINATES[id])
    .filter((c): c is CityCoord => c !== null);

  if (cities.length === 0) {
    // 默认返回中国范围
    return {
      minLon: 73,
      maxLon: 135,
      minLat: 18,
      maxLat: 53,
      centerLon: 104,
      centerLat: 35.5,
      spanLon: 62,
      spanLat: 35,
    };
  }

  let minLon = cities[0].lon;
  let maxLon = cities[0].lon;
  let minLat = cities[0].lat;
  let maxLat = cities[0].lat;

  for (const city of cities) {
    minLon = Math.min(minLon, city.lon);
    maxLon = Math.max(maxLon, city.lon);
    minLat = Math.min(minLat, city.lat);
    maxLat = Math.max(maxLat, city.lat);
  }

  // 添加padding（10%）
  const lonPadding = (maxLon - minLon) * 0.15;
  const latPadding = (maxLat - minLat) * 0.15;

  minLon -= lonPadding;
  maxLon += lonPadding;
  minLat -= latPadding;
  maxLat += latPadding;

  return {
    minLon,
    maxLon,
    minLat,
    maxLat,
    centerLon: (minLon + maxLon) / 2,
    centerLat: (minLat + maxLat) / 2,
    spanLon: maxLon - minLon,
    spanLat: maxLat - minLat,
  };
}

/**
 * 根据地理边界框计算SVG viewBox
 * 保持宽高比，viewBox高度为640px
 */
export function calculateSvgViewBox(bounds: MapBounds): SvgViewBox {
  const viewBoxHeight = 640;
  const aspectRatio = bounds.spanLon / bounds.spanLat;
  const viewBoxWidth = viewBoxHeight * aspectRatio;

  return {
    x: 0,
    y: 0,
    width: viewBoxWidth,
    height: viewBoxHeight,
  };
}

/**
 * 将地理坐标转换为SVG坐标
 *
 * @param lon 经度
 * @param lat 纬度
 * @param bounds 地理边界框
 * @param viewBox SVG viewBox
 * @returns SVG坐标 { x, y }
 */
export function geoToSvg(
  lon: number,
  lat: number,
  bounds: MapBounds,
  viewBox: SvgViewBox
): SvgCoord {
  // 线性映射
  // SVG坐标系：原点在左上角，Y轴向下
  // 地理坐标系：纬度增大向北，需要反转

  const x =
    ((lon - bounds.minLon) / bounds.spanLon) * viewBox.width + viewBox.x;
  const y =
    ((bounds.maxLat - lat) / bounds.spanLat) * viewBox.height + viewBox.y;

  return { x, y };
}

/**
 * 将地理坐标列表转换为SVG坐标列表
 */
export function geoToSvgBatch(
  coords: { lon: number; lat: number }[],
  bounds: MapBounds,
  viewBox: SvgViewBox
): SvgCoord[] {
  return coords.map((coord) => geoToSvg(coord.lon, coord.lat, bounds, viewBox));
}

/**
 * 生成SVG viewBox字符串
 */
export function getSvgViewBoxString(viewBox: SvgViewBox): string {
  return `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;
}
