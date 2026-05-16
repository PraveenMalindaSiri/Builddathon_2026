import { motion } from 'framer-motion'
import { IconCheck, IconDot } from '@/components/icons/Icons'
import type { JobPollResponse } from '@/types/launchpad'
import { cn } from '@/lib/cn'

type JobStepperProps = {
  job: JobPollResponse | null
}

export function JobStepper({ job }: JobStepperProps) {
  if (!job?.stages?.length) return null

  const progressIndex = job.progressIndex ?? 0

  return (
    <ol className="mt-8 space-y-2 text-sm max-w-md mx-auto">
      {job.stages.map((stage, i) => {
        const done = i < progressIndex
        const active = stage.key === job.progress
        const failed = job.status === 'failed' && active

        return (
          <motion.li
            key={stage.key}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={cn(
              'flex items-center gap-3 rounded-lg px-2 py-1.5',
              done && 'text-ink-muted',
              active && 'font-medium text-ink bg-accent/5',
              failed && 'text-warm',
              !done && !active && 'text-ink-muted/60',
            )}
          >
            <span className="flex h-6 w-6 items-center justify-center">
              {done ? (
                <IconCheck size={14} className="text-accent" />
              ) : (
                <IconDot size={active ? 10 : 6} className={active ? 'text-accent' : ''} />
              )}
            </span>
            {stage.label}
          </motion.li>
        )
      })}
    </ol>
  )
}
