import type { Lang } from '@/i18n'
import { getDictionary } from '@/i18n'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
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
      {/* Announcement banner */}
      <div className="bg-acid text-ink-900 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <p className="font-display text-[clamp(1.2rem,3vw,2rem)] leading-none uppercase text-center sm:text-left">
            {dict.hero.announcement}
          </p>
          <a
            href="#programma"
            className="shrink-0 font-mono font-bold text-[10px] uppercase tracking-widest bg-ink-900 text-acid px-5 py-2.5 hover:opacity-80 transition-opacity"
          >
            Programma →
          </a>
        </div>
        <div className="shrink-0">
          <LanguageSwitcher currentLang={lang} variant="light" />
        </div>
      </div>
      <HeroSection dict={dict} lang={lang} />
      <AboutFestival dict={dict} />
      <FestivalSection dict={dict} />
      <ProgrammaSection dict={dict} />
      <CompetitionSection dict={dict} />
      <PrevFestivalsSection dict={dict} />
      <Footer dict={dict} lang={lang} />
    </main>
  )
}
