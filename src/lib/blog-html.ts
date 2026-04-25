/**
 * Lightweight blog body → HTML for `dangerouslySetInnerHTML`.
 * Supports: **bold**, [text](href), ## h2, ### h3, bullet lists (- item), paragraphs.
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
