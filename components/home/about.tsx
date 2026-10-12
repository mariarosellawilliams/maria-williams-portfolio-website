import { SectionLabel } from '@/components/section-label'
import { profile, skills } from '@/lib/content'

export function About() {
  return (
    <section aria-labelledby="about" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-4 lg:w-5/12">
          <SectionLabel>About Maria</SectionLabel>
          <h2 id="about" className="font-serif text-5xl leading-[0.95] md:text-6xl text-balance">
            Model, dancer <span className="italic text-primary">&amp;</span> creative talent
          </h2>
        </div>
        <div className="flex flex-col gap-10 lg:w-7/12">
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-pretty">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="grid grid-cols-1 gap-6 border-t pt-8 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Based in</dt>
              <dd className="font-serif text-xl">{profile.location}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Availability</dt>
              <dd className="font-serif text-xl">Travel-ready</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Training</dt>
              <dd className="font-serif text-xl">USC Kaufman</dd>
            </div>
          </dl>
          <ul className="flex flex-wrap gap-2" aria-label="Areas of work">
            {skills.map((s) => (
              <li key={s} className="border border-primary/40 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em]">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
