import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Garden Perks | Daily Botanical Plant Care & "How-To" Guides',
  description: 'Your daily botanical sanctuary. Discover comprehensive plant care profiles, likes & dislikes, propagation how-tos, organic troubleshooting, and curated Amazon gardening essentials.',
  keywords: 'garden plants, plant care, houseplants, monsteras, ficus, propagation, organic pest control, soil moisture, plant doctor, plant likes and dislikes',
  openGraph: {
    title: 'The Garden Perks | Daily Botanical Plant Care & How-To Guides',
    description: 'Everyday featured plant care profiles, Likes & Dislikes matrix, and AI Plant Doctor clinic.',
    images: ['https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=85'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-900 selection:bg-emerald-200 selection:text-emerald-950">
        {children}
      </body>
    </html>
  );
}
