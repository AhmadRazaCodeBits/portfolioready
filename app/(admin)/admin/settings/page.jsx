'use client';

import { useState } from 'react';
import { Settings, RefreshCw, Database } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';

export default function AdminSettings() {
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    if (!confirm('This will reset ALL data to defaults from your resume. Continue?')) return;
    setSeeding(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      if (res.ok) {
        toast.success('Database reset to default data!');
        revalidatePublicSite();
      } else {
        toast.error('Failed to seed database');
      }
    } catch {
      toast.error('Error seeding database');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Settings size={28} className="text-[var(--accent)]" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <div className="card-base p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Database size={20} /> Database Management
          </h2>
          <p className="text-sm text-[var(--foreground-secondary)] mb-4">
            Reset the database to default values from your resume. This will overwrite all current data.
          </p>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw size={16} className={seeding ? 'animate-spin' : ''} />
            {seeding ? 'Resetting...' : 'Reset to Default Data'}
          </button>
        </div>

        <div className="card-base p-6">
          <h2 className="text-lg font-semibold mb-2">Environment Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-[var(--card-border)]">
              <span className="text-[var(--foreground-secondary)]">Storage</span>
              <span className="font-medium">MongoDB Atlas</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[var(--card-border)]">
              <span className="text-[var(--foreground-secondary)]">Framework</span>
              <span className="font-medium">Next.js 15</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[var(--foreground-secondary)]">Auth</span>
              <span className="font-medium">NextAuth (Credentials)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
