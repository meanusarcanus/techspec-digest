import './globals.css';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientCosmicBg from '@/components/AmbientCosmicBg';

export const metadata = {
  title: 'Products of Consciousness & Enlightenment Daily',
  description: 'Daily wisdom, sacred geometry, mindfulness insights, and curated Amazon practice tools.',
  icons: {
    icon: [
      { url: '/consciousness/favicon.ico' },
      { url: '/consciousness/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/consciousness/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/consciousness/apple-touch-icon.png' },
    ],
  },
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
        <link rel="shortcut icon" href="/consciousness/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/consciousness/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/consciousness/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/consciousness/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/consciousness/apple-touch-icon.png" />
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
