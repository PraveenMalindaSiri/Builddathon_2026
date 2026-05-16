import type { JobPollResponse } from '@/types/launchpad'

type JobStepperProps = {
  job: JobPollResponse | null
}

export function JobStepper({ job }: JobStepperProps) {
  if (!job?.stages?.length) return null

  const progressIndex = job.progressIndex ?? 0

  return (
    <ol className="mt-6 space-y-2 text-sm max-w-md mx-auto">
      {job.stages.map((stage, i) => {
        const done = i < progressIndex
        const active = stage.key === job.progress
        const failed = job.status === 'failed' && active

        return (
          <li
            key={stage.key}
            className={[
              done && 'text-slate-500',
              active && 'font-medium text-slate-100',
              failed && 'text-red-400',
              !done && !active && 'text-slate-600',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="mr-2 inline-block w-4">
              {done ? '✓' : active ? '●' : '○'}
            </span>
            {stage.label}
          </li>
        )
      })}
    </ol>
  )
}
