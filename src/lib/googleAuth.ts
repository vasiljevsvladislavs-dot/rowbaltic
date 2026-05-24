/**
 * Google service account auth helper.
 *
 * Node.js 18+ uses OpenSSL 3 which no longer supports PKCS#1 RSA keys
 * (-----BEGIN RSA PRIVATE KEY-----). Google service account JSON files
 * ship PKCS#1 keys. We convert to PKCS#8 at runtime so signing works.
 */
import { createPrivateKey } from 'crypto'
import { google } from 'googleapis'

function toPkcs8(raw: string): string {
  // Replace literal \n with real newlines (common Vercel env var issue)
  const pem = raw.replace(/\\n/g, '\n')
  try {
    const keyObj = createPrivateKey({ key: pem, format: 'pem' })
    return keyObj.export({ type: 'pkcs8', format: 'pem' }) as string
  } catch {
    // Already PKCS#8, or conversion failed — return as-is
    return pem
  }
}

export function getGoogleAuth(scopes: string[]) {
  const privateKey = toPkcs8(process.env.GOOGLE_PRIVATE_KEY ?? '')
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes,
  })
}
