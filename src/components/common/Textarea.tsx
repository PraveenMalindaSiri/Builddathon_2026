import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-ink-soft">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full resize-y rounded-xl border border-border bg-surface-2/80 px-4 py-3 text-ink placeholder:text-ink-muted transition focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20',
            error && 'border-warm/60',
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-warm">{error}</p>}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
