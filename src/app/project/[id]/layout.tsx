import type { Metadata } from 'next';
import { getPublicProjects } from '@/lib/projects';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const project = (await getPublicProjects()).find((p) => p.id === Number(id));
    if (!project) return { title: 'Project not found' };
    const image = project.detailImage || project.image;
    return {
      title: project.name,
      description: project.description.slice(0, 160),
      openGraph: {
        title: `${project.name} | Faiz Ramdhan`,
        description: project.description.slice(0, 160),
        images: image && image.startsWith('/') ? [image] : undefined,
      },
    };
  } catch {
    return { title: 'Project' };
  }
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
