import { renderBlogPostHtml } from '@/lib/blog-html';

describe('renderBlogPostHtml', () => {
  it('renders h2 and h3', () => {
    const html = renderBlogPostHtml(`## Section one\n\n### Sub A\n\nBody text.`);
    expect(html).toContain('<h2 ');
    expect(html).toContain('Section one');
    expect(html).toContain('<h3 ');
    expect(html).toContain('Sub A');
    expect(html).toContain('<p class="mb-6');
  });

  it('renders bullet lists', () => {
    const html = renderBlogPostHtml(`Intro.\n\n- **One**\n- Two`);
    expect(html).toContain('<ul class="list-disc');
    expect(html).toContain('<strong>One</strong>');
    expect(html).toContain('Two');
  });

  it('renders markdown links', () => {
    const html = renderBlogPostHtml(`See [visa](/china-visa-guide-for-new-zealanders).`);
    expect(html).toContain('href="/china-visa-guide-for-new-zealanders"');
  });

  describe('markdown tables', () => {
    it('renders a table with real <thead>/<tbody> when block has separator row', () => {
      const md = `| Document | Required? |\n| --- | --- |\n| Passport | Yes |\n| Return ticket | Yes |`;
      const html = renderBlogPostHtml(md);
      expect(html).toContain('<table ');
      expect(html).toContain('<thead>');
      expect(html).toContain('<tbody>');
      expect(html).toContain('<th ');
      expect(html).toContain('Document');
      expect(html).toContain('<td ');
      expect(html).toContain('Passport');
      expect(html).toContain('Return ticket');
    });

    it('processes inline markdown (bold, links) inside table cells', () => {
      const md = `| Field | Note |\n| --- | --- |\n| Passport | See **6-month rule** or [visa guide](/china-visa-guide-for-new-zealanders) |`;
      const html = renderBlogPostHtml(md);
      expect(html).toContain('<strong>6-month rule</strong>');
      expect(html).toContain('href="/china-visa-guide-for-new-zealanders"');
    });

    it('does not confuse pipe-in-paragraph as a table (no separator row)', () => {
      const md = `A regular paragraph with a | pipe character in it.`;
      const html = renderBlogPostHtml(md);
      expect(html).not.toContain('<table');
      expect(html).toContain('<p class="mb-6');
    });

    it('wraps the table in an overflow-x-auto container for narrow mobile viewports', () => {
      const md = `| A | B |\n| --- | --- |\n| 1 | 2 |`;
      const html = renderBlogPostHtml(md);
      expect(html).toContain('overflow-x-auto');
    });
  });
});
