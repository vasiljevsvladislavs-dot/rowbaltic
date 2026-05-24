import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'

// ─── Google Sheets helper ────────────────────────────────────────────────────

async function appendToSheet(data: Record<string, string>) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const row = [
    new Date().toISOString(),
    data.nickname,
    data.phone,
    data.email,
    data.portfolioUrl,
    data.socialUrl,
    data.wallSize,
    data.shirtSize,
    data.isBalticArtist === 'true' ? 'Jā' : 'Nē',
    data.fullName || '',
    data.personalCode || '',
    data.portfolioFileName || '',
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Pieteikumi!A:L',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  })
}

// ─── Email helper ─────────────────────────────────────────────────────────────

async function sendNotification(data: Record<string, string>) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const isBaltic = data.isBalticArtist === 'true'

  await transporter.sendMail({
    from: `"ROW BALTIC 2026" <${process.env.SMTP_USER}>`,
    to: 'info@rowbaltic.com',
    replyTo: data.email,
    subject: `Jauns pieteikums — ${data.nickname}`,
    html: `
      <div style="font-family: monospace; background: #0a0a0a; color: #f0ece3; padding: 32px; max-width: 600px;">
        <h1 style="color: #c8ff00; font-size: 32px; margin: 0 0 24px;">ROW BALTIC 2026</h1>
        <h2 style="color: #f0ece3; font-size: 16px; font-weight: normal; border-bottom: 1px solid #303030; padding-bottom: 16px; margin-bottom: 24px;">
          Jauns pieteikums
        </h2>

        <table style="width:100%; border-collapse: collapse;">
          ${[
            ['Vārds / Pseidonīms', data.nickname],
            ['Tālrunis', data.phone],
            ['E-pasts', data.email],
            ['Portfolio', data.portfolioUrl || '—'],
            ['Sociālie tīkli', data.socialUrl || '—'],
            ['Platformas izmērs', data.wallSize || '—'],
            ['Krekla izmērs', data.shirtSize],
            ['Baltijas mākslinieks', isBaltic ? 'Jā' : 'Nē'],
            ...(isBaltic
              ? [
                  ['Vārds Uzvārds', data.fullName || '—'],
                  ['Personas kods', data.personalCode || '—'],
                ]
              : []),
            ['Portfolio fails', data.portfolioFileName || '—'],
          ]
            .map(
              ([label, value]) => `
              <tr>
                <td style="color:#757575; padding: 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; width: 160px; vertical-align: top;">${label}</td>
                <td style="color:#f0ece3; padding: 8px 0; font-size: 13px;">${value}</td>
              </tr>`
            )
            .join('')}
        </table>

        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #303030; color: #424242; font-size: 10px;">
          rowbaltic.com · ${new Date().toLocaleString('lv-LV')}
        </div>
      </div>
    `,
  })
}

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const data: Record<string, string> = {
      nickname: formData.get('nickname') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      portfolioUrl: (formData.get('portfolioUrl') as string) || '',
      socialUrl: (formData.get('socialUrl') as string) || '',
      wallSize: (formData.get('wallSize') as string) || '',
      shirtSize: formData.get('shirtSize') as string,
      isBalticArtist: (formData.get('isBalticArtist') as string) || 'false',
      fullName: (formData.get('fullName') as string) || '',
      personalCode: (formData.get('personalCode') as string) || '',
      portfolioFileName: '',
    }

    // Validate required fields
    if (!data.nickname || !data.phone || !data.email || !data.shirtSize) {
      return NextResponse.json(
        { message: 'Lūdzu aizpildiet visus obligātos laukus.' },
        { status: 400 }
      )
    }

    // Handle file upload name
    const portfolioFile = formData.get('portfolioFile') as File | null
    if (portfolioFile && portfolioFile.size > 0) {
      data.portfolioFileName = portfolioFile.name
      // In production you'd upload to S3/Vercel Blob here
      // const buffer = Buffer.from(await portfolioFile.arrayBuffer())
      // await uploadToStorage(buffer, portfolioFile.name)
    }

    // Run both integrations in parallel (non-blocking if not configured)
    const tasks: Promise<void>[] = []

    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      tasks.push(appendToSheet(data).catch((err) => console.error('Sheets error:', err)))
    }

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      tasks.push(sendNotification(data).catch((err) => console.error('Email error:', err)))
    }

    await Promise.all(tasks)

    return NextResponse.json({ ok: true, message: 'Pieteikums saņemts!' }, { status: 200 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Servera kļūda. Lūdzu mēģiniet vēlreiz.' },
      { status: 500 }
    )
  }
}
