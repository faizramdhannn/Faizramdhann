'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from '@/components/CountUp';

const TECH_COUNT = 14; // matches the Technical Skills marquee

export default function StatsSection() {
  const [projects, setProjects] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setProjects(Array.isArray(d) ? d.length : 0))
      .catch(() => setProjects(0));
  }, []);

  const stats = [
    { value: projects, label: 'Projects shipped' },
    { value: TECH_COUNT, label: 'Technologies used' },
    { value: 2, suffix: '+', label: 'Years in e-commerce & retail ops' },
  ];

  return (
    <section className="px-6 md:px-8 py-10">
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-3 md:gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="liquid-glass rounded-2xl py-5 px-3 text-center"
          >
            <div className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
              {s.value === null ? '–' : <CountUp to={s.value} suffix={s.suffix} />}
            </div>
            <div className="mt-1.5 text-[11px] md:text-sm text-foreground/55 leading-tight">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
