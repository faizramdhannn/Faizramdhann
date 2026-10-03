'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface Item { id: number; key: string; value: string }

export default function ContentPanel() {
  const [items, setItems] = useState<Item[]>([]);
  const [original, setOriginal] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Failed to load content'))))
      .then((data: Item[]) => {
        setItems(data);
        setOriginal(Object.fromEntries(data.map((i) => [i.id, i.value])));
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function save(item: Item) {
    setSavingId(item.id);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, value: item.value }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? 'Failed to save');
      setOriginal((o) => ({ ...o, [item.id]: item.value }));
      toast.success(`${item.key} saved`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSavingId(null);
    }
  }

  if (loading) return <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="h-28 rounded-2xl bg-foreground/5 animate-pulse" />)}</div>;

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const dirty = item.value !== original[item.id];
        return (
          <div key={item.id} className="liquid-glass rounded-2xl p-5 space-y-3">
            <label htmlFor={`c-${item.id}`} className="text-sm font-mono font-semibold text-primary">{item.key}</label>
            <textarea
              id={`c-${item.id}`}
              value={item.value}
              onChange={(e) => setItems((all) => all.map((i) => (i.id === item.id ? { ...i, value: e.target.value } : i)))}
              className="w-full h-24 px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/10 text-sm focus:outline-none focus:border-primary"
            />
            <button
              onClick={() => save(item)}
              disabled={!dirty || savingId === item.id}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl disabled:opacity-30"
            >
              <Save size={15} /> {savingId === item.id ? 'Saving...' : 'Save'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
