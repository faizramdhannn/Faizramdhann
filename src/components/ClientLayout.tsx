'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import ThemeProvider from './ThemeProvider';
import CommandPalette from './CommandPalette';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = usePathname().startsWith('/admin');

  return (
    <ThemeProvider>
      {!isAdmin && <Header />}
      {!isAdmin && <CommandPalette />}
      <main className={isAdmin ? 'flex-1' : 'flex-1 pb-24 md:pb-0'}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </ThemeProvider>
  );
}
