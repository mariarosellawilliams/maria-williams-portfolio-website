import Image from 'next/image'
import type { Photo } from '@/lib/content'
import { cn } from '@/lib/utils'

export const aspectClass = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[3/2]',
  square: 'aspect-square',
} as const

type PhotoFrameProps = {
  photo: Photo
  sizes: string
  priority?: boolean
  fit?: 'cover' | 'contain'
  className?: string
}

/** Fills its (relative, sized) parent with the photo, or a clearly labeled placeholder. */
export function PhotoFrame({ photo, sizes, priority, fit = 'cover', className }: PhotoFrameProps) {
  if (photo.src) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectPosition: fit === 'cover' ? (photo.focus ?? 'center') : 'center' }}
        className={cn(fit === 'cover' ? 'object-cover' : 'object-contain', className)}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${photo.alt}`}
      className={cn(
        'placeholder-hatch absolute inset-0 flex flex-col items-center justify-center gap-2 bg-secondary p-4 text-center',
        className,
      )}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">Photo to come</span>
      <span className="max-w-[16rem] font-serif text-base italic leading-snug text-foreground text-balance">
        {photo.alt}
      </span>
    </div>
  )
}
