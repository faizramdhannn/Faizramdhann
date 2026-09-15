'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import type { Project } from '@/types/project';
import { motion } from 'framer-motion';
import { Search, SearchX } from 'lucide-react';
import { useHoldSlide } from '@/lib/useHoldSlide';

function ProjectsView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') ?? 'All');
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

  // Keep the URL in sync so filters are shareable / bookmarkable.
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (activeFilter !== 'All') params.set('category', activeFilter);

    const query = params.toString();
    if (query === searchParams.toString()) return;
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [searchQuery, activeFilter, pathname, router, searchParams]);

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [projects]);

  const { containerRef: filterRef, activeKey: draggedFilter, containerHandlers: filterHandlers } =
    useHoldSlide<string>({ commitOn: 'move', onSelect: setActiveFilter });
  const highlightedFilter = draggedFilter ?? activeFilter;

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
          className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="px-6 md:px-8 py-14 md:py-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <span className="text-primary font-mono text-xs font-medium uppercase tracking-wider block">
            Portfolio
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            My <span className="text-primary">Projects</span>
          </h1>
          <p className="text-base text-foreground/55 max-w-2xl mx-auto">
            Explore my portfolio of projects showcasing my skills and experience in web development and data analysis
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-5"
        >
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 pl-12 liquid-glass-pill text-foreground
                         placeholder:text-foreground/40 focus:outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
            </div>
          </div>

          <div
            ref={filterRef}
            {...filterHandlers}
            className="flex flex-wrap gap-2.5 justify-center select-none"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                data-slide-key={category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  highlightedFilter === category
                    ? 'bg-primary text-white'
                    : 'liquid-glass text-foreground/65 hover:text-foreground'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <p className="text-center text-foreground/45 text-sm">
          Showing <span className="text-primary font-semibold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
        </p>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-3xl text-center py-16 px-6 max-w-md mx-auto space-y-4"
          >
            <SearchX className="mx-auto text-primary/60" size={48} />
            <h3 className="text-xl font-bold text-foreground">No Projects Found</h3>
            <p className="text-foreground/55 text-sm">
              Try adjusting your search or filter criteria to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('All');
              }}
              className="mt-2 px-5 py-2.5 bg-primary/10 text-primary font-semibold rounded-full hover:bg-primary/20 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Project() {
  return (
    <Suspense fallback={null}>
      <ProjectsView />
    </Suspense>
  );
}
