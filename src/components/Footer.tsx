'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  const socialLinks = [
    { href: 'https://github.com/faizramdhannn', icon: 'github', alt: 'GitHub' },
    { href: 'https://www.linkedin.com/in/faiz-ramdhan-8b1a22389/', icon: 'linkedin', alt: 'LinkedIn' },
    { href: 'https://instagram.com/faizmalia', icon: 'instagram', alt: 'Instagram' },
    { href: 'mailto:faizramdhan17@gmail.com', icon: 'email', alt: 'Email' },
  ];

  return (
    <footer className="relative mt-auto border-t border-[#00a67e]/10">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00a67e]/5 to-[#00a67e]/10 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              <span className="text-primary">
                Faiz Ramdhan
              </span>
            </h3>
            <p className="text-sm md:text-base text-foreground/60 max-w-md">
              Crafting digital experiences with passion and precision
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.alt}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-xl border border-[#00a67e]/20 bg-[#00a67e]/5
                         hover:border-[#00a67e]/40 hover:bg-[#00a67e]/10
                         flex items-center justify-center transition-all duration-300
                         hover:shadow-lg hover:shadow-[#00a67e]/20"
              >
                <Image
                  src={`/assets/${social.icon}-${theme === 'light' ? 'light' : 'dark'}.png`}
                  alt={social.alt}
                  width={20}
                  height={20}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/assets/${social.icon}.png`;
                  }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#00a67e]/30 to-transparent"
          />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center space-y-2"
          >
            <p className="text-sm text-foreground/50">
              &copy; {currentYear} <span className="text-[#00a67e]">Faiz Ramdhan Azmalia</span>. All rights reserved.
            </p>
            <p className="text-xs text-foreground/40">
              Built with Next.js & Tailwind CSS
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#00a67e] to-transparent opacity-30" />
    </footer>
  );
}