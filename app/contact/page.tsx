import type { Metadata } from 'next'
import { PhotoFrame } from '@/components/photo-frame'
import { SectionLabel } from '@/components/section-label'
import { BookingForm } from '@/components/contact/booking-form'
import { profile } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Booking & Collaborations',
  description:
    'Book Los Angeles model Maria Williams for editorial, fashion, runway, commercial, beauty, and music video projects.',
}

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
      <div className="flex flex-col gap-14 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:w-5/12 lg:self-start">
          <div className="flex flex-col gap-4">
            <SectionLabel>Contact</SectionLabel>
            <h1 className="font-serif text-6xl leading-[0.9] md:text-7xl text-balance">
              Booking <span className="italic text-primary">&amp;</span> Collaborations
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-pretty">
              {"For editorial, campaign, runway, commercial, and music video projects, share a few details below and you'll hear back by email."}
            </p>
          </div>

          <div className="relative hidden aspect-[4/5] w-full max-w-md overflow-hidden bg-secondary sm:block">
            <PhotoFrame photo={profile.contactPhoto} sizes="(min-width: 1024px) 35vw, 60vw" />
          </div>

          <dl className="flex flex-col gap-4 border-t pt-6">
            <div className="flex flex-col gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="font-serif text-xl underline-offset-4 hover:text-primary hover:underline">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Phone</dt>
              <dd>
                <a href={profile.phoneHref} className="font-serif text-xl underline-offset-4 hover:text-primary hover:underline">
                  {profile.phone}
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Based in</dt>
              <dd className="font-serif text-xl">
                {profile.location} <span className="text-muted-foreground">· {profile.travel.toLowerCase()}</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:w-7/12">
          <div className="bg-card p-6 sm:p-10">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  )
}
