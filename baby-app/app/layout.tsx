import type { Metadata } from 'next';
import './globals.css';
import BabyNavbar from '@/components/BabyNavbar';
import BabyFooter from '@/components/BabyFooter';
import BabyAmbientBg from '@/components/BabyAmbientBg';

export const metadata: Metadata = {
  title: 'Calm Baby Sanctuary • Soothing Classical Lullabies & Bedtime Sleep Guides',
  description:
    'Discover soothing 1-hour Brahms & Mozart lullabies, pediatric bedtime routines, curated nursery essentials, and heart-centered bedtime storybooks for little ones.',
  keywords: [
    'baby sleep music',
    'lullaby for babies to sleep',
    'brahms lullaby 1 hour',
    'bible bedtime stories for little hearts',
    'baby sleep aids',
    'infant nursery gear',
  ],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-night-950 text-slate-100 font-sans antialiased relative selection:bg-amber-400 selection:text-night-950">
        <BabyAmbientBg />
        <div className="relative z-10 flex flex-col min-h-screen">
          <BabyNavbar />
          <main className="flex-grow">{children}</main>
          <BabyFooter />
        </div>
      </body>
    </html>
  );
}
