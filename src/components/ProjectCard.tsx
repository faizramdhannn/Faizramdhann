'use client';

import Image from 'next/image';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const technologies = Array.isArray(project.technologies) 
    ? project.technologies 
    : project.technologies.split(',').map(t => t.trim());

  const CardContent = (
    <div
      className="project-card relative border-2 border-[#00a67e]/20 rounded-2xl p-6 
                 transition-all duration-500 w-full h-[400px] flex flex-col
                 hover:-translate-y-3 hover:border-[#00a67e] 
                 hover:shadow-[0_15px_40px_rgba(0,166,126,0.4)] 
                 cursor-pointer group"
    >
      <div className="relative w-full h-[200px] rounded-xl overflow-hidden mb-4 
                    group-hover:scale-105 transition-transform duration-500">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-[#00a67e] text-2xl font-bold text-center mb-3 group-hover:scale-105 transition-transform">
          {project.name}
        </h3>
        
        <p className="text-sm text-center text-white mb-4 flex-1 opacity-90">
          {project.description}
        </p>

        <div className="mt-auto space-y-3">
          <div className="text-xs text-white text-center">
            <strong className="text-[#00a67e] text-sm">Category:</strong> {project.category}
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="bg-[#00a67e]/20 text-[#00a67e] px-3 py-1.5 rounded-lg text-xs font-semibold
                         border border-[#00a67e]/30 hover:bg-[#00a67e]/30 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return project.link ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer">
      {CardContent}
    </a>
  ) : (
    CardContent
  );
}