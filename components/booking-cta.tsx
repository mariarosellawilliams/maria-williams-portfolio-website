import Link from 'next/link'
import { profile } from '@/lib/content'

export function BookingCta() {
  return (
    <section aria-labelledby="booking-cta" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-col items-start gap-10 border-t border-primary pt-12 md:flex-row md:items-end md:justify-between">
        <h2 id="booking-cta" className="font-serif text-5xl leading-[0.95] md:text-7xl text-balance">
          {"Let's make"} <span className="italic text-primary">something</span> beautiful.
        </h2>
        <div className="flex flex-col gap-4 md:items-end">
          <Link
            href="/contact"
            className="bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground"
          >
            Booking Inquiries
          </Link>
          <a href={`mailto:${profile.email}`} className="text-sm underline-offset-4 hover:text-primary hover:underline">
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  )
}
