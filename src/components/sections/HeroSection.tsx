'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import MarqueeBar from '@/components/ui/MarqueeBar'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import type { Dict, Lang } from '@/i18n'

interface Props {
  dict: Dict
  lang: Lang
}

export default function HeroSection({ dict, lang }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const h = dict.hero

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen max-h-screen flex flex-col justify-between overflow-hidden bg-white"
    >

      {/* Right side visual — fills entire right portion */}
      <div className="absolute right-0 top-0 bottom-0 hidden lg:block w-[59%] pointer-events-none select-none">
        <Image
          src="/ROW26-modular_HH.webp"
          alt="ROW BALTICS 2026"
          fill
          className="object-contain object-center"
          priority
        />
      </div>

      {/* Nav — sticky */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 bg-ink-900 border-b border-ink-800 ${
        scrolled
          ? 'px-6 md:px-12 py-3'
          : 'px-6 md:px-12 pt-6 pb-4'
      }`}>
        <div
          className={`transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0 -translate-x-4'}`}
        >
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className={`font-display text-acid tracking-wider transition-all duration-300 hover:opacity-80 ${scrolled ? 'text-lg' : 'text-2xl'}`}
          >
            ROW BALTICS
          </a>
        </div>
        <div
          className={`flex items-center gap-2 md:gap-4 transition-all duration-700 delay-200 ${loaded ? 'opacity-100' : 'opacity-0 translate-x-4'}`}
        >
          <LanguageSwitcher currentLang={lang} />
          {/* Mobile: icon-only button; Desktop: full text */}
          <a
            href="#registracija"
            className={`font-mono font-bold uppercase tracking-wider bg-acid text-ink-900 hover:bg-acid-dark transition-all duration-300 whitespace-nowrap ${
              scrolled ? 'text-[8px] px-2 py-1.5 md:text-[9px] md:px-3 md:py-2' : 'text-[8px] px-2 py-1.5 md:text-[10px] md:px-5 md:py-2.5'
            }`}
          >
            <span className="md:hidden">→</span>
            <span className="hidden md:inline">{h.register_cta}</span>
          </a>
        </div>
      </nav>

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-20">
        <div className="px-6 md:px-12">

          {/* Giant title */}
          <div>
            <h1
              style={{ margin: 0, padding: 0, lineHeight: 0.88, marginLeft: '-10px' }}
              className={`font-display text-[clamp(3.5rem,12vw,15rem)] text-ink-900 transition-all duration-1000 delay-100 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              ROW
            </h1>
            <h1
              style={{ margin: 0, padding: 0, lineHeight: 0.88, marginLeft: '-10px' }}
              className={`font-display text-[clamp(3.5rem,12vw,15rem)] text-acid transition-all duration-1000 delay-200 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              BALTICS
            </h1>
          </div>

          {/* Tag + CTA — block-level so left edge matches h1 exactly */}
          <div
            className={`mt-6 transition-all duration-700 delay-400 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ marginLeft: 0, paddingLeft: 0 }}
          >
            <div className="w-fit font-mono text-xs uppercase tracking-[0.3em] text-acid border border-acid px-3 py-1.5 mb-3">
              {h.tag}
            </div>
            <a
              href="#registracija"
              className="w-fit block font-mono font-bold text-[10px] uppercase tracking-widest bg-acid text-ink-900 hover:bg-acid-dark transition-all duration-300 px-5 py-2.5"
            >
              {h.register_cta}
            </a>
          </div>

        </div>

        {/* Mobile image — shown below subtitle, hidden on desktop */}
        <div
          className={`lg:hidden mt-6 transition-all duration-700 delay-600 ${
            loaded ? 'opacity-100' : 'opacity-0 translate-y-4'
          }`}
        >
          <Image
            src="/ROW26-modular_HH.webp"
            alt="ROW BALTICS 2026"
            width={2400}
            height={1642}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom info strip */}
      <div
        className={`relative z-10 transition-all duration-700 delay-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="bg-ink-900 border-t border-ink-700 px-6 md:px-12 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-0.5">{h.vieta_label}</p>
              <p className="font-mono text-xs text-cream">{h.vieta_value}</p>
            </div>
            <div className="w-px h-8 bg-ink-700" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-0.5">{h.organize_label}</p>
              <p className="font-mono text-xs text-ink-200">{h.organize_value}</p>
            </div>
          </div>
        </div>
      </div>

      <MarqueeBar text={h.marquee} className="relative z-10" />
    </section>
  )
}
