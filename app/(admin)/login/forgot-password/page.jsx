'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Reset link sent!');
        setSubmitted(true);
      } else {
        toast.error(data.error || 'Failed to send reset link');
      }
    } catch {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md">
        <button 
          onClick={() => router.push('/login')}
          className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Login
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Mail size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Forgot Password</h1>
          <p className="text-sm text-[var(--foreground-secondary)] mt-2">
            Enter your email address to receive a secure password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="card-base p-8 text-center">
            <h3 className="font-semibold text-lg mb-2">Check your inbox</h3>
            <p className="text-sm text-[var(--foreground-secondary)]">
              We have sent a password reset link to <strong>{email}</strong>. Please check your spam folder if it doesn't arrive within a few minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card-base p-8 space-y-5">
            <div>
              <label htmlFor="reset-email" className="admin-label">Email Address</label>
              <input
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                placeholder="admin@example.com"
                autoComplete="email"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Sending link...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
