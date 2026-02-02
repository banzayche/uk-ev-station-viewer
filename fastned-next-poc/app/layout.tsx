import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { AppProviders } from './providers';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: {
    default: 'Fastned Station Explorer (UK)',
    template: '%s | Fastned Station Explorer (UK)'
  },
  description: 'Explore Fastned UK charging stations with live availability and ad-hoc tariffs.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <AppProviders>
          <div className="flex min-h-[100dvh] flex-col">
            <NavBar />
            <main className="flex-1 min-h-0">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
