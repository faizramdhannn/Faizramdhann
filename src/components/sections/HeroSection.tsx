'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ImageOff } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { GithubIcon, LinkedinIcon, InstagramIcon, EmailIcon } from '@/components/icons';
import type { Content } from '@/lib/content';

const SOCIAL_LINKS = [
  { href: 'https://github.com/faizramdhannn', Icon: GithubIcon, alt: 'GitHub' },
  { href: 'https://www.linkedin.com/in/faiz-ramdhan-8b1a22389/', Icon: LinkedinIcon, alt: 'LinkedIn' },
  { href: 'https://instagram.com/faizmalia', Icon: InstagramIcon, alt: 'Instagram' },
  { href: 'mailto:faizramdhan17@gmail.com', Icon: EmailIcon, alt: 'Email' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function HeroSection({ content }: { content: Content }) {
  const { theme } = useTheme();

  const socials = useMemo(() => SOCIAL_LINKS, []);

  return (
    <section id="hero" className="relative px-6 md:px-8 py-14 md:py-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0"
          >
            <div className="relative w-[280px] h-[300px] sm:w-[320px] sm:h-[340px] lg:w-[340px] lg:h-[360px]">
              {/* Decorative "no image" placeholder box — stays put across themes */}
              <div
                className={`absolute liquid-glass rounded-3xl border-2 border-dashed border-foreground/15
                          flex flex-col items-center justify-center gap-2 text-foreground/25
                          transition-[right,bottom,left,top] duration-500
                          ${theme === 'light'
                            ? 'right-0 bottom-0 w-[190px] h-[190px] sm:w-[210px] sm:h-[210px]'
                            : 'left-1/2 -translate-x-1/2 bottom-0 w-[190px] h-[190px] sm:w-[210px] sm:h-[210px]'}`}
              >
                <ImageOff size={30} />
                <span className="text-xs font-medium">No Image</span>
              </div>

              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <div key="standing" className="absolute left-4 sm:left-6 bottom-0 w-[195px] sm:w-[220px] -rotate-2 drop-shadow-2xl">
                    <motion.div
                      initial={{ opacity: 0, x: -90 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -90 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src="/assets/hero-standing.png"
                        alt="Faiz Ramdhan"
                        width={400}
                        height={600}
                        className="w-full h-auto object-contain"
                        priority
                      />
                    </motion.div>
                  </div>
                ) : (
                  <div key="sitting" className="absolute top-[-28px] sm:top-[-30px] left-1/2 -translate-x-1/2 w-[190px] sm:w-[215px] drop-shadow-2xl">
                    <motion.div
                      initial={{ opacity: 0, y: -110 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -110 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src="/assets/hero-sitting.png"
                        alt="Faiz Ramdhan"
                        width={400}
                        height={600}
                        className="w-full h-auto object-contain"
                        priority
                      />
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute bottom-2 right-2 liquid-glass-pill text-primary px-4 py-2 text-xs font-semibold
                         flex items-center gap-1.5 z-10"
              >
                <Sparkles size={13} /> Available for work
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 space-y-5 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 liquid-glass-pill text-primary text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              {content.heroTitle}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-foreground/95">{content.heroSubtitle}</span>{' '}
              <span className="text-primary">Azmalia</span>
            </h1>

            <p className="text-base sm:text-lg text-foreground/60 font-light">
              Web Developer &amp; Creative Problem Solver
            </p>

            <p className="text-base text-foreground/55 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {content.heroDescription}
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-2xl shadow-lg shadow-primary/20"
              >
                Get In Touch
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('about')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 liquid-glass rounded-2xl text-foreground font-semibold"
              >
                Learn More
              </motion.button>
            </div>

            <div className="flex items-center gap-2 pt-3 justify-center lg:justify-start">
              {socials.map((social, index) => (
                <motion.a
                  key={social.alt}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={social.alt}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-primary"
                >
                  <social.Icon size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
