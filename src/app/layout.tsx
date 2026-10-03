import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import PageTransition from '@/components/PageTransition';
import { ViewTransitions } from 'next-view-transitions';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://faizramdhann.vercel.app'),
  title: { default: 'Faiz Ramdhan - Web Developer', template: '%s | Faiz Ramdhan' },
  description: 'Portfolio of Faiz Ramdhan Azmalia, a web developer building practical business tools, dashboards and web apps.',
  keywords: ['portfolio', 'web development', 'faiz ramdhan', 'developer', 'next.js'],
  authors: [{ name: 'Faiz Ramdhan Azmalia' }],
  openGraph: {
    type: 'website',
    siteName: 'Faiz Ramdhan',
    title: 'Faiz Ramdhan - Web Developer',
    description: 'Practical business tools, dashboards and web apps.',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden font-sans">
        <ClientLayout>
          <PageTransition>{children}</PageTransition>
        </ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
    </ViewTransitions>
  );
}