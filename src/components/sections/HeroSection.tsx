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
      className="relative h-screen max-h-screen flex flex-col justify-between bg-white overflow-hidden"
    >

      {/* Right side visual */}
      <div className="absolute right-0 top-0 bottom-0 hidden lg:flex items-center justify-center w-[52%] pointer-events-none select-none">
        <Image
          src="/ROW_1200x1200_2.png"
          alt="ROW BALTICS 2026"
          width={1200}
          height={1200}
          className="w-[68%] h-auto object-contain -translate-x-[25%]"
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
            className={`font-display text-[clamp(4.5rem,15vw,15rem)] leading-none text-ink-900 transition-all duration-1000 delay-100 ${
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
            BALTICS
          </h1>
        </div>
        <div className="overflow-hidden -mt-2 md:-mt-3">
          <h2
            className={`font-display text-[clamp(2.5rem,8vw,8rem)] leading-none text-gray-200 transition-all duration-1000 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            2026
          </h2>
        </div>

        {/* Subtitle row */}
        <div
          className={`mt-6 flex items-center gap-3 transition-all duration-700 delay-500 ${
            loaded ? 'opacity-100' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="w-8 h-px bg-acid" />
          <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
            {h.festival_label}
          </span>
        </div>

        {/* Mobile image — shown below subtitle, hidden on desktop */}
        <div
          className={`lg:hidden mt-6 transition-all duration-700 delay-600 ${
            loaded ? 'opacity-100' : 'opacity-0 translate-y-4'
          }`}
        >
          <Image
            src="/ROW_1200x1200_2.png"
            alt="ROW BALTICS 2026"
            width={1200}
            height={1200}
            className="w-full max-w-sm mx-auto h-auto object-contain"
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
