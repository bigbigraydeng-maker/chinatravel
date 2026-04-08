/**
 * Simple in-memory rate limiter for login attempts
 * Tracks failed attempts by IP and resets daily
 */

interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
  reset: number;
}

const limiter = new Map<string, RateLimitEntry>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minute window
const MAX_ATTEMPTS = 5; // max attempts per window
const DAILY_RESET = 24 * 60 * 60 * 1000; // reset every 24 hours

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

export function checkRateLimit(request: Request): { allowed: boolean; retryAfter?: number } {
  const clientIp = getClientIp(request);
  const now = Date.now();

  let entry = limiter.get(clientIp);

  // Reset if window expired or daily reset occurred
  if (!entry || now - entry.lastAttempt > WINDOW_MS || now > entry.reset) {
    entry = {
      attempts: 0,
      lastAttempt: now,
      reset: now + DAILY_RESET,
    };
    limiter.set(clientIp, entry);
  }

  // Increment attempt counter
  entry.attempts++;
  entry.lastAttempt = now;

  if (entry.attempts > MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((entry.reset - now) / 1000);
    return { allowed: false, retryAfter };
  }

  return { allowed: true };
}

export function recordSuccessfulLogin(request: Request): void {
  const clientIp = getClientIp(request);
  limiter.delete(clientIp);
}

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  Array.from(limiter.entries()).forEach(([ip, entry]) => {
    if (now - entry.lastAttempt > DAILY_RESET) {
      limiter.delete(ip);
    }
  });
}, 60 * 60 * 1000);
