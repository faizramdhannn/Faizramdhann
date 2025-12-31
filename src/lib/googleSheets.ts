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