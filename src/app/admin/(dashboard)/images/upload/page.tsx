import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminUploadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-semibold text-accent">Upload</h2>
        <p className="mt-1 text-warm-700">JPG, PNG, or WebP up to 50 MB per file.</p>
      </div>
      <ImageUpload />
    </div>
  );
}
