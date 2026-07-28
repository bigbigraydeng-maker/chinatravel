import type { Metadata } from 'next';

/**
 * 内部 OP 工具（新西兰本地行程生成器），不应出现在搜索结果里。
 * 注意：此页目前仍是公开可访问的，noindex 只挡收录、不挡访问。
 * 是否挪进 /admin 或下线，见 templates/tailor-made-itinerary/README.md 的说明。
 */
export const metadata: Metadata = {
  title: 'Itinerary generator | CTS Tours',
  robots: { index: false, follow: false },
};

export default function ItineraryGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
