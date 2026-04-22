'use client';

import { useEffect, useState } from 'react';
import { User, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';
import FileUploader from '@/components/shared/FileUploader';

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => { setProfile(data); setLoading(false); })
      .catch(() => { toast.error('Failed to load profile'); setLoading(false); });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        toast.success('Profile updated!');
        revalidatePublicSite();
      } else {
        toast.error('Failed to update profile');
      }
    } catch { toast.error('Error saving profile'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>;
  if (!profile) return <div className="text-center py-20 text-[var(--foreground-secondary)]">No profile data</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <User size={28} className="text-[var(--accent)]" />
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary gap-2">
          <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid gap-6 max-w-3xl">
        <div className="card-base p-6 space-y-5">
          <h2 className="text-lg font-semibold border-b border-[var(--card-border)] pb-3">Basic Info</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Name</label>
              <input value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Title</label>
              <input value={profile.title || ''} onChange={(e) => setProfile({ ...profile, title: e.target.value })} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Email</label>
              <input value={profile.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Phone</label>
              <input value={profile.phone || ''} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="admin-input" />
            </div>
            <div className="sm:col-span-2">
              <label className="admin-label">Location</label>
              <input value={profile.location || ''} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="admin-input" />
            </div>
          </div>

          <div>
            <label className="admin-label">Bio (Hero Section)</label>
            <textarea rows={3} value={profile.bio || ''} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="admin-input resize-none" />
          </div>

          <div>
            <label className="admin-label">About Text (long form)</label>
            <textarea rows={6} value={profile.aboutText || ''} onChange={(e) => setProfile({ ...profile, aboutText: e.target.value })} className="admin-input resize-none" />
          </div>

          <div>
            <label className="admin-label">About Bullets (one per line)</label>
            <textarea
              rows={4}
              value={(profile.aboutBullets || []).join('\n')}
              onChange={(e) => setProfile({ ...profile, aboutBullets: e.target.value.split('\n').filter(Boolean) })}
              className="admin-input resize-none"
              placeholder="BS in Computer Science&#10;Full time developer&#10;..."
            />
          </div>

          <div>
            <label className="admin-label">Resume (PDF)</label>
            <FileUploader 
              accept=".pdf" 
              value={profile.resumeUrl || ''} 
              onChange={(url) => setProfile({ ...profile, resumeUrl: url })} 
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="availableForWork"
              checked={profile.availableForWork || false}
              onChange={(e) => setProfile({ ...profile, availableForWork: e.target.checked })}
              className="w-4 h-4 rounded border-[var(--card-border)]"
            />
            <label htmlFor="availableForWork" className="text-sm text-[var(--foreground)]">Available for work</label>
          </div>
        </div>

        <div className="card-base p-6 space-y-5">
          <h2 className="text-lg font-semibold border-b border-[var(--card-border)] pb-3">SEO</h2>
          <div>
            <label className="admin-label">SEO Title</label>
            <input value={profile.seoTitle || ''} onChange={(e) => setProfile({ ...profile, seoTitle: e.target.value })} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">SEO Description</label>
            <textarea rows={2} value={profile.seoDescription || ''} onChange={(e) => setProfile({ ...profile, seoDescription: e.target.value })} className="admin-input resize-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
