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
      <AboutFestival dict={dict} />
      <FestivalSection dict={dict} />
      <ProgrammaSection dict={dict} />
      <CompetitionSection dict={dict} />
      <PrevFestivalsSection dict={dict} />
      <Footer dict={dict} lang={lang} />
    </main>
  )
}
