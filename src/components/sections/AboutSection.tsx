'use client';

import { motion } from 'framer-motion';
import { MapPin, Home as HomeIcon, Briefcase } from 'lucide-react';
import type { Content } from '@/lib/content';

export default function AboutSection({ content }: { content: Content }) {
  return (
    <section id="about" className="relative px-6 md:px-8 py-14 md:py-16">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-mono text-xs font-medium uppercase tracking-wider mb-3 block">
            Get To Know Me
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            About <span className="text-primary">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-3xl p-6 md:p-8"
          >
            <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Introduction</h3>
            <p className="text-base text-foreground/65 leading-relaxed">{content.aboutDescription}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="liquid-glass rounded-3xl p-6 md:p-8"
          >
            <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Background</h3>
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
      </div>
    </section>
  );
}
