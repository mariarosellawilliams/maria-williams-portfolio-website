import Link from 'next/link'
import { profile } from '@/lib/content'

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="flex flex-col gap-4">
          <p className="font-serif text-4xl md:text-5xl">
            Maria <span className="italic text-primary">Williams</span>
          </p>
          <p className="text-sm text-background/70">
            {profile.titles.join(' · ')} — {profile.location}
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-background/60">Bookings</p>
            <a href={`mailto:${profile.email}`} className="text-sm transition-colors hover:text-primary">
              {profile.email}
            </a>
            <a href={profile.phoneHref} className="text-sm transition-colors hover:text-primary">
              {profile.phone}
            </a>
            {profile.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="text-sm hover:text-primary">
                {s.label}
              </a>
            ))}
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-background/60">Explore</p>
            <Link href="/" className="text-sm hover:text-primary">Home</Link>
            <Link href="/portfolio" className="text-sm hover:text-primary">Portfolio & Credits</Link>
            <Link href="/contact" className="text-sm hover:text-primary">Booking Inquiries</Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-background/15">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-background/60 md:px-10">
          {'© '}
          {new Date().getFullYear()} {profile.fullName}. All photographs used with permission.
        </p>
      </div>
    </footer>
  )
}
