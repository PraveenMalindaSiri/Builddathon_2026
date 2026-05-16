import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/common/Button'

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  cancelLabel: string
  tone?: 'danger' | 'default'
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  tone = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Close dialog backdrop"
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-message"
            className="glass-card relative z-10 w-full max-w-md p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                tone === 'danger' ? 'bg-warm/15 text-warm' : 'bg-accent/15 text-accent'
              }`}
            >
              <AlertTriangle size={22} />
            </div>
            <h2 id="confirm-title" className="font-display text-xl font-bold text-ink">
              {title}
            </h2>
            <p id="confirm-message" className="mt-2 text-sm leading-relaxed text-ink-muted">
              {message}
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="ghost" onClick={onCancel}>
                {cancelLabel}
              </Button>
              <Button type="button" onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
