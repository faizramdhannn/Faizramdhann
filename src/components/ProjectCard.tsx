'use client';

import Image from 'next/image';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const CardContent = (
    <div
      className="project-card relative border border-[#00a67e]/20 rounded-2xl p-5 
                 transition-all duration-500 w-full h-[350px] flex flex-col
                 hover:-translate-y-2 hover:border-[#00a67e] 
                 hover:shadow-[0_10px_30px_rgba(0,166,126,0.3)] 
                 cursor-pointer"
    >
      <div className="relative w-full h-[180px] rounded-lg overflow-hidden mb-4">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-[#00a67e] text-xl font-semibold text-center mb-2">
          {project.name}
        </h3>
        
        <p className="text-sm text-center text-white mb-4 flex-1">
          {project.description}
        </p>

        <div className="mt-auto space-y-3">
          <div className="text-xs text-white">
            <strong className="text-[#00a67e]">Category:</strong> {project.category}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="bg-[#00a67e]/20 text-[#00a67e] px-2 py-1 rounded-lg text-xs"
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