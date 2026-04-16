import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import ScrollProgress from '@/components/public/ScrollProgress';
import Chatbot from '@/components/public/Chatbot';
import { getProfile, getNavItems } from '@/lib/db';

export const revalidate = 60; // ⚡️ Cache all public pages for 60 seconds (ISR) for maximum speed

export default async function PublicLayout({ children }) {
  const profile = await getProfile();
  const navItems = await getNavItems();

  return (
    <>
      <ScrollProgress />
      <Navbar navItems={navItems} profile={profile} />
      <main className="min-h-screen">{children}</main>
      <Footer profile={profile} />
      <Chatbot />
    </>
  );
}
