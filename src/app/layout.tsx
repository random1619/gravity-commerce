import type { Metadata } from "next";
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DemoWarning from '@/components/ui/DemoWarning';
import { AuthProvider } from '@/lib/AuthContext';
import { CartProvider } from '@/lib/CartContext';
import { ThemeProvider } from '@/lib/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GRAVITY - Streetwear for Students (DEMO)',
  description: 'Premium streetwear designed for students. Bold, affordable, authentic. [DEMO SITE]',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'noindex, nofollow', // Prevent search engine indexing of demo site
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <DemoWarning />
              <Navbar />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
