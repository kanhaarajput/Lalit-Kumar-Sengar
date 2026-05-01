'use client';

import { useState, useEffect, useRef } from 'react';
import { getHeroData, saveHeroData, type HeroData } from '@/lib/portfolio-service';
import { Save, Loader2, CheckCircle, Upload, ImageIcon, X, FileText, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const defaultHero: HeroData = {
  name: "Lalit Kumar Sengar", role: "Full Stack Developer",
  tagline: "Hi, I'm Lalit Kumar Sengar — a passionate full-stack developer with a knack for building scalable, real-world applications.",
  available: true, githubUrl: "https://github.com/kanhaarajput",
  linkedinUrl: "https://www.linkedin.com/in/lalit-kumar-sengar-220646311",
  email: "lalitthakur894@gmail.com", phone: "+91 7253015988",
  projectsCount: "2", experience: "1+", commits: "500+",
  bio: "👋 Hi, I'm Lalit Kumar Sengar, a passionate Full Stack Developer based in Ghaziabad, India.",
  profileImage: "",
  resumeUrl: "",
};

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

// ─── Profile Image Uploader ───────────────────────────────────────────────────
function ProfileImageUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please select an image file.'); return; }
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'portfolio/profile');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setError('Upload failed. Try again.');
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
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white/70">Profile Photo</label>

      <div className="flex items-start gap-6">
        {/* Preview */}
        <div className="flex-shrink-0">
          {value ? (
            <div className="relative w-28 h-28 group">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-violet-500/40 shadow-lg shadow-violet-500/20">
                <Image src={value} alt="Profile" fill className="object-cover" />
              </div>
              <button
                onClick={() => onChange('')}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-green-500 text-white text-xs whitespace-nowrap">
                ✓ Uploaded
              </div>
            </div>
          ) : (
            <div className="w-28 h-28 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5">
              <ImageIcon className="w-8 h-8 text-white/20" />
            </div>
          )}
        </div>

        {/* Upload zone */}
        <div className="flex-1 space-y-2">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className="w-full border border-dashed border-white/20 rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all"
          >
            {uploading ? (
              <>
                <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
                <p className="text-white/40 text-xs">Uploading to Cloudinary...</p>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 text-white/30" />
                <p className="text-white/40 text-xs text-center">
                  Drop your photo here or <span className="text-violet-400">click to browse</span>
                </p>
                <p className="text-white/20 text-xs">JPG, PNG, WEBP supported</p>
              </>
            )}
            <input ref={inputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>

          {/* Manual URL */}
          <input
            className={inputClass}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL directly"
          />

          {error && <p className="text-red-400 text-xs">{error}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Resume Uploader ─────────────────────────────────────────────────────────
function ResumeUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== 'application/pdf') { setError('Please upload a PDF file only.'); return; }
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'portfolio/resume');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setError('Upload failed. Try again.');
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
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white/70">Resume / CV (PDF)</label>

      {/* Current file */}
      {value && (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-green-300 text-sm font-medium">Resume uploaded ✓</p>
              <p className="text-white/30 text-xs truncate max-w-xs">{value}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={value} target="_blank" rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-green-400 hover:bg-green-500/20 transition-all">
              <ExternalLink className="w-4 h-4" />
            </a>
            <button onClick={() => onChange('')}
              className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Upload zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="w-full border border-dashed border-white/20 rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all"
      >
        {uploading ? (
          <><Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
          <p className="text-white/40 text-xs">Uploading to Cloudinary...</p></>
        ) : (
          <><Upload className="w-5 h-5 text-white/30" />
          <p className="text-white/40 text-xs text-center">
            Drop your <span className="text-violet-400 font-medium">PDF resume</span> here or click to browse
          </p></>
        )}
        <input ref={inputRef} type="file" accept="application/pdf" className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </div>

      {/* Manual URL */}
      <input className={inputClass} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste Cloudinary PDF URL directly" />

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HeroAdmin() {
  const [data, setData] = useState<HeroData>(defaultHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getHeroData().then((d) => { if (d) setData(d); setLoading(false); });
  }, []);

  const set = (key: keyof HeroData, value: string | boolean) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const safeData = {
        name: data.name || '',
        role: data.role || '',
        tagline: data.tagline || '',
        available: !!data.available,
        githubUrl: data.githubUrl || '',
        linkedinUrl: data.linkedinUrl || '',
        email: data.email || '',
        phone: data.phone || '',
        projectsCount: data.projectsCount || '',
        experience: data.experience || '',
        commits: data.commits || '',
        bio: data.bio || '',
        profileImage: data.profileImage || '',
        resumeUrl: data.resumeUrl || ''
      };
      await saveHeroData(safeData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      console.error(e);
      alert("Failed to save: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero & Profile</h1>
          <p className="text-white/40 text-sm mt-1">Update your hero section, profile photo and card</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Profile Image + Resume side by side on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <ProfileImageUploader
            value={data.profileImage}
            onChange={(url) => set('profileImage', url)}
          />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <ResumeUploader
            value={data.resumeUrl}
            onChange={(url) => set('resumeUrl', url)}
          />
        </div>
      </div>

      {/* OLD Profile Image block removed — now inside grid above */}
      <div className="hidden">
        <ProfileImageUploader
          value={data.profileImage}
          onChange={(url) => set('profileImage', url)}
        />
      </div>

      {/* Identity */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold">Identity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name">
            <input className={inputClass} value={data.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label="Role / Title">
            <input className={inputClass} value={data.role} onChange={(e) => set('role', e.target.value)} />
          </Field>
        </div>
        <Field label="Tagline (Hero Description)">
          <textarea rows={3} className={inputClass} value={data.tagline} onChange={(e) => set('tagline', e.target.value)} />
        </Field>
        <Field label="Profile Bio (About Card)">
          <textarea rows={3} className={inputClass} value={data.bio} onChange={(e) => set('bio', e.target.value)} />
        </Field>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="available" checked={data.available}
            onChange={(e) => set('available', e.target.checked)} className="w-4 h-4 accent-violet-500" />
          <label htmlFor="available" className="text-sm text-white/70">Show "Available for Work" badge</label>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-white font-semibold">Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Projects Count">
            <input className={inputClass} value={data.projectsCount} onChange={(e) => set('projectsCount', e.target.value)} />
          </Field>
          <Field label="Experience">
            <input className={inputClass} value={data.experience} onChange={(e) => set('experience', e.target.value)} />
          </Field>
          <Field label="Commits">
            <input className={inputClass} value={data.commits} onChange={(e) => set('commits', e.target.value)} />
          </Field>
        </div>
      </div>

      {/* Contact & Social */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-white font-semibold">Contact & Social Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email">
            <input className={inputClass} value={data.email} onChange={(e) => set('email', e.target.value)} />
          </Field>
          <Field label="Phone">
            <input className={inputClass} value={data.phone} onChange={(e) => set('phone', e.target.value)} />
          </Field>
          <Field label="GitHub URL">
            <input className={inputClass} value={data.githubUrl} onChange={(e) => set('githubUrl', e.target.value)} />
          </Field>
          <Field label="LinkedIn URL">
            <input className={inputClass} value={data.linkedinUrl} onChange={(e) => set('linkedinUrl', e.target.value)} />
          </Field>
        </div>
      </div>
    </div>
  );
}
