import CompanyIntro from '@/components/CompanyIntro'
import BrandFeatures from '@/components/BrandFeatures'
import Showcases from '@/components/Showcases'
import TeamMeet from '@/components/TeamMeet'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <CompanyIntro />
      <BrandFeatures />
      <Showcases />
      <TeamMeet />
      <Footer />
    </main>
  )
}

