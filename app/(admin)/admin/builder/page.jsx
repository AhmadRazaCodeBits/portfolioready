'use client';

import { useEffect, useState } from 'react';
import { LayoutDashboard, Plus, Pencil, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';
import ImageUploader from '@/components/shared/ImageUploader';

export default function AdminBuilder() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState(null);
  
  const defaultBlock = { blockType: 'TEXT', content: '' };
  
  const [form, setForm] = useState({ 
    title: '', 
    order: 1, 
    visible: true, 
    blocks: [{ ...defaultBlock }]
  });

  const loadSections = async () => {
    try {
      const data = await fetch('/api/dynamic-sections').then(res => res.json());
      if (Array.isArray(data)) setSections(data);
    } catch { 
      toast.error('Failed to load sections'); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { loadSections(); }, []);

  const resetForm = () => {
    setForm({ title: '', order: sections.length + 1, visible: true, blocks: [{ ...defaultBlock }] });
    setEditingRow(null);
  };

  const handleSave = async () => {
    if (!form.title) return toast.error('Title is required');
    
    try {
      const method = editingRow ? 'PUT' : 'POST';
      const body = editingRow ? { ...form, _id: editingRow } : form;
      
      const res = await fetch('/api/dynamic-sections', { 
        method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      
      toast.success(editingRow ? 'Section updated' : 'Section created');
      revalidatePublicSite();
      resetForm();
      loadSections();
    } catch (err) { 
      toast.error(err.message || 'Error saving section'); 
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this section?')) return;
    try { 
      await fetch(`/api/dynamic-sections?id=${id}`, { method: 'DELETE' }); 
      toast.success('Deleted'); 
      revalidatePublicSite();
      loadSections(); 
    } catch { 
      toast.error('Error deleting section'); 
    }
  };

  const handleAddBlock = () => {
    setForm(prev => ({ ...prev, blocks: [...prev.blocks, { ...defaultBlock }] }));
  };

  const handleBlockChange = (index, field, value) => {
    setForm(prev => {
      const newBlocks = [...prev.blocks];
      newBlocks[index] = { ...newBlocks[index], [field]: value };
      
      // Reset content if type changes
      if (field === 'blockType') {
        if (value === 'TEXT') newBlocks[index].content = '';
        if (value === 'IMAGE') newBlocks[index].content = '';
        if (value === 'SOCIAL_LINKS') newBlocks[index].content = [{ platform: '', url: '' }];
      }
      
      return { ...prev, blocks: newBlocks };
    });
  };

  const removeBlock = (index) => {
    setForm(prev => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== index)
    }));
  };

  // Render specific content editor based on block type
  const renderBlockEditor = (block, idx) => {
    if (block.blockType === 'TEXT') {
      return (
        <textarea 
          className="admin-input mt-2" 
          rows={3} 
          placeholder="Enter text/HTML content"
          value={block.content || ''}
          onChange={(e) => handleBlockChange(idx, 'content', e.target.value)}
        />
      );
    }
    if (block.blockType === 'IMAGE') {
      return (
        <div className="mt-2 text-left">
          <ImageUploader 
            value={block.content || ''} 
            onChange={(url) => handleBlockChange(idx, 'content', url)} 
          />
        </div>
      );
    }
    if (block.blockType === 'SOCIAL_LINKS') {
      const links = Array.isArray(block.content) ? block.content : [];
      return (
        <div className="mt-2 space-y-2 text-left">
          {links.map((link, lIdx) => (
             <div key={lIdx} className="flex gap-2">
               <input className="admin-input" placeholder="Platform (e.g. GitHub)" value={link.platform} onChange={e => {
                 const newLinks = [...links]; newLinks[lIdx].platform = e.target.value; handleBlockChange(idx, 'content', newLinks);
               }} />
               <input className="admin-input" placeholder="URL" value={link.url} onChange={e => {
                 const newLinks = [...links]; newLinks[lIdx].url = e.target.value; handleBlockChange(idx, 'content', newLinks);
               }} />
               <button onClick={() => {
                 const newLinks = [...links]; newLinks.splice(lIdx, 1); handleBlockChange(idx, 'content', newLinks);
               }} className="btn-outline px-3 border-red-500 text-red-500 hover:bg-red-500 hover:text-white">x</button>
             </div>
          ))}
          <button onClick={() => {
            const newLinks = [...links, { platform: '', url: '' }];
            handleBlockChange(idx, 'content', newLinks);
          }} className="text-sm font-semibold text-[var(--accent)] hover:underline">+ Add Link</button>
        </div>
      );
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard size={28} className="text-[var(--accent)]" />
        <h1 className="text-2xl font-bold">Dynamic CMS Builder</h1>
      </div>

      <div className="card-base p-6 mb-8 max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">{editingRow ? 'Edit Section' : 'Create New Section'}</h2>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div><label className="admin-label">Section Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="admin-input" placeholder="E.g. My Certifications" /></div>
          <div><label className="admin-label">Order</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value)||1 })} className="admin-input" /></div>
        </div>

        <div className="mb-4">
          <label className="admin-label mb-2 flex items-center justify-between">
            <span>Blocks</span>
            <button onClick={handleAddBlock} className="text-[var(--accent)] hover:underline text-sm font-semibold flex items-center gap-1"><Plus size={14} /> Add Block</button>
          </label>
          
          <div className="space-y-4">
            {form.blocks.map((block, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[var(--background)] border border-[var(--card-border)] relative group">
                <button onClick={() => removeBlock(idx)} className="absolute top-2 right-2 text-[var(--muted)] hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                <div className="mb-2">
                   <select className="admin-input max-w-[200px]" value={block.blockType} onChange={(e) => handleBlockChange(idx, 'blockType', e.target.value)}>
                      <option value="TEXT">Text/HTML</option>
                      <option value="IMAGE">Image Component</option>
                      <option value="SOCIAL_LINKS">Social Links</option>
                   </select>
                </div>
                {renderBlockEditor(block, idx)}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={handleSave} className="btn-primary gap-2"><Save size={16} /> {editingRow ? 'Save Changes' : 'Create Section'}</button>
          {editingRow && <button onClick={resetForm} className="btn-outline">Cancel</button>}
        </div>
      </div>

      <div className="grid gap-3 max-w-4xl">
        {sections.map((section) => (
          <div key={section._id} className="card-base p-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <p className="text-sm text-[var(--muted)]">{section.blocks.length} block(s)</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={async () => {
                  try {
                    await fetch('/api/dynamic-sections', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ _id: section._id, visible: !section.visible }) });
                    loadSections(); 
                  } catch {}
                }} 
                className="p-2 rounded-lg hover:bg-[var(--background)]"
              >
                {section.visible ? <Eye size={16} className="text-emerald-500" /> : <EyeOff size={16} className="text-[var(--muted)]" />}
              </button>
              <button onClick={() => { setEditingRow(section._id); setForm(section); }} className="p-2 rounded-lg hover:bg-[var(--background)]"><Pencil size={16} className="text-[var(--accent)]" /></button>
              <button onClick={() => handleDelete(section._id)} className="p-2 rounded-lg hover:bg-red-500/10"><Trash2 size={16} className="text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
