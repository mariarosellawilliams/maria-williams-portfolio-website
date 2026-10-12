'use client'

import { useState } from 'react'
import { Download, ExternalLink, FileText } from 'lucide-react'
import { SectionLabel } from '@/components/section-label'
import { resumes, type Resume } from '@/lib/content'
import { cn } from '@/lib/utils'

const buttonBase =
  'flex items-center justify-center gap-3 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-colors'

function ResumeActions({ resume }: { resume: Resume }) {
  if (!resume.src) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row">
        <span aria-disabled="true" className={cn(buttonBase, 'cursor-not-allowed bg-muted text-muted-foreground')}>
          <ExternalLink className="size-4" aria-hidden />
          Open Full Résumé
        </span>
        <span
          aria-disabled="true"
          className={cn(buttonBase, 'cursor-not-allowed border border-border text-muted-foreground')}
        >
          <Download className="size-4" aria-hidden />
          Download PDF
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={resume.src}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonBase, 'bg-primary text-primary-foreground hover:bg-foreground hover:text-background')}
      >
        <ExternalLink className="size-4" aria-hidden />
        Open Full Résumé
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      <a
        href={resume.src}
        download={resume.fileName}
        className={cn(buttonBase, 'border border-foreground hover:border-primary hover:text-primary')}
      >
        <Download className="size-4" aria-hidden />
        Download PDF
      </a>
    </div>
  )
}

function ResumePreview({ resume }: { resume: Resume }) {
  if (!resume.src) {
    return (
      <div className="flex aspect-[8.5/11] w-full flex-col items-center justify-center gap-4 border border-dashed border-primary/50 bg-secondary p-8 text-center">
        <FileText className="size-10 text-primary" aria-hidden />
        <p className="font-serif text-2xl italic">{resume.heading}</p>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          PDF coming soon. The preview and buttons will activate as soon as the file is uploaded.
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute -bottom-3 -right-3 hidden h-full w-full border border-primary md:block" aria-hidden />
      <iframe
        src={`${resume.src}#view=FitH&toolbar=0`}
        title={`${resume.heading} preview`}
        loading="lazy"
        className="relative hidden aspect-[8.5/11] w-full border border-border bg-card md:block"
      />
      <a
        href={resume.src}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-3 border border-border bg-card px-6 py-12 text-center md:hidden"
      >
        <FileText className="size-10 text-primary" aria-hidden />
        <span className="font-serif text-2xl italic">{resume.heading}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Tap to read full PDF</span>
      </a>
    </div>
  )
}

export function ResumeSection() {
  const [activeId, setActiveId] = useState(resumes[0].id)
  const active = resumes.find((r) => r.id === activeId) ?? resumes[0]

  return (
    <section id="resume" aria-labelledby="resume-title" className="scroll-mt-28 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-20 md:px-10 md:py-24 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:w-5/12 lg:self-start">
          <div className="flex flex-col gap-4">
            <SectionLabel>Résumé</SectionLabel>
            <h2 id="resume-title" className="font-serif text-5xl leading-none md:text-6xl">
              {active.heading.replace(' Résumé', '')} <span className="italic text-primary">Résumé</span>
            </h2>
            <p className="max-w-md leading-relaxed text-muted-foreground">
              Review the full résumé below, open it in a new tab, or download a copy for your casting files.
            </p>
          </div>

          <div role="tablist" aria-label="Choose a résumé" className="flex border-b border-primary/30">
            {resumes.map((r) => {
              const selected = r.id === active.id
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  id={`resume-tab-${r.id}`}
                  aria-selected={selected}
                  aria-controls="resume-panel"
                  onClick={() => setActiveId(r.id)}
                  className={cn(
                    '-mb-px border-b-2 px-1 py-3 mr-8 text-xs font-semibold uppercase tracking-[0.2em] transition-colors',
                    selected ? 'border-primary text-primary' : 'border-transparent hover:text-primary',
                  )}
                >
                  {r.tab}
                </button>
              )
            })}
          </div>

          <ResumeActions resume={active} />
        </div>

        <div
          id="resume-panel"
          role="tabpanel"
          aria-labelledby={`resume-tab-${active.id}`}
          className="lg:w-7/12"
        >
          <ResumePreview key={active.id} resume={active} />
        </div>
      </div>
    </section>
  )
}
