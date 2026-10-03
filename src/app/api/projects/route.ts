import { NextResponse } from 'next/server';
import { getPublicProjects } from '@/lib/projects';

export async function GET() {
  try {
    const projects = await getPublicProjects();
    return NextResponse.json(projects, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
