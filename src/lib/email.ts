import nodemailer from 'nodemailer'

function createTransport() {
  const host = process.env.SMTP_HOST ?? 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT ?? 465)
  // port 465 = SSL (secure:true), port 587 = STARTTLS (secure:false)
  const secure = port === 465

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

export interface MailOptions {
  to: string
  subject: string
  text: string
  html: string
}

export async function sendEmail(opts: MailOptions): Promise<void> {
  const transporter = createTransport()
  await transporter.sendMail({
    from: `"ROW BALTIC" <${process.env.SMTP_USER ?? 'info@rowbaltic.com'}>`,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  })
}
