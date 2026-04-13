/**
 * 城市地理坐标库
 * 所有主要旅游城市的经纬度坐标（WGS84）
 */

export interface CityCoord {
  lon: number; // 经度
  lat: number; // 纬度
  cnName: string; // 中文名
}

export const CITY_GEO_COORDINATES: Record<string, CityCoord> = {
  // 北方城市
  beijing: {
    lon: 116.4074,
    lat: 39.9042,
    cnName: '北京',
  },
  xian: {
    lon: 108.948,
    lat: 34.3416,
    cnName: '西安',
  },

  // 中部城市
  chengdu: {
    lon: 104.0666,
    lat: 30.5728,
    cnName: '成都',
  },
  chongqing: {
    lon: 106.5516,
    lat: 29.5630,
    cnName: '重庆',
  },
  zhangjiajie: {
    lon: 110.4793,
    lat: 29.1171,
    cnName: '张家界',
  },

  // 东部/江浙沪城市
  shanghai: {
    lon: 121.4737,
    lat: 31.2304,
    cnName: '上海',
  },
  suzhou: {
    lon: 120.5954,
    lat: 31.2989,
    cnName: '苏州',
  },
  wuxi: {
    lon: 120.3055,
    lat: 31.4912,
    cnName: '无锡',
  },
  hangzhou: {
    lon: 120.1551,
    lat: 30.2741,
    cnName: '杭州',
  },
  xinshi: {
    lon: 120.5,
    lat: 30.8333,
    cnName: '新市',
  },

  // 南方城市
  guilin: {
    lon: 110.2865,
    lat: 25.2827,
    cnName: '桂林',
  },
  yangshuo: {
    lon: 110.4865,
    lat: 24.7758,
    cnName: '阳朔',
  },

  // 云南城市
  kunming: {
    lon: 102.7103,
    lat: 24.8801,
    cnName: '昆明',
  },
  lijiang: {
    lon: 100.2299,
    lat: 26.8742,
    cnName: '丽江',
  },
  dali: {
    lon: 100.1317,
    lat: 25.5995,
    cnName: '大理',
  },

  // 其他城市
  hongkong: {
    lon: 114.1095,
    lat: 22.3193,
    cnName: '香港',
  },
};

/**
 * 根据城市ID获取城市坐标
 */
export function getCityCoord(cityId: string): CityCoord | null {
  return CITY_GEO_COORDINATES[cityId] || null;
}

/**
 * 批量获取多个城市的坐标
 */
export function getCityCoordsForTour(cityIds: string[]): CityCoord[] {
  return cityIds
    .map((id) => getCityCoord(id))
    .filter((coord): coord is CityCoord => coord !== null);
}
