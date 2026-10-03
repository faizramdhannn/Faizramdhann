import { NextResponse } from 'next/server';
import { readSheetData } from '@/lib/googleSheets';
import { getCached, getStale, setCached } from '@/lib/cache';

const CONTENT_CACHE_KEY = 'content:public';

export async function GET() {
  const headers = { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' };
  const cached = getCached<Record<string, string>>(CONTENT_CACHE_KEY);
  if (cached) return NextResponse.json(cached, { headers });

  try {
    const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });
    }

    const rows = await readSheetData(spreadsheetId, 'Content!A2:B');
    const content: Record<string, string> = {};
    rows.forEach((row) => {
      if (row[0] && row[1]) content[row[0]] = row[1];
    });

    setCached(CONTENT_CACHE_KEY, content);
    return NextResponse.json(content, { headers });
  } catch (error) {
    console.error('Error fetching content:', error);
    const stale = getStale<Record<string, string>>(CONTENT_CACHE_KEY);
    if (stale) return NextResponse.json(stale);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
