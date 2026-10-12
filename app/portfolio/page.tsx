import type { Metadata } from 'next'
import { SectionLabel } from '@/components/section-label'
import { PortfolioGallery } from '@/components/portfolio/portfolio-gallery'
import { CreditsList } from '@/components/portfolio/credits-list'
import { ProfessionalDetails } from '@/components/portfolio/professional-details'
import { BookingCta } from '@/components/booking-cta'
import { ResumeSection } from '@/components/portfolio/resume-section'
import { projects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Portfolio & Credits',
  description:
    'Photography, runway, campaign, and music video work by Los Angeles model Maria Williams, with credits including Apple Music, Gap, Riot Games, and Destin Conrad.',
}

const jumpLinks = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#credits', label: 'Credits' },
  { href: '#resume', label: 'Résumé' },
  { href: '#details', label: 'Details' },
]

export default function PortfolioPage() {
  return (
    <>
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-5 pb-10 pt-14 md:px-10 md:pt-20">
        <h1 className="font-serif text-6xl leading-[0.9] md:text-8xl">
          Portfolio <span className="italic text-primary">&amp;</span> Credits
        </h1>
        <nav aria-label="On this page" className="flex flex-wrap gap-x-8 gap-y-2">
          {jumpLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold uppercase tracking-[0.2em] underline-offset-8 hover:text-primary hover:underline"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </section>

      <section id="portfolio" aria-labelledby="portfolio-title" className="mx-auto flex max-w-7xl scroll-mt-24 flex-col gap-8 px-5 py-10 md:px-10">
        <div className="flex flex-col gap-3">
          <SectionLabel>Portfolio</SectionLabel>
          <h2 id="portfolio-title" className="sr-only">
            Photo portfolio
          </h2>
          <p className="max-w-xl leading-relaxed text-muted-foreground">
            Select any image to view it full size. Use the arrow keys or swipe to move between photographs.
          </p>
        </div>
        <PortfolioGallery projects={projects} />
      </section>

      <section id="credits" aria-labelledby="credits-title" className="scroll-mt-24 bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-20 md:px-10 md:py-24">
          <div className="flex flex-col gap-4">
            <SectionLabel>Credits</SectionLabel>
            <h2 id="credits-title" className="font-serif text-5xl leading-none md:text-6xl">
              Verified <span className="italic text-primary">credits</span>
            </h2>
          </div>
          <CreditsList />
        </div>
      </section>

      <ResumeSection />
      <ProfessionalDetails />
      <BookingCta />
    </>
  )
}
