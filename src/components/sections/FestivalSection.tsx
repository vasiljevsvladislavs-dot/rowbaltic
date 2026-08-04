import AnimateIn from '@/components/ui/AnimateIn'
import type { Dict } from '@/i18n'

interface Props {
  dict: Dict
}

export default function FestivalSection({ dict }: Props) {
  const f = dict.festival

  return (
    <section id="row-baltic-2026" className="bg-white border-t border-gray-200">
      {/* Big theme banner */}
      <div className="bg-white border-y border-gray-200 py-16 md:py-24 px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateIn>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-rust">{f.num}</span>
              <div className="w-12 h-px bg-rust" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-500">
                {f.label}
              </span>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <AnimateIn>
                <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-6">
                  {f.theme_sublabel}
                </p>
                <h2 className="font-display text-[clamp(5rem,15vw,14rem)] leading-none text-ink-900">
                  {dict.hero.theme_word}
                </h2>
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-20 h-1 bg-rust" />
                  <span className="font-mono text-xs text-gray-600 italic">
                    &ldquo;Battle&rdquo; — {f.theme_sublabel}
                  </span>
                </div>
              </AnimateIn>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <AnimateIn delay={200}>
                <p className="text-gray-700 leading-relaxed">
                  {f.support}
                </p>
              </AnimateIn>
              <AnimateIn delay={300}>
                <p className="text-gray-600 leading-relaxed">
                  {f.p1} {f.p2}
                </p>
              </AnimateIn>
              <AnimateIn delay={400}>
                <p className="text-gray-600 leading-relaxed">
                  {f.p3}
                </p>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
