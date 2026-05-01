'use client';

import { useState, useEffect } from 'react';
import { getDrives, addDrive, updateDrive, deleteDrive, type DriveItem } from '@/lib/portfolio-service';
import { Plus, Trash2, Save, Loader2, Rocket } from 'lucide-react';

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm";

export default function DrivesAdmin() {
  const [items, setItems] = useState<DriveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [newText, setNewText] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    getDrives().then((d) => { setItems(d); setLoading(false); });
  }, []);

  const handleUpdate = async (item: DriveItem) => {
    if (!item.id) return;
    setSavingId(item.id);
    try {
      await updateDrive(item.id, { text: item.text || '' });
    } catch (e: any) {
      console.error(e);
      alert("Failed to update: " + e.message);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDrive(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e: any) {
      console.error(e);
      alert("Failed to delete: " + e.message);
    }
  };

  const handleAdd = async () => {
    if (!newText.trim()) return;
    setAdding(true);
    try {
      await addDrive({ text: newText.trim(), order: items.length });
      const updated = await getDrives();
      setItems(updated);
      setNewText('');
    } catch (e: any) {
      console.error(e);
      alert("Failed to add: " + e.message);
    } finally {
      setAdding(false);
    }
  };

  const setText = (id: string, val: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, text: val } : i)));

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 text-violet-400 animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">What Drives Me</h1>
        <p className="text-white/40 text-sm mt-1">Edit the bullet points in your motivation section</p>
      </div>

      <div className="space-y-3">
        {items.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-white/40">
            <Rocket className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>No drives yet. Add one below.</p>
          </div>
        )}
        {items.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <input className={`${inputClass} flex-1`} value={item.text}
              onChange={(e) => setText(item.id!, e.target.value)} />
            <button onClick={() => handleDelete(item.id!)}
              className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => handleUpdate(item)} disabled={savingId === item.id}
              className="p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-500 transition-all flex-shrink-0 disabled:opacity-50">
              {savingId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>

      {/* Add New */}
      <div className="bg-white/5 border border-dashed border-white/20 rounded-2xl p-5 space-y-3">
        <h2 className="text-white font-medium text-sm">Add New Drive</h2>
        <input className={inputClass} placeholder="e.g. Constantly learning and evolving with modern tech"
          value={newText} onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()} />
        <button onClick={handleAdd} disabled={adding}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50">
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add Drive
        </button>
      </div>
    </div>
  );
}
