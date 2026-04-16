import SocialIcons from '@/components/shared/SocialIcons';

export default function Footer({ profile = {} }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--card-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--foreground-secondary)]">
            © {year} {profile.name || 'Ahmad Raza'}. All rights reserved.
          </p>
          <SocialIcons links={profile.socialLinks} size={18} />
        </div>
      </div>
    </footer>
  );
}
