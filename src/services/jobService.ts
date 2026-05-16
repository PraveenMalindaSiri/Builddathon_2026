import { env } from '@/config/env'
import { apiGet } from '@/lib/apiClient'
import { delay } from '@/services/mockPitchResult'
import type { JobResponse } from '@/types/backend'

const POLL_INTERVAL_MS = 2500
const MAX_POLLS = 120

export async function pollJob<T = Record<string, unknown>>(
  jobId: string,
  onProgress?: (progress: string | undefined) => void,
): Promise<T> {
  if (env.useMockApi) {
    await delay(2000)
    return {} as T
  }

  for (let i = 0; i < MAX_POLLS; i++) {
    const job = await apiGet<JobResponse>(`/api/jobs/${jobId}`)
    onProgress?.(job.progress)

    if (job.status === 'completed') {
      return (job.result ?? {}) as T
    }
    if (job.status === 'failed') {
      throw new Error(job.error || 'Job failed')
    }
    await delay(POLL_INTERVAL_MS)
  }

  throw new Error('Timed out waiting for the job to complete.')
}
