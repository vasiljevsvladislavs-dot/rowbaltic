import AnimateIn from '@/components/ui/AnimateIn'
import MarqueeBar from '@/components/ui/MarqueeBar'
import type { Dict } from '@/i18n'

interface Props {
  dict: Dict
}

const STAGE_ITEMS = [
  { time: '12:00', title: 'ROW BALTICS 2026 atklāšana' },
  { time: '12:00–12:30', title: 'Zelma' },
  { time: '12:30–13:00', title: 'March' },
  { time: '13:00–13:30', title: 'Wiesturz' },
  { time: '13:30–14:00', title: 'goča' },
  { time: '14:00–14:30', title: 'Ūga' },
  { time: '14:30–15:10', title: 'Roberts Gobziņš x NiklāvZ' },
  { time: '15:30–16:30', title: "ansis & DEFSET piedāvā: ROW BEATBATTLE '26 ROUND 1" },
  { time: '16:30–17:00', title: 'Rokas (LT)' },
  { time: '17:00–17:30', title: "ansis & DEFSET piedāvā: ROW BEATBATTLE '26 ROUND 2" },
  { time: '17:30–18:00', title: 'xantikvariāts' },
  { time: '18:00–19:00', title: "ansis & DEFSET piedāvā: ROW BEATBATTLE '26 ROUND 3" },
  { time: '19:00–19:30', title: 'f6lex' },
  { time: '19:30–20:30', title: 'ROW BALTICS 2026 apbalvošana', desc: 'Ielu māksla · bītu cīņas · BMX un skeitbords · breakdance' },
  { time: '20:30–21:00', title: 'slepenais viesis' },
  { time: '21:00–22:00', title: 'BASECK (ASV) x KODEK' },
]

export default function ProgrammaSection({ dict }: Props) {
  const p = dict.programma

  return (
    <section id="programma" className="bg-white border-t border-gray-200">
      <MarqueeBar
        text="ROW BALTICS · RĪGA OPEN WALL · IELU MĀKSLA · 2026 · "
        className="border-b border-gray-200"
      />

      <div className="section-pad px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <AnimateIn>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-rust">{p.num}</span>
            <div className="w-12 h-px bg-rust" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-500">{p.label}</span>
          </div>
          <h2 className="font-display text-[clamp(3rem,10vw,8rem)] leading-none text-ink-900 mb-16">
            {p.heading}
          </h2>
        </AnimateIn>

        {/* Timeline */}
        <div className="space-y-0 divide-y divide-gray-100">

          {/* Wall painting */}
          <AnimateIn>
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs text-acid">{p.art_time}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-ink-900 mb-2">{p.art_title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.art_desc}</p>
              </div>
            </div>
          </AnimateIn>

          {/* Workshops */}
          <AnimateIn>
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs text-acid">{p.workshops_time}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-ink-900 mb-6">{p.workshops_title}</h3>

                {/* Art tent */}
                <div className="mb-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-rust mb-3">{p.art_tent_label}</p>
                  <div className="space-y-3 pl-4 border-l border-gray-200">
                    <div>
                      <span className="font-mono text-[10px] text-gray-400">{p.collab_wall_time}</span>
                      <p className="text-sm text-gray-700">{p.collab_wall_title}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-gray-400">{p.portraits_time}</span>
                      <p className="text-sm text-gray-700">{p.portraits_title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.portraits_desc}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-gray-400">{p.stencil_time}</span>
                      <p className="text-sm text-gray-700">{p.stencil_title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.stencil_desc}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-gray-400">{p.letters_time}</span>
                      <p className="text-sm text-gray-700">{p.letters_title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.letters_desc}</p>
                    </div>
                  </div>
                </div>

                {/* Music tent */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-rust mb-3">{p.music_tent_label}</p>
                  <div className="space-y-3 pl-4 border-l border-gray-200">
                    <div>
                      <span className="font-mono text-[10px] text-gray-400">{p.beat_kitchen_time}</span>
                      <p className="text-sm text-gray-700">{p.beat_kitchen_title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.beat_kitchen_desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Brewery */}
          <AnimateIn>
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs text-acid">{p.brewery_time}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-ink-900 mb-1">{p.brewery_title}</h3>
                <p className="text-sm text-gray-600">{p.brewery_desc}</p>
              </div>
            </div>
          </AnimateIn>

          {/* BMX */}
          <AnimateIn>
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs text-acid">{p.bmx_time}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-ink-900 mb-4">{p.bmx_title}</h3>
                <div className="space-y-1 pl-4 border-l border-gray-200">
                  {p.bmx_items.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="font-mono text-[10px] text-gray-400 w-28 shrink-0">{item.time}</span>
                      <span className="text-sm text-gray-600">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Tour */}
          <AnimateIn>
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs text-acid">{p.tour_time}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-ink-900 mb-1">{p.tour_title}</h3>
                <p className="text-sm text-gray-600">{p.tour_desc}</p>
              </div>
            </div>
          </AnimateIn>

          {/* BeatBattle */}
          <AnimateIn>
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs text-acid">{p.beatbattle_time}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-ink-900 mb-1">{p.beatbattle_title}</h3>
                <p className="text-sm text-gray-600">{p.beatbattle_desc}</p>
              </div>
            </div>
          </AnimateIn>

          {/* Breakdance */}
          <AnimateIn>
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs text-acid">{p.breakdance_time}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-ink-900 mb-4">{p.breakdance_title}</h3>
                <div className="space-y-1 pl-4 border-l border-gray-200">
                  {p.breakdance_items.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="font-mono text-[10px] text-gray-400 w-28 shrink-0">{item.time}</span>
                      <span className="text-sm text-gray-600">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Awards */}
          <AnimateIn>
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs text-acid">{p.awards_time}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-mono font-bold text-sm uppercase tracking-widest text-ink-900 mb-3">{p.awards_title}</h3>
                <div className="flex flex-wrap gap-2">
                  {[p.awards_cat1, p.awards_cat2, p.awards_cat3, p.awards_cat4].map((cat, i) => (
                    <span key={i} className="font-mono text-[10px] uppercase tracking-widest border border-gray-300 text-gray-600 px-3 py-1">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Stage programme */}
        <AnimateIn>
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-rust">{p.stage_time}</span>
              <div className="w-12 h-px bg-rust" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-500">{p.stage_label}</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-none text-ink-900 mb-12">
              {p.stage_label.toUpperCase()}
            </h2>
          </div>
        </AnimateIn>

        <div className="space-y-0 divide-y divide-gray-100">
          {STAGE_ITEMS.map((item, i) => (
            <AnimateIn key={i} delay={i * 30}>
              <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-3">
                  <span className="font-mono text-xs text-acid">{item.time}</span>
                </div>
                <div className="md:col-span-9">
                  <p className="font-mono text-sm text-ink-900">{item.title}</p>
                  {item.desc && <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mt-1">{item.desc}</p>}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Accessibility & Transport */}
        <AnimateIn>
          <div className="mt-16 pt-12 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-rust mb-4">{p.transport_label}</p>
              <div className="space-y-0">
                {p.transport_items.map((t, i) => (
                  <div key={i} className="py-3 border-b border-gray-100">
                    <span className="font-mono text-sm font-bold text-ink-900 block">{t.stop}</span>
                    <span className="font-mono text-xs text-gray-500">{t.lines}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-rust mb-4">{p.accessibility_label}</p>
              <ul className="space-y-0 divide-y divide-gray-100">
                {p.accessibility_items.map((item, i) => (
                  <li key={i} className="font-mono text-sm text-ink-900 py-3 flex gap-3">
                    <span className="text-rust shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
