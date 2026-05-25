export type Lang = 'lv' | 'en' | 'lt' | 'ee'

export interface ConfirmationData {
  name: string
  email: string
  hasFiles: boolean
  fileCount?: number
}

export interface AdminData {
  timestamp: string
  language: string
  name: string
  phone: string
  email: string
  portfolioLink: string
  socialLink: string
  platformSize: string
  shirtSize: string
  isBalticArtist: boolean
  fullName: string
  personalCode: string
  fileLinks: string[]
  consent: boolean
}

// ─── Participant confirmation ─────────────────────────────────────────────────

const confirmationContent: Record<Lang, {
  subject: string
  greeting: (name: string) => string
  body: (data: ConfirmationData) => string
  filesNote: (count: number) => string
  contact: string
  signature: string
}> = {
  lv: {
    subject: 'Jūsu pieteikums ROW BALTICS 2026 ir saņemts',
    greeting: (name) => `Sveiki, ${name}!`,
    body: () =>
      `Paldies, ka pieteicāties ielu mākslas festivāla <strong>ROW BALTICS 2026</strong> zīmēšanas konkursam!\n\nJūsu pieteikums ir veiksmīgi saņemts. Mūsu komanda to izskatīs un informēs jūs par rezultātiem.\n\nApstiprinātie dalībnieki tiks paziņoti <strong>2026. gada 30. jūnijā</strong>.`,
    filesNote: (count) =>
      `Mēs saņēmām jūsu portfolio — <strong>${count} fails(-i)</strong>. Paldies!`,
    contact: 'Ja jums ir jautājumi, rakstiet uz <a href="mailto:info@rowbaltics.com">info@rowbaltics.com</a>',
    signature: 'Ar cieņu,<br><strong>ROW BALTICS komanda</strong>',
  },
  en: {
    subject: 'Your ROW BALTICS 2026 application has been received',
    greeting: (name) => `Hi ${name}!`,
    body: () =>
      `Thank you for applying to the <strong>ROW BALTICS 2026</strong> street art festival drawing competition!\n\nYour application has been successfully received. Our team will review it and notify you of the results.\n\nConfirmed participants will be announced on <strong>30 June 2026</strong>.`,
    filesNote: (count) =>
      `We have received your portfolio — <strong>${count} file(s)</strong>. Thank you!`,
    contact: 'If you have any questions, write to <a href="mailto:info@rowbaltics.com">info@rowbaltics.com</a>',
    signature: 'Best regards,<br><strong>ROW BALTICS team</strong>',
  },
  lt: {
    subject: 'Jūsų paraiška ROW BALTICS 2026 gauta',
    greeting: (name) => `Sveiki, ${name}!`,
    body: () =>
      `Ačiū, kad pateikėte paraišką į <strong>ROW BALTICS 2026</strong> gatvės meno festivalio piešimo konkursą!\n\nJūsų paraiška sėkmingai gauta. Mūsų komanda ją peržiūrės ir informuos jus apie rezultatus.\n\nPatvirtinti dalyviai bus paskelbti <strong>2026 m. birželio 30 d.</strong>`,
    filesNote: (count) =>
      `Gavome jūsų portfolio — <strong>${count} failas(-ai)</strong>. Ačiū!`,
    contact: 'Jei turite klausimų, rašykite el. paštu <a href="mailto:info@rowbaltics.com">info@rowbaltics.com</a>',
    signature: 'Pagarbiai,<br><strong>ROW BALTICS komanda</strong>',
  },
  ee: {
    subject: 'Teie ROW BALTICS 2026 avaldus on vastu võetud',
    greeting: (name) => `Tere, ${name}!`,
    body: () =>
      `Täname, et esitasite avalduse <strong>ROW BALTICS 2026</strong> tänavakunstifestivali joonistuskonkursile!\n\nTeie avaldus on edukalt vastu võetud. Meie meeskond vaatab selle läbi ja teavitab teid tulemustest.\n\nKinnitatud osalejad teatatakse <strong>30. juunil 2026</strong>.`,
    filesNote: (count) =>
      `Saime kätte teie portfolio — <strong>${count} fail(i)</strong>. Täname!`,
    contact: 'Küsimuste korral kirjutage <a href="mailto:info@rowbaltics.com">info@rowbaltics.com</a>',
    signature: 'Lugupidamisega,<br><strong>ROW BALTICS meeskond</strong>',
  },
}

function wrapHtml(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background: #0f0f0f; font-family: 'Helvetica Neue', Arial, sans-serif; }
  .wrap { max-width: 580px; margin: 40px auto; background: #1a1a1a; border: 1px solid #303030; }
  .header { background: #0f0f0f; padding: 28px 32px; border-bottom: 2px solid #FF8C42; }
  .header h1 { margin: 0; font-size: 24px; font-weight: 700; color: #FF8C42; letter-spacing: 0.1em; font-family: Impact, 'Arial Narrow', Arial, sans-serif; }
  .header p { margin: 4px 0 0; font-size: 11px; color: #616161; letter-spacing: 0.2em; text-transform: uppercase; font-family: monospace; }
  .body { padding: 32px; color: #e0e0e0; font-size: 15px; line-height: 1.7; }
  .body p { margin: 0 0 16px; }
  .body strong { color: #f0ece3; }
  .body a { color: #FF8C42; }
  .note { background: #222; border-left: 3px solid #FF8C42; padding: 14px 18px; margin: 20px 0; border-radius: 0 4px 4px 0; font-size: 14px; }
  .footer { padding: 20px 32px; border-top: 1px solid #303030; font-size: 12px; color: #424242; font-family: monospace; letter-spacing: 0.05em; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>ROW BALTICS</h1>
    <p>Riga Open Wall · Street Art Festival · 2026</p>
  </div>
  <div class="body">
    ${bodyHtml}
  </div>
  <div class="footer">© 2026 ROW BALTICS · info@rowbaltics.com · rowbaltics.com</div>
</div>
</body>
</html>`
}

export function getParticipantConfirmationEmail(
  language: Lang,
  data: ConfirmationData,
): { subject: string; text: string; html: string } {
  const t = confirmationContent[language] ?? confirmationContent.lv

  const bodyLines = [
    t.greeting(data.name),
    '',
    t.body(data).replace(/<[^>]+>/g, ''),
    '',
    ...(data.hasFiles && data.fileCount
      ? [t.filesNote(data.fileCount).replace(/<[^>]+>/g, ''), '']
      : []),
    t.contact.replace(/<[^>]+>/g, ''),
    '',
    t.signature.replace(/<[^>]+>/g, ''),
  ]

  const htmlBody = `
    <p>${t.greeting(data.name)}</p>
    <p>${t.body(data).replace(/\n/g, '<br>')}</p>
    ${data.hasFiles && data.fileCount
      ? `<div class="note">${t.filesNote(data.fileCount)}</div>`
      : ''}
    <p>${t.contact}</p>
    <p>${t.signature}</p>
  `

  return {
    subject: t.subject,
    text: bodyLines.join('\n'),
    html: wrapHtml(htmlBody),
  }
}

// ─── Admin notification ───────────────────────────────────────────────────────

export function getAdminNotificationEmail(
  data: AdminData,
): { subject: string; text: string; html: string } {
  const subject = `Jauns ROW BALTICS pieteikums — ${data.name}`

  const fields: [string, string][] = [
    ['Laiks', data.timestamp],
    ['Valoda', data.language.toUpperCase()],
    ['Vārds / Pseidonīms', data.name],
    ['Telefons', data.phone],
    ['E-pasts', data.email],
    ['Portfolio saite', data.portfolioLink || '—'],
    ['Social saite', data.socialLink || '—'],
    ['Platformas izmērs', data.platformSize],
    ['Krekla izmērs', data.shirtSize],
    ['Baltijas mākslinieks', data.isBalticArtist ? 'Jā' : 'Nē'],
    ['Vārds Uzvārds', data.fullName || '—'],
    ['Personas kods', data.personalCode || '—'],
    ['Piekrišana', data.consent ? 'Jā' : 'Nē'],
  ]

  const textRows = fields.map(([k, v]) => `${k}: ${v}`).join('\n')
  const fileText = data.fileLinks.length
    ? `\nAugšupielādētie faili (${data.fileLinks.length}):\n${data.fileLinks.join('\n')}`
    : '\nNav augšupielādētu failu.'

  const htmlRows = fields
    .map(
      ([k, v]) =>
        `<tr><td style="color:#9e9e9e;padding:6px 12px 6px 0;font-size:13px;white-space:nowrap">${k}</td><td style="padding:6px 0;font-size:13px;color:#f0ece3">${v}</td></tr>`,
    )
    .join('')

  const htmlFiles = data.fileLinks.length
    ? `<div class="note"><strong>Augšupielādētie faili (${data.fileLinks.length}):</strong><br>${data.fileLinks
        .map((l) => `<a href="${l}">${l}</a>`)
        .join('<br>')}</div>`
    : `<p style="color:#616161;font-size:13px">Nav augšupielādētu failu.</p>`

  const htmlBody = `
    <p style="font-size:13px;color:#9e9e9e;font-family:monospace">Jauns pieteikums saņemts vietnē rowbaltics.com</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">${htmlRows}</table>
    ${htmlFiles}
    <p style="font-size:12px;color:#424242;margin-top:24px;font-family:monospace">Dati saglabāti Google Sheets.</p>
  `

  return {
    subject,
    text: `Jauns ROW BALTICS pieteikums\n\n${textRows}${fileText}\n\nDati saglabāti Google Sheets.`,
    html: wrapHtml(htmlBody),
  }
}
