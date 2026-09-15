'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useHoldSlide } from '@/lib/useHoldSlide';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/project', label: 'Projects' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { containerRef, activeKey, containerHandlers } = useHoldSlide<string>({
    commitOn: 'release',
    onSelect: (href) => router.push(href),
  });
  const highlightedHref = activeKey ?? pathname;

  useEffect(() => setMounted(true), []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-50 px-4"
    >
      <div className="max-w-3xl mx-auto liquid-glass-pill flex items-center justify-between gap-2 px-3 py-2 md:px-4">
        <Link href="/" className="shrink-0 pl-1">
          <span className="text-lg font-bold tracking-tight text-primary">Faiz</span>
          <span className="text-lg font-bold tracking-tight text-foreground/90 ml-1">Ramdhan</span>
        </Link>

        <nav
          ref={containerRef}
          {...containerHandlers}
          className="hidden md:flex items-center gap-1 select-none"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-slide-key={item.href}
              className="relative px-4 py-2 rounded-full text-sm font-medium"
            >
              {highlightedHref === item.href && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className={`relative z-10 ${highlightedHref === item.href ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
          >
            {mounted && (
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="flex"
              >
                {theme === 'dark' ? <Moon size={17} /> : <Sun size={17} />}
              </motion.span>
            )}
          </motion.button>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden max-w-3xl mx-auto mt-2 liquid-glass rounded-2xl overflow-hidden"
          >
            <nav className="px-3 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <div
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-primary/15 text-primary'
                        : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
