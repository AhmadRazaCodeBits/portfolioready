import { ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  default: ExternalLink,
};

export default function DynamicSectionsRenderer({ sections }) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => (
        <section key={section._id} id={`section-${section._id}`} className="py-20 bg-[var(--background)]">
          <div className="container-custom">
            <SectionHeader badge="Section" title={section.title} />
            
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
              {section.blocks?.map((block, idx) => {
                const key = `${section._id}-block-${idx}`;
                
                if (block.blockType === 'TEXT') {
                  return (
                     <div key={key} className="prose dark:prose-invert max-w-none text-[var(--foreground-secondary)] text-lg" dangerouslySetInnerHTML={{ __html: block.content }} />
                  );
                }
                
                if (block.blockType === 'IMAGE') {
                  return block.content ? (
                    <div key={key} className="rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-sm">
                      <img src={block.content} alt={section.title} className="w-full h-auto object-cover max-h-[600px]" />
                    </div>
                  ) : null;
                }
                
                if (block.blockType === 'SOCIAL_LINKS') {
                  const links = Array.isArray(block.content) ? block.content : [];
                  return (
                    <div key={key} className="flex flex-wrap gap-4 mt-2">
                       {links.map((link, i) => {
                         let Icon = ExternalLink;
                         const p = (link.platform || '').toLowerCase();
                         if (p.includes('github')) Icon = Github;
                         else if (p.includes('linkedin')) Icon = Linkedin;
                         else if (p.includes('twitter')) Icon = Twitter;
                         
                         return (
                           <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all group">
                             <Icon size={20} className="group-hover:scale-110 transition-transform" />
                             <span className="font-medium">{link.platform}</span>
                           </a>
                         );
                       })}
                    </div>
                  );
                }
                
                return null;
              })}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
