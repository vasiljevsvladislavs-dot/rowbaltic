import AnimateIn from '@/components/ui/AnimateIn'
import PhotoCollage from '@/components/ui/PhotoCollage'

const images = [
  { src: '/collage/photo-1.jpg', alt: 'ROW BALTIC festivāls 2024' },
  { src: '/collage/photo-2.jpg', alt: 'Ielu mākslas darbs' },
  { src: '/collage/photo-3.jpg', alt: 'Grafiti māksla' },
  { src: '/collage/photo-4.jpg', alt: 'Festivāla dalībnieki' },
  { src: '/collage/photo-5.jpg', alt: 'Urbānā māksla Rīgā' },
]

export default function AboutFestival() {
  return (
    <section id="par-festivalu" className="section-pad bg-ink-900 border-t border-ink-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <AnimateIn>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">01</span>
            <div className="w-12 h-px bg-acid" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
              Par festivālu
            </span>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: text */}
          <div>
            <AnimateIn delay={100}>
              <h2 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-none text-cream mb-10">
                IELU<br />
                <span className="text-acid">MĀKSLAS</span><br />
                FESTIVĀLS
              </h2>
            </AnimateIn>

            <div className="space-y-6">
              <AnimateIn delay={200}>
                <p className="text-ink-200 leading-relaxed text-base md:text-lg">
                  Laipni lūgti Ielu mākslas festivālā{' '}
                  <span className="text-acid font-medium">ROW BALTIC</span> (Riga Open Wall) —
                  vienā no straujāk augošajiem ielu mākslas notikumiem Latvijā un Baltijā.
                </p>
              </AnimateIn>

              <AnimateIn delay={300}>
                <p className="text-ink-300 leading-relaxed">
                  Festivāls ir vērienīgs turpinājums iniciatīvai, kas veiksmīgi attīstās jau kopš
                  2022. gada, ik gadu pulcējot arvien plašāku auditoriju, māksliniekus un
                  pilsētvides kultūras entuziastus.
                </p>
              </AnimateIn>

              <AnimateIn delay={400}>
                <p className="text-ink-300 leading-relaxed">
                  ROW BALTIC pārvērš pilsētvidi par atvērtu mākslas galeriju, kur satiekas
                  radošums, laikmetīga kultūra un urbānā enerģija. Mūsu mērķis ir attīstīt un
                  popularizēt ielu mākslas kultūru, radot platformu starptautiskiem un vietējiem
                  māksliniekiem.
                </p>
              </AnimateIn>
            </div>

            {/* Stats */}
            <AnimateIn delay={500}>
              <div className="mt-12 grid grid-cols-3 gap-px bg-ink-700">
                {[
                  { num: '2022', label: 'Dibināts' },
                  { num: '30+', label: 'Mākslinieki' },
                  { num: '4.', label: 'Izdevums' },
                ].map(({ num, label }) => (
                  <div key={label} className="bg-ink-900 px-6 py-6">
                    <p className="font-display text-5xl text-acid mb-1">{num}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-400">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* Right: photo collage */}
          <AnimateIn direction="left" delay={200} className="w-full">
            <PhotoCollage images={images} variant="featured" />
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
