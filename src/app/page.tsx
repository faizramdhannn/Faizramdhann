'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, MapPin, Home as HomeIcon, Briefcase, ChevronRight,
  Globe, LayoutDashboard, BarChart3, Boxes, ShoppingCart, Workflow,
  Database, Code2, Layers, Braces, Palette,
} from 'lucide-react';

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

// Default content to avoid loading state
const DEFAULT_CONTENT: Content = {
  heroTitle: "Hi, I'm",
  heroSubtitle: "Faiz Ramdhan",
  heroDescription: "Welcome to my portfolio! I'm passionate about creating innovative solutions and bringing ideas to life through code. Explore my projects and let's connect!",
  aboutTitle: "About Me",
  aboutDescription: "Hello! I'm Faiz Ramdhan Azmalia. I'm passionate about learning new technologies, creating useful solutions, and finding joy in every challenge. For me, every project is an opportunity to make an impact and share creativity with others.",
  skillsTitle: "Technical Skills",
  contactTitle: "Get In Touch",
  contactDescription: "Have a project in mind or want to collaborate? Feel free to reach out!"
};

export default function Home() {
  const { theme } = useTheme();
  const [content, setContent] = useState<Content>(DEFAULT_CONTENT);

  useEffect(() => {
    // Cache content in sessionStorage
    const cachedContent = sessionStorage.getItem('portfolio-content');
    
    if (cachedContent) {
      try {
        setContent(JSON.parse(cachedContent));
      } catch {
        console.error('Failed to parse cached content');
      }
    } else {
      // Only fetch if not cached
      fetchContent();
    }
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
        sessionStorage.setItem('portfolio-content', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const socialLinks = useMemo(() => [
    { href: 'https://github.com/faizramdhannn', icon: 'github', alt: 'GitHub', label: '@faizramdhannn' },
    { href: 'https://www.linkedin.com/in/faiz-ramdhan-8b1a22389/', icon: 'linkedin', alt: 'LinkedIn', label: 'Faiz Ramdhan' },
    { href: 'https://instagram.com/faizmalia', icon: 'instagram', alt: 'Instagram', label: '@faizmalia' },
    { href: 'mailto:faizramdhan17@gmail.com', icon: 'email', alt: 'Email', label: 'faizramdhan17@gmail.com' },
  ], []);

  const skills = useMemo(() => [
    { name: 'Spreadsheet', category: 'Data' },
    { name: 'HTML', category: 'Frontend' },
    { name: 'CSS', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'Next.js', category: 'Framework' },
    { name: 'React', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Styling' }
  ], []);

  const categoryIcon: Record<string, typeof Code2> = {
    Data: Database,
    Frontend: Code2,
    Framework: Layers,
    Language: Braces,
    Styling: Palette,
  };

  const services = useMemo(() => [
    { name: 'Company Website', description: 'Profile & landing pages that represent your brand professionally.', icon: Globe },
    { name: 'Dashboard', description: 'Internal tools and admin panels to manage data with ease.', icon: LayoutDashboard },
    { name: 'Analytics', description: 'Reporting & data visualization to support business decisions.', icon: BarChart3 },
    { name: 'ERP System', description: 'Custom systems to streamline operations end-to-end.', icon: Boxes },
    { name: 'Shopify Management', description: 'Store setup, theme customization, and ongoing maintenance.', icon: ShoppingCart },
    { name: 'Automation', description: 'Workflow automation to save time on repetitive tasks.', icon: Workflow },
  ], []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="hero" className="relative px-6 md:px-8 py-20 md:py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            {/* Profile Image - Kiri */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[#00a67e]/20 blur-3xl rounded-full scale-110" />
                
                {/* Image Container */}
                <div className="relative w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] lg:w-[290px] lg:h-[290px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ opacity: 0, rotate: -5 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 5 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={`/assets/profile-${theme === 'light' ? 'light' : 'dark'}.jpeg`}
                        alt="Faiz Ramdhan Profile"
                        width={290}
                        height={290}
                        className="rounded-[30px] border-4 border-[#00a67e]/30 shadow-2xl 
                                 shadow-[#00a67e]/20 hover:border-[#00a67e]/50
                                 transition-all duration-500 object-cover w-full h-full
                                 hover:scale-[1.02]"
                        priority
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        onError={() => {
                          console.log('Image failed to load');
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-4 -right-4 bg-[#00a67e] text-white px-5 py-2.5
                           rounded-2xl shadow-lg font-semibold text-sm
                           border-2 border-white/20 flex items-center gap-1.5"
                >
                  <Sparkles size={14} /> Available for work
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content - Kanan */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 space-y-6 text-center lg:text-left"
            >
              {/* Greeting Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#00a67e]/10 
                         border border-[#00a67e]/30 rounded-full text-[#00a67e] text-sm font-medium"
              >
                <span className="w-2 h-2 bg-[#00a67e] rounded-full animate-pulse" />
                {content.heroTitle}
              </motion.div>

              {/* Name */}
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                >
                  <span className="text-foreground/95">
                    {content.heroSubtitle}
                  </span>
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary"
                >
                  Azmalia
                </motion.h2>
              </div>

              {/* Role */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg sm:text-xl lg:text-2xl text-foreground/70 font-light"
              >
                Web Developer & Creative Problem Solver
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-base lg:text-lg text-foreground/60 leading-relaxed max-w-2xl"
              >
                {content.heroDescription}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
              >
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary 
                           text-white font-semibold rounded-xl shadow-lg shadow-[#00a67e]/30
                           hover:shadow-xl hover:shadow-[#00a67e]/40 transition-all"
                >
                  Get In Touch
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection('about')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-[#00a67e]/30 text-foreground font-semibold 
                           rounded-xl hover:border-[#00a67e] hover:bg-[#00a67e]/10 transition-all"
                >
                  Learn More
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="flex items-center gap-3 pt-4 justify-center lg:justify-start"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.alt}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl border border-[#00a67e]/20 bg-[#00a67e]/5
                             hover:border-[#00a67e]/40 hover:bg-[#00a67e]/10
                             flex items-center justify-center transition-all duration-300
                             hover:shadow-lg hover:shadow-[#00a67e]/20"
                  >
                    <Image
                      src={`/assets/${social.icon}-${theme === 'light' ? 'light' : 'dark'}.png`}
                      alt={social.alt}
                      width={22}
                      height={22}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                      loading="lazy"
                      onError={() => {
                        console.log('Social icon failed to load');
                      }}
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          onClick={() => scrollToSection('about')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-[#00a67e] font-medium uppercase tracking-wider">
              Scroll
            </span>
            <div className="w-5 h-8 border-2 border-[#00a67e]/30 rounded-full flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1 bg-[#00a67e] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative px-6 md:px-8 py-20 md:py-24">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-[#00a67e] font-mono text-sm font-medium uppercase tracking-wider mb-4 block">
              Get To Know Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              About <span className="text-primary">Me</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative bg-surface/90 p-8 md:p-10 rounded-3xl border border-[#00a67e]/20 
                       hover:border-[#00a67e]/40 transition-all duration-500
                       hover:shadow-2xl hover:shadow-[#00a67e]/10"
            ><h3 className="text-2xl md:text-3xl font-bold text-[#00a67e] mb-6 relative">
                Introduction
              </h3>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed relative">
                {content.aboutDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-surface/90 p-8 md:p-10 rounded-3xl border border-[#00a67e]/20 
                       hover:border-[#00a67e]/40 transition-all duration-500
                       hover:shadow-2xl hover:shadow-[#00a67e]/10"
            ><h3 className="text-2xl md:text-3xl font-bold text-[#00a67e] mb-6 relative">
                Background
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-foreground/70 relative">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#00a67e] flex-shrink-0" size={24} />
                  <div>
                    <span className="font-semibold text-foreground">Born:</span> Ciamis, 2001
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <HomeIcon className="text-[#00a67e] flex-shrink-0" size={24} />
                  <div>
                    <span className="font-semibold text-foreground">Based in:</span> Bandung, Indonesia
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Briefcase className="text-[#00a67e] flex-shrink-0" size={24} />
                  <div>
                    <span className="font-semibold text-foreground">Role:</span> Web Developer
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => scrollToSection('services')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-[#00a67e] font-medium uppercase tracking-wider">
              Services
            </span>
            <div className="w-5 h-8 border-2 border-[#00a67e]/30 rounded-full flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1 bg-[#00a67e] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative px-6 md:px-8 py-20 md:py-24">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#00a67e] font-mono text-sm font-medium uppercase tracking-wider mb-4 block">
              What I Can Build
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Services & <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-foreground/60 mt-4 max-w-2xl mx-auto">
              Beyond portfolio sites — I build practical tools businesses actually use.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group bg-surface/90 p-6 rounded-2xl border border-[#00a67e]/20
                         hover:border-[#00a67e]/40 transition-all duration-300
                         hover:shadow-lg hover:shadow-[#00a67e]/10"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00a67e]/10 border border-[#00a67e]/25
                             flex items-center justify-center mb-4
                             group-hover:bg-[#00a67e]/15 transition-colors">
                  <service.icon className="text-[#00a67e]" size={22} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1.5">{service.name}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => scrollToSection('skills')}
          className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-[#00a67e] font-medium uppercase tracking-wider">
              Skills
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative px-6 md:px-8 py-20 md:py-24">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-[#00a67e] font-mono text-sm font-medium uppercase tracking-wider mb-4 block">
              What I Work With
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Technical <span className="text-primary">Skills</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-surface/90 p-10 md:p-14 rounded-3xl border border-[#00a67e]/20
                     shadow-2xl"
          ><div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => {
                const Icon = categoryIcon[skill.category] ?? Code2;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative bg-[#00a67e]/[0.07]
                             p-6 rounded-2xl border border-[#00a67e]/30
                             hover:border-[#00a67e] hover:bg-[#00a67e]/15
                             transition-all duration-300 cursor-pointer
                             hover:shadow-lg hover:shadow-[#00a67e]/20"
                  >
                    <div className="text-center space-y-2">
                      <Icon className="mx-auto text-[#00a67e] group-hover:scale-110 transition-transform" size={22} />
                      <p className="text-base md:text-lg font-bold text-[#00a67e]">
                        {skill.name}
                      </p>
                      <p className="text-xs text-foreground/50 font-medium">
                        {skill.category}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => scrollToSection('contact')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-[#00a67e] font-medium uppercase tracking-wider">
              Contact
            </span>
            <div className="w-5 h-8 border-2 border-[#00a67e]/30 rounded-full flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1 bg-[#00a67e] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative px-6 md:px-8 py-20 md:py-24">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#00a67e] font-mono text-sm font-medium uppercase tracking-wider mb-4 block">
              Let&apos;s Connect
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
              {content.contactDescription}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.alt}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-surface/90 p-8 rounded-3xl border border-[#00a67e]/20 
                         hover:border-[#00a67e]/40 transition-all duration-300
                         hover:shadow-2xl hover:shadow-[#00a67e]/20"
              ><div className="relative flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl border border-[#00a67e]/30 bg-[#00a67e]/5
                               flex items-center justify-center flex-shrink-0
                               group-hover:border-[#00a67e] group-hover:bg-[#00a67e]/10 
                               transition-all duration-300">
                    <Image
                      src={`/assets/${social.icon}-${theme === 'light' ? 'light' : 'dark'}.png`}
                      alt={social.alt}
                      width={32}
                      height={32}
                      className="opacity-80 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                      onError={() => {
                        console.log('Social icon failed to load');
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-[#00a67e] font-bold text-lg mb-1 group-hover:text-[#00d9a5] transition-colors">
                      {social.alt}
                    </p>
                    <p className="text-foreground/60 text-sm truncate group-hover:text-foreground/80 transition-colors">
                      {social.label}
                    </p>
                  </div>
                  
                  <ChevronRight
                    size={20}
                    className="text-[#00a67e]/50 group-hover:text-[#00a67e]
                             group-hover:translate-x-1 transition-all flex-shrink-0"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}