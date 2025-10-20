'use client';

import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { theme } = useTheme();

  const socialLinks = [
    { href: 'https://github.com/faizramdhannn', icon: 'github', alt: 'GitHub' },
    { href: 'https://www.linkedin.com/in/faiz-ramdhan-8b1a22389/', icon: 'linkedin', alt: 'LinkedIn' },
    { href: 'https://instagram.com/faizmalia', icon: 'instagram', alt: 'Instagram' },
    { href: 'mailto:faizramdhan17@gmail.com', icon: 'email', alt: 'Email' },
  ];

  return (
    <>
      <section className="flex flex-col md:flex-row justify-center items-center px-5 py-12 gap-10 min-h-[calc(100vh-300px)]">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[10%] border-4 border-[#00a67e]/30 overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="relative w-full h-full"
            >
              <Image
                src={`/assets/profile-${theme === 'light' ? 'light' : 'dark'}.jpeg`}
                alt="Faiz Ramdhan Profile"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-5 max-w-2xl text-center md:text-left">
          <h1 className="text-5xl font-bold leading-tight">
            Hi, I&apos;m <span className="text-[#00a67e]">Faiz Ramdhan</span>
          </h1>
          <h1 className="text-5xl font-bold -mt-4">
            Azmalia
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            Welcome to my little corner of the web! I love crafting solutions and bringing ideas to life. 
            Browse through my projects and feel free to say hello!
          </p>
        </div>
      </section>

      <section className="flex justify-center items-center gap-8 py-8 flex-wrap">
        {socialLinks.map((social) => (
          <a
            key={social.alt}
            href={social.href}
            target={social.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-transparent hover:border-[#00a67e]/40 
                       hover:bg-[#00a67e]/10 transition-all hover:scale-110 duration-300"
          >
            <Image
              src={`/assets/${social.icon}-${theme === 'light' ? 'light' : 'dark'}.png`}
              alt={social.alt}
              width={30}
              height={30}
              className="opacity-80 hover:opacity-100 transition-opacity duration-200"
            />
          </a>
        ))}
      </section>
    </>
  );
}