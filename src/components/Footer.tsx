'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, EmailIcon } from './icons';
import { useLocalClock } from '@/lib/useLocalClock';

const SOCIAL_LINKS = [
  { href: 'https://github.com/faizramdhannn', Icon: GithubIcon, alt: 'GitHub' },
  { href: 'https://www.linkedin.com/in/faiz-ramdhan-8b1a22389/', Icon: LinkedinIcon, alt: 'LinkedIn' },
  { href: 'https://instagram.com/faizmalia', Icon: InstagramIcon, alt: 'Instagram' },
  { href: 'mailto:faizramdhan17@gmail.com', Icon: EmailIcon, alt: 'Email' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const localTime = useLocalClock();

  return (
    <footer className="mt-auto px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto liquid-glass rounded-3xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-5"
      >
        <div className="text-center sm:text-left space-y-1">
          <p className="text-sm text-foreground/50">
            &copy; {currentYear} <span className="text-primary font-medium">Faiz Ramdhan Azmalia</span>
          </p>
          {localTime && (
            <p className="text-xs text-foreground/35 flex items-center gap-1.5 justify-center sm:justify-start">
              <Clock size={12} className="text-primary/60" />
              {localTime} WIB &middot; Bandung, Indonesia
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.alt}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={social.alt}
              className="w-9 h-9 rounded-full flex items-center justify-center text-foreground/60
                       hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <social.Icon size={17} />
            </a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
