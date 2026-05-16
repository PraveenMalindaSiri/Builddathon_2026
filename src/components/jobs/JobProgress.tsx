import { motion } from 'framer-motion'
import type { JobPollResponse } from '@/types/pitchsmash'

type JobProgressProps = {
  job: JobPollResponse | null
}

export function JobProgress({ job }: JobProgressProps) {
  if (!job) return null

  const label = job.progressLabel ?? job.progress ?? 'Processing'
  const percent = job.progressPercent ?? 0
  const index = job.progressIndex ?? 0
  const total = job.progressTotal ?? job.stages?.length ?? 1

  return (
    <div className="w-full max-w-md mx-auto space-y-4" aria-live="polite">
      <p className="text-sm font-medium text-ink-soft">{label}</p>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-3 ring-1 ring-border">
        <motion.div
          className="h-full rounded-full progress-shimmer"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(percent, 8)}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="text-xs text-ink-muted">
        Step {index + 1} of {total}
        {percent > 0 && ` (${percent}%)`}
      </p>
    </div>
  )
}
