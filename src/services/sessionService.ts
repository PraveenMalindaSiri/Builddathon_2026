import { env } from '@/config/env'
import { apiDelete, apiGet, downloadBlob } from '@/lib/apiClient'
import { mapSessionToPitchResult } from '@/services/sessionMapper'
import { mockPitchResult } from '@/services/mockPitchResult'
import type { BackendSession, SessionListResponse } from '@/types/backend'
import type { BulkDeleteResponse } from '@/types/launchpad'

export async function getSession(sessionId: string): Promise<BackendSession> {
  return apiGet<BackendSession>(`/api/session/${sessionId}`)
}

export async function getPitchResult(sessionId: string) {
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

export async function deletePitchSession(sessionId: string) {
  if (env.useMockApi) return { ok: true, deletedId: sessionId }
  return apiDelete<{ ok: boolean; deletedId: string }>(`/api/session/${sessionId}`)
}

export async function deleteAllPitchSessions() {
  if (env.useMockApi) return { ok: true, deletedCount: 0, deletedIds: [] }
  return apiDelete<BulkDeleteResponse>('/api/session')
}

export async function deleteCampaign(campaignId: string) {
  if (env.useMockApi) return { ok: true, deletedId: campaignId }
  return apiDelete<{ ok: boolean; deletedId: string }>(`/api/campaign/${campaignId}`)
}

export async function deleteAllCampaigns() {
  if (env.useMockApi) return { ok: true, deletedCount: 0, deletedIds: [] }
  return apiDelete<BulkDeleteResponse>('/api/campaign')
}

export async function downloadPitchJsonReport(sessionId: string) {
  const blob = await downloadBlob(`/api/session/${sessionId}/export/report`)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `launchpad-pitch-${sessionId}.json`
  a.click()
  URL.revokeObjectURL(url)
}
