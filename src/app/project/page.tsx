'use client';

import { useState, useMemo, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import type { Project } from '@/types/project';
import { motion } from 'framer-motion';
import { Search, SearchX } from 'lucide-react';

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
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-[#00a67e]/20 border-t-[#00a67e] rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-8 py-32">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <span className="text-[#00a67e] text-sm font-semibold uppercase tracking-wider block">
            Portfolio
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
            My <span className="bg-gradient-to-r from-[#00a67e] to-[#00d9a5] bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            Explore my portfolio of projects showcasing my skills and experience in web development and data analysis
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-surface/80 backdrop-blur-sm
                         border-2 border-[#00a67e]/20 rounded-2xl text-foreground
                         placeholder:text-foreground/40 focus:outline-none focus:border-[#00a67e]/50
                         hover:border-[#00a67e]/30 transition-all duration-300
                         shadow-lg shadow-black/20"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#00a67e]/50" size={20} />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-[#00a67e] to-[#00d9a5] text-white shadow-lg shadow-[#00a67e]/30'
                    : 'bg-surface/80 border-2 border-[#00a67e]/20 text-foreground/70 hover:border-[#00a67e]/40 hover:text-foreground'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Project Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-foreground/50 text-sm">
            Showing <span className="text-[#00a67e] font-semibold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto space-y-4">
              <SearchX className="mx-auto mb-4 text-[#00a67e]/60" size={56} />
              <h3 className="text-2xl font-bold text-foreground mb-2">No Projects Found</h3>
              <p className="text-foreground/60">
                Try adjusting your search or filter criteria to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All');
                }}
                className="mt-6 px-6 py-3 bg-[#00a67e]/10 border-2 border-[#00a67e]/30 
                         text-[#00a67e] font-semibold rounded-xl hover:bg-[#00a67e]/20 
                         hover:border-[#00a67e]/50 transition-all"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}