import { NextRequest, NextResponse } from 'next/server';
import { writeSheetData, appendRowExplicit } from '@/lib/googleSheets';
import { invalidate } from '@/lib/cache';
import {
  PROJECTS_CACHE_KEY, adminToRow, getAdminProjects, projectInputSchema,
} from '@/lib/projects';

export const dynamic = 'force-dynamic';

function sheetId() {
  return process.env.DATABASE_SPREADSHEET_ID;
}

function validationError(error: import('zod').ZodError) {
  return NextResponse.json({ error: error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
}

export async function GET() {
  try {
    const projects = (await getAdminProjects()).filter((p) => p.status !== 'deleted');
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const spreadsheetId = sheetId();
  if (!spreadsheetId) return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });

  const parsed = projectInputSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return validationError(parsed.error);

  try {
    const id = await appendRowExplicit(spreadsheetId, 'Projects', 'B', 'J', adminToRow(parsed.data));
    invalidate(PROJECTS_CACHE_KEY);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const spreadsheetId = sheetId();
  if (!spreadsheetId) return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });

  const body = await request.json().catch(() => ({}));
  const id = Number(body.id);
  if (!Number.isInteger(id) || id < 2) return NextResponse.json({ error: 'Invalid project id' }, { status: 400 });

  const parsed = projectInputSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  try {
    await writeSheetData(spreadsheetId, `Projects!B${id}:J${id}`, [adminToRow(parsed.data)]);
    invalidate(PROJECTS_CACHE_KEY);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

/** Soft delete: marks the row as `deleted` so it can be restored from the sheet. */
export async function DELETE(request: NextRequest) {
  const spreadsheetId = sheetId();
  if (!spreadsheetId) return NextResponse.json({ error: 'Spreadsheet ID not configured' }, { status: 500 });

  const id = Number(new URL(request.url).searchParams.get('id'));
  if (!Number.isInteger(id) || id < 2) return NextResponse.json({ error: 'Invalid project id' }, { status: 400 });

  try {
    await writeSheetData(spreadsheetId, `Projects!H${id}`, [['deleted']]);
    invalidate(PROJECTS_CACHE_KEY);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
