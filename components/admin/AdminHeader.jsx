'use client';

import { signOut } from 'next-auth/react';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { getInitials } from '@/lib/utils';

export default function AdminHeader({ user }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-[var(--card)] border-b border-[var(--card-border)] flex items-center justify-between px-4 md:px-8">
      <div className="md:hidden w-10" /> {/* Spacer for mobile menu button */}

      <h2 className="text-sm font-medium text-[var(--foreground-secondary)] hidden md:block">
        Portfolio CMS
      </h2>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {getInitials(user?.name)}
            </span>
          </div>
          <span className="text-sm font-medium text-[var(--foreground)] hidden sm:block">
            {user?.name}
          </span>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
