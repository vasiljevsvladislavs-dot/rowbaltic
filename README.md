# ROW BALTIC 2026

Next.js 15 website for the ROW BALTIC street art festival.

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS** — dark urban aesthetic
- **Framer Motion** (optional) / CSS animations
- **Google Sheets API** — form submissions
- **Nodemailer** — email notifications

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in the values (see below).

### 3. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Description |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google Cloud service account email |
| `GOOGLE_PRIVATE_KEY` | Service account private key (with `\n` for newlines) |
| `GOOGLE_SHEET_ID` | ID from the Google Sheets URL |
| `SMTP_HOST` | SMTP server (default: smtp.gmail.com) |
| `SMTP_PORT` | SMTP port (default: 587) |
| `SMTP_USER` | Your email address |
| `SMTP_PASS` | App password (not your regular password) |

---

## Google Sheets Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project → Enable **Google Sheets API**
3. Create a **Service Account** → Download JSON key
4. Copy `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
5. Copy `private_key` → `GOOGLE_PRIVATE_KEY`
6. Create a Google Sheet with a tab named **"Pieteikumi"**
7. Share the sheet with the service account email (Editor access)
8. Copy the Sheet ID from the URL → `GOOGLE_SHEET_ID`

### Sheet columns (row 1 headers):
`Datums | Vārds/Pseidonīms | Tālrunis | E-pasts | Portfolio URL | Sociālie tīkli | Platformas izmērs | Krekla izmērs | Baltijas mākslinieks | Vārds Uzvārds | Personas kods | Portfolio fails`

---

## Email Setup (Gmail)

1. Enable 2FA on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Generate an App Password for "Mail"
4. Use it as `SMTP_PASS`

---

## Adding Real Photos

Place your collage images in `/public/collage/`:
- `photo-1.jpg` through `photo-5.jpg` (or more)

Recommended: 1200×800px JPEGs, optimized for web.

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) and add environment variables in the Vercel dashboard.

---

## Project Structure

```
src/
├── app/
│   ├── api/register/route.ts   # Form submission API
│   ├── layout.tsx              # Root layout + SEO metadata
│   ├── page.tsx                # Main page
│   └── globals.css             # Global styles + Tailwind
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutFestival.tsx
│   │   ├── FestivalSection.tsx
│   │   ├── CompetitionSection.tsx
│   │   ├── RegistrationForm.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── AnimateIn.tsx       # Scroll-triggered animations
│       ├── MarqueeBar.tsx      # Scrolling ticker
│       └── PhotoCollage.tsx    # Reusable collage component
├── lib/utils.ts
└── types/index.ts
public/
└── collage/                    # Add your photos here
```
