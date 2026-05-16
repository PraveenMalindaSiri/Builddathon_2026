import { env } from '@/config/env'
import { apiGet } from '@/lib/apiClient'
import { mapSessionToPitchResult } from '@/services/sessionMapper'
import { mockPitchResult } from '@/services/mockPitchResult'
import type { BackendSession, SessionListResponse } from '@/types/backend'
import type { PitchGenerationResult } from '@/types/pitch'

export async function getSession(sessionId: string): Promise<BackendSession> {
  return apiGet<BackendSession>(`/api/session/${sessionId}`)
}

export async function getPitchResult(sessionId: string): Promise<PitchGenerationResult> {
  if (env.useMockApi) {
    return { ...mockPitchResult, sessionId, createdAt: new Date().toISOString() }
  }
  const session = await getSession(sessionId)
  return mapSessionToPitchResult(session)
}

export async function listSessions(): Promise<SessionListResponse['sessions']> {
  if (env.useMockApi) return []
  const data = await apiGet<SessionListResponse>('/api/session')
  return data.sessions ?? []
}
