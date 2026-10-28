import { render, screen } from '@testing-library/react';
import FaqAccordion, { type FaqAccordionItem } from '@/components/ad-landing/FaqAccordion';
import LatestContent from '@/components/ad-landing/LatestContent';
import type { AdContentItem } from '@/lib/ad-landing/content-feed';

/**
 * These tests exist because the FAQ prints the tour's own answers, closed until
 * opened, and the "latest content" block shows one approved item with a named
 * approver behind it but never shows the approver, and disappears when there is
 * nothing to show.
 */

describe('FaqAccordion', () => {
  it('prints every question closed and every answer in the page', () => {
    const items: FaqAccordionItem[] = [
      { question: 'What is included?', answer: 'Breakfast and dinner.' },
      { question: 'How long is the tour?', answer: 'Five days.' },
      { question: 'Can I bring a friend?', answer: 'Yes, of course.' },
    ];

    const { container } = render(<FaqAccordion title='Questions' items={items} accent='teal' />);

    for (const item of items) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }

    const details = container.querySelectorAll('details');
    expect(details).toHaveLength(items.length);
    for (const element of Array.from(details)) {
      expect(element.hasAttribute('open')).toBe(false);
    }
  });

  it('splits an answer on line breaks into paragraphs', () => {
    const items: FaqAccordionItem[] = [
      { question: 'What is included?', answer: 'First paragraph.\nSecond paragraph.' },
    ];

    const { container } = render(<FaqAccordion title='Questions' items={items} accent='teal' />);

    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0].textContent).toBe('First paragraph.');
    expect(paragraphs[1].textContent).toBe('Second paragraph.');
  });

  it('shows the link under the answer when the item has one', () => {
    const items: FaqAccordionItem[] = [
      {
        question: 'What are the terms?',
        answer: 'See the terms.',
        link: { href: '/terms-and-conditions', label: 'Read the terms' },
      },
    ];

    render(<FaqAccordion title='Questions' items={items} accent='teal' />);

    expect(screen.getByRole('link', { name: 'Read the terms' })).toHaveAttribute(
      'href',
      '/terms-and-conditions',
    );
  });

  it('renders nothing without items', () => {
    const { container } = render(<FaqAccordion title='Questions' items={[]} accent='teal' />);

    expect(container.firstChild).toBeNull();
  });
});

describe('LatestContent', () => {
  const reelItem: AdContentItem = {
    id: 'r1',
    tourSlug: 'test-tour',
    type: 'reel',
    platform: 'instagram',
    permalink: 'https://example.com/p/1',
    videoSrc: '/videos/test.mp4',
    poster: {
      src: '/images/poster.webp',
      alt: 'A boat on a canal',
      width: 720,
      height: 1280,
    },
    caption: 'Afternoon tea in the water town.',
    publishedAt: '2026-10-10',
    approvedBy: 'Test Approver',
    approvedAt: '2026-10-11T02:00:00Z',
  };

  it('renders nothing without an item', () => {
    const { container } = render(<LatestContent title='Latest' item={null} accent='teal' />);

    expect(container.firstChild).toBeNull();
  });

  it('plays a self-hosted video with its poster and does not load it up front', () => {
    const { container } = render(<LatestContent title='Latest' item={reelItem} accent='teal' />);

    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    if (!video) {
      throw new Error('expected a video element');
    }
    expect(video).toHaveAttribute('preload', 'none');
    expect(video).toHaveAttribute('poster', '/images/poster.webp');
    expect(video).toHaveAttribute('controls');

    const source = video.querySelector('source');
    expect(source).not.toBeNull();
    if (!source) {
      throw new Error('expected a source element');
    }
    expect(source).toHaveAttribute('src', '/videos/test.mp4');
  });

  it('shows a picture for a post without video', () => {
    const postItem: AdContentItem = {
      ...reelItem,
      type: 'post',
      videoSrc: undefined,
    };

    const { container } = render(<LatestContent title='Latest' item={postItem} accent='teal' />);

    expect(screen.getByAltText('A boat on a canal')).toBeInTheDocument();
    expect(container.querySelector('video')).toBeNull();
  });

  it('prints the caption and a readable publish date', () => {
    render(<LatestContent title='Latest' item={reelItem} accent='teal' />);

    expect(screen.getByText(/Posted 10 October 2026/)).toBeInTheDocument();
  });

  it('links to the original post in a new tab with a safe rel', () => {
    const { unmount } = render(<LatestContent title='Latest' item={reelItem} accent='teal' />);

    const link = screen.getByRole('link', { name: 'View the original post' });
    expect(link).toHaveAttribute('href', 'https://example.com/p/1');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toContain('noopener');

    unmount();

    const withoutPermalink: AdContentItem = { ...reelItem, permalink: undefined };
    render(<LatestContent title='Latest' item={withoutPermalink} accent='teal' />);

    expect(screen.queryByRole('link', { name: 'View the original post' })).toBeNull();
  });

  it('never shows who approved it', () => {
    const { container } = render(<LatestContent title='Latest' item={reelItem} accent='teal' />);

    expect(container.textContent).not.toContain('Test Approver');
  });
});
