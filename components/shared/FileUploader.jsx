'use client';

import { useState } from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FileUploader({ value, onChange, accept = '*' }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      
      onChange(data.imageUrl); // still returns imageUrl but it's a file path
      toast.success('File uploaded successfully');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-4 flex items-center justify-between group">
          <div className="flex items-center gap-3 overflow-hidden">
            <FileIcon className="text-[var(--accent)] shrink-0" size={24} />
            <span className="truncate text-sm text-[var(--foreground)]">{value.split('/').pop()}</span>
          </div>
          <button
            onClick={() => onChange('')}
            className="p-2 text-[var(--muted)] hover:text-red-500 transition-colors shrink-0"
            title="Remove file"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--card-border)] rounded-lg cursor-pointer bg-[var(--background)] hover:bg-[var(--card)] transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mb-2" />
            ) : (
              <UploadCloud className="w-10 h-10 text-[var(--muted)] mb-3" />
            )}
            <p className="mb-2 text-sm text-[var(--foreground-secondary)]">
              <span className="font-semibold text-[var(--accent)]">Click to upload</span> a file
            </p>
          </div>
          <input type="file" className="hidden" accept={accept} onChange={handleUpload} disabled={uploading} />
        </label>
      )}
    </div>
  );
}
