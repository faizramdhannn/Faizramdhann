'use client';

import Header from './Header';
import Footer from './Footer';
import ThemeProvider from './ThemeProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
}