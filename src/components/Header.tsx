'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/project', label: 'Project' },
    { href: '/login', label: 'Login' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-12 py-6 flex justify-between items-center backdrop-blur-md
                       bg-gradient-to-b from-[#000814] via-[#000814]/90 to-transparent
                       dark:from-[#000814] dark:via-[#000814]/90
                       light:from-white/95 light:via-white/80">
      <div className="text-3xl font-bold text-[#00a67e] tracking-wide">
        Faiz Ramdhan
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full border border-[#00a67e] bg-[#00a67e]/10 
                     hover:bg-[#00a67e]/20 hover:scale-110 flex items-center justify-center
                     transition-all duration-300"
          aria-label="Toggle theme"
        >
          {mounted && <span className="text-xl">{theme === 'dark' ? '🌙' : '☀️'}</span>}
        </button>
      </div>

      <nav>
        <ul className="flex gap-8">
          {navItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative text-xl font-medium transition-colors duration-300
                          ${pathname === item.href 
                            ? 'text-[#00a67e]' 
                            : 'hover:text-[#00a67e]'}
                          after:content-[''] after:absolute after:bottom-[-5px] after:left-0 
                          after:w-0 after:h-[2px] after:bg-[#00a67e] after:transition-all
                          ${pathname === item.href ? 'after:w-full' : 'hover:after:w-full'}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}