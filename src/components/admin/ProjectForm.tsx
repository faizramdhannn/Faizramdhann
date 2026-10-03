'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import type { AdminProject } from '@/lib/projects';

export type ProjectDraft = Omit<AdminProject, 'id'>;

export const EMPTY_PROJECT: ProjectDraft = {
  name: '', category: '', description: '', technologies: '',
  image: '', detailImage: '', link: '', features: '', status: 'active',
};

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/10 text-sm focus:outline-none focus:border-primary';

function Field({ label, hint, children, wide }: { label: string; hint?: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <label className={`block space-y-1.5 ${wide ? 'md:col-span-2' : ''}`}>
      <span className="text-xs font-semibold text-foreground/70">{label}</span>
      {children}
      {hint && <span className="block text-xs text-foreground/40">{hint}</span>}
    </label>
  );
}

function UploadButton({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      onUploaded(data.url);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary cursor-pointer">
      <Upload size={13} /> {busy ? 'Uploading...' : 'Upload'}
      <input type="file" accept="image/*" className="hidden" disabled={busy} onChange={handle} />
    </label>
  );
}

interface Props {
  initial: ProjectDraft;
  submitLabel: string;
  onSubmit: (draft: ProjectDraft) => Promise<void>;
  onCancel: () => void;
}

export default function ProjectForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const [draft, setDraft] = useState<ProjectDraft>(initial);
  const [saving, setSaving] = useState(false);
  const set = (key: keyof ProjectDraft) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setDraft((d) => ({ ...d, [key]: e.target.value }));

  // Features are stored pipe-separated in the sheet; edit them one per line.
  const featuresText = draft.features.split('|').map((f) => f.trim()).filter(Boolean).join('\n');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(draft);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Name"><input required className={inputClass} value={draft.name} onChange={set('name')} /></Field>
        <Field label="Category"><input required className={inputClass} value={draft.category} onChange={set('category')} placeholder="Dashboard, E-commerce, ..." /></Field>
        <Field label="Description" wide><textarea className={`${inputClass} h-24`} value={draft.description} onChange={set('description')} /></Field>
        <Field label="Technologies" hint="Comma-separated" wide><input className={inputClass} value={draft.technologies} onChange={set('technologies')} placeholder="Next.js, TypeScript, Tailwind" /></Field>
        <Field label="Key features" hint="One feature per line" wide>
          <textarea
            className={`${inputClass} h-32`}
            value={featuresText}
            onChange={(e) =>
              setDraft((d) => ({ ...d, features: e.target.value.split('\n').map((l) => l.trim()).filter(Boolean).join('|') }))
            }
          />
        </Field>
        <Field label="Card image" hint="Path in /public, https URL, or upload"><input className={inputClass} value={draft.image} onChange={set('image')} placeholder="/assets/projects/name.jpg" /><UploadButton onUploaded={(url) => setDraft((d) => ({ ...d, image: url }))} /></Field>
        <Field label="Detail images" hint="Optional. Several screenshots: separate with | (each upload appends)"><input className={inputClass} value={draft.detailImage} onChange={set('detailImage')} /><UploadButton onUploaded={(url) => setDraft((d) => ({ ...d, detailImage: d.detailImage ? `${d.detailImage}|${url}` : url }))} /></Field>
        <Field label="Live link"><input type="url" className={inputClass} value={draft.link} onChange={set('link')} placeholder="https://" /></Field>
        <Field label="Status">
          <select className={inputClass} value={draft.status} onChange={set('status')}>
            <option value="active">Active (visible)</option>
            <option value="hidden">Hidden</option>
          </select>
        </Field>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl disabled:opacity-50">
          {saving ? 'Saving...' : submitLabel}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-foreground/15 text-sm rounded-xl hover:bg-foreground/5">
          Cancel
        </button>
      </div>
    </form>
  );
}
