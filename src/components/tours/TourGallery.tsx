import Lightbox from '@/components/ui/Lightbox';

interface TourGalleryProps {
  images: string[];
  tourName: string;
}

export default function TourGallery({ images, tourName }: TourGalleryProps) {
  if (!images || images.length === 0) return null;

  const photos = images.map((src, i) => ({
    src,
    alt: `${tourName} — photo ${i + 1}`,
  }));

  return (
    <section className="mb-12" aria-label={`${tourName} photo gallery`}>
      <h2 className="text-2xl font-serif font-bold text-accent mb-6 pb-3 border-b border-warm-100">
        Photo Gallery
      </h2>
      <Lightbox images={photos} columns={3} />
    </section>
  );
}
