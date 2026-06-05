'use client'

import Link from 'next/link'
import type { Lang } from '@/i18n'
import { languages } from '@/i18n'

interface Props {
  currentLang: Lang
}

export default function LanguageSwitcher({ currentLang }: Props) {
  return (
    <div className="flex items-center gap-1">
      {languages.map(({ code, label }, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && <span className="text-ink-700 text-[10px]">/</span>}
          <Link
            href={`/${code}`}
            className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${
              currentLang === code
                ? 'text-acid'
                : 'text-ink-500 hover:text-ink-200'
            }`}
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  )
}
