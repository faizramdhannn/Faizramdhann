import { NextResponse } from 'next/server';
import { readSheetData } from '@/lib/googleSheets';

// Cache content for 5 minutes
let cache: { data: Record<string, string> | null; timestamp: number } = {
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

    const rows = await readSheetData(spreadsheetId, 'Content!A2:B');
    
    const content: Record<string, string> = {};
    rows.forEach((row) => {
      if (row[0] && row[1]) {
        content[row[0]] = row[1];
      }
    });

    // Update cache
    cache = {
      data: content,
      timestamp: now,
    };

    return NextResponse.json(content, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    
    // Return cached data if available, even if expired
    if (cache.data) {
      return NextResponse.json(cache.data);
    }
    
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}