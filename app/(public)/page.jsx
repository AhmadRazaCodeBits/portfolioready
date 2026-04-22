import HeroSection from '@/components/public/HeroSection';
import AboutSection from '@/components/public/AboutSection';
import SkillsSection from '@/components/public/SkillsSection';
import ExperienceSection from '@/components/public/ExperienceSection';
import ProjectsSection from '@/components/public/ProjectsSection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import ContactSection from '@/components/public/ContactSection';
import DynamicSectionsRenderer from '@/components/public/DynamicSectionsRenderer';
import { getAllPublicData } from '@/lib/db';

// ⚡ ISR: Page is statically generated and revalidated every 60 seconds
// This eliminates cold-start lag — visitors get instant static HTML
export const revalidate = 60;

export default async function HomePage() {
  // Single batched DB call instead of 6 separate queries
  const { profile, skills, experience, projects, testimonials, dynamicSections } = await getAllPublicData();

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection skills={skills} />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <DynamicSectionsRenderer sections={dynamicSections} />
      <ContactSection profile={profile} />
    </>
  );
}
