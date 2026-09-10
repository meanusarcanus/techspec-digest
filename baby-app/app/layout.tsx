import type { Metadata } from 'next';
import './globals.css';
import BabyNavbar from '@/components/BabyNavbar';
import BabyFooter from '@/components/BabyFooter';
import BabyAmbientBg from '@/components/BabyAmbientBg';

export const metadata: Metadata = {
  title: 'Calm Baby Nursery • Soothing Classical Lullabies & Bedtime Sleep Guides',
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
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230a0d1a'/><path d='M20 7 A10 10 0 1 1 10 21 A11 11 0 0 0 20 7 Z' fill='%23fbbf24'/><polygon points='23,9 24.2,12.5 27.8,12.5 24.9,14.6 26,18.1 23,16 20,18.1 21.1,14.6 18.2,12.5 21.8,12.5' fill='%2338bdf8'/></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230a0d1a'/><path d='M20 7 A10 10 0 1 1 10 21 A11 11 0 0 0 20 7 Z' fill='%23fbbf24'/><polygon points='23,9 24.2,12.5 27.8,12.5 24.9,14.6 26,18.1 23,16 20,18.1 21.1,14.6 18.2,12.5 21.8,12.5' fill='%2338bdf8'/></svg>" />
      </head>
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
