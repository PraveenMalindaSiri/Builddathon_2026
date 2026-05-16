import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import { ConfirmProvider } from '@/contexts/ConfirmContext'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <ConfirmProvider>
        {children}
        <Toaster position="bottom-right" theme="dark" richColors />
      </ConfirmProvider>
    </AuthProvider>
  )
}
