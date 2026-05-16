import { env } from '@/config/env'
import { apiDelete, apiGet, downloadBlob } from '@/lib/apiClient'
import { mapSessionToPitchResult } from '@/services/sessionMapper'
import { mockPitchResult } from '@/services/mockPitchResult'
import type { BackendSession, SessionListResponse } from '@/types/backend'

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

export async function deleteCampaign(campaignId: string) {
  if (env.useMockApi) return { ok: true, deletedId: campaignId }
  return apiDelete<{ ok: boolean; deletedId: string }>(`/api/campaign/${campaignId}`)
}

export async function fetchPptxUrl(sessionId: string, regenerate = false): Promise<string> {
  if (env.useMockApi) return ''
  const query = regenerate ? '?regenerate=1' : ''
  const data = await apiGet<{ pptxUrl: string }>(
    `/api/session/${sessionId}/export/pptx${query}`,
  )
  return data.pptxUrl
}

export async function downloadPitchJsonReport(sessionId: string) {
  const blob = await downloadBlob(`/api/session/${sessionId}/export/pdf`)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `launchpad-pitch-${sessionId}.json`
  a.click()
  URL.revokeObjectURL(url)
}
