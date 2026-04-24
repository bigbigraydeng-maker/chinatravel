/**
 * OP 界面密码验证逻辑
 * 类似 /marketing/campaign 的实现方式
 */

import { cookies } from 'next/headers'

export const ADMIN_COOKIE_NAME = 'itinerary-admin-access'
export const ADMIN_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 // 7 天

/**
 * 验证密码，返回布尔值
 */
export function verifyAdminPassword(providedPassword: string): boolean {
  const correctPassword = process.env.ITINERARY_ADMIN_PASSWORD || 'admin123'
  return providedPassword === correctPassword
}

/**
 * 设置管理员 Cookie
 */
export async function setAdminCookie() {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, 'true', {
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: '/admin/itinerary-generator',
    httpOnly: true,
    sameSite: 'lax',
  })
}

/**
 * 检查用户是否已授权
 */
export async function isAdminAuthorized(): Promise<boolean> {
  const cookieStore = await cookies()
  const accessCookie = cookieStore.get(ADMIN_COOKIE_NAME)
  return accessCookie?.value === 'true'
}

/**
 * 清除管理员 Cookie（登出）
 */
export async function clearAdminCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}
