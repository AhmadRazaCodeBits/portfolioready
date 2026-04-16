'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Code,
  Briefcase,
  FolderKanban,
  MessageSquare,
  Menu as MenuIcon,
  Settings,
  X,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Page Builder', href: '/admin/builder', icon: LayoutDashboard },
  { label: 'Profile', href: '/admin/profile', icon: User },
  { label: 'Skills', href: '/admin/skills', icon: Code },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)]"
        aria-label="Open menu"
      >
        <MenuIcon size={20} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-[var(--card)] border-r border-[var(--card-border)] z-50 transition-transform duration-300 flex flex-col',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--card-border)]">
          <span className="text-lg font-bold text-[var(--foreground)]">
            &lt;<span className="text-[var(--accent)]">AR</span> /&gt; Admin
          </span>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-[var(--foreground-secondary)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                    : 'text-[var(--foreground-secondary)] hover:bg-[var(--background)] hover:text-[var(--foreground)]'
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--card-border)]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-[var(--foreground-secondary)] hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-all"
          >
            <ExternalLink size={18} />
            View Portfolio
          </Link>
        </div>
      </aside>
    </>
  );
}
