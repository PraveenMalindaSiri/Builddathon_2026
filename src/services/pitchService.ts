import { env } from '@/config/env'
import { apiPost } from '@/lib/apiClient'
import { delay, mockPitchResult } from '@/services/mockPitchResult'
import type { PitchGenerateRequest, PitchGenerationResult } from '@/types/pitch'

export async function generatePitch(
  request: PitchGenerateRequest,
): Promise<PitchGenerationResult> {
  if (env.useMockApi) {
    await delay(2500)
    return {
      ...mockPitchResult,
      sessionId: `pitch_mock_${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
  }

  return apiPost<PitchGenerateRequest, PitchGenerationResult>(
    '/api/pitch/generate',
    request,
  )
}
