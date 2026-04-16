'use client';

import { useEffect, useState } from 'react';
import { Briefcase, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminExperience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ company: '', role: '', startDate: '', endDate: '', location: '', description: [''], order: 1, visible: true });

  const loadItems = async () => {
    try {
      const data = await fetch('/api/experience?all=true').then((r) => r.json());
      setItems(data);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadItems(); }, []);

  const resetForm = () => {
    setForm({ company: '', role: '', startDate: '', endDate: '', location: '', description: [''], order: items.length + 1, visible: true });
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.company || !form.role) { toast.error('Company and role are required'); return; }
    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { ...form, _id: editing } : form;
      const res = await fetch('/api/experience', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      toast.success(editing ? 'Updated!' : 'Added!');
      resetForm();
      loadItems();
    } catch (err) { toast.error(err.message || 'Error saving'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return;
    try { await fetch(`/api/experience?id=${id}`, { method: 'DELETE' }); toast.success('Deleted'); loadItems(); }
    catch { toast.error('Error deleting'); }
  };

  const handleEdit = (item) => {
    setForm({ company: item.company, role: item.role, startDate: item.startDate, endDate: item.endDate, location: item.location || '', description: item.description || [''], order: item.order, visible: item.visible });
    setEditing(item._id);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Briefcase size={28} className="text-[var(--accent)]" />
        <h1 className="text-2xl font-bold">Manage Experience</h1>
      </div>

      <div className="card-base p-6 mb-8 max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Experience' : 'Add New Experience'}</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div><label className="admin-label">Company</label><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="admin-input" /></div>
          <div><label className="admin-label">Role</label><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="admin-input" /></div>
          <div><label className="admin-label">Start Date</label><input value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="admin-input" placeholder="Feb 2026" /></div>
          <div><label className="admin-label">End Date</label><input value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="admin-input" placeholder="Present" /></div>
          <div><label className="admin-label">Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="admin-input" /></div>
          <div><label className="admin-label">Order</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })} className="admin-input" /></div>
        </div>
        <div className="mb-4">
          <label className="admin-label">Description (one line per bullet point)</label>
          <textarea rows={4} value={form.description.join('\n')} onChange={(e) => setForm({ ...form, description: e.target.value.split('\n').filter(Boolean) })} className="admin-input resize-none" />
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} className="btn-primary gap-2"><Plus size={16} /> {editing ? 'Update' : 'Add'}</button>
          {editing && <button onClick={resetForm} className="btn-outline">Cancel</button>}
        </div>
      </div>

      <div className="grid gap-3 max-w-3xl">
        {items.map((item) => (
          <div key={item._id} className="card-base p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{item.role}</h3>
                <p className="text-sm text-[var(--foreground-secondary)]">{item.company} • {item.startDate} - {item.endDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-[var(--background)]"><Pencil size={16} className="text-[var(--accent)]" /></button>
                <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-500/10"><Trash2 size={16} className="text-red-500" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
