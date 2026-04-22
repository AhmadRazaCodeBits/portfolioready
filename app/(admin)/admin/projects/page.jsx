'use client';

import { useEffect, useState } from 'react';
import { FolderKanban, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';
import ImageUploader from '@/components/shared/ImageUploader';

export default function AdminProjects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', techStack: [], imageUrl: '', githubUrl: '', liveUrl: '', order: 1, visible: true });

  const loadItems = async () => {
    try {
      const data = await fetch('/api/projects?all=true').then((r) => r.json());
      setItems(data);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadItems(); }, []);

  const resetForm = () => {
    setForm({ title: '', description: '', techStack: [], imageUrl: '', githubUrl: '', liveUrl: '', order: items.length + 1, visible: true });
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.title || !form.description) { toast.error('Title and description required'); return; }
    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { ...form, _id: editing } : form;
      const res = await fetch('/api/projects', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      toast.success(editing ? 'Updated!' : 'Added!');
      revalidatePublicSite();
      resetForm();
      loadItems();
    } catch (err) { toast.error(err.message || 'Error saving'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try { await fetch(`/api/projects?id=${id}`, { method: 'DELETE' }); toast.success('Deleted'); revalidatePublicSite(); loadItems(); }
    catch { toast.error('Error deleting'); }
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, description: item.description, techStack: item.techStack || [], imageUrl: item.imageUrl || '', githubUrl: item.githubUrl || '', liveUrl: item.liveUrl || '', order: item.order, visible: item.visible });
    setEditing(item._id);
  };

  const toggleVisibility = async (item) => {
    try {
      await fetch('/api/projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ _id: item._id, visible: !item.visible }) });
      loadItems();
    } catch { toast.error('Error'); }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <FolderKanban size={28} className="text-[var(--accent)]" />
        <h1 className="text-2xl font-bold">Manage Projects</h1>
      </div>

      <div className="card-base p-6 mb-8 max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Project' : 'Add New Project'}</h2>
        <div className="grid gap-4 mb-4">
          <div><label className="admin-label">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="admin-input" /></div>
          <div><label className="admin-label">Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="admin-input resize-none" /></div>
          <div><label className="admin-label">Tech Stack (comma-separated)</label><input value={form.techStack.join(', ')} onChange={(e) => setForm({ ...form, techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} className="admin-input" placeholder="React.js, Node.js, MongoDB" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="admin-label">Image Upload</label><ImageUploader value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} /></div>
            <div><label className="admin-label">GitHub URL</label><input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} className="admin-input" /></div>
            <div><label className="admin-label">Live URL</label><input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className="admin-input" /></div>
            <div><label className="admin-label">Order</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })} className="admin-input" /></div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} className="btn-primary gap-2"><Plus size={16} /> {editing ? 'Update' : 'Add'}</button>
          {editing && <button onClick={resetForm} className="btn-outline">Cancel</button>}
        </div>
      </div>

      <div className="grid gap-3 max-w-3xl">
        {items.map((item) => (
          <div key={item._id} className="card-base p-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.techStack?.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-[var(--foreground-secondary)]">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleVisibility(item)} className="p-2 rounded-lg hover:bg-[var(--background)]">
                {item.visible ? <Eye size={16} className="text-emerald-500" /> : <EyeOff size={16} className="text-[var(--muted)]" />}
              </button>
              <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-[var(--background)]"><Pencil size={16} className="text-[var(--accent)]" /></button>
              <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-500/10"><Trash2 size={16} className="text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
