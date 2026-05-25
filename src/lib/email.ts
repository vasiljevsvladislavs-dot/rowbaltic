import nodemailer from 'nodemailer'

function createTransport() {
  const host = process.env.SMTP_HOST ?? 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT ?? 465)
  const secure = port === 465 // 465 = SSL, 587 = STARTTLS

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER ?? '',
      pass: process.env.SMTP_PASS ?? '',
    },
  })
}

export interface Attachment {
  filename: string
  content: Buffer
  contentType: string
}

export interface MailOptions {
  to: string
  subject: string
  text: string
  html: string
  attachments?: Attachment[]
}

export async function sendEmail(opts: MailOptions): Promise<void> {
  const transporter = createTransport()
  await transporter.sendMail({
    from: `"ROW BALTICS" <${process.env.SMTP_USER ?? 'info@rowbaltics.com'}>`,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    attachments: opts.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
    })),
  })
}
