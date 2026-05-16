import type { ReactNode } from 'react'
import { CursorGlow } from '@/components/effects/CursorGlow'
import { PageTransition } from '@/components/effects/PageTransition'
import { AmbientBackground } from '@/components/layout/AmbientBackground'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PipelineResumeBanner } from '@/components/layout/PipelineResumeBanner'

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col grid-bg hero-gradient">
      <AmbientBackground />
      <CursorGlow />
      <Navbar />
      <div className="h-16 shrink-0" aria-hidden />
      <main className="relative z-10 flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <PipelineResumeBanner />
      <Footer />
    </div>
  )
}
