import Image from 'next/image'
import AnimateIn from '@/components/ui/AnimateIn'
import type { Dict } from '@/i18n'

interface Props {
  dict: Dict
}

export default function CompetitionSection({ dict }: Props) {
  const c = dict.competition

  return (
    <section id="konkurss" className="section-pad bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimateIn>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">{c.num}</span>
            <div className="w-12 h-px bg-acid" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-500">
              {c.label}
            </span>
          </div>
        </AnimateIn>

        {/*
          Mobile order:  1 heading  →  2 wall+image  →  3 rules  →  4 prizes
          Desktop grid:  [heading | rules] / [wall+image | prizes]
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_auto] gap-x-16">

          {/* 1 — Heading / texts / theme  (desktop: col 1-5, row 1) */}
          <div className="lg:col-start-1 lg:col-span-5 lg:row-start-1">
            <AnimateIn delay={100}>
              <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-none text-ink-900 mb-8">
                {c.heading[0]}<br />
                <span className="text-acid">{c.heading[1]}</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={200}>
              <p className="text-gray-700 leading-relaxed mb-6">{c.p1}</p>
            </AnimateIn>
            <AnimateIn delay={250}>
              <p className="text-gray-600 leading-relaxed mb-10">{c.p2}</p>
            </AnimateIn>
            <AnimateIn delay={300}>
              <div className="border border-acid/30 bg-acid/5 p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-acid mb-3">{c.theme_label}</p>
                <p className="font-display text-5xl text-ink-900 mb-3">{dict.hero.theme_word}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{c.theme_desc}</p>
              </div>
            </AnimateIn>
          </div>

          {/* 2 — Wall size + siena  (desktop: col 1-5, row 2) */}
          <div className="lg:col-start-1 lg:col-span-5 lg:row-start-2 mt-10 lg:mt-0">
            <AnimateIn delay={350}>
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-6 mb-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-1">{c.wall_label}</p>
                    <p className="font-display text-3xl text-acid">2.8m × 4.1m</p>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-1">{c.participants_label}</p>
                    <p className="font-display text-3xl text-ink-900">30</p>
                  </div>
                </div>
                <div className="relative w-full overflow-hidden border border-gray-200">
                  <Image
                    src="/siena.jpeg"
                    alt="Siena — ROW BALTIC 2026"
                    width={1536}
                    height={2048}
                    className="w-full h-auto lg:max-h-[480px] object-cover object-center"
                    priority={false}
                  />
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* 3 — Rules  (desktop: col 6-12, row 1) */}
          <div className="lg:col-start-6 lg:col-span-7 lg:row-start-1 space-y-4 mt-10 lg:mt-0">
            {c.rules.map((rule, i) => (
              <AnimateIn key={rule.num} delay={100 + i * 80} direction="left">
                <div className="group flex gap-6 border border-gray-200 p-6 hover:border-acid/40 hover:bg-acid/3 transition-all duration-300">
                  <span className="font-display text-4xl text-acid/30 group-hover:text-acid/60 transition-colors pt-1 shrink-0">
                    {rule.num}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink-900 mb-2 group-hover:text-acid transition-colors">{rule.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{rule.text}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* 4 — Prizes  (desktop: col 6-12, row 2) */}
          <div className="lg:col-start-6 lg:col-span-7 lg:row-start-2 mt-10 lg:mt-0">
            <AnimateIn delay={500} direction="left">
              <div className="border-t border-gray-200 pt-6">
                <div className="border border-gray-200 bg-gray-50 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-6">{c.prizes_label}</p>
                  <div className="space-y-4">
                    {c.prizes.map(({ place, reward, color }) => (
                      <div key={place} className="flex items-center gap-4">
                        <span className={`font-display text-3xl w-10 ${color}`}>{place}</span>
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="font-mono text-sm text-gray-700">{reward}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">{c.contact_label}</p>
                    <a href="mailto:info@rowbaltics.com" className="font-mono text-sm text-acid hover:underline">
                      info@rowbaltics.com
                    </a>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>

        </div>

        {/* Copyright note */}
        <AnimateIn delay={200}>
          <div className="mt-16 border-t border-gray-200 pt-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-3">
              {c.copyright_label}
            </p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-3xl">
              {c.copyright_text}
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
