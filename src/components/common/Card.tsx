import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'elevated' | 'muted'
}

const variants = {
  default: 'bg-slate-900/80 border-slate-800',
  elevated: 'bg-slate-900 border-slate-700 shadow-xl shadow-black/20',
  muted: 'bg-slate-950/50 border-slate-800/80',
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-2xl border p-6', variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}
