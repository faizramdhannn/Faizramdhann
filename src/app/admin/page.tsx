'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FolderKanban, FileText, LogOut, ExternalLink } from 'lucide-react';
import ProjectsPanel from '@/components/admin/ProjectsPanel';
import ContentPanel from '@/components/admin/ContentPanel';

const TABS = [
  { key: 'projects', label: 'Projects', Icon: FolderKanban },
  { key: 'content', label: 'Content', Icon: FileText },
] as const;

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('projects');
  const [count, setCount] = useState<number | null>(null);

  async function logout() {
    await fetch('/api/auth', { method: 'DELETE' });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Admin <span className="text-primary">Dashboard</span></h1>
          <p className="text-sm text-foreground/50 mt-1">
            {count !== null ? `${count} projects` : 'Loading...'} · changes go live immediately
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-foreground/15 hover:bg-foreground/5">
            <ExternalLink size={15} /> View site
          </a>
          <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10">
            <LogOut size={15} /> Logout
          </button>
        </div>
      </header>

      <nav className="flex gap-2 p-1 rounded-2xl bg-foreground/5 w-fit" role="tablist">
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl transition-colors ${
              tab === key ? 'bg-primary text-white' : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </nav>

      {tab === 'projects' ? <ProjectsPanel onCount={setCount} /> : <ContentPanel />}
    </div>
  );
}
