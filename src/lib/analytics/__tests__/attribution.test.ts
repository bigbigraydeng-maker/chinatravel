import { attributionEmailRows, sanitizeAttribution } from '../attribution';
import { captureSubmitAttribution, readSubmitAttribution, recordPageView } from '../first-touch';

describe('sanitizeAttribution', () => {
  it('keeps clean paths, strips query strings, dedupes and caps tour pages at 5', () => {
    const a = sanitizeAttribution({
      first_landing_path: '/beijing-travel-guide?utm_source=x',
      submit_path: '/tours/a/b/c#top',
      referrer_host: 'www.google.com',
      viewed_tour_paths: ['/tours/1', '/tours/1', '/tours/2', '/tours/3', '/tours/4', '/tours/5', '/tours/6'],
      utm_source: 'google',
    });
    expect(a).toMatchObject({ first_landing_path: '/beijing-travel-guide', submit_path: '/tours/a/b/c', utm_source: 'google' });
    expect(a!.viewed_tour_paths).toEqual(['/tours/1', '/tours/2', '/tours/3', '/tours/4', '/tours/5']);
  });
  it('garbage in → null or empty, never a throw', () => {
    for (const bad of [undefined, null, 5, 'x', [], {}, { first_landing_path: 'javascript:alert(1)' }, { first_landing_path: { a: 1 } }]) {
      expect(sanitizeAttribution(bad)).toBeNull();
    }
  });
});

describe('attributionEmailRows', () => {
  it('adds four labelled rows and escapes HTML', () => {
    const a = sanitizeAttribution({ first_landing_path: '/a', submit_path: '/b', referrer_host: '<img src=x>', viewed_tour_paths: [] })!;
    const html = attributionEmailRows(a);
    expect(html).toContain('First landing page');
    expect(html).toContain('Submitted from');
    expect(html).toContain('Tour pages viewed');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;img');
  });
  it('null → empty string (email unchanged)', () => {
    expect(attributionEmailRows(null)).toBe('');
  });
});

describe('first-touch (browser side)', () => {
  beforeEach(() => sessionStorage.clear());

  it('the FIRST page wins; later pages only add to viewed tour pages — the blog→tour journey is not mis-credited to the tour page', () => {
    recordPageView('/beijing-travel-guide');
    recordPageView('/tours/china/discovery/x');
    recordPageView('/tours/china/discovery/x');
    window.history.pushState({}, '', '/tours/china/discovery/x');
    const a = captureSubmitAttribution()!;
    expect(a.first_landing_path).toBe('/beijing-travel-guide');
    expect(a.submit_path).toBe('/tours/china/discovery/x');
    expect(a.viewed_tour_paths).toEqual(['/tours/china/discovery/x']);
  });

  it('remembers the submit page for the later /thank-you page load', () => {
    recordPageView('/contact');
    window.history.pushState({}, '', '/contact');
    captureSubmitAttribution();
    window.history.pushState({}, '', '/thank-you');
    expect(readSubmitAttribution()?.submit_path).toBe('/contact');
  });

  it('storage failure never throws and never blocks', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('denied'); });
    expect(() => recordPageView('/x')).not.toThrow();
    expect(() => captureSubmitAttribution()).not.toThrow();
    spy.mockRestore();
  });
});
