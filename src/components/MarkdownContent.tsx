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
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4 border-b border-gray-100 pb-2">
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
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-5 italic text-gray-600 my-6 bg-warm-50 py-3 rounded-r-lg">
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr className="my-8 border-gray-200" />
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
        // Suppress placeholder images — only render real HTTP/HTTPS image URLs
        img: ({ src, alt }) => {
          if (!src || src.startsWith('placeholder') || !src.startsWith('http')) return null;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt ?? ''}
              className="w-full rounded-lg my-6 object-cover"
              loading="lazy"
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
