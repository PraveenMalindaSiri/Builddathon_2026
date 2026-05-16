import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'elevated' | 'muted'
}

const variants = {
  default: 'glass-panel',
  elevated: 'glass-panel glass-panel-glow',
  muted: 'bg-surface/60 border border-border/60 backdrop-blur-sm',
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  return (
    <div className={cn('rounded-2xl p-6 transition-all duration-300', variants[variant], className)} {...props}>
      {children}
    </div>
  )
}
