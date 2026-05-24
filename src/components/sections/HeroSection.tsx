'use client'

import { useEffect, useState } from 'react'
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
      className="relative h-screen max-h-screen flex flex-col justify-between bg-ink-900 overflow-hidden"
    >
      {/* Background texture layers */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(200,255,0,0.15) 40px, rgba(200,255,0,0.15) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(200,255,0,0.15) 40px, rgba(200,255,0,0.15) 41px)',
          }}
        />
      </div>

      {/* Spray paint splatter accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-acid/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-rust/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Nav — sticky */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? 'bg-ink-900/95 backdrop-blur-sm border-b border-ink-800 px-6 md:px-12 py-3'
          : 'px-6 md:px-12 pt-6 pb-0'
      }`}>
        <div
          className={`transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0 -translate-x-4'}`}
        >
          <span className={`font-display text-acid tracking-wider transition-all duration-300 ${scrolled ? 'text-lg' : 'text-2xl'}`}>
            ROW BALTIC
          </span>
        </div>
        <div
          className={`flex items-center gap-6 transition-all duration-700 delay-200 ${loaded ? 'opacity-100' : 'opacity-0 translate-x-4'}`}
        >
          <LanguageSwitcher currentLang={lang} />
          <a
            href="#registracija"
            className={`font-mono uppercase tracking-widest border border-cream/30 hover:bg-acid hover:text-ink-900 hover:border-acid transition-all duration-300 ${
              scrolled ? 'text-[10px] px-4 py-2' : 'text-xs px-5 py-2.5'
            }`}
          >
            {h.register_cta}
          </a>
        </div>
      </nav>

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 py-4 pt-20">
        {/* Year tag */}
        <div
          className={`transition-all duration-700 delay-300 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
        >
          <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-acid border border-acid/40 px-3 py-1.5 mb-5">
            {h.tag}
          </span>
        </div>

        {/* Giant title */}
        <div className="overflow-hidden">
          <h1
            className={`font-display text-[clamp(4.5rem,15vw,15rem)] leading-none text-cream transition-all duration-1000 delay-100 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            ROW
          </h1>
        </div>
        <div className="overflow-hidden -mt-3 md:-mt-6">
          <h1
            className={`font-display text-[clamp(4.5rem,15vw,15rem)] leading-none text-acid transition-all duration-1000 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            BALTIC
          </h1>
        </div>
        <div className="overflow-hidden -mt-2 md:-mt-3">
          <h2
            className={`font-display text-[clamp(2.5rem,8vw,8rem)] leading-none text-cream/30 transition-all duration-1000 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            2026
          </h2>
        </div>

        {/* Subtitle row */}
        <div
          className={`mt-6 flex flex-col md:flex-row md:items-end gap-4 md:gap-10 transition-all duration-700 delay-500 ${
            loaded ? 'opacity-100' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-acid" />
            <span className="font-mono text-xs uppercase tracking-widest text-ink-300">
              {h.festival_label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-ink-500 uppercase tracking-widest">{h.theme_word}</span>
            <span className="font-mono text-xs text-ink-600">{h.theme_label}</span>
          </div>
        </div>
      </div>

      {/* Bottom info strip */}
      <div
        className={`relative z-10 transition-all duration-700 delay-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="border-t border-ink-700 px-6 md:px-12 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-0.5">{h.vieta_label}</p>
              <p className="font-mono text-xs text-cream">{h.vieta_value}</p>
            </div>
            <div className="w-px h-8 bg-ink-700" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-0.5">{h.deadline_label}</p>
              <p className="font-mono text-xs text-acid">{h.deadline_value}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
              {h.organize_label}
            </span>
            <span className="font-mono text-xs text-ink-300">{h.organize_value}</span>
          </div>
        </div>
      </div>

      <MarqueeBar text={h.marquee} className="relative z-10" />
    </section>
  )
}
