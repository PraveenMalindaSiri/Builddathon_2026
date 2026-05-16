import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'default' | 'success' | 'warning' | 'danger' | 'info'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone
}

const tones: Record<Tone, string> = {
  default: 'badge border border-border text-ink-soft',
  success: 'badge badge-success',
  warning: 'badge badge-warning',
  danger: 'badge badge-danger',
  info: 'badge badge-info',
}

export function Badge({ className, tone = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
