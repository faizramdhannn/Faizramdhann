'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import type { AdminProject } from '@/lib/projects';
import ProjectForm, { EMPTY_PROJECT, type ProjectDraft } from './ProjectForm';

type Mode = { type: 'list' } | { type: 'add' } | { type: 'edit'; project: AdminProject };

async function request(method: string, body?: unknown, query = '') {
  const res = await fetch(`/api/admin/projects${query}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? 'Request failed');
  return data;
}

export default function ProjectsPanel({ onCount }: { onCount?: (n: number) => void }) {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>({ type: 'list' });

  const load = useCallback(async () => {
    try {
      const data: AdminProject[] = await request('GET');
      setProjects(data);
      onCount?.(data.length);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [onCount]);

  useEffect(() => { load(); }, [load]);

  async function save(draft: ProjectDraft, id?: number) {
    try {
      await request(id ? 'PUT' : 'POST', id ? { ...draft, id } : draft);
      toast.success(id ? 'Project updated' : 'Project added');
      setMode({ type: 'list' });
      await load();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  async function toggle(p: AdminProject) {
    const status = p.status === 'active' ? 'hidden' : 'active';
    try {
      await request('PUT', { ...p, status });
      toast.success(status === 'active' ? 'Project is now visible' : 'Project hidden');
      await load();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  async function remove(p: AdminProject) {
    if (!confirm(`Delete "${p.name}"? It will be removed from the site.`)) return;
    try {
      await request('DELETE', undefined, `?id=${p.id}`);
      toast.success('Project deleted');
      await load();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  if (mode.type !== 'list') {
    const editing = mode.type === 'edit' ? mode.project : null;
    return (
      <div className="liquid-glass rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-bold mb-5">{editing ? `Edit ${editing.name}` : 'Add project'}</h2>
        <ProjectForm
          initial={editing ?? EMPTY_PROJECT}
          submitLabel={editing ? 'Save changes' : 'Add project'}
          onSubmit={(d) => save(d, editing?.id)}
          onCancel={() => setMode({ type: 'list' })}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={() => setMode({ type: 'add' })} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl">
        <Plus size={16} /> Add project
      </button>

      {loading ? (
        <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="h-24 rounded-2xl bg-foreground/5 animate-pulse" />)}</div>
      ) : projects.length === 0 ? (
        <p className="text-foreground/50 py-10 text-center">No projects yet.</p>
      ) : (
        projects.map((p) => (
          <div key={p.id} className="liquid-glass rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold truncate">{p.name}</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{p.category}</span>
                {p.status !== 'active' && <span className="text-xs px-2.5 py-0.5 rounded-full bg-foreground/10 text-foreground/60">Hidden</span>}
              </div>
              <p className="text-sm text-foreground/55 line-clamp-2">{p.description}</p>
              <p className="text-xs text-foreground/40 truncate">{p.technologies}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label="Open live site" className="p-2.5 rounded-xl hover:bg-foreground/5"><ExternalLink size={16} /></a>
              )}
              <button onClick={() => toggle(p)} aria-label={p.status === 'active' ? 'Hide' : 'Show'} className="p-2.5 rounded-xl hover:bg-foreground/5">
                {p.status === 'active' ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button onClick={() => setMode({ type: 'edit', project: p })} aria-label="Edit" className="p-2.5 rounded-xl hover:bg-foreground/5"><Pencil size={16} /></button>
              <button onClick={() => remove(p)} aria-label="Delete" className="p-2.5 rounded-xl text-red-400 hover:bg-red-500/10"><Trash2 size={16} /></button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
