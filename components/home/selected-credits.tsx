import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/section-label'
import { projects } from '@/lib/content'

export function SelectedCredits() {
  const featured = projects.filter((p) => p.featuredCredit)

  return (
    <section aria-labelledby="selected-credits" className="bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <SectionLabel>Selected Credits</SectionLabel>
            <h2 id="selected-credits" className="font-serif text-5xl leading-none md:text-6xl">
              Worked <span className="italic text-primary">with</span>
            </h2>
          </div>
          <Link
            href="/portfolio#credits"
            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] hover:text-primary"
          >
            All credits
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <ul className="flex flex-col border-t border-primary/40">
          {featured.map((p) => (
            <li key={p.slug} className="border-b border-primary/40">
              <div className="flex flex-col gap-1 py-6 md:flex-row md:items-baseline md:gap-8">
                <p className="font-serif text-3xl md:w-5/12 md:text-4xl">{p.client}</p>
                <p className="text-base md:w-4/12">{p.title === p.client ? p.role : `${p.title} — ${p.role}`}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:w-3/12 md:text-right">
                  {p.date ?? p.status ?? (p.title === p.client ? '' : p.role)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
