import Image from 'next/image'
import AnimateIn from '@/components/ui/AnimateIn'
import type { Dict } from '@/i18n'

interface Props {
  dict: Dict
}

export default function CompetitionSection({ dict }: Props) {
  const c = dict.competition

  return (
    <section id="konkurss" className="section-pad border-t border-[#2a1a0a]" style={{ backgroundColor: '#18100a' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimateIn>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">{c.num}</span>
            <div className="w-12 h-px bg-acid" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
              {c.label}
            </span>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left */}
          <div className="lg:col-span-5">
            <AnimateIn delay={100}>
              <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-none text-cream mb-8">
                {c.heading[0]}<br />
                <span className="text-acid">{c.heading[1]}</span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={200}>
              <p className="text-ink-200 leading-relaxed mb-6">
                {c.p1}
              </p>
            </AnimateIn>

            <AnimateIn delay={250}>
              <p className="text-ink-300 leading-relaxed mb-10">
                {c.p2}
              </p>
            </AnimateIn>

            {/* Theme callout */}
            <AnimateIn delay={300}>
              <div className="border border-acid/30 bg-acid/5 p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-acid mb-3">
                  {c.theme_label}
                </p>
                <p className="font-display text-5xl text-cream mb-3">{dict.hero.theme_word}</p>
                <p className="text-ink-300 text-sm leading-relaxed">
                  {c.theme_desc}
                </p>
              </div>
            </AnimateIn>

            {/* Wall size */}
            <AnimateIn delay={350}>
              <div className="mt-6 border-t border-ink-800 pt-6">
                <div className="flex items-center gap-6 mb-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-1">
                      {c.wall_label}
                    </p>
                    <p className="font-display text-3xl text-acid">2.8m × 4.1m</p>
                  </div>
                  <div className="w-px h-12 bg-ink-700" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-1">
                      {c.participants_label}
                    </p>
                    <p className="font-display text-3xl text-cream">30</p>
                  </div>
                </div>
                <div className="relative w-full overflow-hidden border border-ink-800">
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

          {/* Right: rules + prizes */}
          <div className="lg:col-span-7 space-y-4">
            {/* Rules */}
            {c.rules.map((rule, i) => (
              <AnimateIn key={rule.num} delay={100 + i * 80} direction="left">
                <div className="group flex gap-6 border border-ink-800 p-6 hover:border-acid/40 hover:bg-acid/3 transition-all duration-300">
                  <span className="font-display text-4xl text-acid/30 group-hover:text-acid/60 transition-colors pt-1 shrink-0">
                    {rule.num}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-cream mb-2 group-hover:text-acid transition-colors">
                      {rule.title}
                    </h3>
                    <p className="text-ink-300 text-sm leading-relaxed">{rule.text}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}

            {/* Prizes */}
            <AnimateIn delay={500} direction="left">
              <div className="border border-ink-700 bg-ink-800 p-6 mt-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-400 mb-6">
                  {c.prizes_label}
                </p>
                <div className="space-y-4">
                  {c.prizes.map(({ place, reward, color }) => (
                    <div key={place} className="flex items-center gap-4">
                      <span className={`font-display text-3xl w-10 ${color}`}>{place}</span>
                      <div className="flex-1 h-px bg-ink-700" />
                      <span className="font-mono text-sm text-ink-200">{reward}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-ink-700">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-2">
                    {c.contact_label}
                  </p>
                  <a
                    href="mailto:info@rowbaltics.com"
                    className="font-mono text-sm text-acid hover:underline"
                  >
                    info@rowbaltics.com
                  </a>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>

        {/* Copyright note */}
        <AnimateIn delay={200}>
          <div className="mt-16 border-t border-ink-800 pt-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-3">
              {c.copyright_label}
            </p>
            <p className="text-ink-400 text-sm leading-relaxed max-w-3xl">
              {c.copyright_text}
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
