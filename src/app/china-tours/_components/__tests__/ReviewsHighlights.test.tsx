/**
 * ReviewsHighlights tests
 *
 * 三条**真实** Google 评价 —— 用例锁的是"不许编"这条线：
 *  - 三张卡片，姓名是 Google 上真实存在的评价人
 *  - 正文逐字照抄（这里锁住每条的首尾片段，改写会立刻红）
 *  - 页头聚合评分读 google-rating.ts，不写死数字，也不画满五颗星
 *  - 版面上不出现编造姓名 / 编造城市 / 编造标题
 */
import { render, screen } from '@testing-library/react';
import ReviewsHighlights from '../ReviewsHighlights';
import { GOOGLE_RATING } from '@/lib/data/google-rating';

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
];

describe('ReviewsHighlights', () => {
  it('renders header + aggregate rating straight from google-rating.ts', () => {
    render(<ReviewsHighlights />);
    expect(screen.getByRole('heading', { name: /What Kiwi travellers say/i })).toBeInTheDocument();
    expect(
      screen.getByText(`${GOOGLE_RATING.value} from ${GOOGLE_RATING.count} Google reviews`)
    ).toBeInTheDocument();
  });

  it('links the aggregate rating to the Google profile so anyone can check it', () => {
    render(<ReviewsHighlights />);
    const link = screen.getByRole('link', {
      name: new RegExp(`${GOOGLE_RATING.value} from ${GOOGLE_RATING.count} Google reviews`),
    });
    expect(link).toHaveAttribute('href', GOOGLE_RATING.profileUrl);
  });

  it('renders exactly 3 review cards, all named after real Google reviewers', () => {
    render(<ReviewsHighlights />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
    expect(screen.getByText('Maryam Absh')).toBeInTheDocument();
    expect(screen.getByText('Murray Middendorf')).toBeInTheDocument();
    expect(screen.getByText('Tessa A')).toBeInTheDocument();
  });

  it('quotes each review verbatim — no paraphrasing, no trimming', () => {
    const { container } = render(<ReviewsHighlights />);
    const text = container.textContent || '';
    expect(text).toContain(
      'The china journey was well‑organized, I actually enjoyed all the moments without worrying about anything. Highly recommend the tour of tale of two cities china'
    );
    expect(text).toContain(
      'Just came back from a tour of Xinjiang and a stopover in Xian. We had a fantastic time, the culture and scenery in Xinjiang is stunning and the tour was led by an experienced guide with excellent English. Highly recommended.'
    );
    expect(text).toContain(
      'We had our China holiday planned by CTS tours. Communication was great and the tour itself was amazing. Everything was so well run and the tour guides in each city were great. The accommodation they chose and the preplanned meals organized were stand outs. Would definitely use again to organise future trips'
    );
  });

  it('shows a tour chip only where the reviewer named the tour themselves', () => {
    render(<ReviewsHighlights />);
    // 照抄客人自己的写法，包括小写
    expect(screen.getByText(/Tour mentioned: tale of two cities/)).toBeInTheDocument();
    expect(screen.getByText(/Tour mentioned: Xinjiang/)).toBeInTheDocument();
    // Tessa A 没在正文里点名任何团 —— 就不该有第三个 chip
    expect(screen.getAllByText(/Tour mentioned:/).length).toBe(2);
  });

  it('each card carries an aria-labelled 5-star rating (all three really are 5-star)', () => {
    render(<ReviewsHighlights />);
    const ratings = screen.getAllByLabelText(/5 out of 5 stars/i);
    expect(ratings).toHaveLength(3);
  });

  it('carries no fabricated reviewer names', () => {
    const { container } = render(<ReviewsHighlights />);
    const text = container.textContent || '';
    FABRICATED_NAMES.forEach((name) => {
      expect(text).not.toContain(name);
    });
  });
});
