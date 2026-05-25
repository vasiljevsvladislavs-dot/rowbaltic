import { NextRequest, NextResponse } from 'next/server'
import { appendRegistrationRow } from '@/lib/googleSheets'
import { sendEmail, type Attachment } from '@/lib/email'
import {
  getParticipantConfirmationEmail,
  getAdminNotificationEmail,
  type Lang,
} from '@/lib/emailTemplates'

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
const ADMIN_EMAIL = 'info@rowbaltics.com'
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
  } catch (err) {
    console.error('[register] Failed to parse FormData:', err)
    return NextResponse.json({ message: 'Invalid form data' }, { status: 400 })
  }

  // ── Honeypot ──────────────────────────────────────────────────────────────
  if (getString(formData, 'honeypot')) {
    return NextResponse.json({ ok: true })
  }

  // ── Fields ────────────────────────────────────────────────────────────────
  const rawLang = getString(formData, 'language')
  const language: Lang = VALID_LANGS.includes(rawLang as Lang) ? (rawLang as Lang) : 'lv'

  const name           = getString(formData, 'name')
  const phone          = getString(formData, 'phone')
  const email          = getString(formData, 'email')
  const portfolioLink  = getString(formData, 'portfolioLink')
  const socialLink     = getString(formData, 'socialLink')
  const platformSize   = getString(formData, 'platformSize')
  const shirtSize      = getString(formData, 'shirtSize')
  const isBalticArtist = getString(formData, 'isBalticArtist') === 'true'
  const fullName       = getString(formData, 'fullName')
  const personalCode   = getString(formData, 'personalCode')
  const consent        = getString(formData, 'consent') === 'true'

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

  console.log(`[register] New submission: ${name} <${email}> lang=${language} files=${files.length}`)

  // ── Convert uploaded files → email attachments ────────────────────────────
  const attachments: Attachment[] = []
  for (const file of files) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type || 'application/octet-stream',
      })
    } catch (err) {
      console.error(`[register] Failed to read file "${file.name}":`, err)
    }
  }

  // ── Save to Google Sheets ─────────────────────────────────────────────────
  const timestamp = new Date().toISOString()
  let sheetsOk = false
  if (!process.env.GOOGLE_SHEETS_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    console.warn('[register] Sheets env vars missing')
  } else {
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
        fileLinks: attachments.length > 0
          ? `${attachments.length} file(s) attached to admin email`
          : '',
        consent: consent ? 'Jā' : 'Nē',
      })
      sheetsOk = true
      console.log(`[register] Sheets row appended for ${name}`)
    } catch (err) {
      console.error('[register] Sheets append failed:', err)
    }
  }

  // ── Send emails ───────────────────────────────────────────────────────────
  let emailsOk = false
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[register] SMTP env vars missing')
  } else {
    const adminMail = getAdminNotificationEmail({
      timestamp, language, name, phone, email,
      portfolioLink, socialLink, platformSize, shirtSize,
      isBalticArtist, fullName, personalCode,
      fileLinks: [],   // files are now attachments, not Drive links
      consent,
    })
    const confirmMail = getParticipantConfirmationEmail(language, {
      name, email,
      hasFiles: attachments.length > 0,
      fileCount: attachments.length,
    })

    const [adminResult, confirmResult] = await Promise.allSettled([
      // Admin gets the portfolio files as attachments
      sendEmail({ to: ADMIN_EMAIL, ...adminMail, attachments }),
      // Applicant gets a plain confirmation (no attachments)
      sendEmail({ to: email, ...confirmMail }),
    ])

    if (adminResult.status === 'rejected') {
      console.error('[register] Admin email failed:', adminResult.reason)
    } else {
      console.log(`[register] Admin email sent to ${ADMIN_EMAIL} with ${attachments.length} attachment(s)`)
    }

    if (confirmResult.status === 'rejected') {
      console.error('[register] Confirmation email failed:', confirmResult.reason)
    } else {
      console.log(`[register] Confirmation email sent to ${email}`)
      emailsOk = true
    }
  }

  console.log(`[register] Done — sheets=${sheetsOk} emails=${emailsOk}`)
  return NextResponse.json({ ok: true })
}
