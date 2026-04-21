import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SN Fabrics | Premium Fabrics, Trusted Trade',
  description:
    'SN Fabrics — a Surat-based premium textile trading house specialising in luxury velvets, Makhan, 9000, 11000 and more. Pan-India delivery, global exports.',
  keywords:
    'SN Fabrics, premium velvet fabric, Surat textile, Makhan velvet, wholesale fabric, fabric exporter India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
