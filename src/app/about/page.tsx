'use client';

import { motion } from 'framer-motion';
import {
  MapPin, Home as HomeIcon, Briefcase, ArrowRight, Mail, ShoppingCart, BarChart3, GraduationCap,
} from 'lucide-react';
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiGit, SiGithub, SiPostgresql, SiGooglesheets, SiFramer, SiVercel,
} from 'react-icons/si';

// Same stack shown on the home page's Technical Skills marquee.
const SKILLS = [
  { name: 'HTML5', what: 'Semantic, accessible markup for fast, well-structured pages.', Icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', what: 'Responsive layouts and styling with Flexbox and Grid.', Icon: SiCss, color: '#1572B6' },
  { name: 'JavaScript', what: 'Interactive UI logic and client-side data handling.', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', what: 'Type-safe code that catches bugs before they ship.', Icon: SiTypescript, color: '#3178C6' },
  { name: 'React', what: 'Component-based interfaces with hooks and clean state management.', Icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', what: 'Full-stack React apps with routing, API routes, and SSR.', Icon: SiNextdotjs, color: 'currentColor' },
  { name: 'Tailwind CSS', what: 'Fast, consistent UI styling with utility classes.', Icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'Node.js', what: 'Server-side logic and REST API endpoints.', Icon: SiNodedotjs, color: '#339933' },
  { name: 'Git', what: 'Version control, branching, and safe collaborative workflows.', Icon: SiGit, color: '#F05032' },
  { name: 'GitHub', what: 'Code hosting, pull requests, and CI/CD pipelines.', Icon: SiGithub, color: 'currentColor' },
  { name: 'PostgreSQL', what: 'Relational database design and SQL queries.', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Google Sheets', what: 'Spreadsheet-backed apps and Apps Script automation.', Icon: SiGooglesheets, color: '#34A853' },
  { name: 'Framer Motion', what: 'Smooth, physics-based animations for modern UI.', Icon: SiFramer, color: 'currentColor' },
  { name: 'Vercel', what: 'Deploying and hosting production web apps.', Icon: SiVercel, color: 'currentColor' },
];

const EXPERIENCES = [
  {
    title: 'Retail Performance & Control Staff',
    company: 'torch.id (PT. Mahanagari Nusantara)',
    period: 'Jan 2026 - Present',
    icon: BarChart3,
    points: [
      'Analyze sales performance data across retail channels to identify trends and support operational decisions',
      'Conduct stock audits and maintain inventory accuracy through ERP monitoring and reconciliation',
      'Build and maintain internal BI dashboards for real-time store performance visibility',
    ],
  },
  {
    title: 'Admin Webstore',
    company: 'torch.id (PT. Mahanagari Nusantara)',
    period: 'Oct 2024 - Dec 2025',
    icon: ShoppingCart,
    points: [
      'Managed daily Shopify webstore operations including product updates, pricing, and catalog organization',
      'Monitored inventory accuracy using ERP systems and coordinated order fulfillment with logistics partners',
      'Prepared sales and inventory reports to support operational decision-making',
    ],
  },
];

const EDUCATION = [
  { school: 'hackkarier.work', program: 'Fullstack Developer Bootcamp', period: 'Oct 2025 - Dec 2025' },
  { school: 'UIN Bandung', program: 'Bachelor of Islamic Guidance and Counseling', period: 'Oct 2020 - Nov 2024' },
  { school: 'UNINUS Bandung', program: 'Master in Educational Administration', period: 'Jan 2025 - Aug 2026' },
];

export default function About() {
  return (
    <div className="px-6 md:px-8 py-14 md:py-16">
      <div className="max-w-5xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-primary font-mono text-xs font-medium uppercase tracking-wider mb-3 block">
            Learn More
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h1>
          <p className="text-base text-foreground/55 max-w-xl mx-auto">
            Passionate developer dedicated to creating exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-3xl p-6 md:p-7"
          >
            <h2 className="text-xl font-bold text-primary mb-4">Introduction</h2>
            <p className="text-base text-foreground/65 leading-relaxed">
              Hello! I&apos;m <span className="text-primary font-semibold">Faiz Ramdhan Azmalia</span>.
              I&apos;m passionate about learning new technologies, creating useful solutions, and finding joy in every challenge.
              For me, every project is an opportunity to make an impact and share creativity with others.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="liquid-glass rounded-3xl p-6 md:p-7"
          >
            <h2 className="text-xl font-bold text-primary mb-4">Background</h2>
            <div className="space-y-4 text-base text-foreground/65">
              <div className="flex items-start gap-3.5">
                <MapPin className="text-primary shrink-0 mt-0.5" size={19} />
                <div><span className="font-semibold text-foreground">Born:</span> Ciamis, 2001</div>
              </div>
              <div className="flex items-start gap-3.5">
                <HomeIcon className="text-primary shrink-0 mt-0.5" size={19} />
                <div><span className="font-semibold text-foreground">Based in:</span> Bandung, Indonesia</div>
              </div>
              <div className="flex items-start gap-3.5">
                <Briefcase className="text-primary shrink-0 mt-0.5" size={19} />
                <div><span className="font-semibold text-foreground">Role:</span> Web Developer</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <span className="text-primary font-mono text-xs font-medium uppercase tracking-wider mb-3 block">
              My Journey
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Experience &amp; <span className="text-primary">Growth</span>
            </h2>
          </div>

          <div className="space-y-4">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="liquid-glass rounded-3xl p-6 md:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <exp.icon className="text-primary" size={21} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                      <span className="text-sm text-primary/80 font-medium">{exp.period}</span>
                    </div>
                    <p className="text-sm text-foreground/50 font-medium mb-3">{exp.company}</p>
                    <ul className="space-y-1.5">
                      {exp.points.map((point) => (
                        <li key={point} className="text-sm text-foreground/60 leading-relaxed flex gap-2.5">
                          <span className="text-primary/60 shrink-0">&bull;</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <span className="text-primary font-mono text-xs font-medium uppercase tracking-wider mb-3 block">
              Continuous Learning
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Education &amp; <span className="text-primary">Training</span>
            </h2>
          </div>

          <div className="liquid-glass rounded-3xl p-6 md:p-7 space-y-5">
            {EDUCATION.map((edu, index) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start gap-3.5"
              >
                <GraduationCap className="text-primary shrink-0 mt-0.5" size={19} />
                <div className="flex-1 flex flex-wrap items-baseline justify-between gap-x-3">
                  <div>
                    <span className="font-semibold text-foreground">{edu.school}</span>
                    <span className="text-foreground/55 text-sm"> - {edu.program}</span>
                  </div>
                  <span className="text-sm text-primary/80 font-medium shrink-0">{edu.period}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <span className="text-primary font-mono text-xs font-medium uppercase tracking-wider mb-3 block">
              What I Know
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Technical <span className="text-primary">Skills</span>
            </h2>
          </div>

          <div className="space-y-3">
            {SKILLS.map((skill, index) => {
              const Icon = skill.Icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  whileHover={{ x: 3 }}
                  className="liquid-glass rounded-2xl p-4 md:p-5 flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0">
                    <Icon size={22} style={{ color: skill.color }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-foreground">{skill.name}</h3>
                    <p className="text-sm text-foreground/55">{skill.what}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="liquid-glass rounded-3xl text-center py-14 px-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to work <span className="text-primary">together?</span>
          </h2>
          <p className="text-base text-foreground/55 mb-7 max-w-xl mx-auto">
            Let&apos;s create something amazing. Get in touch and let&apos;s discuss your next project.
          </p>
          <motion.a
            href="mailto:faizramdhan17@gmail.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-2xl shadow-lg shadow-primary/20"
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
