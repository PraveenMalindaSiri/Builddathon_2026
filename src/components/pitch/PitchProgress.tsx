import { motion } from 'framer-motion'
import { PITCH_PROGRESS_STEPS } from '@/config/constants'
import { Card } from '@/components/common/Card'
import { IconCheck, IconDot } from '@/components/icons/Icons'
import { cn } from '@/lib/cn'

type PitchProgressProps = {
  activeStep: number
}

export function PitchProgress({ activeStep }: PitchProgressProps) {
  return (
    <Card variant="elevated" className="max-w-lg mx-auto overflow-hidden" aria-live="polite">
      <h2 className="mb-8 font-display text-xl font-bold text-ink">Building your pitch package</h2>
      <ol className="space-y-1">
        {PITCH_PROGRESS_STEPS.map((step, index) => {
          const done = index < activeStep
          const current = index === activeStep
          return (
            <motion.li
              key={step}
              initial={false}
              animate={{
                opacity: done || current ? 1 : 0.45,
                x: current ? 4 : 0,
              }}
              className="flex items-center gap-4 rounded-xl px-2 py-2.5"
            >
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                  done && 'border-accent/50 bg-accent/15 text-accent',
                  current && 'border-accent bg-accent/20 text-accent shadow-[0_0_20px_-4px_rgba(0,229,192,0.5)]',
                  !done && !current && 'border-border text-ink-muted',
                )}
              >
                {done ? (
                  <IconCheck size={16} aria-hidden />
                ) : (
                  <IconDot size={current ? 10 : 8} aria-hidden />
                )}
              </span>
              <span
                className={cn(
                  'text-sm transition-colors',
                  done && 'text-ink-muted line-through decoration-accent/30',
                  current && 'font-semibold text-ink',
                  !done && !current && 'text-ink-muted',
                )}
              >
                {step}
              </span>
              {current && (
                <motion.span
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
            </motion.li>
          )
        })}
      </ol>
    </Card>
  )
}
