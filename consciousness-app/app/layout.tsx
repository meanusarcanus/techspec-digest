import './globals.css';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientCosmicBg from '@/components/AmbientCosmicBg';

export const metadata = {
  title: 'Products of Consciousness & Enlightenment Daily',
  description: 'Daily wisdom, sacred geometry, mindfulness insights, and curated Amazon practice tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950 min-h-screen flex flex-col relative">
        <AmbientCosmicBg />
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
