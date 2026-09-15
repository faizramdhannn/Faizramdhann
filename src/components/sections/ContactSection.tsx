'use client';

import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, InstagramIcon, EmailIcon } from '@/components/icons';
import type { Content } from '@/lib/content';

const SOCIAL_LINKS = [
  { href: 'https://github.com/faizramdhannn', Icon: GithubIcon, alt: 'GitHub' },
  { href: 'https://www.linkedin.com/in/faiz-ramdhan-8b1a22389/', Icon: LinkedinIcon, alt: 'LinkedIn' },
  { href: 'https://instagram.com/faizmalia', Icon: InstagramIcon, alt: 'Instagram' },
  { href: 'mailto:faizramdhan17@gmail.com', Icon: EmailIcon, alt: 'Email' },
];

export default function ContactSection({ content }: { content: Content }) {
  return (
    <section id="contact" className="relative px-6 md:px-8 py-14 md:py-16">
      <div className="max-w-2xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-mono text-xs font-medium uppercase tracking-wider mb-3 block">
            Let&apos;s Connect
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-base text-foreground/55 max-w-xl mx-auto mb-10">{content.contactDescription}</p>
        </motion.div>

        <div className="flex items-center justify-center gap-3">
          {SOCIAL_LINKS.map((social, index) => (
            <motion.a
              key={social.alt}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={social.alt}
              title={social.alt}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="w-14 h-14 rounded-2xl liquid-glass flex items-center justify-center text-primary"
            >
              <social.Icon size={22} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
