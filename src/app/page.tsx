'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="flex flex-col md:flex-row justify-center items-center px-5 py-12 gap-10 min-h-[calc(100vh-300px)]">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[10%] border-4 border-[#00a67e]/30 dark:border-[#00a67e]/20 overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <Image
            src="/assets/profile.jpeg"
            alt="Profile"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-5 max-w-2xl text-center md:text-left">
          <h1 className="text-5xl font-bold leading-tight">
            Hi, I&apos;m <span className="text-[#00a67e]">Faiz Ramdhan</span>
          </h1>
          <h1 className="text-5xl font-bold -mt-4">Azmalia</h1>
          <h3 className="text-lg opacity-80 leading-relaxed">
            Welcome to my little corner of the web! I love crafting solutions and bringing ideas to life. 
            Browse through my projects and feel free to say hello!
          </h3>
        </div>
      </section>

      <section className="flex justify-center items-center gap-8 py-8 flex-wrap">
        {[
          { href: 'https://github.com/Naisss-17', icon: 'github', alt: 'GitHub' },
          { href: 'https://www.linkedin.com/in/faiz-ramdhan-8b1a22389/', icon: 'linkedin', alt: 'LinkedIn' },
          { href: 'https://instagram.com/yourusername', icon: 'instagram', alt: 'Instagram' },
          { href: 'mailto:faizramdhan17@gmail.com', icon: 'email', alt: 'Email' },
        ].map((social) => (
           <a
            key={social.alt}
            href={social.href}
            target={social.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-transparent hover:border-[#00a67e]/40 hover:bg-[#00a67e]/10 transition-all hover:scale-110 duration-300"
          >
            <Image
              src={`/assets/${social.icon}-${isLight ? 'light' : 'dark'}.png`}
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