import './globals.css';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientCosmicBg from '@/components/AmbientCosmicBg';

export const metadata = {
  title: 'Products of Consciousness & Enlightenment Daily',
  description: 'Daily wisdom, sacred geometry, mindfulness insights, and curated Amazon practice tools.',
  verification: {
    google: 'MRn0xaLtoBPlAMgPyzvDVvSzLTHsbw9obXMSB4Vrf9A',
  },
  other: {
    'p:domain_verify': 'ead6e48d95203c41cff34aee7c0e3c9a',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="MRn0xaLtoBPlAMgPyzvDVvSzLTHsbw9obXMSB4Vrf9A" />
        <meta name="p:domain_verify" content="ead6e48d95203c41cff34aee7c0e3c9a" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230b0f19'/><circle cx='16' cy='16' r='11' fill='none' stroke='%23f59e0b' stroke-width='1.5' stroke-dasharray='3 2'/><path d='M16 8 L18 14 L24 16 L18 18 L16 24 L14 18 L8 16 L14 14 Z' fill='%23fbbf24'/><circle cx='16' cy='16' r='2' fill='%23ffffff'/></svg>" />
      </head>
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
