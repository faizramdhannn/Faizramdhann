import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Faiz Ramdhan - Portfolio',
  description: 'Personal portfolio website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <ClientLayout>
          <PageTransition>{children}</PageTransition>
        </ClientLayout>
      </body>
    </html>
  );
}
