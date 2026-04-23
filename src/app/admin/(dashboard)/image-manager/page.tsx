import ImageManager from '@/components/admin/ImageManager';

export default function ImageManagerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-semibold text-accent">图片管家</h2>
        <p className="mt-1 text-warm-700">
          Upload, browse, copy URLs, rename and delete images across all Supabase Storage buckets.
        </p>
      </div>
      <ImageManager />
    </div>
  );
}
