import AnimateIn from '@/components/ui/AnimateIn'
import MarqueeBar from '@/components/ui/MarqueeBar'
import PhotoCollage from '@/components/ui/PhotoCollage'
import type { Dict } from '@/i18n'

const images = [
  { src: '/collage2/photo-05.jpg', alt: 'ROW BALTICS 2025' },
  { src: '/collage2/photo-06.jpg', alt: 'Urban art Riga' },
  { src: '/collage2/photo-07.jpg', alt: 'Street art festival' },
  { src: '/collage2/photo-08.jpg', alt: 'ROW BALTICS artists' },
  { src: '/collage2/photo-09.jpg', alt: 'Sarkandaugava festival' },
  { src: '/collage2/photo-10.jpg', alt: 'ROW BALTICS graffiti' },
  { src: '/collage2/photo-11.jpg', alt: 'Street art Riga' },
  { src: '/collage2/photo-12.jpg', alt: 'ROW BALTICS 2025 battle' },
]

interface Props {
  dict: Dict
}

export default function FestivalSection({ dict }: Props) {
  const f = dict.festival

  return (
    <section id="row-baltic-2026" className="bg-white border-t border-gray-200">
      {/* Big theme banner */}
      <div className="bg-gray-50 border-y border-gray-200 py-16 md:py-24 px-6 md:px-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #ff4400 0%, transparent 50%), radial-gradient(circle at 80% 50%, #c8ff00 0%, transparent 50%)',
          }}
        />
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

      <MarqueeBar
        text={f.marquee}
        className="border-b border-gray-200"
      />

      {/* Photo collage strip */}
      <div className="section-pad px-6 md:px-12 max-w-7xl mx-auto">
        <AnimateIn>
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-display text-3xl md:text-4xl text-gray-700">
              {f.collage_heading}
            </h3>
          </div>
        </AnimateIn>
        <AnimateIn delay={150}>
          <PhotoCollage images={images} variant="masonry" />
        </AnimateIn>
      </div>
    </section>
  )
}
