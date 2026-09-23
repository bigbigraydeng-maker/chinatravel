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

  describe('tables', () => {
    it('renders a well-formed table as thead/tbody inside a scrollable wrapper', () => {
      const html = renderBlogPostHtml(
        `| Collection | Style | Group Size |\n|-----------|-------|-----------|\n| Discovery | Great value | Up to 24 |\n| Signature | Premium | Max 16 |`
      );

      expect(html).toContain('<table ');
      expect(html).toContain('<thead');
      expect(html).toContain('<tbody');
      // Header cells are <th>, body cells are <td> — not the other way round.
      expect(html).toContain('<th class="px-4 py-3 text-left border-b border-gray-200 whitespace-nowrap">Collection</th>');
      expect(html).toContain('>Discovery</td>');
      expect((html.match(/<tr /g) ?? []).length).toBe(3); // 1 header + 2 body rows
      expect((html.match(/<th /g) ?? []).length).toBe(3);
      // Wide comparison tables must scroll inside their own container, not blow out mobile layout.
      expect(html).toContain('<div class="overflow-x-auto my-8">');
      // The delimiter row is structure, never content.
      expect(html).not.toContain('---');
      expect(html).not.toContain('|');
    });

    it('processes inline markdown inside cells, including an empty leading header cell', () => {
      const html = renderBlogPostHtml(
        `| | **Chengdu** | **Chongqing** |\n|---|---|---|\n| **Headline draw** | [Giant pandas](/chengdu-panda-sanctuary) | Liziba monorail |`
      );

      // Bold/link markup must not survive as literal asterisks or brackets in the rendered cell.
      expect(html).toContain('<th class="px-4 py-3 text-left border-b border-gray-200 whitespace-nowrap"><strong>Chengdu</strong></th>');
      expect(html).toContain('<strong>Headline draw</strong>');
      expect(html).toContain('href="/chengdu-panda-sanctuary"');
      expect(html).toContain('>Giant pandas</a>');
      expect(html).not.toContain('**');
      expect(html).not.toContain('](');
      // An empty first header cell still holds the column open.
      expect(html).toContain('whitespace-nowrap"></th>');
      expect((html.match(/<th /g) ?? []).length).toBe(3);
    });

    it('pads short rows and drops extra cells so every row matches the header width', () => {
      const html = renderBlogPostHtml(
        `| A | B | C |\n|---|---|---|\n| only one |\n| w | x | y | z |`
      );

      // Ragged rows would otherwise shift cells under the wrong column heading.
      const rows = html.split('<tr ').slice(2); // drop pre-table chunk + header row
      expect(rows).toHaveLength(2);
      rows.forEach((row) => expect((row.match(/<td /g) ?? []).length).toBe(3));
      expect(html).not.toContain('>z<');
    });

    it('does not turn prose containing stray pipes into a table', () => {
      const html = renderBlogPostHtml(
        `Fares are quoted NZD | AUD | USD.\nRoute: Auckland | Shanghai | Chongqing.`
      );

      expect(html).not.toContain('<table');
      expect(html).toContain('<p class="mb-6');
      expect(html).toContain('NZD | AUD | USD');
    });

    it('does not treat a pipe row as a table without a matching delimiter row', () => {
      // No delimiter row at all — this is a list of options, not a table.
      expect(renderBlogPostHtml(`| Beijing | Xi'an |\n| Shanghai | Guilin |`)).not.toContain('<table');
      // Delimiter row present but only 2 columns against a 3-column header.
      expect(renderBlogPostHtml(`| A | B | C |\n|---|---|\n| 1 | 2 | 3 |`)).not.toContain('<table');
    });
  });
});
