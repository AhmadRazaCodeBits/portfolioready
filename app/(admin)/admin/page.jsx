'use client';

import { useEffect, useState } from 'react';
import { LayoutDashboard, Code, Briefcase, FolderKanban, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [skills, experience, projects, testimonials] = await Promise.all([
          fetch('/api/skills?all=true').then((r) => r.json()),
          fetch('/api/experience?all=true').then((r) => r.json()),
          fetch('/api/projects?all=true').then((r) => r.json()),
          fetch('/api/testimonials?all=true').then((r) => r.json()),
        ]);
        setStats({
          skills: skills.length,
          experience: experience.length,
          projects: projects.length,
          testimonials: testimonials.length,
        });
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    }
    load();
  }, []);

  const cards = [
    { label: 'Skills', count: stats?.skills || 0, icon: Code, color: 'from-blue-500 to-cyan-500' },
    { label: 'Experience', count: stats?.experience || 0, icon: Briefcase, color: 'from-emerald-500 to-green-500' },
    { label: 'Projects', count: stats?.projects || 0, icon: FolderKanban, color: 'from-purple-500 to-pink-500' },
    { label: 'Testimonials', count: stats?.testimonials || 0, icon: MessageSquare, color: 'from-orange-500 to-amber-500' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard size={28} className="text-[var(--accent)]" />
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card-base p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-[var(--foreground)] mb-1">
                {stats ? card.count : '—'}
              </div>
              <div className="text-sm text-[var(--foreground-secondary)]">{card.label}</div>
            </div>
          );
        })}
      </div>

      <div className="card-base p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="/admin/profile" className="admin-input text-center hover:bg-[var(--card)] cursor-pointer block py-3 text-sm">
            ✏️ Edit Profile
          </a>
          <a href="/admin/projects" className="admin-input text-center hover:bg-[var(--card)] cursor-pointer block py-3 text-sm">
            📁 Manage Projects
          </a>
          <a href="/admin/skills" className="admin-input text-center hover:bg-[var(--card)] cursor-pointer block py-3 text-sm">
            🛠️ Manage Skills
          </a>
          <a href="/admin/settings" className="admin-input text-center hover:bg-[var(--card)] cursor-pointer block py-3 text-sm">
            ⚙️ Settings
          </a>
        </div>
      </div>
    </div>
  );
}
