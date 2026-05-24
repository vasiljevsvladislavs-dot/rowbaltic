/**
 * Google service account auth helper.
 *
 * ERR_OSSL_UNSUPPORTED fix: Node.js 18 + OpenSSL 3 dropped support for
 * PKCS#1 RSA private keys (BEGIN RSA PRIVATE KEY).
 *
 * Root cause of silent failure: the private key stored in Vercel env vars
 * often arrives with literal \n characters OR with stripped newlines,
 * producing a malformed single-line PEM that crypto.createPrivateKey rejects.
 * We reconstruct a valid 64-char-per-line PEM, then convert to PKCS#8.
 */
import { createPrivateKey } from 'crypto'
import { google } from 'googleapis'

/**
 * Rebuild a properly-formatted PEM regardless of how Vercel stored it.
 * Handles: literal \\n, stripped newlines, Windows line endings, extra quotes.
 */
function normalizePem(raw: string): string {
  let pem = raw
    // Convert every form of escaped or literal newline
    .replace(/\\n/g, '\n')
    .replace(/\\r\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Strip surrounding quotes that some env var editors add
    .replace(/^["']|["']$/g, '')
    .trim()

  // Re-assemble PEM with strict 64-char body lines
  // (some Vercel storage strips newlines inside the base64 body)
  const match = pem.match(/^(-----BEGIN [A-Z ]+-----)\n?([\s\S]+?)\n?(-----END [A-Z ]+-----)$/)
  if (match) {
    const header = match[1]
    const body   = match[2].replace(/\s+/g, '') // strip ALL whitespace from body
    const footer = match[3]
    const chunks = (body.match(/.{1,64}/g) ?? [body])
    pem = [header, ...chunks, footer].join('\n')
  }

  return pem
}

/**
 * Convert PKCS#1 (BEGIN RSA PRIVATE KEY) to PKCS#8 (BEGIN PRIVATE KEY).
 * OpenSSL 3 requires PKCS#8 for all signing operations.
 * If already PKCS#8 or conversion fails, returns the normalised PEM.
 */
function ensurePkcs8(pem: string): string {
  // Already PKCS#8 — nothing to do
  if (pem.includes('-----BEGIN PRIVATE KEY-----')) {
    console.log('[googleAuth] Key format: PKCS#8 — no conversion needed')
    return pem
  }

  const label = pem.includes('-----BEGIN RSA PRIVATE KEY-----') ? 'PKCS#1' : 'unknown'
  console.log(`[googleAuth] Key format: ${label} — converting to PKCS#8`)

  try {
    const keyObj = createPrivateKey({ key: pem, format: 'pem' })
    const pkcs8  = keyObj.export({ type: 'pkcs8', format: 'pem' }) as string
    console.log('[googleAuth] PKCS#8 conversion: OK')
    return pkcs8
  } catch (err) {
    console.error('[googleAuth] PKCS#8 conversion FAILED — check GOOGLE_PRIVATE_KEY format in Vercel:', err instanceof Error ? err.message : err)
    return pem
  }
}

export function getGoogleAuth(scopes: string[]) {
  const raw = process.env.GOOGLE_PRIVATE_KEY ?? ''

  if (!raw)                                     console.error('[googleAuth] GOOGLE_PRIVATE_KEY is not set')
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) console.error('[googleAuth] GOOGLE_SERVICE_ACCOUNT_EMAIL is not set')

  const privateKey = ensurePkcs8(normalizePem(raw))

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes,
  })
}
