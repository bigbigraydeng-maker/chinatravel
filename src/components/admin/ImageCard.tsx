'use client';

type Props = {
  src: string;
  alt: string;
  title?: string;
};

export default function ImageCard({ src, alt, title }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-warm-200 bg-warm-50 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element -- admin preview; external Supabase URLs */}
      <img src={src} alt={alt} className="h-40 w-full object-cover" title={title} />
    </div>
  );
}
