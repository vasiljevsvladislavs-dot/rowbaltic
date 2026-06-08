import AnimateIn from '@/components/ui/AnimateIn'
import PhotoCollage from '@/components/ui/PhotoCollage'
import type { Dict } from '@/i18n'

const images = [
  { src: '/collage2/photo-01.jpg', alt: 'ROW BALTICS festival' },
  { src: '/collage2/photo-02.jpg', alt: 'Street art participants' },
  { src: '/collage2/photo-03.jpg', alt: 'Graffiti work' },
  { src: '/collage2/photo-04.jpg', alt: 'Festival atmosphere' },
]

interface Props {
  dict: Dict
}

export default function AboutFestival({ dict }: Props) {
  const a = dict.about

  return (
    <section id="par-festivalu" className="section-pad bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <AnimateIn>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">{a.num}</span>
            <div className="w-12 h-px bg-acid" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-500">
              {a.label}
            </span>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: text */}
          <div>
            <AnimateIn delay={100}>
              <h2 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-none text-ink-900 mb-10">
                {a.heading[0]}<br />
                <span className="text-acid">{a.heading[1]}</span><br />
                {a.heading[2]}
              </h2>
            </AnimateIn>

            <div className="space-y-6">
              <AnimateIn delay={200}>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {a.p1}
                </p>
              </AnimateIn>

              <AnimateIn delay={300}>
                <p className="text-gray-600 leading-relaxed">
                  {a.p2}
                </p>
              </AnimateIn>

              <AnimateIn delay={400}>
                <p className="text-gray-600 leading-relaxed">
                  {a.p3}
                </p>
              </AnimateIn>
            </div>

            {/* Stats */}
            <AnimateIn delay={500}>
              <div className="mt-12 grid grid-cols-3 gap-px border border-gray-200">
                {a.stats.map(({ num, label }) => (
                  <div key={label} className="px-6 py-6 bg-gray-50">
                    <p className="font-display text-5xl text-acid mb-1">{num}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* Right: photo collage */}
          <AnimateIn direction="left" delay={200} className="w-full">
            <PhotoCollage images={images} variant="masonry" cols={2} aspectRatio="1/1" />
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
