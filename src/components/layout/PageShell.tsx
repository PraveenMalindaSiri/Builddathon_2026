import type { ReactNode } from 'react'
import { AmbientBackground } from '@/components/layout/AmbientBackground'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AmbientBackground />
      <Navbar />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  )
}
