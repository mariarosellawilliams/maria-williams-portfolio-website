import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PhotoFrame } from '@/components/photo-frame'
import { SectionLabel } from '@/components/section-label'
import { getSelectedWork } from '@/lib/content'
import { cn } from '@/lib/utils'

const layout = [
  'md:col-span-5 md:row-span-2 aspect-[4/5] md:aspect-auto',
  'md:col-span-4 aspect-[4/5]',
  'md:col-span-3 aspect-[4/5] md:mt-16',
  'md:col-span-3 aspect-[4/5]',
  'md:col-span-4 aspect-[3/2] md:self-end',
]

export function SelectedWork() {
  const items = getSelectedWork()
  if (items.length === 0) return null

  return (
    <section aria-labelledby="selected-work" className="bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <SectionLabel>Selected Work</SectionLabel>
            <h2 id="selected-work" className="font-serif text-5xl leading-none md:text-6xl text-balance">
              In frame <span className="italic text-primary">&amp;</span> in motion
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] hover:text-primary"
          >
            Full portfolio
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12 md:gap-6">
          {items.map(({ project, photo }, i) => (
            <li key={photo.id} className={cn('relative', layout[i % layout.length])}>
              <Link
                href={`/portfolio#${project.slug}`}
                className="group absolute inset-0 block overflow-hidden bg-secondary"
              >
                <PhotoFrame
                  photo={photo}
                  sizes="(min-width: 768px) 40vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-foreground/75 to-transparent p-4 pt-12 text-background opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                  <span className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-background/80">
                      {project.client}
                    </span>
                    <span className="font-serif text-lg">{project.title}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0" aria-hidden />
                </span>
                <span className="absolute inset-0 ring-0 ring-primary ring-inset transition-[box-shadow] group-hover:ring-2" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
