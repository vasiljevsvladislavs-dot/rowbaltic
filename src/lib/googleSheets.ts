import { google } from 'googleapis'
import { getGoogleAuth } from './googleAuth'

function getAuth() {
  return getGoogleAuth(['https://www.googleapis.com/auth/spreadsheets'])
}

export interface RegistrationRow {
  timestamp: string
  language: string
  name: string
  phone: string
  email: string
  portfolioLink: string
  socialLink: string
  platformSize: string
  shirtSize: string
  isBalticArtist: string
  fullName: string
  personalCode: string
  fileLinks: string
  consent: string
}

/**
 * Appends a registration row to the Google Sheet.
 * The sheet must have headers in row 1 matching the order below.
 */
export async function appendRegistrationRow(row: RegistrationRow): Promise<void> {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID ?? ''

  const values = [
    [
      row.timestamp,
      row.language,
      row.name,
      row.phone,
      row.email,
      row.portfolioLink,
      row.socialLink,
      row.platformSize,
      row.shirtSize,
      row.isBalticArtist,
      row.fullName,
      row.personalCode,
      row.fileLinks,
      row.consent,
    ],
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:N',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  })
}
