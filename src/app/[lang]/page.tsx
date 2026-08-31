import type { Lang } from '@/i18n'
import { getDictionary } from '@/i18n'
import HeroSection from '@/components/sections/HeroSection'
import AboutFestival from '@/components/sections/AboutFestival'
import FestivalSection from '@/components/sections/FestivalSection'
import ProgrammaSection from '@/components/sections/ProgrammaSection'
import CompetitionSection from '@/components/sections/CompetitionSection'
import PrevFestivalsSection from '@/components/sections/PrevFestivalsSection'
import Footer from '@/components/sections/Footer'

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = ((['lv', 'en', 'lt', 'ee'] as const).includes(rawLang as Lang) ? rawLang : 'lv') as Lang
  const dict = getDictionary(lang)

  return (
    <main>
      <HeroSection dict={dict} lang={lang} />

      {/* Game promo block */}
      <a
        href="https://spele.rowbaltics.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-ink-900 px-6 md:px-12 py-14 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group hover:bg-acid transition-colors duration-300"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid group-hover:text-ink-900 transition-colors duration-300 mb-4">
            spele.rowbaltics.com
          </p>
          <h2 className="font-display text-[clamp(3rem,10vw,9rem)] leading-none text-white group-hover:text-ink-900 transition-colors duration-300 uppercase">
            {dict.hero.game_cta}
          </h2>
        </div>
        <span className="shrink-0 font-mono font-bold text-[11px] uppercase tracking-widest bg-acid text-ink-900 group-hover:bg-ink-900 group-hover:text-acid transition-colors duration-300 px-8 py-4 whitespace-nowrap">
          {dict.hero.game_play}
        </span>
      </a>

      <AboutFestival dict={dict} />
      <FestivalSection dict={dict} />
      <ProgrammaSection dict={dict} />
      <CompetitionSection dict={dict} />
      <PrevFestivalsSection dict={dict} />
      <Footer dict={dict} lang={lang} />
    </main>
  )
}
