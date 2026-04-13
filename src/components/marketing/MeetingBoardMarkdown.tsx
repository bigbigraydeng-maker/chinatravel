'use client';

import ReactMarkdown from 'react-markdown';

type Props = {
  markdown: string;
  emptyHint?: string;
  className?: string;
};

export function MeetingBoardMarkdown({ markdown, emptyHint, className }: Props) {
  const trimmed = markdown.trim();
  if (!trimmed) {
    return (
      <p className="text-sm italic text-gray-500" role="status">
        {emptyHint ?? '暂无内容。'}
      </p>
    );
  }
  return (
    <div
      className={
        className ??
        'prose prose-sm max-w-none text-gray-800 prose-headings:font-serif prose-headings:text-accent prose-a:text-primary'
      }
    >
      <ReactMarkdown>{trimmed}</ReactMarkdown>
    </div>
  );
}
