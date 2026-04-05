'use client';

import { useEffect } from 'react';

interface MermaidDiagramProps {
  diagram: string;
}

export default function MermaidDiagram({ diagram }: MermaidDiagramProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
    script.async = true;
    script.onload = () => {
      (window as any).mermaid?.contentLoaderMarked?.render?.();
      (window as any).mermaid?.initialize?.({ startOnLoad: true, theme: 'default' });
      (window as any).mermaid?.run?.();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 overflow-x-auto">
      <div className="mermaid">{diagram}</div>
    </div>
  );
}
