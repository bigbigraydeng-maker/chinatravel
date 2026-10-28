// Why these tests exist: a visitor must only ever see a recent item that a named person approved, never anything
// fetched from outside, and a stale or unapproved item must make the block disappear instead of showing old news.
import {
  AD_CONTENT_FEED,
  MAX_ITEM_AGE_DAYS,
  getLatestApprovedItem,
  validateFeedItem,
  type AdContentItem,
} from '@/lib/ad-landing/content-feed';

function makeItem(overrides: Partial<AdContentItem> = {}): AdContentItem {
  return {
    id: 'reel-1',
    tourSlug: 'test-tour',
    type: 'reel',
    platform: 'instagram',
    permalink: 'https://example.com/p/1',
    videoSrc: '/videos/test.mp4',
    poster: { src: '/images/poster.webp', alt: 'A boat on a canal', width: 720, height: 1280 },
    caption: 'Afternoon tea in the water town.',
    publishedAt: '2026-10-10',
    approvedBy: 'Test Approver',
    approvedAt: '2026-10-11T02:00:00Z',
    ...overrides,
  };
}

const NOW = new Date('2026-10-20T00:00:00Z');

describe('validateFeedItem', () => {
  it('accepts a complete reel', () => {
    expect(validateFeedItem(makeItem())).toEqual([]);
  });

  it('accepts a post without video', () => {
    expect(validateFeedItem(makeItem({ type: 'post', videoSrc: undefined }))).toEqual([]);
  });

  it('asks for a named approver', () => {
    expect(validateFeedItem(makeItem({ approvedBy: '   ' }))).toContain('approvedBy is empty');
  });

  it('rejects a caption that makes a ruled-out claim', () => {
    const problems = validateFeedItem(makeItem({ caption: 'Small group departures' }));
    expect(problems.some((p) => p.startsWith('caption: '))).toBe(true);
  });

  it('rejects bad dates', () => {
    const problems = validateFeedItem(
      makeItem({ publishedAt: '10/10/2026', approvedAt: 'yesterday' }),
    );
    expect(problems).toContain('publishedAt is not a valid YYYY-MM-DD date');
    expect(problems).toContain('approvedAt is not a valid date-time');
  });

  it('wants a self-hosted video for a reel', () => {
    expect(validateFeedItem(makeItem({ videoSrc: undefined }))).toContain(
      'videoSrc is required for a reel or video',
    );
    expect(validateFeedItem(makeItem({ videoSrc: 'https://cdn.example.com/a.mp4' }))).toContain(
      'videoSrc must be a file on this site (start with a single "/")',
    );
    expect(validateFeedItem(makeItem({ videoSrc: '//cdn.example.com/a.mp4' }))).toContain(
      'videoSrc must be a file on this site (start with a single "/")',
    );
  });

  it('does not allow a video on a post', () => {
    expect(validateFeedItem(makeItem({ type: 'post', videoSrc: '/videos/a.mp4' }))).toContain(
      'videoSrc is not allowed for a post',
    );
  });

  it('only allows https links to the original post', () => {
    expect(validateFeedItem(makeItem({ permalink: 'http://example.com/p/1' }))).toContain(
      'permalink must start with https://',
    );
  });

  it('can report several problems at once', () => {
    const problems = validateFeedItem(makeItem({ approvedBy: '', caption: '' }));
    expect(problems.length).toBeGreaterThanOrEqual(2);
  });
});

describe('getLatestApprovedItem', () => {
  it('returns null for an empty feed', () => {
    expect(getLatestApprovedItem([], 'test-tour', NOW)).toBeNull();
  });

  it('returns null when no item is about this tour', () => {
    expect(getLatestApprovedItem([makeItem({ tourSlug: 'other-tour' })], 'test-tour', NOW)).toBeNull();
  });

  it('ignores an item nobody approved', () => {
    expect(getLatestApprovedItem([makeItem({ approvedBy: '' })], 'test-tour', NOW)).toBeNull();
  });

  it('ignores an item approved after now', () => {
    expect(
      getLatestApprovedItem([makeItem({ approvedAt: '2026-10-21T00:00:00Z' })], 'test-tour', NOW),
    ).toBeNull();
  });

  it('hides an item older than the limit', () => {
    expect(MAX_ITEM_AGE_DAYS).toBe(30);
    const atLimit = makeItem({ id: 'at-limit', publishedAt: '2026-09-20' });
    const tooOld = makeItem({ id: 'too-old', publishedAt: '2026-09-19' });
    expect(getLatestApprovedItem([atLimit], 'test-tour', NOW)).toBe(atLimit);
    expect(getLatestApprovedItem([tooOld], 'test-tour', NOW)).toBeNull();
  });

  it('ignores an item that claims to be published in the future', () => {
    expect(getLatestApprovedItem([makeItem({ publishedAt: '2026-10-25' })], 'test-tour', NOW)).toBeNull();
  });

  it('picks the most recently published item', () => {
    const a = makeItem({ id: 'a', publishedAt: '2026-10-01' });
    const b = makeItem({ id: 'b', publishedAt: '2026-10-15' });
    const c = makeItem({ id: 'c', publishedAt: '2026-10-08' });
    expect(getLatestApprovedItem([a, b, c], 'test-tour', NOW)).toBe(b);

    const earlier = makeItem({ id: 'earlier', publishedAt: '2026-10-15', approvedAt: '2026-10-15T00:00:00Z' });
    const later = makeItem({ id: 'later', publishedAt: '2026-10-15', approvedAt: '2026-10-16T00:00:00Z' });
    expect(getLatestApprovedItem([earlier, later], 'test-tour', NOW)).toBe(later);
  });

  it('ignores an invalid item even when it is the newest', () => {
    const valid = makeItem({ id: 'valid', publishedAt: '2026-10-10' });
    const invalid = makeItem({ id: 'invalid', publishedAt: '2026-10-18', caption: 'max 16 guests' });
    expect(getLatestApprovedItem([valid, invalid], 'test-tour', NOW)).toBe(valid);
  });
});

describe('AD_CONTENT_FEED', () => {
  it('every item shipped in the feed is valid and has a named approver', () => {
    for (const item of AD_CONTENT_FEED) {
      expect(validateFeedItem(item)).toEqual([]);
    }
  });
});
