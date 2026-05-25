import { google } from 'googleapis'
import { Readable } from 'stream'
import { getGoogleAuth } from './googleAuth'

/**
 * Service accounts have no personal Drive storage quota.
 * All files must be uploaded to a Shared Drive (supportsAllDrives: true).
 * Set GOOGLE_DRIVE_PARENT_FOLDER_ID to a folder inside a Shared Drive
 * where the service account has been added as a Member (Contributor or above).
 */

function getAuth() {
  return getGoogleAuth(['https://www.googleapis.com/auth/drive'])
}

/** Shared-Drive-compatible params appended to every Drive API call. */
const SD = {
  supportsAllDrives: true,
  includeItemsFromAllDrives: true,
} as const

export async function createApplicantFolder(applicantName: string): Promise<string> {
  const auth = getAuth()
  const drive = google.drive({ version: 'v3', auth })

  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const datePart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  const timePart = `${pad(now.getHours())}-${pad(now.getMinutes())}`
  const safeName = applicantName
    .toLowerCase()
    .replace(/[^a-z0-9À-ɏ]/gi, '-')
    .replace(/-+/g, '-')
    .slice(0, 40)
  const folderName = `${datePart}_${timePart}_${safeName}`

  const parentId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID ?? ''
  const yearFolderId = await ensureSubfolder(drive, parentId, String(now.getFullYear()))

  const res = await drive.files.create({
    ...SD,
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [yearFolderId],
    },
    fields: 'id',
  })

  const folderId = res.data.id!

  // Make folder viewable by anyone with the link
  await drive.permissions.create({
    ...SD,
    fileId: folderId,
    requestBody: { role: 'reader', type: 'anyone' },
  })

  return folderId
}

export async function uploadFileToDrive(
  folderId: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer,
): Promise<string> {
  const auth = getAuth()
  const drive = google.drive({ version: 'v3', auth })

  const res = await drive.files.create({
    ...SD,
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: { mimeType, body: Readable.from(buffer) },
    fields: 'id, webViewLink',
  })

  const fileId = res.data.id!

  await drive.permissions.create({
    ...SD,
    fileId,
    requestBody: { role: 'reader', type: 'anyone' },
  })

  return res.data.webViewLink ?? `https://drive.google.com/file/d/${fileId}/view`
}

export async function uploadPortfolioFiles(
  applicantName: string,
  files: File[],
): Promise<{ folderId: string; fileLinks: string[] }> {
  const folderId = await createApplicantFolder(applicantName)
  const fileLinks: string[] = []

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const link = await uploadFileToDrive(
      folderId,
      file.name,
      file.type || 'application/octet-stream',
      buffer,
    )
    fileLinks.push(link)
  }

  return { folderId, fileLinks }
}

// ─── helpers ────────────────────────────────────────────────────────────────

async function ensureSubfolder(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drive: any,
  parentId: string,
  name: string,
): Promise<string> {
  const res = await drive.files.list({
    ...SD,
    q: `'${parentId}' in parents and name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id)',
    spaces: 'drive',
  })

  if (res.data.files?.length > 0) {
    return res.data.files[0].id as string
  }

  const created = await drive.files.create({
    ...SD,
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId],
    },
    fields: 'id',
  })
  return created.data.id as string
}
