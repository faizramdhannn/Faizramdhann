import { NextRequest, NextResponse } from 'next/server';
import { readSheetData, writeSheetData, appendSheetData } from '@/lib/googleSheets';

export async function GET() {
  try {
    const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });
    }

    const rows = await readSheetData(spreadsheetId, 'Projects!A2:G');
    
    const projects = rows.map((row, index) => ({
      id: index + 2,
      name: row[0] || '',
      category: row[1] || '',
      description: row[2] || '',
      technologies: row[3] || '',
      image: row[4] || '',
      link: row[5] || '',
      status: row[6] || 'active',
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, description, technologies, image, link } = body;

    const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });
    }

    const newRow = [[name, category, description, technologies, image, link, 'active']];
    await appendSheetData(spreadsheetId, 'Projects!A:G', newRow);

    return NextResponse.json({ success: true, message: 'Project added successfully' });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, category, description, technologies, image, link, status } = body;

    const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });
    }

    const range = `Projects!A${id}:G${id}`;
    const values = [[name, category, description, technologies, image, link, status]];
    
    await writeSheetData(spreadsheetId, range, values);

    return NextResponse.json({ success: true, message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });
    }

    const range = `Projects!G${id}`;
    await writeSheetData(spreadsheetId, range, [['deleted']]);

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}