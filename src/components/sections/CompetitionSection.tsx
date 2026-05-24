import AnimateIn from '@/components/ui/AnimateIn'

const rules = [
  {
    num: '01',
    title: 'Pieteikšanās',
    text: 'Iesniedziet portfolio ar pēdējo divu gadu darbiem un sociālo tīklu profilu. Pieteikšanās notiek mājaslapā rowbaltic.com līdz 2026. gada 22. jūnijam plkst. 23:59.',
  },
  {
    num: '02',
    title: 'Atlase',
    text: 'Konkursam tiks apstiprināti 30 dalībnieki. Apstiprināto dalībnieku saraksts tiks publicēts 2026. gada 30. jūnijā.',
  },
  {
    num: '03',
    title: 'Realizācija',
    text: 'Darbu realizācija notiks 2026. gada 22. augustā Sarkandaugavā, Zāģeru ielā. Konkursa norises laiks: plkst. 10:00–17:00.',
  },
  {
    num: '04',
    title: 'Balsojums',
    text: 'Festivāla noslēgumā visi 30 dalībnieki piedalīsies savstarpējā balsojumā, nosakot trīs labāko darbu autorus.',
  },
]

const prizes = [
  { place: '1.', reward: '100 krāsu baloniņi', color: 'text-acid' },
  { place: '2.', reward: '50 krāsu baloniņi', color: 'text-cream/70' },
  { place: '3.', reward: '25 krāsu baloniņi', color: 'text-rust' },
]

export default function CompetitionSection() {
  return (
    <section id="konkurss" className="section-pad bg-ink-900 border-t border-ink-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimateIn>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">03</span>
            <div className="w-12 h-px bg-acid" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-400">
              Zīmēšanas konkurss
            </span>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left */}
          <div className="lg:col-span-5">
            <AnimateIn delay={100}>
              <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-none text-cream mb-8">
                NOLIKUMS<br />
                <span className="text-acid">2026</span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={200}>
              <p className="text-ink-200 leading-relaxed mb-6">
                Ielu mākslas festivāls ROW BALTIC 2026 aicina māksliniekus piedalīties zīmēšanas
                konkursā un kļūt par daļu no vienas no spilgtākajām urbānās kultūras platformām
                Baltijā.
              </p>
            </AnimateIn>

            <AnimateIn delay={250}>
              <p className="text-ink-300 leading-relaxed mb-10">
                Konkursu organizē mākslinieks{' '}
                <span className="text-cream">Dainis Rudens</span> sadarbībā ar biedrību{' '}
                <span className="text-cream">&bdquo;Mākslas birojs&ldquo;</span> un Rīgas valstspilsētas
                pašvaldību.
              </p>
            </AnimateIn>

            {/* Theme callout */}
            <AnimateIn delay={300}>
              <div className="border border-acid/30 bg-acid/5 p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-acid mb-3">
                  Konkursa tēma
                </p>
                <p className="font-display text-5xl text-cream mb-3">CĪŅA</p>
                <p className="text-ink-300 text-sm leading-relaxed">
                  Dalībnieki aicināti interpretēt tēmu brīvi, saglabājot cieņu pret apkārtējo
                  vidi un sabiedrību.
                </p>
              </div>
            </AnimateIn>

            {/* Wall size */}
            <AnimateIn delay={350}>
              <div className="mt-6 flex items-center gap-6 border-t border-ink-800 pt-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-1">
                    Darba laukums
                  </p>
                  <p className="font-display text-3xl text-acid">2.7m × 4m</p>
                </div>
                <div className="w-px h-12 bg-ink-700" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-1">
                    Dalībnieki
                  </p>
                  <p className="font-display text-3xl text-cream">30</p>
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* Right: rules + prizes */}
          <div className="lg:col-span-7 space-y-4">
            {/* Rules */}
            {rules.map((rule, i) => (
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
                  Balvas
                </p>
                <div className="space-y-4">
                  {prizes.map(({ place, reward, color }) => (
                    <div key={place} className="flex items-center gap-4">
                      <span className={`font-display text-3xl w-10 ${color}`}>{place}</span>
                      <div className="flex-1 h-px bg-ink-700" />
                      <span className="font-mono text-sm text-ink-200">{reward}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-ink-700">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-2">
                    Kontakti
                  </p>
                  <a
                    href="mailto:info@rowbaltic.com"
                    className="font-mono text-sm text-acid hover:underline"
                  >
                    info@rowbaltic.com
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
              Autortiesības
            </p>
            <p className="text-ink-400 text-sm leading-relaxed max-w-3xl">
              Festivāla ietvaros radītie grafiti un ielu mākslas darbi ir organizatoru īpašums. Gan
              darbu autori, gan organizatori patur tiesības izmantot darbu fotogrāfijas, video
              materiālus un citu dokumentāciju publicitātes vajadzībām bez papildu saskaņošanas vai
              atlīdzības.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
