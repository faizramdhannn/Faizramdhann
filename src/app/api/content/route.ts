import { NextResponse } from 'next/server';
import { readSheetData } from '@/lib/googleSheets';

export async function GET() {
  try {
    const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });
    }

    const rows = await readSheetData(spreadsheetId, 'Content!A2:B');
    
    const content: Record<string, string> = {};
    rows.forEach((row) => {
      if (row[0] && row[1]) {
        content[row[0]] = row[1];
      }
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}