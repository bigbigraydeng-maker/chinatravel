import Image from 'next/image';

/**
 * /china-tours 的照片墙 —— **真实照片，不配任何评价**。
 *
 * ## 图片来源
 *
 * 6 张都来自 ME 的 CTS 视觉素材库（`client_id c0000000-…`）：
 * 前 5 张原本是 CTS / FDE 从真实旅客聊天里存下来的微信照片
 * （文件名形如 `微信图片_20260421095738_*.jpg`），第 6 张是同一素材库里的
 * 一张风景图，用来做版面对比。
 *
 * ## 改这个文件前必读：这里不许出现评价
 *
 * 照片是真的，但我们**不知道每张是谁拍的**。所以这个 interface 里没有
 * `travellerName` / `travellerLocation` / `quote` —— 一个人名紧挨着一张照片
 * 和一句引语，读者看到的就是"这个人说了这句话"，那是一个**声明**，
 * 而我们无法证实它。
 *
 * 也**不要**把 Google 上真实评价的正文安到某张照片上：那位评价者并没有拍
 * 这张照片，那样只是换了一种编造。真实评价请放
 * `ReviewsHighlights.tsx` / `src/components/Testimonials.tsx`，那里有姓名、
 * 日期和可核对的 Google 来源链接。
 *
 * 拍摄地点同理：知道就写，不知道就留空，页面会自动少显示一行。
 *
 * ## 这里原来是什么样
 *
 * 每张照片原本配着一个编造的人名 + 编造的城市 + 编造评价的改写版（其中一条
 * 还写着 "Sunrise at Zhangjiajie's Avatar Mountains"，是个不存在的时刻），
 * 外加五颗金星。文件顶上的原注释自己承认引语是 paraphrased、照片与评价人
 * "NOT a verified 1:1 match"，然后辩解说版面写了 "photos shared by
 * travellers · quotes from verified NZ reviews" 所以不算误导 —— 这个辩解
 * 不成立，页面读者不会读源码注释。
 *
 * CTS brand guardrails（与 ME `asset_storyboards` seedance prompts 保持一致）：
 * atmospheric photography, premium positioning, NO crowded tourist shots,
 * NO "dragon and lantern" clichés, NO generic smiling-Asian stock.
 * Real client photos > stock.
 */

interface TripPhoto {
  image: string;
  altText: string;
  /** 确知的拍摄地；不知道就留空 —— 不许按画面猜一个地名填进去 */
  location?: string;
  /** 图片来源标注（照片是谁给的），不是对内容的任何声称 */
  credit: string;
}

// 5 张微信来源的旅客照片 + 1 张素材库风景图，全部来自 ME visual-assets bucket
// （client_id c0000000…）。CTS 传来新素材时可以直接替换，数组形状不变。
const PHOTOS: TripPhoto[] = [
  {
    // 微信图片_20260421095738_571_792.jpg · ME hook 9.20
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780187356478-4kmuaykng7d.jpg',
    altText: 'CTS traveller snapshot from the road',
    credit: 'Shared by a CTS traveller',
  },
  {
    // 微信图片_20260421095749_573_792.jpg · ME hook 9.20
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780187359197-le0g0lz42c.jpg',
    altText: 'CTS traveller photo · share from China',
    credit: 'Shared by a CTS traveller',
  },
  {
    // 微信图片_20260421095817_577_792.jpg · ME hook 8.80
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780187362253-iu81ezoko.jpg',
    altText: 'CTS traveller snapshot · evening light in China',
    credit: 'Shared by a CTS traveller',
  },
  {
    // 微信图片_20260421095741_572_792.jpg · ME middle 7.90
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780187357600-xos0kptxk2.jpg',
    altText: 'CTS traveller candid · group moment in China',
    credit: 'Shared by a CTS traveller',
  },
  {
    // 微信图片_20260421095751_574_792.jpg · ME hook 7.20
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780187360383-6ctn5cgku4q.jpg',
    altText: 'CTS traveller photo · scene from the trip',
    credit: 'Shared by a CTS traveller',
  },
  {
    // li-river-karst-boats.jpg · ME hook 9.60（风景对比图，非旅客投稿）
    image:
      'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/c0000000-0000-0000-0000-000000000000/assets/1780211973793-ctz79vud74f.jpg',
    altText: 'Li River karst peaks with bamboo rafts',
    location: 'Guilin & Yangshuo',
    credit: 'CTS photo library',
  },
];

export default function CustomerTripPhotos() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="max-w-3xl mb-8">
          <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">
            Photos from the road
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            Scenes from the road
          </h2>
          <p className="text-lg text-gray-700">
            Photos shared with us by CTS travellers, plus one frame from our own
            China library. Each is credited for what it is — we don&rsquo;t
            attach traveller quotes to them, because we can&rsquo;t tell you who
            took which photo.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {PHOTOS.map((p) => (
            <figure
              key={p.image}
              className="relative aspect-square rounded-xl overflow-hidden bg-warm-100 group"
            >
              <Image
                src={p.image}
                alt={p.altText}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              {/* Bottom-aligned dark gradient so the caption stays readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-white">
                {p.location && (
                  <p className="text-xs md:text-sm font-semibold leading-snug">
                    {p.location}
                  </p>
                )}
                <p className="text-[11px] text-white/80">{p.credit}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
