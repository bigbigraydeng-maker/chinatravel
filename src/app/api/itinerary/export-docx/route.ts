import { NextRequest, NextResponse } from 'next/server'
import { GeneratedItinerary } from '@/lib/itinerary/engine'
import { getAttractionImageUrl, NZ_COVER_IMAGE_URL } from '@/lib/itinerary/attraction-images'
// 注：next.config.js 的 serverComponentsExternalPackages: ['docx'] 让 Next.js 不打包 docx，
// 直接 require()，命名导入即可正常工作（无需 namespace import 解构）
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  WidthType,
  ShadingType,
  ImageRun,
  Footer,
  PageNumber,
} from 'docx'

/** 空白段落 + 下一个段落 pageBreakBefore 的替代方案：
 *  用 TextRun({ break: ... }) 的做法在 docx 8.x 更稳定 */
function pageBreakParagraph(): Paragraph {
  return new Paragraph({
    children: [new TextRun({ break: 1 })],
    pageBreakBefore: true,
  })
}

/**
 * POST /api/itinerary/export-docx
 * 生成可编辑的 Word 行程草稿，供 OP 员工根据客户反馈微调后再交付
 *
 * 设计思路：
 * - 结构化段落 + 表格：格式稳定，员工在 Word 中调整不容易弄乱
 * - 中文字体「宋体」+ 英文「Calibri」：跨 Windows/Mac/WPS 均显示正常
 * - 行程每日单独分页，方便员工增删/重排
 */
export async function POST(request: NextRequest) {
  try {
    const { itinerary } = (await request.json()) as { itinerary: GeneratedItinerary }

    const buffer = await generateDocxBuffer(itinerary)

    const safeName = sanitizeFilename(itinerary.request.customer.name)
    const filename = `itinerary-${safeName}-${itinerary.id}.docx`

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[DOCX Export] Failed:', message)
    console.error('[DOCX Export] Stack:', error instanceof Error ? error.stack : 'N/A')
    return NextResponse.json(
      { message: 'Word 文档生成失败: ' + message },
      { status: 500 }
    )
  }
}

// ===== 工具函数 =====

const DESTINATION_NAMES: Record<string, string> = {
  auckland: '奥克兰',
  rotorua: '罗托鲁阿',
  queenstown: '皇后镇',
  hobbiton: '霍比特人村',
  waitomo: '怀托摩',
  taupo: '陶波',
}

const CUSTOMER_TYPE_NAMES: Record<string, string> = {
  reward: '奖励旅游（高端豪华）',
  family: '家庭旅游（舒适便利）',
  couple: '蜜月旅游（浪漫温馨）',
  adventure: '冒险旅游（刺激探险）',
  student: '学生旅游（经济实惠）',
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w\u4e00-\u9fa5]/g, '_').slice(0, 40) || 'customer'
}

// 字体定义：使用宋体，对中文和英文都能覆盖显示
// 注：docx@8.x 的 TextRun.font 只接受字符串（不支持 {ascii, eastAsia} 对象）
const FONT_CN = '宋体'

// 颜色（十六进制，不带 #）
const COLOR_PRIMARY = '8B6F47' // 暖棕色
const COLOR_PRIMARY_LIGHT = 'D4A574' // 浅金色（封面装饰条）
const COLOR_ACCENT = '2C1810'  // 深棕黑
const COLOR_GRAY = '666666'
const COLOR_LIGHT_GRAY = '888888'
const COLOR_LIGHT_BG = 'FFF9F0'

// 城市名映射（accommodation.city 字段是英文 slug，需转中文）
const CITY_CN: Record<string, string> = {
  auckland: '奥克兰',
  rotorua: '罗托鲁阿',
  queenstown: '皇后镇',
  hobbiton: '霍比特人村',
  waitomo: '怀托摩',
  taupo: '陶波',
  wellington: '惠灵顿',
  christchurch: '基督城',
}

/** 标题行（Heading 1） */
function h1(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 200 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 44, // docx size 单位为 half-points，所以 44 = 22pt
        font: FONT_CN,
        color: COLOR_ACCENT,
      }),
    ],
  })
}

/** Section 大标题（左对齐 + 橙色色块前缀，比 h1 居中更有"专业感"） */
function sectionTitle(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 240, after: 200 },
    children: [
      new TextRun({
        text: '▎',
        bold: true,
        size: 48,
        font: FONT_CN,
        color: COLOR_PRIMARY,
      }),
      new TextRun({
        text: ` ${text}`,
        bold: true,
        size: 36, // 18pt
        font: FONT_CN,
        color: COLOR_ACCENT,
      }),
    ],
  })
}

/** 副标题 */
function h2(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 32, // 16pt
        font: FONT_CN,
        color: COLOR_PRIMARY,
      }),
    ],
  })
}

/** 小标题：如果以 ▎ 开头，则把 ▎ 单独用品牌橙色渲染 */
function h3(text: string): Paragraph {
  const useColorBar = text.startsWith('▎')
  const titleText = useColorBar ? text.slice(1) : text

  const runs: TextRun[] = []
  if (useColorBar) {
    runs.push(
      new TextRun({
        text: '▎',
        bold: true,
        size: 28,
        font: FONT_CN,
        color: COLOR_PRIMARY,
      })
    )
  }
  runs.push(
    new TextRun({
      text: titleText,
      bold: true,
      size: 26, // 13pt
      font: FONT_CN,
      color: COLOR_ACCENT,
    })
  )

  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: runs,
  })
}

/** 正文段落 */
function p(text: string, opts?: { bold?: boolean; color?: string; indent?: boolean }): Paragraph {
  return new Paragraph({
    spacing: { after: 120, line: 360 }, // 1.5 倍行距
    indent: opts?.indent ? { firstLine: 480 } : undefined,
    children: [
      new TextRun({
        text,
        bold: opts?.bold,
        size: 22, // 11pt
        font: FONT_CN,
        color: opts?.color,
      }),
    ],
  })
}

/** 标签 + 值 的行（粗体标签 + 普通值） */
function labeledLine(label: string, value: string): Paragraph {
  return new Paragraph({
    spacing: { after: 100, line: 320 },
    children: [
      new TextRun({
        text: `${label}：`,
        bold: true,
        size: 22,
        font: FONT_CN,
        color: COLOR_PRIMARY,
      }),
      new TextRun({
        text: value,
        size: 22,
        font: FONT_CN,
        color: '333333',
      }),
    ],
  })
}

/** 带项目符号的列表项（用「•」字符，避开 docx numbering 配置） */
function bullet(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 80, line: 320 },
    indent: { left: 360 },
    children: [
      new TextRun({
        text: `• ${text}`,
        size: 22,
        font: FONT_CN,
        color: '333333',
      }),
    ],
  })
}

/** 异步加载图片为 Buffer（5 秒超时，失败返回 null） */
async function loadImageBuffer(url: string): Promise<Buffer | null> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 5000)
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timer)
    if (!res.ok) return null
    const arr = await res.arrayBuffer()
    return Buffer.from(arr)
  } catch (e) {
    console.warn(`[DOCX Export] image load failed: ${url}`, e instanceof Error ? e.message : e)
    return null
  }
}

/** 把图片 Buffer 包装成一个段落（带左缩进与下间距） */
function imageParagraph(buffer: Buffer): Paragraph {
  return new Paragraph({
    indent: { left: 480 },
    spacing: { before: 80, after: 200 },
    children: [
      new ImageRun({
        data: buffer,
        transformation: { width: 360, height: 220 },
      } as any),
    ],
  })
}

/** 封面 hero 大图段落（横幅风格，几乎铺满页面宽度） */
function coverImageParagraph(buffer: Buffer): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
    children: [
      new ImageRun({
        data: buffer,
        // 640 px ≈ 16.9cm（贴合 A4 正文宽度 17cm），270 px ≈ 7.1cm（cinematic 21:9）
        transformation: { width: 640, height: 270 },
      } as any),
    ],
  })
}

/** 装饰横条（封面顶部/底部用） */
function decorativeBar(color: string, height: number = 80): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    },
    rows: [
      new TableRow({
        height: { value: height, rule: 'exact' as any },
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: color, color: 'auto' },
            children: [new Paragraph({ children: [new TextRun({ text: '', size: 2 })] })],
          }),
        ],
      }),
    ],
  })
}

/** 每日行程的彩色 Banner：左侧大号 DAY XX，右侧标题 + 主题 */
function dayBanner(dayNum: number, title: string, theme: string): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    },
    rows: [
      new TableRow({
        children: [
          // 左：DAY XX（暖橙底，白字）
          new TableCell({
            width: { size: 22, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: COLOR_PRIMARY, color: 'auto' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 240, after: 120 },
                children: [
                  new TextRun({
                    text: 'DAY',
                    bold: true,
                    size: 20,
                    font: FONT_CN,
                    color: 'FFFFFF',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 240 },
                children: [
                  new TextRun({
                    text: String(dayNum).padStart(2, '0'),
                    bold: true,
                    size: 64,
                    font: FONT_CN,
                    color: 'FFFFFF',
                  }),
                ],
              }),
            ],
          }),
          // 右：标题 + 主题（米色底）
          new TableCell({
            width: { size: 78, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: COLOR_LIGHT_BG, color: 'auto' },
            children: [
              new Paragraph({
                spacing: { before: 360, after: 120 },
                indent: { left: 360 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    size: 36,
                    font: FONT_CN,
                    color: COLOR_ACCENT,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 360 },
                indent: { left: 360 },
                children: [
                  new TextRun({
                    text: `主题：${theme}`,
                    italics: true,
                    size: 22,
                    font: FONT_CN,
                    color: COLOR_PRIMARY,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  })
}

/** 行程亮点：圆点编号 + 文字 */
function numberedHighlight(num: number, text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 100, line: 320 },
    indent: { left: 240 },
    children: [
      new TextRun({
        text: `${num.toString().padStart(2, '0')}  `,
        bold: true,
        size: 24,
        font: FONT_CN,
        color: COLOR_PRIMARY,
      }),
      new TextRun({
        text,
        size: 22,
        font: FONT_CN,
        color: '333333',
      }),
    ],
  })
}

/** 构建一个简单的两列表格 */
function buildInfoTable(rows: Array<[string, string]>): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: 'E8D5C4' },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E8D5C4' },
      left: { style: BorderStyle.SINGLE, size: 4, color: 'E8D5C4' },
      right: { style: BorderStyle.SINGLE, size: 4, color: 'E8D5C4' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: 'E8D5C4' },
      insideVertical: { style: BorderStyle.SINGLE, size: 2, color: 'E8D5C4' },
    },
    rows: rows.map(
      ([label, value], idx) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 30, type: WidthType.PERCENTAGE },
              shading: {
                type: ShadingType.CLEAR,
                fill: idx % 2 === 0 ? COLOR_LIGHT_BG : 'FFFFFF',
                color: 'auto',
              },
              children: [
                new Paragraph({
                  spacing: { before: 80, after: 80 },
                  children: [
                    new TextRun({
                      text: label,
                      bold: true,
                      size: 22,
                      font: FONT_CN,
                      color: COLOR_PRIMARY,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 70, type: WidthType.PERCENTAGE },
              shading: {
                type: ShadingType.CLEAR,
                fill: idx % 2 === 0 ? COLOR_LIGHT_BG : 'FFFFFF',
                color: 'auto',
              },
              children: [
                new Paragraph({
                  spacing: { before: 80, after: 80 },
                  children: [
                    new TextRun({
                      text: value,
                      size: 22,
                      font: FONT_CN,
                      color: '333333',
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
    ),
  })
}

/** 费用表格 + 总计行 */
function buildCostTable(items: Array<[string, string]>, totalLabel: string, totalValue: string): Table {
  const rows: TableRow[] = items.map(
    ([label, value]) =>
      new TableRow({
        children: [
          new TableCell({
            width: { size: 70, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                spacing: { before: 80, after: 80 },
                children: [
                  new TextRun({
                    text: label,
                    size: 22,
                    font: FONT_CN,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: 80, after: 80 },
                children: [
                  new TextRun({
                    text: value,
                    size: 22,
                    font: FONT_CN,
                  }),
                ],
              }),
            ],
          }),
        ],
      })
  )

  // 总计行
  rows.push(
    new TableRow({
      children: [
        new TableCell({
          width: { size: 70, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: COLOR_LIGHT_BG, color: 'auto' },
          children: [
            new Paragraph({
              spacing: { before: 100, after: 100 },
              children: [
                new TextRun({
                  text: totalLabel,
                  bold: true,
                  size: 26,
                  font: FONT_CN,
                  color: COLOR_ACCENT,
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: COLOR_LIGHT_BG, color: 'auto' },
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: { before: 100, after: 100 },
              children: [
                new TextRun({
                  text: totalValue,
                  bold: true,
                  size: 26,
                  font: FONT_CN,
                  color: COLOR_PRIMARY,
                }),
              ],
            }),
          ],
        }),
      ],
    })
  )

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: 'E8D5C4' },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E8D5C4' },
      left: { style: BorderStyle.SINGLE, size: 4, color: 'E8D5C4' },
      right: { style: BorderStyle.SINGLE, size: 4, color: 'E8D5C4' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: 'E8D5C4' },
      insideVertical: { style: BorderStyle.SINGLE, size: 2, color: 'E8D5C4' },
    },
    rows,
  })
}

/** 主生成函数 */
async function generateDocxBuffer(itinerary: GeneratedItinerary): Promise<Buffer> {
  const { request, days, costBreakdown, highlights } = itinerary
  const destName = DESTINATION_NAMES[request.destination] || request.destination
  const customerTypeName = CUSTOMER_TYPE_NAMES[request.customerType] || request.customerType

  const children: Array<Paragraph | Table> = []

  // ========== 封面 ==========
  // 顶部 Hero：先尝试加载大封面图，失败回退到纯色装饰条
  const coverBuf = await loadImageBuffer(NZ_COVER_IMAGE_URL)
  if (coverBuf) {
    children.push(coverImageParagraph(coverBuf))
  } else {
    // fallback：依然用原装饰条（约 1cm 高）
    children.push(decorativeBar(COLOR_PRIMARY, 567))
  }

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: coverBuf ? 600 : 1600, after: 400 },
      children: [
        new TextRun({
          text: '新西兰旅游服务',
          bold: true,
          size: 36,
          font: FONT_CN,
          color: COLOR_PRIMARY,
        }),
      ],
    })
  )
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: 'NZ Tours',
          italics: true,
          size: 24,
          font: FONT_CN,
          color: COLOR_GRAY,
        }),
      ],
    })
  )
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 600, after: 300 },
      children: [
        new TextRun({
          text: `${request.customer.name} 专属行程方案`,
          bold: true,
          size: 56,
          font: FONT_CN,
          color: COLOR_ACCENT,
        }),
      ],
    })
  )
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [
        new TextRun({
          text: `${destName} · ${request.days} 日深度之旅`,
          size: 32,
          font: FONT_CN,
          color: COLOR_PRIMARY,
        }),
      ],
    })
  )
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 1200 },
      children: [
        new TextRun({
          text: `生成时间：${new Date(itinerary.createdAt).toLocaleString('zh-CN')}`,
          size: 20,
          font: FONT_CN,
          color: COLOR_GRAY,
        }),
      ],
    })
  )
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 1200 },
      children: [
        new TextRun({
          text: `行程编号：${itinerary.id}`,
          size: 20,
          font: FONT_CN,
          color: COLOR_GRAY,
        }),
      ],
    })
  )

  // 封面底部装饰条（约 0.5cm 高，浅金色）
  children.push(decorativeBar(COLOR_PRIMARY_LIGHT, 280))

  // ========== 第 2 页：客户信息 ==========
  children.push(pageBreakParagraph())
  children.push(sectionTitle('客户信息'))
  children.push(
    buildInfoTable([
      ['姓名', request.customer.name],
      ['邮箱', request.customer.email],
      ['电话', request.customer.phone || '-'],
      ['人数', `${request.customer.groupSize} 人`],
      ['目的地', destName],
      ['天数', `${request.days} 天`],
      ['客户类型', customerTypeName],
    ])
  )

  // ========== 费用预算 ==========
  children.push(sectionTitle('费用预算'))
  children.push(
    buildCostTable(
      [
        ['景点门票', `NZ$ ${costBreakdown.attractions.toLocaleString()}`],
        ['住宿', `NZ$ ${costBreakdown.accommodation.toLocaleString()}`],
        ['餐食', `NZ$ ${costBreakdown.meals.toLocaleString()}`],
        ['其他（交通、导游等）', `NZ$ ${costBreakdown.other.toLocaleString()}`],
      ],
      '总计',
      `NZ$ ${costBreakdown.total.toLocaleString()}`
    )
  )
  children.push(p('备注：以上报价为初步预估，最终价格以确认函为准。', { color: COLOR_GRAY }))

  // ========== 行程亮点 ==========
  if (highlights && highlights.length > 0) {
    children.push(sectionTitle('行程亮点'))
    highlights.forEach((hl, idx) => {
      children.push(numberedHighlight(idx + 1, hl))
    })
  }

  // ========== 预加载所有景点图片（并行 fetch，5s 超时各自独立） ==========
  // 平铺所有景点 → 唯一 id → 用映射表/fallback 取 URL → 并发 fetch Buffer
  const attractionImageMap = new Map<string, Buffer>()
  const allAttractions = days.flatMap((d) => d.attractions || [])
  const uniqueAttractionIds = Array.from(new Set(allAttractions.map((a) => a.id)))
  const imageLoadResults = await Promise.all(
    uniqueAttractionIds.map(async (id) => {
      const attr = allAttractions.find((a) => a.id === id)
      const url = getAttractionImageUrl(id, attr?.image)
      if (!url) return [id, null] as const
      const buf = await loadImageBuffer(url)
      return [id, buf] as const
    })
  )
  imageLoadResults.forEach(([id, buf]) => {
    if (buf) attractionImageMap.set(id, buf)
  })

  // ========== 每日行程（分页） ==========
  days.forEach((day) => {
    // 每天新起一页
    children.push(pageBreakParagraph())

    // 用彩色 Day Banner 替代普通标题
    children.push(dayBanner(day.day, day.title, day.theme))

    // banner 后空一行
    children.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: '', size: 2 })],
      })
    )

    // 时段安排
    if (day.schedule) {
      children.push(h3('▎时段安排'))
      if (day.schedule.morning) {
        children.push(labeledLine('上午', day.schedule.morning))
      }
      if (day.schedule.afternoon) {
        children.push(labeledLine('下午', day.schedule.afternoon))
      }
      if (day.schedule.evening) {
        children.push(labeledLine('晚上', day.schedule.evening))
      }
    }

    // 主要景点
    if (day.attractions && day.attractions.length > 0) {
      children.push(h3('▎主要景点'))
      day.attractions.forEach((attr) => {
        // 景点名（粗体深色）
        children.push(
          new Paragraph({
            spacing: { before: 100, after: 40 },
            children: [
              new TextRun({
                text: `▸ ${attr.name}`,
                bold: true,
                size: 24,
                font: FONT_CN,
                color: COLOR_ACCENT,
              }),
            ],
          })
        )
        // 描述（浅灰斜体，缩进）
        if (attr.description) {
          children.push(
            new Paragraph({
              spacing: { after: 80, line: 320 },
              indent: { left: 480 },
              children: [
                new TextRun({
                  text: attr.description,
                  italics: true,
                  size: 20,
                  font: FONT_CN,
                  color: COLOR_LIGHT_GRAY,
                }),
              ],
            })
          )
        }
        // 景点图片（已预加载，有就插）
        const imgBuf = attractionImageMap.get(attr.id)
        if (imgBuf) {
          children.push(imageParagraph(imgBuf))
        }
      })
    }

    // 餐食
    if (day.meals && (day.meals.breakfast || day.meals.lunch || day.meals.dinner)) {
      children.push(h3('▎餐食安排'))
      if (day.meals.breakfast) children.push(labeledLine('早餐', day.meals.breakfast))
      if (day.meals.lunch) children.push(labeledLine('午餐', day.meals.lunch))
      if (day.meals.dinner) children.push(labeledLine('晚餐', day.meals.dinner))
    }

    // 住宿
    if (day.accommodation) {
      children.push(h3('▎住宿安排'))
      children.push(
        labeledLine(
          '酒店',
          `${day.accommodation.name}（${day.accommodation.stars} 星）`
        )
      )
      // 城市名转中文
      const cityCn =
        CITY_CN[day.accommodation.city.toLowerCase()] || day.accommodation.city
      children.push(labeledLine('所在城市', cityCn))
      children.push(
        labeledLine(
          '参考房价',
          `NZ$ ${day.accommodation.pricePerNight.toLocaleString()} / 晚`
        )
      )
    }

    // 备注
    if (day.notes) {
      children.push(h3('▎温馨提示'))
      children.push(p(day.notes, { color: COLOR_GRAY }))
    }
  })

  // ========== 结尾 ==========
  children.push(pageBreakParagraph())
  children.push(sectionTitle('重要说明'))
  children.push(p('1. 本行程为初稿，请与我们的行程顾问确认细节。'))
  children.push(p('2. 所有价格以最终确认函为准，可能因季节、汇率、酒店政策有所调整。'))
  children.push(p('3. 如需修改景点、酒店、餐食偏好，请在签订合同前告知。'))
  children.push(p('4. 本文档为 Word 可编辑版本，客户最终方案将另行发送 PDF。'))

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 600 },
      children: [
        new TextRun({
          text: '新西兰旅游服务 (NZ Tours)',
          bold: true,
          size: 24,
          font: FONT_CN,
          color: COLOR_PRIMARY,
        }),
      ],
    })
  )
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: '让每一次旅行都成为最美的回忆',
          italics: true,
          size: 20,
          font: FONT_CN,
          color: COLOR_GRAY,
        }),
      ],
    })
  )

  // ========== 页脚（每页底部品牌行 + 页码） ==========
  const footer = new Footer({
    children: [
      new Paragraph({
        spacing: { before: 100, after: 0 },
        border: {
          top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_PRIMARY_LIGHT, space: 4 },
        },
        children: [
          new TextRun({
            text: '新西兰旅游服务 NZ Tours',
            size: 16,
            font: FONT_CN,
            color: COLOR_PRIMARY,
          }),
          new TextRun({
            text: `\t\t${request.customer.name} · ${destName} ${request.days} 日\t\t`,
            size: 16,
            font: FONT_CN,
            color: COLOR_GRAY,
          }),
          new TextRun({
            children: [PageNumber.CURRENT],
            size: 16,
            font: FONT_CN,
            color: COLOR_GRAY,
          }),
          new TextRun({
            text: ' / ',
            size: 16,
            font: FONT_CN,
            color: COLOR_GRAY,
          }),
          new TextRun({
            children: [PageNumber.TOTAL_PAGES],
            size: 16,
            font: FONT_CN,
            color: COLOR_GRAY,
          }),
        ],
      }),
    ],
  })

  // ========== 打包文档 ==========
  const doc = new Document({
    creator: '新西兰旅游服务 (NZ Tours)',
    title: `${request.customer.name} 行程方案`,
    description: `${destName} ${request.days} 日行程`,
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // 2cm
              bottom: 1134,
              left: 1134,
              right: 1134,
            },
          },
        },
        footers: { default: footer },
        children,
      },
    ],
  })

  return await Packer.toBuffer(doc)
}
