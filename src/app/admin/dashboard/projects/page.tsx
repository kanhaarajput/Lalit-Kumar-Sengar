'use client';

import { useState, useEffect, useRef } from 'react';
import { getProjects, addProject, updateProject, deleteProject, type ProjectItem } from '@/lib/portfolio-service';
import { Plus, Trash2, Save, Loader2, FolderOpen, ChevronDown, ChevronUp, X, Upload, ImageIcon } from 'lucide-react';
import Image from 'next/image';

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm";

const emptyProject: Omit<ProjectItem, 'id'> = {
  name: '', description: '', tech: [], link: '', liveLink: '', image: '', details: '', order: 0
};

// ─── Cloudinary Image Uploader ────────────────────────────────────────────────
function ImageUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setError('Upload failed. Try again.');
    } catch {
      setError('Upload failed. Check connection.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs text-white/50 block">Project Image</label>

      {/* Preview */}
      {value && (
        <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 group">
          <Image src={value} alt="Project preview" fill className="object-cover" />
          <button onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <X className="w-3 h-3" />
          </button>
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-green-500/80 text-white text-xs">
            ✓ Uploaded to Cloudinary
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
          <><Loader2 className="w-5 h-5 text-violet-400 animate-spin" /><p className="text-white/40 text-xs">Uploading to Cloudinary...</p></>
        ) : (
          <><div className="flex items-center gap-2 text-white/40"><Upload className="w-4 h-4" /><ImageIcon className="w-4 h-4" /></div>
          <p className="text-white/40 text-xs text-center">Drop image here or click to browse<br /><span className="text-violet-400">Auto-uploaded to Cloudinary</span></p></>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </div>

      {/* Manual URL fallback */}
      <input className={inputClass} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste Cloudinary / external image URL" />

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

// ─── Tech Tags ────────────────────────────────────────────────────────────────
function TechTags({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
  const [input, setInput] = useState('');
  const add = () => { if (input.trim()) { onChange([...(tags || []), input.trim()]); setInput(''); } };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {(tags || []).map((t, i) => (
          <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-500/20 text-violet-300 text-xs border border-violet-500/30">
            {t} <button onClick={() => onChange((tags || []).filter((_, idx) => idx !== i))}><X className="w-3 h-3" /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input className={inputClass} placeholder="Add tech tag (Enter)" value={input}
          onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())} />
        <button onClick={add} className="px-3 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-500 transition-all">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onSave, onDelete }: {
  project: ProjectItem; onSave: (p: ProjectItem) => Promise<void>; onDelete: (id: string) => Promise<void>;
}) {
  const [data, setData] = useState(project);
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const set = (key: keyof ProjectItem, val: string | string[]) => setData((p) => ({ ...p, [key]: val }));
  const handleSave = async () => { setSaving(true); await onSave(data); setSaving(false); };
  const handleDelete = async () => { setDeleting(true); await onDelete(project.id!); };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-all">
        <div className="flex items-center gap-3">
          <FolderOpen className="w-4 h-4 text-violet-400" />
          <span className="text-white font-medium">{data.name || 'Unnamed Project'}</span>
          {data.image && <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">📷 Image set</span>}
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/10 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="text-xs text-white/50 mb-1 block">Project Name</label>
              <input className={inputClass} value={data.name} onChange={(e) => set('name', e.target.value)} /></div>
            <div><label className="text-xs text-white/50 mb-1 block">GitHub / Detail Link</label>
              <input className={inputClass} value={data.link} onChange={(e) => set('link', e.target.value)} /></div>
            <div className="sm:col-span-2"><label className="text-xs text-white/50 mb-1 block">Live Link</label>
              <input className={inputClass} value={data.liveLink} onChange={(e) => set('liveLink', e.target.value)} /></div>
          </div>
          <ImageUploader value={data.image} onChange={(url) => set('image', url)} />
          <div><label className="text-xs text-white/50 mb-1 block">Short Description</label>
            <textarea rows={2} className={inputClass} value={data.description} onChange={(e) => set('description', e.target.value)} /></div>
          <div><label className="text-xs text-white/50 mb-1 block">Tech Stack</label>
            <TechTags tags={data.tech} onChange={(t) => set('tech', t)} /></div>
          <div><label className="text-xs text-white/50 mb-1 block">Full Details (Markdown supported)</label>
            <textarea rows={5} className={inputClass} value={data.details} onChange={(e) => set('details', e.target.value)} /></div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={handleDelete} disabled={deleting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 text-sm transition-all disabled:opacity-50">
              {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />} Delete
            </button>
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-500 transition-all disabled:opacity-50">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newProject, setNewProject] = useState<Omit<ProjectItem, 'id'>>(emptyProject);
  const [adding, setAdding] = useState(false);

  useEffect(() => { getProjects().then((d) => { setProjects(d); setLoading(false); }); }, []);

  const handleSave = async (p: ProjectItem) => {
    if (!p.id) return;
    try {
      const safeProject = {
        name: p.name || '',
        description: p.description || '',
        details: p.details || '',
        link: p.link || '',
        liveLink: p.liveLink || '',
        image: p.image || '',
        tech: p.tech || [],
        order: p.order || 0
      };
      await updateProject(p.id, safeProject);
      setProjects((prev) => prev.map((x) => (x.id === p.id ? { ...p, ...safeProject } : x)));
    } catch (e: any) {
      console.error(e);
      alert("Failed to update project: " + e.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      console.error(e);
      alert("Failed to delete project: " + e.message);
    }
  };

  const handleAdd = async () => {
    if (!newProject.name) return;
    setAdding(true);
    try {
      const safeProject = {
        name: newProject.name || '',
        description: newProject.description || '',
        details: newProject.details || '',
        link: newProject.link || '',
        liveLink: newProject.liveLink || '',
        image: newProject.image || '',
        tech: newProject.tech || [],
        order: projects.length
      };
      await addProject(safeProject);
      const updated = await getProjects();
      setProjects(updated);
      setNewProject(emptyProject);
      setShowNew(false);
    } catch (e: any) {
      console.error(e);
      alert("Failed to create project: " + e.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 text-violet-400 animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-white/40 text-sm mt-1">{projects.length} project(s) · Images auto-uploaded to Cloudinary</p>
        </div>
        <button onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* New Project Form */}
      {showNew && (
        <div className="bg-white/5 border border-dashed border-violet-500/40 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-medium">New Project</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="text-xs text-white/50 mb-1 block">Project Name *</label>
              <input className={inputClass} value={newProject.name} onChange={(e) => setNewProject((p) => ({ ...p, name: e.target.value }))} /></div>
            <div><label className="text-xs text-white/50 mb-1 block">GitHub / Detail Link</label>
              <input className={inputClass} value={newProject.link} onChange={(e) => setNewProject((p) => ({ ...p, link: e.target.value }))} /></div>
            <div className="sm:col-span-2"><label className="text-xs text-white/50 mb-1 block">Live Link</label>
              <input className={inputClass} value={newProject.liveLink} onChange={(e) => setNewProject((p) => ({ ...p, liveLink: e.target.value }))} /></div>
          </div>
          <ImageUploader value={newProject.image} onChange={(url) => setNewProject((p) => ({ ...p, image: url }))} />
          <div><label className="text-xs text-white/50 mb-1 block">Short Description</label>
            <textarea rows={2} className={inputClass} value={newProject.description} onChange={(e) => setNewProject((p) => ({ ...p, description: e.target.value }))} /></div>
          <div><label className="text-xs text-white/50 mb-1 block">Tech Stack</label>
            <TechTags tags={newProject.tech} onChange={(t) => setNewProject((p) => ({ ...p, tech: t }))} /></div>
          <button onClick={handleAdd} disabled={adding}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50">
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Create Project
          </button>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-3">
        {projects.length === 0 && !showNew && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-white/40">
            <FolderOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>No projects yet. Click &quot;Add Project&quot; to get started.</p>
          </div>
        )}
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onSave={handleSave} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
