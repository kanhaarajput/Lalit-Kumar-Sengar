'use client';

import Link from 'next/link';
import { User, GraduationCap, Rocket, Code, FolderOpen, ExternalLink } from 'lucide-react';

const sections = [
  { href: '/admin/dashboard/hero', label: 'Hero & Profile', desc: 'Name, tagline, bio, stats, social links', icon: User, color: 'from-violet-500 to-purple-600' },
  { href: '/admin/dashboard/education', label: 'Education', desc: 'Degrees and institutions', icon: GraduationCap, color: 'from-blue-500 to-cyan-600' },
  { href: '/admin/dashboard/drives', label: 'What Drives Me', desc: 'Motivations and values', icon: Rocket, color: 'from-orange-500 to-red-600' },
  { href: '/admin/dashboard/techstack', label: 'Tech Stack', desc: 'Frontend, backend, tools', icon: Code, color: 'from-green-500 to-teal-600' },
  { href: '/admin/dashboard/projects', label: 'Projects', desc: 'Add, edit, delete portfolio projects', icon: FolderOpen, color: 'from-pink-500 to-rose-600' },
];

export default function DashboardOverview() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back 👋</h1>
        <p className="text-white/50 mt-1">Manage every section of your portfolio from here.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ href, label, desc, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-white font-semibold text-lg">{label}</h2>
            <p className="text-white/40 text-sm mt-1">{desc}</p>
            <div className="flex items-center gap-1 mt-4 text-violet-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Manage</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick tip */}
      <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5">
        <p className="text-violet-300 text-sm">
          💡 <strong>Tip:</strong> All changes are saved to Firebase Firestore and reflected live on your portfolio. Make sure your portfolio page reads from Firestore.
        </p>
      </div>
    </div>
  );
}
