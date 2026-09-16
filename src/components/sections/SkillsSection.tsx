'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiGit, SiGithub, SiPostgresql, SiGooglesheets, SiFramer, SiVercel,
} from 'react-icons/si';

interface Skill {
  name: string;
  Icon: IconType;
  /** Brand hex color, or 'currentColor' for logos that are just black/white and should follow the theme. */
  color: string;
}

const SKILLS: Skill[] = [
  { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', Icon: SiCss, color: '#1572B6' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', Icon: SiNextdotjs, color: 'currentColor' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'GitHub', Icon: SiGithub, color: 'currentColor' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Google Sheets', Icon: SiGooglesheets, color: '#34A853' },
  { name: 'Framer Motion', Icon: SiFramer, color: 'currentColor' },
  { name: 'Vercel', Icon: SiVercel, color: 'currentColor' },
];

function SkillTile({ name, Icon, color }: Skill) {
  return (
    <div
      title={name}
      className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center
               bg-foreground/[0.04] border border-foreground/10
               text-foreground/80 hover:scale-105 hover:text-foreground hover:bg-foreground/[0.07] transition-[transform,background-color]"
    >
      <Icon size={32} style={{ color }} />
    </div>
  );
}

const AUTO_SCROLL_SPEED = 0.7; // px per frame, ~42px/s
const RESUME_DELAY = 2200; // ms of inactivity before auto-scroll resumes

function SkillMarquee({ skills }: { skills: Skill[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    const loop = () => {
      if (!pausedRef.current) {
        const singleSetWidth = el.scrollWidth / 2;
        el.scrollLeft += AUTO_SCROLL_SPEED;
        if (el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') {
      // Touch/pen: let the browser's native swipe-scroll handle it.
      pause();
      return;
    }
    draggingRef.current = true;
    pause();
    dragStartX.current = e.clientX;
    dragStartScroll.current = trackRef.current?.scrollLeft ?? 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !trackRef.current) return;
    trackRef.current.scrollLeft = dragStartScroll.current - (e.clientX - dragStartX.current);
  };

  const endInteraction = () => {
    draggingRef.current = false;
    scheduleResume();
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endInteraction}
      onPointerLeave={endInteraction}
      onPointerCancel={endInteraction}
      onTouchEnd={endInteraction}
      className="hide-scrollbar overflow-x-auto cursor-grab active:cursor-grabbing select-none
               [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      style={{ touchAction: 'pan-x' }}
    >
      <div className="flex gap-4 w-max py-1">
        {[...skills, ...skills].map((skill, i) => (
          <SkillTile key={`${skill.name}-${i}`} {...skill} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative px-6 md:px-8 py-14 md:py-16">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-xs font-medium uppercase tracking-wider mb-3 block">
            What I Work With
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Technical <span className="text-primary">Skills</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SkillMarquee skills={SKILLS} />
        </motion.div>
      </div>
    </section>
  );
}
