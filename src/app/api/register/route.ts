import { NextRequest, NextResponse } from 'next/server'
import { appendRegistrationRow } from '@/lib/googleSheets'
import { uploadPortfolioFiles } from '@/lib/googleDrive'
import { sendEmail } from '@/lib/email'
import {
  getParticipantConfirmationEmail,
  getAdminNotificationEmail,
  type Lang,
} from '@/lib/emailTemplates'

// NOTE: Vercel serverless function body size limit is 4.5 MB by default.
// For files up to 25 MB, configure `maxDuration` and use Vercel's larger
// payload limit (available on Pro plan via vercel.json: "functions" config).
// TODO: For production with many large files, consider a signed upload flow
// where the client uploads directly to Google Drive or Vercel Blob Storage,
// bypassing the serverless function entirely.

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/zip',
  'application/x-zip-compressed',
  'application/octet-stream',
])

const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25 MB
const MAX_FILES = 5
const ADMIN_EMAIL = 'info@rowbaltic.com'
const VALID_LANGS: Lang[] = ['lv', 'en', 'lt', 'ee']

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getString(fd: FormData, key: string): string {
  return (fd.get(key) as string | null)?.trim() ?? ''
}

export async function POST(req: NextRequest) {
  // ── Parse FormData ────────────────────────────────────────────────────────
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ message: 'Invalid form data' }, { status: 400 })
  }

  // ── Honeypot — silent success for bots ────────────────────────────────────
  if (getString(formData, 'honeypot')) {
    return NextResponse.json({ ok: true })
  }

  // ── Fields ────────────────────────────────────────────────────────────────
  const rawLang = getString(formData, 'language')
  const language: Lang = VALID_LANGS.includes(rawLang as Lang) ? (rawLang as Lang) : 'lv'

  const name          = getString(formData, 'name')
  const phone         = getString(formData, 'phone')
  const email         = getString(formData, 'email')
  const portfolioLink = getString(formData, 'portfolioLink')
  const socialLink    = getString(formData, 'socialLink')
  const platformSize  = getString(formData, 'platformSize')
  const shirtSize     = getString(formData, 'shirtSize')
  const isBalticArtist = getString(formData, 'isBalticArtist') === 'true'
  const fullName      = getString(formData, 'fullName')
  const personalCode  = getString(formData, 'personalCode')
  const consent       = getString(formData, 'consent') === 'true'

  // ── Files ─────────────────────────────────────────────────────────────────
  const rawFiles = formData.getAll('portfolioFiles') as File[]
  const files = rawFiles.filter((f) => f instanceof File && f.size > 0)

  // ── Validation ────────────────────────────────────────────────────────────
  const errors: string[] = []

  if (!name)         errors.push('name is required')
  if (!phone)        errors.push('phone is required')
  if (!email)        errors.push('email is required')
  else if (!isValidEmail(email)) errors.push('invalid email format')
  if (!socialLink)   errors.push('socialLink is required')
  if (!platformSize) errors.push('platformSize is required')
  if (!shirtSize)    errors.push('shirtSize is required')
  if (!consent)      errors.push('consent is required')

  if (!portfolioLink && files.length === 0)
    errors.push('Provide a portfolio link or upload at least one file')

  if (isBalticArtist) {
    if (!fullName)     errors.push('fullName is required for Baltic artists')
    if (!personalCode) errors.push('personalCode is required for Baltic artists')
  }

  if (files.length > MAX_FILES)
    errors.push(`Maximum ${MAX_FILES} files allowed`)

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE)
      errors.push(`"${file.name}" exceeds 25 MB limit`)
    if (!ALLOWED_MIME_TYPES.has(file.type))
      errors.push(`File type "${file.type}" is not allowed`)
  }

  if (errors.length > 0) {
    return NextResponse.json({ message: errors.join('; ') }, { status: 422 })
  }

  // ── Upload files to Google Drive ──────────────────────────────────────────
  let fileLinks: string[] = []
  if (files.length > 0 && process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID) {
    try {
      const result = await uploadPortfolioFiles(name, files)
      fileLinks = result.fileLinks
    } catch (err) {
      console.error('[Drive] upload error:', err)
      // Non-fatal — continue without Drive links
    }
  }

  // ── Save to Google Sheets ─────────────────────────────────────────────────
  const timestamp = new Date().toISOString()
  if (process.env.GOOGLE_SHEETS_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    try {
      await appendRegistrationRow({
        timestamp,
        language,
        name,
        phone,
        email,
        portfolioLink,
        socialLink,
        platformSize,
        shirtSize,
        isBalticArtist: isBalticArtist ? 'Jā' : 'Nē',
        fullName,
        personalCode,
        fileLinks: fileLinks.join('\n'),
        consent: consent ? 'Jā' : 'Nē',
      })
    } catch (err) {
      console.error('[Sheets] error:', err)
    }
  }

  // ── Send emails ───────────────────────────────────────────────────────────
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const adminMail = getAdminNotificationEmail({
      timestamp, language, name, phone, email,
      portfolioLink, socialLink, platformSize, shirtSize,
      isBalticArtist, fullName, personalCode, fileLinks, consent,
    })
    const confirmMail = getParticipantConfirmationEmail(language, {
      name, email,
      hasFiles: fileLinks.length > 0,
      fileCount: fileLinks.length,
    })

    await Promise.allSettled([
      sendEmail({ to: ADMIN_EMAIL, ...adminMail }),
      sendEmail({ to: email, ...confirmMail }),
    ])
  }

  return NextResponse.json({ ok: true })
}
