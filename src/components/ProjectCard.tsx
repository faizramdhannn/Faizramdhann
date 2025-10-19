'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };
    
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const textColor = isLight ? '#ffffffff' : '#ffffff';

  const CardContent = (
    <div
      className="project-card relative border border-[#00a67e]/20 rounded-2xl p-5 transition-all duration-500 w-full h-[365px] hover:-translate-y-2 hover:border-[#00a67e] hover:shadow-[0_10px_30px_rgba(0,255,174,0.3)] overflow-hidden"
    >
      <div className="relative w-full h-[200px] rounded-t-lg overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-2">
        <h3 className="text-[#00a67e] text-lg font-semibold text-center my-2">
          {project.name}
        </h3>
        <p 
          className="text-xs text-center transition-colors duration-300"
          style={{ color: textColor }}
        >
          {project.description}
        </p>
      </div>

      <div className="mt-2 pt-2 border-t border-[#00a67e]/10">
        <div 
          className="text-xs mb-2 transition-colors duration-300"
          style={{ color: textColor }}
        >
          <strong className="text-[#00a67e]">Category:</strong> {project.category}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="bg-[#00a67e]/20 text-[#00a67e] px-2 py-1 rounded-xl text-xs"
            >
              {tech}
            </span>
          ))}
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