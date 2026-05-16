import { env } from '@/config/env'
import { apiGet } from '@/lib/apiClient'
import { delay } from '@/services/mockPitchResult'
import type { JobPollResponse } from '@/types/launchpad'

const POLL_INTERVAL_MS = 2500

function isJobDone(status: string): boolean {
  return status === 'done' || status === 'completed'
}

/**
 * Poll until the backend reports done or failed — no client-side time limit.
 */
export async function pollJob<T = JobPollResponse['result']>(
  jobId: string,
  onUpdate?: (job: JobPollResponse) => void,
  options?: { intervalMs?: number },
): Promise<T> {
  const intervalMs = options?.intervalMs ?? POLL_INTERVAL_MS

  if (env.useMockApi) {
    await delay(2000)
    return {} as T
  }

  while (true) {
    const job = await apiGet<JobPollResponse>(`/api/jobs/${jobId}`)
    onUpdate?.(job)

    if (isJobDone(job.status)) {
      return (job.result ?? {}) as T
    }
    if (job.status === 'failed') {
      throw new Error(job.error ?? 'Job failed')
    }

    await delay(intervalMs)
  }
}

export async function fetchJobStages(type: 'pitch' | 'campaign') {
  return apiGet<{ type: string; stages: JobPollResponse['stages'] }>(
    `/api/jobs/stages/${type}`,
  )
}
