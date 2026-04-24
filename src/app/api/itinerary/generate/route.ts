import { NextRequest, NextResponse } from 'next/server'
import { ItineraryRequest, ItineraryGenerator } from '@/lib/itinerary/engine'

/**
 * POST /api/itinerary/generate
 * 服务端行程生成 API
 *
 * 接收客户信息、目的地、天数、预算和偏好
 * 返回完整的行程单（包含日程、亮点、费用分解）
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ItineraryRequest

    // 验证必填字段
    if (
      !body.customer?.name ||
      !body.customer?.email ||
      !body.destination ||
      !body.days ||
      body.budget === undefined ||
      !body.customerType
    ) {
      return NextResponse.json(
        { message: '缺少必填字段：客户姓名、邮箱、目的地、天数、预算、客户类型' },
        { status: 400 }
      )
    }

    // 验证天数范围
    if (body.days < 2 || body.days > 14) {
      return NextResponse.json(
        { message: '天数必须在 2-14 之间' },
        { status: 400 }
      )
    }

    // 验证预算范围
    if (body.budget < 10000) {
      return NextResponse.json(
        { message: '预算必须至少 10,000 元' },
        { status: 400 }
      )
    }

    // 生成行程
    const generator = new ItineraryGenerator()
    const itinerary = await generator.generate(body)

    return NextResponse.json(itinerary)
  } catch (error) {
    console.error('Itinerary generation error:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : '行程生成失败' },
      { status: 500 }
    )
  }
}
