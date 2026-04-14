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
});
