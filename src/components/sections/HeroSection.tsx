'use client'

import { useEffect, useState } from 'react'
import MarqueeBar from '@/components/ui/MarqueeBar'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
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

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-6">
        <div
          className={`transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0 -translate-x-4'}`}
        >
          <span className="font-display text-2xl text-acid tracking-wider">ROW BALTIC</span>
        </div>
        <div
          className={`transition-all duration-700 delay-200 ${loaded ? 'opacity-100' : 'opacity-0 translate-x-4'}`}
        >
          <a
            href="#registracija"
            className="text-xs font-mono uppercase tracking-widest border border-cream/30 px-5 py-2.5 hover:bg-acid hover:text-ink-900 hover:border-acid transition-all duration-300"
          >
            Pieteikties
          </a>
        </div>
      </nav>

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 py-4">
        {/* Year tag */}
        <div
          className={`transition-all duration-700 delay-300 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
        >
          <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-acid border border-acid/40 px-3 py-1.5 mb-5">
            Rīga · 22. augusts · 2026
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
              Ielu Mākslas Festivāls
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-ink-500 uppercase tracking-widest">CĪŅA</span>
            <span className="font-mono text-xs text-ink-600">— Festivāla tēma</span>
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
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-0.5">Vieta</p>
              <p className="font-mono text-xs text-cream">Sarkandaugava, Zāģeru iela</p>
            </div>
            <div className="w-px h-8 bg-ink-700" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-0.5">Pieteikšanās</p>
              <p className="font-mono text-xs text-acid">līdz 22. jūnijam</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
              Organizē:
            </span>
            <span className="font-mono text-xs text-ink-300">Dainis Rudens · Mākslas birojs</span>
          </div>
        </div>
      </div>

      <MarqueeBar className="relative z-10" />
    </section>
  )
}
