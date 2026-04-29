import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      components={{
        // H1 in content is the article title — already rendered by the page header, so suppress it here.
        h1: () => null,
        h2: ({ children }) => (
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4 border-b border-gray-100 pb-3">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-3">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="font-serif text-lg font-semibold text-gray-800 mt-6 mb-2">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="text-gray-700 text-lg leading-relaxed mb-5">
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
          <li className="text-gray-700 text-base leading-relaxed">
            {children}
          </li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-700">
            {children}
          </em>
        ),
        // Editorial callout box — used for "Practical rule:" highlights
        blockquote: ({ children }) => (
          <blockquote className="my-8 bg-warm-50 rounded-xl px-6 py-5 border-l-4 border-primary not-italic relative overflow-hidden">
            {/* decorative quote mark */}
            <svg
              className="absolute top-3 right-4 text-primary/10 w-10 h-10 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <div className="text-gray-700 text-base leading-relaxed font-medium pr-10">
              {children}
            </div>
          </blockquote>
        ),
        // Decorative section break
        hr: () => (
          <div className="my-12 flex items-center gap-5" aria-hidden>
            <div className="flex-1 h-px bg-gray-200" />
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
            </div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        ),
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
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50 text-gray-700 font-semibold">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-gray-100">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-gray-50 transition-colors">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left border-b border-gray-200 whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-gray-600 align-top">
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
                <figcaption className="text-center text-sm text-gray-400 mt-3 italic leading-snug">
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
