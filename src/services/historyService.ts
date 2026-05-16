import { env } from '@/config/env'
import { apiGet } from '@/lib/apiClient'
import type { HistoryResponse } from '@/types/pitchsmash'

export async function getHistory(): Promise<HistoryResponse> {
  if (env.useMockApi) {
    return { pitches: [], campaigns: [] }
  }
  return apiGet<HistoryResponse>('/api/history')
}
