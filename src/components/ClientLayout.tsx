'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import ThemeProvider from './ThemeProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = usePathname().startsWith('/admin');

  return (
    <ThemeProvider>
      {!isAdmin && <Header />}
      <main className={isAdmin ? 'flex-1' : 'flex-1 pb-24 md:pb-0'}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </ThemeProvider>
  );
}
