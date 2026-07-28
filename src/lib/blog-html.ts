/**
 * Lightweight blog body → HTML for `dangerouslySetInnerHTML`.
 * Supports: **bold**, [text](href), ## h2, ### h3, bullet lists (- item),
 * markdown tables (| a | b | with a `| --- | --- |` separator row), paragraphs.
 * Order: block structure first, then inline (bold → links) per block.
 */

function processInline(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
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

    // Markdown table: header row, separator row (| --- | --- |), body rows.
    // Detects a `|`-fenced first line, a `---`-only second line, and at least
    // one body row. Rich-results-friendly HTML output (real <thead>/<tbody>).
    const isTable =
      lines.length >= 3 &&
      lines[0].trim().startsWith('|') &&
      /^\s*\|(\s*:?-{3,}:?\s*\|)+\s*$/.test(lines[1] ?? '') &&
      lines.slice(2).every((l) => l.trim().startsWith('|'));

    if (isTable) {
      const splitRow = (row: string) =>
        row
          .trim()
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((cell) => cell.trim());
      const headers = splitRow(lines[0]);
      const bodyRows = lines.slice(2).map(splitRow);
      const thead = `<thead><tr>${headers
        .map(
          (h) =>
            `<th class="border-b-2 border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">${processInline(h)}</th>`,
        )
        .join('')}</tr></thead>`;
      const tbody = `<tbody>${bodyRows
        .map(
          (r) =>
            `<tr>${r
              .map(
                (c) =>
                  `<td class="border-b border-gray-200 px-4 py-2 align-top text-gray-700">${processInline(c)}</td>`,
              )
              .join('')}</tr>`,
        )
        .join('')}</tbody>`;
      out.push(
        `<div class="my-6 overflow-x-auto"><table class="w-full border-collapse text-sm">${thead}${tbody}</table></div>`,
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
