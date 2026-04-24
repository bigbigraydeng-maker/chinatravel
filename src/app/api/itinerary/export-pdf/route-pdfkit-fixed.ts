import { NextRequest, NextResponse } from 'next/server'
import { GeneratedItinerary } from '@/lib/itinerary/engine'
import PDFDocument from 'pdfkit'

/**
 * POST /api/itinerary/export-pdf
 * 使用 pdfkit 生成真实 PDF 行程册（含目的地风景图片）
 *
 * fetch 已内置在 Next.js 14+ 中，无需 node-fetch
 */

const NZ_DESTINATION_IMAGES: Record<string, string> = {
  auckland: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  rotorua: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
  queenstown: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  hobbiton: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  waitomo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  taupo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
}

export async function POST(request: NextRequest) {
  try {
    const { itinerary } = (await request.json()) as { itinerary: GeneratedItinerary }

    // 创建 PDF 文档
    const doc = new PDFDocument({
      bufferPages: true,
      size: 'A4',
      margin: 50,
    })

    const chunks: Buffer[] = []
    doc.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    const bufferPromise = new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)
    })

    // 生成 PDF 内容（内部会 doc.end()）
    await generatePDF(doc, itinerary)

    const buffer = await bufferPromise

    // 返回 PDF
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="itinerary-${itinerary.request.customer.name}-${itinerary.id}.pdf"`,
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { message: 'PDF 生成失败: ' + (error instanceof Error ? error.message : '未知错误') },
      { status: 500 }
    )
  }
}

/**
 * 生成 PDF 内容
 */
async function generatePDF(doc: any, itinerary: GeneratedItinerary) {
  const { request, days, costBreakdown } = itinerary

  const destinationMap: Record<string, string> = {
    auckland: '奥克兰',
    rotorua: '罗托鲁阿',
    queenstown: '皇后镇',
    hobbiton: '霍比特人村',
    waitomo: '怀托摩',
    taupo: '陶波',
  }

  const destinationName = destinationMap[request.destination] || request.destination
  const imageUrl = NZ_DESTINATION_IMAGES[request.destination] || NZ_DESTINATION_IMAGES.auckland

  // ===== 标题页 =====
  try {
    // 下载并添加目的地图片
    const imageResponse = await fetch(imageUrl)
    if (imageResponse.ok) {
      const arrayBuffer = await imageResponse.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      doc.image(buffer, 0, 0, { width: doc.page.width, height: 250 })
    }
  } catch (e) {
    console.warn('Failed to load destination image:', e)
  }

  doc.moveTo(0, 280).lineTo(doc.page.width, 280).stroke('#D4A574')

  doc.fontSize(48)
    .font('Helvetica-Bold')
    .text(request.customer.name, { align: 'center', baseline: 'top' })
    .moveDown(0.5)

  doc.fontSize(24)
    .font('Helvetica')
    .fillColor('#8B6F47')
    .text(`${destinationName} ${request.days} 日之旅`, { align: 'center' })
    .moveDown(1)

  doc.fontSize(14)
    .fillColor('#333')
    .text('✈️ 新西兰旅游服务 (NZ Tours)', { align: 'center' })
    .text('🌍 让每一次旅行都成为最美的回忆', { align: 'center' })
    .moveDown(2)

  doc.fontSize(10)
    .fillColor('#999')
    .text(`生成时间：${new Date(itinerary.createdAt).toLocaleString('zh-CN')}`, { align: 'center' })

  // ===== 客户信息页 =====
  doc.addPage()
  doc.fontSize(24)
    .font('Helvetica-Bold')
    .fillColor('#2C1810')
    .text('客户信息')
    .moveDown(0.5)

  doc.fontSize(12)
    .font('Helvetica')
    .fillColor('#333')

  const infoData: [string, string][] = [
    ['姓名', request.customer.name],
    ['邮箱', request.customer.email],
    ['电话', request.customer.phone || '-'],
    ['人数', `${request.customer.groupSize} 人`],
  ]

  infoData.forEach(([label, value]) => {
    doc.fillColor('#8B6F47')
      .font('Helvetica-Bold')
      .text(`${label}:`, { continued: true })

    doc.fillColor('#333')
      .font('Helvetica')
      .text(` ${value}`)
  })

  // ===== 费用预算页 =====
  doc.moveDown(1)
  doc.fontSize(24)
    .font('Helvetica-Bold')
    .fillColor('#2C1810')
    .text('费用预算')
    .moveDown(0.5)

  doc.fontSize(11)
    .font('Helvetica')
    .fillColor('#333')

  const costItems: [string, string][] = [
    ['景点门票', `¥${costBreakdown.attractions.toLocaleString()}`],
    ['住宿', `¥${costBreakdown.accommodation.toLocaleString()}`],
    ['餐食', `¥${costBreakdown.meals.toLocaleString()}`],
    ['其他', `¥${costBreakdown.other.toLocaleString()}`],
  ]

  costItems.forEach(([item, amount]) => {
    doc.text(`${item}`, { continued: true, width: 200 })
      .text(amount, { align: 'right' })
  })

  doc.moveTo(50, doc.y + 5).lineTo(doc.page.width - 50, doc.y + 5).stroke('#D4A574')
  doc.moveDown(0.5)

  doc.fontSize(14)
    .font('Helvetica-Bold')
    .fillColor('#2C1810')
    .text('总计', { continued: true, width: 200 })
    .text(`¥${costBreakdown.total.toLocaleString()}`, { align: 'right' })

  // ===== 日程详情页 =====
  days.forEach((day: any, index: number) => {
    if (index > 0) doc.addPage()
    else doc.addPage()

    doc.fontSize(20)
      .font('Helvetica-Bold')
      .fillColor('#2C1810')
      .text(day.title)
      .moveDown(0.3)

    doc.fontSize(11)
      .font('Helvetica')
      .fillColor('#8B6F47')
      .text(`主题：${day.theme}`)
      .moveDown(0.5)

    // 主要景点
    if (day.attractions && day.attractions.length > 0) {
      doc.fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#2C1810')
        .text('🎯 主要景点')
        .moveDown(0.3)

      day.attractions.forEach((attr: any) => {
        doc.fontSize(10)
          .font('Helvetica-Bold')
          .fillColor('#333')
          .text(attr.name, { continued: true })

        doc.fontSize(10)
          .font('Helvetica')
          .fillColor('#666')
          .text(` - ${attr.description}`)
          .moveDown(0.2)
      })

      doc.moveDown(0.3)
    }

    // 餐食
    if (day.meals) {
      doc.fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#2C1810')
        .text('🍽 餐食')
        .moveDown(0.3)

      if (day.meals.breakfast) {
        doc.fontSize(10)
          .font('Helvetica')
          .fillColor('#333')
          .text(`早餐：${day.meals.breakfast}`)
      }
      if (day.meals.lunch) {
        doc.fontSize(10)
          .font('Helvetica')
          .fillColor('#333')
          .text(`午餐：${day.meals.lunch}`)
      }
      if (day.meals.dinner) {
        doc.fontSize(10)
          .font('Helvetica')
          .fillColor('#333')
          .text(`晚餐：${day.meals.dinner}`)
      }

      doc.moveDown(0.3)
    }

    // 住宿
    if (day.accommodation) {
      doc.fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#2C1810')
        .text('🏨 住宿')
        .moveDown(0.3)

      doc.fontSize(10)
        .font('Helvetica-Bold')
        .fillColor('#333')
        .text(day.accommodation.name)

      doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#666')
        .text(`${day.accommodation.stars}星 · ¥${day.accommodation.pricePerNight}/晚 · ${day.accommodation.city}`)

      doc.moveDown(0.3)
    }
  })

  // ===== 页脚 =====
  const pageCount = doc.bufferedPageRange().count
  for (let i = 0; i < pageCount; i++) {
    doc.switchToPage(i)

    doc.fontSize(10)
      .fillColor('#999')
      .text('© 新西兰旅游服务 (NZ Tours) | 让每一次旅行都成为最美的回忆', {
        align: 'center',
        y: doc.page.height - 30,
      })
  }

  doc.end()
}
