import { Github, Linkedin, Twitter } from 'lucide-react';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function SocialIcons({ links = [], size = 20, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((link) => {
        const Icon = iconMap[link.icon] || Github;
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors duration-200"
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
