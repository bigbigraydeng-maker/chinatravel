import { NextRequest, NextResponse } from 'next/server'
import { GeneratedItinerary } from '@/lib/itinerary/engine'

/**
 * POST /api/itinerary/send-email
 * 发送行程邮件给客户
 */
export async function POST(request: NextRequest) {
  try {
    const { itinerary } = (await request.json()) as { itinerary: GeneratedItinerary }

    // 验证 Resend API Key
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return NextResponse.json(
        { message: 'Resend API Key 未配置' },
        { status: 500 }
      )
    }

    // 生成邮件内容（HTML）
    const emailHTML = generateItineraryEmailHTML(itinerary)

    // 调用 Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'tours@ctstours.co.nz',
        to: itinerary.request.customer.email,
        subject: `你的 ${itinerary.request.days} 日 ${getDestinationName(itinerary.request.destination)} 行程方案`,
        html: emailHTML,
        reply_to: 'support@ctstours.co.nz',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Resend API 错误:', error)
      return NextResponse.json(
        { message: '邮件发送失败，请稍后重试' },
        { status: 500 }
      )
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: '邮件已成功发送',
      emailId: result.id,
    })
  } catch (error) {
    console.error('邮件发送错误:', error)
    return NextResponse.json(
      { message: '邮件发送失败' },
      { status: 500 }
    )
  }
}

function getDestinationName(destination: string): string {
  // 新西兰本地目的地（OP 行程生成器专用）
  const map: Record<string, string> = {
    auckland: '奥克兰',
    rotorua: '罗托鲁阿',
    queenstown: '皇后镇',
    hobbiton: '霍比特人村',
    waitomo: '怀托摩',
    taupo: '陶波',
  }
  return map[destination] || destination
}

/**
 * 生成邮件 HTML
 */
function generateItineraryEmailHTML(itinerary: GeneratedItinerary): string {
  const { request, days, costBreakdown } = itinerary

  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>行程方案</title>
  <style>
    body {
      font-family: 'SimSun', 'Noto Sans CJK SC', Arial, sans-serif;
      color: #333;
      background: #f5f5f5;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #D4A574 0%, #8B6F47 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 28px;
    }

    .header p {
      margin: 10px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }

    .content {
      padding: 30px 20px;
    }

    .greeting {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .info-box {
      background: #FFF9F0;
      border: 1px solid #E8D5C4;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #E8D5C4;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .info-label {
      font-weight: bold;
      color: #8B6F47;
    }

    .info-value {
      color: #333;
    }

    .cost-box {
      background: #FFF9F0;
      border: 1px solid #E8D5C4;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
    }

    .cost-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #E8D5C4;
      font-size: 14px;
    }

    .cost-item:last-child {
      border-bottom: none;
    }

    .cost-total {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-top: 2px solid #D4A574;
      font-size: 16px;
      font-weight: bold;
      color: #2C1810;
    }

    .day-summary {
      background: #FFF9F0;
      border-left: 4px solid #D4A574;
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
    }

    .day-summary h4 {
      margin: 0 0 10px 0;
      color: #2C1810;
      font-size: 15px;
    }

    .day-summary p {
      margin: 5px 0;
      font-size: 13px;
      color: #666;
    }

    .cta-button {
      display: inline-block;
      background: #D4A574;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: bold;
    }

    .footer {
      background: #f5f5f5;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #ddd;
    }

    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✨ 你的行程方案</h1>
      <p>${getDestinationName(request.destination)} · ${request.days} 日之旅</p>
    </div>

    <div class="content">
      <div class="greeting">
        <p>您好 ${request.customer.name}，</p>
        <p>感谢您选择新西兰旅游服务 (NZ Tours)！我们已为您精心设计了一份专属的旅游行程。</p>
      </div>

      <div class="info-box">
        <div class="info-row">
          <span class="info-label">目的地</span>
          <span class="info-value">${getDestinationName(request.destination)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">旅游天数</span>
          <span class="info-value">${request.days} 天</span>
        </div>
        <div class="info-row">
          <span class="info-label">出行人数</span>
          <span class="info-value">${request.customer.groupSize} 人</span>
        </div>
        <div class="info-row">
          <span class="info-label">客户类型</span>
          <span class="info-value">${formatCustomerType(request.customerType)}</span>
        </div>
      </div>

      <h3>💰 费用预算</h3>
      <div class="cost-box">
        <div class="cost-item">
          <span>景点门票</span>
          <span>¥${costBreakdown.attractions.toLocaleString()}</span>
        </div>
        <div class="cost-item">
          <span>住宿</span>
          <span>¥${costBreakdown.accommodation.toLocaleString()}</span>
        </div>
        <div class="cost-item">
          <span>餐食</span>
          <span>¥${costBreakdown.meals.toLocaleString()}</span>
        </div>
        <div class="cost-item">
          <span>其他（交通、导游等）</span>
          <span>¥${costBreakdown.other.toLocaleString()}</span>
        </div>
        <div class="cost-total">
          <span>总计</span>
          <span style="color: #D4A574;">¥${costBreakdown.total.toLocaleString()}</span>
        </div>
      </div>

      <h3>🎯 行程亮点</h3>
      ${days.slice(0, 3).map((day) => `
        <div class="day-summary">
          <h4>${day.title}</h4>
          <p>📍 主题：${day.theme}</p>
          <p>🎫 景点数：${day.attractions.length} 个</p>
          ${day.attractions.slice(0, 2).map((attr) => `
            <p style="margin-left: 15px;">• ${attr.name}</p>
          `).join('')}
          ${day.attractions.length > 2 ? `<p style="margin-left: 15px; color: #999;">...更多景点</p>` : ''}
        </div>
      `).join('')}

      <p style="text-align: center; margin: 30px 0;">
        <a href="https://www.ctstours.co.nz" class="cta-button">📥 查看完整行程</a>
      </p>

      <p style="margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 6px; font-size: 13px; color: #666;">
        <strong>下一步：</strong><br/>
        请回复此邮件或拨打我们的客服热线，我们会根据您的需求进行微调，并为您安排订金和最终行程细节。
      </p>
    </div>

    <div class="footer">
      <p><strong>新西兰旅游服务 (NZ Tours)</strong></p>
      <p>📧 support@ctstours.co.nz | 🌐 www.ctstours.co.nz</p>
      <p style="margin-top: 10px; color: #ccc;">让每一次旅行都成为最美的回忆</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

function formatCustomerType(type: string): string {
  const map: Record<string, string> = {
    reward: '奖励旅游（高端豪华）',
    family: '家庭旅游（舒适便利）',
    couple: '蜜月旅游（浪漫温馨）',
    adventure: '冒险旅游（刺激探险）',
    student: '学生旅游（经济实惠）',
  }
  return map[type] || type
}
