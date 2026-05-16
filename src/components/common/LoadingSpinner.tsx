import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

type LoadingSpinnerProps = {
  className?: string
  label?: string
}

export function LoadingSpinner({ className, label }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)} role="status">
      <div className="relative h-12 w-12" aria-hidden>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-1 rounded-full border-2 border-t-accent border-r-gold border-b-transparent border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-[14px] rounded-full bg-accent/30 blur-sm" />
      </div>
      {label && (
        <p className="text-sm font-medium text-ink-soft animate-pulse">{label}</p>
      )}
    </div>
  )
}
