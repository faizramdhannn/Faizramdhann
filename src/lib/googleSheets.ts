import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  });

  const client = await auth.getClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return google.sheets({ version: 'v4', auth: client as any });
}

export async function readSheetData(spreadsheetId: string, range: string) {
  const sheets = await getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data.values || [];
}

export async function writeSheetData(
  spreadsheetId: string,
  range: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any[][]
) {
  const sheets = await getGoogleSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    requestBody: { values },
  });
}

export async function appendSheetData(
  spreadsheetId: string,
  range: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any[][]
) {
  const sheets = await getGoogleSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    requestBody: { values },
  });
}

export async function clearSheetData(spreadsheetId: string, range: string) {
  const sheets = await getGoogleSheetsClient();
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range,
  });
}

/**
 * Append a row at the first free row of a column-A-anchored block by writing to an
 * explicit range. `values.append` auto-detects a "table" and has shifted columns left,
 * so we never use it for the Projects sheet.
 */
export async function appendRowExplicit(
  spreadsheetId: string,
  sheet: string,
  firstCol: string,
  lastCol: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any[]
) {
  const existing = await readSheetData(spreadsheetId, `${sheet}!${firstCol}:${firstCol}`);
  const nextRow = existing.length + 1;
  await writeSheetData(spreadsheetId, `${sheet}!${firstCol}${nextRow}:${lastCol}${nextRow}`, [row]);
  return nextRow;
}


/** Make sure a tab exists (creates it with a header row if missing). */
export async function ensureSheetTab(spreadsheetId: string, title: string, header: string[]) {
  const sheets = await getGoogleSheetsClient();
  const meta = await sheets.spreadsheets.get({ spreadsheetId, fields: 'sheets.properties.title' });
  if (meta.data.sheets?.some((s) => s.properties?.title === title)) return;
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests: [{ addSheet: { properties: { title } } }] },
  });
  await writeSheetData(spreadsheetId, `${title}!A1`, [header]);
}
