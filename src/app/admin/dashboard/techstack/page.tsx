'use client';

import { useState, useEffect } from 'react';
import { getTechStack, saveTechStack, type TechStack } from '@/lib/portfolio-service';
import { Plus, X, Save, Loader2, CheckCircle } from 'lucide-react';

const inputClass = "flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm";

const defaultStack: TechStack = { frontend: [], backend: [], tools: [], database: [], ai: [] };

function TagSection({ title, items, onAdd, onRemove, placeholder }:
  { title: string; items: string[]; onAdd: (v: string) => void; onRemove: (i: number) => void; placeholder: string }) {
  const [input, setInput] = useState('');
  const add = () => { if (input.trim()) { onAdd(input.trim()); setInput(''); } };
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
      <h2 className="text-white font-semibold">{title}</h2>
      <div className="flex flex-wrap gap-2 min-h-[2rem]">
        {items.map((tag, i) => (
          <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-500/20 text-violet-300 text-sm border border-violet-500/30">
            {tag}
            <button onClick={() => onRemove(i)} className="hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button>
          </span>
        ))}
        {items.length === 0 && <p className="text-white/30 text-sm">No items yet</p>}
      </div>
      <div className="flex gap-2">
        <input className={inputClass} placeholder={placeholder} value={input}
          onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <button onClick={add} className="px-3 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-500 transition-all">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function TechStackAdmin() {
  const [stack, setStack] = useState<TechStack>(defaultStack);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getTechStack().then((d) => { if (d) setStack(d); setLoading(false); });
  }, []);

  const add = (key: keyof TechStack, val: string) =>
    setStack((p) => ({ ...p, [key]: [...(p[key] || []), val] }));
  const remove = (key: keyof TechStack, i: number) =>
    setStack((p) => ({ ...p, [key]: (p[key] || []).filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const sanitizedStack: TechStack = {
        frontend: stack.frontend || [],
        backend: stack.backend || [],
        tools: stack.tools || [],
        database: stack.database || [],
        ai: stack.ai || []
      };
      await saveTechStack(sanitizedStack);
      setStack(sanitizedStack);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      console.error(e);
      alert("Failed to save tech stack: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 text-violet-400 animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tech Stack</h1>
          <p className="text-white/40 text-sm mt-1">Manage your technologies by category</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
      <TagSection title="Frontend" items={stack.frontend || []} onAdd={(v) => add('frontend', v)} onRemove={(i) => remove('frontend', i)} placeholder="e.g. React.js" />
      <TagSection title="Backend" items={stack.backend || []} onAdd={(v) => add('backend', v)} onRemove={(i) => remove('backend', i)} placeholder="e.g. Node.js" />
      <TagSection title="Database" items={stack.database || []} onAdd={(v) => add('database', v)} onRemove={(i) => remove('database', i)} placeholder="e.g. MongoDB" />
      <TagSection title="AI Tools" items={stack.ai || []} onAdd={(v) => add('ai', v)} onRemove={(i) => remove('ai', i)} placeholder="e.g. TensorFlow" />
      <TagSection title="Tools & Others" items={stack.tools || []} onAdd={(v) => add('tools', v)} onRemove={(i) => remove('tools', i)} placeholder="e.g. Docker" />
    </div>
  );
}
