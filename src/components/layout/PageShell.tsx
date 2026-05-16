import type { ReactNode } from 'react'
import { CursorGlow } from '@/components/effects/CursorGlow'
import { PageTransition } from '@/components/effects/PageTransition'
import { AmbientBackground } from '@/components/layout/AmbientBackground'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col grid-bg hero-gradient">
      <AmbientBackground />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10 flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  )
}
