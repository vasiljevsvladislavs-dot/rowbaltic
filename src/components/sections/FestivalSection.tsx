import AnimateIn from '@/components/ui/AnimateIn'
import MarqueeBar from '@/components/ui/MarqueeBar'
import PhotoCollage from '@/components/ui/PhotoCollage'

const images = [
  { src: '/collage/photo-3.jpg', alt: 'ROW BALTIC 2026 battle' },
  { src: '/collage/photo-1.jpg', alt: 'Grafiti battle' },
  { src: '/collage/photo-4.jpg', alt: 'Ielu māksla 2026' },
  { src: '/collage/photo-2.jpg', alt: 'ROW BALTIC dalībnieki' },
  { src: '/collage/photo-5.jpg', alt: 'Festivāla atmosfēra' },
]

export default function FestivalSection() {
  return (
    <section id="row-baltic-2026" className="bg-ink-900 border-t border-ink-800">
      {/* Big theme banner */}
      <div className="bg-rust/10 border-y border-rust/20 py-16 md:py-24 px-6 md:px-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #ff4400 0%, transparent 50%), radial-gradient(circle at 80% 50%, #c8ff00 0%, transparent 50%)',
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateIn>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-rust">02</span>
              <div className="w-12 h-px bg-rust" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
                ROW BALTIC 2026
              </span>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <AnimateIn>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-6">
                  Festivāla tēma
                </p>
                <h2 className="font-display text-[clamp(5rem,15vw,14rem)] leading-none text-cream">
                  CĪŅA
                </h2>
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-20 h-1 bg-rust" />
                  <span className="font-mono text-xs text-ink-300 italic">
                    &ldquo;Battle&rdquo; — radoša sacensība, ideju spēks
                  </span>
                </div>
              </AnimateIn>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <AnimateIn delay={200}>
                <p className="text-ink-200 leading-relaxed">
                  Šogad ROW BALTIC sper soli tālāk un norisinās ar{' '}
                  <span className="text-cream font-medium">
                    Rīgas valstspilsētas pašvaldības atbalstu
                  </span>{' '}
                  kā daļa no plašās Ielu mākslas mēneša programmas.
                </p>
              </AnimateIn>
              <AnimateIn delay={300}>
                <p className="text-ink-300 leading-relaxed">
                  2026. gada festivāla centrālais motīvs ir &ldquo;cīņa&rdquo; — nozīmīga ielu
                  mākslas un hiphopa kultūras sastāvdaļa. Tā nav agresija vai konflikts, bet gan
                  radoša, nevardarbīga sacensība, kurā dzimst jaunas idejas, stili un izteiksmes
                  formas.
                </p>
              </AnimateIn>
              <AnimateIn delay={400}>
                <p className="text-ink-300 leading-relaxed">
                  Grafiti un ielu mākslas kultūrā &ldquo;battle&rdquo; tradīcija vienmēr bijusi
                  veids, kā mākslinieki apliecina savu identitāti, izaicina viens otru radošumā un
                  veido dialogu ar pilsētvidi.
                </p>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>

      <MarqueeBar
        text="CĪŅA ✦ BATTLE ✦ ROW BALTIC 2026 ✦ 22. AUGUSTS ✦ SARKANDAUGAVA ✦ RĪGA ✦"
        className="border-b border-ink-800"
      />

      {/* Photo collage strip */}
      <div className="section-pad px-6 md:px-12 max-w-7xl mx-auto">
        <AnimateIn>
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-display text-3xl md:text-4xl text-ink-200">
              IEPRIEKŠĒJIE FESTIVĀLI
            </h3>
            <span className="font-mono text-xs text-ink-500 hidden md:block">
              Foto kolāža ↓
            </span>
          </div>
        </AnimateIn>
        <AnimateIn delay={150}>
          <PhotoCollage images={images} variant="grid" />
        </AnimateIn>
      </div>
    </section>
  )
}
