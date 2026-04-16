'use client';

import { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      onChange(data.imageUrl);
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-[var(--card-border)] bg-[var(--background)] group">
          <img src={value} alt="Uploaded preview" className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => onChange('')}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="Remove image"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[var(--card-border)] rounded-lg cursor-pointer bg-[var(--background)] hover:bg-[var(--card)] transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mb-2" />
            ) : (
              <UploadCloud className="w-10 h-10 text-[var(--muted)] mb-3" />
            )}
            <p className="mb-2 text-sm text-[var(--foreground-secondary)]">
              <span className="font-semibold text-[var(--accent)]">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-[var(--muted)]">PNG, JPG or WEBP</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </label>
      )}
    </div>
  );
}
