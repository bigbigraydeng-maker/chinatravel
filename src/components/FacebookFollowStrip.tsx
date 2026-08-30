import Link from 'next/link';

const FB_URL = 'https://www.facebook.com/CTSTOURS/';

/**
 * CTS Facebook 主页粉丝数 —— **必须是核实过的真数字**。
 *
 * 这里原本写死「1,200+」，配 4-5 张 i.pravatar.cc 的随机假人脸当"粉丝头像"。
 * 那个数字在 ME 库、客户连接器、Meta 接口里都查不到来源，是编的；假头像更是
 * 直接把随机生成的人脸当成真实粉丝展示。两样都已撤除。
 *
 * 现在这个数字由 PM 于 2026-08-30 在 CTS 自己的 Facebook 主页上核实。
 *
 * ⚠️ 改这个数字之前先去 FB_URL 看一眼实际值，**不许估、不许沿用旧值、不许
 * 加"+"往上凑**，并同步更新 verifiedOn。拿不到真数字就把整块删掉，不要留
 * 一个编的——留假数字比不显示更糟。
 */
const FB_FOLLOWERS = {
  count: 1700,
  verifiedOn: '2026-08-30',
} as const;

const FB_ICON = (
  <svg className="fill-white" viewBox="0 0 24 24">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

interface FacebookFollowStripProps {
  /** 'full' = full-width section strip (homepage / page bottom)
   *  'inline' = compact card that fits inside a content column */
  variant?: 'full' | 'inline';
}

export default function FacebookFollowStrip({ variant = 'full' }: FacebookFollowStripProps) {

  /* ── Inline / compact card ─────────────────────────────────────────────── */
  if (variant === 'inline') {
    return (
      <div className="rounded-2xl bg-blue-50 border border-blue-200 px-5 py-4 flex items-center gap-4">
        {/* FB logo circle */}
        <div className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="w-6 h-6">{FB_ICON}</span>
        </div>

        {/* 假头像已撤（见 FB_FOLLOWERS 注释）；数字是核实过的真实粉丝数 */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm leading-tight">Follow us on Facebook</p>
          <p className="text-xs text-gray-500 mt-1">
            <span className="font-semibold text-gray-700">
              {FB_FOLLOWERS.count.toLocaleString('en-NZ')}
            </span>{' '}
            Kiwis following
          </p>
        </div>

        {/* CTA */}
        <Link
          href={FB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-1.5 bg-[#1877F2] hover:bg-[#166FE5] active:bg-[#1565C0] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm"
        >
          <span className="w-3.5 h-3.5">{FB_ICON}</span>
          Follow
        </Link>
      </div>
    );
  }

  /* ── Full-width section strip ───────────────────────────────────────────── */
  return (
    <section className="bg-blue-50 border-y border-blue-200">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">

          {/* Left: Icon + text */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="w-7 h-7">{FB_ICON}</span>
            </div>

            <div>
              <p className="font-bold text-gray-900 text-base md:text-lg leading-tight">
                Follow Our Journey on Facebook
              </p>
              <p className="text-gray-500 text-sm mt-0.5">
                Travel inspiration, China tips &amp; exclusive offers for Kiwi travellers
              </p>
              {/* 假头像已撤（见 FB_FOLLOWERS 注释）；数字是核实过的真实粉丝数 */}
              <p className="text-gray-500 text-xs mt-2">
                <span className="font-semibold text-gray-700">
                  {FB_FOLLOWERS.count.toLocaleString('en-NZ')}
                </span>{' '}
                Kiwis following
              </p>
            </div>
          </div>

          {/* Right: CTA button */}
          <Link
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#1877F2] hover:bg-[#166FE5] active:bg-[#1565C0] text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-colors whitespace-nowrap text-sm md:text-base flex-shrink-0"
          >
            <span className="w-5 h-5">{FB_ICON}</span>
            Like our Page
          </Link>

        </div>
      </div>
    </section>
  );
}
