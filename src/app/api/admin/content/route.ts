import { NextRequest, NextResponse } from 'next/server';
import { readSheetData, writeSheetData } from '@/lib/googleSheets';

export async function GET(request: NextRequest) {
  try {
    const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });
    }

    const rows = await readSheetData(spreadsheetId, 'Content!A2:B');
    
    const content = rows.map((row, index) => ({
      id: index + 2,
      key: row[0] || '',
      value: row[1] || '',
    }));

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, key, value } = body;

    const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });
    }

    const range = `Content!A${id}:B${id}`;
    const values = [[key, value]];
    
    await writeSheetData(spreadsheetId, range, values);

    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}