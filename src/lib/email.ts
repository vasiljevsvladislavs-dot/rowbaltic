import nodemailer from 'nodemailer'

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER ?? 'info@rowbaltic.com',
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
