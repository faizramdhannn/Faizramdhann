'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowUpRight, CheckCircle2, Globe, LayoutDashboard, BarChart3, Boxes,
  ShoppingCart, Workflow, Code2, Layers,
} from 'lucide-react';
import type { Project } from '@/types/project';

const CATEGORY_ICON: Record<string, typeof Code2> = {
  'E-commerce': ShoppingCart,
  Dashboard: LayoutDashboard,
  POS: ShoppingCart,
  Logic: Workflow,
  Service: Globe,
  'ERP System': Boxes,
  Analytics: BarChart3,
  Website: Globe,
};

const LEGACY_PLACEHOLDER = '/assets/profile.jpeg';

export default function ProjectDetail() {
  const params = useParams();
  const id = Number(params.id);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data: Project[] = await response.json();
          const match = data.find((p) => p.id === id);
          if (match) {
            setProject(match);
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full"
        />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="px-6 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Project Not Found</h1>
        <p className="text-foreground/55">This project doesn&apos;t exist or may have been removed.</p>
        <Link href="/project" className="inline-flex items-center gap-2 text-primary font-semibold">
          <ArrowLeft size={18} /> Back to Projects
        </Link>
      </div>
    );
  }

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : project.technologies.split(',').map((t) => t.trim()).filter(Boolean);

  const features = project.features ?? [];
  const displayImage = project.detailImage || project.image;
  const hasImage = Boolean(displayImage) && displayImage !== LEGACY_PLACEHOLDER;
  const CategoryIcon = CATEGORY_ICON[project.category] ?? Code2;

  return (
    <div className="px-6 md:px-8 py-14 md:py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/project" className="inline-flex items-center gap-2 text-sm text-foreground/55 hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="liquid-glass rounded-3xl overflow-hidden"
        >
          <div className="relative w-full h-64 md:h-80">
            {hasImage ? (
              <Image src={displayImage} alt={project.name} fill className="object-cover object-top" priority />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent flex items-center justify-center">
                <CategoryIcon className="text-primary/40" size={64} />
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
                  <CategoryIcon size={13} /> {project.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{project.name}</h1>
              </div>

              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white font-semibold rounded-2xl shadow-lg shadow-primary/20 shrink-0"
                >
                  Visit Live Site <ArrowUpRight size={17} />
                </motion.a>
              )}
            </div>

            <p className="text-base text-foreground/65 leading-relaxed">{project.description}</p>

            {technologies.length > 0 && (
              <div>
                <h2 className="flex items-center gap-2 text-sm font-bold text-foreground/70 uppercase tracking-wider mb-3">
                  <Layers size={15} className="text-primary" /> Built With
                </h2>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {features.length > 0 && (
              <div>
                <h2 className="flex items-center gap-2 text-sm font-bold text-foreground/70 uppercase tracking-wider mb-3">
                  <CheckCircle2 size={15} className="text-primary" /> Key Features
                </h2>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/65 bg-foreground/[0.03] rounded-xl px-3.5 py-2.5">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
