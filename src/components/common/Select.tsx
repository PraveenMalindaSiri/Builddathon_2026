import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, children, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-ink-soft">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full rounded-xl border border-border bg-surface-2/80 px-4 py-2.5 text-sm text-ink focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20',
            error && 'border-warm/60',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {error && <p className="text-xs text-warm">{error}</p>}
      </div>
    )
  },
)
Select.displayName = 'Select'
