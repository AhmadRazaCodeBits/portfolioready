'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', company: '', text: '', order: 1, visible: true });

  const loadItems = async () => {
    try {
      const data = await fetch('/api/testimonials?all=true').then((r) => r.json());
      setItems(data);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadItems(); }, []);

  const resetForm = () => {
    setForm({ name: '', role: '', company: '', text: '', order: items.length + 1, visible: true });
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.name || !form.text) { toast.error('Name and text are required'); return; }
    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { ...form, _id: editing } : form;
      const res = await fetch('/api/testimonials', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
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
    if (!confirm('Delete this testimonial?')) return;
    try { await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' }); toast.success('Deleted'); revalidatePublicSite(); loadItems(); }
    catch { toast.error('Error deleting'); }
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, role: item.role || '', company: item.company || '', text: item.text, order: item.order, visible: item.visible });
    setEditing(item._id);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare size={28} className="text-[var(--accent)]" />
        <h1 className="text-2xl font-bold">Manage Testimonials</h1>
      </div>

      <div className="card-base p-6 mb-8 max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div><label className="admin-label">Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="admin-input" /></div>
          <div><label className="admin-label">Role</label><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="admin-input" /></div>
          <div><label className="admin-label">Company</label><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="admin-input" /></div>
        </div>
        <div className="mb-4">
          <label className="admin-label">Testimonial Text</label>
          <textarea rows={3} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className="admin-input resize-none" />
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} className="btn-primary gap-2"><Plus size={16} /> {editing ? 'Update' : 'Add'}</button>
          {editing && <button onClick={resetForm} className="btn-outline">Cancel</button>}
        </div>
      </div>

      <div className="grid gap-3 max-w-3xl">
        {items.map((item) => (
          <div key={item._id} className="card-base p-5 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-xs text-[var(--foreground-secondary)]">{item.role}{item.company && ` at ${item.company}`}</p>
              <p className="text-sm text-[var(--foreground-secondary)] mt-2 line-clamp-2">&ldquo;{item.text}&rdquo;</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-[var(--background)]"><Pencil size={16} className="text-[var(--accent)]" /></button>
              <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-500/10"><Trash2 size={16} className="text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
