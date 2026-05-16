import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/AuthContext'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="bottom-right" theme="dark" richColors />
    </AuthProvider>
  )
}
