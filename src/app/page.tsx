'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

interface Content {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  skillsTitle: string;
  contactTitle: string;
  contactDescription: string;
}

export default function Home() {
  const { theme } = useTheme();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setContent({
        heroTitle: "Hi, I'm",
        heroSubtitle: "Faiz Ramdhan",
        heroDescription: "Welcome to my portfolio! I'm passionate about creating innovative solutions and bringing ideas to life through code. Explore my projects and let's connect!",
        aboutTitle: "About Me",
        aboutDescription: "Hello! I'm passionate about learning new technologies.",
        skillsTitle: "Technical Skills",
        contactTitle: "Get In Touch",
        contactDescription: "Have a project in mind or want to collaborate? Feel free to reach out!"
      });
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { href: 'https://github.com/faizramdhannn', icon: 'github', alt: 'GitHub' },
    { href: 'https://www.linkedin.com/in/faiz-ramdhan-8b1a22389/', icon: 'linkedin', alt: 'LinkedIn' },
    { href: 'https://instagram.com/faizmalia', icon: 'instagram', alt: 'Instagram' },
    { href: 'mailto:faizramdhan17@gmail.com', icon: 'email', alt: 'Email' },
  ];

  const skills = ['Spreadsheet', 'HTML', 'CSS', 'JavaScript', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-[#00a67e]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative px-8 py-24">
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row justify-between items-center gap-16 xl:gap-24"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="relative w-[320px] h-[320px] xl:w-[420px] xl:h-[420px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={`/assets/profile-${theme === 'light' ? 'light' : 'dark'}.jpeg`}
                      alt="Faiz Ramdhan Profile"
                      width={420}
                      height={420}
                      className="rounded-[20%] border-[6px] border-[#00a67e]/40 shadow-2xl 
                               hover:scale-[1.02] transition-all duration-500 
                               hover:shadow-[0_0_60px_rgba(0,166,126,0.5)] 
                               hover:border-[#00a67e]/60
                               object-cover w-full h-full"
                      priority
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/profile.jpeg';
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-8 max-w-3xl text-center lg:text-left"
            >
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1]">
                  {content?.heroTitle || "Hi, I'm"}{' '}
                  <span className="text-[#00a67e] block sm:inline">
                    {content?.heroSubtitle || "Faiz Ramdhan"}
                  </span>
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold">
                  Azmalia
                </h1>
              </div>
              
              <p className="text-xl sm:text-2xl lg:text-3xl opacity-90 leading-relaxed font-light">
                {content?.heroDescription || 
                  "Welcome to my portfolio! I'm passionate about creating innovative solutions and bringing ideas to life through code."}
              </p>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-row justify-center lg:justify-start items-center gap-6 mt-20"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.alt}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-5 rounded-2xl bg-[#00a67e]/5 border-2 border-[#00a67e]/30
                         hover:border-[#00a67e] hover:bg-[#00a67e]/10 
                         transition-all duration-300
                         hover:shadow-[0_8px_30px_rgba(0,166,126,0.3)]"
              >
                <Image
                  src={`/assets/${social.icon}-${theme === 'light' ? 'light' : 'dark'}.png`}
                  alt={social.alt}
                  width={32}
                  height={32}
                  className="w-8 h-8 opacity-90 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/assets/${social.icon}.png`;
                  }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={() => scrollToSection('about')}
          className="absolute bottom-12 cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[#00a67e] text-base font-semibold group-hover:text-[#00b894] transition-colors">
              Scroll Down
            </span>
            <div className="w-6 h-10 border-2 border-[#00a67e] rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-[#00a67e] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex flex-col justify-center items-center relative px-8 py-24">
        <div className="max-w-[1200px] mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center mb-20"
          >
            About <span className="text-[#00a67e]">Me</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-10"
          >
            <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] p-10 lg:p-12 rounded-3xl 
                          border-2 border-[#00a67e]/20 hover:border-[#00a67e]/50 
                          transition-all duration-500 shadow-2xl
                          hover:shadow-[0_20px_50px_rgba(0,166,126,0.2)]">
              <h3 className="text-3xl lg:text-4xl font-bold text-[#00a67e] mb-6">
                Introduction
              </h3>
              <p className="text-xl lg:text-2xl leading-relaxed opacity-90 font-light">
                {content?.aboutDescription || 
                  "Hello! I'm passionate about learning new technologies, creating useful solutions, and finding joy in every challenge."}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] p-10 lg:p-12 rounded-3xl 
                          border-2 border-[#00a67e]/20 hover:border-[#00a67e]/50 
                          transition-all duration-500 shadow-2xl
                          hover:shadow-[0_20px_50px_rgba(0,166,126,0.2)]">
              <h3 className="text-3xl lg:text-4xl font-bold text-[#00a67e] mb-6">
                Background
              </h3>
              <div className="space-y-5 text-xl lg:text-2xl font-light">
                <div className="flex items-center gap-4">
                  <span className="text-[#00a67e] text-3xl">📍</span>
                  <span><span className="font-semibold">Born:</span> Ciamis, 2001</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#00a67e] text-3xl">🏠</span>
                  <span><span className="font-semibold">Based in:</span> Bandung, Indonesia</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#00a67e] text-3xl">💼</span>
                  <span><span className="font-semibold">Role:</span> Web Developer</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onClick={() => scrollToSection('skills')}
          className="absolute bottom-12 cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[#00a67e] text-base font-semibold">See Skills</span>
            <div className="w-6 h-10 border-2 border-[#00a67e] rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-[#00a67e] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex flex-col justify-center items-center relative px-8 py-24">
        <div className="max-w-[1200px] mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center mb-20"
          >
            Technical <span className="text-[#00a67e]">Skills</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0d1117] to-[#161b22] p-12 lg:p-16
                     rounded-3xl border-2 border-[#00a67e]/20 shadow-2xl"
          >
            <div className="flex flex-wrap gap-5 justify-center">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -5 }}
                  className="bg-gradient-to-r from-[#00a67e]/20 to-[#00b894]/20 text-[#00a67e] 
                           px-8 py-4 rounded-2xl font-semibold text-lg lg:text-xl
                           border-2 border-[#00a67e]/40 hover:border-[#00a67e] 
                           hover:shadow-[0_8px_30px_rgba(0,166,126,0.4)]
                           transition-all duration-300 cursor-pointer"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onClick={() => scrollToSection('contact')}
          className="absolute bottom-12 cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[#00a67e] text-base font-semibold">Contact Me</span>
            <div className="w-6 h-10 border-2 border-[#00a67e] rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-[#00a67e] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-8 py-24">
        <div className="max-w-[1000px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-10"
          >
            Get In <span className="text-[#00a67e]">Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl opacity-90 mb-20 leading-relaxed font-light max-w-3xl mx-auto"
          >
            {content?.contactDescription || 
              "Have a project in mind or want to collaborate? Feel free to reach out!"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-8 justify-center"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.alt}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-[#0d1117] to-[#161b22] p-10 rounded-3xl 
                         border-2 border-[#00a67e]/30 hover:border-[#00a67e] 
                         transition-all duration-300 shadow-2xl
                         hover:shadow-[0_20px_50px_rgba(0,166,126,0.4)]
                         flex flex-col items-center gap-5 min-w-[180px]"
              >
                <Image
                  src={`/assets/${social.icon}-${theme === 'light' ? 'light' : 'dark'}.png`}
                  alt={social.alt}
                  width={60}
                  height={60}
                  className="w-16 h-16 opacity-90 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/assets/${social.icon}.png`;
                  }}
                />
                <p className="text-[#00a67e] font-semibold text-xl">{social.alt}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}