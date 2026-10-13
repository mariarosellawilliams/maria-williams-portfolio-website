import { creditGroups, projects } from '@/lib/content'

export function CreditsList() {
  return (
    <div className="flex flex-col gap-14">
      {creditGroups.map((group) => {
        const credits = projects.filter((p) => p.creditGroup === group && !p.personal)
        if (credits.length === 0) return null
        return (
          <div key={group} className="flex flex-col gap-4 lg:flex-row lg:gap-12">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary lg:w-4/12 lg:pt-6">{group}</h3>
            <ul className="flex flex-col border-t border-primary/40 lg:w-8/12">
              {credits.map((p) => (
                <li key={p.slug} className="flex flex-col gap-1 border-b border-primary/40 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                  <div className="flex flex-col gap-0.5 sm:flex-1">
                    <p className="font-serif text-2xl leading-tight">
                      {p.client}
                      {p.title !== p.client && p.title !== 'Professional Portfolio' && (
                        <span className="text-muted-foreground"> — {p.title}</span>
                      )}
                    </p>
                    <p className="text-sm">{p.role}</p>
                  </div>
                  <div className="flex items-center gap-4 sm:justify-end">
                    {(p.date || p.status) && (
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {p.date ?? p.status}
                      </span>
                    )}
                    {(p.photos.length > 0 || p.video) && (
                      <a
                        href={`#${p.slug}`}
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-primary underline-offset-4 hover:underline"
                      >
                        {p.photos.length > 0 ? 'View photos' : 'Watch video'}
                        <span className="sr-only"> from {p.client}</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
