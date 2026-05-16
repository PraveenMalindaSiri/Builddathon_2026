import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" theme="dark" richColors />
    </>
  )
}
