'use client'

import Link from 'next/link'
import type { Lang } from '@/i18n'
import { languages } from '@/i18n'

interface Props {
  currentLang: Lang
  variant?: 'dark' | 'light' // dark = on dark bg (default), light = on yellow/light bg
}

export default function LanguageSwitcher({ currentLang, variant = 'dark' }: Props) {
  const activeClass = variant === 'light'
    ? 'text-ink-900 font-bold underline underline-offset-2'
    : 'text-acid'
  const inactiveClass = variant === 'light'
    ? 'text-ink-700 hover:text-ink-900'
    : 'text-ink-500 hover:text-ink-200'
  const dividerClass = variant === 'light' ? 'text-ink-600' : 'text-ink-700'

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {languages.map(({ code, label }, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && <span className={`${dividerClass} text-[10px]`}>/</span>}
          <Link
            href={`/${code}`}
            className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${
              currentLang === code ? activeClass : inactiveClass
            }`}
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  )
}
