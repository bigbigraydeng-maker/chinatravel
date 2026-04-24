import { NextRequest, NextResponse } from 'next/server'
import { GeneratedItinerary } from '@/lib/itinerary/engine'
import PDFDocument from 'pdfkit'

/**
 * POST /api/itinerary/export-pdf
 * 使用 pdfkit 生成真实 PDF 行程册（含目的地风景图片）
 *
 * 修复：
 * 1. Promise 和事件监听器的竞速条件 - 先设置监听器，再调用 generatePDF
 * 2. 图片加载异步性 - doc.image() 需要在 doc.end() 前完成
 * 3. 错误处理和超时 - 添加 30 秒超时和详细日志
 * 4. Buffer 完整性检查
 */

// 新西兰本地目的地图片库（OP 行程生成器专用）
// 本系统仅面向新西兰本地旅游项目，不支持其它目的地
const NZ_DESTINATION_IMAGES: Record<string, string> = {
  auckland: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80', // Auckland skyline
  rotorua: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',  // Rotorua geothermal
  queenstown: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800&q=80', // Queenstown Lake
  hobbiton: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80',   // NZ landscape
  waitomo: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',    // NZ green hills
  taupo: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800&q=80',      // Lake Taupo
}

const PDF_TIMEOUT = 30000 // 30 秒超时

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  console.log('[PDF Export] Starting PDF generation...')

  try {
    const { itinerary } = (await request.json()) as { itinerary: GeneratedItinerary }
    console.log(`[PDF Export] Generating PDF for customer: ${itinerary.request.customer.name}`)

    // 创建 PDF 缓冲区 - 关键修复：在创建 doc 之前建立 Promise，确保不会丢失事件
    const pdfBuffer = await generatePDFBuffer(itinerary)

    const duration = Date.now() - startTime
    console.log(`[PDF Export] PDF generated successfully in ${duration}ms, size: ${pdfBuffer.length} bytes`)

    // 返回 PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="itinerary-${itinerary.request.customer.name}-${itinerary.id}.pdf"`,
      },
    })
  } catch (error) {
    const duration = Date.now() - startTime
    const message = error instanceof Error ? error.message : String(error)
    console.error(`[PDF Export] Failed after ${duration}ms: ${message}`)
    console.error('[PDF Export] Stack:', error instanceof Error ? error.stack : 'N/A')

    return NextResponse.json(
      {
        message: 'PDF 生成失败: ' + message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

/**
 * 生成 PDF 缓冲区 - 关键修复分离
 * 将 Promise 包装和 PDF 生成逻辑分离，避免竞速条件
 */
async function generatePDFBuffer(itinerary: GeneratedItinerary): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      bufferPages: true,
      size: 'A4',
      margin: 50,
    })

    const chunks: Buffer[] = []

    // 关键修复 1: 先设置所有事件监听器
    doc.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
      console.log(`[PDF Export] Received chunk: ${chunk.length} bytes`)
    })

    // 关键修复 2: Promise resolve/reject 要在 end/error 事件中处理
    let resolved = false
    doc.on('end', () => {
      if (resolved) return
      resolved = true

      const buffer = Buffer.concat(chunks)
      console.log(`[PDF Export] PDF stream ended, total size: ${buffer.length} bytes`)

      if (buffer.length === 0) {
        reject(new Error('PDF buffer is empty - stream may have failed'))
      } else {
        resolve(buffer)
      }
    })

    doc.on('error', (err: Error) => {
      if (resolved) return
      resolved = true
      console.error('[PDF Export] PDFDocument error:', err.message)
      reject(err)
    })

    // 关键修复 3: 添加超时保护
    const timeoutHandle = setTimeout(() => {
      if (resolved) return
      resolved = true
      doc.destroy()
      reject(new Error('PDF generation timeout after 30 seconds'))
    }, PDF_TIMEOUT)

    // 生成 PDF 内容
    generatePDF(doc, itinerary)
      .then(() => {
        console.log('[PDF Export] generatePDF completed, calling doc.end()')
        doc.end()
      })
      .catch((err) => {
        if (resolved) return
        resolved = true
        clearTimeout(timeoutHandle)
        console.error('[PDF Export] generatePDF error:', err.message)
        doc.destroy()
        reject(err)
      })
      .finally(() => {
        clearTimeout(timeoutHandle)
      })
  })
}

/**
 * 生成 PDF 内容
 * 关键修复：所有异步操作都需要 await
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
  // 关键修复：图片加载应该有错误处理，但不应该阻塞 PDF 生成
  try {
    await loadAndAddImage(doc, imageUrl)
  } catch (e) {
    console.warn(`[PDF Export] Failed to load destination image from ${imageUrl}:`, e)
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

  const infoData: Array<[string, string]> = [
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

  const costItems: Array<[string, string]> = [
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
}

/**
 * 加载并添加图片到 PDF
 * 关键修复：pdfkit 的 doc.image() 是同步的，但网络获取是异步的
 * 我们需要确保在调用 doc.end() 前所有异步操作完成
 */
async function loadAndAddImage(doc: any, imageUrl: string): Promise<void> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 秒超时

  try {
    const imageResponse = await fetch(imageUrl, { signal: controller.signal })

    if (!imageResponse.ok) {
      throw new Error(`HTTP ${imageResponse.status}`)
    }

    const arrayBuffer = await imageResponse.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    if (buffer.length === 0) {
      throw new Error('Image buffer is empty')
    }

    console.log(`[PDF Export] Loading image: ${imageUrl.split('?')[0]} (${buffer.length} bytes)`)

    // pdfkit 的 image() 是同步的（缓冲区已在内存中）
    doc.image(buffer, 0, 0, { width: doc.page.width, height: 250 })
  } finally {
    clearTimeout(timeoutId)
  }
}
