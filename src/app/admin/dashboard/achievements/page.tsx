'use client';

import { useState, useEffect, useRef } from 'react';
import { getAchievements, addAchievement, updateAchievement, deleteAchievement, type AchievementItem } from '@/lib/portfolio-service';
import { Plus, Trash2, Save, Loader2, ChevronDown, ChevronUp, Trophy, Upload, ImageIcon } from 'lucide-react';
import Image from 'next/image';

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm";

// ─── Image Uploader ──────────────────────────────────────────────────────────
function ImageUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please upload an image file.'); return; }
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'portfolio/achievements');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setError('Upload failed.');
    } catch {
      setError('Upload failed. Check your connection.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-3 sm:col-span-2">
      <label className="text-xs text-white/50 block">Achievement Image</label>

      {/* Preview */}
      {value && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 group">
          <Image src={value} alt="Preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button onClick={() => onChange('')} className="px-3 py-1.5 bg-red-500/80 hover:bg-red-500 text-white text-xs rounded-lg transition-colors">
              Remove Image
            </button>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="w-full border border-dashed border-white/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all"
      >
        {uploading ? (
          <><Loader2 className="w-5 h-5 text-violet-400 animate-spin" /><p className="text-white/40 text-xs">Uploading...</p></>
        ) : (
          <><div className="flex items-center gap-2 text-white/40"><Upload className="w-4 h-4" /><ImageIcon className="w-4 h-4" /></div>
          <p className="text-white/40 text-xs text-center">Drop image here or click to browse</p></>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </div>
      <input className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Or paste image URL" />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

// ─── Achievement Card ────────────────────────────────────────────────────────
function AchievementCard({ achievement, onSave, onDelete }: {
  achievement: AchievementItem; onSave: (a: AchievementItem) => Promise<void>; onDelete: (id: string) => Promise<void>;
}) {
  const [data, setData] = useState(achievement);
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const set = (key: keyof AchievementItem, val: string | number) => setData((p) => ({ ...p, [key]: val }));
  const handleSave = async () => { setSaving(true); await onSave(data); setSaving(false); };
  const handleDelete = async () => { setDeleting(true); await onDelete(achievement.id!); };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-all">
        <div className="flex items-center gap-3">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span className="text-white font-medium">{data.title || 'Unnamed Achievement'}</span>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/10 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="text-xs text-white/50 mb-1 block">Title</label>
              <input className={inputClass} value={data.title} onChange={(e) => set('title', e.target.value)} /></div>
            <div><label className="text-xs text-white/50 mb-1 block">Date / Year</label>
              <input className={inputClass} value={data.date} onChange={(e) => set('date', e.target.value)} /></div>
          </div>
          <ImageUploader value={data.image || ''} onChange={(url) => set('image', url)} />
          <div><label className="text-xs text-white/50 mb-1 block">Short Description</label>
            <textarea rows={2} className={inputClass} value={data.description} onChange={(e) => set('description', e.target.value)} /></div>
          <div><label className="text-xs text-white/50 mb-1 block">Full Details (Markdown supported)</label>
            <textarea rows={4} className={inputClass} value={data.details || ''} onChange={(e) => set('details', e.target.value)} /></div>
          <div><label className="text-xs text-white/50 mb-1 block">Order (0 is first)</label>
            <input type="number" className={inputClass} value={data.order} onChange={(e) => set('order', parseInt(e.target.value) || 0)} /></div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={handleDelete} disabled={deleting} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 text-sm transition-all disabled:opacity-50">
              {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />} Delete
            </button>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-500 transition-all disabled:opacity-50">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AchievementsAdmin() {
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Partial<AchievementItem>>({
    title: '', description: '', details: '', date: '', image: '', order: 0
  });

  const load = async () => { 
    try {
      const data = await getAchievements();
      setAchievements(data);
    } catch (err) {
      console.error("Failed to load achievements", err);
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!newAchievement.title) return;
    setAdding(true);
    try {
      await addAchievement({
        title: newAchievement.title || '',
        description: newAchievement.description || '',
        details: newAchievement.details || '',
        date: newAchievement.date || '',
        image: newAchievement.image || '',
        order: achievements.length
      });
      setNewAchievement({ title: '', description: '', details: '', date: '', image: '', order: 0 });
      setShowNew(false);
      await load();
    } catch (e: any) {
      console.error(e);
      alert("Failed to save: " + e.message);
    } finally {
      setAdding(false);
    }
  };

  const handleSave = async (item: AchievementItem) => { 
    try {
      await updateAchievement(item.id!, {
        title: item.title || '',
        description: item.description || '',
        details: item.details || '',
        date: item.date || '',
        image: item.image || '',
        order: item.order || 0
      }); 
      await load(); 
    } catch (e: any) {
      alert("Failed to update: " + e.message);
    }
  };

  const handleDelete = async (id: string) => { 
    try {
      await deleteAchievement(id); 
      await load(); 
    } catch (e: any) {
      alert("Failed to delete: " + e.message);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 text-violet-400 animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Achievements</h1>
          <p className="text-white/40 text-sm mt-1">{achievements.length} achievement(s) · Images auto-uploaded</p>
        </div>
        <button onClick={() => setShowNew(!showNew)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      {showNew && (
        <div className="bg-white/5 border border-dashed border-violet-500/40 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-medium">New Achievement</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="text-xs text-white/50 mb-1 block">Title *</label>
              <input className={inputClass} value={newAchievement.title} onChange={(e) => setNewAchievement((p) => ({ ...p, title: e.target.value }))} /></div>
            <div><label className="text-xs text-white/50 mb-1 block">Date / Year</label>
              <input className={inputClass} value={newAchievement.date} onChange={(e) => setNewAchievement((p) => ({ ...p, date: e.target.value }))} /></div>
          </div>
          <ImageUploader value={newAchievement.image || ''} onChange={(url) => setNewAchievement((p) => ({ ...p, image: url }))} />
          <div><label className="text-xs text-white/50 mb-1 block">Short Description</label>
            <textarea rows={2} className={inputClass} value={newAchievement.description} onChange={(e) => setNewAchievement((p) => ({ ...p, description: e.target.value }))} /></div>
          <div><label className="text-xs text-white/50 mb-1 block">Full Details (Markdown supported)</label>
            <textarea rows={4} className={inputClass} value={newAchievement.details || ''} onChange={(e) => setNewAchievement((p) => ({ ...p, details: e.target.value }))} /></div>
          <button onClick={handleAdd} disabled={adding} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50">
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Save Achievement
          </button>
        </div>
      )}

      <div className="space-y-3">
        {achievements.length === 0 && !showNew && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-white/40">
            <Trophy className="w-10 h-10 mx-auto mb-2 opacity-50 text-yellow-500" />
            <p>No achievements yet. Click &quot;Add Achievement&quot;.</p>
          </div>
        )}
        {achievements.map((p) => (
          <AchievementCard key={p.id} achievement={p} onSave={handleSave} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
