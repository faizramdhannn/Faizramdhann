'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';
import { Moon, Sun, Home, User, FolderKanban } from 'lucide-react';
import { useHoldSlide } from '@/lib/useHoldSlide';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/project', label: 'Projects' },
];

const TAB_ITEMS = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/about', label: 'About', Icon: User },
  { href: '/project', label: 'Projects', Icon: FolderKanban },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { containerRef, activeKey, containerHandlers } = useHoldSlide<string>({
    commitOn: 'release',
    onSelect: (href) => router.push(href),
  });
  const highlightedHref = activeKey ?? pathname;

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Top bar: full nav pill on desktop, just logo + theme toggle on mobile */}
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
        </div>
      </motion.header>

      {/* Bottom tab bar — mobile only, iOS app style */}
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className="liquid-glass rounded-3xl flex items-stretch justify-around px-1 py-1.5 shadow-2xl">
          {TAB_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex-1 flex flex-col items-center justify-center gap-0.5 py-2 rounded-2xl"
              >
                {active && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-2xl bg-primary/15"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <item.Icon
                  size={21}
                  className={`relative z-10 ${active ? 'text-primary' : 'text-foreground/50'}`}
                  strokeWidth={active ? 2.3 : 2}
                />
                <span className={`relative z-10 text-[10px] font-semibold ${active ? 'text-primary' : 'text-foreground/50'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
