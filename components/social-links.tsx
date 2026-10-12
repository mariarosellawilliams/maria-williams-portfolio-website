import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/section-label'
import { profile } from '@/lib/content'

export function SocialStrip() {
  return (
    <section aria-labelledby="follow-title" className="border-y border-primary/30 bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-col gap-3">
          <SectionLabel>Follow along</SectionLabel>
          <h2 id="follow-title" className="font-serif text-4xl leading-none md:text-5xl">
            Behind the <span className="italic text-primary">scenes</span>
          </h2>
        </div>
        <ul className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          {profile.socials.map((s) => (
            <li key={s.label}>
              {s.href ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-w-56 items-center justify-between gap-6 border border-foreground px-6 py-5 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <span className="flex flex-col gap-1">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">{s.label}</span>
                    {s.handle && <span className="font-serif text-xl italic">{s.handle}</span>}
                  </span>
                  <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <span className="flex min-w-56 flex-col gap-1 border border-dashed border-primary/50 px-6 py-5 text-muted-foreground">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">{s.label}</span>
                  <span className="font-serif text-xl italic">Link coming soon</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
