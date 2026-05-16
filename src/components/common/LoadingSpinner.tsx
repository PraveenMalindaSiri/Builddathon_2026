import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

type LoadingSpinnerProps = {
  className?: string
  label?: string
}

export function LoadingSpinner({ className, label }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)} role="status">
      <Loader2 className="h-8 w-8 animate-spin text-blue-400" aria-hidden />
      {label && <p className="text-sm text-slate-400">{label}</p>}
    </div>
  )
}
