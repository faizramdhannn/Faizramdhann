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
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[20%] border-4 border-[#00a67e]/30 overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_40px_rgba(0,166,126,0.4)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
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

        <div className="flex flex-col gap-6 max-w-2xl text-center md:text-left">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-2">
              Hi, I&apos;m <span className="text-[#00a67e]">Faiz Ramdhan</span>
            </h1>
            <h1 className="text-5xl md:text-6xl font-bold">
              Azmalia
            </h1>
          </div>
          <p className="text-xl opacity-90 leading-relaxed">
            Welcome to my portfolio! I&apos;m passionate about creating innovative solutions 
            and bringing ideas to life through code. Explore my projects and let&apos;s connect!
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
            className="p-4 rounded-2xl border-2 border-transparent hover:border-[#00a67e]/50 
                       hover:bg-[#00a67e]/10 transition-all hover:scale-110 duration-300
                       hover:shadow-[0_0_20px_rgba(0,166,126,0.3)]"
          >
            <Image
              src={`/assets/${social.icon}-${theme === 'light' ? 'light' : 'dark'}.png`}
              alt={social.alt}
              width={35}
              height={35}
              className="opacity-80 hover:opacity-100 transition-opacity duration-200"
            />
          </a>
        ))}
      </section>
    </>
  );
}