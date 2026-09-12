import type { Metadata } from 'next';
import { Cormorant_Garamond, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bagja Iskandar Jamil',
  description: 'Portfolio of Bagja Iskandar Jamil — Software Engineering, Distributed Systems & Applied AI.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/brand/bij-logo-structure.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${geistMono.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="relative w-full h-full bg-ink text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
