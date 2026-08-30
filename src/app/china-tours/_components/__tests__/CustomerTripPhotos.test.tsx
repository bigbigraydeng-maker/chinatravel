/**
 * CustomerTripPhotos tests
 *
 * 照片墙 —— 照片是真的，但我们不知道每张是谁拍的，所以这里**不许出现评价**。
 * 用例锁的就是这条：
 *  - 6 张图都渲染出来（少一条数据是掉一张图，不是塌掉整个区块）
 *  - 每张图都有来源标注（谁给的），不是人名 + 引语
 *  - 版面上不出现任何评价人姓名 / 引号包起来的引语
 *  - 图片仍来自 ME visual-assets bucket
 */
import { render, screen } from '@testing-library/react';
import CustomerTripPhotos from '../CustomerTripPhotos';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props: any) => <img {...props} />,
}));

/** 本站曾经编造过的评价人姓名 —— 一个都不许再出现在版面上 */
const FABRICATED_NAMES = [
  'Mackenzie',
  'Larsen',
  'Patterson',
  'Hewitt',
  'Brennan',
  'Donohue',
  'Voss',
  'Tanner',
  'Orton',
  'Connelly',
  'Armstrong',
  'Bowen',
  'Cooper',
];

describe('CustomerTripPhotos', () => {
  it('renders the section heading + intro', () => {
    render(<CustomerTripPhotos />);
    expect(screen.getByRole('heading', { name: /Scenes from the road/i })).toBeInTheDocument();
    expect(screen.getByText(/Photos from the road/i)).toBeInTheDocument();
  });

  it('renders exactly 6 trip-photo tiles', () => {
    render(<CustomerTripPhotos />);
    // <figure> per tile
    const tiles = document.querySelectorAll('figure');
    expect(tiles.length).toBe(6);
  });

  it('every tile carries a source credit instead of a named reviewer + quote', () => {
    render(<CustomerTripPhotos />);
    const credits = screen.getAllByText(/Shared by a CTS traveller/i);
    expect(credits.length).toBe(5);
    expect(screen.getByText(/CTS photo library/i)).toBeInTheDocument();
  });

  it('shows a location only where we actually know it', () => {
    render(<CustomerTripPhotos />);
    expect(screen.getByText('Guilin & Yangshuo')).toBeInTheDocument();
  });

  it('carries no fabricated reviewer names and no quotes at all', () => {
    const { container } = render(<CustomerTripPhotos />);
    const text = container.textContent || '';
    FABRICATED_NAMES.forEach((name) => {
      expect(text).not.toContain(name);
    });
    // 引号 = 有人在说话。这个区块里不该有任何人在说话。
    expect(text).not.toContain('“');
    expect(text).not.toContain('”');
    expect(text).not.toMatch(/Quote from/i);
  });

  it('every photo URL comes from ME visual-assets bucket (not chinatravel tour-images)', () => {
    // Pinning the data source: switching back to the chinatravel tour-images
    // bucket would silently regress the "ME-curated" promise — fail loudly.
    render(<CustomerTripPhotos />);
    const imgs = document.querySelectorAll('figure img');
    expect(imgs.length).toBe(6);
    imgs.forEach((img) => {
      const src = img.getAttribute('src') || '';
      expect(src).toMatch(/glbdnayojixmexgofbsd\.supabase\.co\/storage\/.*\/visual-assets\//);
    });
  });
});
