'use client';

import { motion } from 'framer-motion';
import {
  Globe, LayoutDashboard, BarChart3, Boxes, ShoppingCart, Workflow,
} from 'lucide-react';

const SERVICES = [
  { name: 'Company Website', description: 'Profile & landing pages that represent your brand professionally.', icon: Globe },
  { name: 'Dashboard', description: 'Internal tools and admin panels to manage data with ease.', icon: LayoutDashboard },
  { name: 'Analytics', description: 'Reporting & data visualization to support business decisions.', icon: BarChart3 },
  { name: 'ERP System', description: 'Custom systems to streamline operations end-to-end.', icon: Boxes },
  { name: 'Shopify Management', description: 'Store setup, theme customization, and ongoing maintenance.', icon: ShoppingCart },
  { name: 'Automation', description: 'Workflow automation to save time on repetitive tasks.', icon: Workflow },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative px-6 md:px-8 py-14 md:py-16">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-xs font-medium uppercase tracking-wider mb-3 block">
            What I Can Build
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Services &amp; <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-foreground/55 mt-3 max-w-xl mx-auto text-sm md:text-base">
            More than portfolio sites: I build practical tools businesses actually use.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className="liquid-glass rounded-2xl p-5"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3.5">
                <service.icon className="text-primary" size={19} />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">{service.name}</h3>
              <p className="text-sm text-foreground/55 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
