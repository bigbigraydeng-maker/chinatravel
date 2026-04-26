import Link from 'next/link';

const FB_URL = 'https://www.facebook.com/CTSTOURS/';

export default function FacebookFollowStrip() {
  return (
    <section className="bg-blue-50 border-y border-blue-200">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">

          {/* Left: Icon + text */}
          <div className="flex items-center gap-4">
            {/* Facebook logo circle */}
            <div className="w-14 h-14 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0 shadow-md">
              <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </div>

            <div>
              <p className="font-bold text-gray-900 text-base md:text-lg leading-tight">
                Follow Our Journey on Facebook
              </p>
              <p className="text-gray-500 text-sm mt-0.5">
                Travel inspiration, China tips &amp; exclusive offers for Kiwi travellers
              </p>
              {/* Social proof row */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex -space-x-1.5">
                  {[54, 31, 8, 22, 47].map((img) => (
                    <img
                      key={img}
                      src={`https://i.pravatar.cc/32?img=${img}`}
                      alt=""
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">1,200+</span> Kiwis following
                </span>
              </div>
            </div>
          </div>

          {/* Right: CTA button */}
          <Link
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#1877F2] hover:bg-[#166FE5] active:bg-[#1565C0] text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-colors whitespace-nowrap text-sm md:text-base flex-shrink-0"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
            Like our Page
          </Link>

        </div>
      </div>
    </section>
  );
}
