'use client'

import { GeneratedItinerary } from '@/lib/itinerary/engine'
import Image from 'next/image'

interface ItineraryPreviewProps {
  itinerary: GeneratedItinerary
}

// 目的地中文映射（本系统仅支持新西兰本地目的地）
const DESTINATION_NAMES: Record<string, string> = {
  auckland: '奥克兰',
  rotorua: '罗托鲁阿',
  queenstown: '皇后镇',
  hobbiton: '霍比特人村',
  waitomo: '怀托摩',
  taupo: '陶波湖',
}

/**
 * 行程预览组件（简洁版，适合网页浏览）
 */
export default function ItineraryPreview({ itinerary }: ItineraryPreviewProps) {
  const { request, days, highlights, costBreakdown } = itinerary
  const destName = DESTINATION_NAMES[request.destination] || request.destination

  return (
    <div className="space-y-6">
      {/* 标题卡片 */}
      <div className="bg-white rounded-lg border border-warm-200 p-6">
        <h2 className="text-2xl font-serif font-bold text-accent mb-2">
          {request.customer.name} 的 {request.days} 日 {destName} 行程
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div>
            <p className="text-xs text-gray-500">目的地</p>
            <p className="font-medium">{destName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">天数</p>
            <p className="font-medium">{request.days} 天</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">人数</p>
            <p className="font-medium">{request.customer.groupSize} 人</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">客户类型</p>
            <p className="font-medium text-sm">{request.customerType}</p>
          </div>
        </div>
      </div>

      {/* 费用分析 */}
      <div className="bg-white rounded-lg border border-warm-200 p-6">
        <h3 className="font-serif font-bold text-lg mb-4">费用预算分解</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-warm-100">
            <span>景点门票</span>
            <span className="font-medium">¥{costBreakdown.attractions.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-warm-100">
            <span>住宿</span>
            <span className="font-medium">¥{costBreakdown.accommodation.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-warm-100">
            <span>餐食</span>
            <span className="font-medium">¥{costBreakdown.meals.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-warm-100">
            <span>其他（交通、导游等）</span>
            <span className="font-medium">¥{costBreakdown.other.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-2 text-lg font-serif font-bold">
            <span>总计</span>
            <span className="text-primary">¥{costBreakdown.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* 行程亮点 */}
      {highlights && highlights.length > 0 && (
        <div className="bg-white rounded-lg border border-warm-200 p-6">
          <h3 className="font-serif font-bold text-lg mb-4">✨ 行程亮点</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-sm text-gray-700">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 日程详情 */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-lg">每日行程安排</h3>
        {days.map((day) => (
          <div key={day.day} className="bg-white rounded-lg border border-warm-200 overflow-hidden">
            {/* 日期头 */}
            <div className="bg-gradient-to-r from-warm-100 to-warm-50 px-6 py-4">
              <h4 className="font-serif font-bold text-lg">{day.title}</h4>
              <p className="text-sm text-gray-600 mt-1">主题：{day.theme}</p>
            </div>

            {/* 日程内容 */}
            <div className="p-6 space-y-4">
              {/* 早、中、晚时段安排 */}
              {day.schedule && (
                <div>
                  <div className="space-y-3">
                    {day.schedule.morning && (
                      <div className="flex gap-3 items-start">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold flex-shrink-0">
                          🌅
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-700 text-sm">上午</p>
                          <p className="text-sm text-gray-600">{day.schedule.morning}</p>
                        </div>
                      </div>
                    )}
                    {day.schedule.afternoon && (
                      <div className="flex gap-3 items-start">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 text-xs font-bold flex-shrink-0">
                          ☀️
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-700 text-sm">下午</p>
                          <p className="text-sm text-gray-600">{day.schedule.afternoon}</p>
                        </div>
                      </div>
                    )}
                    {day.schedule.evening && (
                      <div className="flex gap-3 items-start">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex-shrink-0">
                          🌆
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-700 text-sm">晚上</p>
                          <p className="text-sm text-gray-600">{day.schedule.evening}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 景点列表（可选） */}
              {day.attractions.length > 0 && (
                <div className="border-t border-warm-100 pt-4">
                  <h5 className="font-medium text-gray-700 mb-3 text-sm">🎯 主要景点</h5>
                  <div className="space-y-2">
                    {day.attractions.map((attr, idx) => (
                      <div key={attr.id} className="text-sm">
                        <p className="font-medium text-gray-700">{attr.name}</p>
                        <p className="text-xs text-gray-600">{attr.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 餐食 */}
              {day.meals && (
                <div className="border-t border-warm-100 pt-4">
                  <h5 className="font-medium text-gray-700 mb-2 text-sm">🍽 餐食安排</h5>
                  <div className="text-xs space-y-1 text-gray-600">
                    {day.meals.breakfast && <p>早餐：{day.meals.breakfast}</p>}
                    {day.meals.lunch && <p>中餐：{day.meals.lunch}</p>}
                    {day.meals.dinner && <p>晚餐：{day.meals.dinner}</p>}
                  </div>
                </div>
              )}

              {/* 住宿 */}
              {day.accommodation && (
                <div className="border-t border-warm-100 pt-4">
                  <h5 className="font-medium text-gray-700 mb-2 text-sm">🏨 住宿</h5>
                  <p className="text-sm">
                    <span className="font-medium">{day.accommodation.name}</span>
                    <span className="text-gray-500 text-xs ml-2">⭐ {day.accommodation.stars}星</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 重要信息 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>ℹ️ 提示：</strong> 该行程为初步建议，可根据客户需求在下方编辑后导出为精美 PDF。
        </p>
      </div>
    </div>
  )
}
