import ImageList from '@/components/admin/ImageList';

export default function AdminImagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-semibold text-accent">Image library</h2>
        <p className="mt-1 text-warm-700">Paginated listing from Supabase Storage (tour, guide, credential buckets).</p>
      </div>
      <ImageList />
    </div>
  );
}
