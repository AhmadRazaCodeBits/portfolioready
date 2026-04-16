import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'Ahmad Raza | MERN Stack Developer Portfolio',
  description: 'Skilled MERN stack developer with expertise in building dynamic, user-friendly web applications using React.js, Node.js, Next.js, and MongoDB.',
  keywords: ['MERN Stack', 'Developer', 'React.js', 'Node.js', 'Next.js', 'Portfolio', 'Ahmad Raza'],
  authors: [{ name: 'Ahmad Raza' }],
  creator: 'Ahmad Raza',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ahmadraza.dev',
    siteName: 'Ahmad Raza Portfolio',
    title: 'Ahmad Raza | MERN Stack Developer',
    description: 'Skilled MERN stack developer building dynamic, user-friendly web applications.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Ahmad Raza Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmad Raza | MERN Stack Developer',
    description: 'Skilled MERN stack developer building dynamic, user-friendly web applications.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ahmad Raza',
              jobTitle: 'MERN Stack Developer',
              url: 'https://ahmadraza.dev',
              email: 'ahmadraza20416@gmail.com',
              telephone: '+923079618398',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lahore',
                addressRegion: 'Punjab',
                addressCountry: 'Pakistan',
              },
              sameAs: [
                'https://github.com/AhmadRazaCodeBits',
                'https://linkedin.com/in/ahmad-raza416',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--card)',
                color: 'var(--foreground)',
                border: '1px solid var(--card-border)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
