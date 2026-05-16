import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'default' | 'success' | 'warning' | 'danger' | 'info'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone
}

const tones: Record<Tone, string> = {
  default: 'bg-surface-3/80 text-ink-soft border-border',
  success: 'bg-accent/10 text-accent border-accent/30',
  warning: 'bg-gold/10 text-gold border-gold/30',
  danger: 'bg-warm/10 text-warm border-warm/30',
  info: 'bg-violet/10 text-violet border-violet/30',
}

export function Badge({ className, tone = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
