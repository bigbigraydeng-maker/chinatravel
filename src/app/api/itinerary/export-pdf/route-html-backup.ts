import { NextRequest, NextResponse } from 'next/server'
import { GeneratedItinerary } from '@/lib/itinerary/engine'

/**
 * POST /api/itinerary/export-pdf
 * 导出精美 PDF 行程册（含目的地风景图片）
 */
export async function POST(request: NextRequest) {
  try {
    const { itinerary } = (await request.json()) as { itinerary: GeneratedItinerary }

    // 将行程数据转换为 HTML（包含图片）
    const html = await generateItineraryHTML(itinerary)

    // 返回 HTML，前端浏览器可以 print 或另存为 PDF
    // 生产环境可使用 puppeteer 或 pdfkit 库将 HTML 转换为真实 PDF

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="itinerary-${itinerary.request.customer.name}-${itinerary.id}.html"`,
      },
    })
  } catch (error) {
    console.error('PDF 导出错误:', error)
    return NextResponse.json(
      { message: 'PDF 导出失败' },
      { status: 500 }
    )
  }
}

/**
 * 新西兰目的地图片映射（Unsplash CDN）
 */
const NZ_DESTINATION_IMAGES: Record<string, { url: string; alt: string }> = {
  auckland: {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Auckland Skyline with Yachts',
  },
  rotorua: {
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
    alt: 'Rotorua Geothermal Hot Springs',
  },
  queenstown: {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Queenstown Mountains and Lake',
  },
  hobbiton: {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Hobbiton Movie Set',
  },
  waitomo: {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Waitomo Glowworm Caves',
  },
  taupo: {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Lake Taupo Scenic View',
  },
}

/**
 * 生成精美 HTML 行程册（含目的地风景图片）
 */
async function generateItineraryHTML(itinerary: GeneratedItinerary): Promise<string> {
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
  const destinationImage = NZ_DESTINATION_IMAGES[request.destination] || NZ_DESTINATION_IMAGES.auckland

  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>行程册 - ${request.customer.name}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      height: 100%;
      font-family: 'SimSun', 'Noto Sans CJK SC', sans-serif;
      color: #333;
      background: #f5f5f5;
    }

    body {
      padding: 20px;
    }

    .container {
      max-width: 850px;
      margin: 0 auto;
      background: white;
      padding: 60px 50px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }

    /* 标题页 */
    .cover-page {
      text-align: center;
      padding: 60px 0;
      border-bottom: 3px solid #D4A574;
      margin-bottom: 60px;
      position: relative;
    }

    .cover-page .destination-image {
      width: 100%;
      max-height: 350px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 40px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .cover-page h1 {
      font-size: 48px;
      margin-bottom: 20px;
      font-weight: bold;
      color: #2C1810;
    }

    .cover-page .subtitle {
      font-size: 28px;
      color: #8B6F47;
      margin-bottom: 30px;
    }

    .cover-page .info {
      font-size: 16px;
      color: #666;
      line-height: 1.8;
      margin-top: 40px;
    }

    /* 章节标题 */
    h2 {
      font-size: 32px;
      margin: 40px 0 20px 0;
      color: #2C1810;
      border-left: 6px solid #D4A574;
      padding-left: 20px;
    }

    /* 客户信息 */
    .customer-info {
      background: #FFF9F0;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .customer-info-item {
      font-size: 14px;
    }

    .customer-info-item label {
      color: #8B6F47;
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
    }

    .customer-info-item value {
      color: #333;
      font-size: 16px;
    }

    /* 费用表格 */
    .cost-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: #FFF9F0;
    }

    .cost-table th {
      background: #D4A574;
      color: white;
      padding: 15px;
      text-align: left;
      font-weight: bold;
    }

    .cost-table td {
      padding: 12px 15px;
      border-bottom: 1px solid #E8D5C4;
    }

    .cost-table tr:hover {
      background: #FFFAF5;
    }

    .cost-table .amount {
      text-align: right;
      font-weight: bold;
      color: #8B6F47;
    }

    .cost-table .total {
      font-size: 18px;
      color: #2C1810;
    }

    /* 日程卡片 */
    .day-card {
      page-break-inside: avoid;
      margin: 30px 0;
      padding: 25px;
      border: 2px solid #D4A574;
      border-radius: 8px;
      background: #FFF9F0;
    }

    .day-card h3 {
      font-size: 22px;
      color: #2C1810;
      margin-bottom: 5px;
    }

    .day-card .theme {
      color: #8B6F47;
      font-size: 14px;
      margin-bottom: 15px;
    }

    .day-card section {
      margin: 15px 0;
    }

    .day-card section h4 {
      font-size: 16px;
      font-weight: bold;
      color: #2C1810;
      margin-bottom: 10px;
    }

    .attraction-item {
      background: white;
      padding: 12px;
      margin: 8px 0;
      border-left: 4px solid #D4A574;
      border-radius: 4px;
    }

    .attraction-item .name {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .attraction-item .desc {
      font-size: 13px;
      color: #666;
      margin-bottom: 5px;
    }

    .attraction-item .details {
      font-size: 12px;
      color: #999;
    }

    /* 图片样式 */
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    /* 页脚 */
    .footer {
      border-top: 1px solid #D4A574;
      padding-top: 20px;
      margin-top: 60px;
      text-align: center;
      font-size: 12px;
      color: #999;
    }

    /* 打印样式 */
    @media print {
      body {
        background: white;
        padding: 0;
      }

      .container {
        max-width: 100%;
        box-shadow: none;
        padding: 0;
      }

      .day-card {
        page-break-inside: avoid;
      }

      /* 确保图片在打印时显示 */
      img {
        max-width: 100% !important;
        height: auto !important;
        page-break-inside: avoid;
      }

      .cover-page .destination-image {
        max-height: 350px;
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- 标题页 -->
    <div class="cover-page">
      <img
        src="${destinationImage.url}"
        alt="${destinationImage.alt}"
        class="destination-image"
        style="display: block; width: 100%; max-height: 350px; object-fit: cover; border-radius: 8px; margin-bottom: 40px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);"
      />
      <h1>${request.customer.name}</h1>
      <div class="subtitle">${destinationName} ${request.days} 日之旅</div>
      <div class="info">
        <p>✈️ 新西兰旅游服务 (NZ Tours)</p>
        <p>🌍 让每一次旅行都成为最美的回忆</p>
        <p style="margin-top: 30px; font-size: 12px; color: #999;">
          生成时间：${new Date(itinerary.createdAt).toLocaleString('zh-CN')}
        </p>
      </div>
    </div>

    <!-- 客户信息 -->
    <h2>客户信息</h2>
    <div class="customer-info">
      <div class="customer-info-item">
        <label>姓名</label>
        <div>${request.customer.name}</div>
      </div>
      <div class="customer-info-item">
        <label>邮箱</label>
        <div>${request.customer.email}</div>
      </div>
      <div class="customer-info-item">
        <label>人数</label>
        <div>${request.customer.groupSize} 人</div>
      </div>
      <div class="customer-info-item">
        <label>电话</label>
        <div>${request.customer.phone || '-'}</div>
      </div>
    </div>

    <!-- 费用预算 -->
    <h2>费用预算</h2>
    <table class="cost-table">
      <thead>
        <tr>
          <th>费用项目</th>
          <th class="amount">金额（元）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>景点门票</td>
          <td class="amount">¥${costBreakdown.attractions.toLocaleString()}</td>
        </tr>
        <tr>
          <td>住宿</td>
          <td class="amount">¥${costBreakdown.accommodation.toLocaleString()}</td>
        </tr>
        <tr>
          <td>餐食</td>
          <td class="amount">¥${costBreakdown.meals.toLocaleString()}</td>
        </tr>
        <tr>
          <td>其他（交通、导游等）</td>
          <td class="amount">¥${costBreakdown.other.toLocaleString()}</td>
        </tr>
        <tr style="background: #D4A574; color: white;">
          <td style="color: white; font-weight: bold;">总计</td>
          <td class="amount total" style="color: white;">¥${costBreakdown.total.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>

    <!-- 日程详情 -->
    <h2>每日行程安排</h2>
    ${days.map((day) => `
      <div class="day-card">
        <h3>${day.title}</h3>
        <div class="theme">主题：${day.theme}</div>

        <section>
          <h4>🎯 主要景点</h4>
          ${day.attractions.length > 0 ? day.attractions.map((attr) => `
            <div class="attraction-item">
              <div class="name">${attr.name}</div>
              <div class="desc">${attr.description}</div>
              <div class="details">⏱ ${attr.duration}小时 · 💰 ¥${attr.price}/人</div>
            </div>
          `).join('') : '<p style="color: #999;">无具体安排</p>'}
        </section>

        ${day.meals ? `
          <section>
            <h4>🍽 餐食</h4>
            ${day.meals.breakfast ? `<p>• 早餐：${day.meals.breakfast}</p>` : ''}
            ${day.meals.lunch ? `<p>• 午餐：${day.meals.lunch}</p>` : ''}
            ${day.meals.dinner ? `<p>• 晚餐：${day.meals.dinner}</p>` : ''}
          </section>
        ` : ''}

        ${day.accommodation ? `
          <section>
            <h4>🏨 住宿</h4>
            <p><strong>${day.accommodation.name}</strong> (⭐ ${day.accommodation.stars}星)</p>
            <p style="font-size: 13px; color: #666;">¥${day.accommodation.pricePerNight}/晚 · ${day.accommodation.city}</p>
          </section>
        ` : ''}

        ${day.notes ? `
          <section>
            <h4>📝 备注</h4>
            <p style="font-size: 13px; color: #666;">${day.notes}</p>
          </section>
        ` : ''}
      </div>
    `).join('')}

    <!-- 页脚 -->
    <div class="footer">
      <p>© 新西兰旅游服务 (NZ Tours) | www.nztours.co.nz</p>
      <p>让每一次旅行都成为最美的回忆</p>
    </div>
  </div>

  <script>
    // 页面加载完成后，自动打印
    window.onload = () => {
      setTimeout(() => {
        window.print()
      }, 500)
    }
  </script>
</body>
</html>
  `.trim()
}
