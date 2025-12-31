import { NextResponse } from 'next/server';
import { readSheetData } from '@/lib/googleSheets';

export async function GET() {
  try {
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

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}