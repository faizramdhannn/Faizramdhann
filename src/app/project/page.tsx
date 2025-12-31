'use client';

import { useState, useMemo, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import type { Project } from '@/types/project';

export default function Project() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(project.technologies) ? project.technologies : []).some(tech =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        activeFilter === 'All' || project.category === activeFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeFilter, projects]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
        <div className="text-2xl text-[#00a67e]">Loading projects...</div>
      </div>
    );
  }

  return (
    <>
      <section className="text-center py-12 px-5">
        <h1 className="text-5xl font-bold mb-4">
          My <span className="text-[#00a67e]">Projects</span>
        </h1>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Explore my portfolio of projects showcasing my skills and experience in web development and data analysis.
        </p>
      </section>

      <section className="flex flex-col items-center gap-5 mb-10 px-5">
        <input
          type="text"
          placeholder="Search projects by name, description, or technology..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-5 py-3 border border-[#00a67e]/30 rounded-xl 
                     bg-transparent w-full max-w-2xl
                     focus:outline-none focus:border-[#00a67e] 
                     focus:shadow-[0_0_20px_rgba(0,166,126,0.3)]
                     placeholder:text-gray-500 transition-all duration-300
                     hover:border-[#00a67e]/50"
        />

        <div className="flex gap-3 flex-wrap justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 border-2 border-[#00a67e] rounded-xl font-semibold
                        transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-[#00a67e] text-white shadow-[0_0_20px_rgba(0,166,126,0.4)]'
                  : 'bg-transparent text-[#00a67e] hover:bg-[#00a67e]/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5 md:px-10 lg:px-20 pb-12 max-w-7xl mx-auto">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="col-span-full text-center opacity-70 py-20">
            <div className="text-2xl font-semibold mb-3 text-[#00a67e]">No Projects Found</div>
            <p className="text-lg">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </section>
    </>
  );
}