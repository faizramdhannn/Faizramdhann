'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types/project';
import { motion } from 'framer-motion';
import {
  ArrowRight, Globe, LayoutDashboard, BarChart3, Boxes, ShoppingCart, Workflow, Code2,
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const CATEGORY_ICON: Record<string, typeof Code2> = {
  'E-commerce': ShoppingCart,
  Dashboard: LayoutDashboard,
  POS: ShoppingCart,
  Logic: Workflow,
  Service: Globe,
  'ERP System': Boxes,
  Analytics: BarChart3,
};

// Older sheet rows still point at this removed placeholder file; treat it as "no image".
const LEGACY_PLACEHOLDER = '/assets/profile.jpeg';

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : project.technologies.split(',').map(t => t.trim());

  const hasImage = Boolean(project.image) && project.image !== LEGACY_PLACEHOLDER;
  const CategoryIcon = CATEGORY_ICON[project.category] ?? Code2;

  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group liquid-glass rounded-3xl overflow-hidden h-full flex flex-col"
    >
      <div className="relative w-full h-52 overflow-hidden">
        {hasImage ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent
                        flex items-center justify-center">
            <CategoryIcon className="text-primary/40 group-hover:text-primary/60 transition-colors" size={44} />
          </div>
        )}
        <div className="absolute top-3.5 right-3.5">
          <span className="px-3.5 py-1.5 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold rounded-xl">
            {project.category}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-5 space-y-3">
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {project.name}
        </h3>

        <p className="text-sm text-foreground/55 line-clamp-3 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-2.5 py-1 bg-foreground/5 text-foreground/40 text-xs font-semibold rounded-lg">
              +{technologies.length - 4}
            </span>
          )}
        </div>

        <div className="pt-3 border-t border-foreground/5 flex items-center justify-between text-primary">
          <span className="text-sm font-semibold">View Details</span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <Link href={`/project/${project.id}`} className="block h-full">
      {CardContent}
    </Link>
  );
}
