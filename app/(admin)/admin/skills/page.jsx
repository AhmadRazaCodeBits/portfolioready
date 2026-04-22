'use client';

import { useEffect, useState } from 'react';
import { Code, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', iconUrl: '', order: 1, visible: true });

  const loadSkills = async () => {
    try {
      const data = await fetch('/api/skills?all=true').then((r) => r.json());
      setSkills(data);
    } catch { toast.error('Failed to load skills'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadSkills(); }, []);

  const resetForm = () => {
    setForm({ name: '', iconUrl: '', order: skills.length + 1, visible: true });
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.name) { toast.error('Name is required'); return; }

    try {
      if (editing) {
        await fetch('/api/skills', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, _id: editing }),
        });
        toast.success('Skill updated!');
        revalidatePublicSite();
      } else {
        await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        toast.success('Skill added!');
        revalidatePublicSite();
      }
      resetForm();
      loadSkills();
    } catch { toast.error('Error saving skill'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
      toast.success('Skill deleted');
      revalidatePublicSite();
      loadSkills();
    } catch { toast.error('Error deleting'); }
  };

  const handleEdit = (skill) => {
    setForm({ name: skill.name, iconUrl: skill.iconUrl, order: skill.order, visible: skill.visible });
    setEditing(skill._id);
  };

  const toggleVisibility = async (skill) => {
    try {
      await fetch('/api/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: skill._id, visible: !skill.visible }),
      });
      loadSkills();
    } catch { toast.error('Error updating'); }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Code size={28} className="text-[var(--accent)]" />
        <h1 className="text-2xl font-bold">Manage Skills</h1>
      </div>

      {/* Add/Edit Form */}
      <div className="card-base p-6 mb-8 max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Skill' : 'Add New Skill'}</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="admin-label">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="admin-input" placeholder="React.js" />
          </div>
          <div>
            <label className="admin-label">Icon URL</label>
            <input value={form.iconUrl} onChange={(e) => setForm({ ...form, iconUrl: e.target.value })} className="admin-input" placeholder="/icons/icon-react.svg" />
          </div>
          <div>
            <label className="admin-label">Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })} className="admin-input" />
          </div>
          <div className="flex items-end gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} className="w-4 h-4" />
              <span className="text-sm">Visible</span>
            </label>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} className="btn-primary gap-2"><Plus size={16} /> {editing ? 'Update' : 'Add'} Skill</button>
          {editing && <button onClick={resetForm} className="btn-outline">Cancel</button>}
        </div>
      </div>

      {/* Skills List */}
      <div className="grid gap-3 max-w-2xl">
        {skills.map((skill) => (
          <div key={skill._id} className="card-base p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {skill.iconUrl && <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8 object-contain" />}
              <div>
                <span className="font-medium text-[var(--foreground)]">{skill.name}</span>
                <span className="text-xs text-[var(--muted)] ml-2">Order: {skill.order}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleVisibility(skill)} className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors" title={skill.visible ? 'Hide' : 'Show'}>
                {skill.visible ? <Eye size={16} className="text-emerald-500" /> : <EyeOff size={16} className="text-[var(--muted)]" />}
              </button>
              <button onClick={() => handleEdit(skill)} className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors">
                <Pencil size={16} className="text-[var(--accent)]" />
              </button>
              <button onClick={() => handleDelete(skill._id)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
