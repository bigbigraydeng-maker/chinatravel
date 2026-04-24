import { redirect } from 'next/navigation'

/**
 * 重定向到新位置
 * 行程生成器已移到 /itinerary-generator（不受 admin 保护）
 */
export default function OldAdminItineraryPage() {
  redirect('/itinerary-generator')
}
