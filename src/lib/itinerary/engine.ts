/**
 * 行程生成引擎
 * 核心逻辑：根据客户信息、天数、预算智能推荐景点和住宿
 */

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  groupSize: number
}

export interface ItineraryRequest {
  customer: CustomerInfo
  destination: string // 新西兰目的地：'auckland' | 'rotorua' | 'queenstown' | 'hobbiton' | 'waitomo' | 'taupo'
  days: number
  budget: number // 总预算，单位：元
  customerType: 'reward' | 'student' | 'family' | 'couple' | 'adventure'
  preferences?: string[] // ['cultural', 'nature', 'food', 'shopping']
}

export interface AttractionItem {
  id: string
  name: string
  description: string
  image: string
  price: number
  duration: number // 小时
  category: string
}

export interface AccommodationItem {
  id: string
  name: string
  city: string
  stars: number
  pricePerNight: number
  image: string
}

export interface DayItinerary {
  day: number
  title: string
  theme: string
  attractions: AttractionItem[]
  meals: {
    breakfast?: string
    lunch?: string
    dinner?: string
  }
  accommodation?: AccommodationItem
  notes: string
  // 新西兰格式支持：早、中、晚三段
  schedule?: {
    morning?: string
    afternoon?: string
    evening?: string
  }
}

export interface GeneratedItinerary {
  id: string
  request: ItineraryRequest
  days: DayItinerary[]
  costBreakdown: {
    attractions: number
    accommodation: number
    meals: number
    other: number
    total: number
  }
  highlights?: string[] // 行程亮点总结
  createdAt: string
}

/**
 * 行程生成引擎类
 */
export class ItineraryGenerator {
  // 预设的景点库（这里用测试数据，生产环境从 DB 读取）
  private attractions: Map<string, AttractionItem[]> = new Map()
  private accommodations: Map<string, AccommodationItem[]> = new Map()

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    // ===== 新西兰景点库（本系统仅支持新西兰目的地） =====
    // 奥克兰景点
    this.attractions.set('auckland', [
      {
        id: 'sky-tower',
        name: '天空塔 Sky Tower',
        description: '南半球最高建筑（328米），360度俯瞰奥克兰全景',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 0,
        duration: 2,
        category: 'modern',
      },
      {
        id: 'auckland-harbour',
        name: '奥克兰海港游船',
        description: '乘坐帆船体验"风帆之都"的魅力，穿过海港大桥',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 80,
        duration: 2.5,
        category: 'adventure',
      },
      {
        id: 'mount-eden',
        name: '伊甸山 Mt Eden',
        description: '古老火山遗迹，可俯瞰奥克兰城市全景',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 0,
        duration: 1.5,
        category: 'nature',
      },
      {
        id: 'waitangi-treaty',
        name: '怀唐伊条约地',
        description: '新西兰建立的重要历史场所，毛利文化和欧洲殖民的交汇点',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 50,
        duration: 3,
        category: 'cultural',
      },
    ])

    // 罗托鲁阿景点（地热和毛利文化）
    this.attractions.set('rotorua', [
      {
        id: 'te-puia',
        name: 'Te Puia 地热公园',
        description: '观赏普胡图间歇喷泉、地热泥浆池、硫磺温泉，看新西兰国鸟奇异鸟',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 45,
        duration: 3,
        category: 'nature',
      },
      {
        id: 'polynesian-spa',
        name: '波利尼西亚温泉 Polynesian Spa',
        description: '享受天然地热温泉，放松身心，了解温泉科学和健康知识',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 70,
        duration: 2,
        category: 'wellness',
      },
      {
        id: 'redwoods-forest',
        name: '红木森林 Redwoods',
        description: '观察森林生态，学习生物多样性和自然保护，可体验空中步道',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 30,
        duration: 2,
        category: 'nature',
      },
      {
        id: 'luge-skyline',
        name: '山顶缆车与Luge滑道',
        description: '乘坐缆车登上罗吐鲁阿山顶，俯瞰全景，体验滑板车冒险',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 85,
        duration: 2.5,
        category: 'adventure',
      },
      {
        id: 'agrodome-farm',
        name: '爱歌顿牧场',
        description: '体验传统农场生活，喂羊和其他动物，品尝奇异果酒和蜂蜜',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 55,
        duration: 2,
        category: 'family',
      },
    ])

    // 皇后镇景点（冒险和风景）
    this.attractions.set('queenstown', [
      {
        id: 'milford-sound',
        name: '米佛峡湾 Milford Sound',
        description: '世界第八奇迹，冰河切割的壮丽峡谷，游船观赏雪山和海豹',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 120,
        duration: 5,
        category: 'nature',
      },
      {
        id: 'arrow-town',
        name: '箭镇 Arrowtown',
        description: '淘金历史小镇，金秋五彩林，品酒和购物天堂',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 60,
        duration: 3,
        category: 'cultural',
      },
      {
        id: 'gibbston-wine',
        name: '吉布斯顿谷酒庄',
        description: '新西兰顶级葡萄酒产区，品尝黑皮诺葡萄酒',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 50,
        duration: 2,
        category: 'food',
      },
      {
        id: 'dart-river-jet',
        name: '达特河喷射快艇',
        description: '刺激的河流喷射快艇，毛利遗产探索，魔戒取景地',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 110,
        duration: 3,
        category: 'adventure',
      },
      {
        id: 'glenorchy-walk',
        name: '格林诺奇风景路及徒步',
        description: '世界最美公路之一，魔戒取景地，原始森林徒步',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 40,
        duration: 4,
        category: 'nature',
      },
    ])

    // 陶波湖景点
    this.attractions.set('taupo', [
      {
        id: 'huka-falls',
        name: '胡卡瀑布 Huka Falls',
        description: '壮观的瀑布，清澈的冰川湖水，可选择Jet Boat冲浪体验',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 75,
        duration: 2.5,
        category: 'nature',
      },
      {
        id: 'taupo-lake',
        name: '陶波湖湖区',
        description: '火山地貌和湖景，毛利岩石雕刻游船，了解毛利文化',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 65,
        duration: 3,
        category: 'cultural',
      },
    ])

    // 北岛其他景点（怀托摩等）
    this.attractions.set('waitomo', [
      {
        id: 'glowworm-caves',
        name: '怀托摩萤火虫洞 Waitomo Glowworm Caves',
        description: '乘船观赏萤火虫，古老洞穴生态，神秘地下世界',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 55,
        duration: 2,
        category: 'nature',
      },
    ])

    // 霍比特人村（北岛中部）
    this.attractions.set('hobbiton', [
      {
        id: 'hobbiton-movie-set',
        name: '霍比特人村 Hobbiton',
        description: '中土世界电影布景，哈比人电影探索与寻宝游戏，拍摄短视频',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 65,
        duration: 3,
        category: 'cultural',
      },
      {
        id: 'blue-spring',
        name: '蓝泉 Blue Spring',
        description: '清澈的地热温泉，碧蓝色的温泉水，自然生态',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        price: 30,
        duration: 1.5,
        category: 'nature',
      },
    ])

    // ===== 新西兰住宿（本系统仅支持新西兰目的地） =====
    // 奥克兰住宿
    this.accommodations.set('auckland', [
      {
        id: 'auckland-hilton',
        name: '奥克兰希尔顿酒店',
        city: 'auckland',
        stars: 5,
        pricePerNight: 350,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'auckland-sofitel',
        name: '奥克兰索菲特',
        city: 'auckland',
        stars: 4,
        pricePerNight: 220,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      },
    ])

    // 罗托鲁阿住宿
    this.accommodations.set('rotorua', [
      {
        id: 'rotorua-sheraton',
        name: '罗托鲁阿喜来登',
        city: 'rotorua',
        stars: 5,
        pricePerNight: 300,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'rotorua-lake-resort',
        name: '罗托鲁阿湖景度假村',
        city: 'rotorua',
        stars: 4,
        pricePerNight: 180,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      },
    ])

    // 皇后镇住宿
    this.accommodations.set('queenstown', [
      {
        id: 'queenstown-hyatt',
        name: '皇后镇凯悦酒店',
        city: 'queenstown',
        stars: 5,
        pricePerNight: 320,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'queenstown-marriott',
        name: '皇后镇万豪酒店',
        city: 'queenstown',
        stars: 4,
        pricePerNight: 200,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      },
    ])

    // 陶波住宿
    this.accommodations.set('taupo', [
      {
        id: 'taupo-resort',
        name: '陶波度假村',
        city: 'taupo',
        stars: 4,
        pricePerNight: 160,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      },
    ])
  }

  /**
   * 生成行程
   */
  generate(request: ItineraryRequest): GeneratedItinerary {
    const days: DayItinerary[] = []
    const attractions = this.attractions.get(request.destination) || []
    const accommodations = this.accommodations.get(request.destination) || []

    // 预算分配
    const budgetPerDay = request.budget / request.days
    const groupSize = request.customer.groupSize || 1
    const attractionBudgetPerDay = (budgetPerDay * 0.4) / groupSize // 40% 分给景点
    const accommodationBudgetPerDay = (budgetPerDay * 0.35) / groupSize // 35% 分给住宿
    const mealBudgetPerDay = (budgetPerDay * 0.2) / groupSize // 20% 分给餐食
    const otherBudget = (budgetPerDay * 0.05) / groupSize // 5% 杂费

    // 按偏好筛选景点
    let filteredAttractions = attractions
    if (request.preferences && request.preferences.length > 0) {
      filteredAttractions = attractions.filter((a) =>
        request.preferences!.includes(a.category)
      )
    }

    // 排序景点（按价格和时长平衡）
    filteredAttractions = filteredAttractions.sort((a, b) => {
      const scoreA = a.price / a.duration
      const scoreB = b.price / b.duration
      return scoreA - scoreB
    })

    // 为每一天生成行程
    for (let dayNum = 1; dayNum <= request.days; dayNum++) {
      const dayAttractions: AttractionItem[] = []
      let dayAttractionCost = 0

      // 选择该天的景点
      for (const attraction of filteredAttractions) {
        const totalCost = (dayAttractionCost + attraction.price) * groupSize
        if (totalCost <= attractionBudgetPerDay * groupSize * request.days) {
          dayAttractions.push(attraction)
          dayAttractionCost += attraction.price
          if (dayAttractions.length >= 3) break
        }
      }

      // 选择住宿
      const accomodation = accommodations.find(
        (a) =>
          a.pricePerNight <= accommodationBudgetPerDay * groupSize &&
          a.stars >= (request.customerType === 'reward' ? 5 : request.customerType === 'adventure' ? 3 : 4)
      )

      const dayObj: DayItinerary = {
        day: dayNum,
        title: `第 ${dayNum} 天 - ${this.generateDayTitle(dayNum, request.days)}`,
        theme: this.generateDayTheme(dayNum, request.customerType),
        attractions: dayAttractions,
        meals: {
          breakfast: '酒店自助早餐',
          lunch: '当地特色餐厅',
          dinner: '特色晚餐',
        },
        accommodation: accomodation || accommodations[0],
        notes: this.generateDayNotes(dayNum, request),
        schedule: {
          morning: this.generateMorningSchedule(dayNum, request.destination, dayAttractions),
          afternoon: this.generateAfternoonSchedule(dayNum, request.destination, dayAttractions),
          evening: this.generateEveningSchedule(dayNum, request.destination),
        },
      }
      days.push(dayObj)
    }

    // 计算成本
    const selectedAccommodation = accommodations.find(
      (a) =>
        a.pricePerNight <= accommodationBudgetPerDay * groupSize &&
        a.stars >= (request.customerType === 'reward' ? 5 : request.customerType === 'adventure' ? 3 : 4)
    ) || accommodations[0]

    const totalAttractionCost = days.reduce((sum, day) => {
      return sum + day.attractions.reduce((daySum, attr) => daySum + attr.price, 0)
    }, 0) * groupSize

    const totalAccommodationCost = (selectedAccommodation?.pricePerNight || 0) * (request.days - 1) * groupSize

    const totalMealCost = mealBudgetPerDay * request.days * groupSize

    const totalOtherCost = otherBudget * request.days * groupSize

    const highlights = this.generateHighlights(request, days)

    return {
      id: this.generateId(),
      request,
      days,
      highlights,
      costBreakdown: {
        attractions: totalAttractionCost,
        accommodation: totalAccommodationCost,
        meals: totalMealCost,
        other: totalOtherCost,
        total: request.budget,
      },
      createdAt: new Date().toISOString(),
    }
  }

  private generateDayTitle(dayNum: number, totalDays: number): string {
    const titles = [
      '抵达与探索',
      '文化之旅',
      '自然景观',
      '深度体验',
      '当地风情',
      '返回出发地',
      '休闲漫步',
    ]
    return titles[Math.min(dayNum - 1, titles.length - 1)]
  }

  private generateDayTheme(dayNum: number, customerType: string): string {
    const themes: Record<string, string[]> = {
      reward: ['奢华体验', '美食盛宴', '文化探索', '休闲放松'],
      adventure: ['冒险刺激', '户外探索', '挑战极限', '自然体验'],
      family: ['亲子互动', '寓教于乐', '舒适便利', '温馨时刻'],
      couple: ['浪漫邂逅', '美景共赏', '私密体验', '甜蜜时光'],
      student: ['文化学习', '经济实惠', '社交体验', '见闻拓展'],
    }

    const themeList = themes[customerType] || themes.family
    return themeList[(dayNum - 1) % themeList.length]
  }

  private generateDayNotes(dayNum: number, request: ItineraryRequest): string {
    return `第 ${dayNum} 天行程安排。${request.customerType === 'reward' ? '享受五星级服务与顶级体验。' : request.customerType === 'adventure' ? '准备好挑战自我的冒险时刻。' : '全家一起享受美好时光。'}`
  }

  private generateMorningSchedule(dayNum: number, destination: string, attractions: AttractionItem[]): string {
    const schedules: Record<string, string[]> = {
      auckland: [
        '上午从奥克兰出发，乘车前往景点',
        '早餐后在酒店休息，准备今日行程',
        '上午乘车返回奥克兰市区',
        '早餐后出发前往新的目的地',
      ],
      rotorua: [
        '上午游览Te Puia地热公园',
        '早餐后前往红木森林',
        '上午乘车前往陶波湖',
        '早餐后参加牧场活动',
      ],
      queenstown: [
        '早餐后前往米佛峡湾',
        '上午乘车前往箭镇',
        '早餐后准备刺激的达特河快艇',
        '上午格林诺奇徒步',
      ],
      taupo: [
        '上午参观胡卡瀑布',
        '早餐后在陶波湖区观光',
        '上午乘车返回皇后镇',
      ],
      hobbiton: [
        '上午从奥克兰出发，乘车前往霍比特人村',
        '早餐后前往蓝泉',
      ],
    }

    const destinationSchedules = schedules[destination] || schedules.auckland
    return destinationSchedules[(dayNum - 1) % destinationSchedules.length]
  }

  private generateAfternoonSchedule(dayNum: number, destination: string, attractions: AttractionItem[]): string {
    const schedules: Record<string, string[]> = {
      auckland: [
        '下午游览伊甸山，俯瞰奥克兰全景',
        '下午在市区观光购物',
        '下午自由活动',
        '下午乘车返回出发地',
      ],
      rotorua: [
        '下午罗托鲁阿市区观光，参观罗托鲁阿湖和花园',
        '下午参观蓝湖绿湖观景区',
        '下午乘车返回皇后镇',
        '下午体验爱歌顿牧场',
      ],
      queenstown: [
        '下午乘游轮畅游米佛峡湾',
        '下午参观吉布斯顿谷酒庄',
        '下午自由活动或探索皇后镇',
        '下午乘车返回皇后镇',
      ],
      taupo: [
        '下午安排陶波湖湖区观光和自由活动',
        '下午返回皇后镇',
      ],
      hobbiton: [
        '下午参观蓝泉景区',
        '下午继续探索中土世界',
      ],
    }

    const destinationSchedules = schedules[destination] || schedules.auckland
    return destinationSchedules[(dayNum - 1) % destinationSchedules.length]
  }

  private generateEveningSchedule(dayNum: number, destination: string): string {
    const schedules: Record<string, string[]> = {
      auckland: [
        '晚间在特色餐厅享用三道式晚餐',
        '晚上可选择主题晚宴',
        '晚上返回酒店休息',
        '晚上入住酒店',
      ],
      rotorua: [
        '晚上在白云峰餐厅享用三道式牛排晚餐',
        '晚上在山顶餐厅享用自助晚餐，欣赏夜景',
        '晚上安排温泉体验Polynesian Spa',
        '晚上返回酒店休息',
      ],
      queenstown: [
        '晚间品尝新西兰葡萄酒和特色餐点',
        '晚上返回皇后镇，入住酒店',
        '晚餐后返回酒店休息',
      ],
      taupo: [
        '晚上返回皇后镇',
        '晚上入住酒店',
      ],
      hobbiton: [
        '傍晚抵达罗托鲁阿，入住酒店',
        '晚上享用当地特色晚餐',
      ],
    }

    const destinationSchedules = schedules[destination] || schedules.auckland
    return destinationSchedules[(dayNum - 1) % destinationSchedules.length]
  }

  private generateHighlights(request: ItineraryRequest, days: DayItinerary[]): string[] {
    const highlights: string[] = []

    // 根据目的地和天数生成亮点
    const destination = request.destination.toLowerCase()

    if (destination.includes('auckland')) {
      highlights.push('南半球最高建筑天空塔体验')
      highlights.push('风帆之都奥克兰海港游船')
      highlights.push('伊甸山俯瞰城市全景')
    }

    if (destination.includes('rotorua')) {
      highlights.push('Te Puia地热公园喷泉和间歇泉奇观')
      highlights.push('波利尼西亚温泉放松身心')
      highlights.push('红木森林生态探索')
      highlights.push('山顶缆车与Luge滑道冒险')
      highlights.push('爱歌顿牧场体验真正的农场生活')
    }

    if (destination.includes('queenstown') || destination.includes('milford')) {
      highlights.push('米佛峡湾"世界第八奇迹"之旅')
      highlights.push('冰河切割的壮丽峡谷美景')
      highlights.push('箭镇金秋五彩林风景')
      highlights.push('达特河喷射快艇刺激体验')
      highlights.push('魔戒取景地探访')
    }

    if (destination.includes('taupo')) {
      highlights.push('胡卡瀑布壮观景观')
      highlights.push('火山地貌和湖景')
      highlights.push('毛利文化深度体验')
    }

    if (destination.includes('hobbiton') || destination.includes('waitomo')) {
      highlights.push('霍比特人村中土世界电影布景')
      highlights.push('创意拍摄和寻宝游戏')
      highlights.push('怀托摩萤火虫洞神秘探秘')
      highlights.push('蓝泉地热温泉')
    }

    // 根据客户类型补充亮点
    if (request.customerType === 'reward') {
      highlights.push('五星级酒店和顶级美食体验')
      highlights.push('专属导游和豪华车队服务')
    } else if (request.customerType === 'student') {
      highlights.push('丰富互动体验和团队建设活动')
      highlights.push('教育性景点和文化学习机会')
      highlights.push('经济实惠的行程安排')
    } else if (request.customerType === 'adventure') {
      highlights.push('刺激的户外冒险活动')
      highlights.push('挑战极限的体验项目')
      highlights.push('原始纯净的自然环境')
    }

    return highlights
  }

  private generateId(): string {
    return `itinerary-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}
