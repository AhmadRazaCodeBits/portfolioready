import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import ScrollProgress from '@/components/public/ScrollProgress';
import Chatbot from '@/components/public/Chatbot';
import { getAllPublicData } from '@/lib/db';

// ⚡ ISR: Cache all public pages for 60 seconds for maximum speed
export const revalidate = 60;

export default async function PublicLayout({ children }) {
  // Use batched data — shares the same cache as page.jsx, so no extra DB calls
  const { profile, navItems } = await getAllPublicData();

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
