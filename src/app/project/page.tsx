'use client';

import { useState, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { projectList } from '@/data/projects';

export default function Project() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(projectList.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    return projectList.filter(project => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        activeFilter === 'All' || project.category === activeFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeFilter]);

  return (
    <>
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">
          My <span className="text-[#00a67e]">Projects</span>
        </h1>
        <p className="text-lg opacity-80">
          Berikut adalah beberapa project yang telah saya kerjakan
        </p>
      </section>

      <section className="flex flex-col items-center gap-5 mb-10 px-5">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-3 border border-[#00a67e]/30 rounded-lg 
                     bg-transparent w-full max-w-md
                     focus:outline-none focus:border-[#00a67e] 
                     focus:shadow-[0_0_10px_rgba(0,166,126,0.3)]
                     placeholder:text-gray-500 transition-all"
        />

        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 border border-[#00a67e] rounded-lg font-medium
                        transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-[#00a67e] text-[#000814]'
                  : 'bg-transparent text-[#00a67e] hover:bg-[#00a67e] hover:text-[#000814]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5 md:px-32 pb-12 max-w-7xl mx-auto">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="col-span-full text-center opacity-70 py-16 text-lg">
            No projects found matching your criteria.
          </div>
        )}
      </section>
    </>
  );
}