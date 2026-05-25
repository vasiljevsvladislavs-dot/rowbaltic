import MarqueeBar from '@/components/ui/MarqueeBar'
import type { Dict, Lang } from '@/i18n'
import { languages } from '@/i18n'
import Link from 'next/link'

interface Props {
  dict: Dict
  lang: Lang
}

export default function Footer({ dict, lang }: Props) {
  const f = dict.footer

  return (
    <footer className="border-t border-[#2a1a0a]" style={{ backgroundColor: '#18100a' }}>
      <MarqueeBar
        text="ROW BALTIC ✦ RIGA OPEN WALL ✦ IELU MĀKSLA ✦ 2026 ✦"
        className="opacity-40"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-cream mb-6">
              ROW<br />
              <span className="text-acid">BALTIC</span>
            </h2>
            <p className="text-ink-400 text-sm leading-relaxed max-w-xs">
              {f.tagline}
            </p>

            {/* Language switcher in footer */}
            <div className="flex items-center gap-2 mt-8">
              {languages.map(({ code, label }, i) => (
                <span key={code} className="flex items-center gap-2">
                  {i > 0 && <span className="text-ink-700 text-[10px]">/</span>}
                  <Link
                    href={`/${code}`}
                    className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${
                      lang === code
                        ? 'text-acid'
                        : 'text-ink-500 hover:text-ink-200'
                    }`}
                  >
                    {label}
                  </Link>
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-600 mb-6">
              {f.contact_label}
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-mono text-[10px] text-ink-500 mb-1">{f.email_label}</p>
                <a
                  href="mailto:info@rowbaltics.com"
                  className="font-mono text-sm text-acid hover:underline"
                >
                  info@rowbaltics.com
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] text-ink-500 mb-1">Tel.</p>
                <a
                  href="tel:+37129413906"
                  className="font-mono text-sm text-ink-200 hover:text-acid transition-colors"
                >
                  +371 29413906
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-ink-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-[10px] text-ink-600 uppercase tracking-widest">
            {f.copyright}
          </p>
          <p className="font-mono text-[10px] text-ink-700 uppercase tracking-widest">
            {f.support}
          </p>
        </div>
      </div>
    </footer>
  )
}
