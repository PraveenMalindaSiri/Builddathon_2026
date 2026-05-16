import { Check, Circle } from 'lucide-react'
import { PITCH_PROGRESS_STEPS } from '@/config/constants'
import { Card } from '@/components/common/Card'
import { cn } from '@/lib/cn'

type PitchProgressProps = {
  activeStep: number
}

export function PitchProgress({ activeStep }: PitchProgressProps) {
  return (
    <Card variant="elevated" className="max-w-lg mx-auto" aria-live="polite">
      <h2 className="mb-6 text-lg font-semibold text-slate-100">Building your pitch package</h2>
      <ol className="space-y-4">
        {PITCH_PROGRESS_STEPS.map((step, index) => {
          const done = index < activeStep
          const current = index === activeStep
          return (
            <li key={step} className="flex items-center gap-3">
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
                  done && 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
                  current && 'border-blue-500 bg-blue-500/10 text-blue-400',
                  !done && !current && 'border-slate-700 text-slate-600',
                )}
              >
                {done ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : (
                  <Circle className={cn('h-3 w-3', current && 'fill-current')} aria-hidden />
                )}
              </span>
              <span
                className={cn(
                  'text-sm',
                  done && 'text-slate-400',
                  current && 'font-medium text-slate-100',
                  !done && !current && 'text-slate-600',
                )}
              >
                {step}
              </span>
            </li>
          )
        })}
      </ol>
    </Card>
  )
}
