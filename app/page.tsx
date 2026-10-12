import { Hero } from '@/components/home/hero'
import { SelectedWork } from '@/components/home/selected-work'
import { About } from '@/components/home/about'
import { SelectedCredits } from '@/components/home/selected-credits'
import { BookingCta } from '@/components/booking-cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <SelectedCredits />
      <BookingCta />
    </>
  )
}
