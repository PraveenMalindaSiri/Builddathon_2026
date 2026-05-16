import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'

type ConfirmOptions = {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'danger' | 'default'
}

type ConfirmContextValue = {
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null)

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const resolveRef = useRef<((value: boolean) => void) | null>(null)

  const confirm = useCallback((opts: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve
      setOptions(opts)
      setOpen(true)
    })
  }, [])

  const close = (result: boolean) => {
    setOpen(false)
    resolveRef.current?.(result)
    resolveRef.current = null
    setOptions(null)
  }

  const value = useMemo(() => ({ confirm }), [confirm])

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {options && (
        <ConfirmDialog
          open={open}
          title={options.title}
          message={options.message}
          confirmLabel={options.confirmLabel ?? 'Confirm'}
          cancelLabel={options.cancelLabel ?? 'Cancel'}
          tone={options.tone ?? 'default'}
          onConfirm={() => close(true)}
          onCancel={() => close(false)}
        />
      )}
    </ConfirmContext.Provider>
  )
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error('useConfirm must be used within ConfirmProvider')
  return ctx
}
