'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionHeader from '@/components/shared/SectionHeader';
import SocialIcons from '@/components/shared/SocialIcons';

export default function ContactSection({ profile = {} }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[var(--background-secondary)]">
      <div className="section-container">
        <SectionHeader
          badge="Get in touch"
          title="What's next? Feel free to reach out to me if you're looking for a developer, have a query, or simply want to connect."
        />

        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => handleCopy(profile.email, 'email')}
              className="flex items-center gap-3 text-lg md:text-2xl font-semibold hover:opacity-80 transition-opacity group"
            >
              <Mail size={24} className="text-[var(--foreground-secondary)]" />
              <span>{profile.email}</span>
              {copied === 'email' ? (
                <Check size={18} className="text-emerald-500" />
              ) : (
                <Copy size={18} className="text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={() => handleCopy(profile.phone, 'phone')}
              className="flex items-center gap-3 text-lg md:text-2xl font-semibold hover:opacity-80 transition-opacity group"
            >
              <Phone size={24} className="text-[var(--foreground-secondary)]" />
              <span>{profile.phone}</span>
              {copied === 'phone' ? (
                <Check size={18} className="text-emerald-500" />
              ) : (
                <Copy size={18} className="text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center mb-10">
            <SocialIcons links={profile.socialLinks} size={24} />
          </div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="card-base p-6 md:p-8 space-y-5"
          >
            <div>
              <label htmlFor="contact-name" className="admin-label">Name</label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="admin-input"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="admin-label">Email</label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="admin-input"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="admin-label">Message</label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="admin-input resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
