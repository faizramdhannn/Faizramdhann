'use client';

import Image from 'next/image';
import type { Project } from '@/types/project';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const technologies = Array.isArray(project.technologies) 
    ? project.technologies 
    : project.technologies.split(',').map(t => t.trim());

  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-gradient-to-br from-surface/90 to-surface2/90 
               backdrop-blur-sm rounded-3xl border border-[#00a67e]/20 
               hover:border-[#00a67e]/50 transition-all duration-500
               overflow-hidden h-full flex flex-col
               hover:shadow-2xl hover:shadow-[#00a67e]/20"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00a67e]/5 via-transparent to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00a67e]/10 rounded-full blur-3xl 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent z-10" />
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-4 py-2 bg-[#00a67e]/90 backdrop-blur-sm text-white text-xs font-bold 
                       rounded-xl shadow-lg border border-foreground/10">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col p-6 space-y-4">
        {/* Title */}
        <h3 className="text-2xl font-bold text-foreground group-hover:text-[#00a67e] 
                     transition-colors duration-300 line-clamp-2">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-foreground/60 group-hover:text-foreground/80 
                    transition-colors duration-300 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-2">
          {technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-[#00a67e]/10 border border-[#00a67e]/20 
                       text-[#00a67e] text-xs font-semibold rounded-lg
                       group-hover:bg-[#00a67e]/20 group-hover:border-[#00a67e]/40 
                       transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-3 py-1.5 bg-foreground/5 text-foreground/40 text-xs font-semibold rounded-lg">
              +{technologies.length - 4}
            </span>
          )}
        </div>

        {/* View Project Link */}
        {project.link && (
          <div className="pt-4 border-t border-foreground/5">
            <div className="flex items-center justify-between text-[#00a67e] 
                          group-hover:text-[#00d9a5] transition-colors">
              <span className="text-sm font-semibold">View Project</span>
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-2" />
            </div>
          </div>
        )}
      </div>

      {/* Corner Accent */}
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-[#00a67e]/10 to-transparent 
                    rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );

  return project.link ? (
    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full"
    >
      {CardContent}
    </a>
  ) : (
    <div className="h-full">
      {CardContent}
    </div>
  );
}