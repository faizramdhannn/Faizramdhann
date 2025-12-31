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
    { href: '/project', label: 'Projects' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center backdrop-blur-md
                 bg-gradient-to-b from-[#000814]/95 via-[#000814]/90 to-transparent
                 border-b border-[#00a67e]/10"
    >
      <div className="text-2xl md:text-3xl font-bold text-[#00a67e] tracking-wide hover:scale-105 transition-transform">
        Faiz Ramdhan
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
        <button
          onClick={toggleTheme}
          className="w-12 h-12 rounded-full border-2 border-[#00a67e] bg-[#00a67e]/10 
                     hover:bg-[#00a67e]/20 hover:scale-110 flex items-center justify-center
                     transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,166,126,0.4)]"
          aria-label="Toggle theme"
        >
          {mounted && <span className="text-2xl">{theme === 'dark' ? '🌙' : '☀️'}</span>}
        </button>
      </div>

      <nav>
        <ul className="flex gap-6 md:gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative text-lg md:text-xl font-semibold transition-colors duration-300
                  ${pathname === item.href
                    ? 'text-[#00a67e]'
                    : 'hover:text-[#00a67e]'}
                  after:content-[''] after:absolute after:bottom-[-5px] after:left-0 
                  after:w-0 after:h-[3px] after:bg-[#00a67e] after:transition-all after:rounded-full
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