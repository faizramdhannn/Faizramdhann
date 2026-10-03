'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Home, User, FolderKanban, Mail, Moon, Sun, CornerDownLeft } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { useTheme } from './ThemeProvider';
import type { Project } from '@/types/project';

export default function CommandPalette() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', onOpen);
    };
  }, []);

  // Load projects lazily the first time the palette opens.
  useEffect(() => {
    if (!open || projects) return;
    fetch('/api/projects')
      .then((r) => (r.ok ? r.json() : []))
      .then(setProjects)
      .catch(() => setProjects([]));
  }, [open, projects]);

  const run = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };
  const go = (href: string) => run(() => router.push(href));
  const external = (href: string) => run(() => window.open(href, '_blank', 'noopener,noreferrer'));

  const item =
    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary';

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Search the site"
      overlayClassName="fixed inset-0 z-[100] bg-black/50"
      contentClassName="fixed left-1/2 top-[18%] z-[101] w-[92vw] max-w-lg -translate-x-1/2 liquid-glass rounded-2xl overflow-hidden shadow-2xl bg-surface/95"
    >
      <Command.Input
        placeholder="Search pages and projects..."
        className="w-full px-5 py-4 bg-transparent border-b border-foreground/10 text-sm outline-none placeholder:text-foreground/40"
      />
      <Command.List className="max-h-[50vh] overflow-y-auto p-2">
        <Command.Empty className="py-8 text-center text-sm text-foreground/50">No results found.</Command.Empty>

        <Command.Group heading="Pages" className="text-xs text-foreground/40 px-2 py-1 [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-1.5">
          <Command.Item className={item} onSelect={go('/')}><Home size={16} /> Home</Command.Item>
          <Command.Item className={item} onSelect={go('/about')}><User size={16} /> About</Command.Item>
          <Command.Item className={item} onSelect={go('/project')}><FolderKanban size={16} /> Projects</Command.Item>
          <Command.Item className={item} onSelect={go('/#contact')}><Mail size={16} /> Contact</Command.Item>
        </Command.Group>

        {projects && projects.length > 0 && (
          <Command.Group heading="Projects" className="text-xs text-foreground/40 px-2 py-1 [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-1.5">
            {projects.map((p) => (
              <Command.Item key={p.id} value={`${p.name} ${p.category}`} className={item} onSelect={go(`/project/${p.id}`)}>
                <FolderKanban size={16} />
                <span className="flex-1 truncate">{p.name}</span>
                <span className="text-xs text-foreground/40">{p.category}</span>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        <Command.Group heading="Links" className="text-xs text-foreground/40 px-2 py-1 [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-1.5">
          <Command.Item className={item} onSelect={external('https://github.com/faizramdhannn')}><GithubIcon size={16} /> GitHub</Command.Item>
          <Command.Item className={item} onSelect={external('https://www.linkedin.com/in/faiz-ramdhan-8b1a22389/')}><LinkedinIcon size={16} /> LinkedIn</Command.Item>
          <Command.Item className={item} onSelect={run(() => (window.location.href = 'mailto:faizramdhan17@gmail.com'))}><Mail size={16} /> Email</Command.Item>
          <Command.Item className={item} onSelect={run(toggleTheme)}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} Switch to {theme === 'dark' ? 'light' : 'dark'} mode
          </Command.Item>
        </Command.Group>
      </Command.List>
      <div className="flex items-center justify-end gap-2 px-4 py-2 border-t border-foreground/10 text-xs text-foreground/40">
        <CornerDownLeft size={12} /> select · Esc close
      </div>
    </Command.Dialog>
  );
}
