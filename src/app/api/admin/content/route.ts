import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { readSheetData, writeSheetData } from '@/lib/googleSheets';
import { invalidate } from '@/lib/cache';

export const dynamic = 'force-dynamic';
const CONTENT_CACHE_KEY = 'content:public';

const updateSchema = z.object({
  id: z.number().int().min(2),
  value: z.string().trim().min(1, 'Value cannot be empty').max(3000),
});

export async function GET() {
  try {
    const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });
    }
    const rows = await readSheetData(spreadsheetId, 'Content!A2:B');
    return NextResponse.json(
      rows.map((row, index) => ({ id: index + 2, key: row[0] || '', value: row[1] || '' }))
    );
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

/** Only the value column is editable; keys are identifiers the site code depends on. */
export async function PUT(request: NextRequest) {
  const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
  if (!spreadsheetId) return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });

  const parsed = updateSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
  }

  try {
    await writeSheetData(spreadsheetId, `Content!B${parsed.data.id}`, [[parsed.data.value]]);
    invalidate(CONTENT_CACHE_KEY);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
