'use client';

import { useState, useEffect } from 'react';
import { getEducation, addEducation, updateEducation, deleteEducation, type EducationItem } from '@/lib/portfolio-service';
import { Plus, Trash2, Save, Loader2, GraduationCap } from 'lucide-react';

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm";

export default function EducationAdmin() {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ degree: '', institution: '' });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    getEducation().then((d) => { setItems(d); setLoading(false); });
  }, []);

  const handleUpdate = async (item: EducationItem) => {
    if (!item.id) return;
    setSavingId(item.id);
    try {
      await updateEducation(item.id, { 
        degree: item.degree || '', 
        institution: item.institution || '' 
      });
    } catch (e: any) {
      console.error(e);
      alert("Failed to update: " + e.message);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEducation(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e: any) {
      console.error(e);
      alert("Failed to delete: " + e.message);
    }
  };

  const handleAdd = async () => {
    if (!newItem.degree || !newItem.institution) return;
    setAdding(true);
    try {
      await addEducation({ 
        degree: newItem.degree || '', 
        institution: newItem.institution || '', 
        order: items.length 
      });
      const updated = await getEducation();
      setItems(updated);
      setNewItem({ degree: '', institution: '' });
    } catch (e: any) {
      console.error(e);
      alert("Failed to add: " + e.message);
    } finally {
      setAdding(false);
    }
  };

  const setField = (id: string, key: keyof EducationItem, val: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [key]: val } : i)));

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 text-violet-400 animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Education</h1>
        <p className="text-white/40 text-sm mt-1">Manage your education history</p>
      </div>

      {/* Existing Items */}
      <div className="space-y-4">
        {items.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-white/40">
            <GraduationCap className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>No education entries yet. Add one below.</p>
          </div>
        )}
        {items.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
            <input className={inputClass} placeholder="Degree / Course" value={item.degree}
              onChange={(e) => setField(item.id!, 'degree', e.target.value)} />
            <input className={inputClass} placeholder="Institution & Year" value={item.institution}
              onChange={(e) => setField(item.id!, 'institution', e.target.value)} />
            <div className="flex justify-end gap-2">
              <button onClick={() => handleDelete(item.id!)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 text-xs transition-all">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
              <button onClick={() => handleUpdate(item)} disabled={savingId === item.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs hover:bg-violet-500 transition-all disabled:opacity-50">
                {savingId === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                Save
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New */}
      <div className="bg-white/5 border border-dashed border-white/20 rounded-2xl p-5 space-y-3">
        <h2 className="text-white font-medium text-sm">Add New Entry</h2>
        <input className={inputClass} placeholder="Degree / Course" value={newItem.degree}
          onChange={(e) => setNewItem((p) => ({ ...p, degree: e.target.value }))} />
        <input className={inputClass} placeholder="Institution & Year" value={newItem.institution}
          onChange={(e) => setNewItem((p) => ({ ...p, institution: e.target.value }))} />
        <button onClick={handleAdd} disabled={adding}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50">
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add Education
        </button>
      </div>
    </div>
  );
}
