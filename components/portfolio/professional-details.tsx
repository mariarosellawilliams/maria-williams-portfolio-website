import { Download } from 'lucide-react'
import { SectionLabel } from '@/components/section-label'
import { details, petTalent, profile, strengths, training } from '@/lib/content'

export function ProfessionalDetails() {
  return (
    <section id="details" aria-labelledby="details-title" className="scroll-mt-28 bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-20 md:px-10 md:py-24 lg:flex-row lg:gap-12">
        <div className="flex flex-col gap-6 lg:w-4/12">
          <SectionLabel>Details</SectionLabel>
          <h2 id="details-title" className="font-serif text-5xl leading-none">
            At a <span className="italic text-primary">glance</span>
          </h2>
          <a
            href={profile.resumeUrl}
            download
            className="flex w-fit items-center gap-3 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground"
          >
            <Download className="size-4" aria-hidden />
            Download résumé (PDF)
          </a>
        </div>

        <div className="flex flex-col gap-10 lg:w-8/12">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {details.map((d) => (
              <div key={d.label} className="flex flex-col gap-1 border-b border-primary/30 pb-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{d.label}</dt>
                <dd className="font-serif text-2xl leading-snug">{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Training & education</h3>
            <ul className="flex flex-col gap-2 leading-relaxed">
              {training.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Creative strengths</h3>
            <ul className="flex flex-wrap gap-2">
              {strengths.map((s) => (
                <li key={s} className="bg-secondary px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em]">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 border-l-0 border-t border-primary/30 pt-6">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Available pet talent</h3>
            <p className="leading-relaxed">{petTalent}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
