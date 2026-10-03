import { renderOg, ogSize } from '@/lib/og';
import { getPublicProjects } from '@/lib/projects';

export const alt = 'Project preview';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = (await getPublicProjects().catch(() => [])).find((p) => p.id === Number(id));
  if (!project) return renderOg('Project', 'Faiz Ramdhan');
  const tech = Array.isArray(project.technologies) ? project.technologies : [];
  return renderOg(project.name, project.category, tech);
}
