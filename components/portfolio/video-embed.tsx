'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import type { ProjectVideo } from '@/lib/content'

export function VideoEmbed({ video }: { video: ProjectVideo }) {
  if (video.provider === 'instagram') {
    return (
      <div className="mx-auto w-full max-w-md overflow-hidden border border-foreground/15 bg-secondary">
        <iframe
          src={`https://www.instagram.com/reel/${video.id}/embed/`}
          title={video.title}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
          allowFullScreen
          className="block h-[640px] w-full border-0"
        />
      </div>
    )
  }

  if (video.provider === 'file') {
    const [w, h] = video.aspect.split('/').map(Number)
    const portrait = h > w
    return (
      <div
        className={`mx-auto w-full overflow-hidden border border-foreground/15 bg-secondary ${portrait ? 'max-w-sm' : ''}`}
        style={{ aspectRatio: video.aspect }}
      >
        <video
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
          aria-label={video.title}
          className="block size-full object-cover"
        >
          {/* #t=0.1 makes Safari paint the first frame when there is no poster */}
          <source src={video.poster ? video.src : `${video.src}#t=0.1`} type="video/mp4" />
        </video>
      </div>
    )
  }

  return <YouTubePlayer id={video.id} title={video.title} />
}

function YouTubePlayer({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-secondary">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail, not worth adding a remotePatterns entry */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-background/30 transition-colors group-hover:bg-background/10" aria-hidden />
          <span className="relative flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
            <Play className="ml-1 size-8 fill-current" aria-hidden />
          </span>
          <span className="sr-only">Play {title}</span>
        </button>
      )}
    </div>
  )
}
