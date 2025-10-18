'use client';

import Header from './Header';
import Footer from './Footer';
import ThemeProvider from './ThemeProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}