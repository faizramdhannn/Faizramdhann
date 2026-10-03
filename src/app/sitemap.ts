import type { MetadataRoute } from 'next';
import { getPublicProjects } from '@/lib/projects';

const BASE = 'https://faizramdhann.vercel.app';
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = ['', '/about', '/project'].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
  try {
    const projects = await getPublicProjects();
    return [...pages, ...projects.map((p) => ({ url: `${BASE}/project/${p.id}`, changeFrequency: 'monthly' as const, priority: 0.6 }))];
  } catch {
    return pages;
  }
}
