import Link from 'next/link'
import { PhotoFrame } from '@/components/photo-frame'
import { profile } from '@/lib/content'

export function Hero() {
  return (
    <section aria-labelledby="hero-name" className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-0">
        <div className="relative z-10 flex flex-col gap-8 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 lg:w-7/12 lg:pb-16">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-10 bg-primary" aria-hidden />
            {profile.location}
          </p>
          <h1 id="hero-name" className="font-serif leading-[0.85] tracking-tight">
            <span className="block text-7xl sm:text-8xl lg:text-[9.5rem]">Maria</span>
            <span className="block text-7xl italic text-primary sm:text-8xl lg:-mr-40 lg:text-[9.5rem]">Williams</span>
          </h1>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <p className="font-serif text-2xl italic">{profile.descriptor}</p>
            <span className="hidden h-px flex-1 bg-primary/40 sm:block" aria-hidden />
          </div>
          <p className="flex w-fit items-center gap-2 border border-primary px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            Open to agency representation
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/portfolio"
              className="bg-primary px-7 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="border border-foreground px-7 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:border-primary hover:text-primary"
            >
              Booking Inquiries
            </Link>
          </div>
          <Link
            href="/portfolio#resume"
            className="group flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            <span className="h-px w-8 bg-primary transition-all group-hover:w-12" aria-hidden />
            View My Résumé
          </Link>
        </div>

        <div className="relative lg:w-5/12">
          <div
            className="absolute -bottom-4 -right-4 hidden h-full w-full border border-primary lg:block"
            aria-hidden
          />
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000">
            <PhotoFrame photo={profile.heroPhoto} sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </div>
        </div>
      </div>
    </section>
  )
}
