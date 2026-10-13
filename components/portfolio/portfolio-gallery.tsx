'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PhotoFrame, aspectClass } from '@/components/photo-frame'
import { Lightbox, type LightboxItem } from '@/components/portfolio/lightbox'
import { VideoEmbed } from '@/components/portfolio/video-embed'
import type { Category, Project } from '@/lib/content'
import { cn } from '@/lib/utils'

const categoryOrder: Category[] = ['Editorial', 'Fashion', 'Runway', 'Commercial', 'Beauty', 'Music Videos', 'Film', 'Digitals']

type Photo = Project['photos'][number]

// A lone landscape among portraits leaves an empty hole in a two-column masonry,
// so it is lifted to the top and spans both columns.
function orderForLayout(photos: Photo[]): { photo: Photo; wide: boolean }[] {
  const landscapes = photos.filter((p) => p.orientation === 'landscape')
  const others = photos.filter((p) => p.orientation !== 'landscape')
  if (landscapes.length === 1 && others.length >= 2 && others.length % 2 === 0) {
    return [{ photo: landscapes[0], wide: true }, ...others.map((photo) => ({ photo, wide: false }))]
  }
  return photos.map((photo) => ({ photo, wide: false }))
}

export function PortfolioGallery({ projects }: { projects: Project[] }) {
  const withPhotos = useMemo(() => projects.filter((p) => p.photos.length > 0 || p.video), [projects])
  const categories = useMemo(
    () => categoryOrder.filter((c) => withPhotos.some((p) => p.categories.includes(c))),
    [withPhotos],
  )
  const [filter, setFilter] = useState<Category | 'All'>('All')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const visible = filter === 'All' ? withPhotos : withPhotos.filter((p) => p.categories.includes(filter))
  const items: LightboxItem[] = visible.flatMap((project) => project.photos.map((photo) => ({ photo, project })))

  return (
    <div className="flex flex-col gap-12">
      {categories.length > 1 && (
        <div role="group" aria-label="Filter portfolio by category" className="flex flex-wrap gap-2">
          {(['All', ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                'border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors',
                filter === c
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-foreground/25 hover:border-primary hover:text-primary',
              )}
            >
              {c === 'All' ? 'All Work' : c}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col">
        {visible.map((project) => (
          <article
            key={project.slug}
            id={project.slug}
            aria-labelledby={`${project.slug}-title`}
            className="flex scroll-mt-28 flex-col gap-8 border-t border-primary/40 py-12 lg:flex-row lg:gap-12"
          >
            <header className="flex flex-col gap-4 lg:sticky lg:top-28 lg:w-4/12 lg:self-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                {project.categories.join(' · ')}
              </p>
              <h3 id={`${project.slug}-title`} className="font-serif text-4xl leading-tight">
                {project.title}
              </h3>
              <dl className="flex flex-col gap-2 text-sm">
                {project.client !== project.title && <Row label="Client">{project.client}</Row>}
                <Row label="Role">{project.role}</Row>
                {project.date && <Row label="Date">{project.date}</Row>}
                {project.collaborators?.map((c) => (
                  <Row key={c.label + c.name} label={c.label}>
                    {c.name}
                  </Row>
                ))}
              </dl>
              {project.links?.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] hover:text-primary"
                >
                  {l.label}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              ))}
            </header>

            {project.video && (
              <div className="lg:w-8/12">
                <VideoEmbed video={project.video} />
              </div>
            )}

            {project.photos.length > 0 && (
            <ul className="columns-1 gap-4 sm:columns-2 lg:w-8/12">
              {orderForLayout(project.photos).map(({ photo, wide }) => {
                const index = items.findIndex((it) => it.photo.id === photo.id)
                return (
                  <li key={photo.id} className={cn('mb-4 break-inside-avoid', wide && 'sm:[column-span:all]')}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn('group relative block w-full overflow-hidden bg-secondary', aspectClass[photo.orientation])}
                    >
                      <PhotoFrame
                        photo={photo}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                        className="transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="absolute inset-0 ring-primary ring-inset transition-[box-shadow] group-hover:ring-2" aria-hidden />
                      <span className="sr-only">Open {photo.alt} in image viewer</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            )}
          </article>
        ))}
      </div>

      <Lightbox items={items} index={activeIndex} onIndexChange={setActiveIndex} />
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 border-b border-foreground/10 pb-2">
      <dt className="w-20 shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}
