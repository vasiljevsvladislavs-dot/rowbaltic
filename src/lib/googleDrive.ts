import { google } from 'googleapis'
import { Readable } from 'stream'
import { getGoogleAuth } from './googleAuth'

function getAuth() {
  return getGoogleAuth(['https://www.googleapis.com/auth/drive'])
}

/**
 * Creates an applicant folder inside ROW BALTIC Applicants/2026/
 * Folder name format: YYYY-MM-DD_HH-mm_applicant-name
 */
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

  // Ensure year subfolder exists inside parent
  const parentId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID ?? ''
  const yearFolderId = await ensureSubfolder(drive, parentId, String(now.getFullYear()))

  // Create applicant folder
  const res = await drive.files.create({
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
    fileId: folderId,
    requestBody: { role: 'reader', type: 'anyone' },
  })

  return folderId
}

/**
 * Uploads a single file buffer to the given Drive folder.
 * Returns a shareable link.
 */
export async function uploadFileToDrive(
  folderId: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer,
): Promise<string> {
  const auth = getAuth()
  const drive = google.drive({ version: 'v3', auth })

  const stream = Readable.from(buffer)

  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: { mimeType, body: stream },
    fields: 'id, webViewLink',
  })

  const fileId = res.data.id!

  // Make file viewable by anyone with the link
  await drive.permissions.create({
    fileId,
    requestBody: { role: 'reader', type: 'anyone' },
  })

  return res.data.webViewLink ?? `https://drive.google.com/file/d/${fileId}/view`
}

/**
 * Uploads multiple File objects (from FormData) to a new applicant folder.
 * Returns { folderId, fileLinks }
 */
export async function uploadPortfolioFiles(
  applicantName: string,
  files: File[],
): Promise<{ folderId: string; fileLinks: string[] }> {
  const folderId = await createApplicantFolder(applicantName)
  const fileLinks: string[] = []

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const link = await uploadFileToDrive(folderId, file.name, file.type || 'application/octet-stream', buffer)
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
  // Check if subfolder already exists
  const res = await drive.files.list({
    q: `'${parentId}' in parents and name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id)',
    spaces: 'drive',
  })

  if (res.data.files && res.data.files.length > 0) {
    return res.data.files[0].id as string
  }

  // Create it
  const created = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId],
    },
    fields: 'id',
  })
  return created.data.id as string
}
