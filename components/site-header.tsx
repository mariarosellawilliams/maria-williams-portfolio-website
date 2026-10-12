'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio & Credits' },
  { href: '/portfolio#resume', label: 'Résumé' },
  { href: '/contact', label: 'Contact' },
]

function isActive(href: string, pathname: string) {
  if (href.includes('#')) return false
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:h-20 md:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-serif text-xl tracking-tight md:text-2xl"
          aria-label="Maria Williams — home"
        >
          Maria <span className="italic text-primary">Williams</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = isActive(item.href, pathname)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:text-primary',
                  active && 'text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-primary',
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            className="bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground"
          >
            Booking Inquiries
          </Link>
        </nav>

        <button
          type="button"
          className="flex size-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t bg-background px-5 pb-8 pt-4 motion-safe:animate-in motion-safe:fade-in md:hidden"
        >
          {nav.map((item) => {
            const active = isActive(item.href, pathname)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={cn('border-b py-4 font-serif text-3xl', active && 'italic text-primary')}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 bg-primary px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            Booking Inquiries
          </Link>
        </nav>
      )}
    </header>
  )
}
