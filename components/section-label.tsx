import { cn } from '@/lib/utils'

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary', className)}>
      <span className="h-px w-8 bg-primary" aria-hidden />
      {children}
    </p>
  )
}
