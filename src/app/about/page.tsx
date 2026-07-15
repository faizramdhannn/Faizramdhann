'use client';

import { motion } from 'framer-motion';
import {
  MapPin, Home as HomeIcon, Briefcase, Code2, BookOpen, Rocket, ArrowRight, Mail,
  Database, Layers, Braces, Palette,
} from 'lucide-react';

export default function About() {
  const skills = [
    { name: 'Spreadsheet', level: 90, category: 'Data' },
    { name: 'HTML', level: 95, category: 'Frontend' },
    { name: 'CSS', level: 92, category: 'Frontend' },
    { name: 'JavaScript', level: 88, category: 'Frontend' },
    { name: 'Next.js', level: 85, category: 'Framework' },
    { name: 'React', level: 87, category: 'Framework' },
    { name: 'TypeScript', level: 83, category: 'Language' },
    { name: 'Tailwind CSS', level: 93, category: 'Styling' }
  ];

  const categoryIcon: Record<string, typeof Code2> = {
    Data: Database,
    Frontend: Code2,
    Framework: Layers,
    Language: Braces,
    Styling: Palette,
  };

  const experiences = [
    {
      title: 'Web Developer',
      period: '2025 - Present',
      description: 'Building modern web applications with Next.js and React',
      icon: Code2
    },
    {
      title: 'Self Learning',
      period: '2021 - 2023',
      description: 'Continuously improving skills through online courses and projects',
      icon: BookOpen
    },
    {
      title: 'Creative Projects',
      period: '2020 - Present',
      description: 'Developing personal projects and experimenting with new technologies',
      icon: Rocket
    }
  ];
  
  return (
    <div className="px-6 md:px-8 py-14 md:py-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-[#00a67e] font-mono text-sm font-medium uppercase tracking-wider mb-4 block">
            Learn More
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-primary">Me</span>
          </h1>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto">
            Passionate developer dedicated to creating exceptional digital experiences
          </p>
        </motion.div>

        {/* Introduction & Background */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative bg-surface/90 p-7 rounded-3xl border border-[#00a67e]/20 
                     hover:border-[#00a67e]/40 transition-all duration-500
                     hover:shadow-2xl hover:shadow-[#00a67e]/10"
          ><h2 className="text-3xl font-bold text-[#00a67e] mb-6 relative">
              Introduction
            </h2>
            <p className="text-base text-foreground/70 leading-relaxed relative">
              Hello! I&apos;m <span className="text-[#00a67e] font-semibold">Faiz Ramdhan Azmalia</span>. 
              I&apos;m passionate about learning new technologies, creating useful solutions, and finding joy in every challenge. 
              For me, every project is an opportunity to make an impact and share creativity with others.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative bg-surface/90 p-7 rounded-3xl border border-[#00a67e]/20 
                     hover:border-[#00a67e]/40 transition-all duration-500
                     hover:shadow-2xl hover:shadow-[#00a67e]/10"
          ><h2 className="text-3xl font-bold text-[#00a67e] mb-6 relative">
              Background
            </h2>
            <div className="space-y-5 text-base text-foreground/70 relative">
              <div className="flex items-start gap-4 group/item hover:text-foreground/90 transition-colors">
                <MapPin className="text-[#00a67e] flex-shrink-0" size={24} />
                <div>
                  <span className="font-semibold text-foreground">Born:</span> Ciamis, 2001
                </div>
              </div>
              <div className="flex items-start gap-4 group/item hover:text-foreground/90 transition-colors">
                <HomeIcon className="text-[#00a67e] flex-shrink-0" size={24} />
                <div>
                  <span className="font-semibold text-foreground">Based in:</span> Bandung, Indonesia
                </div>
              </div>
              <div className="flex items-start gap-4 group/item hover:text-foreground/90 transition-colors">
                <Briefcase className="text-[#00a67e] flex-shrink-0" size={24} />
                <div>
                  <span className="font-semibold text-foreground">Role:</span> Web Developer
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center">
            <span className="text-[#00a67e] font-mono text-sm font-medium uppercase tracking-wider mb-4 block">
              My Journey
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Experience & <span className="text-primary">Growth</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-surface/90 p-8 rounded-3xl border border-[#00a67e]/20 
                         hover:border-[#00a67e]/40 transition-all duration-300
                         hover:shadow-2xl hover:shadow-[#00a67e]/10"
              ><div className="relative space-y-4">
                  <exp.icon className="text-[#00a67e]" size={32} />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-[#00a67e] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-[#00a67e]/80 font-medium mb-3">{exp.period}</p>
                    <p className="text-foreground/60 text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center">
            <span className="text-[#00a67e] font-mono text-sm font-medium uppercase tracking-wider mb-4 block">
              What I Know
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Technical <span className="text-primary">Skills</span>
            </h2>
          </div>

          <div className="relative bg-surface/90 p-8 md:p-7 rounded-3xl border border-[#00a67e]/20
                        shadow-2xl"><div className="relative grid gap-6">
              {skills.map((skill, index) => {
                const Icon = categoryIcon[skill.category] ?? Code2;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#00a67e]/10 border border-[#00a67e]/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="text-[#00a67e]" size={16} />
                        </div>
                        <span className="text-base font-bold text-foreground group-hover:text-[#00a67e] transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs text-foreground/40 font-medium px-2 py-1 rounded-full bg-foreground/5">
                          {skill.category}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-[#00a67e]">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to work <span className="text-[#00a67e]">together?</span>
          </h2>
          <p className="text-base text-foreground/60 mb-8 max-w-2xl mx-auto">
            Let&apos;s create something amazing. Get in touch and let&apos;s discuss your next project.
          </p>
          <motion.a
            href="mailto:faizramdhan17@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary 
                     text-white font-semibold rounded-xl shadow-lg shadow-[#00a67e]/30
                     hover:shadow-xl hover:shadow-[#00a67e]/40 transition-all"
          >
            <Mail size={18} />
            <span>Get In Touch</span>
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}