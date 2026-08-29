import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
  content: string;
}

/**
 * Renders markdown content with explicit Tailwind typography styles.
 * The @tailwindcss/typography plugin is not required.
 * H1 headings in content are suppressed — page layouts must provide their own H1 header.
 */
export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // H1 in content is the article title — already rendered by the page header, so suppress it here.
        h1: () => null,
        h2: ({ children }) => (
          <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-[-0.01em] text-accent mt-12 mb-4 border-b border-border pb-3">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-serif text-xl md:text-2xl font-medium tracking-[-0.01em] text-accent mt-8 mb-3">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="font-serif text-lg font-medium text-accent mt-6 mb-2">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="text-muted-foreground text-lg leading-relaxed mb-5">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-5 space-y-2">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-5 space-y-2">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-muted-foreground text-base leading-relaxed">
            {children}
          </li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-muted-foreground">
            {children}
          </em>
        ),
        // Editorial callout box — used for "Practical rule:" highlights.
        // Dropped the decorative quote-mark SVG: Ceepii's callouts are a rule
        // and a tint, and the glyph was competing with the copy it framed.
        blockquote: ({ children }) => (
          <blockquote className="my-8 bg-warm-50 rounded-2xl px-6 py-5 border-l-4 border-primary not-italic">
            <div className="text-muted-foreground text-base leading-relaxed font-medium">
              {children}
            </div>
          </blockquote>
        ),
        // Section break. Was a rule-dots-rule flourish; Ceepii uses a plain
        // hairline and lets the spacing do the separating.
        hr: () => <hr className="my-12 border-t border-border" aria-hidden />,
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-primary underline hover:no-underline"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        // Comparison tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm border-collapse border border-border rounded-2xl">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-subtle text-foreground font-semibold">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-border">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="transition-colors hover:bg-wash">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left border-b border-border whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-muted-foreground align-top">
            {children}
          </td>
        ),
        // Images: allow http(s) URLs and local /images/... paths; suppress placeholders
        img: ({ src, alt }) => {
          if (!src || src.startsWith('placeholder')) return null;
          if (!src.startsWith('http') && !src.startsWith('/')) return null;
          return (
            <figure className="my-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt ?? ''}
                className="w-full rounded-2xl object-cover shadow-sm max-h-[480px]"
                loading="lazy"
              />
              {alt && (
                <figcaption className="text-center text-sm text-muted-foreground mt-3 italic leading-snug">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
