import type { JobPollResponse } from '@/types/launchpad'

type JobProgressProps = {
  job: JobPollResponse | null
}

export function JobProgress({ job }: JobProgressProps) {
  if (!job) return null

  const label = job.progressLabel ?? job.progress ?? 'Processing…'
  const percent = job.progressPercent ?? 0
  const index = (job.progressIndex ?? 0) + 1
  const total = job.progressTotal ?? job.stages?.length ?? 1

  return (
    <div className="w-full max-w-md mx-auto space-y-3" aria-live="polite">
      <p className="text-sm text-slate-300">{label}</p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
      <p className="text-xs text-slate-500">
        Step {index} of {total}
        {percent > 0 && ` · ${percent}%`}
      </p>
    </div>
  )
}
