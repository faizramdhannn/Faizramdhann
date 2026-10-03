import { z } from 'zod';
import { readSheetData } from '@/lib/googleSheets';
import { getCached, getStale, setCached } from '@/lib/cache';
import type { Project } from '@/types/project';

export const PROJECTS_CACHE_KEY = 'projects:public';
export type ProjectStatus = 'active' | 'hidden' | 'deleted';

/** Raw admin shape: list fields stay as the strings stored in the sheet. */
export interface AdminProject {
  id: number; // sheet row number, stable across public and admin APIs
  name: string;
  category: string;
  description: string;
  technologies: string;
  image: string;
  link: string;
  status: string;
  features: string;
  detailImage: string;
}

export const projectInputSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  category: z.string().trim().min(1, 'Category is required').max(60),
  description: z.string().trim().max(2000).default(''),
  technologies: z.string().trim().max(500).default(''),
  image: z.string().trim().max(500).default(''),
  detailImage: z.string().trim().max(500).default(''),
  link: z.string().trim().max(500).refine((v) => !v || /^https?:\/\//.test(v), 'Link must start with http(s)://').default(''),
  features: z.string().trim().max(3000).default(''),
  status: z.enum(['active', 'hidden', 'deleted']).default('active'),
});

export function rowToAdmin(row: string[], index: number): AdminProject {
  return {
    id: index + 2,
    name: row[0] || '',
    category: row[1] || '',
    description: row[2] || '',
    technologies: row[3] || '',
    image: row[4] || '',
    link: row[5] || '',
    status: row[6] || 'active',
    features: row[7] || '',
    detailImage: row[8] || '',
  };
}

export function adminToRow(p: z.infer<typeof projectInputSchema>) {
  return [p.name, p.category, p.description, p.technologies, p.image, p.link, p.status, p.features, p.detailImage];
}

function toPublic(p: AdminProject): Project {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    description: p.description,
    technologies: p.technologies ? p.technologies.split(',').map((t) => t.trim()).filter(Boolean) : [],
    image: p.image,
    link: p.link,
    status: p.status,
    features: p.features ? p.features.split('|').map((f) => f.trim()).filter(Boolean) : [],
    detailImage: p.detailImage,
  };
}

export async function getAdminProjects(): Promise<AdminProject[]> {
  const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error('Spreadsheet ID not configured');
  const rows = await readSheetData(spreadsheetId, 'Projects!B2:J');
  return rows.map(rowToAdmin);
}

/** Active projects, newest first. Cached; falls back to stale data if Sheets is down. */
export async function getPublicProjects(): Promise<Project[]> {
  const cached = getCached<Project[]>(PROJECTS_CACHE_KEY);
  if (cached) return cached;
  try {
    const projects = (await getAdminProjects())
      .filter((p) => p.status === 'active' && p.name)
      .map(toPublic)
      .reverse();
    setCached(PROJECTS_CACHE_KEY, projects);
    return projects;
  } catch (error) {
    const stale = getStale<Project[]>(PROJECTS_CACHE_KEY);
    if (stale) return stale;
    throw error;
  }
}
