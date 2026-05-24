import HeroSection from '@/components/sections/HeroSection'
import AboutFestival from '@/components/sections/AboutFestival'
import FestivalSection from '@/components/sections/FestivalSection'
import CompetitionSection from '@/components/sections/CompetitionSection'
import RegistrationForm from '@/components/sections/RegistrationForm'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutFestival />
      <FestivalSection />
      <CompetitionSection />
      <RegistrationForm />
      <Footer />
    </main>
  )
}
