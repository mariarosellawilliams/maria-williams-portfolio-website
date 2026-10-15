import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, Manrope } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const bodoni = Bodoni_Moda({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-bodoni' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = {
  metadataBase: new URL('https://mariarosellawilliams.com'),
  title: {
    default: 'Maria Williams — Model | Los Angeles',
    template: '%s — Maria Williams',
  },
  description:
    'Maria Williams is a Los Angeles-based model and creative talent working across fashion, beauty, runway, and commercial campaigns, with background dance and acting credits in music videos and film. Portfolio, credits, and booking inquiries.',
  generator: 'v0.app',
  openGraph: {
    title: 'Maria Williams — Model',
    description: 'Los Angeles-based model and creative talent. Portfolio, credits, and bookings.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf7f2',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${manrope.variable} bg-background`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
