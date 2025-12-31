import { NextResponse } from 'next/server';
import { readSheetData } from '@/lib/googleSheets';

// Cache projects for 5 minutes
let cache: { data: any[] | null; timestamp: number } = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function GET() {
  try {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
      return NextResponse.json(cache.data, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }

    const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });
    }

    const rows = await readSheetData(spreadsheetId, 'Projects!A2:G');
    
    const projects = rows.map((row, index) => ({
      id: index + 1,
      name: row[0] || '',
      category: row[1] || '',
      description: row[2] || '',
      technologies: row[3] ? row[3].split(',').map((t: string) => t.trim()) : [],
      image: row[4] || '/assets/profile.jpeg',
      link: row[5] || '',
      status: row[6] || 'active',
    })).filter(p => p.status === 'active');

    // Update cache
    cache = {
      data: projects,
      timestamp: now,
    };

    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Return cached data if available, even if expired
    if (cache.data) {
      return NextResponse.json(cache.data);
    }
    
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}