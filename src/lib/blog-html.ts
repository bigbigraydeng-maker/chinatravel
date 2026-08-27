/**
 * Lightweight blog body → HTML for `dangerouslySetInnerHTML`.
 * Supports: **bold**, [text](href), ## h2, ### h3, bullet lists (- item), GFM tables, paragraphs.
 * Order: block structure first, then inline (bold → links) per block.
 *
 * Table classes are copied verbatim from MarkdownContent.tsx so the two renderers stay
 * visually identical — and because Tailwind's content globs cover src/components but not
 * src/lib, so these class names are only emitted thanks to that component.
 */

function processInline(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
}

/** A GFM delimiter row: pipes, dashes, optional alignment colons and spaces — nothing else. */
const TABLE_DELIMITER_ROW = /^\|(?:\s*:?-+:?\s*\|)+$/;

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

export function renderBlogPostHtml(content: string): string {
  const blocks = content.trim().split(/\n\n+/);
  const out: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('### ')) {
      out.push(
        `<h3 class="font-serif text-xl font-bold text-gray-900 mt-8 mb-3 scroll-mt-20">${processInline(
          trimmed.slice(4).trim()
        )}</h3>`
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      out.push(
        `<h2 class="font-serif text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-20">${processInline(
          trimmed.slice(3).trim()
        )}</h2>`
      );
      continue;
    }

    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      out.push(
        `<figure class="my-8 rounded-xl overflow-hidden"><img src="${imgMatch[2]}" alt="${imgMatch[1]}" class="w-full object-cover max-h-80 rounded-xl" loading="lazy" /></figure>`
      );
      continue;
    }

    const lines = trimmed.split('\n');

    // A table needs a header row and a delimiter row whose cell count matches it.
    // That pairing is what keeps prose containing stray pipes out of <table>.
    const isTable =
      lines.length >= 2 &&
      lines[0].trim().startsWith('|') &&
      TABLE_DELIMITER_ROW.test(lines[1].trim()) &&
      splitTableRow(lines[1]).length === splitTableRow(lines[0]).length;

    if (isTable) {
      const headers = splitTableRow(lines[0]);
      const head = headers
        .map(
          (cell) =>
            `<th class="px-4 py-3 text-left border-b border-gray-200 whitespace-nowrap">${processInline(
              cell
            )}</th>`
        )
        .join('');
      const body = lines
        .slice(2)
        .filter((l) => l.trim())
        .map((l) => {
          const cells = splitTableRow(l);
          // Pad short rows / drop extra cells so every row matches the header width.
          const tds = headers
            .map(
              (_, i) =>
                `<td class="px-4 py-3 text-gray-600 align-top">${processInline(cells[i] ?? '')}</td>`
            )
            .join('');
          return `<tr class="hover:bg-gray-50 transition-colors">${tds}</tr>`;
        })
        .join('');
      out.push(
        `<div class="overflow-x-auto my-8">` +
          `<table class="w-full text-sm border-collapse border border-gray-200 rounded-lg">` +
          `<thead class="bg-gray-50 text-gray-700 font-semibold">` +
          `<tr class="hover:bg-gray-50 transition-colors">${head}</tr></thead>` +
          `<tbody class="divide-y divide-gray-100">${body}</tbody>` +
          `</table></div>`
      );
      continue;
    }

    const isList =
      lines.length > 1 &&
      lines.every((l) => {
        const t = l.trim();
        return t === '' || t.startsWith('- ');
      }) &&
      lines.some((l) => l.trim().startsWith('- '));

    if (isList) {
      const items = lines
        .filter((l) => l.trim().startsWith('- '))
        .map((l) => `<li class="mb-2 pl-1">${processInline(l.replace(/^\s*-\s+/, '').trim())}</li>`);
      out.push(`<ul class="list-disc pl-6 mb-6 text-gray-700 space-y-1">${items.join('')}</ul>`);
      continue;
    }

    out.push(`<p class="mb-6 text-gray-700">${processInline(trimmed.replace(/\n/g, '<br/>'))}</p>`);
  }

  return out.join('');
}
