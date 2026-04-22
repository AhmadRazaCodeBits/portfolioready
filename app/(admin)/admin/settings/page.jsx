'use client';

import { useState, useEffect } from 'react';
import { Settings, RefreshCw, Database, Users, Trash2, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';
import { useSession } from 'next-auth/react';

export default function AdminSettings() {
  const { data: session } = useSession();
  const [seeding, setSeeding] = useState(false);
  
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreatingUser(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Admin user created successfully');
        setNewUser({ name: '', email: '', password: '' });
        fetchUsers();
      } else {
        toast.error(data.error || 'Failed to create user');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this admin access?')) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('User removed');
        setUsers(users.filter(u => u._id !== id));
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to delete user');
      }
    } catch {
      toast.error('Error removing user');
    }
  };

  const handleSeed = async () => {
    if (!confirm('This will reset ALL data to defaults from your resume. Continue?')) return;
    setSeeding(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      if (res.ok) {
        toast.success('Database reset to default data!');
        revalidatePublicSite();
      } else {
        toast.error('Failed to seed database');
      }
    } catch {
      toast.error('Error seeding database');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Settings size={28} className="text-[var(--accent)]" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-6 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-base p-6 h-fit">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Database size={20} /> Database Management
            </h2>
            <p className="text-sm text-[var(--foreground-secondary)] mb-4">
              Reset the database to default values from your resume. This will overwrite all current data.
            </p>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <RefreshCw size={16} className={seeding ? 'animate-spin' : ''} />
              {seeding ? 'Resetting...' : 'Reset to Default Data'}
            </button>
          </div>

          <div className="card-base p-6">
            <h2 className="text-lg font-semibold mb-2">Environment Info</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-[var(--card-border)]">
                <span className="text-[var(--foreground-secondary)]">Storage</span>
                <span className="font-medium">MongoDB Atlas</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--card-border)]">
                <span className="text-[var(--foreground-secondary)]">Framework</span>
                <span className="font-medium">Next.js 15</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[var(--foreground-secondary)]">Auth</span>
                <span className="font-medium">NextAuth (Credentials)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Access Management */}
        <div className="card-base p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users size={20} className="text-[var(--accent)]" /> 
            <h2 className="text-lg font-semibold">Access Management</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Add User Form */}
            <div>
              <h3 className="font-medium mb-4 text-[var(--foreground-secondary)]">Add Administrator</h3>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="admin-label">Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="admin-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="admin-label">Email</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="admin-input"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="admin-label">Password</label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="admin-input"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={creatingUser}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <UserPlus size={16} />
                  {creatingUser ? 'Creating...' : 'Create Admin'}
                </button>
              </form>
            </div>

            {/* List Users */}
            <div>
              <h3 className="font-medium mb-4 text-[var(--foreground-secondary)]">Current Administrators</h3>
              {loadingUsers ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-12 bg-[var(--card-border)] rounded-md"></div>
                  <div className="h-12 bg-[var(--card-border)] rounded-md"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {users.length === 0 ? (
                    <div className="text-sm text-[var(--muted)] text-center py-4 border border-dashed border-[var(--card-border)] rounded-lg">
                      No additional users found.
                    </div>
                  ) : (
                    users.map(user => (
                      <div key={user._id} className="flex items-center justify-between p-3 border border-[var(--card-border)] rounded-lg bg-[var(--background)]">
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-[var(--muted)]">{user.email}</p>
                        </div>
                        {session?.user?.email !== user.email && (
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Remove Access"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                  <p className="text-xs text-[var(--muted)] mt-4">
                    Note: The primary Super Admin configured in environment variables cannot be deleted from this interface.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
