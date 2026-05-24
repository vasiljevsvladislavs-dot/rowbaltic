/**
 * Google service account auth helper.
 *
 * ERR_OSSL_UNSUPPORTED fix: Node.js 18 + OpenSSL 3 dropped support for
 * PKCS#1 RSA private keys (-----BEGIN RSA PRIVATE KEY-----).
 * We normalize the PEM and convert to PKCS#8 before handing it to googleapis.
 */
import { createPrivateKey } from 'crypto'
import { google } from 'googleapis'

/** Fix literal \\n from Vercel env vars + strip stray whitespace. */
function normalizePem(raw: string): string {
  return raw
    .replace(/\\n/g, '\n')   // JSON-escaped \n → real newline
    .replace(/\r\n/g, '\n')  // Windows line endings
    .replace(/ +\n/g, '\n')  // trailing spaces before newline
    .trim()
}

/**
 * Convert PKCS#1 (-----BEGIN RSA PRIVATE KEY-----) to PKCS#8
 * (-----BEGIN PRIVATE KEY-----), which OpenSSL 3 fully supports.
 * If the key is already PKCS#8, returns it unchanged.
 */
function ensurePkcs8(pem: string): string {
  if (pem.includes('-----BEGIN PRIVATE KEY-----')) {
    // Already PKCS#8 — nothing to do
    return pem
  }

  if (pem.includes('-----BEGIN RSA PRIVATE KEY-----')) {
    console.log('[googleAuth] PKCS#1 key detected — converting to PKCS#8')
  } else {
    console.warn('[googleAuth] Unrecognised key header — attempting PKCS#8 conversion anyway')
  }

  try {
    const keyObj = createPrivateKey({ key: pem, format: 'pem' })
    const pkcs8 = keyObj.export({ type: 'pkcs8', format: 'pem' }) as string
    console.log('[googleAuth] PKCS#8 conversion OK')
    return pkcs8
  } catch (err) {
    console.error('[googleAuth] PKCS#8 conversion failed — using raw key:', err instanceof Error ? err.message : err)
    return pem
  }
}

export function getGoogleAuth(scopes: string[]) {
  const raw = process.env.GOOGLE_PRIVATE_KEY ?? ''

  if (!raw) {
    console.error('[googleAuth] GOOGLE_PRIVATE_KEY env var is empty!')
  }
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    console.error('[googleAuth] GOOGLE_SERVICE_ACCOUNT_EMAIL env var is empty!')
  }

  const privateKey = ensurePkcs8(normalizePem(raw))

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes,
  })
}
