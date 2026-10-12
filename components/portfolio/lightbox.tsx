'use client'

import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { PhotoFrame } from '@/components/photo-frame'
import type { Photo, Project } from '@/lib/content'

export type LightboxItem = { photo: Photo; project: Project }

type LightboxProps = {
  items: LightboxItem[]
  index: number | null
  onIndexChange: (index: number | null) => void
}

export function Lightbox({ items, index, onIndexChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchStartX = useRef<number | null>(null)
  const current = index !== null ? items[index] : null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (index !== null && !dialog.open) dialog.showModal()
    if (index === null && dialog.open) dialog.close()
  }, [index])

  const go = (delta: number) => {
    if (index === null || items.length === 0) return
    onIndexChange((index + delta + items.length) % items.length)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Image viewer"
      onClose={() => onIndexChange(null)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dialogRef.current?.close()
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchStartX.current = null
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-foreground p-0 text-background backdrop:bg-foreground/95 open:flex open:flex-col"
    >
      {current && (
        <>
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-background/70" aria-live="polite">
              {index! + 1} / {items.length}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="flex size-11 items-center justify-center transition-colors hover:text-primary"
              autoFocus
            >
              <X className="size-6" aria-hidden />
              <span className="sr-only">Close image viewer</span>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center gap-2 px-2 md:px-6">
            <button
              type="button"
              onClick={() => go(-1)}
              className="hidden size-12 shrink-0 items-center justify-center border border-background/30 transition-colors hover:border-primary hover:text-primary sm:flex"
            >
              <ChevronLeft className="size-6" aria-hidden />
              <span className="sr-only">Previous image</span>
            </button>

            <div className="relative h-full w-full max-w-5xl">
              <PhotoFrame key={current.photo.id} photo={current.photo} sizes="100vw" fit="contain" />
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="hidden size-12 shrink-0 items-center justify-center border border-background/30 transition-colors hover:border-primary hover:text-primary sm:flex"
            >
              <ChevronRight className="size-6" aria-hidden />
              <span className="sr-only">Next image</span>
            </button>
          </div>

          <div className="flex items-end justify-between gap-4 px-4 py-4 md:px-8 md:py-6">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                {current.project.client}
              </p>
              <p className="font-serif text-xl md:text-2xl">
                {current.project.title} <span className="text-background/60">— {current.project.role}</span>
              </p>
              {(current.photo.caption || current.photo.photographer) && (
                <p className="text-sm text-background/70">
                  {current.photo.caption}
                  {current.photo.caption && current.photo.photographer && ' · '}
                  {current.photo.photographer && `Photo: ${current.photo.photographer}`}
                </p>
              )}
            </div>
            <div className="flex gap-2 sm:hidden">
              <button type="button" onClick={() => go(-1)} className="flex size-11 items-center justify-center border border-background/30">
                <ChevronLeft className="size-5" aria-hidden />
                <span className="sr-only">Previous image</span>
              </button>
              <button type="button" onClick={() => go(1)} className="flex size-11 items-center justify-center border border-background/30">
                <ChevronRight className="size-5" aria-hidden />
                <span className="sr-only">Next image</span>
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  )
}
